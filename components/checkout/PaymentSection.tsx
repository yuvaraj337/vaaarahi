"use client";

import QRCode from "react-qr-code";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;

  paymentDone: boolean;
  setPaymentDone: (value: boolean) => void;

  grandTotal: number;
  upiLink: string;
}

export default function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  paymentDone,
  setPaymentDone,
  grandTotal,
  upiLink,
}: Props) {
  const methods = [
    {
      id: "COD",
      icon: "💵",
      title: "Cash",
      subtitle: "Pay on Delivery",
    },
    {
      id: "PHONEPE",
      icon: "🟣",
      title: "PhonePe",
      subtitle: "Fast Payment",
    },
    {
      id: "GPAY",
      icon: "🟢",
      title: "Google Pay",
      subtitle: "Secure",
    },
    {
      id: "PAYTM",
      icon: "🔵",
      title: "Paytm",
      subtitle: "Wallet",
    },
    {
      id: "UPI",
      icon: "📱",
      title: "UPI",
      subtitle: "Any App",
    },
  ];

  function openUPI() {
    let appOpened = false;

    const handleVisibility = () => {
      if (document.hidden) {
        appOpened = true;
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    window.location.href = upiLink;

    setTimeout(() => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      if (!appOpened) {
        toast.error(
          "No UPI app found. Scan the QR code above or choose Cash on Delivery."
        );
      }
    }, 2000);
  }

  return (
    <div className="bg-[#171717] rounded-3xl border border-white/10 p-8 mt-10">

      {/* Payment Header */}
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#E63946]" />

        <h2 className="text-2xl font-bold text-white">
          Payment Method
        </h2>
      </div>

      {/* Payment Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {methods.map((item) => (
          <button
            key={item.id}
            onClick={() => setPaymentMethod(item.id)}
            className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-105 ${
              paymentMethod === item.id
                ? "border-[#E63946] bg-[#E63946]/15"
                : "border-white/10 bg-[#222]"
            }`}
          >
            <div className="text-4xl mb-3">
              {item.icon}
            </div>

            <h3 className="text-white font-bold">
              {item.title}
            </h3>

            <p className="text-white/50 text-sm mt-1">
              {item.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* QR */}
      {paymentMethod !== "COD" && (
        <div className="mt-10 bg-[#111] rounded-3xl p-8 border border-white/10 text-center">

          {/* QR CENTERING FIX */}
          <div className="w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-2xl flex items-center justify-center">
              <QRCode
                value={upiLink}
                size={200}
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mt-6">
            Scan & Pay
          </h3>

          <p className="text-white/60 mt-3">
            PhonePe • Google Pay • Paytm • BHIM • Any UPI App
          </p>

          <div className="text-[#E63946] text-4xl font-bold mt-6">
            ₹{grandTotal}
          </div>

          <button
            onClick={openUPI}
            className="inline-block mt-8 bg-green-600 hover:bg-green-700 transition rounded-2xl px-10 py-4 text-white font-bold"
          >
            Open UPI App
          </button>

          <button
            onClick={() => setPaymentDone(true)}
            className="block w-full mt-5 bg-blue-600 hover:bg-blue-700 rounded-2xl py-4 text-white font-bold transition"
          >
            ✔ I've Completed Payment
          </button>

          {paymentDone && (
            <div className="mt-5 flex items-center justify-center gap-3 text-green-400">
              <CheckCircle2 />

              Payment Verified Successfully
            </div>
          )}
        </div>
      )}

      {/* COD */}
      {paymentMethod === "COD" && (
        <div className="mt-10 bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-green-400" />

            <div>
              <h3 className="text-green-400 font-bold text-lg">
                Cash on Delivery
              </h3>

              <p className="text-white/60 mt-1">
                Pay safely after receiving your delicious meal.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}