
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Mountain,
  Sun,
  Waves,
  Trees,
} from "lucide-react";

type Region = {
  name: string;
  number: string;
  description: string;
  mood: string;
  states: string[];
  icon: typeof Mountain;
  accent: string;
  background: string;
};

type ItineraryMegaMenuProps = {
  onClose: () => void;
  variant?: "desktop" | "mobile";
};

const regions: Region[] = [
  {
    name: "North India",
    number: "01",
    description: "Mountains, valleys & quiet roads",
    mood: "THE MOUNTAIN ROUTE",
    states: [
      "Himachal Pradesh",
      "Uttarakhand",
      "Jammu & Kashmir",
      "Ladakh",
      "Punjab",
      "Haryana",
      "Uttar Pradesh",
      "Delhi",
      "Chandigarh",
    ],
    icon: Mountain,
    accent: "#55705B",
    background: "#E9EFE5",
  },
  {
    name: "South India",
    number: "02",
    description: "Coastal escapes & green landscapes",
    mood: "THE COASTAL ROUTE",
    states: [
      "Kerala",
      "Tamil Nadu",
      "Karnataka",
      "Andhra Pradesh",
      "Telangana",
    ],
    icon: Waves,
    accent: "#367C78",
    background: "#E4F0EB",
  },
  {
    name: "East India",
    number: "03",
    description: "Tea gardens, hills & local culture",
    mood: "THE HIDDEN ROUTE",
    states: [
      "West Bengal",
      "Odisha",
      "Bihar",
      "Jharkhand",
      "Sikkim",
      "Assam",
      "Meghalaya",
      "Arunachal Pradesh",
      "Nagaland",
      "Manipur",
      "Mizoram",
      "Tripura",
    ],
    icon: Trees,
    accent: "#75804D",
    background: "#EDF0E1",
  },
  {
    name: "West India",
    number: "04",
    description: "Desert trails, old cities & the sea",
    mood: "THE OPEN ROAD",
    states: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"],
    icon: Sun,
    accent: "#B2763E",
    background: "#F5E9D9",
  },
];

export default function ItineraryMegaMenu({
  onClose,
  variant = "desktop",
}: ItineraryMegaMenuProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "w-full min-h-0"
          : "absolute left-1/2 top-full z-[110] w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pt-2"
      }
    >
      <div
        className={`border border-[#E6DCCB] bg-[#FCFAF5] text-[#252E27] ${
          isMobile
            ? "max-h-[calc(100dvh-150px)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl [-webkit-overflow-scrolling:touch]"
            : "overflow-hidden rounded-2xl shadow-[0_20px_60px_-24px_rgba(36,43,32,0.28)]"
        }`}
      >
        {/* HEADER */}
        <div className="border-b border-[#E8DFD0] px-5 py-5 sm:px-7 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <Compass size={14} className="text-[#A8783C]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C795D]">
                  The Local Route · Explore India
                </span>
              </div>

              <h2 className="text-xl font-semibold leading-tight tracking-tight text-[#28352C] sm:text-2xl">
                Find your next journey.
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-[#777468] sm:text-sm">
                Explore destinations by region and discover your next route.
              </p>
            </div>

            <Link
              href="/itineraries"
              onClick={onClose}
              className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-[#DDD2BE] px-3 py-2 text-xs font-medium text-[#384337] transition hover:border-[#A8783C] hover:bg-white sm:inline-flex"
            >
              All itineraries
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* REGIONAL COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region, index) => {
            const Icon = region.icon;

            return (
              <section
                key={region.name}
                className={[
                  index > 0
                    ? "border-t border-[#E8DFD0] sm:border-t-0"
                    : "",
                  index % 2 === 1
                    ? "sm:border-l sm:border-[#E8DFD0]"
                    : "",
                  index > 0
                    ? "lg:border-l lg:border-[#E8DFD0]"
                    : "",
                ].join(" ")}
              >
                {/* REGION HEADER */}
                <div
                  className="px-4 py-3.5 sm:px-4"
                  style={{ backgroundColor: region.background }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: region.accent }}
                    >
                      {region.mood}
                    </span>

                    <Icon
                      size={17}
                      strokeWidth={1.6}
                      style={{ color: region.accent }}
                    />
                  </div>

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-[#28352C]">
                      {region.name}
                    </h3>

                    <span
                      className="text-[10px] font-medium"
                      style={{ color: region.accent }}
                    >
                      {region.number}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-4 text-[#716F62]">
                    {region.description}
                  </p>
                </div>

                {/* DESTINATION LINKS */}
                <div className="px-4 py-3.5">
                  <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A19A8B]">
                    Explore destinations
                  </p>

                  <ul className="space-y-1">
                    {region.states.map((state) => (
                      <li key={state}>
                        <Link
                          href={`/itineraries?state=${encodeURIComponent(state)}`}
                          onClick={onClose}
                          className="group/link flex min-h-7 items-center justify-between gap-2 rounded-md py-1 text-xs leading-4 text-[#5F6055] transition hover:text-[#A8783C]"
                        >
                          <span>{state}</span>

                          <ArrowUpRight
                            size={12}
                            className="shrink-0 text-[#A8783C] opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
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
        <div className="flex flex-col gap-2 border-t border-[#E8DFD0] bg-[#F5F0E6] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-[11px] text-[#777468]">
            Travel local. Discover more. Find your own way.
          </p>

          <Link
            href="/itineraries"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#394638] transition hover:text-[#A8783C]"
          >
            Explore all journeys
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
