
import type { Itinerary } from "../../types/itinerary";

import {
  categories,
  filterKeys,
  METADATA_ALIASES,
  REGION_ALIASES,
  STATE_TO_REGION,
  type FilterCategory,
  type ItinerarySort,
} from "./itinerary-filter-data";

export function normalize(value: string): string {
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

function collectText(
  value: unknown,
  output: string[] = [],
  depth = 0,
): string[] {
  if (depth > 10 || value == null) return output;

  if (typeof value === "string") {
    if (value.trim()) output.push(value);
    return output;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, output, depth + 1));
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
    ]);

    Object.entries(value).forEach(([key, nestedValue]) => {
      if (!ignoredKeys.has(key.toLowerCase())) {
        collectText(nestedValue, output, depth + 1);
      }
    });
  }

  return output;
}

function includesPhrase(text: string, phrase: string): boolean {
  const normalizedText = ` ${normalize(text)} `;
  const normalizedPhrase = normalize(phrase);

  return (
    normalizedPhrase.length > 0 &&
    normalizedText.includes(` ${normalizedPhrase} `)
  );
}

function getItineraryText(itinerary: Itinerary): string[] {
  const item = itinerary as unknown as Record<string, unknown>;

  return [
    itinerary.title,
    itinerary.destination,
    itinerary.description,
    itinerary.slug,
    ...collectText(itinerary.days),
    ...collectText(item.states),
    ...collectText(item.places),
    ...collectText(item.destinations),
    ...collectText(item.festivals),
  ];
}

export function matchesSearch(
  itinerary: Itinerary,
  query: string,
): boolean {
  const queryWords = normalize(query).split(" ").filter(Boolean);
  if (!queryWords.length) return true;

  const textWords = [
    ...new Set(
      getItineraryText(itinerary).flatMap((text) =>
        normalize(text).split(" "),
      ),
    ),
  ];

  return queryWords.every((queryWord) =>
    textWords.some(
      (textWord) =>
        textWord === queryWord ||
        (queryWord.length >= 4 && textWord.includes(queryWord)),
    ),
  );
}

function getItineraryRegion(itinerary: Itinerary): string | null {
  const item = itinerary as unknown as Record<string, unknown>;
  const rawDirection =
    typeof item.direction === "string" ? item.direction : "";

  const direction = REGION_ALIASES[normalize(rawDirection)];
  if (direction) return direction;

  const destination = normalize(
    typeof itinerary.destination === "string"
      ? itinerary.destination
      : "",
  );

  const states = Object.keys(STATE_TO_REGION).sort(
    (a, b) => b.length - a.length,
  );

  for (const state of states) {
    if (includesPhrase(destination, state)) {
      return STATE_TO_REGION[state];
    }
  }

  return null;
}

function matchesDuration(
  itinerary: Itinerary,
  value: string,
): boolean {
  const duration = Number(itinerary.duration);
  if (!Number.isFinite(duration) || duration <= 0) return false;

  switch (value) {
    case "1-day":
      return duration <= 1;
    case "weekend":
      return duration >= 2 && duration <= 3;
    case "3-5-days":
      return duration >= 3 && duration <= 5;
    case "6-10-days":
      return duration >= 6 && duration <= 10;
    case "10-plus-days":
      return duration > 10;
    default:
      return true;
  }
}

function getMetadata(
  itinerary: Itinerary,
  category: FilterCategory,
): string[] {
  const item = itinerary as unknown as Record<string, unknown>;

  const metadata =
    item.metadata &&
    typeof item.metadata === "object" &&
    !Array.isArray(item.metadata)
      ? (item.metadata as Record<string, unknown>)
      : {};

  switch (category) {
    case "occasion":
      return [
        ...collectText(metadata.occasion),
        ...collectText(item.occasions),
        ...collectText(item.occasion),
      ];

    case "culture":
      return [
        ...collectText(metadata.culture),
        ...collectText(item.cultures),
        ...collectText(item.culture),
        ...collectText(item.festivals),
      ];

    case "season":
      return [
        ...collectText(metadata.season),
        ...collectText(item.seasons),
        ...collectText(item.season),
      ];

    default:
      return [];
  }
}

