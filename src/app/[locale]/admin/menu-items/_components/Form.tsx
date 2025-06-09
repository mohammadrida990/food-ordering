"use client";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/consts/enum";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/trans";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SelectCategory from "./SelectCategory";
import { Category } from "@prisma/client";

const Form = ({
  translations,
  categories,
}: {
  translations: Translations;
  categories: Category[];
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations,
  });

  const [categoryId, setCategoryId] = useState(categories[0].id);

  // const [state, action, pending] = useActionState();
  // const formData = new FormData();

  // Object.entries(product ?? {}).forEach(([key, value]) => {
  //   if (value !== null && value !== undefined && key !== "image") {
  //     formData.append(key, value.toString());
  //   }
  // });

  // const initialState: {
  //   message?: string;
  //   error?: ValidationErrors;
  //   status?: number | null;
  //   formData?: FormData | null;
  // } = {
  //   message: "",
  //   error: {},
  //   status: null,
  //   formData: null,
  // };

  return (
    <form className="flex flex-col md:flex-row gap-10">
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          // const fieldValue =
          //   state.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                error={{}}
                // defaultValue={fieldValue as string}
              />
            </div>
          );
        })}
        <SelectCategory
          categoryId={categoryId}
          categories={categories}
          setCategoryId={setCategoryId}
          translations={translations}
        />
        {/*<AddSize
          translations={translations}
          sizes={sizes}
          setSizes={setSizes}
        />
        <AddExtras
          extras={extras}
          setExtras={setExtras}
          translations={translations}
        />*/}
        <FormActions translations={translations} />
      </div>
    </form>
  );
};

export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <div className="group mx-auto md:mx-0 relative w-[200px] h-[200px] overflow-hidden rounded-full">
      <Image
        src={selectedImage}
        alt="add product image"
        width={200}
        height={200}
        className="rounded-full object-cover"
      />

      <div
        className={`${
          selectedImage
            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
            : ""
        } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
          name="image"
        />

        <label
          htmlFor="image-upload"
          className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
        >
          <CameraIcon className="!w-8 !h-8 text-accent" />
        </label>
      </div>
    </div>
  );
};

const FormActions = ({ translations }: { translations: Translations }) => {
  return <Button type="submit">{translations.create}</Button>;
};
