"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ItineraryPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("itinerary-popup-shown");

    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("itinerary-popup-shown", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 sm:px-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close itinerary popup"
        onClick={() => setIsVisible(false)}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[3px]"
      />

      {/* Popup */}
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0b0b0b]/95 shadow-[0_30px_100px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/[0.08] blur-[80px]" />

        <div className="relative p-7 sm:p-9">
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsVisible(false)}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white"
          >
            <X size={16} />
          </button>

          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-amber-300/60" />

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-amber-300/70">
              Itinerary Planner
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-6 max-w-[400px] text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl">
            Planning your next trip
            <span className="block text-white/40">
              from Delhi?
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-[430px] text-sm leading-7 text-white/50 sm:text-base">
            Find ready-made travel itineraries with routes, stays, transport,
            budgets and places actually worth your time.
          </p>

          {/* Route preview */}
          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.08] text-xs text-amber-300">
              DL
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.16em] text-white/30">
                Start your journey
              </p>

              <p className="mt-1 text-sm font-medium text-white/80">
                Delhi → Your next destination
              </p>
            </div>

            <ArrowRight
              size={16}
              className="text-white/25"
            />
          </div>

          {/* CTA */}
          <Link
            href="/itineraries"
            onClick={() => setIsVisible(false)}
            className="group relative mt-7 flex w-full items-center justify-between overflow-hidden rounded-2xl bg-white px-5 py-4 text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_15px_50px_rgba(255,255,255,0.10)]"
          >
            <span className="relative text-sm font-medium">
              Explore itineraries
            </span>

            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>

          {/* Secondary action */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="mt-4 w-full text-center text-xs text-white/30 transition-colors hover:text-white/60"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}