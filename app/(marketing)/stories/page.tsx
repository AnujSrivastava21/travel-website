
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import TestPaymentButton from "../../../components/payment/test-payment-button";
import { travelPosts } from "../../../data/travel-posts";
import { TravelCard } from "../../../components/travel/travel-card";
import { headingFont, bodyFont } from "../../font";

export const metadata: Metadata = {
  title: "Travel Stories | Real Journeys Across India",
  description:
    "Discover real travel stories, unexpected encounters and unforgettable journeys across India.",
};

export default function TravelPage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#EAE5D9] bg-[#F8F6F0]">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[#A16F35]/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-[#263D32]/[0.035] blur-[100px]" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:pb-24 lg:pt-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#A16F35] sm:text-xs">
              <span className="h-px w-8 bg-[#A16F35]" />
              Stories from the road
            </div>

            <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#263D32] sm:text-5xl lg:text-6xl">
              Not just places.
              <span className="block text-[#626A5D]/65">
                Stories worth remembering.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
              From remote mountain villages to unexpected encounters, explore
              the real experiences, people and moments that make every journey
              unforgettable.
            </p>

            {travelPosts.length > 0 && (
              <a
                href="#stories"
                className="mt-8 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#626A5D] transition hover:text-[#A16F35] sm:text-xs"
              >
                Read the stories
                <ArrowDown size={14} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section
        id="stories"
        className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#A16F35] sm:text-xs">
              The travel journal
            </p>

            <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-[#263D32] sm:text-3xl">
              Journeys, honestly told.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#626A5D]">
              Real experiences and memories collected along the way.
            </p>
          </div>

          <p className="text-xs text-[#626A5D]">
            {travelPosts.length}{" "}
            {travelPosts.length === 1 ? "story" : "stories"}
          </p>
        </div>

        {travelPosts.length > 0 ? (
          <div className="mt-9 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {travelPosts.map((post) => (
              <TravelCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-2xl border border-[#EAE5D9] bg-white/60 px-6 py-14 text-center">
            <p className="font-[var(--font-heading)] text-lg font-medium text-[#263D32]">
              Every great journey starts somewhere.
            </p>

            <p className="mt-2 text-sm text-[#626A5D]">
              New travel stories are coming soon.
            </p>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-[#EAE5D9] bg-[#FFFEFA]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14">
          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#A16F35] sm:text-xs">
              Your next adventure
            </p>

            <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-[#263D32] sm:text-3xl">
              Turn your travel plans into reality.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#626A5D]">
              Explore ready-to-use itineraries designed to make planning your
              next trip easier.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[260px]">
            <Link
              href="/itineraries"
              className="group inline-flex w-full items-center justify-between gap-5 rounded-full border border-[#EAE5D9] bg-[#F8F6F0] px-5 py-3.5 text-sm font-medium text-[#263D32] transition hover:border-[#A16F35]/50 hover:bg-[#EAE5D9]/60"
            >
              Explore itineraries
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>


          </div>
        </div>
      </section>
    </main>
  );
}
