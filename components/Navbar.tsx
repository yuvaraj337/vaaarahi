"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import CartButton from "@/components/cart/CartButton";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">

          <div className="flex h-18 items-center justify-between px-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
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

            {/* Desktop Menu */}

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

            {/* Right */}

            <div className="hidden lg:flex items-center gap-4">

              <CartButton />

              <button
  onClick={() => {
    const cartButton = document.getElementById("cart-button");
    cartButton?.click();
  }}
  className="bg-[#E63946] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition"
>
  Order Now
</button>

            </div>

            {/* Mobile */}

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

          </div>

          {mobileOpen && (
            <div className="lg:hidden border-t border-white/10 p-6">

              <div className="flex flex-col gap-5">

                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/70"
                  >
                    {item.name}
                  </a>
                ))}

                <CartButton />

                <a
                  href="#menu"
                  className="bg-[#E63946] text-center text-white py-3 rounded-full font-semibold"
                >
                  Order Now
                </a>

              </div>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}
