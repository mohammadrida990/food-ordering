import Link from "@/components/link";
import React from "react";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const initialSession = await getServerSession(authOptions);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex flex-row items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          {translations.logo}
        </Link>

        <Navbar translations={translations} initialSession={initialSession!} />

        <div className="flex items-center gap-6 flex-1 justify-end ">
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />

            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
