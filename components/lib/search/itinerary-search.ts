
export type SearchableItinerary = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  description: string;
  duration: number;
  days: {
    day: number;
    title: string;
    description: string;
    locations: string[];
  }[];
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const row = Array.from(
    { length: b.length + 1 },
    (_, index) => index
  );

  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const previous = row[j];

      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
      );

      diagonal = previous;
    }
  }

  return row[b.length];
}

function wordMatches(word: string, candidate: string): boolean {
  if (candidate.includes(word) || word.includes(candidate)) {
    return true;
  }

  // Avoid aggressive typo matching for short words.
  if (word.length < 5 || candidate.length < 5) {
    return false;
  }

  const allowedDistance = word.length >= 8 ? 2 : 1;

  return levenshtein(word, candidate) <= allowedDistance;
}

function matchesText(text: string, query: string): boolean {
  const normalizedText = normalize(text);

  if (!normalizedText) return false;

  if (normalizedText.includes(query)) return true;

  const queryWords = query.split(" ");
  const textWords = normalizedText.split(" ");

  return queryWords.every((word) =>
    textWords.some((candidate) => wordMatches(word, candidate))
  );
}

export function searchItineraries<
  T extends SearchableItinerary
>(itineraries: T[], query: string): T[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return itineraries;

  return itineraries
    .map((itinerary, index) => {
      const locations = itinerary.days.flatMap(
        (day) => day.locations
      );

      let score = 0;

      // Exact destination and destination matches.
      if (normalize(itinerary.destination) === normalizedQuery) {
        score += 150;
      } else if (
        matchesText(itinerary.destination, normalizedQuery)
      ) {
        score += 100;
      }

      // Itinerary title.
      if (normalize(itinerary.title) === normalizedQuery) {
        score += 120;
      } else if (
        matchesText(itinerary.title, normalizedQuery)
      ) {
        score += 70;
      }

      // Individual sightseeing locations.
      const matchingLocations = locations.filter((location) =>
        matchesText(location, normalizedQuery)
      );

      if (matchingLocations.length > 0) {
        score += 60;
      }

      // Day titles and descriptions.
      if (
        itinerary.days.some((day) =>
          matchesText(day.title, normalizedQuery)
        )
      ) {
        score += 30;
      }

      if (
        itinerary.days.some((day) =>
          matchesText(day.description, normalizedQuery)
        )
      ) {
        score += 15;
      }

      // General itinerary description.
      if (
        matchesText(itinerary.description, normalizedQuery)
      ) {
        score += 10;
      }

      // Slug.
      if (matchesText(itinerary.slug, normalizedQuery)) {
        score += 20;
      }

      return { itinerary, score, index };
    })
    .filter((result) => result.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.index - b.index
    )
    .map((result) => result.itinerary);
}
