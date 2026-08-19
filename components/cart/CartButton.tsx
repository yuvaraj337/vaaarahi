"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();

  // Tell the rest of the website when the cart is open
  useEffect(() => {
    document.body.classList.toggle("cart-is-open", open);

    return () => {
      document.body.classList.remove("cart-is-open");
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#cf2430] transition-all duration-300 flex items-center justify-center"
        aria-label="Open shopping cart"
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