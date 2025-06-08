import { Translations } from "@/types/trans";
import * as z from "zod";

export const loginSchema = (translation: Translations) => {
  return z.object({
    email: z.string().trim().email({
      message: translation.validation.validEmail,
    }),
    password: z
      .string()
      .min(6, { message: translation.validation.passwordMinLength })
      .max(40, { message: translation.validation.passwordMaxLength }),
  });
};

export const signUpSchema = (translation: Translations) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: translation.validation.nameRequired }),
      email: z.string().trim().email({
        message: translation.validation.validEmail,
      }),
      password: z
        .string()
        .min(6, { message: translation.validation.passwordMinLength })
        .max(40, { message: translation.validation.passwordMaxLength }),
      confirmPassword: z
        .string()
        .min(6, { message: translation.validation.passwordMinLength }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translation.validation.passwordMismatch,
      path: ["confirmPassword"],
    });
};

export type ValidationErrors = { [key: string]: string[] } | undefined;
