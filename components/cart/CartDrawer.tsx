"use client";

import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "./CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
  cart,
  totalItems,
  totalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = useCart();

  if (!open) return null;

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-[430px] bg-[#111111] border-l border-white/10 z-50 overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-[#111111] border-b border-white/10 px-6 py-5 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Shopping Cart
            </h2>

            <p className="text-white/50 text-sm mt-1">
              {totalItems} Item{totalItems !== 1 && "s"} in your cart
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
          >
            <X className="text-white w-5 h-5" />
          </button>

        </div>

        <div className="p-6">

          {cart.length === 0 ? (

            <div className="flex flex-col items-center justify-center mt-24 text-center">

              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">

                <ShoppingBag
                  size={50}
                  className="text-white/40"
                />

              </div>

              <h3 className="text-white text-xl font-bold mt-6">
                Your Cart is Empty
              </h3>

              <p className="text-white/50 mt-3 max-w-xs">
                Looks like you haven't added any healthy meals yet.
              </p>

              <button
                onClick={onClose}
                className="mt-8 bg-[#E63946] hover:bg-red-600 px-8 py-3 rounded-xl font-semibold text-white transition"
              >
                Browse Menu
              </button>

            </div>

          ) : (
        <>
  {/* Cart Items */}
  <div className="space-y-5">

    {cart.map((item) => (

      <div
        key={item.id}
        className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 hover:border-[#E63946]/40 transition"
      >

        <div className="flex gap-4">

          {/* Food Image */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">

            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />

          </div>

          {/* Details */}
          <div className="flex-1">

            <h3 className="text-white text-lg font-bold">
              {item.name}
            </h3>

            <p className="text-[#E63946] font-bold mt-1">
              ₹{item.price}
            </p>

            {/* Quantity + Remove */}
            <div className="flex items-center justify-between mt-5">

              {/* Quantity Buttons */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>

                <span className="text-white text-lg font-bold min-w-[24px] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-9 h-9 rounded-full bg-[#E63946] hover:bg-red-600 transition flex items-center justify-center"
                >
                  <Plus size={16} className="text-white" />
                </button>

              </div>

              {/* Delete */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 transition flex items-center justify-center"
              >
                <Trash2
                  size={18}
                  className="text-red-400 hover:text-white"
                />
              </button>

            </div>

            {/* Item Total */}
            <div className="flex justify-between mt-5 border-t border-white/10 pt-4">

              <span className="text-white/50">
                Item Total
              </span>

              <span className="text-xl font-bold text-white">
                ₹{item.price * item.quantity}
              </span>

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>
              {/* Footer */}
            <div className="mt-8 border-t border-white/10 pt-6">

              {/* Grand Total */}
              <div className="flex items-center justify-between mb-6">

                <div>
                  <p className="text-white/50 text-sm">
                    Grand Total
                  </p>

                  <h3 className="text-3xl font-bold text-white">
                    ₹{totalPrice}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-green-400 text-sm font-medium">
                    Ready to Checkout
                  </p>
                </div>

              </div>

              {/* Checkout Button */}
              <Link href="/checkout" onClick={onClose}>
                <button className="w-full bg-[#E63946] hover:bg-red-600 transition-all duration-300 rounded-2xl py-4 text-lg font-bold text-white shadow-lg hover:scale-[1.02] active:scale-95">
                  Proceed to Checkout →
                </button>
              </Link>

            </div>

          </>
        )}

      </div>

    </div>

  </>
);
} 