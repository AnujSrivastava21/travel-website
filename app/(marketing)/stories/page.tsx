
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { travelPosts } from "../../../data/travel-posts";
import { TravelCard } from "../../../components/travel/travel-card";

export const metadata: Metadata = {
  title: "Travel Stories | Real Journeys Across India",
  description:
    "Discover real travel stories, unexpected encounters and unforgettable journeys across India.",
};

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#080808]">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-amber-400/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-white/[0.025] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-200/70 sm:text-xs">
              <span className="h-px w-8 bg-amber-300/70" />
              Stories from the road
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Not just places.
              <span className="block text-white/40">
                Stories worth remembering.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              From remote mountain villages to unexpected encounters, explore
              the real experiences, people and moments that make every journey
              unforgettable.
            </p>

            {travelPosts.length > 0 && (
              <a
                href="#stories"
                className="mt-8 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 transition hover:text-amber-200 sm:text-xs"
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
        className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-200/60 sm:text-xs">
              The travel journal
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Journeys, honestly told.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
              Real experiences and memories collected along the way.
            </p>
          </div>

          <p className="text-xs text-white/35">
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
          <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-14 text-center">
            <p className="text-lg font-medium text-white/80">
              Every great journey starts somewhere.
            </p>
            <p className="mt-2 text-sm text-white/40">
              New travel stories are coming soon.
            </p>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-14">
          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-200/60 sm:text-xs">
              Your next adventure
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Turn your travel plans into reality.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/45">
              Explore ready-to-use itineraries designed to make planning your
              next trip easier.
            </p>
          </div>

          <Link
            href="/itineraries"
            className="group inline-flex shrink-0 items-center justify-between gap-5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white transition hover:border-amber-200/40 hover:bg-white/[0.08]"
          >
            Explore itineraries
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
