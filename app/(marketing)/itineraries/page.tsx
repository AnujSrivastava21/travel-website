import type { Metadata } from "next";

import { itineraries } from "../../../data/itineraries";
import { ItineraryFilter } from "../../../components/itinerary/itinerary-filter";

export const metadata: Metadata = {
  title: "Travel Itineraries",
  description:
    "Practical India travel itineraries with routes, destinations, experiences and travel planning tips.",
};

export default function ItinerariesPage() {
  return (
    <div className="min-h-screen bg-black pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Plan your journey
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            Travel Itineraries
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Practical routes built from real journeys — with places to
            visit, travel days, experiences and useful planning information.
          </p>
        </div>

        <ItineraryFilter itineraries={itineraries} />
      </section>
    </div>
  );
}