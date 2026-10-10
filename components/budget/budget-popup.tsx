
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, X } from "lucide-react";

import BudgetForm from "./BudgetForm";
import BudgetResult from "./BudgetResult";
import TransportExplorer from "./TransportExplorer";


import type {
  CityTransport,
  DestinationTheme,
  Itinerary,
  TransportType,
} from "./budget-types";

type EditingSection = "arrival" | "departure";
type MobileView = "form" | "transport";

type Props = {
  itinerary: Itinerary;
  open: boolean;
  onClose: () => void;
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

const iconButton =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function BudgetPopup({
  itinerary,
  open,
  onClose,
}: Props) {
  const [step, setStep] = useState<"budget" | "result">("budget");
  const [members, setMembers] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("form");

  const [editingSection, setEditingSection] =
    useState<EditingSection>("arrival");

  const [activeTransport, setActiveTransport] =
    useState<TransportType>("train");

  const [arrivalTransport, setArrivalTransport] =
    useState<TransportType | null>(null);

  const [departureTransport, setDepartureTransport] =
    useState<TransportType | null>(null);

  const [cityTransport, setCityTransport] =
    useState<CityTransport | null>(null);

  const [arrivalTrainPrice, setArrivalTrainPrice] = useState(0);
  const [arrivalBusPrice, setArrivalBusPrice] = useState(0);
  const [departureTrainPrice, setDepartureTrainPrice] = useState(0);
  const [departureBusPrice, setDepartureBusPrice] = useState(0);

  // Use the selected itinerary's theme.
  const theme = itinerary.theme ?? defaultTheme;

  const themedIconButtonStyle = {
    borderColor: theme.border,
    color: theme.text,
    outlineColor: theme.accent,
  };

  // Detect mobile screens.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateScreen = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => {
      mediaQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  const duration = itinerary.duration;

  const handleTrainPriceChange = useCallback(
    (section: EditingSection, price: number) => {
      if (section === "arrival") {
        setArrivalTrainPrice(price);
      } else {
        setDepartureTrainPrice(price);
      }
    },
    [],
  );

  const handleBusPriceChange = useCallback(
    (section: EditingSection, price: number) => {
      if (section === "arrival") {
        setArrivalBusPrice(price);
      } else {
        setDepartureBusPrice(price);
      }
    },
    [],
  );

  const handleArrivalChange = (transport: TransportType) => {
    setEditingSection("arrival");
    setActiveTransport(transport);

    if (isMobile) {
      setMobileView("transport");
    }
  };

  const handleDepartureChange = (transport: TransportType) => {
    setEditingSection("departure");
    setActiveTransport(transport);

    if (isMobile) {
      setMobileView("transport");
    }
  };

  const handleTicketSelected = (
    section: EditingSection,
    transport: TransportType,
  ) => {
    if (section === "arrival") {
      setArrivalTransport(transport);
    } else {
      setDepartureTransport(transport);
    }

    if (isMobile) {
      setMobileView("form");
    }
  };

  const arrivalCost =
    arrivalTransport === "train"
      ? arrivalTrainPrice
      : arrivalTransport === "bus"
        ? arrivalBusPrice
        : 0;

  const departureCost =
    departureTransport === "train"
      ? departureTrainPrice
      : departureTransport === "bus"
        ? departureBusPrice
        : 0;

  const hotelPerPersonPerNight =
    members === 1 ? 1000 : members === 2 ? 800 : 700;

  const hotelCost = hotelPerPersonPerNight * members * duration;
  const foodCost = 600 * members * duration;
  const entryFeesCost = 200 * members * duration;

  const numberOfScooties = Math.ceil(members / 2);

  const cityTransportCost = useMemo(() => {
    if (!cityTransport) return 0;

    switch (cityTransport) {
      case "scooty":
        return numberOfScooties * 1000 * duration;
      case "privateCab":
        return 4000 * duration;
      case "sharedTaxi":
        return 800 * duration;
      default:
        return 0;
    }
  }, [cityTransport, numberOfScooties, duration]);

  const arrivalTicketSelected =
    arrivalTransport === "train"
      ? arrivalTrainPrice > 0
      : arrivalTransport === "bus"
        ? arrivalBusPrice > 0
        : false;

  const departureTicketSelected =
    departureTransport === "train"
      ? departureTrainPrice > 0
      : departureTransport === "bus"
        ? departureBusPrice > 0
        : false;

  const canCalculate =
    arrivalTransport !== null &&
    departureTransport !== null &&
    cityTransport !== null &&
    arrivalTicketSelected &&
    departureTicketSelected;

  const total = useMemo(
    () =>
      arrivalCost +
      departureCost +
      hotelCost +
      cityTransportCost +
      foodCost +
      entryFeesCost,
    [
      arrivalCost,
      departureCost,
      hotelCost,
      cityTransportCost,
      foodCost,
      entryFeesCost,
    ],
  );

  const perPerson = members > 0 ? Math.ceil(total / members) : 0;

  const handleClose = () => {
    setStep("budget");
    setMembers(2);
    setEditingSection("arrival");
    setActiveTransport("train");
    setMobileView("form");

    setArrivalTransport(null);
    setDepartureTransport(null);
    setCityTransport(null);

    setArrivalTrainPrice(0);
    setArrivalBusPrice(0);
    setDepartureTrainPrice(0);
    setDepartureBusPrice(0);

    onClose();
  };

  if (!open) return null;

  const showingMobileTransport =
    isMobile && mobileView === "transport" && step === "budget";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#14213D]/60 p-0 backdrop-blur-sm sm:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Travel budget planner"
        className="flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden shadow-[0_30px_80px_-20px_rgba(20,33,61,0.6)] sm:h-auto sm:max-h-[90dvh] sm:max-w-5xl sm:rounded-3xl"
        style={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        {/* Destination-specific accent strip */}
        <div
          className="h-1.5 shrink-0"
          style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}, ${theme.accent})`,
          }}
        />

        <header className="shrink-0 px-4 pt-4 sm:px-6">
          <div
            className="mx-auto flex w-full items-center justify-between gap-3 border-b pb-4"
            style={{ borderColor: theme.border }}
          >
            <div className="flex min-w-0 items-center gap-3">
              {showingMobileTransport ? (
                <button
                  type="button"
                  onClick={() => setMobileView("form")}
                  aria-label="Back to budget form"
                  className={iconButton}
                  style={themedIconButtonStyle}
                >
                  <ArrowLeft size={18} />
                </button>
              ) : step === "result" ? (
                <button
                  type="button"
                  onClick={() => setStep("budget")}
                  aria-label="Back to budget form"
                  className={iconButton}
                  style={themedIconButtonStyle}
                >
                  <ArrowLeft size={18} />
                </button>
              ) : null}

              <div className="min-w-0">
                <p
                  className="text-xs font-medium"
                  style={{ color: theme.muted }}
                >
                  Travel budget planner
                </p>

                <h2
                  className="truncate font-sans text-xl font-bold tracking-tight sm:text-2xl"
                  style={{ color: theme.text }}
                >
                  {step === "result"
                    ? "Your budget"
                    : showingMobileTransport
                      ? editingSection === "arrival"
                        ? "Arrival ticket"
                        : "Return ticket"
                      : "Plan your budget"}
                </h2>

                <p
                  className="mt-0.5 truncate text-xs"
                  style={{ color: theme.muted }}
                >
                  {itinerary.destination}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close budget planner"
              className={iconButton}
              style={themedIconButtonStyle}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div
          className={`grid min-h-0 flex-1 ${
            step === "budget"
              ? "grid-cols-1 overflow-y-auto lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:overflow-hidden"
              : "grid-cols-1 overflow-y-auto"
          }`}
        >
          <main
            className={`min-w-0 p-4 sm:p-6 lg:overflow-y-auto ${
              showingMobileTransport ? "hidden lg:block" : "block"
            }`}
          >
            {step === "budget" ? (
              <BudgetForm
                title={itinerary.title}
                duration={duration}
                members={members}
                arrivalTransport={arrivalTransport}
                departureTransport={departureTransport}
                cityTransport={cityTransport}
                arrivalTrainPrice={arrivalTrainPrice}
                arrivalBusPrice={arrivalBusPrice}
                departureTrainPrice={departureTrainPrice}
                departureBusPrice={departureBusPrice}
                canCalculate={canCalculate}
                theme={theme}
                onMembersChange={setMembers}
                onArrivalChange={handleArrivalChange}
                onDepartureChange={handleDepartureChange}
                onCityTransportChange={setCityTransport}
                onCalculate={() => {
                  if (canCalculate) setStep("result");
                }}
              />
            ) : (
              <BudgetResult
                itinerary={itinerary}
                members={members}
                arrivalTransport={arrivalTransport!}
                departureTransport={departureTransport!}
                cityTransport={cityTransport!}
                arrivalCost={arrivalCost}
                departureCost={departureCost}
                hotelCost={hotelCost}
                cityTransportCost={cityTransportCost}
                foodCost={foodCost}
                entryFeesCost={entryFeesCost}
                total={total}
                perPerson={perPerson}
                duration={duration}
                numberOfScooties={numberOfScooties}
              />
            )}
          </main>

          <aside
            className={`min-h-0 min-w-0 border-t p-4 sm:p-6 lg:border-l lg:border-t-0 ${
              step === "budget"
                ? showingMobileTransport
                  ? "flex flex-col"
                  : "hidden lg:flex lg:flex-col"
                : "hidden"
            }`}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border,
            }}
          >
            <TransportExplorer
              members={members}
              activeTransport={activeTransport}
              editingSection={editingSection}
               theme={theme}
              onTrainPriceChange={(price) =>
                handleTrainPriceChange(editingSection, price)
              }
              onBusPriceChange={(price) =>
                handleBusPriceChange(editingSection, price)
              }
              onTicketSelected={handleTicketSelected}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
