import { formateCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelations } from "@/types/product";

const MenuItem = ({ item }: { item: ProductWithRelations }) => {
  return (
    <li className="p-6 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      <div className="flex flex-row items-center justify-between mb-4">
        <h4 className="text-xl font-semibold">{item.name}</h4>

        <strong className="text-lg font-bold text-accent">
          {formateCurrency(item.basePrice)}
        </strong>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>

      <AddToCartButton item={item} />
    </li>
  );
};

export default MenuItem;
