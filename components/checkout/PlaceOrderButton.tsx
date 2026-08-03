"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { addOrder } from "@/lib/orderService";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  cart: CartItem[];

  name: string;
  phone: string;
  address: string;
  location: string;

  phoneValid: boolean;
  nameValid: boolean;
  addressValid: boolean;

  paymentMethod: string;
  paymentDone: boolean;

  grandTotal: number;

  placingOrder: boolean;
  setPlacingOrder: (value: boolean) => void;
}

export default function PlaceOrderButton({
  cart,

  name,
  phone,
  address,
  location,

  phoneValid,
  nameValid,
  addressValid,

  paymentMethod,
  paymentDone,

  grandTotal,

  placingOrder,
  setPlacingOrder,
}: Props) {

   async function placeOrder() {

    if (!nameValid) {
      toast.error("Enter valid name");
      return;
    }

    if (!phoneValid) {
      toast.error("Enter valid mobile number");
      return;
    }

    if (!addressValid) {
      toast.error("Enter valid address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (
      paymentMethod !== "COD" &&
      !paymentDone
    ) {
      toast.error("Complete payment first");
      return;
    }

    setPlacingOrder(true);

    const orderId =
      "VEF" +
      Math.floor(Math.random() * 1000000);

    const items = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = ₹${
            item.quantity * item.price
          }`
      )
      .join("\n");

    const message = `🍽️ Varahi Eat & Fit


🆔 Order ID : ${orderId}

👤 ${name}

📞 ${phone}

🏠 ${address}

📍 ${location || "Not Shared"}

----------------------------

${items}

----------------------------

💰 Grand Total : ₹${grandTotal}

💳 Payment : ${paymentMethod}`;
await addOrder({
  orderId,

  customerName: name,

  phone,

  address,

  location,

  paymentMethod,

  paymentStatus:
    paymentMethod === "COD"
      ? "Pending"
      : "Paid",

  orderStatus: "Pending",

  total: grandTotal,

  createdAt: Date.now(),

  items: cart.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  })),
});

    setTimeout(() => {

      const whatsapp =
        `https://wa.me/916302094687?text=${encodeURIComponent(
          message
        )}`;

      window.open(
        whatsapp,
        "_blank"
      );

      toast.success(
        "Order Placed Successfully 🎉"
      );

      setPlacingOrder(false);

    }, 2000);
  }

  return (
    <>

      <button
        onClick={placeOrder}
        disabled={placingOrder}
        className="w-full mt-10 bg-[#E63946] hover:bg-red-600 transition-all duration-300 rounded-3xl py-5 text-xl font-bold text-white hover:scale-[1.02] active:scale-95 shadow-xl"
      >

        {placingOrder ? (

          <div className="flex items-center justify-center gap-3">

            <Loader2 className="animate-spin" />

            Processing Order...

          </div>

        ) : (

          "🚀 Place Order"

        )}

      </button>

      <div className="mt-5 flex justify-center items-center gap-2 text-green-400">

        <ShieldCheck size={20} />

        <span>

          100% Secure Checkout

        </span>

      </div>

    </>
  );
}