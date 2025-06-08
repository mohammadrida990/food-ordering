import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Routes, Pages } from "@/consts/enum";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import React from "react";
import Form from "./_components/Form";

const SignupPage = async ({
  params,
}: {
  params: Promise<{
    locale: Locale;
  }>;
}) => {
  const locale = (await params).locale;
  const translations = await getTrans(locale);

  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.auth.signUp.title}
            </h2>

            <Form translations={translations} />

            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.auth.signUp.message}</span>

              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {translations.auth.signUp.signInLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
