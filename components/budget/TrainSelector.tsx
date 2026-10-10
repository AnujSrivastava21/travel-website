
"use client";

import { useState } from "react";
import {
  CalendarDays,
  Check,
  TrainFront,
  Users,
} from "lucide-react";

import type {
  DestinationTheme,
  TransportResult,
} from "./budget-types";

type Props = {
  members: number;
  selectedId?: number;
  theme: DestinationTheme;
  onSelect: (ticket: TransportResult) => void;
};

type TrainClass = {
  code: "SL" | "3A" | "2A";
  name: string;
  availableSeats: number;
  fare: number;
};

type DemoTrain = TransportResult & {
  classes: TrainClass[];
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

const demoTrains: DemoTrain[] = [
  {
    id: 1,
    name: "Vande Bharat Express",
    number: "22436",
    departure: "06:00 AM",
    arrival: "10:30 AM",
    pricePerPerson: 477,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 42, fare: 350 },
      { code: "3A", name: "3 AC", availableSeats: 18, fare: 850 },
      { code: "2A", name: "2 AC", availableSeats: 8, fare: 1250 },
    ],
  },
  {
    id: 2,
    name: "Intercity Express",
    number: "14204",
    departure: "08:15 AM",
    arrival: "01:00 PM",
    pricePerPerson: 350,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 56, fare: 350 },
      { code: "3A", name: "3 AC", availableSeats: 24, fare: 780 },
      { code: "2A", name: "2 AC", availableSeats: 12, fare: 1100 },
    ],
  },
  {
    id: 3,
    name: "Superfast Express",
    number: "12560",
    departure: "09:45 PM",
    arrival: "04:30 AM",
    pricePerPerson: 620,
    classes: [
      { code: "SL", name: "Sleeper", availableSeats: 0, fare: 420 },
      { code: "3A", name: "3 AC", availableSeats: 14, fare: 920 },
      { code: "2A", name: "2 AC", availableSeats: 6, fare: 1380 },
    ],
  },
];

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

function timeToMinutes(time: string) {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
}

