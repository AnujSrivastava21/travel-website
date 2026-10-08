"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

export function PremiumCard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const firstName = session?.user?.name?.split(" ")[0] ?? "Traveller";

  return (
    <div className="relative mt-20 overflow-hidden rounded-3xl border border-amber-300/25 bg-gradient-to-br from-amber-400/15 via-yellow-300/5 to-transparent p-8 md:p-12">
      {/* GOLDEN GLOW */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative">
        {/* LABEL */}
        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
          <Sparkles size={16} />
          Premium Itinerary
        </div>

        {session ? (
          <>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Welcome back, {firstName}.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Explore detailed travel plans with complete routes, stays,
              budgets, local experiences and practical travel tips.
            </p>

            <Link
              href="/itineraries/premium"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-amber-200"
            >
              Explore Premium
              <ArrowRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10">
                <Lock size={18} className="text-amber-300" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Unlock the complete journey
              </h2>
            </div>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Get access to detailed routes, stays, budgets, local
              experiences and practical travel tips from real journeys.
            </p>

            <Link
              href="/login?callbackUrl=/itineraries"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-amber-200"
            >
              Log in to unlock
              <ArrowRight size={16} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}