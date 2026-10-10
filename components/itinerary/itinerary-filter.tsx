
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Itinerary } from "../../types/itinerary";
import { ItineraryCard } from "./itinerary-card";

interface ItineraryFilterProps {
  itineraries: Itinerary[];
}

const statesAndUTs = [
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
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function normalizeStateName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ");
}

function getValidState(value: string | null) {
  if (!value) return "All";

  const normalizedValue = normalizeStateName(value);

  return (
    statesAndUTs.find(
      (state) => normalizeStateName(state) === normalizedValue,
    ) ?? "All"
  );
}

function getStateFromDestination(destination: string) {
  const value = normalizeStateName(destination);

  if (value.includes("kashmir")) {
    return "Jammu and Kashmir";
  }

  return (
    statesAndUTs.find((state) =>
      value.includes(normalizeStateName(state)),
    ) ?? null
  );
}

export function ItineraryFilter({
  itineraries,
}: ItineraryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const stateFromUrl = getValidState(searchParams.get("state"));

  const [selectedState, setSelectedState] = useState(stateFromUrl);

  // Sync the dropdown whenever the navbar URL changes.
  useEffect(() => {
    setSelectedState(stateFromUrl);
  }, [stateFromUrl]);

  // Update the URL and selected filter when the user changes the dropdown.
  function handleStateChange(state: string) {
    setSelectedState(state);

    const params = new URLSearchParams(searchParams.toString());

    if (state === "All") {
      params.delete("state");
    } else {
      params.set("state", state);
    }

    const queryString = params.toString();

    router.replace(
      queryString ? `/itineraries?${queryString}` : "/itineraries",
      { scroll: false },
    );
  }

  const filteredItineraries = useMemo(() => {
    if (selectedState === "All") {
      return itineraries;
    }

    return itineraries.filter(
      (itinerary) =>
        getStateFromDestination(itinerary.destination) === selectedState,
    );
  }, [itineraries, selectedState]);

  return (
    <>
      {/* FILTER */}
      <div className="mt-12 flex flex-col gap-4 border-y border-[#EAE5D9] py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#626A5D]">
            Browse by location
          </p>

          <p className="mt-1 text-sm text-[#626A5D]">
            {filteredItineraries.length}{" "}
            {filteredItineraries.length === 1
              ? "itinerary"
              : "itineraries"}
          </p>
        </div>

        <div className="relative">
          <select
            value={selectedState}
            onChange={(event) => handleStateChange(event.target.value)}
            aria-label="Filter itineraries by state or union territory"
            className="w-full min-w-[240px] appearance-none rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] px-4 py-3 pr-10 text-sm text-[#303A32] outline-none transition hover:border-[#A16F35] focus:border-[#A16F35] sm:w-auto"
          >
            <option value="All">All States &amp; UTs</option>

            {statesAndUTs.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#626A5D]">
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
          <p className="text-sm text-[#626A5D]">
            No itineraries available for {selectedState}.
          </p>
        </div>
      )}
    </>
  );
}
