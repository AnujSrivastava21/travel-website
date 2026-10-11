"use client";

import { useState } from "react";
import {
  CalendarDays,
  Check,
  TrainFront,
  Users,
} from "lucide-react";

import type { CSSProperties } from "react";
import type {
  DestinationTheme,
  TransportResult,
} from "./budget-types";

type Props = {
  members: number;
  selectedId?: number;
  theme?: DestinationTheme;
  onSelect: (ticket: TransportResult) => void;
};

type TrainClass = {
  code: "SL" | "3A" | "2A";
  name: string;
  availableSeats: number;
  fare: number;
  status: string;
};

type DemoTrain = TransportResult & {
  classes: TrainClass[];
};

const SOURCE = "NDLS";
const DESTINATION = "PRYJ";

const CLASSES = [
  { code: "SL", name: "Sleeper" },
  { code: "3A", name: "3 AC" },
  { code: "2A", name: "2 AC" },
] as const;

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

const DEMO_TRAINS: DemoTrain[] = [
  {
    id: 12417,
    name: "Prayagraj Express",
    number: "12417",
    departure: "10:10 PM",
    arrival: "06:00 AM",
    pricePerPerson: 320,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 45, fare: 320, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 18, fare: 850, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 8, fare: 1250, status: "Available" },
    ],
  },
  {
    id: 12427,
    name: "Rewa Express",
    number: "12427",
    departure: "11:20 PM",
    arrival: "07:15 AM",
    pricePerPerson: 300,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 32, fare: 300, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 12, fare: 790, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 5, fare: 1180, status: "Available" },
    ],
  },
  {
    id: 12311,
    name: "Netaji Express",
    number: "12311",
    departure: "07:40 PM",
    arrival: "04:30 AM",
    pricePerPerson: 350,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 60, fare: 350, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 22, fare: 920, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 10, fare: 1380, status: "Available" },
    ],
  },
  {
    id: 12801,
    name: "Purushottam Express",
    number: "12801",
    departure: "10:30 PM",
    arrival: "06:45 AM",
    pricePerPerson: 330,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 28, fare: 330, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 14, fare: 880, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 6, fare: 1320, status: "Available" },
    ],
  },
  {
    id: 12303,
    name: "Poorva Express",
    number: "12303",
    departure: "08:15 PM",
    arrival: "05:20 AM",
    pricePerPerson: 340,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 52, fare: 340, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 16, fare: 900, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 9, fare: 1350, status: "Available" },
    ],
  },
  {
    id: 12423,
    name: "Dibrugarh Rajdhani",
    number: "12423",
    departure: "04:00 PM",
    arrival: "11:10 PM",
    pricePerPerson: 400,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 20, fare: 400, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 11, fare: 1100, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 4, fare: 1650, status: "Available" },
    ],
  },
  {
    id: 12561,
    name: "Swatantrata Senani Express",
    number: "12561",
    departure: "06:50 PM",
    arrival: "03:30 AM",
    pricePerPerson: 310,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 38, fare: 310, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 19, fare: 820, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 7, fare: 1230, status: "Available" },
    ],
  },
  {
    id: 12875,
    name: "Neelachal Express",
    number: "12875",
    departure: "07:15 PM",
    arrival: "04:00 AM",
    pricePerPerson: 325,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 42, fare: 325, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 15, fare: 860, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 6, fare: 1290, status: "Available" },
    ],
  },
  {
    id: 12445,
    name: "Uttar Sampark Kranti",
    number: "12445",
    departure: "09:00 PM",
    arrival: "05:40 AM",
    pricePerPerson: 315,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 25, fare: 315, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 13, fare: 840, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 5, fare: 1270, status: "Available" },
    ],
  },
  {
    id: 12381,
    name: "Poorva Express",
    number: "12381",
    departure: "05:45 PM",
    arrival: "02:50 AM",
    pricePerPerson: 345,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 48, fare: 345, status: "Available" },
      { code: "3A", name: "3 AC", availableSeats: 20, fare: 910, status: "Available" },
      { code: "2A", name: "2 AC", availableSeats: 8, fare: 1360, status: "Available" },
    ],
  },
];

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

function getLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function timeToMinutes(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
}

