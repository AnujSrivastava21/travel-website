
"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Download, X, Lock } from "lucide-react";
import { downloadBudgetPDF } from "./budget-pdf";

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  locations: string[];
};

type Itinerary = {
  title: string;
  duration: number;
  days: ItineraryDay[];
  isPremium?: boolean;
  price?: number;
};

type TransportOption = "train" | "bus";
type CityTransport = "scooty" | "privateCab" | "sharedTaxi";

type BudgetPopupProps = {
  itinerary: Itinerary;
  open: boolean;
  onClose: () => void;
};

const PRICES = {
  foodPerPersonPerDay: 600,
  entryFeesPerPersonPerDay: 200,
  scootyPerDay: 1000,
  privateCabPerDay: 4000,
  sharedTaxiPerDay: 800,
  train: 1000,
  bus: 700,
};

export function BudgetPopup({ itinerary, open, onClose }: BudgetPopupProps) {
  const [step, setStep] = useState<"budget" | "result">("budget");
  const [members, setMembers] = useState(2);
  const [arrivalTransport, setArrivalTransport] =
    useState<TransportOption>("train");
  const [departureTransport, setDepartureTransport] =
    useState<TransportOption>("train");
  const [cityTransport, setCityTransport] =
    useState<CityTransport>("scooty");

  const duration = itinerary.duration;

  const arrivalCost =
    arrivalTransport === "train" ? PRICES.train : PRICES.bus;

  const departureCost =
    departureTransport === "train" ? PRICES.train : PRICES.bus;

  const hotelPerPersonPerNight =
    members === 1 ? 1000 : members === 2 ? 800 : 700;

  const hotelCost = hotelPerPersonPerNight * members * duration;
  const foodCost = PRICES.foodPerPersonPerDay * members * duration;
  const entryFeesCost =
    PRICES.entryFeesPerPersonPerDay * members * duration;

  const numberOfScooties = Math.ceil(members / 2);

  const cityTransportCost = useMemo(() => {
    if (cityTransport === "scooty") {
      return numberOfScooties * PRICES.scootyPerDay * duration;
    }

    if (cityTransport === "privateCab") {
      return PRICES.privateCabPerDay * duration;
    }

    return PRICES.sharedTaxiPerDay * duration;
  }, [cityTransport, numberOfScooties, duration]);

  const total = useMemo(() => {
    return (
      arrivalCost +
      hotelCost +
      cityTransportCost +
      foodCost +
      entryFeesCost +
      departureCost
    );
  }, [
    arrivalCost,
    hotelCost,
    cityTransportCost,
    foodCost,
    entryFeesCost,
    departureCost,
  ]);

  const perPerson = Math.ceil(total / members);

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  const resetPopup = () => {
    setStep("budget");
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0b] shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/[0.07] blur-[90px]" />

        {/* Header */}
        <div className="relative flex items-start justify-between border-b border-white/10 px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            {step === "result" && (
              <button
                type="button"
                onClick={resetPopup}
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition hover:border-amber-300/30 hover:bg-amber-300/[0.05] hover:text-white"
                aria-label="Change selections"
              >
                <ArrowLeft size={15} />
              </button>
            )}

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-amber-300/60">
                Budget Planner
              </p>

              <h2 className="mt-2 max-w-[360px] text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {step === "budget"
                  ? "Plan your budget"
                  : "Your estimated budget"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Close budget planner"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto px-6 py-6 sm:px-7">
          {step === "budget" ? (
            <>
              {/* Trip */}
              <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                  You are going to
                </p>

                <p className="mt-1 text-base font-medium text-white">
                  {itinerary.title}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  {duration} nights
                </p>
              </div>

              {/* Members */}
              <BudgetSection title="How many people are travelling?">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((number) => (
                    <OptionButton
                      key={number}
                      selected={members === number}
                      onClick={() => setMembers(number)}
                      title={`${number}`}
                      subtitle={number === 1 ? "Person" : "People"}
                    />
                  ))}
                </div>
              </BudgetSection>

              {/* Arrival */}
              <BudgetSection title="How will you reach the destination?">
                <div className="grid grid-cols-2 gap-3">
                  <OptionButton
                    selected={arrivalTransport === "train"}
                    onClick={() => setArrivalTransport("train")}
                    title="Train"
                    price={formatPrice(PRICES.train)}
                  />

                  <OptionButton
                    selected={arrivalTransport === "bus"}
                    onClick={() => setArrivalTransport("bus")}
                    title="Bus"
                    price={formatPrice(PRICES.bus)}
                  />
                </div>
              </BudgetSection>

              {/* Departure */}
              <BudgetSection title="How will you leave the destination?">
                <div className="grid grid-cols-2 gap-3">
                  <OptionButton
                    selected={departureTransport === "train"}
                    onClick={() => setDepartureTransport("train")}
                    title="Train"
                    price={formatPrice(PRICES.train)}
                  />

                  <OptionButton
                    selected={departureTransport === "bus"}
                    onClick={() => setDepartureTransport("bus")}
                    title="Bus"
                    price={formatPrice(PRICES.bus)}
                  />
                </div>
              </BudgetSection>

              {/* Local transport */}
              <BudgetSection title="How will you travel locally?">
                <div className="grid gap-3 sm:grid-cols-3">
                  <OptionButton
                    selected={cityTransport === "scooty"}
                    onClick={() => setCityTransport("scooty")}
                    title="Scooty"
                    price={`${formatPrice(PRICES.scootyPerDay)}/day including petrol`}
                  />

                  <OptionButton
                    selected={cityTransport === "sharedTaxi"}
                    onClick={() => setCityTransport("sharedTaxi")}
                    title="Shared Taxi"
                    price={`${formatPrice(PRICES.sharedTaxiPerDay)}/day`}
                  />

                  <OptionButton
                    selected={cityTransport === "privateCab"}
                    onClick={() => setCityTransport("privateCab")}
                    title="Private Cab"
                    price={`${formatPrice(PRICES.privateCabPerDay)}/day`}
                  />
                </div>

                {cityTransport === "scooty" && (
                  <p className="mt-3 text-xs leading-5 text-white/30">
                    Maximum 2 people per scooty · {numberOfScooties}{" "}
                    {numberOfScooties === 1 ? "scooty" : "scooties"} needed for{" "}
                    {members} {members === 1 ? "person" : "people"}.
                  </p>
                )}

                {cityTransport === "privateCab" && (
                  <p className="mt-3 text-xs leading-5 text-white/30">
                    One private cab can accommodate up to 4 people.
                  </p>
                )}
              </BudgetSection>

              {/* Calculate */}
              <button
                type="button"
                onClick={() => setStep("result")}
                className="group mt-7 flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90"
              >
                <span>Calculate my budget</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.06] transition group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </button>
            </>
          ) : itinerary.isPremium ? (
            /* PREMIUM: Blurred preview and lock */
            <div className="relative isolate overflow-hidden rounded-3xl border border-amber-300/20">
              {/* Placeholder preview; actual budget values are not rendered */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none space-y-5 p-5 blur-md"
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <div className="h-3 w-2/5 rounded bg-white/20" />
                  <div className="mt-4 h-10 w-3/4 rounded bg-white/20" />
                  <div className="mt-3 h-3 w-1/2 rounded bg-white/10" />
                </div>

                <div className="space-y-4 rounded-2xl border border-white/10 p-5">
                  <div className="h-4 w-2/3 rounded bg-white/20" />
                  <div className="h-8 rounded bg-white/10" />
                  <div className="h-8 rounded bg-white/10" />
                  <div className="h-8 rounded bg-white/10" />
                  <div className="h-8 rounded bg-white/10" />
                </div>

                <div className="h-14 rounded-2xl bg-white/20" />
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0b0b]/75 px-5 py-8 text-center backdrop-blur-[2px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10">
                  <Lock size={24} className="text-amber-300" />
                </div>

                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-amber-300/70">
                  Premium feature
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Unlock Your Travel Budget
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                  Get your complete estimated budget, per-person cost, expense
                  breakdown and downloadable PDF for this itinerary.
                </p>

                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] px-6 py-4">
                  <p className="text-xs text-white/40">
                    Unlock this itinerary
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-amber-300">
                    ₹{(itinerary.price ?? 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                  <Lock size={13} />
                  <span>Budget details and PDF are locked</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Total */}
              <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.08] to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  {itinerary.title}
                </p>

                <p className="mt-3 text-5xl font-semibold tracking-[-0.04em] text-white">
                  {formatPrice(total)}
                </p>

                <p className="mt-2 text-sm text-white/40">
                  Total for {members} {members === 1 ? "person" : "people"}
                </p>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Approx. per person
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-amber-300">
                    {formatPrice(perPerson)}
                  </p>
                </div>
              </div>

              {/* Budget breakdown */}
              <div className="mt-6 space-y-2">
                <BudgetBreakdown
                  label="Reaching your destination"
                  value={arrivalCost}
                />

                <BudgetBreakdown
                  label={`Hotel · ${duration} nights · ${members} ${
                    members === 1 ? "person" : "people"
                  }`}
                  value={hotelCost}
                />

                <p className="px-1 text-[11px] leading-4 text-amber-200/55">
                  Hotel cost can vary depending on how comfortable or luxurious
                  you want your stay to be.
                </p>

                <BudgetBreakdown
                  label={
                    cityTransport === "scooty"
                      ? `Scooty · ${duration} days · ${numberOfScooties} ${
                          numberOfScooties === 1 ? "scooty" : "scooties"
                        }`
                      : cityTransport === "privateCab"
                        ? `Private Cab · ${duration} days`
                        : `Shared Taxi · ${duration} days`
                  }
                  value={cityTransportCost}
                />

                <p className="px-1 text-[11px] leading-4 text-sky-200/55">
                  You don’t have to use this transport every day. Use it only
                  when needed and your actual travel cost can be lower.
                </p>

                <BudgetBreakdown
                  label={`Food · ${duration} days · ${members} ${
                    members === 1 ? "person" : "people"
                  }`}
                  value={foodCost}
                />

                <p className="px-1 text-[11px] leading-4 text-emerald-200/55">
                  Food cost can vary depending on the cafés and restaurants you
                  choose. Eating at local places can help keep the cost lower.
                </p>

                <BudgetBreakdown
                  label={`Entry fees & museums · ${duration} days · ${members} ${
                    members === 1 ? "person" : "people"
                  }`}
                  value={entryFeesCost}
                />

                <p className="px-1 text-[11px] leading-4 text-violet-200/55">
                  Entry fees can vary depending on the places you choose to
                  visit. You can skip optional attractions to reduce the cost.
                </p>

                <BudgetBreakdown
                  label="Getting back home"
                  value={departureCost}
                />
              </div>

              {/* Download PDF — only available for free itineraries */}
              <button
                type="button"
                onClick={() =>
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
                  })
                }
                className="group mt-6 flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90"
              >
                <span>Download PDF</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.06] transition group-hover:translate-y-0.5">
                  <Download size={15} />
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BudgetSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-white/35">
        {title}
      </p>
      {children}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  title,
  subtitle,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  price?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
        selected
          ? "border-amber-300/40 bg-amber-300/[0.08] text-white"
          : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{title}</span>

        <span
          className={`h-3.5 w-3.5 rounded-full border ${
            selected
              ? "border-amber-300 bg-amber-300"
              : "border-white/20"
          }`}
        />
      </div>

      {subtitle && (
        <span className="mt-1 block text-[11px] text-white/30">
          {subtitle}
        </span>
      )}

      {price && (
        <span className="mt-1 block text-[11px] text-white/30">
          {price}
        </span>
      )}
    </button>
  );
}

function BudgetBreakdown({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] py-3">
      <span className="max-w-[70%] text-sm text-white/45">{label}</span>

      <span className="text-sm font-medium text-white/75">
        ₹{value.toLocaleString("en-IN")}
      </span>
    </div>
  );
}
