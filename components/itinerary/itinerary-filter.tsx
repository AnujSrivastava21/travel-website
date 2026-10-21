
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { Itinerary } from "../../types/itinerary";
import { ItineraryCard } from "./itinerary-card";

import {
  INITIAL_VISIBLE,
  LOAD_MORE_COUNT,
  categories,
  categoryLabels,
  optionsByCategory,
  sortToggleOptions,
  type FilterCategory,
  type ItinerarySort,
} from "./itinerary-filter-data";

import {
  clearFilterParams,
  filterItineraries,
  getActiveCategory,
  getSelectedValue,
  isFilterCategory,
} from "./itinerary-filter-logic";

interface ItineraryFilterProps {
  itineraries: Itinerary[];
}

export function ItineraryFilter({
  itineraries,
}: ItineraryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsString = searchParams.toString();
  const params = new URLSearchParams(paramsString);

  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>(() => getActiveCategory(params));

  const [itinerarySort, setItinerarySort] =
    useState<ItinerarySort>("newest");

  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  useEffect(() => {
    setActiveCategory(
      getActiveCategory(new URLSearchParams(paramsString)),
    );
    setVisibleCount(INITIAL_VISIBLE);
  }, [paramsString]);

  const categoryOptions = optionsByCategory[activeCategory];
  const selectedValue = getSelectedValue(activeCategory, params);

  function updateUrl(nextParams: URLSearchParams) {
    const query = nextParams.toString();

    router.push(
      query ? `/itineraries?${query}` : "/itineraries",
      { scroll: false },
    );
  }

  function changeCategory(value: string) {
    const nextCategory = isFilterCategory(value) ? value : "all";
    const nextParams = new URLSearchParams(paramsString);

    clearFilterParams(nextParams);

    setActiveCategory(nextCategory);
    setVisibleCount(INITIAL_VISIBLE);

    if (nextCategory !== "all") {
      nextParams.set("filterCategory", nextCategory);
    }

    updateUrl(nextParams);
  }

  function changeOption(value: string) {
    if (activeCategory === "all") return;

    const nextParams = new URLSearchParams(paramsString);

    if (activeCategory === "region") {
      nextParams.delete("direction");
      nextParams.delete("state");
    }

    if (value) {
      nextParams.set(activeCategory, value);
    } else {
      nextParams.delete(activeCategory);
    }

    nextParams.set("filterCategory", activeCategory);

    setVisibleCount(INITIAL_VISIBLE);
    updateUrl(nextParams);
  }

  function clearAllFilters() {
    const nextParams = new URLSearchParams(paramsString);

    clearFilterParams(nextParams);

    setActiveCategory("all");
    setVisibleCount(INITIAL_VISIBLE);
    updateUrl(nextParams);
  }

  const filteredItineraries = useMemo(
    () =>
      filterItineraries(
        itineraries,
        paramsString,
        itinerarySort,
      ),
    [itineraries, paramsString, itinerarySort],
  );

  const visibleItineraries = filteredItineraries.slice(
    0,
    visibleCount,
  );

  const remainingCount = Math.max(
    0,
    filteredItineraries.length - visibleItineraries.length,
  );

  const hasAppliedFilter = [
    "region",
    "direction",
    "budget",
    "duration",
    "occasion",
    "travelStyle",
    "culture",
    "season",
    "sort",
  ].some((key) => Boolean(params.get(key)));

  return (
    <>
      <section className="mt-12 border-y border-[#EAE5D9] py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#626A5D]">
              Browse & refine
            </p>

            <h2 className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-[#263D32]">
              Find your kind of journey
            </h2>

            <p className="mt-1 text-sm text-[#626A5D]">
              {filteredItineraries.length}{" "}
              {filteredItineraries.length === 1
                ? "itinerary"
                : "itineraries"}{" "}
              found
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 sm:ml-auto">
            <div className="flex items-center justify-end gap-2">
              {/* Dropdown 1: Filter category */}
              <div className="relative">
                <select
                  aria-label="Filter category"
                  value={activeCategory}
                  onChange={(event) =>
                    changeCategory(event.target.value)
                  }
                  className="h-10 w-[125px] appearance-none rounded-xl border border-[#EAE5D9] bg-white py-2 pl-4 pr-8 text-xs font-medium text-[#263D32] outline-none transition hover:border-[#C8C0AF] focus:border-[#263D32] sm:w-[140px] sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#626A5D]"
                />
              </div>

              {/* Dropdown 2: Options for selected category */}
              <div className="relative">
                <select
                  aria-label="Filter option"
                  value={selectedValue}
                  onChange={(event) =>
                    changeOption(event.target.value)
                  }
                  disabled={activeCategory === "all"}
                  className="h-10 w-[145px] appearance-none rounded-xl border border-[#EAE5D9] bg-white py-2 pl-4 pr-8 text-xs font-medium text-[#263D32] outline-none transition hover:border-[#C8C0AF] focus:border-[#263D32] disabled:cursor-not-allowed disabled:bg-[#F8F6F1] disabled:text-[#96988F] sm:w-[160px] sm:text-sm"
                >
                  <option value="">
                    {activeCategory === "all"
                      ? "Choose option"
                      : `All ${categoryLabels[
                          activeCategory
                        ].toLowerCase()}`}
                  </option>

                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#626A5D]"
                />
              </div>
            </div>

            <button
  type="button"
  onClick={clearAllFilters}
  className="inline-flex items-center gap-1 text-xs font-medium text-[#8A622C] transition hover:text-[#263D32]"
>
  Clear filters
  <span aria-hidden="true">×</span>
</button>
          </div>
        </div>
      </section>

      {filteredItineraries.length > 0 ? (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#626A5D]">
              Explore itineraries
            </p>

            <div
              className="inline-flex rounded-full border border-[#EAE5D9] bg-white p-1"
              role="group"
              aria-label="Sort itineraries"
            >
              {sortToggleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setItinerarySort(option.value);
                    setVisibleCount(INITIAL_VISIBLE);
                  }}
                  aria-pressed={itinerarySort === option.value}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    itinerarySort === option.value
                      ? "bg-[#263D32] text-white"
                      : "text-[#626A5D] hover:bg-[#F3F1E9]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {visibleItineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary.id}
                itinerary={itinerary}
              />
            ))}
          </div>

          {filteredItineraries.length > INITIAL_VISIBLE && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-xs text-[#626A5D]">
                Showing {visibleItineraries.length} of{" "}
                {filteredItineraries.length} itineraries
              </p>

              {remainingCount > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) =>
                      Math.min(
                        current + LOAD_MORE_COUNT,
                        filteredItineraries.length,
                      ),
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-[#263D32] bg-[#263D32] px-6 py-3 text-sm font-semibold text-[#FFFEFA] transition hover:bg-[#385344] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35] focus-visible:ring-offset-2"
                >
                  Show More
                  <ChevronDown size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EAE5D9] bg-white px-6 py-3 text-sm font-semibold text-[#263D32] transition hover:bg-[#F3F1E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35] focus-visible:ring-offset-2"
                >
                  Show Less
                  <ChevronUp size={16} />
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center">
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[#263D32]">
            No matching itineraries found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#626A5D]">
            Try another option or clear your filters to explore
            all available itineraries.
          </p>

          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-5 rounded-xl bg-[#263D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#385344]"
          >
            View all itineraries
          </button>
        </div>
      )}
    </>
  );
}
