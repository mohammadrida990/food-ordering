import EditUserForm from "@/components/EditUserForm";
import { Pages, Routes } from "@/consts/enum";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getUser } from "@/server/db/users";
import { redirect } from "next/navigation";
import React from "react";

// export async function generateStaticParams() {
//   const users = await getUsers();

//   return users.map((user) => ({ userId: user.id }));
// }

// export const revalidate = 60; // regenerate after 60 seconds
// export async function generateStaticParams() {
//   const users = await getUsers();

//   // pre-render only first 100 users
//   const limitedUsers = users.slice(0, 100);

//   return limitedUsers.map((user) => ({ userId: user.id }));
// }

export const dynamic = "force-dynamic";

const EditUser = async ({
  params,
}: {
  params: Promise<{ locale: Locale; userId: string }>;
}) => {
  const { locale, userId } = await params;
  const translations = await getTrans(locale);

  const user = await getUser(userId);

  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translations={translations} user={user} />
        </div>
      </section>
    </main>
  );
};

export default EditUser;
