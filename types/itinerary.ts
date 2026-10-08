export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: number;
  description: string;
  coverImage: string;
  isPremium: boolean;
  price?: number;
  days: ItineraryDay[];
}