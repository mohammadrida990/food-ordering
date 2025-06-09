"use server";

import { Pages, Routes } from "@/consts/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const result = addCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  const data = result.data;

  try {
    await db.category.create({
      data: {
        name: data.name,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      message: translations.messages.categoryAdded,
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};

export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  const result = updateCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  const data = result.data;

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name: data.categoryName,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      message: translations.messages.updatecategorySucess,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};

export const deleteCategory = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  try {
    await db.category.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      message: translations.messages.deleteCategorySucess,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};
