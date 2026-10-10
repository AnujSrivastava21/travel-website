
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
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

  // City-specific colors
  theme?: DestinationTheme;

  days: ItineraryDay[];
}
