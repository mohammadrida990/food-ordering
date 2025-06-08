"use client";

import React, { useRef, useState } from "react";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/consts/enum";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/trans";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";

const Form = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const { locale } = useParams();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formDate = new FormData(formRef.current);
    const data: Record<string, string> = {};

    formDate.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationErrors;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;

        if (responseError) {
          toast.error(responseError, {
            closeButton: true,
            position: "top-center",
            className: "bg-red-500 text-red-500",
          });
        }
      }

      if (res?.ok) {
        toast.success(translations.messages.loginSuccessful, {
          closeButton: true,
          position: "top-center",
          className: "bg-red-500 text-red-500",
        });

        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name}>
          <FormFields {...field} error={error} />
        </div>
      ))}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : translations.auth.login.button}
      </Button>
    </form>
  );
};

export default Form;
