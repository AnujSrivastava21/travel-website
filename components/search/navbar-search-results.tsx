
"use client";

import Link from "next/link";
import { useMemo } from "react";

import { itineraries } from "../../data/itineraries/index";

type Props = {
  query: string;
  onSelect: () => void;
};

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

function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);

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

  return (
    Math.abs(queryWord.length - textWord.length) <= maxDistance &&
    levenshtein(queryWord, textWord) <= maxDistance
  );
}

function collectText(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectText);
  }

  if (value && typeof value === "object") {
    const ignoredKeys = new Set([
      "id",
      "image",
      "imageurl",
      "coverimage",
      "thumbnail",
      "url",
      "price",
    ]);

    return Object.entries(value)
      .filter(([key]) => !ignoredKeys.has(key.toLowerCase()))
      .flatMap(([, nestedValue]) => collectText(nestedValue));
  }

  return [];
}

function getScore(
  itinerary: (typeof itineraries)[number],
  query: string,
): number {
  const queryWords = normalize(query).split(" ").filter(Boolean);

  if (!queryWords.length) return 0;

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
  const normalizedQuery = normalize(query);
  const destination = normalize(itinerary.destination);
  const title = normalize(itinerary.title);

  if (destination === normalizedQuery) {
    score += 150;
  } else if (destination.includes(normalizedQuery)) {
    score += 100;
  }

  if (title.includes(normalizedQuery)) {
    score += 70;
  }

  return score;
}

export function NavbarSearchResults({ query, onSelect }: Props) {
  const results = useMemo(() => {
    if (!query.trim()) return [];

    return itineraries
      .map((itinerary, index) => ({
        itinerary,
        index,
        score: getScore(itinerary, query),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 8)
      .map((item) => item.itinerary);
  }, [query]);

  if (!query.trim()) return null;

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] text-left shadow-[0_18px_45px_-15px_rgba(20,33,61,0.28)]">
      <div className="border-b border-[#EAE5D9] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A622C]">
          Search results
        </p>

        <p className="mt-1 truncate text-sm text-[#626A5D]">
          Matches for &ldquo;{query.trim()}&rdquo;
        </p>
      </div>

      <div className="max-h-[min(60vh,380px)] overflow-y-auto overscroll-contain p-2">
        {results.length > 0 ? (
          <div className="flex flex-col gap-1">
            {results.map((itinerary) => (
              <Link
                key={itinerary.id}
                href={`/itineraries/${itinerary.slug}`}
                onNavigate={onSelect}
                className="block w-full min-w-0 touch-manipulation rounded-xl px-3 py-3 transition-colors hover:bg-[#F4F0E7] active:bg-[#E4EADF]"
              >
                <p className="truncate text-xs font-medium text-[#8A622C]">
                  {itinerary.destination}
                </p>

                <p className="mt-1 text-sm font-semibold leading-5 text-[#263D32]">
                  {itinerary.title}
                </p>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#626A5D]">
                  {itinerary.description}
                </p>

                <p className="mt-2 text-xs font-semibold text-[#8A622C]">
                  View itinerary →
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-3 py-8 text-center">
            <p className="text-sm font-semibold text-[#263D32]">
              No matching itineraries
            </p>

            <p className="mt-2 text-xs leading-5 text-[#626A5D]">
              Try another spelling or search for a sightseeing location.
            </p>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="border-t border-[#EAE5D9] px-4 py-3">
          <p className="text-xs text-[#626A5D]">
            Showing up to {results.length} matching{" "}
            {results.length === 1 ? "itinerary" : "itineraries"}
          </p>
        </div>
      )}
    </div>
  );
}
