
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SearchItinerary = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  description: string;
  duration: number | null;
  coverImage: string | null;
};

type NavbarSearchResultsProps = {
  query: string;
  onSelect?: () => void;
};

export function NavbarSearchResults({
  query,
  onSelect,
}: NavbarSearchResultsProps) {
  const [results, setResults] = useState<SearchItinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchTerm = query.trim();

    if (searchTerm.length < 2) {
      setResults([]);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `/api/itineraries-search?q=${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data: { results?: SearchItinerary[] } =
          await response.json();

        setResults(data.results ?? []);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setResults([]);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  if (query.trim().length < 2) {
    return null;
  }

  return (
    <div
      role="listbox"
      aria-label="Itinerary suggestions"
      className="overflow-hidden rounded-2xl border border-[#EAE5D9]
        bg-[#FFFEFA] shadow-[0_20px_60px_-20px_rgba(29,48,39,0.25)]"
    >
      {/* DROPDOWN HEADER */}
      <div className="border-b border-[#EAE5D9] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A7355]">
          Discover your route
        </p>

        <p className="mt-1 text-xs text-[#626A5D]">
          Matching itineraries
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="px-4 py-4 text-sm text-[#626A5D]">
          Finding your next journey...
        </p>
      )}

      {/* ERROR */}
      {!loading && error && (
        <p className="px-4 py-4 text-sm text-red-700">
          Search failed. Please try again.
        </p>
      )}

      {/* EMPTY RESULTS */}
      {!loading && !error && results.length === 0 && (
        <p className="px-4 py-4 text-sm text-[#626A5D]">
          No matching itineraries found.
        </p>
      )}

      {/* SCROLLABLE RESULTS */}
      {!loading && !error && results.length > 0 && (
        <div className="max-h-[360px] overflow-y-auto overscroll-contain">
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/itineraries/${item.slug}`}
              role="option"
              onClick={onSelect}
              className="group flex items-center gap-4 border-b
                border-[#EAE5D9]/70 px-4 py-3 transition-colors
                last:border-b-0 hover:bg-[#F3F1E9]"
            >
              {/* TITLE AND DESCRIPTION */}
              <div className="min-w-0 flex-1">
                <p
                  className="line-clamp-1 text-sm font-semibold
                    text-[#263D32] transition-colors
                    group-hover:text-[#A16F35]"
                >
                  {item.title}
                </p>

                <p className="mt-1 text-[11px] font-medium text-[#8A7355]">
                  {item.destination}
                  {item.duration ? ` · ${item.duration} days` : ""}
                </p>

                <p
                  className="mt-1.5 line-clamp-2 text-xs
                    leading-relaxed text-[#626A5D]"
                >
                  {item.description ||
                    "Explore destinations, local experiences, and a journey at your own pace."}
                </p>
              </div>

              {/* IMAGE ON THE RIGHT */}
              <div
                className="h-[76px] w-[96px] shrink-0 overflow-hidden
                  rounded-xl bg-[#E4EADF]"
              >
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.destination || item.title}
                    loading="lazy"
                    className="h-full w-full object-cover
                      transition-transform duration-300
                      group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center
                      text-xs text-[#626A5D]"
                  >
                    Explore
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
