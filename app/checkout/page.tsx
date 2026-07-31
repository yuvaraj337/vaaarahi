"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useCart } from "@/components/cart/CartContext";

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

    if (
      coupon.toUpperCase() ===
      "WELCOME100"
    ) {

      setDiscount(100);

      toast.success(
        "Coupon Applied!"
      );

    } else {

      toast.error(
        "Invalid Coupon"
      );

    }

  }

  function getCurrentLocation() {

    if (!navigator.geolocation) {

      toast.error(
        "Location not supported"
      );

      return;

    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation(
          `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
        );

        setLoadingLocation(false);

        toast.success(
          "Location Captured"
        );

      },

      () => {

        setLoadingLocation(false);

        toast.error(
          "Permission Denied"
        );

      }

    );

  }

  const upiLink =
    `upi://pay?pa=6302094687@ybl&pn=Varahi Eat & Fit&am=${grandTotal}`;

  return (

    <main className="min-h-screen bg-[#0F0F10] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-white mb-16">

          Checkout

        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

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

    </main>

  );

}