
"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import type {
  CityTransport,
  TransportType,
} from "./budget-types";

type Props = {
  title: string;
  duration: number;
  members: number;

  arrivalTransport: TransportType | null;
  departureTransport: TransportType | null;
  cityTransport: CityTransport | null;

  arrivalTrainPrice: number;
  arrivalBusPrice: number;
  departureTrainPrice: number;
  departureBusPrice: number;

  canCalculate: boolean;

  onMembersChange: (members: number) => void;
  onArrivalChange: (transport: TransportType) => void;
  onDepartureChange: (transport: TransportType) => void;
  onCityTransportChange: (transport: CityTransport) => void;
  onCalculate: () => void;
};

const money = (price: number) =>
  price > 0
    ? `₹${price.toLocaleString("en-IN")} group total`
    : "Choose a ticket on the right";

function Option({
  title,
  detail,
  selected,
  onClick,
}: {
  title: string;
  detail?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}


className={`min-w-0 rounded-xl border px-3 py-2.5 text-left transition ${
  selected
    ? "border-emerald-300/70 bg-emerald-300/15 text-emerald-200 ring-1 ring-emerald-300/25"
    : "border-white/10 bg-white/[0.025] text-white/60 hover:border-emerald-300/40 hover:bg-emerald-300/[0.05] hover:text-white"
}`}


    >
      <span className="block text-sm font-medium">
        {title}
      </span>

      {detail && (
        <span className="mt-1 block break-words text-[11px] text-white/40">
          {detail}
        </span>
      )}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
        {title}
      </h3>

      {children}
    </section>
  );
}

export default function BudgetForm({
  title,
  duration,
  members,
  arrivalTransport,
  departureTransport,
  cityTransport,
  arrivalTrainPrice,
  arrivalBusPrice,
  departureTrainPrice,
  departureBusPrice,
  canCalculate,
  onMembersChange,
  onArrivalChange,
  onDepartureChange,
  onCityTransportChange,
  onCalculate,
}: Props) {
  const arrivalPrice =
    arrivalTransport === "train"
      ? arrivalTrainPrice
      : arrivalTransport === "bus"
        ? arrivalBusPrice
        : 0;

  const departurePrice =
    departureTransport === "train"
      ? departureTrainPrice
      : departureTransport === "bus"
        ? departureBusPrice
        : 0;

  const arrivalDetail = (type: TransportType) =>
    money(
      type === "train"
        ? arrivalTrainPrice
        : arrivalBusPrice,
    );

  const departureDetail = (type: TransportType) =>
    money(
      type === "train"
        ? departureTrainPrice
        : departureBusPrice,
    );

  const missingSelections: string[] = [];

  if (arrivalTransport === null) {
    missingSelections.push("Choose your arrival transport.");
  } else if (arrivalPrice <= 0) {
    missingSelections.push("Select your arrival ticket.");
  }

  if (departureTransport === null) {
    missingSelections.push("Choose your return transport.");
  } else if (departurePrice <= 0) {
    missingSelections.push("Select your return ticket.");
  }

  if (cityTransport === null) {
    missingSelections.push("Choose your local transport.");
  }

  return (
    <div className="space-y-5">
      {/* Trip details */}
      <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-3">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
          Your trip
        </p>

        <h3 className="mt-1 text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-white/45">
          {duration} nights
        </p>
      </div>

      {/* Travellers */}
      <Section title="Travellers">
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((count) => (
            <Option
              key={count}
              title={`${count}`}
              detail={count === 1 ? "Person" : "People"}
              selected={members === count}
              onClick={() => onMembersChange(count)}
            />
          ))}
        </div>
      </Section>

      {/* Arrival transport */}
      <Section title="Arrival · Getting there">
        <div className="grid grid-cols-2 gap-2">
          <Option
            title="🚆 Train"
            detail={arrivalDetail("train")}
            selected={arrivalTransport === "train"}
            onClick={() => onArrivalChange("train")}
          />

          <Option
            title="🚌 Bus"
            detail={arrivalDetail("bus")}
            selected={arrivalTransport === "bus"}
            onClick={() => onArrivalChange("bus")}
          />
        </div>
      </Section>

      {/* Return transport */}
      <Section title="Return · Getting home">
        <div className="grid grid-cols-2 gap-2">
          <Option
            title="🚆 Train"
            detail={departureDetail("train")}
            selected={departureTransport === "train"}
            onClick={() => onDepartureChange("train")}
          />

          <Option
            title="🚌 Bus"
            detail={departureDetail("bus")}
            selected={departureTransport === "bus"}
            onClick={() => onDepartureChange("bus")}
          />
        </div>
      </Section>

      {/* Local transport */}
      <Section title="Local transport">
        <div className="grid grid-cols-3 gap-2">
          <Option
            title="Scooty"
            selected={cityTransport === "scooty"}
            onClick={() => onCityTransportChange("scooty")}
          />

          <Option
            title="Shared taxi"
            selected={cityTransport === "sharedTaxi"}
            onClick={() => onCityTransportChange("sharedTaxi")}
          />

          <Option
            title="Private cab"
            selected={cityTransport === "privateCab"}
            onClick={() => onCityTransportChange("privateCab")}
          />
        </div>

        <p className="text-[11px] leading-4 text-white/35">
          Estimated local transport: ₹1,000/day per scooty
          (up to 2 people), ₹800/day for a shared taxi, or
          ₹4,000/day for a private cab.
        </p>
      </Section>

      {/* Missing selections */}
      {!canCalculate && (
        <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-3">
          <p className="mb-1.5 text-xs font-medium text-amber-200">
            Complete your budget
          </p>

          <ul className="space-y-1">
            {missingSelections.map((message) => (
              <li
                key={message}
                className="text-xs leading-5 text-white/55"
              >
                • {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Calculate button */}
      <button
        type="button"
        disabled={!canCalculate}
        onClick={() => {
          if (canCalculate) {
            onCalculate();
          }
        }}



className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
  canCalculate
    ? "border-amber-300/30 bg-amber-300/10 text-amber-100 hover:border-amber-200/60 hover:bg-amber-300/20"
    : "cursor-not-allowed border-white/5 bg-white/10 text-white/30"
}`}



      >
        <span>
          {canCalculate ? "Calculate budget" : "Complete selections"}
        </span>

        <ArrowRight
          size={16}
          className={`transition-transform ${
            canCalculate
              ? "group-hover:translate-x-1"
              : ""
          }`}
        />
      </button>
    </div>
  );
}
