import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";

import { itineraries } from "../../../../data/itineraries";

interface ItineraryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return itineraries.map((itinerary) => ({
    slug: itinerary.slug,
  }));
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const itinerary = itineraries.find(
    (item) => item.slug === slug
  );

  if (!itinerary) {
    return {};
  }

  return {
    title: itinerary.title,
    description: itinerary.description,
  };
}

export default async function ItineraryPage({
  params,
}: ItineraryPageProps) {
  const { slug } = await params;

  const itinerary = itineraries.find(
    (item) => item.slug === slug
  );

  if (!itinerary) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black">
      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden">
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-white/50">
              {itinerary.destination}
            </span>

            <span className="text-white/30">•</span>

            <span className="text-white/50">
              {itinerary.duration} Days
            </span>

            {itinerary.isPremium && (
              <>
                <span className="text-white/30">•</span>

                <span className="flex items-center gap-2 text-white">
                  <Lock size={14} />
                  Premium
                </span>
              </>
            )}
          </div>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {itinerary.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {itinerary.description}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Route
          </p>

          <h2 className="mt-4 text-3xl font-semibold">
            Day-by-day itinerary
          </h2>
        </div>

        <div className="space-y-0">
          {itinerary.days.map((day) => (
            <div
              key={day.day}
              className="border-t border-white/10 py-10"
            >
              <div className="grid gap-6 md:grid-cols-[100px_1fr]">
                <p className="text-sm uppercase tracking-[0.15em] text-white/40">
                  Day {day.day}
                </p>

                <div>
                  <h3 className="text-2xl font-medium">
                    {day.title}
                  </h3>

                  <p className="mt-4 max-w-2xl leading-7 text-white/50">
                    {day.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {day.locations.map((location) => (
                      <span
                        key={location}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PREMIUM CTA */}
        {itinerary.isPremium && (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Lock size={18} />

              <p className="text-sm uppercase tracking-[0.15em] text-white/50">
                Premium itinerary
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-semibold">
              Get the complete travel plan
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-white/50">
              Detailed routes, stay recommendations, estimated budget,
              transportation options and practical travel tips will be
              available in the premium version.
            </p>

            <button
              type="button"
              className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Unlock for ₹{itinerary.price}
            </button>
          </div>
        )}
      </section>
    </article>
  );
}