
"use client";

import { useCallback, useState } from "react";
import { BusFront, TrainFront } from "lucide-react";

import TrainSelector from "./TrainSelector";
import BusSelector from "./BusSelector";

import type {
  DestinationTheme,
  TransportResult,
  TransportType,
} from "./budget-types";

type EditingSection = "arrival" | "departure";

type Props = {
  members: number;
  activeTransport: TransportType;
  editingSection: EditingSection;
  theme: DestinationTheme;

  onTrainPriceChange: (price: number) => void;
  onBusPriceChange: (price: number) => void;

  onTicketSelected: (
    section: EditingSection,
    transport: TransportType,
  ) => void;
};

const defaultTheme: DestinationTheme = {
  primary: "#1E4F8F",
  secondary: "#E8EEF7",
  background: "#F4EFE4",
  surface: "#FFFFFF",
  accent: "#E8A317",
  text: "#2B2A26",
  muted: "#6B665A",
  border: "#DDD3BE",
  buttonText: "#FFFFFF",
};

export default function TransportExplorer({
  members,
  activeTransport,
  editingSection,
  theme = defaultTheme,
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
    editingSection === "arrival" ? arrivalTrain : departureTrain;

  const selectedBus =
    editingSection === "arrival" ? arrivalBus : departureBus;

  const trainTotal = selectedTrain
    ? selectedTrain.pricePerPerson * members
    : 0;

  const busTotal = selectedBus
    ? selectedBus.pricePerPerson * members
    : 0;

  const activePrice =
    activeTransport === "train" ? trainTotal : busTotal;

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

  const ModeIcon =
    activeTransport === "train" ? TrainFront : BusFront;

  const modeName =
    activeTransport === "train" ? "train" : "bus";

  return (
    <section
      className="flex h-full min-h-0 flex-col"
      style={{
        color: theme.text,
      }}
    >
      {/* Context bar */}
      <header className="shrink-0 pb-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: theme.primary,
              color: theme.buttonText,
            }}
          >
            <ModeIcon size={14} />

            {editingSection === "arrival"
              ? "Arrival ticket"
              : "Return ticket"}
          </span>

          <p
            className="text-sm"
            style={{ color: theme.muted }}
          >
            {editingSection === "arrival"
              ? "How you reach the first stop"
              : "How you travel back home"}
          </p>
        </div>
      </header>

      {/* Active train or bus selector */}
      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 pb-4">
        {activeTransport === "train" ? (
          <TrainSelector
            key={`${editingSection}-train`}
            members={members}
            selectedId={selectedTrain?.id}
            theme={theme}
            onSelect={handleTrainSelect}
          />
        ) : (
          <BusSelector
            key={`${editingSection}-bus`}
            members={members}
            selectedId={selectedBus?.id}
            theme={theme}
            onSelect={handleBusSelect}
          />
        )}
      </div>

      {/* Fare summary */}
      <footer
        className="shrink-0 rounded-2xl px-4 py-3.5"
        style={{
          backgroundColor: theme.primary,
          color: theme.buttonText,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.14)",
              }}
            >
              <ModeIcon size={17} />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Your {modeName} fare
              </p>

              <p
                className="text-xs"
                style={{
                  color: theme.buttonText,
                  opacity: 0.75,
                }}
              >
                {members}{" "}
                {members === 1 ? "traveller" : "travellers"}
                {" · "}
                {editingSection === "arrival"
                  ? "Arrival"
                  : "Return"}
              </p>
            </div>
          </div>

          <span
            className="shrink-0 font-serif text-xl font-semibold tabular-nums"
            style={{
              color: hasSelection
                ? theme.accent
                : theme.buttonText,
              opacity: hasSelection ? 1 : 0.6,
            }}
          >
            {hasSelection
              ? `₹${activePrice.toLocaleString("en-IN")}`
              : "Not chosen"}
          </span>
        </div>
      </footer>
    </section>
  );
}
