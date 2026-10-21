export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  locations: string[];
  activities?: string[];
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


export interface ItineraryBudget {
  min: number;
  max: number;
  currency: "INR";
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
  createdAt?: string | null;


  // Total views recorded in PostgreSQL
  views?: number;

  // Daily itinerary details
  days: ItineraryDay[];

  // Tags imported from Excel and stored in PostgreSQL
  metadata?: Record<string, string[]>;

  // Estimated total trip budget per person
  budget?: ItineraryBudget;

  // Geographic direction
  direction?: string;

  // Suitable travel occasions
  occasions?: string[];

  // Travel styles
  travelStyles?: string[];

  // Cultural interests
  cultures?: string[];

  // Suitable seasons
  seasons?: string[];

  // Types of trips, used by existing itinerary data and filters
  tripTypes?: string[];

  // Additional optional itinerary information
  theme?: DestinationTheme;
  tags?: string[];
}