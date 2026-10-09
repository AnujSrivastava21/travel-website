
"use client";

import { useCallback, useState } from "react";
import { BusFront, TrainFront } from "lucide-react";

import TrainSelector from "./TrainSelector";
import BusSelector from "./BusSelector";

import type {
  TransportResult,
  TransportType,
} from "./budget-types";

type EditingSection = "arrival" | "departure";

type Props = {
  members: number;
  activeTransport: TransportType;
  editingSection: EditingSection;

  onTrainPriceChange: (price: number) => void;
  onBusPriceChange: (price: number) => void;

  onTicketSelected: (
    section: EditingSection,
    transport: TransportType,
  ) => void;
};

export default function TransportExplorer({
  members,
  activeTransport,
  editingSection,
  onTrainPriceChange,
  onBusPriceChange,
  onTicketSelected,
}: Props) {
  const [arrivalTrain, setArrivalTrain] =
    useState<TransportResult | null>(null);

  const [arrivalBus, setArrivalBus] =
    useState<TransportResult | null>(null);

  const [departureTrain, setDepartureTrain] =
    useState<TransportResult | null>(null);

  const [departureBus, setDepartureBus] =
    useState<TransportResult | null>(null);

  const selectedTrain =
    editingSection === "arrival"
      ? arrivalTrain
      : departureTrain;

  const selectedBus =
    editingSection === "arrival"
      ? arrivalBus
      : departureBus;

  const trainTotal = selectedTrain
    ? selectedTrain.pricePerPerson * members
    : 0;

  const busTotal = selectedBus
    ? selectedBus.pricePerPerson * members
    : 0;

  const activePrice =
    activeTransport === "train"
      ? trainTotal
      : busTotal;

  const hasSelection =
    activeTransport === "train"
      ? selectedTrain !== null
      : selectedBus !== null;

 const handleTrainSelect = useCallback(
  (result: TransportResult | null) => {
    const groupTotal = result
      ? result.pricePerPerson * members
      : 0;

    if (editingSection === "arrival") {
      setArrivalTrain(result);
    } else {
      setDepartureTrain(result);
    }

    onTrainPriceChange(groupTotal);

    if (result) {
      onTicketSelected(editingSection, "train");
    }
  },
  [
    editingSection,
    members,
    onTrainPriceChange,
    onTicketSelected,
  ],
);

  const handleBusSelect = useCallback(
  (result: TransportResult | null) => {
    const groupTotal = result
      ? result.pricePerPerson * members
      : 0;

    if (editingSection === "arrival") {
      setArrivalBus(result);
    } else {
      setDepartureBus(result);
    }

    onBusPriceChange(groupTotal);

    if (result) {
      onTicketSelected(editingSection, "bus");
    }
  },
  [
    editingSection,
    members,
    onBusPriceChange,
    onTicketSelected,
  ],
);

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] text-white">
      {/* Header */}
      <header className="shrink-0 border-b border-white/10 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Transport planner
        </p>

        <div className="mt-1 flex items-center gap-2">
          {activeTransport === "train" ? (
            <TrainFront
              size={19}
              className="text-white/75"
            />
          ) : (
            <BusFront
              size={19}
              className="text-white/75"
            />
          )}

          <h2 className="text-lg font-semibold tracking-tight text-white">
            {activeTransport === "train"
              ? "Choose your train"
              : "Choose your bus"}
          </h2>
        </div>

        <p className="mt-1 text-xs leading-5 text-white/50">
          {editingSection === "arrival"
            ? "Select your arrival ticket."
            : "Select your return ticket."}{" "}
          Choose a date to view demo options.
        </p>
      </header>

      {/* Active transport selector */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {activeTransport === "train" ? (
          <TrainSelector
            key={`${editingSection}-train`}
            members={members}
            selectedId={selectedTrain?.id}
            onSelect={handleTrainSelect}
          />
        ) : (
          <BusSelector
            key={`${editingSection}-bus`}
            members={members}
            selectedId={selectedBus?.id}
            onSelect={handleBusSelect}
          />
        )}
      </div>

      {/* Fare summary */}
      <footer className="shrink-0 border-t border-white/10 bg-[#151515] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-xs text-white/60">
            {activeTransport === "train" ? (
              <TrainFront size={15} />
            ) : (
              <BusFront size={15} />
            )}

            <span>
              {activeTransport === "train"
                ? "Selected train fare"
                : "Selected bus fare"}
            </span>
          </div>

          <span
            className={`shrink-0 text-sm font-semibold ${
              hasSelection
                ? "text-white"
                : "text-white/40"
            }`}
          >
            {hasSelection
              ? `₹${activePrice.toLocaleString("en-IN")}`
              : "Not selected"}
          </span>
        </div>

        <p className="mt-2 text-[10px] leading-4 text-white/45">
          {members}{" "}
          {members === 1 ? "traveller" : "travellers"}{" "}
          ·{" "}
          {editingSection === "arrival"
            ? "Arrival"
            : "Return"}{" "}
          fare · Demo data only
        </p>
      </footer>
    </section>
  );
}
