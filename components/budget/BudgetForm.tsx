
"use client";

import {
  ArrowRight,
  Bike,
  BusFront,
  Car,
  CarTaxiFront,
  Check,
  Minus,
  Plus,
  TrainFront,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import type {
  CityTransport,
  DestinationTheme,
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
  theme: DestinationTheme;

  onMembersChange: (members: number) => void;
  onArrivalChange: (transport: TransportType) => void;
  onDepartureChange: (transport: TransportType) => void;
  onCityTransportChange: (transport: CityTransport) => void;
  onCalculate: () => void;
};

const MIN_MEMBERS = 1;
const MAX_MEMBERS = 4;

const rupees = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

const ticketDetail = (price: number) =>
  price > 0
    ? `${rupees(price)} for your group`
    : "Pick a ticket on the right";

function Section({
  title,
  hint,
  theme,
  children,
}: {
  title: string;
  hint?: string;
  theme: DestinationTheme;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <div>
        <h3
          className="text-[15px] font-semibold"
          style={{ color: theme.text }}
        >
          {title}
        </h3>

        {hint && (
          <p
            className="mt-0.5 text-xs"
            style={{ color: theme.muted }}
          >
            {hint}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

function ChoiceCard({
  icon: Icon,
  title,
  detail,
  selected,
  theme,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  selected: boolean;
  theme: DestinationTheme;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="relative flex min-w-0 items-start gap-3 rounded-2xl border p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        borderColor: selected ? theme.primary : theme.border,
        backgroundColor: selected ? theme.primary : theme.surface,
        color: selected ? theme.buttonText : theme.text,
        boxShadow: selected
          ? `0 8px 18px -10px ${theme.primary}99`
          : "none",
        outlineColor: theme.accent,
      }}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
        style={{
          backgroundColor: selected
            ? `${theme.buttonText}20`
            : theme.secondary,
          color: selected ? theme.buttonText : theme.primary,
        }}
      >
        <Icon size={18} strokeWidth={2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">
          {title}
        </span>

        <span
          className="mt-0.5 block break-words text-xs"
          style={{
            color: selected
              ? `${theme.buttonText}CC`
              : theme.muted,
          }}
        >
          {detail}
        </span>
      </span>

      {selected && (
        <span
          className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full"
          style={{
            backgroundColor: theme.accent,
            color: theme.text,
          }}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

function LocalCard({
  icon: Icon,
  title,
  rate,
  note,
  selected,
  theme,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  rate: string;
  note: string;
  selected: boolean;
  theme: DestinationTheme;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="relative flex min-w-0 flex-col items-start rounded-2xl border p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        borderColor: selected ? theme.primary : theme.border,
        backgroundColor: selected ? theme.primary : theme.surface,
        color: selected ? theme.buttonText : theme.text,
        boxShadow: selected
          ? `0 8px 18px -10px ${theme.primary}99`
          : "none",
        outlineColor: theme.accent,
      }}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-xl"
        style={{
          backgroundColor: selected
            ? `${theme.buttonText}20`
            : theme.secondary,
          color: selected ? theme.buttonText : theme.primary,
        }}
      >
        <Icon size={18} strokeWidth={2} />
      </span>

      <span className="mt-3 block text-sm font-semibold">
        {title}
      </span>

      <span
        className="mt-0.5 block text-sm font-semibold"
        style={{
          color: selected ? theme.accent : theme.primary,
        }}
      >
        {rate}
      </span>

      <span
        className="mt-1 block text-xs leading-4"
        style={{
          color: selected
            ? `${theme.buttonText}CC`
            : theme.muted,
        }}
      >
        {note}
      </span>

      {selected && (
        <span
          className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full"
          style={{
            backgroundColor: theme.accent,
            color: theme.text,
          }}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
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
  theme,
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

  const totalSteps = 3;

  const stepsDone = [
    arrivalPrice > 0,
    departurePrice > 0,
    cityTransport !== null,
  ];

  const doneCount = stepsDone.filter(Boolean).length;
  const ticketTotal = arrivalPrice + departurePrice;
  const scootyCount = Math.ceil(members / 2);

  return (
    <div
      className="space-y-6"
      style={{ color: theme.text }}
    >
      {/* Trip header */}
      <div
        className="relative overflow-hidden rounded-3xl p-5"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}E8, ${theme.accent})`,
          color: theme.buttonText,
        }}
      >
        {/* Decorative arch motif */}
        <svg
          aria-hidden="true"
          viewBox="0 0 150 60"
          className="pointer-events-none absolute -bottom-1 right-0 h-20 w-auto opacity-10"
          fill="currentColor"
        >
          <path d="M0 60V30a15 15 0 0 1 30 0v30Z" />
          <path d="M40 60V22a17 17 0 0 1 34 0v38Z" />
          <path d="M84 60V30a15 15 0 0 1 30 0v30Z" />
          <path d="M122 60V36a14 14 0 0 1 28 0v24Z" />
        </svg>

        <p className="text-xs opacity-75">Your trip</p>

        <h2 className="relative mt-1 max-w-[85%] font-serif text-xl font-semibold leading-snug">
          {title}
        </h2>

        <p
          className="relative mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${theme.buttonText}20`,
          }}
        >
          {duration} nights
        </p>
      </div>

      {/* Travellers */}
      <Section
        title="Who's travelling?"
        hint={`Up to ${MAX_MEMBERS} people per plan`}
        theme={theme}
      >
        <div
          className="flex items-center justify-between gap-3 rounded-2xl border p-3.5"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surface,
          }}
        >
          <div className="min-w-0">
            <div
              className="flex items-center gap-0.5"
              aria-hidden="true"
            >
              {Array.from({ length: MAX_MEMBERS }, (_, i) => (
                <UserRound
                  key={i}
                  size={22}
                  strokeWidth={2}
                  style={{
                    color: i < members ? theme.primary : theme.border,
                  }}
                />
              ))}
            </div>

            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: theme.text }}
            >
              {members} {members === 1 ? "traveller" : "travellers"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Remove one traveller"
              disabled={members <= MIN_MEMBERS}
              onClick={() => onMembersChange(members - 1)}
              className="grid h-10 w-10 place-items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.secondary,
                color: theme.primary,
                outlineColor: theme.accent,
              }}
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <span
              aria-live="polite"
              className="w-6 text-center text-lg font-semibold tabular-nums"
              style={{ color: theme.text }}
            >
              {members}
            </span>

            <button
              type="button"
              aria-label="Add one traveller"
              disabled={members >= MAX_MEMBERS}
              onClick={() => onMembersChange(members + 1)}
              className="grid h-10 w-10 place-items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: theme.primary,
                backgroundColor: theme.primary,
                color: theme.buttonText,
                outlineColor: theme.accent,
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </Section>

      {/* Arrival */}
      <Section
        title="How will you get there?"
        hint="Pick a mode, then choose a ticket on the right"
        theme={theme}
      >
        <div className="grid grid-cols-2 gap-2.5">
          <ChoiceCard
            icon={TrainFront}
            title="Train"
            detail={ticketDetail(
              arrivalTransport === "train" ? arrivalTrainPrice : 0,
            )}
            selected={arrivalTransport === "train"}
            theme={theme}
            onClick={() => onArrivalChange("train")}
          />

          <ChoiceCard
            icon={BusFront}
            title="Bus"
            detail={ticketDetail(
              arrivalTransport === "bus" ? arrivalBusPrice : 0,
            )}
            selected={arrivalTransport === "bus"}
            theme={theme}
            onClick={() => onArrivalChange("bus")}
          />
        </div>
      </Section>

      {/* Return */}
      <Section
        title="How will you get home?"
        hint="Pick a mode, then choose a ticket on the right"
        theme={theme}
      >
        <div className="grid grid-cols-2 gap-2.5">
          <ChoiceCard
            icon={TrainFront}
            title="Train"
            detail={ticketDetail(
              departureTransport === "train"
                ? departureTrainPrice
                : 0,
            )}
            selected={departureTransport === "train"}
            theme={theme}
            onClick={() => onDepartureChange("train")}
          />

          <ChoiceCard
            icon={BusFront}
            title="Bus"
            detail={ticketDetail(
              departureTransport === "bus" ? departureBusPrice : 0,
            )}
            selected={departureTransport === "bus"}
            theme={theme}
            onClick={() => onDepartureChange("bus")}
          />
        </div>
      </Section>

      {/* Local transport */}

<Section
  title="How will you get around?"
  hint="Daily estimate for local travel"
  theme={theme}
>
  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
    <LocalCard
      icon={Bike}
      title="Scooty"
      rate="₹1,000/day"
      note={`${scootyCount} ${
        scootyCount === 1 ? "scooty" : "scooties"
      } for ${members} ${members === 1 ? "person" : "people"}. Fits 2 each.`}
      selected={cityTransport === "scooty"}
      theme={theme}
      onClick={() => onCityTransportChange("scooty")}
    />

    <LocalCard
      icon={CarTaxiFront}
      title="Shared taxi"
      rate="₹800/day"
      note="Cheapest on fixed routes, shared with others."
      selected={cityTransport === "sharedTaxi"}
      theme={theme}
      onClick={() => onCityTransportChange("sharedTaxi")}
    />

    <LocalCard
      icon={Car}
      title="Private cab"
      rate="₹4,000/day"
      note="Your own car and driver, on your schedule."
      selected={cityTransport === "privateCab"}
      theme={theme}
      onClick={() => onCityTransportChange("privateCab")}
    />
  </div>
</Section>


      {/* Summary and action */}
      <div
        className="rounded-3xl p-5"
        style={{
          backgroundColor: theme.text,
          color: theme.buttonText,
        }}
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs opacity-65">Tickets so far</p>

            <p className="mt-0.5 font-serif text-3xl font-semibold tabular-nums">
              {ticketTotal > 0 ? rupees(ticketTotal) : "—"}
            </p>
          </div>

          <p className="pb-1 text-xs opacity-65">
            {doneCount} of {totalSteps} chosen
          </p>
        </div>

        {/* Progress */}
        <div
          className="mt-4 flex gap-1.5"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={doneCount}
          aria-label="Budget selections completed"
        >
          {stepsDone.map((done, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors"
              style={{
                backgroundColor: done
                  ? theme.accent
                  : `${theme.buttonText}26`,
              }}
            />
          ))}
        </div>

        {!canCalculate && missingSelections.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {missingSelections.map((message) => (
              <li
                key={message}
                className="flex items-start gap-2 text-xs leading-5 opacity-80"
              >
                <span
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
                {message}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          disabled={!canCalculate}
          onClick={() => {
            if (canCalculate) {
              onCalculate();
            }
          }}
          className="group mt-5 flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: canCalculate
              ? theme.accent
              : `${theme.buttonText}1A`,
            color: canCalculate ? theme.text : theme.buttonText,
            outlineColor: theme.accent,
            "--tw-ring-offset-color": theme.text,
          } as React.CSSProperties}
        >
          <span>
            {canCalculate ? "Calculate my budget" : "Finish your choices"}
          </span>

          <ArrowRight
            size={18}
            className={`transition-transform ${
              canCalculate ? "group-hover:translate-x-1" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
