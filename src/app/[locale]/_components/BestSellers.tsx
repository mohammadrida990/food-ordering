import React from "react";
import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getBestSellers } from "@/server/db/products";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const BestSellers = async () => {
  const products = await getBestSellers(3);
  const locale = await getCurrentLocale();
  const { bestSellers } = await getTrans(locale);

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            title={bestSellers.title}
            subTitle={bestSellers.subTitle}
          />
        </div>

        <Menu items={products} />
      </div>
    </section>
  );
};

export default BestSellers;
