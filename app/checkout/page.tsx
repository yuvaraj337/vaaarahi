"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { ChevronRight } from "lucide-react";

import { useCart } from "@/components/cart/CartContext";

import CheckoutNavbar from "@/components/checkout/CheckoutNavbar";
import CustomerForm from "@/components/checkout/CustomerForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentSection from "@/components/checkout/PaymentSection";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";

export default function CheckoutPage() {

  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const deliveryCharge = 40;
  const gst = Math.round(totalPrice * 0.05);

  const grandTotal =
    totalPrice +
    deliveryCharge +
    gst -
    discount;

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [paymentDone, setPaymentDone] =
    useState(false);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [loadingLocation, setLoadingLocation] =
    useState(false);

  const [location, setLocation] =
    useState("");

  const phoneValid =
    /^[6-9]\d{9}$/.test(phone);

  const nameValid =
    name.trim().length >= 3;

  const addressValid =
    address.trim().length >= 20;

  function applyCoupon() {

    if (coupon.toUpperCase() === "WELCOME100") {

      setDiscount(100);

      toast.success("Coupon Applied Successfully");

    } else {

      toast.error("Invalid Coupon");

    }

  }

  function getCurrentLocation() {

    if (!navigator.geolocation) {

      toast.error("Location Not Supported");

      return;

    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation(
          `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`
        );

        setLoadingLocation(false);

        toast.success("Location Captured");

      },

      () => {

        setLoadingLocation(false);

        toast.error("Permission Denied");

      }

    );

  }

  const upiLink =
    `upi://pay?pa=6302094687@ybl&pn=Varahi Eat & Fit&am=${grandTotal}`;

  return (

    <>

      <CheckoutNavbar />

      <main className="relative min-h-screen bg-[#0B0B0B] overflow-hidden">

        {/* Background Glow */}

        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#E63946]/10 rounded-full blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[180px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-14">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-white/40 mb-6">

            <Link href="/">
              Home
            </Link>

            <ChevronRight size={16} />

            <span>Checkout</span>

          </div>

          {/* Page Title */}

          <h1 className="text-6xl font-bold text-white">

            Secure Checkout

          </h1>

          <p className="text-white/50 text-xl mt-4 max-w-2xl">

            Review your order, complete your payment,
            and enjoy healthy meals delivered fresh to your doorstep.

          </p>
                    {/* Checkout Layout */}

          <div className="mt-16 grid xl:grid-cols-[1.2fr_0.8fr] gap-10">

            {/* Left Side */}

            <div className="space-y-10">

              <CustomerForm

                name={name}
                phone={phone}
                address={address}

                setName={setName}
                setPhone={setPhone}
                setAddress={setAddress}

                phoneValid={phoneValid}
                nameValid={nameValid}
                addressValid={addressValid}

                loadingLocation={loadingLocation}
                location={location}

                getCurrentLocation={getCurrentLocation}

              />

              <PaymentSection

                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}

                paymentDone={paymentDone}
                setPaymentDone={setPaymentDone}

                grandTotal={grandTotal}

                upiLink={upiLink}

              />

              <PlaceOrderButton

                cart={cart}

                name={name}
                phone={phone}
                address={address}
                location={location}

                phoneValid={phoneValid}
                nameValid={nameValid}
                addressValid={addressValid}

                paymentMethod={paymentMethod}
                paymentDone={paymentDone}

                grandTotal={grandTotal}

                placingOrder={placingOrder}
                setPlacingOrder={setPlacingOrder}

              />

            </div>

            {/* Right Side */}

            <div>

              <OrderSummary

                cart={cart}

                totalPrice={totalPrice}

                deliveryCharge={deliveryCharge}

                gst={gst}

                discount={discount}

                grandTotal={grandTotal}

                coupon={coupon}

                setCoupon={setCoupon}

                applyCoupon={applyCoupon}

                increaseQuantity={increaseQuantity}

                decreaseQuantity={decreaseQuantity}

              />

            </div>

          </div>

          {/* Features */}

          <div className="mt-24 grid md:grid-cols-3 gap-8">

            <div className="bg-[#151515] border border-white/10 rounded-3xl p-8 text-center">

              <div className="text-5xl mb-4">
                🚚
              </div>

              <h3 className="text-white text-2xl font-bold">
                Fast Delivery
              </h3>

              <p className="text-white/50 mt-4 leading-7">
                Fresh food delivered within
                30–40 minutes.
              </p>

            </div>

            <div className="bg-[#151515] border border-white/10 rounded-3xl p-8 text-center">

              <div className="text-5xl mb-4">
                🥗
              </div>

              <h3 className="text-white text-2xl font-bold">
                Healthy Ingredients
              </h3>

              <p className="text-white/50 mt-4 leading-7">
                Prepared using fresh,
                nutritious and premium ingredients.
              </p>

            </div>

            <div className="bg-[#151515] border border-white/10 rounded-3xl p-8 text-center">

              <div className="text-5xl mb-4">
                🔒
              </div>

              <h3 className="text-white text-2xl font-bold">
                Secure Payment
              </h3>

              <p className="text-white/50 mt-4 leading-7">
                Safe UPI, COD and digital
                payment methods.
              </p>

            </div>

          </div>
                    {/* Premium Footer */}

          <div className="mt-28 rounded-[40px] bg-gradient-to-r from-[#171717] to-[#101010] border border-white/10 p-12">

            <div className="grid lg:grid-cols-3 gap-10">

              {/* Brand */}

              <div>

                <h2 className="text-4xl font-bold text-white">

                  Varahi Eat & Fit

                </h2>

                <p className="text-white/50 mt-5 leading-8">

                  We prepare every meal with fresh ingredients,
                  balanced nutrition and premium quality to
                  help you live a healthier lifestyle.

                </p>

              </div>

              {/* Customer Care */}

              <div>

                <h3 className="text-2xl font-bold text-white mb-5">

                  Customer Care

                </h3>

                <div className="space-y-4 text-white/60">

                  <p>📞 +91 63020 94687</p>

                  <p>📧 support@varahieatfit.com</p>

                  <p>🕒 Open Everyday</p>

                  <p>⏰ 8:00 AM – 10:00 PM</p>

                </div>

              </div>

              {/* Trust */}

              <div>

                <h3 className="text-2xl font-bold text-white mb-5">

                  Why Choose Us

                </h3>

                <div className="space-y-4 text-white/60">

                  <p>🥗 Fresh Ingredients</p>

                  <p>🚚 Fast Delivery</p>

                  <p>💳 Secure Payments</p>

                  <p>⭐ Premium Quality</p>

                </div>

              </div>

            </div>

            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">

              <p className="text-white/40">

                © {new Date().getFullYear()} Varahi Eat & Fit.
                All Rights Reserved.

              </p>

              <p className="text-[#E63946] font-semibold mt-4 md:mt-0">

                Made with ❤️ for Healthy Living

              </p>

            </div>

          </div>

        </div>

      </main>

    </>

  );

}