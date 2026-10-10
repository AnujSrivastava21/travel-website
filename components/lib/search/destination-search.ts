
export type SearchableDestination = {
  id: string;
  slug: string;
  name: string;
  state?: string;
  country?: string;
  description?: string;
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

export function searchDestinations<T extends SearchableDestination>(
  destinations: T[],
  query: string
): T[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return [];

  const queryWords = normalizedQuery.split(" ");

  const results = destinations
    .map((destination) => {
      const name = normalize(destination.name);
      const state = normalize(destination.state ?? "");
      const country = normalize(destination.country ?? "");
      const description = normalize(destination.description ?? "");
      const slug = normalize(destination.slug);

      let score = 0;

      // Highest priority: exact destination name.
      if (name === normalizedQuery) score += 100;

      // Destination name starts with the query.
      else if (name.startsWith(normalizedQuery)) score += 70;

      // Destination name contains the query.
      else if (name.includes(normalizedQuery)) score += 50;

      // Match the destination slug.
      if (slug.includes(normalizedQuery)) score += 35;

      // Match state and country.
      if (state === normalizedQuery) score += 40;
      else if (state.includes(normalizedQuery)) score += 25;

      if (country === normalizedQuery) score += 30;
      else if (country.includes(normalizedQuery)) score += 20;

      // Match descriptive content.
      if (description.includes(normalizedQuery)) score += 10;

      // Match queries containing multiple words.
      const searchableText = [
        name,
        state,
        country,
        description,
        slug,
      ].join(" ");

      const allWordsMatch = queryWords.every((word) =>
        searchableText.includes(word)
      );

      if (allWordsMatch) score += 15;

      return { destination, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results.map((result) => result.destination);
}
