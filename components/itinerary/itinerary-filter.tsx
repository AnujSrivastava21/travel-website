"use client";

import { useMemo, useState } from "react";

import type { Itinerary } from "../../types/itinerary";
import { ItineraryCard } from "./itinerary-card";

interface ItineraryFilterProps {
  itineraries: Itinerary[];
}

const statesAndUTs = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function getStateFromDestination(destination: string) {
  const value = destination.toLowerCase().trim();

  // Your current Kashmir itinerary
  if (value === "kashmir") {
    return "Jammu and Kashmir";
  }

  return (
    statesAndUTs.find((state) =>
      value.includes(state.toLowerCase())
    ) ?? null
  );
}

export function ItineraryFilter({
  itineraries,
}: ItineraryFilterProps) {
  const [selectedState, setSelectedState] = useState("All");

  const filteredItineraries = useMemo(() => {
    if (selectedState === "All") {
      return itineraries;
    }

    return itineraries.filter(
      (itinerary) =>
        getStateFromDestination(itinerary.destination) ===
        selectedState
    );
  }, [itineraries, selectedState]);

  return (
    <>
      {/* FILTER */}
      <div className="mt-12 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Browse by location
          </p>

          <p className="mt-1 text-sm text-white/50">
            {filteredItineraries.length}{" "}
            {filteredItineraries.length === 1
              ? "itinerary"
              : "itineraries"}
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedState}
            onChange={(event) =>
              setSelectedState(event.target.value)
            }
            aria-label="Filter itineraries by state or union territory"
            className="w-full min-w-[240px] appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm text-white outline-none transition hover:border-white/20 focus:border-white/30 sm:w-auto"
          >
            <option value="All" className="bg-black text-white">
              All States & UTs
            </option>

            {statesAndUTs.map((state) => (
              <option
                key={state}
                value={state}
                className="bg-black text-white"
              >
                {state}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40">
            ▼
          </span>
        </div>
      </div>

      {/* ITINERARIES */}
      <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {filteredItineraries.map((itinerary) => (
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
          />
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredItineraries.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-white/40">
            No itineraries available for {selectedState}.
          </p>
        </div>
      )}
    </>
  );
}