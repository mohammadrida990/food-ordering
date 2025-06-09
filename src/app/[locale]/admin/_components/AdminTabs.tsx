"use client";
import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/consts/enum";
import { Translations } from "@/types/trans";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const AdminTabs = ({ translations }: { translations: Translations }) => {
  const pathname = usePathname();
  const { locale } = useParams();

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");

    return hrefArray.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`;
  };

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: translations.auth.adminTabs.profile,
      href: Routes.ADMIN,
    },
    {
      id: crypto.randomUUID(),
      title: translations.auth.adminTabs.categories,
      href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.auth.adminTabs.menuItems,
      href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.auth.adminTabs.users,
      href: `${Routes.ADMIN}/${Pages.USERS}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.auth.adminTabs.orders,
      href: `${Routes.ADMIN}/${Pages.ORDERS}`,
    },
  ];

  return (
    <nav className="mt-20">
      <ul className="flex items-center flex-wrap gap-4 justify-center">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`/${locale}/${tab.href}`}
              className={`hover:bg-primary/50 hover:text-white ${
                isActiveTab(tab.href)
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminTabs;
