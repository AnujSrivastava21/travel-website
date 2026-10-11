
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  TrainFront,
  CalendarDays,
  Clock3,
  MapPin,
  Search,
  RefreshCw,
} from "lucide-react";

const CLASSES = [
  { code: "SL", label: "Sleeper" },
  { code: "3A", label: "3 AC" },
  { code: "2A", label: "2 AC" },
  { code: "1A", label: "1 AC" },
];

type RouteTrain = {
  train?: {
    number?: string;
    name?: string;
    type?: string;
    runDays?: string[];
  };
  from?: {
    departure?: string | null;
    day?: number;
    sequence?: number;
  };
  to?: {
    arrival?: string | null;
    day?: number;
    sequence?: number;
  };
  duration?: number;
  distance?: number;
  totalHaltsBetween?: number;
};

type TrainsResponse = {
  success?: boolean;
  data?: {
    count?: number;
    from?: { code?: string; name?: string };
    to?: { code?: string; name?: string };
    trains?: RouteTrain[];
  };
  error?: unknown;
  message?: unknown;
};

type SeatDay = {
  date?: string;
  status?: string;
  statusCode?: string;
  isAvailable?: boolean;
  availableSeats?: number;
  waitlistNumber?: number;
  waitlistType?: string;
  availablityDate?: string;
  availabilityDate?: string;
  availablityStatus?: string;
  availabilityStatus?: string;
};

type NormalizedAvailability = {
  status: string;
  availableSeats: number | null;
  type: "available" | "confirmed" | "rac" | "waitlist" | "unavailable" | "unknown";
  canSelect: boolean;
  message: string;
};

type SeatResponse = {
  success?: boolean;
  data?: {
    trainNumber?: string;
    trainName?: string;
    quotaCode?: string;
    classCode?: string;
    calendar?: SeatDay[];
    avlDayList?: SeatDay[];
  };
  availability?: NormalizedAvailability;
  error?: unknown;
  message?: unknown;
};

type ClassResult = {
  code: string;
  label: string;
  loading: boolean;
  data?: SeatResponse["data"];
  availability?: NormalizedAvailability;
  error?: string;
};

function getLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getErrorMessage(value: unknown): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    const obj = value as {
      message?: unknown;
      error?: unknown;
      details?: unknown;
    };

    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
    if (typeof obj.details === "string") return obj.details;

    return JSON.stringify(value);
  }

  return "Unable to fetch data. Please try again.";
}

function getSeatDay(
  data: SeatResponse["data"],
  journeyDate: string
): SeatDay | undefined {
  const days = [
    ...(data?.calendar ?? []),
    ...(data?.avlDayList ?? []),
  ];

  return days.find((day) => {
    const date =
      day.date ??
      day.availablityDate ??
      day.availabilityDate;

    return date?.slice(0, 10) === journeyDate;
  });
}

