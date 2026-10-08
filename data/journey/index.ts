
import type { Destination } from "../../types/destination";

export interface JourneyYear {
  year: string;
  title: string;
  description: string;
  highlights: string[];
}

export const journeyYears: JourneyYear[] = [
  {
    year: "2024",
    title: "The journey begins",
    description:
      "The beginning of my journey into exploring India, discovering new places and understanding why travel is about more than simply reaching a destination.",
    highlights: [
      "First solo journeys",
      "Exploring local places",
      "Learning to travel independently",
    ],
  },
  {
    year: "2025",
    title: "More roads, more stories",
    description:
      "Travel slowly, experience local culture and explore places beyond the usual tourist routes.",
    highlights: [
      "Solo travel",
      "Local experiences",
      "New landscapes",
      "More of India",
    ],
  },
  {
    year: "2026",
    title: "Into the mountains",
    description:
      "A year of bigger journeys, higher mountains and discovering some of India's most dramatic landscapes.",
    highlights: [
      "Spiti Valley",
      "Himachal Pradesh",
      "Kashmir",
      "Rajasthan",
    ],
  },
];

export const journeyStats = [
  {
    value: "30+",
    label: "Destinations",
  },
  {
    value: "1",
    label: "Country",
  },
  {
    value: "Solo",
    label: "Travel style",
  },
  {
    value: "∞",
    label: "Journeys ahead",
  },
];