function matchesMetadata(
  itinerary: Itinerary,
  category: FilterCategory,
  value: string,
): boolean {
  const selected = normalize(value);
  const aliases = METADATA_ALIASES[selected] ?? [selected];
  const metadata = getMetadata(itinerary, category).map(normalize);

  return metadata.some((entry) =>
    aliases.some((alias) => {
      const normalizedAlias = normalize(alias);

      return (
        entry === normalizedAlias ||
        includesPhrase(entry, normalizedAlias)
      );
    }),
  );
}

function matchesFilter(
  itinerary: Itinerary,
  category: FilterCategory,
  value: string,
): boolean {
  switch (category) {
    case "region":
      return getItineraryRegion(itinerary) === value;

    case "duration":
      return matchesDuration(itinerary, value);

    case "occasion":
    case "culture":
    case "season":
      return matchesMetadata(itinerary, category, value);

    case "all":
      return true;

    default:
      return true;
  }
}

export function isFilterCategory(
  value: string,
): value is FilterCategory {
  return categories.includes(value as FilterCategory);
}

export function getActiveCategory(
  params: URLSearchParams,
): FilterCategory {
  const chosenCategory = params.get("filterCategory");

  if (chosenCategory && isFilterCategory(chosenCategory)) {
    return chosenCategory;
  }

  if (params.has("duration")) return "duration";
  if (params.has("occasion")) return "occasion";
  if (params.has("culture")) return "culture";
  if (params.has("season")) return "season";
  if (params.has("region") || params.has("direction")) return "region";

  return "all";
}

export function getSelectedValue(
  category: FilterCategory,
  params: URLSearchParams,
): string {
  if (category === "all") return "";

  if (category === "region") {
    return params.get("region") ?? params.get("direction") ?? "";
  }

  return params.get(category) ?? "";
}

export function clearFilterParams(params: URLSearchParams): void {
  [
    ...filterKeys,
    "direction",
    "state",
    "filterCategory",
    "travelStyle",
    "sort",
    "best-value",
  ].forEach((key) => params.delete(key));
}

export function sortItineraries(
  itineraries: Itinerary[],
  sort: ItinerarySort,
): Itinerary[] {
  const getTimestamp = (itinerary: Itinerary): number => {
    if (!itinerary.createdAt) return 0;

    const timestamp = new Date(itinerary.createdAt).getTime();

    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  const getViewCount = (itinerary: Itinerary): number => {
    const item = itinerary as unknown as Record<string, unknown>;

    const count = Number(
      item.views ??
        item.clickCount ??
        item.click_count ??
        0,
    );

    return Number.isFinite(count) && count >= 0 ? count : 0;
  };

  return [...itineraries].sort((a, b) => {
    if (sort === "most-clicked") {
      return (
        getViewCount(b) - getViewCount(a) ||
        getTimestamp(b) - getTimestamp(a)
      );
    }

    return getTimestamp(b) - getTimestamp(a);
  });
}

export function filterItineraries(
  itineraries: Itinerary[],
  paramsString: string,
  sort: ItinerarySort,
): Itinerary[] {
  const params = new URLSearchParams(paramsString);
  let results = [...itineraries];

  for (const category of filterKeys) {
    const value =
      category === "region"
        ? params.get("region") ?? params.get("direction") ?? ""
        : params.get(category) ?? "";

    if (!value) continue;

    if (category === "season" && value === "spring") {
      results = results.filter(
        (itinerary) => itinerary.slug === "kargil-spring-7-days",
      );
      continue;
    }

    results = results.filter((itinerary) =>
      matchesFilter(itinerary, category, value),
    );
  }

  return sortItineraries(results, sort);
}