function journeyDuration(departure: string, arrival: string) {
  let diff =
    timeToMinutes(arrival) - timeToMinutes(departure);

  if (diff <= 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return minutes === 0
    ? `${hours}h`
    : `${hours}h ${minutes}m`;
}

const lowestFareOf = (train: DemoTrain) =>
  Math.min(...train.classes.map((item) => item.fare));

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

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSelectTrain = (train: DemoTrain) => {
    const selectedClassCode = selectedClasses[train.id];

    if (!selectedClassCode) return;

    const selectedClass = train.classes.find(
      (item) => item.code === selectedClassCode,
    );

    if (!selectedClass || selectedClass.availableSeats === 0) {
      return;
    }

    onSelect({
      ...train,
      pricePerPerson: selectedClass.fare,
    });
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div
      className="mx-auto w-full max-w-2xl space-y-4"
      style={{ color: theme.text }}
    >
      {/* Header */}
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
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{ color: theme.text }}
          >
            Find your train
          </h3>

          <p
            className="text-xs"
            style={{ color: theme.muted }}
          >
            Select your date and compare available options.
          </p>
        </div>
      </div>

      {/* Journey date */}
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
          style={{ color: theme.text }}
        >
          <CalendarDays
            size={15}
            style={{ color: theme.primary }}
          />
          Journey date
        </label>

        <input
          id="train-travel-date"
          type="date"
          min={minDate}
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition ${focusRing}`}
          style={{
            backgroundColor: theme.background,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            outlineColor: theme.primary,
            ["--tw-ring-color" as string]: theme.primary,
            ["--tw-ring-offset-color" as string]: theme.surface,
          } as React.CSSProperties}
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

          <p
            className="mt-3 text-sm font-semibold"
            style={{ color: theme.text }}
          >
            When are you travelling?
          </p>

          <p
            className="mx-auto mt-1 max-w-xs text-xs leading-5"
            style={{ color: theme.muted }}
          >
            Choose a journey date to see train options and fares.
          </p>
        </div>
      ) : (
        <>
          {/* Results heading */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4
                className="text-sm font-semibold"
                style={{ color: theme.text }}
              >
                Available trains
              </h4>

              <p
                className="mt-0.5 text-xs"
                style={{ color: theme.muted }}
              >
                {new Date(
                  `${travelDate}T12:00:00`,
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
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

          {/* Train cards */}
          <div className="space-y-3">
            {demoTrains.map((train) => {
              const selected = selectedId === train.id;
              const selectedClassCode = selectedClasses[train.id];

              const selectedClass = train.classes.find(
                (item) => item.code === selectedClassCode,
              );

              const groupPrice = selectedClass
                ? selectedClass.fare * members
                : null;

              return (
                <article
                  key={train.id}
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
                  {/* Train details */}
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h5
                            className="text-sm font-semibold"
                            style={{ color: theme.text }}
                          >
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
                        <p
                          className="text-[10px]"
                          style={{ color: theme.muted }}
                        >
                          Starting at
                        </p>

                        <p
                          className="text-lg font-bold leading-tight"
                          style={{ color: theme.primary }}
                        >
                          {money(lowestFareOf(train))}
                        </p>
                      </div>
                    </div>

                    {/* Journey timeline */}
                    <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
                      <div>
                        <p
                          className="text-sm font-semibold tabular-nums sm:text-base"
                          style={{ color: theme.text }}
                        >
                          {train.departure}
                        </p>

                        <p
                          className="text-[10px]"
                          style={{ color: theme.muted }}
                        >
                          Departure
                        </p>
                      </div>

                      <div className="min-w-0 text-center">
                        <p
                          className="text-[10px] font-medium"
                          style={{ color: theme.muted }}
                        >
                          {journeyDuration(
                            train.departure,
                            train.arrival,
                          )}
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full border"
                            style={{ borderColor: theme.primary }}
                          />

                          <span
                            className="h-px min-w-2 flex-1 border-t border-dashed"
                            style={{
                              borderColor: `${theme.primary}80`,
                            }}
                          />

                          <TrainFront
                            size={14}
                            className="shrink-0"
                            style={{ color: theme.accent }}
                          />

                          <span
                            className="h-px min-w-2 flex-1 border-t border-dashed"
                            style={{
                              borderColor: `${theme.primary}80`,
                            }}
                          />

                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className="text-sm font-semibold tabular-nums sm:text-base"
                          style={{ color: theme.text }}
                        >
                          {train.arrival}
                        </p>

                        <p
                          className="text-[10px]"
                          style={{ color: theme.muted }}
                        >
                          Arrival
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Travel classes */}
                  <div
                    className="border-t border-dashed p-3.5"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.background,
                    }}
                  >
                    <p
                      className="mb-2 text-xs font-semibold"
                      style={{ color: theme.text }}
                    >
                      Choose travel class
                    </p>

                    <div className="grid grid-cols-3 gap-1.5">
                      {train.classes.map((item) => {
                        const classSelected =
                          selectedClassCode === item.code;

                        const unavailable =
                          item.availableSeats === 0;

                        return (
                          <button
                            key={item.code}
                            type="button"
                            disabled={unavailable}
                            aria-pressed={classSelected}
                            onClick={() =>
                              setSelectedClasses((previous) => ({
                                ...previous,
                                [train.id]: item.code,
                              }))
                            }
                            className={`relative min-w-0 rounded-lg border p-2 text-left transition ${focusRing} disabled:cursor-not-allowed disabled:opacity-60`}
                            style={{
                              backgroundColor: classSelected
                                ? theme.primary
                                : theme.surface,
                              color: classSelected
                                ? theme.buttonText
                                : theme.text,
                              borderColor: classSelected
                                ? theme.primary
                                : theme.border,
                              ["--tw-ring-color" as string]:
                                theme.accent,
                              ["--tw-ring-offset-color" as string]:
                                theme.surface,
                            } as React.CSSProperties}
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
                              className="mt-1 block text-[10px] leading-4"
                              style={{
                                color: unavailable
                                  ? "#B42318"
                                  : classSelected
                                    ? theme.buttonText
                                    : item.availableSeats < 10
                                      ? theme.accent
                                      : theme.primary,
                                opacity:
                                  classSelected && !unavailable
                                    ? 0.9
                                    : 1,
                              }}
                            >
                              {unavailable
                                ? "Not available"
                                : `${item.availableSeats} seats left`}
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

                    {/* Total and select button */}
                    <div
                      className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-dashed pt-3"
                      style={{ borderColor: theme.border }}
                    >
                      <div className="min-w-0">
                        <p
                          className="text-[10px] leading-4"
                          style={{ color: theme.muted }}
                        >
                          {selectedClass
                            ? `${selectedClass.name} · ${members} ${
                                members === 1
                                  ? "traveller"
                                  : "travellers"
                              }`
                            : "Select a travel class"}
                        </p>

                        <p
                          className="mt-0.5 text-base font-bold leading-tight"
                          style={{ color: theme.text }}
                        >
                          {groupPrice !== null
                            ? `${money(groupPrice)} total`
                            : "Choose your fare"}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!selectedClass}
                        onClick={() => handleSelectTrain(train)}
                        className={`inline-flex min-h-10 min-w-[112px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold shadow-sm transition ${focusRing} disabled:cursor-not-allowed disabled:opacity-50`}
                        style={{
                          backgroundColor: selected
                            ? theme.secondary
                            : theme.accent,
                          color: selected
                            ? theme.primary
                            : theme.text,
                          ["--tw-ring-color" as string]:
                            theme.primary,
                          ["--tw-ring-offset-color" as string]:
                            theme.surface,
                        } as React.CSSProperties}
                      >
                        {selected && (
                          <Check size={13} strokeWidth={3} />
                        )}

                        {selected ? "Selected" : "Select train"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p
            className="text-[10px] leading-4"
            style={{ color: theme.muted }}
          >
            Sample trains, fares and seat counts only. Live
            availability is not checked.
          </p>
        </>
      )}
    </div>
  );
}
