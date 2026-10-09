
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
          ? "border-amber-300/40 bg-amber-300/[0.08] text-white"
          : "border-white/10 bg-white/[0.025] text-white/60 hover:border-white/20 hover:text-white"
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

  return (
    <div className="space-y-5">
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

      {!canCalculate && (
        <p className="text-xs leading-5 text-amber-200/70">
          Select your arrival ticket, return ticket, and local
          transport to calculate your budget.
        </p>
      )}

      <button
        type="button"
        disabled={!canCalculate}
        onClick={onCalculate}
        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
          canCalculate
            ? "bg-white text-black hover:bg-amber-200"
            : "cursor-not-allowed bg-white/10 text-white/30"
        }`}
      >
        Calculate budget

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
