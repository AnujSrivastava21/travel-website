"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, X } from "lucide-react";

import BudgetForm from "./BudgetForm";
import BudgetResult from "./BudgetResult";
import TransportExplorer from "./TransportExplorer";

import type { CityTransport, Itinerary, TransportType } from "./budget-types";

type EditingSection = "arrival" | "departure";
type MobileView = "form" | "transport";

type Props = {
  itinerary: Itinerary;
  open: boolean;
  onClose: () => void;
};

export default function BudgetPopup({ itinerary, open, onClose }: Props) {
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

  const [cityTransport, setCityTransport] = useState<CityTransport | null>(
    null,
  );

  const [arrivalTrainPrice, setArrivalTrainPrice] = useState(0);
  const [arrivalBusPrice, setArrivalBusPrice] = useState(0);
  const [departureTrainPrice, setDepartureTrainPrice] = useState(0);
  const [departureBusPrice, setDepartureBusPrice] = useState(0);

  // Detect mobile screens without changing the desktop layout.
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

  // After choosing a ticket, return to the form.
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md sm:p-5">
      <div className="flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border border-white/10 bg-[#090909] shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-5xl sm:rounded-2xl">
        <header className="shrink-0 px-4 pt-3 sm:px-5">
          <div className="mx-auto flex w-full items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex min-w-0 items-center gap-3">
              {showingMobileTransport ? (
                <button
                  type="button"
                  onClick={() => setMobileView("form")}
                  aria-label="Back to budget form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
              ) : step === "result" ? (
                <button
                  type="button"
                  onClick={() => setStep("budget")}
                  aria-label="Back to budget form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
              ) : null}

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Travel budget planner
                </p>

                <h2 className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
                  {step === "result"
                    ? "Budget overview"
                    : showingMobileTransport
                      ? editingSection === "arrival"
                        ? "Arrival ticket"
                        : "Return ticket"
                      : "Plan your budget"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close budget planner"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
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
            className={`min-w-0 p-4 sm:p-5 lg:overflow-y-auto ${
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
            className={`min-h-0 min-w-0 border-t border-white/10 bg-white/[0.015] p-3 sm:p-4 lg:border-l lg:border-t-0 ${
              step === "budget"
                ? showingMobileTransport
                  ? "flex flex-col"
                  : "hidden lg:flex lg:flex-col"
                : "hidden"
            }`}
          >
            <TransportExplorer
  members={members}
  activeTransport={activeTransport}
  editingSection={editingSection}
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
