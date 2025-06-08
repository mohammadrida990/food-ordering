"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formateCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Extra, Size, SizeType } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCartItem,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import { getItemQuantity } from "@/lib/cart";

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const qty = getItemQuantity(item.id, cart);

  const defaultSize =
    cart.find((el) => el.id === item.id)?.size ||
    item.sizes.find((size) => size.name === SizeType.SMALL);

  const defaultExtras = cart.find((el) => el.id === item.id)?.extras || [];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);

  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="mt-4 text-white rounded-full !px-8"
        >
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] mx-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>

          <DialogDescription className="text-center">
            {item.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-10">
          <div className="text-center space-y-4">
            <Label htmlFor="pick-size" className="flex justify-center">
              Pick your size
            </Label>

            <PickSize
              sizes={item.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>

          <div className="text-center space-y-4">
            <Label
              htmlFor="add-extras"
              className="text-center items-center flex justify-center"
            >
              Any Extras
            </Label>

            <Extras
              extras={item.extras}
              setSelectedExtras={setSelectedExtras}
              selectedExtras={selectedExtras}
            />
          </div>
        </div>

        <DialogFooter>
          {qty === 0 ? (
            <Button
              type="submit"
              className="w-full h-10"
              onClick={handleAddToCart}
            >
              Add to cart {formateCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={qty}
              item={item}
              selectedExtras={selectedExtras}
              selectedSize={selectedSize}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PickSize = ({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) => {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-2"
          key={size.id}
        >
          <RadioGroupItem
            value={selectedSize.name}
            id={size.id}
            checked={selectedSize.id === size.id}
            onClick={() => setSelectedSize(size)} // onClick because shadcn makes the radio as button not as input
          />
          <Label htmlFor={size.id}>
            {size.name} {formateCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

const Extras = ({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) => {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      setSelectedExtras((prev) => prev.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  return (
    <div className="space-y-2">
      {extras.map((extra) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border border-gay-100 rounded-md p-4"
        >
          <Checkbox
            id={extra.id}
            value={extra.id}
            checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
            onClick={() => handleExtra(extra)}
          />

          <Label
            htmlFor={extra.id}
            className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {extra.name} {formateCurrency(extra.price)}
          </Label>
        </div>
      ))}
    </div>
  );
};

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>

      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};

export default AddToCartButton;
