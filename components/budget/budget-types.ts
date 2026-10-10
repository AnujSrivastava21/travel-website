
export type TransportType = "train" | "bus";

export type CityTransport = "scooty" | "privateCab" | "sharedTaxi";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations?: string[];
}

export interface DestinationTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
  buttonText: string;
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
  theme?: DestinationTheme;
  days: ItineraryDay[];
}

export interface TransportResult {
  id: number;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  pricePerPerson: number;
}
