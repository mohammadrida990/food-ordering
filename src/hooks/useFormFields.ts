import { Pages, Routes } from "@/consts/enum";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/trans";

interface Props extends IFormFieldsVariables {
  translations: Translations;
}

const useFormFields = ({ slug, translations }: Props) => {
  const loginFields = (): IFormField[] => [
    {
      label: translations.auth.login.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.login.email.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.login.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.login.password.placeholder,
    },
  ];

  const signupFields = (): IFormField[] => [
    {
      label: translations.auth.signUp.name.label,
      name: "name",
      type: "text",
      placeholder: translations.auth.signUp.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.signUp.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.signUp.email.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.signUp.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.signUp.password.placeholder,
    },
    {
      label: translations.auth.signUp.confirmPassword.label,
      name: "confirmPassword",
      type: "password",
      placeholder: translations.auth.signUp.confirmPassword.placeholder,
    },
  ];

  const profileFields = (): IFormField[] => [
    {
      label: translations.auth.signUp.name.label,
      name: "name",
      type: "text",
      placeholder: translations.auth.signUp.name.placeholder,
      autoFocus: true,
    },
    {
      label: translations.auth.signUp.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.signUp.email.placeholder,
    },
    {
      label: translations.auth.profile.form.phone.label,
      name: "phone",
      type: "text",
      placeholder: translations.auth.profile.form.phone.placeholder,
    },
    {
      label: translations.auth.profile.form.streetAddress.label,
      name: "streetAddress",
      type: "text",
      placeholder: translations.auth.profile.form.streetAddress.placeholder,
    },
    {
      label: translations.auth.profile.form.postalCode.label,
      name: "postalCode",
      type: "text",
      placeholder: translations.auth.profile.form.postalCode.placeholder,
    },
    {
      label: translations.auth.profile.form.city.label,
      name: "city",
      type: "text",
      placeholder: translations.auth.profile.form.city.placeholder,
    },
    {
      label: translations.auth.profile.form.country.label,
      name: "country",
      type: "text",
      placeholder: translations.auth.profile.form.country.placeholder,
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return signupFields();
      case Routes.PROFILE:
        return profileFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
