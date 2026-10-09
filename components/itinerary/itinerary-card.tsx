
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock, Sparkles, X, CreditCard } from "lucide-react";

import type { Itinerary } from "../../types/itinerary";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const [showPayment, setShowPayment] = useState(false);

  const isPremium = Boolean(itinerary.isPremium);
  const price = itinerary.price ?? 149;

  return (
    <>
      <article className="group">
        {isPremium ? (
          <button
            type="button"
            onClick={() => setShowPayment(true)}
            className="block w-full cursor-pointer text-left"
            aria-label={`Unlock ${itinerary.title}`}
          >
            <CardContent itinerary={itinerary} />
          </button>
        ) : (
          <Link href={`/itineraries/${itinerary.slug}`} className="block">
            <CardContent itinerary={itinerary} />
          </Link>
        )}
      </article>

      {/* PREMIUM PAYMENT POPUP */}
      {showPayment && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setShowPayment(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="premium-payment-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-300/20 bg-[#101010] p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPayment(false)}
              aria-label="Close payment popup"
              className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
              <Lock size={25} className="text-amber-300" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Premium Access
            </p>

            <h2
              id="premium-payment-title"
              className="mt-3 pr-5 text-2xl font-semibold text-white"
            >
              Unlock your next journey
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Get access to the complete itinerary, detailed travel
              plan, budget estimates and practical travel tips.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/50">Selected itinerary</p>

              <p className="mt-1 font-medium text-white">
                {itinerary.title}
              </p>

              <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-white/60">One-time price</span>

                <span className="text-3xl font-semibold text-amber-300">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert("Payment integration will be added here later.")
              }
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 font-semibold text-black transition hover:bg-amber-200"
            >
              <CreditCard size={19} />
              Pay Now · ₹{price.toLocaleString("en-IN")}
            </button>

            <p className="mt-4 text-center text-xs text-white/40">
              Secure payment will be available soon.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function CardContent({ itinerary }: { itinerary: Itinerary }) {
  const isPremium = Boolean(itinerary.isPremium);

  return (
    <>
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5">
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition duration-500 ${
            isPremium
              ? "scale-105 blur-[1px] brightness-90"
              : "group-hover:scale-105"
          }`}
        />

        {/* PREMIUM BADGE — LEFT SIDE */}
        {isPremium && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/70 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300 backdrop-blur-md">
            <Sparkles size={13} />
            Premium
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-medium leading-snug text-white transition group-hover:text-white/70">
            {itinerary.title}
          </h2>

          <ArrowRight
            size={18}
            className="mt-1 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-white"
          />
        </div>

        <p className="mt-3 text-sm leading-6 text-white/50">
          {itinerary.description}
        </p>

        {/* PREMIUM MESSAGE */}
        {isPremium && (
          <div className="mt-4 flex items-center gap-2 text-sm text-amber-300">
            <Lock size={14} />
            You have to pay for this itinerary.
          </div>
        )}
      </div>
    </>
  );
}
