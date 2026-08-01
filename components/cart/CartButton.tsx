"use client";

import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function CartButton({
  open,
  setOpen,
}: Props) {

  const { totalItems } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#E63946] hover:bg-red-600 transition"
      >
        <ShoppingCart className="text-white" />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}