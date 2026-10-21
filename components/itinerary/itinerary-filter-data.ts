
export type FilterOption = {
  label: string;
  value: string;
};

export type ItinerarySort = "newest" | "most-clicked";

export type FilterCategory =
  | "region"
  | "duration"
  | "occasion"
  | "culture"
  | "season"
  | "all";

export const INITIAL_VISIBLE = 9;
export const LOAD_MORE_COUNT = 9;

export const sortToggleOptions: {
  label: string;
  value: ItinerarySort;
}[] = [
  { label: "Newly added", value: "newest" },
  { label: "Most clicked", value: "most-clicked" },
];

export const categoryLabels: Record<FilterCategory, string> = {
  all: "All itineraries",
  region: "Region",
  duration: "Duration",
  occasion: "Occasion",
  culture: "Culture",
  season: "Season",
};

export const categories: FilterCategory[] = [
  "all",
  "region",
  "duration",
  "occasion",
  "culture",
  "season",
];

export const regionOptions: FilterOption[] = [
  { label: "North India", value: "north" },
  { label: "South India", value: "south" },
  { label: "East India", value: "east" },
  { label: "West India", value: "west" },
  { label: "Central India", value: "central" },
  { label: "Northeast India", value: "northeast" },
];

export const durationOptions: FilterOption[] = [
  { label: "One-day trips", value: "1-day" },
  { label: "Weekend getaways", value: "weekend" },
  { label: "3–5 days", value: "3-5-days" },
  { label: "6–10 days", value: "6-10-days" },
  { label: "10+ days", value: "10-plus-days" },
];

export const occasionOptions: FilterOption[] = [
  { label: "Weekend escape", value: "weekend" },
  { label: "Long weekend", value: "long-weekend" },
  { label: "Festive holidays", value: "festive" },
  { label: "Spontaneous trips", value: "spontaneous" },
];

export const cultureOptions: FilterOption[] = [
  { label: "Local festivals", value: "festivals" },
  { label: "Village experiences", value: "villages" },
  { label: "Food & local cuisine", value: "food" },
  { label: "History & heritage", value: "heritage" },
  { label: "Folk music & dance", value: "folk-art" },
  { label: "Local markets & crafts", value: "crafts" },
  { label: "Temples & spirituality", value: "spiritual" },
];

export const seasonOptions: FilterOption[] = [
  { label: "Winter & snowfall", value: "winter" },
  { label: "Pleasant weather", value: "pleasant" },
  { label: "Monsoon escapes", value: "monsoon" },
  { label: "Waterfall season", value: "waterfalls" },
  { label: "Autumn journeys", value: "autumn" },
  { label: "Spring blooms", value: "spring" },
];

export const optionsByCategory: Record<
  FilterCategory,
  FilterOption[]
> = {
  all: [],
  region: regionOptions,
  duration: durationOptions,
  occasion: occasionOptions,
  culture: cultureOptions,
  season: seasonOptions,
};

export const filterKeys: FilterCategory[] = [
  "region",
  "duration",
  "occasion",
  "culture",
  "season",
];

export const REGION_ALIASES: Record<string, string> = {
  north: "north",
  "north india": "north",
  south: "south",
  "south india": "south",
  east: "east",
  "east india": "east",
  west: "west",
  "west india": "west",
  northeast: "northeast",
  "northeast india": "northeast",
};

export const STATE_TO_REGION: Record<string, string> = {
  delhi: "north",
  haryana: "north",
  "himachal pradesh": "north",
  "jammu and kashmir": "north",
  ladakh: "north",
  punjab: "north",
  "uttar pradesh": "north",
  uttarakhand: "north",
  "andhra pradesh": "south",
  karnataka: "south",
  kerala: "south",
  "tamil nadu": "south",
  telangana: "south",
  puducherry: "south",
  lakshadweep: "south",
  "andaman and nicobar islands": "south",
  bihar: "east",
  jharkhand: "east",
  odisha: "east",
  "west bengal": "east",
  goa: "west",
  gujarat: "west",
  maharashtra: "west",
  rajasthan: "west",
  chhattisgarh: "central",
  "madhya pradesh": "central",
  "arunachal pradesh": "northeast",
  assam: "northeast",
  manipur: "northeast",
  meghalaya: "northeast",
  mizoram: "northeast",
  nagaland: "northeast",
  sikkim: "northeast",
  tripura: "northeast",
};

export const METADATA_ALIASES: Record<string, string[]> = {
  weekend: ["weekend", "weekend escape", "weekend getaway"],
  "long weekend": ["long weekend"],
  festive: ["festive", "festival", "festivals", "religious festival"],
  spontaneous: ["spontaneous", "last minute"],
  couple: ["couple", "couples", "couple travel", "romantic"],
  family: ["family", "family travel"],
  culture: ["culture", "cultural"],
  history: ["history", "heritage", "historical"],
  spiritual: ["spiritual", "religious", "temples"],
  festivals: ["festival", "festivals", "traditions", "local festivals"],
  villages: ["village", "villages", "rural"],
  food: ["food", "cuisine", "local cuisine", "street food", "local food"],
  heritage: ["heritage", "history", "historical", "temples"],
  "folk art": ["folk art", "folk music", "dance", "traditional music"],
  crafts: ["crafts", "markets", "handicrafts", "local markets"],
  winter: ["winter", "snow", "snowfall"],
  pleasant: ["pleasant", "pleasant weather"],
  monsoon: ["monsoon", "rainy season"],
  waterfalls: ["waterfall", "waterfalls"],
  autumn: ["autumn", "fall"],
  spring: ["spring", "blooms"],
};
