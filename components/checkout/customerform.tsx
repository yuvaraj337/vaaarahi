"use client";

import {
  User,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface Props {
  name: string;
  phone: string;
  address: string;

  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;

  phoneValid: boolean;
  nameValid: boolean;
  addressValid: boolean;

  loadingLocation: boolean;
  location: string;

  getCurrentLocation: () => void;
}

export default function CustomerForm({
  name,
  phone,
  address,

  setName,
  setPhone,
  setAddress,

  phoneValid,
  nameValid,
  addressValid,

  loadingLocation,
  location,

  getCurrentLocation,
}: Props) {
  return (
    <div className="bg-[#171717] rounded-3xl border border-white/10 p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-8">
        Customer Details
      </h2>

      {/* Name */}

      <div className="mb-6">

        <label className="text-white/70 mb-2 block">
          Full Name
        </label>

        <div className="relative">

          <User
            className="absolute left-4 top-4 text-white/40"
            size={20}
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className={`w-full bg-[#222] rounded-2xl py-4 pl-12 pr-4 outline-none border transition ${
              name.length === 0
                ? "border-white/10"
                : nameValid
                ? "border-green-500"
                : "border-red-500"
            }`}
          />

        </div>

        {name.length > 0 && (

          <p
            className={`mt-2 text-sm ${
              nameValid
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {nameValid
              ? "✔ Valid Name"
              : "Minimum 3 letters required"}

          </p>

        )}

      </div>

      {/* Phone */}

      <div className="mb-6">

        <label className="text-white/70 mb-2 block">
          Mobile Number
        </label>

        <div className="relative">

          <Phone
            className="absolute left-4 top-4 text-white/40"
            size={20}
          />

          <input
            maxLength={10}
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="9876543210"
            className={`w-full bg-[#222] rounded-2xl py-4 pl-12 pr-4 outline-none border transition ${
              phone.length === 0
                ? "border-white/10"
                : phoneValid
                ? "border-green-500"
                : "border-red-500"
            }`}
          />

        </div>

        {phone.length > 0 && (

          <p
            className={`mt-2 text-sm ${
              phoneValid
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {phoneValid
              ? "✔ Valid Mobile Number"
              : "Must start with 6/7/8/9 and contain exactly 10 digits"}

          </p>

        )}

      </div>

      {/* Address */}

      <div className="mb-6">

        <label className="text-white/70 mb-2 block">
          Delivery Address
        </label>

        <div className="relative">

          <MapPin
            className="absolute left-4 top-4 text-white/40"
            size={20}
          />

          <textarea
            rows={5}
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Enter complete address..."
            className={`w-full bg-[#222] rounded-2xl pt-4 pl-12 pr-4 outline-none border transition ${
              address.length === 0
                ? "border-white/10"
                : addressValid
                ? "border-green-500"
                : "border-red-500"
            }`}
          />

        </div>

        {address.length > 0 && (

          <p
            className={`mt-2 text-sm ${
              addressValid
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {addressValid
              ? "✔ Valid Address"
              : "Address must contain at least 20 characters"}

          </p>

        )}

      </div>

      {/* Current Location */}

      <button
        onClick={getCurrentLocation}
        className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-4 font-bold transition"
      >
        {loadingLocation
          ? "Detecting Location..."
          : "📍 Use Current Location"}
      </button>

      {location && (

        <div className="mt-5 flex items-center gap-3 text-green-400">

          <CheckCircle2 />

          <span>
            Location Captured Successfully
          </span>

        </div>

      )}

    </div>
  );
}