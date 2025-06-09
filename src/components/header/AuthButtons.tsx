"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { Translations } from "@/types/trans";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/consts/enum";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

const AuthButtons = ({
  translations,
  initialSession,
}: {
  translations: Translations;
  initialSession: Session | null;
}) => {
  const session = useClientSession(initialSession);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  //using session here will make a small flash it will loadin the two buttons then the signnout when refresh
  //   const session = useSession(); //in client
  return (
    <div className="flex items-center gap-10">
      {session && session.data?.user && (
        <div>
          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() => signOut()}
          >
            {translations.auth.signOut.title}
          </Button>
        </div>
      )}

      {!session.data?.user && (
        <div className="flex items-center gap-6">
          <Button
            className={`${
              pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                ? "text-primary"
                : "text-accent"
            } hover:text-primary duration-200 transition-colors font-semibold hover:no-underline !px-0`}
            size="lg"
            variant="link"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
            }
          >
            {translations.auth.login.button}
          </Button>

          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
            }
          >
            {translations.auth.signUp.button}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
