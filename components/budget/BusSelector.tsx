
"use client";

import { useMemo, useState } from "react";
import {
  BusFront,
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import type { TransportResult } from "./budget-types";

type Props = {
  members: number;
  selectedId?: number;
  onSelect: (ticket: TransportResult) => void;
};

type BusClass = {
  code: "SEATER" | "AC_SLEEPER" | "NON_AC_SLEEPER";
  name: string;
  availableSeats: number;
  fare: number;
};

type DemoBus = TransportResult & {
  classes: BusClass[];
};

type FilterType = "all" | "departure" | "arrival" | "fare";

const demoBuses: DemoBus[] = [
  {
    id: 101,
    name: "AC Seater Bus",
    number: "BUS-101",
    departure: "07:00 AM",
    arrival: "12:00 PM",
    pricePerPerson: 450,
    classes: [
      {
        code: "SEATER",
        name: "AC Seater",
        availableSeats: 24,
        fare: 450,
      },
      {
        code: "AC_SLEEPER",
        name: "AC Sleeper",
        availableSeats: 12,
        fare: 750,
      },
      {
        code: "NON_AC_SLEEPER",
        name: "Non-AC Sleeper",
        availableSeats: 18,
        fare: 550,
      },
    ],
  },
  {
    id: 102,
    name: "Volvo AC Bus",
    number: "BUS-202",
    departure: "09:30 AM",
    arrival: "02:30 PM",
    pricePerPerson: 650,
    classes: [
      {
        code: "SEATER",
        name: "AC Seater",
        availableSeats: 16,
        fare: 650,
      },
      {
        code: "AC_SLEEPER",
        name: "AC Sleeper",
        availableSeats: 8,
        fare: 950,
      },
      {
        code: "NON_AC_SLEEPER",
        name: "Non-AC Sleeper",
        availableSeats: 0,
        fare: 600,
      },
    ],
  },
  {
    id: 103,
    name: "Night Sleeper Bus",
    number: "BUS-303",
    departure: "10:00 PM",
    arrival: "05:30 AM",
    pricePerPerson: 350,
    classes: [
      {
        code: "SEATER",
        name: "AC Seater",
        availableSeats: 10,
        fare: 500,
      },
      {
        code: "AC_SLEEPER",
        name: "AC Sleeper",
        availableSeats: 6,
        fare: 850,
      },
      {
        code: "NON_AC_SLEEPER",
        name: "Non-AC Sleeper",
        availableSeats: 22,
        fare: 350,
      },
    ],
  },
];

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All buses" },
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

export default function BusSelector({
  members,
  selectedId,
  onSelect,
}: Props) {
  const [travelDate, setTravelDate] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  // No bus class is selected initially.
  const [selectedClasses, setSelectedClasses] = useState<
    Record<number, BusClass["code"]>
  >({});

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const visibleBuses = useMemo(() => {
    const buses = [...demoBuses];

    switch (activeFilter) {
      case "departure":
        return buses.sort(
          (a, b) =>
            timeToMinutes(a.departure) -
            timeToMinutes(b.departure)
        );

      case "arrival":
        return buses.sort(
          (a, b) =>
            timeToMinutes(a.arrival) -
            timeToMinutes(b.arrival)
        );

      case "fare":
        return buses.sort(
          (a, b) =>
            Math.min(...a.classes.map((item) => item.fare)) -
            Math.min(...b.classes.map((item) => item.fare))
        );

      default:
        return buses;
    }
  }, [activeFilter]);

  const handleSelectBus = (bus: DemoBus) => {
    const selectedClassCode = selectedClasses[bus.id];

    if (!selectedClassCode) return;

    const selectedClass = bus.classes.find(
      (item) => item.code === selectedClassCode
    );

    if (!selectedClass || selectedClass.availableSeats === 0) {
      return;
    }

    onSelect({
      ...bus,
      pricePerPerson: selectedClass.fare,
    });
  };

  return (
    <div className="space-y-5 text-white">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
          <BusFront size={21} className="text-amber-300" />
        </div>

        <div>
          <h3 className="text-base font-semibold">
            Find your bus
          </h3>
          <p className="mt-1 text-xs text-white/45">
            Select a date, compare buses and choose your seat type.
          </p>
        </div>
      </div>

      {/* Date selection */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
        <label
          htmlFor="bus-travel-date"
          className="mb-2 flex items-center gap-2 text-xs font-medium text-white/70"
        >
          <CalendarDays size={15} className="text-amber-300" />
          Journey date
        </label>

        <input
          id="bus-travel-date"
          type="date"
          min={minDate}
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 [color-scheme:dark]"
        />

        <p className="mt-2 text-[11px] leading-4 text-white/35">
          Choose your travel date to view bus options.
        </p>
      </div>

      {/* Hide results until a date is selected */}
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
            Select a journey date above to explore the available bus
            options.
          </p>
        </div>
      ) : (
        <>
          {/* Results heading */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold">
                Available bus options
              </h4>
              <p className="mt-1 text-xs text-white/40">
                {visibleBuses.length} demo buses ·{" "}
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
              Sort buses
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

          {/* Fare summary */}
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

          {/* Bus cards */}
          <div className="space-y-4">
            {visibleBuses.map((bus) => {
              const selected = selectedId === bus.id;
              const selectedClassCode = selectedClasses[bus.id];

              const selectedClass = bus.classes.find(
                (item) => item.code === selectedClassCode
              );

              const groupPrice = selectedClass
                ? selectedClass.fare * members
                : null;

              return (
                <article
                  key={bus.id}
                  className={`overflow-hidden rounded-2xl border transition ${
                    selected
                      ? "border-amber-300/45 bg-amber-300/[0.045]"
                      : "border-white/10 bg-[#151515]"
                  }`}
                >
                  {/* Bus identity and fare */}
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h5 className="text-sm font-semibold leading-5 text-white">
                          {bus.name}
                        </h5>

                        {selected && (
                          <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200">
                            Selected
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 text-xs text-white/45">
                        Bus no.{" "}
                        <span className="font-medium tracking-wide text-white/75">
                          {bus.number}
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
                            ...bus.classes.map((item) => item.fare)
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
                          {bus.departure}
                        </p>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col items-center">
                        <Clock3
                          size={13}
                          className="mb-1 text-white/35"
                        />
                        <div className="flex w-full items-center gap-1.5">
                          <div className="h-px flex-1 bg-white/15" />
                          <BusFront
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
                          {bus.arrival}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Three seat-type options */}
                  <div className="p-4">
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-white/80">
                        Choose seat type
                      </p>
                      <p className="text-[10px] text-white/35">
                        Select one
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {bus.classes.map((item) => {
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
                                [bus.id]: item.code,
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
                                className={`text-[10px] font-bold leading-4 sm:text-xs ${
                                  classSelected
                                    ? "text-amber-200"
                                    : "text-white"
                                }`}
                              >
                                {item.code === "SEATER"
                                  ? "SEATER"
                                  : item.code === "AC_SLEEPER"
                                    ? "AC SLEEPER"
                                    : "NON-AC"}
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
                                ? "Sold out"
                                : `${item.availableSeats} seats`}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-white">
                              {money(item.fare)}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected class and total */}
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-3">
                      <div className="min-w-0">
                        <p className="text-[10px] text-white/40">
                          {selectedClass
                            ? `${selectedClass.name} · ${members} ${
                                members === 1
                                  ? "traveller"
                                  : "travellers"
                              }`
                            : "Select a seat type to continue"}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          {groupPrice !== null
                            ? `${money(groupPrice)} total`
                            : "No seat type selected"}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!selectedClass}
                        onClick={() => handleSelectBus(bus)}
                        className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-35 ${
                          selected
                            ? "border border-amber-300/30 bg-amber-300/10 text-amber-200"
                            : "bg-amber-300 text-black hover:bg-amber-200"
                        }`}
                      >
                        {selected && <Check size={13} />}
                        {selected ? "Selected" : "Select bus"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-[10px] leading-4 text-white/30">
            Illustrative demo buses, fares and seat counts only. Selecting
            a date does not currently fetch real buses or check live seat
            availability.
          </p>
        </>
      )}
    </div>
  );
}
