
export type TransportType = "train" | "bus";

export type CityTransport = "scooty" | "privateCab" | "sharedTaxi";

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  locations?: string[];
};

export type Itinerary = {
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
};

export type TransportResult = {
  id: number;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  pricePerPerson: number;
};
