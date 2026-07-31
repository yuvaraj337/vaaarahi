"use client";

import Image from "next/image";
import { Minus, Plus, Tag, Truck } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Props {
  cart: CartItem[];
  totalPrice: number;
  deliveryCharge: number;
  gst: number;
  discount: number;
  grandTotal: number;

  coupon: string;
  setCoupon: (value: string) => void;
  applyCoupon: () => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export default function OrderSummary({
  cart,
  totalPrice,
  deliveryCharge,
  gst,
  discount,
  grandTotal,

  coupon,
  setCoupon,
  applyCoupon,

  increaseQuantity,
  decreaseQuantity,
}: Props) {
  return (
    <div className="sticky top-28 space-y-6">

      <div className="bg-[#171717] rounded-3xl border border-white/10 p-8">

        <h2 className="text-2xl font-bold text-white mb-8">
          Order Summary
        </h2>

        {cart.length === 0 ? (

          <div className="text-center py-12 text-white/50">

            Your cart is empty.

          </div>

        ) : (

          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-[#222] rounded-2xl p-4"
              >

                <div className="flex gap-4">

                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-lg font-bold text-white">
                      {item.name}
                    </h3>

                    <p className="text-[#E63946] font-semibold mt-1">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center justify-between mt-5">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20"
                        >
                          <Minus
                            size={16}
                            className="mx-auto"
                          />
                        </button>

                        <span className="text-lg font-bold text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="w-9 h-9 rounded-full bg-[#E63946]"
                        >
                          <Plus
                            size={16}
                            className="mx-auto text-white"
                          />
                        </button>

                      </div>

                      <span className="text-xl font-bold text-white">

                        ₹{item.price * item.quantity}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

            {/* Coupon */}

            <div className="bg-[#222] rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-4">

                <Tag className="text-yellow-400" />

                <h3 className="font-bold text-white">
                  Apply Coupon
                </h3>

              </div>

              <div className="flex gap-3">

                <input
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(e.target.value)
                  }
                  placeholder="WELCOME100"
                  className="flex-1 bg-[#111] rounded-xl px-4 py-3 outline-none border border-white/10 text-white"
                />

                <button
                  onClick={applyCoupon}
                  className="bg-[#E63946] hover:bg-red-600 rounded-xl px-6 font-semibold text-white"
                >
                  Apply
                </button>

              </div>

            </div>

            {/* Price */}

            <div className="bg-[#222] rounded-2xl p-6 space-y-4">

              <div className="flex justify-between text-white/70">

                <span>Subtotal</span>

                <span>₹{totalPrice}</span>

              </div>

              <div className="flex justify-between text-white/70">

                <span>Delivery</span>

                <span>₹{deliveryCharge}</span>

              </div>

              <div className="flex justify-between text-white/70">

                <span>GST</span>

                <span>₹{gst}</span>

              </div>

              <div className="flex justify-between text-green-400">

                <span>Discount</span>

                <span>-₹{discount}</span>

              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-bold text-white">

                <span>Total</span>

                <span className="text-[#E63946]">
                  ₹{grandTotal}
                </span>

              </div>

            </div>

            {/* Delivery */}

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-3">

              <Truck className="text-green-400" />

              <div>

                <h3 className="text-green-400 font-bold">

                  Estimated Delivery

                </h3>

                <p className="text-white/60">

                  30–40 Minutes

                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}