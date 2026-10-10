
"use client";

import { useState } from "react";
import { Download, Eye, Flag, Wallet, X } from "lucide-react";

import { downloadBudgetPDF } from "../navigation/budget-pdf";
import { createBudgetPdfPreview } from "./budget-pdf-preview";

import PayNowButton from "./PayNowButton";
import DestinationCoverageButton from "./DestinationCoverageButton";

import type {
  CityTransport,
  DestinationTheme,
  Itinerary,
  TransportType,
} from "./budget-types";

type Props = {
  itinerary: Itinerary;
  members: number;
  arrivalTransport: TransportType;
  departureTransport: TransportType;
  cityTransport: CityTransport;
  arrivalCost: number;
  hotelCost: number;
  cityTransportCost: number;
  foodCost: number;
  entryFeesCost: number;
  departureCost: number;
  total: number;
  perPerson: number;
  duration: number;
  numberOfScooties: number;
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

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function BudgetResult(props: Props) {
  const {
    itinerary,
    members,
    arrivalTransport,
    departureTransport,
    cityTransport,
    arrivalCost,
    hotelCost,
    cityTransportCost,
    foodCost,
    entryFeesCost,
    departureCost,
    total,
    perPerson,
    duration,
    numberOfScooties,
  } = props;

  const theme = itinerary.theme ?? defaultTheme;

  const [breakdownUnlocked, setBreakdownUnlocked] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [samplePdfUrl, setSamplePdfUrl] = useState<string | null>(null);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const outlineButtonStyle = {
    borderColor: theme.primary,
    backgroundColor: theme.surface,
    color: theme.primary,
    "--tw-ring-color": theme.accent,
  } as React.CSSProperties;

  const openPdfPreview = () => {
    const pdfUrl = createBudgetPdfPreview();
    setSamplePdfUrl(pdfUrl);
  };

  const uniqueLocations = [
    ...new Set(itinerary.days.flatMap((day) => day.locations ?? [])),
  ];

  const rows = [
    { label: "Arrival journey", value: arrivalCost },
    { label: `Stay, ${duration} nights`, value: hotelCost },
    {
      label:
        cityTransport === "scooty"
          ? `Scooty, ${numberOfScooties} ${
              numberOfScooties === 1 ? "vehicle" : "vehicles"
            }`
          : cityTransport === "privateCab"
            ? "Private cab"
            : "Shared taxi",
      value: cityTransportCost,
    },
    { label: "Food and meals", value: foodCost },
    { label: "Entry fees and activities", value: entryFeesCost },
    { label: "Return journey", value: departureCost },
  ];

  const handleDownload = () => {
    if (!breakdownUnlocked) return;

    downloadBudgetPDF({
      itinerary,
      members,
      arrivalTransport,
      departureTransport,
      cityTransport,
      arrivalCost,
      hotelCost,
      cityTransportCost,
      foodCost,
      entryFeesCost,
      departureCost,
      total,
      perPerson,
      duration,
      numberOfScooties,
    });
  };

  const sharedCardStyle = {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    color: theme.text,
  };

  const primaryButtonStyle = {
    backgroundColor: theme.primary,
    color: theme.buttonText,
    borderColor: theme.primary,
  };

  // PREMIUM ITINERARY
  if (itinerary.isPremium) {
    return (
      <>
        <div
          className="mx-auto w-full max-w-md rounded-3xl border p-6 shadow-[0_14px_28px_-18px_rgba(20,33,61,0.45)]"
          style={sharedCardStyle}
        >
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{
              backgroundColor: theme.primary,
              color: theme.buttonText,
            }}
          >
            <Flag size={22} />
          </div>

          <h3
            className="mt-4 font-sans text-2xl font-bold tracking-tight"
            style={{ color: theme.text }}
          >
            Unlock your travel budget
          </h3>

          <p
            className="mt-2 text-sm leading-6"
            style={{ color: theme.muted }}
          >
            Get a complete expense breakdown, a day-by-day travel
            plan, and a downloadable PDF you can save or share
            with your travel companions.
          </p>

          <p
            className="mt-5 font-sans text-4xl font-bold tracking-tight"
            style={{ color: theme.primary }}
          >
            {money(itinerary.price ?? 0)}
          </p>

          <p className="mt-1 text-sm" style={{ color: theme.muted }}>
            Itinerary price
          </p>

          <div className="mt-5 grid grid-cols-[1.6fr_1fr] items-stretch gap-3">
            <div className="min-w-0 [&_button]:!w-full">
              <PayNowButton
                amount={itinerary.price ?? 0}
                onClick={() => setBreakdownUnlocked(true)}
              />
            </div>

            <button
              type="button"
              onClick={openPdfPreview}
              style={outlineButtonStyle}
              className={`inline-flex !mt-0 !w-full min-w-0 items-center justify-center gap-2 rounded-2xl border-2 px-2 py-3 text-sm font-semibold transition hover:opacity-80 ${focusRing}`}
            >
              <Eye size={16} className="shrink-0" />
              <span className="text-center leading-tight">Sample PDF</span>
            </button>
          </div>
        </div>

        <PdfPreviewModal
          pdfUrl={samplePdfUrl}
          onClose={() => setSamplePdfUrl(null)}
          theme={theme}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="mx-auto w-full max-w-xl space-y-5 pb-2"
        style={{ color: theme.text }}
      >
        {/* ESTIMATED BUDGET */}
        <section
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6"
          style={{
            backgroundColor: theme.primary,
            color: theme.buttonText,
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 150 60"
            className="pointer-events-none absolute -bottom-1 right-0 h-24 w-auto opacity-10"
            fill="currentColor"
          >
            <path d="M0 60V30a15 15 0 0 1 30 0v30Z" />
            <path d="M40 60V22a17 17 0 0 1 34 0v38Z" />
            <path d="M84 60V30a15 15 0 0 1 30 0v30Z" />
            <path d="M122 60V36a14 14 0 0 1 28 0v24Z" />
          </svg>

          <div className="relative">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Wallet size={16} />
              Estimated trip budget
            </div>

            <h3 className="mt-1 text-sm opacity-80">{itinerary.title}</h3>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-serif text-4xl font-semibold tabular-nums sm:text-5xl">
                  {money(total)}
                </p>

                <p className="mt-1.5 text-sm opacity-80">
                  Total for {members}{" "}
                  {members === 1 ? "traveller" : "travellers"}
                </p>

                <div className="mt-3">
                  <p className="text-xs opacity-75">Approx. per person</p>
                  <p
                    className="mt-0.5 font-serif text-xl font-semibold tabular-nums"
                    style={{ color: theme.accent }}
                  >
                    {money(perPerson)}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <DestinationCoverageButton
                 theme={theme}
                  destinationCount={uniqueLocations.length}
                  onClick={() => setShowDestinations((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PLACES COVERED */}

{showDestinations && (
  <section
    className="rounded-2xl border p-4 sm:rounded-3xl sm:p-5"
    style={sharedCardStyle}
  >
    {/* HEADER */}
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold sm:text-base">
          Places covered
        </h3>

        <p
          className="mt-1 text-xs leading-5 sm:text-sm"
          style={{ color: theme.muted }}
        >
          {uniqueLocations.length} places across {itinerary.days.length} days
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowDestinations(false)}
        style={{
          borderColor: theme.border,
          color: theme.primary,
          backgroundColor: theme.surface,
        }}
        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition hover:opacity-75 sm:px-3.5 sm:py-1.5 sm:text-xs ${focusRing}`}
      >
        Close
      </button>
    </div>

    {/* DESTINATIONS */}
    {uniqueLocations.length > 0 ? (
      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
        {uniqueLocations.map((location) => (
          <span
            key={location}
            className="max-w-full break-words rounded-full px-2.5 py-1.5 text-[11px] font-medium leading-4 sm:px-3 sm:text-xs"
            style={{
              backgroundColor: theme.secondary,
              color: theme.primary,
            }}
          >
            {location}
          </span>
        ))}
      </div>
    ) : (
      <p
        className="mt-3 text-xs leading-5 sm:mt-4 sm:text-sm"
        style={{ color: theme.muted }}
      >
        No places have been added to this itinerary yet.
      </p>
    )}
  </section>
)}


        {/* EXPENSE BREAKDOWN */}
        <section
          className="relative overflow-hidden rounded-3xl border shadow-[0_14px_28px_-18px_rgba(20,33,61,0.25)]"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <div
            className={`transition-all duration-500 ${
              breakdownUnlocked
                ? ""
                : "pointer-events-none select-none blur-[5px]"
            }`}
            aria-hidden={!breakdownUnlocked}
          >
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <h3
                className="text-base font-semibold"
                style={{ color: theme.text }}
              >
                Expense breakdown
              </h3>
              <span className="text-xs" style={{ color: theme.muted }}>
                {rows.length} categories
              </span>
            </div>

            <div className="space-y-3 px-5 pb-5 pt-2">
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline gap-2">
                  <p className="text-sm" style={{ color: theme.text }}>
                    {row.label}
                  </p>

                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 border-b-2 border-dotted"
                    style={{ borderColor: theme.border }}
                  />

                  <p
                    className="shrink-0 text-sm font-semibold tabular-nums"
                    style={{ color: theme.primary }}
                  >
                    {money(row.value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative h-0" aria-hidden="true">
              <span
                className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: theme.background }}
              />
              <span
                className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: theme.background }}
              />
              <div
                className="mx-6 border-t-2 border-dashed"
                style={{ borderColor: theme.border }}
              />
            </div>

            <div
              className="flex items-center justify-between gap-3 px-5 py-4"
              style={{ backgroundColor: theme.secondary }}
            >
              <span className="text-base font-semibold" style={{ color: theme.text }}>
                Estimated total
              </span>
              <span
                className="font-serif text-2xl font-semibold tabular-nums"
                style={{ color: theme.primary }}
              >
                {money(total)}
              </span>
            </div>
          </div>

          {!breakdownUnlocked && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center"
              style={{
                backgroundColor: `${theme.surface}E8`,
              }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-full"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.buttonText,
                }}
              >
                <Flag size={22} />
              </div>

              <div>
                <p
                  className="font-serif text-lg font-semibold"
                  style={{ color: theme.text }}
                >
                  Unlock your complete travel budget
                </p>

                <p
                  className="mx-auto mt-1 max-w-sm text-sm leading-6"
                  style={{ color: theme.muted }}
                >
                  Get the full expense breakdown, a day-by-day plan so you never
                  feel confused, and a PDF you can save or share with your
                  travel companions.
                </p>
              </div>

              <div className="w-full max-w-xs">
                <PayNowButton
                  amount={itinerary.price ?? 0}
                  onClick={() => setBreakdownUnlocked(true)}
                />
              </div>

              <button
                type="button"
                onClick={openPdfPreview}
                style={outlineButtonStyle}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition hover:opacity-80 ${focusRing}`}
              >
                <Eye size={16} />
                Preview sample PDF
              </button>
            </div>
          )}

          {breakdownUnlocked && (
            <div
              className="flex items-center gap-2 border-t px-5 py-3 text-sm font-semibold"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.secondary,
                color: theme.text,
              }}
            >
              <Flag size={16} style={{ color: theme.primary }} />
              <span>Flag raised! Your breakdown is unlocked.</span>
            </div>
          )}
        </section>

        <p
          className="px-1 text-xs leading-5"
          style={{ color: theme.muted }}
        >
          These are estimates. Actual ticket fares, stay and activity costs may
          vary.
        </p>

        {/* DOWNLOAD PDF */}
        <button
          type="button"
          disabled={!breakdownUnlocked}
          onClick={handleDownload}
          style={
            breakdownUnlocked
              ? primaryButtonStyle
              : {
                  backgroundColor: theme.border,
                  color: theme.surface,
                  borderColor: theme.border,
                }
          }
          className={`group flex w-full items-center justify-between rounded-2xl border px-5 py-3.5 text-sm font-semibold transition ${
            breakdownUnlocked
              ? "hover:opacity-85"
              : "cursor-not-allowed"
          } ${focusRing}`}
        >
          <span>
            {breakdownUnlocked
              ? "Download budget PDF"
              : "Unlock to download budget PDF"}
          </span>

          <span
            className="grid h-9 w-9 place-items-center rounded-xl"
            style={{
              backgroundColor: breakdownUnlocked
                ? `${theme.surface}25`
                : `${theme.surface}40`,
            }}
          >
            <Download size={17} />
          </span>
        </button>
      </div>

      <PdfPreviewModal
        pdfUrl={samplePdfUrl}
        onClose={() => setSamplePdfUrl(null)}
        theme={theme}
      />
    </>
  );
}

type PdfPreviewModalProps = {
  pdfUrl: string | null;
  onClose: () => void;
  theme: DestinationTheme;
};

function PdfPreviewModal({
  pdfUrl,
  onClose,
  theme,
}: PdfPreviewModalProps) {
  if (!pdfUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-3 backdrop-blur-sm sm:p-6"
      style={{ backgroundColor: `${theme.primary}99` }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sample budget PDF preview"
        className="flex h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border shadow-[0_30px_80px_-20px_rgba(20,33,61,0.6)]"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <header
          className="flex shrink-0 items-center justify-between border-b px-5 py-4"
          style={{ borderColor: theme.border }}
        >
          <div>
            <h3
              className="font-serif text-lg font-semibold"
              style={{ color: theme.text }}
            >
              Sample budget PDF
            </h3>
            <p className="mt-0.5 text-sm" style={{ color: theme.muted }}>
              Preview only. Your actual details are hidden.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close PDF preview"
            className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:opacity-75"
            style={{
              borderColor: theme.border,
              color: theme.primary,
            }}
          >
            <X size={18} />
          </button>
        </header>

        <iframe
          src={pdfUrl}
          title="Sample Budget PDF"
          className="min-h-0 flex-1 bg-white"
        />

        <footer
          className="shrink-0 border-t p-4"
          style={{ borderColor: theme.border }}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl px-4 py-3 text-sm font-semibold transition hover:opacity-85"
            style={{
              backgroundColor: theme.primary,
              color: theme.buttonText,
            }}
          >
            Back to my budget
          </button>
        </footer>
      </div>
    </div>
  );
}
