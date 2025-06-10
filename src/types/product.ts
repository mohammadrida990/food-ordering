import { Prisma } from "@prisma/client";

export type ProductByCategoryWithRelations = Prisma.CategoryGetPayload<{
  include: {
    products: {
      include: {
        sizes: true;
        extras: true;
      };
    };
  };
}>;

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;
