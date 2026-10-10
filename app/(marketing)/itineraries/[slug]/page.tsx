import type { Metadata } from "next";
import { Suspense } from "react";

import { itineraries } from "../../../../data/itineraries/index";
import { ItineraryFilter } from "../../../../components/itinerary/itinerary-filter";
import { headingFont, bodyFont } from "../../../font";

export const metadata: Metadata = {
  title: "Travel Itineraries",
  description:
    "Practical India travel itineraries with routes, destinations, experiences and travel planning tips.",
};

export default function ItinerariesPage() {
  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#263D32] sm:text-5xl">
            Travel itineraries
          </h1>

          <p className="mt-4 text-base leading-7 text-[#626A5D] sm:text-lg sm:leading-8">
            Practical routes built from real journeys, with places to visit,
            travel days and a budget you can adjust for your group.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mt-12 py-8 text-sm text-[#626A5D]">
              Loading itineraries...
            </div>
          }
        >
          <ItineraryFilter itineraries={itineraries} />
        </Suspense>
      </section>
    </div>
  );
}