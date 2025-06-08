"use client";

import React, { useActionState, useEffect } from "react";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/consts/enum";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/trans";
import Loader from "@/components/Loader";
import { signup } from "@/server/_actions/auth";
import { ValidationErrors } from "@/validations/auth";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

const Form = ({ translations }: { translations: Translations }) => {
  const { locale } = useParams();
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, initialState); // or use this two together   useFormState() useFormStatus()

  const { getFormFields } = useFormFields({
    slug: Pages.Register,
    translations,
  });

  useEffect(() => {
    if (state.status && state.message) {
      toast(state.message);
    }

    if (state.status == 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, router, state]);

  return (
    // onSubmit={onSubmit} in case of client
    <form action={action}>
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string;

        return (
          <div key={field.name} className="mb-4">
            <FormFields
              {...field}
              error={state.error}
              defaultValue={fieldValue}
            />
          </div>
        );
      })}

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? <Loader /> : translations.auth.signUp.button}
      </Button>
    </form>
  );
};

export default Form;
