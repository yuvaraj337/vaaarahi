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
  const [mobileOpen, setMobileOpen] = useState(false);

  const { totalItems } = useCart();

  const handleOrderNow = () => {
    /*
     * If cart is empty:
     * smoothly scroll to Menu.
     */
    if (totalItems === 0) {
      const menu = document.getElementById("menu");

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

    /*
     * If cart has items:
     * trigger the existing CartButton.
     */
    const cartButtons = Array.from(
      document.querySelectorAll(
        '[data-cart-button="true"]'
      )
    ) as HTMLButtonElement[];

    /*
     * Find the visible cart button.
     * This is important on mobile because there
     * are separate desktop/mobile cart buttons.
     */
    const visibleCartButton = cartButtons.find(
      (button) => {
        const style = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      }
    );

    if (visibleCartButton) {
      visibleCartButton.click();
    }
  };

  /*
   * MOBILE ONLY
   *
   * Handles Order Now after closing the mobile menu.
   * No desktop behavior is changed.
   */
  const handleMobileOrderNow = () => {
    setMobileOpen(false);

    if (totalItems === 0) {
      setTimeout(() => {
        const menu = document.getElementById("menu");

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
      }, 100);

      return;
    }

    /*
     * Cart has items.
     *
     * Wait until the mobile menu closes, then
     * find the visible cart button and click it.
     */
    setTimeout(() => {
      const cartButtons = Array.from(
        document.querySelectorAll(
          '[data-cart-button="true"]'
        )
      ) as HTMLButtonElement[];

      const visibleCartButton = cartButtons.find(
        (button) => {
          const style =
            window.getComputedStyle(button);

          const rect =
            button.getBoundingClientRect();

          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        }
      );

      if (visibleCartButton) {
        visibleCartButton.click();
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <Link
              href="/"
              className="flex items-center gap-3 min-w-0"
            >
              <div className="h-10 w-10 shrink-0 rounded-full bg-[#E63946] flex items-center justify-center font-bold text-white text-xl">
                V
              </div>

              <div className="min-w-0">
                <h1 className="text-white font-bold text-lg whitespace-nowrap">
                  Varahi Eat & Fit
                </h1>

                <p className="text-xs text-white/50">
                  Healthy Restaurant
                </p>
              </div>
            </Link>

            {/* ========================= */}
            {/* DESKTOP MENU */}
            {/* ========================= */}

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

            {/* ========================= */}
            {/* DESKTOP RIGHT */}
            {/* ========================= */}

            <div className="hidden lg:flex items-center gap-4">

              <CartButton />

              <button
                onClick={handleOrderNow}
                className="bg-[#E63946] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Order Now
              </button>

            </div>

            {/* ========================= */}
            {/* MOBILE RIGHT */}
            {/* ========================= */}

            <div className="lg:hidden flex items-center gap-3">

              {/* CART — DIRECTLY LEFT OF MENU */}
              <div className="relative">
                <CartButton />
              </div>

              {/* HAMBURGER */}
              <button
                aria-label="Toggle menu"
                className="h-11 w-11 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center text-white hover:bg-white/10 transition"
                onClick={() =>
                  setMobileOpen(!mobileOpen)
                }
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

            </div>

          </div>

          {/* ========================= */}
          {/* MOBILE MENU */}
          {/* ========================= */}

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

                {/* MOBILE ORDER NOW */}
                <button
                  type="button"
                  onClick={handleMobileOrderNow}
                  className="bg-[#E63946] hover:bg-red-600 text-white py-3 rounded-full font-semibold transition"
                >
                  Order Now
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}