function journeyDuration(departure: string, arrival: string) {
  let diff = timeToMinutes(arrival) - timeToMinutes(departure);

  if (diff <= 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

function lowestFareOf(train: DemoTrain): number {
  return Math.min(...train.classes.map((item) => item.fare));
}

export default function TrainSelector({
  members,
  selectedId,
  theme = defaultTheme,
  onSelect,
}: Props) {
  const [travelDate, setTravelDate] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<
    Record<number, TrainClass["code"]>
  >({});

  const minDate = getLocalDate(new Date());

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const handleSelectTrain = (train: DemoTrain) => {
    const selectedClassCode = selectedClasses[train.id];
    if (!selectedClassCode) return;

    const selectedClass = train.classes.find(
      (item) => item.code === selectedClassCode,
    );

    if (!selectedClass) return;

    onSelect({
      ...train,
      pricePerPerson: selectedClass.fare,
    });
  };

  return (
    <div
      className="mx-auto w-full max-w-2xl space-y-4"
      style={{ color: theme.text }}
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{
            backgroundColor: theme.primary,
            color: theme.buttonText,
          }}
        >
          <TrainFront size={20} />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">
            Find your train
          </h3>
          <p className="text-xs" style={{ color: theme.muted }}>
            {SOURCE} → {DESTINATION} · Demo availability
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-3"
        style={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
        }}
      >
        <label
          htmlFor="train-travel-date"
          className="mb-1.5 flex items-center gap-2 text-xs font-semibold"
        >
          <CalendarDays size={15} style={{ color: theme.primary }} />
          Journey date
        </label>

        <input
          id="train-travel-date"
          type="date"
          min={minDate}
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition ${focusRing}`}
          style={
            {
              backgroundColor: theme.background,
              color: theme.text,
              border: `1px solid ${theme.border}`,
              ["--tw-ring-color" as string]: theme.primary,
              ["--tw-ring-offset-color" as string]: theme.surface,
            } as CSSProperties
          }
        />
      </div>

      {!travelDate ? (
        <div
          className="rounded-xl border border-dashed px-4 py-8 text-center"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <span
            className="mx-auto grid h-11 w-11 place-items-center rounded-full"
            style={{
              backgroundColor: theme.secondary,
              color: theme.primary,
            }}
          >
            <CalendarDays size={21} />
          </span>

          <p className="mt-3 text-sm font-semibold">
            When are you travelling?
          </p>
          <p
            className="mx-auto mt-1 max-w-xs text-xs leading-5"
            style={{ color: theme.muted }}
          >
            Choose a journey date to view 10 demo trains and their available
            travel classes.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold">
                Available trains ({DEMO_TRAINS.length})
              </h4>
              <p className="mt-0.5 text-xs" style={{ color: theme.muted }}>
                {new Date(`${travelDate}T12:00:00`).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </p>
            </div>

            <span
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: theme.secondary,
                color: theme.primary,
              }}
            >
              <Users size={13} />
              {members} {members === 1 ? "traveller" : "travellers"}
            </span>
          </div>

          <div className="space-y-3">
            {DEMO_TRAINS.map((train) => {
              const selected = selectedId === train.id;
              const selectedClassCode = selectedClasses[train.id];

              const selectedClass = train.classes.find(
                (item) => item.code === selectedClassCode,
              );

              const groupPrice = selectedClass
                ? selectedClass.fare * members
                : null;

              const lowestFare = lowestFareOf(train);

              return (
                <article
                  key={train.number}
                  className="overflow-hidden rounded-xl transition"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${
                      selected ? theme.primary : theme.border
                    }`,
                    boxShadow: selected
                      ? `0 0 0 1px ${theme.primary}`
                      : "none",
                  }}
                >
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h5 className="text-sm font-semibold">
                            {train.name}
                          </h5>

                          {selected && (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                              style={{
                                backgroundColor: theme.primary,
                                color: theme.buttonText,
                              }}
                            >
                              <Check size={10} />
                              Selected
                            </span>
                          )}
                        </div>

                        <p
                          className="mt-0.5 text-xs"
                          style={{ color: theme.muted }}
                        >
                          Train no. {train.number}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[10px]" style={{ color: theme.muted }}>
                          Starting at
                        </p>
                        <p
                          className="text-lg font-bold leading-tight"
                          style={{ color: theme.primary }}
                        >
                          {money(lowestFare)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
                      <div>
                        <p className="text-sm font-semibold tabular-nums sm:text-base">
                          {train.departure}
                        </p>
                        <p className="text-[10px]" style={{ color: theme.muted }}>
                          Departure
                        </p>
                      </div>

                      <div className="min-w-0 text-center">
                        <p className="text-[10px] font-medium" style={{ color: theme.muted }}>
                          {journeyDuration(train.departure, train.arrival)}
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full border"
                            style={{ borderColor: theme.primary }}
                          />
                          <span
                            className="h-px min-w-2 flex-1 border-t border-dashed"
                            style={{ borderColor: `${theme.primary}80` }}
                          />
                          <TrainFront
                            size={14}
                            className="shrink-0"
                            style={{ color: theme.accent }}
                          />
                          <span
                            className="h-px min-w-2 flex-1 border-t border-dashed"
                            style={{ borderColor: `${theme.primary}80` }}
                          />
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums sm:text-base">
                          {train.arrival}
                        </p>
                        <p className="text-[10px]" style={{ color: theme.muted }}>
                          Arrival
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border-t border-dashed p-3.5"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.background,
                    }}
                  >
                    <p className="mb-2 text-xs font-semibold">
                      Choose travel class
                    </p>

                    <div className="grid grid-cols-3 gap-1.5">
                      {train.classes.map((item) => {
                        const classSelected = selectedClassCode === item.code;

                        return (
                          <button
                            key={item.code}
                            type="button"
                            aria-pressed={classSelected}
                            onClick={() =>
                              setSelectedClasses((previous) => ({
                                ...previous,
                                [train.id]: item.code,
                              }))
                            }
                            className={`relative min-w-0 rounded-lg border p-2 text-left transition ${focusRing}`}
                            style={
                              {
                                backgroundColor: classSelected
                                  ? theme.primary
                                  : theme.surface,
                                color: classSelected
                                  ? theme.buttonText
                                  : theme.text,
                                borderColor: classSelected
                                  ? theme.primary
                                  : theme.border,
                                ["--tw-ring-color" as string]: theme.accent,
                                ["--tw-ring-offset-color" as string]:
                                  theme.surface,
                              } as CSSProperties
                            }
                          >
                            {classSelected && (
                              <span
                                className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full"
                                style={{
                                  backgroundColor: theme.accent,
                                  color: theme.text,
                                }}
                              >
                                <Check size={9} strokeWidth={3} />
                              </span>
                            )}

                            <span className="block text-sm font-bold leading-5">
                              {item.code}
                            </span>

                            <span
                              className="block text-[10px] leading-4"
                              style={{
                                color: classSelected
                                  ? theme.buttonText
                                  : theme.muted,
                                opacity: classSelected ? 0.8 : 1,
                              }}
                            >
                              {item.name}
                            </span>

                            <span
                              className="mt-1 block text-[10px] font-semibold leading-4"
                              style={{
                                color: classSelected
                                  ? theme.buttonText
                                  : "#16803D",
                              }}
                            >
                              {item.availableSeats} seats available
                            </span>

                            <span
                              className="mt-1 block text-sm font-bold"
                              style={{
                                color: classSelected
                                  ? theme.accent
                                  : theme.primary,
                              }}
                            >
                              {money(item.fare)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div
                      className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-dashed pt-3"
                      style={{ borderColor: theme.border }}
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] leading-4" style={{ color: theme.muted }}>
                          {selectedClass
                            ? `${selectedClass.name} · ${members} ${
                                members === 1 ? "traveller" : "travellers"
                              }`
                            : "Select a travel class"}
                        </p>

                        <p
                          className="mt-0.5 text-base font-bold leading-tight"
                          style={{ color: theme.text }}
                        >
                          {groupPrice !== null
                            ? `${money(groupPrice * 1)} total`
                            : "Choose a travel class"}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!selectedClass}
                        onClick={() => handleSelectTrain(train)}
                        className={`inline-flex min-h-10 min-w-[112px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold shadow-sm transition ${focusRing} disabled:cursor-not-allowed disabled:opacity-50`}
                        style={
                          {
                            backgroundColor: selected
                              ? theme.secondary
                              : theme.accent,
                            color: selected ? theme.primary : theme.text,
                            ["--tw-ring-color" as string]: theme.primary,
                            ["--tw-ring-offset-color" as string]:
                              theme.surface,
                          } as CSSProperties
                        }
                      >
                        {selected && <Check size={13} strokeWidth={3} />}
                        {selected ? "Selected" : "Select train"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-[10px] leading-4" style={{ color: theme.muted }}>
            Demo data only: {SOURCE} → {DESTINATION}. Train schedules, fares,
            and seat counts are examples and do not represent live railway
            availability.
          </p>
        </>
      )}
    </div>
  );
}