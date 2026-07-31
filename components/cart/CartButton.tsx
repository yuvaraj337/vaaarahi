"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#E63946] hover:bg-[#d62839] transition-all"
      >
        <ShoppingCart className="w-5 h-5 text-white" />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
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