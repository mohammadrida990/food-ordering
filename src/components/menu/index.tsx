import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
  const locale = await getCurrentLocale();
  const { bestSellers } = await getTrans(locale);

  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{bestSellers.noProducts}</p>
  );
};

export default Menu;
