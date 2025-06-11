import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/consts/enum";
import { Locale } from "@/i18n.config";
import { getUsers } from "@/server/db/users";
import { Edit } from "lucide-react";
import React from "react";
import DeleteUserButton from "./_componenets/DeleteUserButton";

const UsersPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const users = await getUsers();
  const { locale } = await params;

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <ul className="flex flex-col gap-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center gap-10"
              >
                <div className="md:flex justify-between flex-1">
                  <h3 className="text-black font-medium text-sm flex-1">
                    {user.name}
                  </h3>

                  <p className="text-accent font-medium text-sm flex-1">
                    {user.email}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                    className={`${buttonVariants({ variant: "outline" })}`}
                  >
                    <Edit />
                  </Link>

                  <DeleteUserButton userId={user.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default UsersPage;
