import { Pages } from "@/consts/enum";
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

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return signupFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
