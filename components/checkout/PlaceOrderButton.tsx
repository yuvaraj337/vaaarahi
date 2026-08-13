"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { createRestaurantOrder } from "@/lib/orderService";

import type { CartItem } from "@/components/cart/CartContext";

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
  const [orderGenerated, setOrderGenerated] = useState(false);

  const isCOD = paymentMethod === "COD";

  const handlePlaceOrder = async () => {
    /* ========================================
       1. BASIC VALIDATION
    ======================================== */

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!nameValid) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!phoneValid) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!addressValid) {
      toast.error(
        "Please enter your complete delivery address."
      );
      return;
    }

    /* ========================================
       2. UPI PAYMENT VALIDATION
    ======================================== */

    if (!isCOD && !paymentDone) {
      toast.error(
        "Please complete your payment and click 'I've Completed Payment'."
      );
      return;
    }

    /* ========================================
       3. PREVENT DOUBLE CLICK
    ======================================== */

    if (placingOrder) {
      return;
    }

    setPlacingOrder(true);
    setOrderGenerated(true);

    /* ========================================
       4. GENERATE ORDER ID
    ======================================== */

    const orderId = `VEF-${Date.now()
      .toString()
      .slice(-8)}`;

    /* ========================================
       5. PREPARE ITEMS
    ======================================== */

    const items = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    /* ========================================
       6. PAYMENT STATUS
    ======================================== */

    const paymentText = isCOD
      ? "Cash on Delivery"
      : "UPI / Online Payment — CUSTOMER MARKED AS PAID";
      const orderItems = cart.map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image,
}));

const restaurantStatus =
  isCOD
    ? "NEW"
    : paymentDone
      ? "PAYMENT_PENDING"
      : "PAYMENT_PENDING";

await createRestaurantOrder({
  orderId,

  name,
  phone,
  address,
  location,

  items: orderItems,

  total: grandTotal,

  paymentMethod,

  // This means CUSTOMER says they paid.
  // It does NOT mean restaurant verified it.
  paymentDone,

  // Restaurant must verify this.
  paymentVerified: false,

  status: restaurantStatus,
});

    /* ========================================
       7. WHATSAPP ORDER MESSAGE
    ======================================== */

    const message = `🍽️ *NEW VARAHI EAT & FIT ORDER*

━━━━━━━━━━━━━━━━━━━━

🆔 *Order ID*
${orderId}

👤 *Customer*
${name}

📞 *Phone*
${phone}

🏠 *Delivery Address*
${address}

📍 *Location*
${location || "Not Shared"}

━━━━━━━━━━━━━━━━━━━━

🛒 *ORDER ITEMS*

${items}

━━━━━━━━━━━━━━━━━━━━

💰 *GRAND TOTAL*
₹${grandTotal}

💳 *PAYMENT METHOD*
${paymentText}

━━━━━━━━━━━━━━━━━━━━

${
  isCOD
    ? "🟡 COD ORDER — PAYMENT TO BE COLLECTED ON DELIVERY"
    : "🟢 CUSTOMER SAYS PAYMENT IS COMPLETED — PLEASE VERIFY UPI PAYMENT BEFORE CONFIRMING ORDER"
}

━━━━━━━━━━━━━━━━━━━━

⚠️ *Restaurant Action*

${
  isCOD
    ? "Confirm COD order and prepare the meal."
    : "Verify the UPI transaction. If payment is received, confirm the order. If not, contact the customer."
}

Thank you for ordering from *Varahi Eat & Fit* ❤️`;

    /* ========================================
       8. WHATSAPP URL
    ======================================== */

    const whatsappUrl =
      `https://wa.me/916302094687?text=` +
      encodeURIComponent(message);

    /* ========================================
       9. OPEN WHATSAPP
    ======================================== */

    try {
      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      toast.success(
        "Order generated! Sending order to WhatsApp."
      );
    } catch {
      toast.error(
        "Unable to open WhatsApp. Please try again."
      );

      setPlacingOrder(false);
      return;
    }

    /* ========================================
       10. MOVE TO ORDER CONFIRMATION PAGE
    ======================================== */

    setTimeout(() => {
      window.location.href =
        `/order-placed?id=${orderId}`;
    }, 800);
  };

  return (
    <div className="w-full">

      {/* ========================================
          ORDER STATUS
      ======================================== */}

      {orderGenerated && (
        <div className="mb-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <div className="flex items-start gap-3">

            <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />

            <div>

              <h3 className="text-green-400 font-bold">
                Order Generated
              </h3>

              <p className="text-white/60 text-sm mt-1 leading-6">
                Your order details are being sent to the
                restaurant through WhatsApp.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ========================================
          UPI REMINDER
      ======================================== */}

      {!isCOD && !paymentDone && (
        <div className="mb-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

          <div className="flex items-start gap-3">

            <span className="text-xl">
              ⚠️
            </span>

            <div>

              <h3 className="text-yellow-400 font-bold">
                Payment Required
              </h3>

              <p className="text-white/60 text-sm mt-1 leading-6">
                Complete the UPI payment above and press
                <span className="text-white font-semibold">
                  {" "}I've Completed Payment
                </span>
                {" "}before placing your order.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ========================================
          COD STATUS
      ======================================== */}

      {isCOD && (
        <div className="mb-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <div className="flex items-start gap-3">

            <span className="text-xl">
              💵
            </span>

            <div>

              <h3 className="text-blue-400 font-bold">
                Cash on Delivery
              </h3>

              <p className="text-white/60 text-sm mt-1 leading-6">
                No online payment is required.
                Payment will be collected when your order
                is delivered.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ========================================
          PLACE ORDER BUTTON
      ======================================== */}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={placingOrder || orderGenerated}
        className="
          w-full
          bg-[#E63946]
          hover:bg-red-600
          disabled:bg-[#7f242c]
          disabled:cursor-not-allowed
          rounded-2xl
          py-4
          text-lg
          font-bold
          text-white
          transition-all
          duration-300
          hover:scale-[1.01]
          active:scale-[0.98]
          shadow-lg
          flex
          items-center
          justify-center
          gap-3
        "
      >

        {placingOrder ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />

            Sending Order...
          </>
        ) : orderGenerated ? (
          <>
            <CheckCircle2 className="w-5 h-5" />

            Order Sent
          </>
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />

            Place Order on WhatsApp
          </>
        )}

      </button>

      {/* ========================================
          SMALL SECURITY MESSAGE
      ======================================== */}

      <p className="text-center text-white/35 text-xs mt-4 leading-5">

        {isCOD
          ? "Your COD order will be sent to Varahi Eat & Fit for confirmation."
          : "Your payment is not automatically verified. The restaurant will verify the UPI transaction before confirming your order."}

      </p>

    </div>
  );
}