
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

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeStateName(value: string) {
  return normalize(value);
}

function getValidState(value: string | null) {
  if (!value) return "All";

  return (
    statesAndUTs.find(
      (state) => normalizeStateName(state) === normalizeStateName(value),
    ) ?? "All"
  );
}

function getStateFromDestination(destination: string) {
  const value = normalize(destination);

  if (value.includes("kashmir")) {
    return "Jammu and Kashmir";
  }

  return (
    statesAndUTs.find((state) =>
      value.includes(normalize(state)),
    ) ?? null
  );
}

/**
 * Collect text from strings, arrays and nested objects.
 * This also supports locations stored as objects rather than strings.
 */
function collectText(value: unknown, output: string[] = [], depth = 0): string[] {
  if (depth > 10 || value == null) return output;

  if (typeof value === "string") {
    if (value.trim()) output.push(value);
    return output;
  }

  if (typeof value === "number") {
    return output;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectText(item, output, depth + 1);
    }
    return output;
  }

  if (typeof value === "object") {
    const ignoredKeys = new Set([
      "id",
      "image",
      "imageurl",
      "coverimage",
      "thumbnail",
      "url",
      "price",
    ]);

    for (const [key, nestedValue] of Object.entries(value)) {
      if (ignoredKeys.has(key.toLowerCase())) continue;
      collectText(nestedValue, output, depth + 1);
    }
  }

  return output;
}

/**
 * Calculate the edit distance between two words.
 * For example, "kerla" and "kerala" have a distance of 1.
 */
function levenshtein(a: string, b: string): number {
  const row = Array.from(
    { length: b.length + 1 },
    (_, index) => index,
  );

  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const previous = row[j];

      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
      );

      diagonal = previous;
    }
  }

  return row[b.length];
}

function wordMatches(queryWord: string, textWord: string): boolean {
  if (queryWord === textWord) return true;

  // Allow partial matches for longer words.
  if (
    queryWord.length >= 4 &&
    textWord.includes(queryWord)
  ) {
    return true;
  }

  // Avoid overly broad fuzzy matches for short words.
  if (queryWord.length < 5 || textWord.length < 5) {
    return false;
  }

  const maxDistance = queryWord.length >= 8 ? 2 : 1;

  if (Math.abs(queryWord.length - textWord.length) > maxDistance) {
    return false;
  }

  return levenshtein(queryWord, textWord) <= maxDistance;
}

/**
 * Every query word must match a word somewhere in the searchable text.
 * Matches can span different itinerary fields.
 */
function matchesSearch(allText: string[], query: string): boolean {
  const queryWords = normalize(query).split(" ").filter(Boolean);

  if (queryWords.length === 0) return true;

  const textWords = [
    ...new Set(
      allText.flatMap((text) => normalize(text).split(" ")).filter(Boolean),
    ),
  ];

  return queryWords.every((queryWord) =>
    textWords.some((textWord) => wordMatches(queryWord, textWord)),
  );
}

function getItineraryScore(
  itinerary: Itinerary,
  query: string,
): number {
  const destination = [itinerary.destination];
  const title = [itinerary.title];
  const description = [itinerary.description];
  const slug = [itinerary.slug];

  // Search every field inside every day, including nested location objects.
  const dayText = collectText(itinerary.days);

  const allText = [
    ...destination,
    ...title,
    ...description,
    ...slug,
    ...dayText,
  ];

  // No match anywhere means this itinerary should not appear.
  if (!matchesSearch(allText, query)) return 0;

  let score = 1;

  if (matchesSearch(destination, query)) score += 100;
  if (matchesSearch(title, query)) score += 70;
  if (matchesSearch(slug, query)) score += 20;
  if (matchesSearch(description, query)) score += 10;

  // Give extra priority to matches in sightseeing locations.
  if (matchesSearch(dayText, query)) score += 50;

  return score;
}

export function ItineraryFilter({
  itineraries,
}: ItineraryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") ?? "";
  const normalizedQuery = normalize(searchQuery);
  const stateFromUrl = getValidState(searchParams.get("state"));

  const [selectedState, setSelectedState] = useState(stateFromUrl);

  useEffect(() => {
    setSelectedState(stateFromUrl);
  }, [stateFromUrl]);

  function updateUrl(params: URLSearchParams) {
    const queryString = params.toString();

    router.push(
      queryString ? `/itinerary?${queryString}` : "/itinerary",
      { scroll: false },
    );
  }

  function handleStateChange(state: string) {
    setSelectedState(state);

    const params = new URLSearchParams(searchParams.toString());

    if (state === "All") {
      params.delete("state");
    } else {
      params.set("state", state);
    }

    updateUrl(params);
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    updateUrl(params);
  }

  const filteredItineraries = useMemo(() => {
    let results = itineraries.map((itinerary, index) => ({
      itinerary,
      index,
      score: normalizedQuery
        ? getItineraryScore(itinerary, normalizedQuery)
        : 1,
    }));

    if (normalizedQuery) {
      results = results.filter(({ score }) => score > 0);

      results.sort(
        (a, b) => b.score - a.score || a.index - b.index,
      );
    }

    if (selectedState !== "All") {
      results = results.filter(
        ({ itinerary }) =>
          getStateFromDestination(itinerary.destination) === selectedState,
      );
    }

    return results.map(({ itinerary }) => itinerary);
  }, [itineraries, normalizedQuery, selectedState]);

  return (
    <>
      <div className="mt-12 flex flex-col gap-4 border-y border-[#EAE5D9] py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#626A5D]">
            {normalizedQuery ? "Search results" : "Browse by location"}
          </p>

          <p className="mt-1 text-sm text-[#626A5D]">
            {filteredItineraries.length}{" "}
            {filteredItineraries.length === 1 ? "itinerary" : "itineraries"}

            {normalizedQuery && (
              <>
                {" "}for{" "}
                <span className="font-semibold text-[#303A32]">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </>
            )}
          </p>

          {normalizedQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-2 text-sm font-medium text-[#8A622C] underline underline-offset-4 hover:text-[#263D32]"
            >
              Clear search
            </button>
          )}
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

      {filteredItineraries.length > 0 && (
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              itinerary={itinerary}
            />
          ))}
        </div>
      )}

      {filteredItineraries.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-[var(--font-heading)] text-xl font-semibold text-[#263D32]">
            {normalizedQuery
              ? "No matching itineraries found"
              : "No itineraries available"}
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#626A5D]">
            {normalizedQuery
              ? `We couldn't find an itinerary matching "${searchQuery}"${
                  selectedState !== "All" ? ` in ${selectedState}` : ""
                }. Try another destination or sightseeing location.`
              : `No itineraries are currently available for ${selectedState}.`}
          </p>

          {normalizedQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-5 rounded-xl bg-[#263D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#385344]"
            >
              View all itineraries
            </button>
          )}
        </div>
      )}
    </>
  );
}
