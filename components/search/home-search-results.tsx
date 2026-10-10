
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { itineraries } from "../../data/itineraries/index";
import type { Itinerary } from "../../types/itinerary";

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

function collectText(value: unknown, output: string[] = []): string[] {
  if (value == null) return output;

  if (typeof value === "string") {
    if (value.trim()) output.push(value);
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, output));
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
      collectText(nestedValue, output);
    }
  }

  return output;
}

function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

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

  if (queryWord.length >= 4 && textWord.includes(queryWord)) {
    return true;
  }

  if (queryWord.length < 5 || textWord.length < 5) {
    return false;
  }

  const maxDistance = queryWord.length >= 8 ? 2 : 1;

  if (Math.abs(queryWord.length - textWord.length) > maxDistance) {
    return false;
  }

  return levenshtein(queryWord, textWord) <= maxDistance;
}

function searchScore(itinerary: Itinerary, query: string): number {
  const queryWords = normalize(query).split(" ").filter(Boolean);
  if (!queryWords.length) return 0;

  const destination = normalize(itinerary.destination);
  const title = normalize(itinerary.title);

  const searchableText = [
    itinerary.destination,
    itinerary.title,
    itinerary.description,
    itinerary.slug,
    ...collectText(itinerary.days),
  ];

  const textWords = [
    ...new Set(
      searchableText
        .flatMap((text) => normalize(text).split(" "))
        .filter(Boolean),
    ),
  ];

  const matches = queryWords.every((queryWord) =>
    textWords.some((textWord) => wordMatches(queryWord, textWord)),
  );

  if (!matches) return 0;

  let score = 1;

  if (destination === normalize(query)) score += 150;
  else if (queryWords.some((word) => destination.includes(word))) score += 100;

  if (title === normalize(query)) score += 120;
  else if (queryWords.some((word) => title.includes(word))) score += 70;

  if (
    collectText(itinerary.days).some((text) =>
      queryWords.every((word) =>
        normalize(text)
          .split(" ")
          .some((textWord) => wordMatches(word, textWord)),
      ),
    )
  ) {
    score += 50;
  }

  return score;
}

export function HomeSearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("search") ?? "";
  const query = rawQuery.trim();

  const results = useMemo(() => {
    if (!query) return [];

    return itineraries
      .map((itinerary, index) => ({
        itinerary,
        index,
        score: searchScore(itinerary, query),
      }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map((result) => result.itinerary);
  }, [query]);

  if (!query) return null;

  return (
    <section
      id="home-search-results"
      className="w-full min-w-0 scroll-mt-28"
      aria-live="polite"
    >
      <div className="mb-6 flex min-w-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A622C]">
            Search results
          </p>

          <h2 className="mt-2 break-words text-2xl font-semibold text-[#263D32] sm:text-3xl">
            Results for &ldquo;{rawQuery}&rdquo;
          </h2>

          <p className="mt-2 text-sm text-[#626A5D]">
            {results.length} matching{" "}
            {results.length === 1 ? "itinerary" : "itineraries"}
          </p>
        </div>

        <Link
          href="/"
          className="shrink-0 py-2 text-sm font-medium text-[#8A622C] underline underline-offset-4 hover:text-[#263D32]"
        >
          Clear search
        </Link>
      </div>

      {results.length > 0 ? (
        <div className="flex w-full min-w-0 flex-col gap-3">
          {results.map((itinerary) => (
            <Link
              key={itinerary.id}
              href={`/itineraries/${itinerary.slug}`}
              className="group block w-full min-w-0 touch-manipulation rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] p-5 transition hover:border-[#A16F35] hover:shadow-md active:bg-[#F4F0E7] sm:p-6"
            >
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-xs font-medium uppercase tracking-[0.14em] text-[#8A622C]">
                    {itinerary.destination}
                  </p>

                  <h3 className="mt-2 break-words text-lg font-semibold text-[#263D32] transition group-hover:text-[#8A622C] sm:text-xl">
                    {itinerary.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-[#626A5D]">
                    {itinerary.description}
                  </p>

                  <p className="mt-3 text-xs text-[#626A5D]">
                    {itinerary.days.length}{" "}
                    {itinerary.days.length === 1 ? "day" : "days"} · Explore
                    destinations and sightseeing locations
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#263D32]">
                  View itinerary
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full min-w-0 rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] px-5 py-12 text-center sm:px-8">
          <h3 className="text-lg font-semibold text-[#263D32]">
            No matching itineraries found
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#626A5D]">
            Try another spelling or search for a destination or sightseeing
            location in your existing itinerary data.
          </p>
        </div>
      )}
    </section>
  );
}
