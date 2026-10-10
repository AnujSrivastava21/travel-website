
import type { Metadata } from "next";

import { itineraries } from "../../../data/itineraries";
import { ItineraryFilter } from "../../../components/itinerary/itinerary-filter";
import { headingFont, bodyFont } from "../../font";

export const metadata: Metadata = {
  title: "Travel Itineraries",
  description:
    "Practical India travel itineraries with routes, destinations, experiences and travel planning tips.",
};

export default function ItinerariesPage() {
  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#F4EFE4] font-[var(--font-body)] text-[#2B2A26] antialiased`}
    >
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 text-[#2B2A26] sm:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#14213D] sm:text-5xl">
            Travel itineraries
          </h1>

          <p className="mt-4 text-base leading-7 text-[#4A463F] sm:text-lg sm:leading-8">
            Practical routes built from real journeys, with places to visit,
            travel days and a budget you can adjust for your group.
          </p>
        </div>

        <div className="mt-10 text-[#2B2A26]">
          <ItineraryFilter itineraries={itineraries} />
        </div>
      </section>
    </div>
  );
}
