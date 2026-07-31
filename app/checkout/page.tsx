"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { useCart } from "@/components/cart/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();

  const restaurantUPI = "6302094687@fam";
  const restaurantName = "Varahi Eat & Fit";

  const upiLink = `upi://pay?pa=${restaurantUPI}&pn=${encodeURIComponent(
    restaurantName
  )}&am=${totalPrice}&cu=INR`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentDone, setPaymentDone] = useState(false);

  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setLocation(googleMapsLink);

        toast.success("Location captured successfully!");

        setLoadingLocation(false);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location permission denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            toast.error("Location unavailable.");
            break;

          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;

          default:
            toast.error("Unknown location error.");
        }

        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#0F0F10] text-white pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Customer Details */}

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Customer Details
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-[#252525] p-4 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-[#252525] p-4 outline-none"
              />

              <textarea
                placeholder="Delivery Address"
                rows={5}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl bg-[#252525] p-4 outline-none"
              />

              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold w-full"
              >
                {loadingLocation
                  ? "Getting Location..."
                  : "📍 Use My Current Location"}
              </button>

              {location && (
                <a
                  href={location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline block"
                >
                  ✅ View Captured Location
                </a>
              )}

            </div>

          </div>
                    {/* Order Summary */}

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cart.length === 0 ? (

                <p className="text-white/50">
                  Your cart is empty.
                </p>

              ) : (

                cart.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-white/10 pb-4"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-white/50 text-sm">
                          Qty : {item.quantity}
                        </p>

                      </div>

                    </div>

                    <div className="font-bold">
                      ₹{item.price * item.quantity}
                    </div>

                  </div>

                ))

              )}

            </div>

            <div className="flex justify-between mt-10 text-2xl font-bold border-t border-white/10 pt-6">

              <span>Total</span>

              <span>₹{totalPrice}</span>

            </div>

          </div>

        </div>

        {/* Payment Section */}

        <div className="mt-10 bg-[#171717] rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-8">
            Payment Method
          </h2>

          <div className="space-y-5">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />

              Cash On Delivery

            </label>

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />

              Online Payment

            </label>

          </div>

          {paymentMethod === "ONLINE" && (

            <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-8 text-center">

              <div className="bg-white p-4 rounded-xl inline-block">

                <QRCode
                  value={upiLink}
                  size={180}
                />

              </div>

              <p className="text-white/60 mt-5">
                Scan using PhonePe, Google Pay, Paytm or any UPI App.
              </p>

              <p className="text-green-400 mt-3 font-semibold">
                Amount : ₹{totalPrice}
              </p>

              <a
                href={upiLink}
                className="mt-5 block bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
              >
                📲 Pay using UPI App
              </a>

              <button
                onClick={() => {
                  setPaymentDone(true);
                  toast.success("Payment marked as completed.");
                }}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
              >
                ✅ I've Paid
              </button>

              {paymentDone && (

                <p className="text-green-400 mt-4">
                  Payment marked as completed.
                </p>

              )}

            </div>

          )}
                    <button
            onClick={() => {
              if (!name || !phone || !address) {
                toast.error("Please fill all the details.");
                return;
              }

              if (cart.length === 0) {
                toast.error("Your cart is empty.");
                return;
              }

              if (paymentMethod === "ONLINE" && !paymentDone) {
                toast.error("Please complete payment first.");
                return;
              }

              const orderId = `VEF-${Date.now().toString().slice(-6)}`;

              const items = cart
                .map(
                  (item) =>
                    `• ${item.name} ×${item.quantity} = ₹${
                      item.price * item.quantity
                    }`
                )
                .join("\n");

              const message = `🍽️ *New Order*

🆔 Order ID:
${orderId}

👤 Name:
${name}

📞 Phone:
${phone}

🏠 Address:
${address}

📍 Location:
${location || "Not Shared"}

🛒 Items:
${items}

💰 Total:
₹${totalPrice}

💳 Payment:
${
  paymentMethod === "COD"
    ? "Cash On Delivery"
    : "Online Payment (Customer marked as Paid)"
}`;

              const whatsappUrl = `https://wa.me/916302094687?text=${encodeURIComponent(
                message
              )}`;

              window.open(whatsappUrl, "_blank");

              toast.success("Order placed successfully!");

              setTimeout(() => {
                window.location.href = `/order-placed?id=${orderId}`;
              }, 800);
            }}
            className="mt-10 w-full bg-[#E63946] hover:bg-red-600 rounded-2xl py-4 text-lg font-bold transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </main>
  );
}