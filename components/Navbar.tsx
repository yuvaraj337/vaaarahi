"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import CartButton from "@/components/cart/CartButton";
import { useCart } from "@/components/cart/CartContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { totalItems } = useCart();

  const handleOrderNow = () => {
    if (totalItems === 0) {
      const menu =
        document.getElementById("menu");

      if (menu) {
        const y =
          menu.getBoundingClientRect().top +
          window.pageYOffset -
          120;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }

      return;
    }

    // CartButton owns its drawer state,
    // so Navbar cannot directly open it.
    // Send the customer to checkout instead.
    window.location.href = "/checkout";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="flex h-[72px] items-center justify-between px-6">

            {/* LOGO */}

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="h-10 w-10 rounded-full bg-[#E63946] flex items-center justify-center font-bold text-white text-xl">
                V
              </div>

              <div>

                <h1 className="text-white font-bold text-lg">
                  Varahi Eat & Fit
                </h1>

                <p className="text-xs text-white/50">
                  Healthy Restaurant
                </p>

              </div>

            </Link>


            {/* DESKTOP MENU */}

            <nav className="hidden lg:flex items-center gap-8">

              {navLinks.map((item) => (

                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-white transition"
                >
                  {item.name}
                </a>

              ))}

            </nav>


            {/* DESKTOP RIGHT */}

            <div className="hidden lg:flex items-center gap-4">

              {/* CartButton manages its own drawer */}

              <CartButton />

              <button
                type="button"
                onClick={handleOrderNow}
                className="bg-[#E63946] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Order Now
              </button>

            </div>


            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden text-white"
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
            >

              {mobileOpen ? (
                <X />
              ) : (
                <Menu />
              )}

            </button>

          </div>


          {/* MOBILE MENU */}

          {mobileOpen && (

            <div className="lg:hidden border-t border-white/10 p-6 bg-black/80 backdrop-blur-xl">

              <div className="flex flex-col gap-5">

                {navLinks.map((item) => (

                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="text-white/70 hover:text-white transition"
                  >
                    {item.name}
                  </a>

                ))}


                {/* MOBILE ORDER */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);

                    setTimeout(() => {
                      handleOrderNow();
                    }, 200);
                  }}
                  className="bg-[#E63946] hover:bg-red-600 text-white py-3 rounded-full font-semibold transition"
                >
                  Order Now
                </button>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* ========================================= */}
      {/* FLOATING MOBILE CART */}
      {/* ========================================= */}

      {/* FLOATING MOBILE CART */}
<div
  className="
    lg:hidden
    fixed
    right-5
    bottom-[215px]
    z-[60]
  "
>
  <CartButton />
</div>

    </header>
  );
}