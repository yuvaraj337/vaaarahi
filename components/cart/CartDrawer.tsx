"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const {
    cart,
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
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-[#111] border-l border-white/10 z-50 p-6 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Shopping Cart
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center mt-20">
            <ShoppingBag
              className="mx-auto text-white/40"
              size={60}
            />

            <p className="text-white/50 mt-4">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-2xl p-4 flex gap-4 items-center"
                >

                  {/* Food Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />

                  </div>

                  {/* Details */}
                  <div className="flex-1">

                    <h3 className="text-white font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-red-400 font-bold mt-1">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center justify-between mt-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-white/10 hover:bg-white/20 p-2 rounded-full"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="text-white font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-red-500 hover:bg-red-600 p-2 rounded-full"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-500 text-sm"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-white/10 pt-6">

              <div className="flex justify-between text-xl text-white font-bold">

                <span>Total</span>

                <span>₹{totalPrice}</span>

              </div>

              <Link href="/checkout" onClick={onClose}>
                <button className="mt-6 w-full bg-red-500 hover:bg-red-600 rounded-xl py-4 font-bold text-white transition">
                  Proceed to Checkout
                </button>
              </Link>

            </div>

          </>
        )}

      </div>
    </>
  );
}