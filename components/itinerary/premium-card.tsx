
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function PremiumCard() {
  return (
    <div className="relative mt-20 overflow-hidden rounded-3xl border border-amber-300/25 bg-gradient-to-br from-amber-400/10 via-yellow-300/5 to-transparent p-8 md:p-12">
      {/* GOLDEN GLOW */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative">
        {/* PREMIUM LABEL */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300">
          <Sparkles size={13} />
          Premium
        </div>

        {/* HEADING */}
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Unlock the complete journey
        </h2>

        {/* MESSAGE */}
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
          You have to pay for this itinerary to access the complete
          travel plan, routes, stays, budget and practical travel tips.
        </p>

        {/* BUTTON */}
        <Link
          href="/itineraries/premium"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-amber-200"
        >
          View Premium Itinerary
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
