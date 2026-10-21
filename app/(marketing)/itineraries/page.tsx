
import type { Metadata } from "next";
import { Suspense } from "react";

import { getItinerariesFromDatabase } from "../../../lib/itineraries-db";
import { ItineraryFilter } from "../../../components/itinerary/itinerary-filter";
import { headingFont, bodyFont } from "../../font";
import { DataSourceFlag } from "../../../components/itinerary/data-source-flag";
import { ItineraryNotification } from "../../../components/itinerary/itinerary-notification";

export const metadata: Metadata = {
  title: "Travel Itineraries",
  description:
    "Practical India travel itineraries with routes, destinations, experiences and travel planning tips.",
};

export const dynamic = "force-dynamic";

type SearchParams = Record<
  string,
  string | string[] | undefined
>;

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function ItinerariesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Fetch itinerary records directly from PostgreSQL.
  const itineraries = await getItinerariesFromDatabase();

  const budget = getSingleParam(params.budget);
  const duration = getSingleParam(params.duration);
  const direction =
    getSingleParam(params.direction) ??
    getSingleParam(params.region);
  const occasion = getSingleParam(params.occasion);
  const travelStyle = getSingleParam(params.travelStyle);
  const culture = getSingleParam(params.culture);
  const season = getSingleParam(params.season);
  const sort = getSingleParam(params.sort);

  let pageTitle = "Travel itineraries";
  let pageDescription =
    "Practical routes built from real journeys, with places to visit, travel days and a budget you can adjust for your group.";

  if (budget) {
    pageTitle = "According to Budget";
    pageDescription =
      "Explore travel itineraries that match your budget and travel style.";
  } else if (duration) {
    pageTitle = "According to Available Time";
    pageDescription =
      "Find itineraries that fit the time you have available for your next trip.";
  } else if (occasion) {
    pageTitle = "According to Occasion";
    pageDescription =
      "Discover journeys for your next getaway, celebration or special occasion.";
  } else if (travelStyle) {
    pageTitle = "According to Travel Style";
    pageDescription =
      "Find journeys that match your preferred way to explore.";
  } else if (culture) {
    pageTitle = "According to Culture";
    pageDescription =
      "Discover destinations through local traditions, food, history and heritage.";
  } else if (season) {
    pageTitle = "According to Weather & Season";
    pageDescription =
      "Find destinations and journeys suited to different seasons and weather.";
  } else if (direction) {
    pageTitle = "Explore by Region";
    pageDescription =
      "Explore itineraries by region and discover your next route across India.";
  } else if (sort === "best-value") {
    pageTitle = "Best Value Trips";
    pageDescription =
      "Explore itineraries and find the right journey for your travel budget.";
  }

  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#263D32] sm:text-5xl">
            {pageTitle}
          </h1>

          <p className="mt-4 text-base leading-7 text-[#626A5D] sm:text-lg sm:leading-8">
            {pageDescription}
          </p>
        </div>

        {/* <DataSourceFlag source="database" /> */}

        <Suspense
          fallback={
            <div className="mt-12 py-8 text-sm text-[#626A5D]">
              Loading itineraries...
            </div>
          }
        >
          <ItineraryFilter itineraries={itineraries} />
        </Suspense>

        <ItineraryNotification />
      </section>
    </div>
  );
}
