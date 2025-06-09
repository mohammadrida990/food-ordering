"use server";

import { Pages, Routes } from "@/consts/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { updateProfileSchema } from "@/validations/profile";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  isAdmin: boolean,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const result = updateProfileSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }
  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: translations.messages.userNotFound,
        formData,
        status: 401,
      };
    }

    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        ...data,
        image: imageUrl ?? user.image,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });

    revalidatePath(`/${locale}/${Routes.PROFILE}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    );

    return {
      status: 200,
      message: translations.messages.updateProfileSucess,
    };
  } catch (error) {
    console.log(error);
    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};

// const getImageUrl = async (imageFile: File) => {
//   const fileExt = imageFile.name.split(".").pop();
//   const fileName = `${Date.now()}.${fileExt}`;
//   const filePath = `images/${fileName}`;

//   const { error } = await supabase.storage
//     .from("user-image")
//     .upload(filePath, imageFile);

//   if (error) {
//     alert("Upload failed: " + error.message);
//   } else {
//     const { data } = supabase.storage.from("user-image").getPublicUrl(filePath);
//     return data.publicUrl;
//   }
// };

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const image = (await response.json()) as { url: string };

    return image.url;
  } catch (error) {
    console.error("Error uploading filr to supabase", error);
  }
};
