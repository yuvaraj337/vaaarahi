"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

import { Offer } from "@/types/offer";
import { getOffers } from "@/lib/offerService";

export default function OfferBanner() {
  const [offer, setOffer] =
    useState<Offer | null>(null);

  const [visible, setVisible] =
    useState(true);

  useEffect(() => {
    async function loadOffer() {
      try {
        const offers = await getOffers();

        const activeOffer = offers.find(
          (item) => item.active === true
        );

        if (activeOffer) {
          setOffer(activeOffer);
        }
      } catch (error) {
        console.error(
          "Failed to load offer:",
          error
        );
      }
    }

    loadOffer();
  }, []);

  if (!offer || !visible) {
    return null;
  }

  const handleOrder = () => {
    const menu =
      document.getElementById("menu");

    if (menu) {
      menu.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCopyCode = async () => {
    if (!offer.code) return;

    try {
      await navigator.clipboard.writeText(
        offer.code
      );

      toast.success(
        `Coupon code ${offer.code} copied`
      );
    } catch {
      toast.error("Unable to copy coupon code");
    }
  };

  return (
    <section className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 pt-4">

      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#E63946]/50 bg-gradient-to-r from-[#6d080f] via-[#9d1018] to-[#3b0508] shadow-[0_15px_50px_rgba(230,57,70,0.20)]">

        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_35%)] pointer-events-none" />

        {/* Food image */}
        {offer.image && (
          <div className="absolute right-0 top-0 h-full w-[25%] min-w-[130px] overflow-hidden opacity-80">

            <Image
              src={offer.image}
              alt={offer.title}
              fill
              sizes="25vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#6d080f] via-[#6d080f]/40 to-transparent" />

          </div>
        )}

        {/* Close */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/80 transition hover:bg-black/60 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex min-h-[130px] items-center px-5 py-6 sm:px-8 sm:py-7 lg:px-10">

          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:pr-[20%]">

            {/* Offer text */}
            <div>

              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#FFCC00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black sm:text-xs">
                <Tag className="h-3 w-3" />
                Limited Time Offer
              </div>

              <h2 className="text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
                {offer.title}
              </h2>

              <p className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                {offer.subtitle}
              </p>

              {offer.description && (
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  {offer.description}
                </p>
              )}

            </div>

            {/* Code + button */}
            <div className="flex shrink-0 flex-wrap items-center gap-3">

              {offer.code && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="rounded-xl border border-dashed border-[#FFCC00]/70 bg-black/20 px-4 py-2 text-left transition hover:bg-black/30"
                >
                  <span className="block text-[10px] text-white/60">
                    Use Code
                  </span>

                  <span className="text-sm font-extrabold tracking-wider text-[#FFCC00] sm:text-base">
                    {offer.code}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleOrder}
                className="flex items-center gap-2 rounded-xl bg-[#FFCC00] px-5 py-3 text-sm font-extrabold text-black transition hover:scale-105 hover:bg-yellow-300 active:scale-95"
              >
                {offer.buttonText || "ORDER NOW"}

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}