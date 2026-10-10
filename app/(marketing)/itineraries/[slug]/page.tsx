
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Lock,
  MapPin,
  Sparkles,
} from "lucide-react";

import { itineraries } from "../../../../data/itineraries";
import { ItineraryBudgetButton } from "../../../../components/navigation/itinerary-budget-button";

interface ItineraryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const colors = {
  forest: "#263D32",
  deepForest: "#1D3027",
  gold: "#A16F35",
  lightGold: "#D4AC73",
  ivory: "#F8F6F0",
  surface: "#FFFEFA",
  border: "#EAE5D9",
  text: "#303A32",
  muted: "#626A5D",
  paleGold: "#F2EBDD",
  success: "#356345",
};

export async function generateStaticParams() {
  return itineraries.map((itinerary) => ({
    slug: itinerary.slug,
  }));
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const itinerary = itineraries.find((item) => item.slug === slug);

  if (!itinerary) return {};

  return {
    title: `${itinerary.title} | The Local Route`,
    description: itinerary.description,
  };
}

export default async function ItineraryPage({
  params,
}: ItineraryPageProps) {
  const { slug } = await params;

  const itinerary = itineraries.find((item) => item.slug === slug);

  if (!itinerary) notFound();

  return (
    <main
      className="min-h-screen overflow-hidden font-sans antialiased"
      style={{ backgroundColor: colors.ivory, color: colors.text }}
    >
      {/* HERO */}
      <section
        className="relative isolate flex min-h-[620px] items-end overflow-hidden sm:min-h-[700px]"
        style={{ backgroundColor: colors.deepForest }}
      >
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15271F]/85 via-[#1D3027]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15271F]/95 via-[#1D3027]/15 to-[#1D3027]/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-px w-9"
                style={{ backgroundColor: colors.lightGold }}
              />
              <p
                className="text-xs font-bold uppercase tracking-[0.24em]"
                style={{ color: colors.lightGold }}
              >
                The Local Route · Travel Journal
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-lg sm:px-4">
                <MapPin size={15} style={{ color: colors.lightGold }} />
                {itinerary.destination}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-lg sm:px-4">
                <Clock3 size={15} style={{ color: colors.lightGold }} />
                {itinerary.duration} nights
              </span>

              {itinerary.isPremium && (
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold sm:px-4"
                  style={{
                    backgroundColor: colors.lightGold,
                    color: colors.deepForest,
                  }}
                >
                  <Lock size={14} />
                  Premium guide
                </span>
              )}
            </div>

            <h1 className="mt-7 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              {itinerary.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg sm:leading-9">
              {itinerary.description}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#day-by-day"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{
                  backgroundColor: colors.lightGold,
                  color: colors.deepForest,
                }}
              >
                Explore the itinerary
                <ArrowDown
                  size={17}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>

              <span className="text-sm text-white/65">
                {itinerary.days.length} thoughtfully planned days
              </span>
            </div>
          </div>

          {/* Bottom hero details */}
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:mt-16 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                Duration
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {itinerary.days.length} days
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                Destination
              </p>
              <p className="mt-2 truncate text-lg font-semibold text-white">
                {itinerary.destination}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                Travel style
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {itinerary.isPremium
                  ? "Complete travel guide"
                  : "Travel inspiration"}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative details */}
        <div className="pointer-events-none absolute right-6 top-28 hidden h-24 w-24 rounded-full border border-white/20 lg:block" />
        <div
          className="pointer-events-none absolute right-12 top-32 hidden h-12 w-12 rounded-full border lg:block"
          style={{ borderColor: `${colors.lightGold}99` }}
        />
      </section>

      {/* ITINERARY + BUDGET SIDEBAR */}
      <section
        id="day-by-day"
        className="scroll-mt-24 px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pb-20"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12">
          {/* LEFT: DAY-BY-DAY ITINERARY */}
          <div className="min-w-0">
            <div
              className="mb-7 border-b pb-6 sm:mb-8"
              style={{ borderColor: colors.border }}
            >
              <div
                className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: colors.gold }}
              >
                <Sparkles size={14} />
                Your journey, day by day
              </div>

              <h2
                className="font-serif text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl"
                style={{ color: colors.forest }}
              >
                Explore the itinerary.
              </h2>

              <p
                className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
                style={{ color: colors.muted }}
              >
                Everything you need to know, one day at a time.
              </p>

              <div
                className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-medium sm:gap-3"
                style={{ color: colors.muted }}
              >
                <span
                  className="rounded-full border px-3 py-1.5"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  {itinerary.days.length} days
                </span>
                <span
                  className="rounded-full border px-3 py-1.5"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  {itinerary.duration} nights
                </span>
                <span
                  className="max-w-full rounded-full border px-3 py-1.5"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  {itinerary.destination}
                </span>
              </div>
            </div>

            {/* DAY CARDS */}
            <div className="space-y-4">
              {itinerary.days.map((day, index) => {
                const isLast = index === itinerary.days.length - 1;

                return (
                  <article
                    key={day.day}
                    className="group relative rounded-2xl border transition duration-200 hover:shadow-[0_8px_24px_-18px_rgba(38,61,50,0.35)]"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.surface,
                    }}
                  >
                    <div className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                      {/* DAY NUMBER */}
                      <div className="shrink-0">
                        <div
                          className="grid h-10 w-10 place-items-center rounded-xl font-serif text-base font-semibold transition-colors group-hover:brightness-110 sm:h-11 sm:w-11"
                          style={{
                            backgroundColor: colors.forest,
                            color: colors.lightGold,
                          }}
                        >
                          {String(day.day).padStart(2, "0")}
                        </div>
                      </div>

                      {/* DAY CONTENT */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p
                              className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                              style={{ color: colors.gold }}
                            >
                              Day {day.day}
                            </p>

                            <h3
                              className="font-serif text-lg font-semibold leading-snug tracking-[-0.015em] sm:text-xl"
                              style={{ color: colors.forest }}
                            >
                              {day.title}
                            </h3>
                          </div>

                          <span
                            className="mt-1 shrink-0 transition-colors group-hover:translate-x-0.5"
                            style={{ color: colors.gold }}
                          >
                            <ArrowRight size={17} />
                          </span>
                        </div>

                        <p
                          className="mt-2 text-sm leading-6"
                          style={{ color: colors.muted }}
                        >
                          {day.description}
                        </p>

                        {day.locations.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {day.locations.map((location) => (
                              <span
                                key={location}
                                className="inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium sm:text-xs"
                                style={{
                                  backgroundColor: colors.paleGold,
                                  color: colors.forest,
                                }}
                              >
                                <MapPin
                                  size={11}
                                  className="shrink-0"
                                  style={{ color: colors.gold }}
                                />
                                <span className="break-words">{location}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {isLast && (
                          <div
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold"
                            style={{ color: colors.success }}
                          >
                            <Check size={13} />
                            End of itinerary
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* RIGHT: BUDGET PLANNER SIDEBAR */}
          <aside className="min-w-0 lg:sticky lg:top-24">
            <div
              className="overflow-hidden rounded-2xl border"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surface,
              }}
            >
              {/* SIDEBAR HEADER */}
              <div
                className="p-5 text-white sm:p-6"
                style={{ backgroundColor: colors.forest }}
              >
                <div
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: colors.lightGold }}
                >
                  <Sparkles size={13} />
                  Your trip, your budget
                </div>

                <h2 className="mt-3 font-serif text-2xl font-medium leading-tight">
                  Plan your budget.
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  Estimate your trip cost before you set off.
                </p>
              </div>

              {/* SIDEBAR BODY */}
              <div className="p-5 sm:p-6">
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between gap-3 border-b pb-3"
                    style={{ borderColor: colors.border }}
                  >
                    <span className="text-sm" style={{ color: colors.muted }}>
                      Destination
                    </span>
                    <span
                      className="max-w-[55%] truncate text-right text-sm font-semibold"
                      style={{ color: colors.forest }}
                    >
                      {itinerary.destination}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between gap-3 border-b pb-3"
                    style={{ borderColor: colors.border }}
                  >
                    <span className="text-sm" style={{ color: colors.muted }}>
                      Duration
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.forest }}
                    >
                      {itinerary.days.length} days
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pb-1">
                    <span className="text-sm" style={{ color: colors.muted }}>
                      Travel plan
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.forest }}
                    >
                      {itinerary.isPremium ? "Premium" : "Standard"}
                    </span>
                  </div>
                </div>

                <div
                  className="my-5 rounded-xl border p-4"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.ivory,
                  }}
                >
                  <p
                    className="text-xs leading-5"
                    style={{ color: colors.muted }}
                  >
                    Travelling solo or with friends? Adjust your travel
                    preferences to get an estimated trip budget.
                  </p>
                </div>

                <div className="w-full [&_button]:w-full [&_button]:justify-center [&_button]:whitespace-normal">
                  <ItineraryBudgetButton
                    itinerary={itinerary}
                    variant="light"
                  />
                </div>

                <p
                  className="mt-3 text-center text-[11px] leading-5"
                  style={{ color: colors.muted }}
                >
                  Customise your budget with the planner.
                </p>
              </div>
            </div>

            {/* PREMIUM CARD */}
            {itinerary.isPremium && (
              <div
                className="mt-4 rounded-2xl border p-5"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }}
              >
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
                  style={{ color: colors.gold }}
                >
                  <Lock size={14} />
                  Premium guide
                </div>

                <h3
                  className="mt-3 font-serif text-xl font-semibold"
                  style={{ color: colors.forest }}
                >
                  Travel with a plan.
                </h3>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: colors.muted }}
                >
                  Unlock detailed routes, stay recommendations, transport
                  details and practical travel tips.
                </p>

                <div
                  className="mt-4 flex items-end justify-between gap-3 border-t pt-4"
                  style={{ borderColor: colors.border }}
                >
                  <div>
                    <p
                      className="text-[11px]"
                      style={{ color: colors.muted }}
                    >
                      One-time access
                    </p>
                    <p
                      className="mt-1 font-serif text-2xl font-semibold"
                      style={{ color: colors.forest }}
                    >
                      ₹{(itinerary.price ?? 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span
                    className="grid h-10 w-10 place-items-center rounded-full"
                    style={{
                      backgroundColor: colors.paleGold,
                      color: colors.gold,
                    }}
                  >
                    <Lock size={17} />
                  </span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
