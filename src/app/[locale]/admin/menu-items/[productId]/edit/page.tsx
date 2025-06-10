import { Pages, Routes } from "@/consts/enum";
import { Locale } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/products";
import { redirect } from "next/navigation";
import React from "react";
import Form from "../../_components/Form";
import { getCategories } from "@/server/db/categories";
import getTrans from "@/lib/translation";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
}

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) => {
  const { locale, productId } = await params;
  const translations = await getTrans(locale);

  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section className="">
        <div className="container">
          <Form
            categories={categories}
            translations={translations}
            // key={}
            product={product}
          />
        </div>
      </section>
    </main>
  );
};

export default EditProductPage;
