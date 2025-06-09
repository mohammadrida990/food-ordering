import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCategories } from "@/server/db/categories";
import React from "react";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const categories = await getCategories();
  const { locale } = await params;
  const translations = await getTrans(locale);
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-[625px] mx-auto space-y-6">
            <Form translations={translations} />

            {categories.length > 0 ? (
              <ul className="gap-4 flex flex-col">
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </ul>
            ) : (
              <p className="text-accent text-center py-10">
                {translations.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
