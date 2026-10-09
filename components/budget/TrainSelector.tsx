"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  SlidersHorizontal,
  TrainFront,
  Users,
} from "lucide-react";

import type { TransportResult } from "./budget-types";

type Props = {
  members: number;
  selectedId?: number;
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

type FilterType = "all" | "departure" | "arrival" | "fare";

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

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All trains" },
  { id: "departure", label: "Departure time" },
  { id: "arrival", label: "Arrival time" },
  { id: "fare", label: "Lowest fare" },
];

function timeToMinutes(time: string) {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
}

export default function TrainSelector({
  members,
  selectedId,
  onSelect,
}: Props) {
  const [travelDate, setTravelDate] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  // No class is selected initially.
  const [selectedClasses, setSelectedClasses] = useState<
    Record<number, TrainClass["code"]>
  >({});

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const visibleTrains = useMemo(() => {
    const trains = [...demoTrains];

    switch (activeFilter) {
      case "departure":
        return trains.sort(
          (a, b) =>
            timeToMinutes(a.departure) -
            timeToMinutes(b.departure)
        );

      case "arrival":
        return trains.sort(
          (a, b) =>
            timeToMinutes(a.arrival) -
            timeToMinutes(b.arrival)
        );

      case "fare":
        return trains.sort(
          (a, b) => a.pricePerPerson - b.pricePerPerson
        );

      default:
        return trains;
    }
  }, [activeFilter]);

  const handleSelectTrain = (train: DemoTrain) => {
    const selectedClassCode = selectedClasses[train.id];

    if (!selectedClassCode) return;

    const selectedClass = train.classes.find(
      (item) => item.code === selectedClassCode
    );

    if (!selectedClass || selectedClass.availableSeats === 0) {
      return;
    }

    onSelect({
      ...train,
      pricePerPerson: selectedClass.fare,
    });
  };

  return (
    <div className="space-y-5 text-white">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
          <TrainFront size={21} className="text-amber-300" />
        </div>

        <div>
          <h3 className="text-base font-semibold">
            Find your train
          </h3>
          <p className="mt-1 text-xs text-white/45">
            Select a date, compare trains and choose your class.
          </p>
        </div>
      </div>

      {/* Date selection */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
        <label
          htmlFor="train-travel-date"
          className="mb-2 flex items-center gap-2 text-xs font-medium text-white/70"
        >
          <CalendarDays size={15} className="text-amber-300" />
          Journey date
        </label>

        <input
          id="train-travel-date"
          type="date"
          min={minDate}
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 [color-scheme:dark]"
        />

        <p className="mt-2 text-[11px] leading-4 text-white/35">
          Choose your travel date to view the train options.
        </p>
      </div>

      {/* Search results are hidden until a date is chosen */}
      {!travelDate ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
          <CalendarDays
            size={28}
            className="mx-auto text-amber-300/70"
          />
          <p className="mt-3 text-sm font-medium text-white/80">
            When are you travelling?
          </p>
          <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-white/40">
            Select a journey date above to explore the available train
            options.
          </p>
        </div>
      ) : (
        <>
          {/* Results heading */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold">
                Available train options
              </h4>
              <p className="mt-1 text-xs text-white/40">
                {visibleTrains.length} demo trains ·{" "}
                {new Date(`${travelDate}T12:00:00`).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] text-white/55">
              <Users size={12} />
              {members} {members === 1 ? "traveller" : "travellers"}
            </span>
          </div>

          {/* Four filters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-white/45">
              <SlidersHorizontal size={13} />
              Sort trains
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {filters.map((filter) => {
                const active = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`min-h-9 rounded-lg border px-2 py-2 text-[11px] font-medium transition ${
                      active
                        ? "border-amber-300/40 bg-amber-300/10 text-amber-200"
                        : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traveller summary */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <IndianRupee
                size={15}
                className="text-amber-300/80"
              />
              <span className="text-xs text-white/60">
                Fares shown per traveller
              </span>
            </div>
            <span className="text-[10px] text-white/35">
              Demo data
            </span>
          </div>

          {/* Train cards */}
          <div className="space-y-4">
            {visibleTrains.map((train) => {
              const selected = selectedId === train.id;
              const selectedClassCode = selectedClasses[train.id];
              const selectedClass = train.classes.find(
                (item) => item.code === selectedClassCode
              );

              const groupPrice = selectedClass
                ? selectedClass.fare * members
                : null;

              return (
                <article
                  key={train.id}
                  className={`overflow-hidden rounded-2xl border transition ${
                    selected
                      ? "border-amber-300/45 bg-amber-300/[0.045]"
                      : "border-white/10 bg-[#151515]"
                  }`}
                >
                  {/* Train identity and base fare */}
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h5 className="text-sm font-semibold leading-5 text-white">
                          {train.name}
                        </h5>

                        {selected && (
                          <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200">
                            Selected
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 text-xs text-white/45">
                        Train no.{" "}
                        <span className="font-medium tracking-wide text-white/75">
                          {train.number}
                        </span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[10px] text-white/40">
                        From
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-amber-300">
                        {money(
                          Math.min(
                            ...train.classes.map((item) => item.fare)
                          )
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Journey timeline */}
                  <div className="mx-4 rounded-xl border border-white/[0.07] bg-black/20 p-3">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] uppercase tracking-wider text-white/35">
                          Departure
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {train.departure}
                        </p>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col items-center">
                        <Clock3
                          size={13}
                          className="mb-1 text-white/35"
                        />
                        <div className="flex w-full items-center gap-1.5">
                          <div className="h-px flex-1 bg-white/15" />
                          <TrainFront
                            size={14}
                            className="shrink-0 text-amber-300/80"
                          />
                          <div className="h-px flex-1 bg-white/15" />
                        </div>
                        <span className="mt-1 text-[9px] text-white/35">
                          Journey
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 text-right">
                        <p className="text-[9px] uppercase tracking-wider text-white/35">
                          Arrival
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {train.arrival}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Three class availability boxes */}
                  <div className="p-4">
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-white/80">
                        Choose travel class
                      </p>
                      <p className="text-[10px] text-white/35">
                        Select one
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
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
                            className={`min-w-0 rounded-xl border p-2 text-left transition ${
                              unavailable
                                ? "cursor-not-allowed border-white/[0.05] bg-white/[0.015] opacity-45"
                                : classSelected
                                  ? "border-amber-300/50 bg-amber-300/10"
                                  : "border-white/10 bg-white/[0.025] hover:border-white/25"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs font-bold ${
                                  classSelected
                                    ? "text-amber-200"
                                    : "text-white"
                                }`}
                              >
                                {item.code}
                              </span>

                              {classSelected && (
                                <Check
                                  size={12}
                                  className="shrink-0 text-amber-300"
                                />
                              )}
                            </div>

                            <p className="mt-1 text-[10px] leading-4 text-white/50">
                              {item.name}
                            </p>

                            <p
                              className={`mt-2 text-[10px] font-medium leading-4 ${
                                unavailable
                                  ? "text-red-300"
                                  : item.availableSeats < 10
                                    ? "text-orange-300"
                                    : "text-emerald-300"
                              }`}
                            >
                              {unavailable
                                ? "Not available"
                                : `${item.availableSeats} seats`}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-white">
                              {money(item.fare)}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected class total */}
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-3">
                      <div className="min-w-0">
                        <p className="text-[10px] text-white/40">
                          {selectedClass
                            ? `${selectedClass.name} · ${members} ${
                                members === 1
                                  ? "traveller"
                                  : "travellers"
                              }`
                            : "Select a class to continue"}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          {groupPrice !== null
                            ? `${money(groupPrice)} total`
                            : "No class selected"}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!selectedClass}
                        onClick={() => handleSelectTrain(train)}
                        className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-35 ${
                          selected
                            ? "border border-amber-300/30 bg-amber-300/10 text-amber-200"
                            : "bg-amber-300 text-black hover:bg-amber-200"
                        }`}
                      >
                        {selected && <Check size={13} />}
                        {selected ? "Selected" : "Select train"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-[10px] leading-4 text-white/30">
            Illustrative demo trains, fares and seat counts only. Selecting
            a date does not currently fetch real trains or check live seat
            availability.
          </p>
        </>
      )}
    </div>
  );
}