function normalizeDay(day?: SeatDay): NormalizedAvailability {
  const rawStatus = (
    day?.statusCode ??
    day?.availablityStatus ??
    day?.availabilityStatus ??
    day?.status ??
    ""
  ).trim().toUpperCase();

  if (!day || !rawStatus) {
    return {
      status: "Status unavailable",
      availableSeats: null,
      type: "unknown",
      canSelect: false,
      message: "The API did not provide an availability status for this date.",
    };
  }

  // AVAILABLE-0042 and AVAILABLE 42 indicate 42 seats.
  const availableMatch = rawStatus.match(
    /^AVAILABLE(?:[-\s]+(\d+))?$/
  );

  if (availableMatch) {
    const seats = availableMatch[1]
      ? Number(availableMatch[1])
      : typeof day.availableSeats === "number"
        ? day.availableSeats
        : null;

    return {
      status: rawStatus,
      availableSeats: seats,
      type: "available",
      canSelect: true,
      message:
        seats !== null
          ? `${seats} seats available`
          : "Available; exact seat count not provided",
    };
  }

  if (day.isAvailable === true && !rawStatus.includes("WAITLIST")) {
    return {
      status: rawStatus,
      availableSeats:
        typeof day.availableSeats === "number"
          ? day.availableSeats
          : null,
      type: "available",
      canSelect: true,
      message:
        typeof day.availableSeats === "number"
          ? `${day.availableSeats} seats available`
          : rawStatus,
    };
  }

  if (/\b(RAC)\b/.test(rawStatus)) {
    return {
      status: rawStatus,
      availableSeats: null,
      type: "rac",
      canSelect: false,
      message: `RAC status: ${rawStatus}`,
    };
  }

  if (/\b(WL|GNWL|RLWL|PQWL|TQWL|RQWL|WAITLIST)\b/.test(rawStatus)) {
    return {
      status: rawStatus,
      availableSeats: null,
      type: "waitlist",
      canSelect: false,
      message: `Waitlisted: ${rawStatus}`,
    };
  }

  if (/\b(CNF|CONFIRMED)\b/.test(rawStatus)) {
    return {
      status: rawStatus,
      availableSeats: null,
      type: "confirmed",
      canSelect: true,
      message: `Confirmed status: ${rawStatus}`,
    };
  }

  if (
    /REGRET|NOT AVAILABLE|NOTAVAILABLE|CANCELLED|CLOSED|NO ROOM|NOT BOOKABLE/.test(
      rawStatus
    )
  ) {
    return {
      status: rawStatus,
      availableSeats: 0,
      type: "unavailable",
      canSelect: false,
      message: rawStatus,
    };
  }

  return {
    status: rawStatus,
    availableSeats: null,
    type: "unknown",
    canSelect: false,
    message: `Unrecognized status: ${rawStatus}`,
  };
}

function getStatusStyle(
  availability?: NormalizedAvailability,
  error?: string
) {
  if (error) {
    return {
      card: "border-red-200 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20",
      text: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    };
  }

  switch (availability?.type) {
    case "available":
    case "confirmed":
      return {
        card: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/30",
        text: "text-emerald-700 dark:text-emerald-400",
        dot: "bg-emerald-500",
      };

    case "rac":
      return {
        card: "border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-950/20",
        text: "text-amber-700 dark:text-amber-400",
        dot: "bg-amber-500",
      };

    case "waitlist":
    case "unavailable":
      return {
        card: "border-red-200 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20",
        text: "text-red-600 dark:text-red-400",
        dot: "bg-red-500",
      };

    default:
      return {
        card: "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900",
        text: "text-neutral-600 dark:text-neutral-300",
        dot: "bg-neutral-400",
      };
  }
}

