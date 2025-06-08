import Link from "@/components/link";
import React from "react";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = async () => {
  const locale = await getCurrentLocale();
  const { logo, navbar } = await getTrans(locale);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex flex-row items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          {logo}
        </Link>

        <Navbar translations={navbar} />

        <LanguageSwitcher />

        <CartButton />
      </div>
    </header>
  );
};

export default Header;
