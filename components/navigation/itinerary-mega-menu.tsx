"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Compass,
  Wallet,
  CalendarDays,
  PartyPopper,
  Landmark,
  CloudSun,
  MapPin,
} from "lucide-react";

type TravelOption = {
  name: string;
  description: string;
  href: string;
};

type TravelCategory = {
  name: string;
  number: string;
  description: string;
  mood: string;
  options: TravelOption[];
  icon: typeof Wallet;
  accent: string;
  background: string;
};

type ItineraryMegaMenuProps = {
  onClose: () => void;
  variant?: "desktop" | "mobile";
};

const categories: TravelCategory[] = [
  {
    name: "Direction",
    number: "01",
    description: "Choose a region and find your route",
    mood: "EXPLORE BY REGION",
    icon: MapPin,
    accent: "#55705B",
    background: "#E4EADF",
    options: [
      { name: "North India", description: "Mountains & valleys", href: "/itineraries?region=north" },
      { name: "South India", description: "Coasts & green escapes", href: "/itineraries?region=south" },
      { name: "East India", description: "Hills & local culture", href: "/itineraries?region=east" },
      { name: "West India", description: "Deserts & old cities", href: "/itineraries?region=west" },
      { name: "Central India", description: "Forests & heritage", href: "/itineraries?region=central" },
      { name: "Explore All India", description: "Find your next route", href: "/itineraries" },
    ],
  },
  {
    name: "According to Budget",
    number: "02",
    description: "Find journeys that fit your pocket",
    mood: "TRAVEL FOR LESS",
    icon: Wallet,
    accent: "#367C78",
    background: "#E5EFEB",
    options: [
      { name: "Under ₹1,000", description: "Local escapes", href: "/itineraries?budget=under-1000" },
      { name: "₹1,000–₹3,000", description: "Affordable getaways", href: "/itineraries?budget=1000-3000" },
      { name: "₹3,000–₹5,000", description: "Budget adventures", href: "/itineraries?budget=3000-5000" },
      { name: "₹5,000–₹10,000", description: "Longer journeys", href: "/itineraries?budget=5000-10000" },
      { name: "₹10,000+", description: "Go a little further", href: "/itineraries?budget=10000-plus" },
      { name: "Best Value Trips", description: "More experience, less spend", href: "/itineraries?sort=best-value" },
    ],
  },
  {
    name: "According to Available Time",
    number: "03",
    description: "Your free days, your next journey",
    mood: "MAKE TIME TO TRAVEL",
    icon: CalendarDays,
    accent: "#75804D",
    background: "#EDF0E1",
    options: [
      { name: "One-Day Trips", description: "A quick change of scene", href: "/itineraries?duration=1-day" },
      { name: "Weekend Getaways", description: "Make the most of 2–3 days", href: "/itineraries?duration=weekend" },
      { name: "3–5 Days", description: "A little more time away", href: "/itineraries?duration=3-5-days" },
      { name: "6–10 Days", description: "Explore at your own pace", href: "/itineraries?duration=6-10-days" },
      { name: "10+ Days", description: "Take the long way around", href: "/itineraries?duration=10-plus-days" },
      { name: "Long Weekends", description: "Turn holidays into journeys", href: "/itineraries?occasion=long-weekend" },
    ],
  },
  {
    name: "According to Occasion",
    number: "04",
    description: "Find a reason to get away",
    mood: "EVERY DAY CAN BE A TRIP",
    icon: PartyPopper,
    accent: "#A16F35",
    background: "#F1E7D8",
    options: [
      { name: "Weekend Escape", description: "A refreshing short break", href: "/itineraries?occasion=weekend" },
      { name: "Long Weekend", description: "Make the holiday count", href: "/itineraries?occasion=long-weekend" },
      { name: "Festive Holidays", description: "Travel around celebrations", href: "/itineraries?occasion=festive" },
      { name: "Solo Getaway", description: "A journey of your own", href: "/itineraries?travelStyle=solo" },
      { name: "Friends' Trip", description: "Good company, new places", href: "/itineraries?travelStyle=friends" },
      { name: "Spontaneous Trips", description: "For the last-minute plans", href: "/itineraries?occasion=spontaneous" },
    ],
  },
  {
    name: "According to Culture",
    number: "05",
    description: "Discover places through local life",
    mood: "TRAVEL BEYOND THE USUAL",
    icon: Landmark,
    accent: "#936447",
    background: "#F0E6DC",
    options: [
      { name: "Local Festivals", description: "Traditions worth travelling for", href: "/itineraries?culture=festivals" },
      { name: "Village Experiences", description: "Discover everyday local life", href: "/itineraries?culture=villages" },
      { name: "Food & Local Cuisine", description: "Taste a place's story", href: "/itineraries?culture=food" },
      { name: "History & Heritage", description: "Stories behind old places", href: "/itineraries?culture=heritage" },
      { name: "Folk Music & Dance", description: "Meet local art and traditions", href: "/itineraries?culture=folk-art" },
      { name: "Local Markets & Crafts", description: "Find the handmade and unique", href: "/itineraries?culture=crafts" },
    ],
  },
  {
    name: "According to Weather & Season",
    number: "06",
    description: "Go when a destination is at its best",
    mood: "FOLLOW THE SEASONS",
    icon: CloudSun,
    accent: "#567A91",
    background: "#E5EDF2",
    options: [
      { name: "Snowfall & Winter", description: "Chase the colder landscapes", href: "/itineraries?season=winter" },
      { name: "Pleasant Weather", description: "Comfortable days outdoors", href: "/itineraries?season=pleasant" },
      { name: "Monsoon Escapes", description: "Rain-washed landscapes", href: "/itineraries?season=monsoon" },
      { name: "Waterfall Season", description: "Follow the flowing water", href: "/itineraries?season=waterfalls" },
      { name: "Autumn Journeys", description: "Crisp air and changing colours", href: "/itineraries?season=autumn" },
      { name: "Spring Blooms", description: "Flowers and fresh landscapes", href: "/itineraries?season=spring" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* MOBILE: accordion — only category names, tap to reveal the options  */
/* ------------------------------------------------------------------ */
function MobileItineraryMenu({ onClose }: { onClose: () => void }) {
  // Only one category open at a time. null = all closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-0">
      <div className="max-h-[calc(100dvh-150px)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] text-[#303A32] [-webkit-overflow-scrolling:touch]">
        {/* Header */}
        <div className="flex items-end justify-between gap-3 px-4 pb-3 pt-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 text-[#A16F35]">
              <Compass size={13} />
              <span className="text-[11px] font-semibold tracking-wide">
                The Local Route
              </span>
            </div>
            <h2 className="font-[var(--font-heading)] text-xl font-semibold leading-tight tracking-tight text-[#263D32]">
              Find your next journey
            </h2>
          </div>

          <Link
            href="/itineraries"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#EAE5D9] bg-[#F8F6F0] px-3 py-1.5 text-[11px] font-semibold text-[#263D32] active:bg-[#F1E7D8]"
          >
            View all
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Category cards */}
        <ul className="space-y-2.5 px-3 pb-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isOpen = openIndex === index;
            const panelId = `itinerary-panel-${index}`;
            const buttonId = `itinerary-trigger-${index}`;

            return (
              <li
                key={category.name}
                className="overflow-hidden rounded-2xl border bg-[#FFFEFA]"
                style={{
                  borderColor: isOpen ? category.accent : "#EAE5D9",
                }}
              >
                {/* Tappable name row */}
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                  style={{
                    backgroundColor: category.background,
                    // ring colour per category
                    ["--tw-ring-color" as string]: category.accent,
                  }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFEFA]"
                    style={{ color: category.accent }}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </span>

                  <span className="min-w-0 flex-1 font-[var(--font-heading)] text-[17px] font-semibold leading-snug tracking-tight text-[#263D32]">
                    {category.name}
                  </span>

                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: category.accent }}
                  />
                </button>

                {/* Dropdown options (smooth height animation) */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pt-3 text-xs italic leading-5 text-[#626A5D]">
                      {category.description}
                    </p>

                    <ul className="px-4 pb-2 pt-1">
                      {category.options.map((option) => (
                        <li
                          key={option.name}
                          className="border-b border-dashed border-[#EAE5D9] last:border-b-0"
                        >
                          <Link
                            href={option.href}
                            onClick={onClose}
                            tabIndex={isOpen ? 0 : -1}
                            className="flex min-h-12 items-center justify-between gap-3 py-2.5 active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35]"
                          >
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-[#263D32]">
                                {option.name}
                              </span>
                              <span className="mt-0.5 block text-xs leading-4 text-[#8B8B7D]">
                                {option.description}
                              </span>
                            </span>

                            <span
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: category.background,
                                color: category.accent,
                              }}
                            >
                              <ArrowUpRight size={14} />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="border-t border-[#EAE5D9] bg-[#F8F6F0] px-4 py-3">
          <Link
            href="/itineraries"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#263D32] active:text-[#A16F35]"
          >
            Explore all journeys
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryMegaMenu({
  onClose,
  variant = "desktop",
}: ItineraryMegaMenuProps) {
  // Mobile gets its own accordion layout. Desktop below is unchanged.
  if (variant === "mobile") {
    return <MobileItineraryMenu onClose={onClose} />;
  }

  return (
    <div className="absolute left-1/2 top-full z-[110] w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pt-2">
      <div className="max-h-[min(80vh,760px)] overflow-x-hidden overflow-y-auto rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] text-[#303A32] shadow-[0_20px_60px_-24px_rgba(38,61,50,0.25)]">
        {/* HEADER */}
        <div className="border-b border-[#EAE5D9] px-5 py-5 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <Compass size={14} className="text-[#A16F35]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A16F35]">
                  The Local Route · Travel Your Way
                </span>
              </div>

              <h2 className="font-[var(--font-heading)] text-xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-2xl">
                Find your next journey.
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-[#626A5D] sm:text-sm">
                Choose by budget, time, culture or season. Find a route that feels like yours.
              </p>
            </div>

            <Link
              href="/itineraries"
              onClick={onClose}
              className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-[#EAE5D9] px-3 py-2 text-xs font-semibold text-[#263D32] transition hover:border-[#A16F35] hover:bg-[#F8F6F0] sm:inline-flex"
            >
              All itineraries
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* TRAVEL DISCOVERY CATEGORIES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <section
                key={category.name}
                className={[
                  index >= 1 ? "border-t border-[#EAE5D9] sm:border-t-0" : "",
                  index % 2 === 1 ? "sm:border-l sm:border-[#EAE5D9]" : "",
                  index >= 2 ? "lg:border-t lg:border-[#EAE5D9]" : "",
                  index % 3 !== 0 ? "lg:border-l lg:border-[#EAE5D9]" : "",
                ].join(" ")}
              >
                {/* CATEGORY HEADER */}
                <div
                  className="px-4 py-3.5"
                  style={{ backgroundColor: category.background }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: category.accent }}
                    >
                      {category.mood}
                    </span>

                    <Icon
                      size={17}
                      strokeWidth={1.6}
                      style={{ color: category.accent }}
                    />
                  </div>

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <h3 className="font-[var(--font-heading)] text-base font-semibold tracking-tight text-[#263D32]">
                      {category.name}
                    </h3>

                    <span
                      className="text-[10px] font-medium"
                      style={{ color: category.accent }}
                    >
                      {category.number}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-4 text-[#626A5D]">
                    {category.description}
                  </p>
                </div>

                {/* CATEGORY OPTIONS */}
                <div className="px-4 py-3.5">
                  <ul className="space-y-1">
                    {category.options.map((option) => (
                      <li key={option.name}>
                        <Link
                          href={option.href}
                          onClick={onClose}
                          className="group/link flex min-h-9 items-center justify-between gap-2 rounded-md py-1.5 text-xs leading-4 text-[#626A5D] transition-colors hover:text-[#A16F35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35]"
                        >
                          <span className="min-w-0">
                            <span className="block font-medium">
                              {option.name}
                            </span>
                            <span className="mt-0.5 block text-[10px] leading-4 text-[#8B8B7D]">
                              {option.description}
                            </span>
                          </span>

                          <ArrowUpRight
                            size={12}
                            className="shrink-0 text-[#A16F35] opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2 border-t border-[#EAE5D9] bg-[#F8F6F0] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-[11px] text-[#626A5D]">
            Travel local. Discover more. Find your own way.
          </p>

          <Link
            href="/itineraries"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#263D32] transition hover:text-[#A16F35]"
          >
            Explore all journeys
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}