export default function RailTestPage() {
  const [source, setSource] = useState("NDLS");
  const [destination, setDestination] = useState("PRYJ");

  const [journeyDate, setJourneyDate] = useState(() =>
    getLocalDate(new Date())
  );

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [trains, setTrains] = useState<RouteTrain[]>([]);

  const [seatResults, setSeatResults] = useState<
    Record<string, ClassResult[]>
  >({});

  const [checkingTrains, setCheckingTrains] = useState<
    Record<string, boolean>
  >({});

  const minDate = getLocalDate(new Date());

  async function searchTrains(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const from = source.trim().toUpperCase();
    const to = destination.trim().toUpperCase();

    if (!from || !to || !journeyDate) {
      setError("Please enter both station codes and select a journey date.");
      return;
    }

    if (from === to) {
      setError("Source and destination cannot be the same.");
      return;
    }

    if (journeyDate < minDate) {
      setError("Please select today or a future journey date.");
      return;
    }

    setSearching(true);
    setError("");
    setHasSearched(true);
    setTrains([]);
    setSeatResults({});
    setCheckingTrains({});

    try {
      const params = new URLSearchParams({
        source: from,
        destination: to,
        journeyDate,
      });

      const response = await fetch(
        `/api/rail-trains?${params.toString()}`,
        { cache: "no-store" }
      );

      const result = (await response.json()) as TrainsResponse;

      if (!response.ok || result.success === false) {
        throw new Error(
          getErrorMessage(result.error ?? result.message)
        );
      }

      const foundTrains = result.data?.trains ?? [];
      setTrains(foundTrains);

      if (foundTrains.length === 0) {
        setError("No trains were found for this route and date.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to search trains."
      );
    } finally {
      setSearching(false);
    }
  }

  async function checkAvailability(train: RouteTrain) {
    const number = train.train?.number;

    if (!number) return;

    setError("");

    setCheckingTrains((previous) => ({
      ...previous,
      [number]: true,
    }));

    setSeatResults((previous) => ({
      ...previous,
      [number]: CLASSES.map((item) => ({
        ...item,
        loading: true,
      })),
    }));

    try {
      const results = await Promise.all(
        CLASSES.map(async (item): Promise<ClassResult> => {
          try {
            const params = new URLSearchParams({
              trainNumber: number,
              source: source.trim().toUpperCase(),
              destination: destination.trim().toUpperCase(),
              journeyDate,
              classCode: item.code,
              quotaCode: "GN",
            });

            const response = await fetch(
              `/api/rail-seats?${params.toString()}`,
              { cache: "no-store" }
            );

            const result = (await response.json()) as SeatResponse;

            if (!response.ok || result.success === false || result.error) {
              throw new Error(
                getErrorMessage(result.error ?? result.message)
              );
            }

            if (!result.data && !result.availability) {
              throw new Error("No availability data returned by the API.");
            }

            if (
              result.data?.classCode &&
              result.data.classCode.toUpperCase() !== item.code
            ) {
              throw new Error(
                `Requested ${item.code}, but API returned ${result.data.classCode}.`
              );
            }

            // Prefer normalized availability from the API route.
            // Fall back to parsing the raw response if needed.
            const day = getSeatDay(result.data, journeyDate);
            const availability =
              result.availability ?? normalizeDay(day);

            return {
              ...item,
              loading: false,
              data: result.data,
              availability,
            };
          } catch (err) {
            return {
              ...item,
              loading: false,
              error:
                err instanceof Error
                  ? err.message
                  : "Unable to check availability.",
            };
          }
        })
      );

      setSeatResults((previous) => ({
        ...previous,
        [number]: results,
      }));
    } finally {
      setCheckingTrains((previous) => ({
        ...previous,
        [number]: false,
      }));
    }
  }

  const formattedDate = journeyDate
    ? new Date(`${journeyDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-900 dark:bg-black dark:text-white sm:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
            <TrainFront size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Train Seat Availability
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Find trains and check seat availability for your journey.
            </p>
          </div>
        </header>

        <form
          onSubmit={searchTrains}
          className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="source"
                className="mb-2 block text-sm font-medium"
              >
                Source Station Code
              </label>

              <input
                id="source"
                required
                value={source}
                onChange={(event) =>
                  setSource(event.target.value.toUpperCase())
                }
                placeholder="e.g. NDLS"
                autoComplete="off"
                className="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-3 uppercase outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-neutral-700"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium"
              >
                Destination Station Code
              </label>

              <input
                id="destination"
                required
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value.toUpperCase())
                }
                placeholder="e.g. PRYJ"
                autoComplete="off"
                className="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-3 uppercase outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-neutral-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="journeyDate"
              className="mb-2 flex items-center gap-2 text-sm font-medium"
            >
              <CalendarDays size={16} className="text-emerald-700" />
              Journey Date
            </label>

            <input
              id="journeyDate"
              required
              type="date"
              min={minDate}
              value={journeyDate}
              onChange={(event) => {
                setJourneyDate(event.target.value);
                setError("");
              }}
              onClick={(event) => {
                const input = event.currentTarget;

                if (typeof input.showPicker === "function") {
                  try {
                    input.showPicker();
                  } catch {
                    // The browser may already have opened the date picker.
                  }
                }
              }}
              className="w-full cursor-pointer rounded-xl border border-neutral-300 bg-transparent px-3 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-neutral-700"
            />

            <p className="mt-1 text-xs text-neutral-500">
              Select today or a future date, then search for trains.
            </p>
          </div>

          <button
            type="submit"
            disabled={searching}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {searching ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
            {searching ? "Searching trains..." : "Search Trains"}
          </button>
        </form>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}

        {trains.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">
                  {trains.length} {trains.length === 1 ? "train" : "trains"} found
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {source} → {destination} · {formattedDate}
                </p>
              </div>
            </div>

            {trains.map((item, index) => {
              const train = item.train;
              const number = train?.number ?? `unknown-${index}`;
              const results = seatResults[number];
              const checking = checkingTrains[number] ?? false;

              return (
                <article
                  key={`${number}-${index}`}
                  className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-900 dark:bg-neutral-950"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {number}
                        </span>

                        {train?.type && (
                          <span className="text-xs text-neutral-500">
                            {train.type}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 font-bold">
                        {train?.name ?? "Train name unavailable"}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={15} className="text-emerald-700" />
                          Departs: {item.from?.departure || "—"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} className="text-emerald-700" />
                          Arrives: {item.to?.arrival || "—"}
                        </span>
                      </div>

                      {typeof item.duration === "number" && (
                        <p className="mt-2 text-xs text-neutral-500">
                          Duration: {Math.floor(item.duration / 60)}h{" "}
                          {item.duration % 60}m
                          {typeof item.distance === "number" &&
                            ` · ${item.distance} km`}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={checking || !train?.number}
                      onClick={() => checkAvailability(item)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {checking && (
                        <RefreshCw size={16} className="animate-spin" />
                      )}

                      {checking
                        ? "Checking seats..."
                        : results
                          ? "Refresh Availability"
                          : "Check Seat Availability"}
                    </button>
                  </div>

                  {results && (
                    <div className="border-t border-emerald-100 dark:border-emerald-900">
                      <div className="flex items-center justify-between gap-3 border-b border-emerald-100 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
                        <div className="flex items-center gap-2">
                          <TrainFront
                            size={19}
                            className="text-emerald-700 dark:text-emerald-400"
                          />
                          <span className="text-sm font-bold">
                            Seat Availability
                          </span>
                        </div>

                        <span className="text-xs text-neutral-500">
                          General quota
                        </span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto p-3 sm:gap-3 sm:p-4">
                        <div className="min-w-[105px] shrink-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                            Journey Date
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {formattedDate}
                          </p>

                          <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {source} → {destination}
                          </p>
                        </div>

                        <div className="h-14 shrink-0 border-l border-dashed border-neutral-300 dark:border-neutral-700" />

                        {results.map((result) => {
                          const day = getSeatDay(result.data, journeyDate);
                          const availability =
                            result.availability ?? normalizeDay(day);
                          const style = getStatusStyle(
                            availability,
                            result.error
                          );

                          return (
                            <div
                              key={result.code}
                              className={`min-w-[105px] max-w-[170px] flex-1 shrink-0 rounded-xl border p-3 ${
                                result.loading
                                  ? "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
                                  : style.card
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-extrabold">
                                  {result.code}
                                </span>

                                <span
                                  className={`h-2 w-2 shrink-0 rounded-full ${
                                    result.loading
                                      ? "animate-pulse bg-neutral-400"
                                      : style.dot
                                  }`}
                                />
                              </div>

                              <p className="mt-1 text-[11px] text-neutral-500">
                                {result.label}
                              </p>

                              {result.loading ? (
                                <p className="mt-3 text-xs text-neutral-500">
                                  Checking...
                                </p>
                              ) : result.error ? (
                                <p
                                  title={result.error}
                                  className="mt-3 break-words text-xs font-medium text-red-600 dark:text-red-400"
                                >
                                  {result.error}
                                </p>
                              ) : !result.data && !result.availability ? (
                                <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                                  No data returned
                                </p>
                              ) : !result.availability && !day ? (
                                <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                                  Date unavailable
                                </p>
                              ) : (
                                <>
                                  <p
                                    className={`mt-3 break-words text-xs font-bold ${style.text}`}
                                  >
                                    {availability.message}
                                  </p>

                                  {availability.availableSeats !== null && (
                                    <p className="mt-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                                      {availability.availableSeats} seats reported
                                    </p>
                                  )}

                                  {availability.type === "rac" && (
                                    <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-400">
                                      Reservation against cancellation
                                    </p>
                                  )}

                                  {availability.type === "waitlist" && (
                                    <p className="mt-1 text-[10px] text-red-600 dark:text-red-400">
                                      Waitlist
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 border-t border-dashed border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <p className="text-[11px] text-neutral-500">
                          Availability is based on the API response for the selected date and class.
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}

        {hasSearched && !searching && trains.length === 0 && !error && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-950">
            <TrainFront className="mx-auto text-neutral-400" size={28} />
            <p className="mt-3 font-semibold">No trains found</p>
            <p className="mt-1 text-sm text-neutral-500">
              Try another station pair or journey date.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
