
"use client";

import { useState } from "react";
import { Download, Flag, Wallet } from "lucide-react";

import { downloadBudgetPDF } from "../navigation/budget-pdf";
import PayNowButton from "./PayNowButton";
import DestinationCoverageButton from "./DestinationCoverageButton";

import type {
  CityTransport,
  Itinerary,
  TransportType,
} from "./budget-types";

type Props = {
  itinerary: Itinerary;
  members: number;
  arrivalTransport: TransportType;
  departureTransport: TransportType;
  cityTransport: CityTransport;
  arrivalCost: number;
  hotelCost: number;
  cityTransportCost: number;
  foodCost: number;
  entryFeesCost: number;
  departureCost: number;
  total: number;
  perPerson: number;
  duration: number;
  numberOfScooties: number;
};

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function BudgetResult(props: Props) {
  const {
    itinerary,
    members,
    arrivalTransport,
    departureTransport,
    cityTransport,
    arrivalCost,
    hotelCost,
    cityTransportCost,
    foodCost,
    entryFeesCost,
    departureCost,
    total,
    perPerson,
    duration,
    numberOfScooties,
  } = props;

  const [breakdownUnlocked, setBreakdownUnlocked] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);

  // Collect unique locations from all itinerary days.
const uniqueLocations = [
    ...new Set(
      itinerary.days.flatMap((day) => day.locations ?? [])
    ),
  ];


  const rows = [
    { label: "Arrival journey", value: arrivalCost },
    { label: `Stay · ${duration} nights`, value: hotelCost },
    {
      label:
        cityTransport === "scooty"
          ? `Scooty · ${numberOfScooties} ${
              numberOfScooties === 1 ? "vehicle" : "vehicles"
            }`
          : cityTransport === "privateCab"
            ? "Private cab"
            : "Shared taxi",
      value: cityTransportCost,
    },
    { label: "Food & meals", value: foodCost },
    { label: "Entry fees & activities", value: entryFeesCost },
    { label: "Return journey", value: departureCost },
  ];

  const handleDownload = () => {
    if (!breakdownUnlocked) return;

    downloadBudgetPDF({
      itinerary,
      members,
      arrivalTransport,
      departureTransport,
      cityTransport,
      arrivalCost,
      hotelCost,
      cityTransportCost,
      foodCost,
      entryFeesCost,
      departureCost,
      total,
      perPerson,
      duration,
      numberOfScooties,
    });
  };

  if (itinerary.isPremium) {
    return (
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#11100c] p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] text-amber-300">
          <Flag size={20} />
        </div>

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
          Premium itinerary
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Unlock your travel budget
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/50">
          Get the complete expense breakdown and a downloadable travel budget.
        </p>

        <p className="mt-5 text-3xl font-semibold text-amber-200">
          {money(itinerary.price ?? 0)}
        </p>

        <p className="mt-1 text-xs text-white/40">
          Itinerary price
        </p>

        <div className="mt-5">
          {breakdownUnlocked ? (
            <div className="flex items-center gap-2 text-sm text-amber-200">
              <Flag size={17} />
              <span>Flag raised! Your budget is unlocked.</span>
            </div>
          ) : (
            <PayNowButton
              amount={itinerary.price ?? 0}
              onClick={() => setBreakdownUnlocked(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 pb-2">
      {/* Estimated trip budget */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11100c] p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-amber-300/[0.04] blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <Wallet size={15} className="text-amber-200/80" />
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Estimated trip budget
            </p>
          </div>

          <h3 className="mt-2 text-sm font-medium leading-5 text-white/75">
            {itinerary.title}
          </h3>

          {/* Total and Explore Places button */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {money(total)}
              </p>

              <p className="mt-2 text-xs text-white/50">
                Total for {members}{" "}
                {members === 1 ? "traveller" : "travellers"}
              </p>
            </div>

            <DestinationCoverageButton
              destinationCount={uniqueLocations.length}
              onClick={() =>
                setShowDestinations((prev) => !prev)
              }
            />
          </div>

          <div className="my-4 border-t border-white/[0.08]" />

          <div>
            <p className="text-xs font-medium text-white/55">
              Approx. per person
            </p>
            <p className="mt-1 text-lg font-medium text-amber-200/90">
              {money(perPerson)}
            </p>
          </div>
        </div>
      </section>

      {/* Unique destination list */}
      {showDestinations && (
        <section className="rounded-2xl border border-white/10 bg-[#11100c] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Places Covered
              </h3>
              <p className="mt-1 text-xs text-white/50">
                {uniqueLocations.length} unique locations across{" "}
                {itinerary.days.length} days
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDestinations(false)}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:bg-white/5"
            >
              Close
            </button>
          </div>

          {uniqueLocations.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {uniqueLocations.map((location) => (
                <span
                  key={location}
                  className="rounded-full border border-amber-300/15 bg-amber-300/[0.06] px-3 py-2 text-xs text-white/80"
                >
                  {location}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-xs text-white/50">
              No locations have been added to this itinerary yet.
            </p>
          )}
        </section>
      )}

      {/* Expense breakdown */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.015]">
        <div
          className={`transition-all duration-500 ${
            breakdownUnlocked
              ? ""
              : "pointer-events-none select-none blur-[5px]"
          }`}
          aria-hidden={!breakdownUnlocked}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
            <h3 className="text-xs font-semibold text-white">
              Expense breakdown
            </h3>
            <span className="text-[10px] text-white/35">
              {rows.length} categories
            </span>
          </div>

          <div className="px-4">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 py-3 ${
                  index < rows.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }`}
              >
                <p className="text-[13px] text-white/65">
                  {row.label}
                </p>
                <p className="shrink-0 text-[13px] font-medium tabular-nums text-white">
                  {money(row.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.025] px-4 py-3">
            <span className="text-sm font-semibold text-white">
              Estimated total
            </span>
            <span className="text-sm font-semibold text-amber-300">
              {money(total)}
            </span>
          </div>
        </div>

        {!breakdownUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#090909]/75 p-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.08] text-amber-200">
              <Flag size={22} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Your expense breakdown is locked
              </p>
              <p className="mt-1 text-xs leading-5 text-white/50">
                Raise the flag to reveal expenses and download your budget.
              </p>
            </div>

            <div className="w-full max-w-xs">
              <PayNowButton
                amount={itinerary.price ?? 0}
                onClick={() => setBreakdownUnlocked(true)}
              />
            </div>
          </div>
        )}

        {breakdownUnlocked && (
          <div className="flex items-center gap-2 border-t border-amber-300/10 bg-amber-300/[0.05] px-4 py-3 text-xs text-amber-200">
            <Flag size={15} />
            <span>
              Flag raised — expense breakdown unlocked!
            </span>
          </div>
        )}
      </section>

      <p className="px-1 text-[11px] leading-5 text-white/35">
        Estimates only. Actual ticket fares, accommodation and activity costs
        may vary.
      </p>

      {/* PDF download */}
      <button
        type="button"
        disabled={!breakdownUnlocked}
        onClick={handleDownload}
        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
          breakdownUnlocked
            ? "bg-white text-black hover:bg-amber-200"
            : "cursor-not-allowed bg-white/10 text-white/35"
        }`}
      >
        <span>
          {breakdownUnlocked
            ? "Download budget PDF"
            : "Unlock to download budget PDF"}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.06]">
          <Download size={16} />
        </span>
      </button>
    </div>
  );
}
