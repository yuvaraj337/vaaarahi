"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <>
      <button
  data-cart-button="true"
  onClick={() => setOpen(true)}
        aria-label="Open shopping cart"
        className="relative w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#cf2430] transition-all duration-300 flex items-center justify-center shadow-lg"
      >
        <ShoppingCart className="w-6 h-6 text-white" />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-white text-[#E63946] text-xs font-bold flex items-center justify-center border-2 border-[#E63946]">
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