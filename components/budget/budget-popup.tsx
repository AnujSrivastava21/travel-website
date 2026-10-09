
"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, X } from "lucide-react";

import BudgetForm from "./BudgetForm";
import BudgetResult from "./BudgetResult";
import TransportExplorer from "./TransportExplorer";

import type {
  CityTransport,
  Itinerary,
  TransportType,
} from "./budget-types";

type EditingSection = "arrival" | "departure";

type Props = {
  itinerary: Itinerary;
  open: boolean;
  onClose: () => void;
};

export default function BudgetPopup({
  itinerary,
  open,
  onClose,
}: Props) {
  const [step, setStep] = useState<"budget" | "result">("budget");
  const [members, setMembers] = useState(2);

  const [editingSection, setEditingSection] =
    useState<EditingSection>("arrival");

  // Visible tab only; this does not mean a ticket is selected.
  const [activeTransport, setActiveTransport] =
    useState<TransportType>("train");

  // No transport options selected by default.
  const [arrivalTransport, setArrivalTransport] =
    useState<TransportType | null>(null);

  const [departureTransport, setDepartureTransport] =
    useState<TransportType | null>(null);

  const [cityTransport, setCityTransport] =
    useState<CityTransport | null>(null);

  // Independent ticket prices for Arrival and Return.
  const [arrivalTrainPrice, setArrivalTrainPrice] = useState(0);
  const [arrivalBusPrice, setArrivalBusPrice] = useState(0);

  const [departureTrainPrice, setDepartureTrainPrice] = useState(0);
  const [departureBusPrice, setDepartureBusPrice] = useState(0);

  const duration = itinerary.duration;

  const handleTrainPriceChange = useCallback(
    (price: number) => {
      if (editingSection === "arrival") {
        setArrivalTrainPrice(price);
      } else {
        setDepartureTrainPrice(price);
      }
    },
    [editingSection],
  );

  const handleBusPriceChange = useCallback(
    (price: number) => {
      if (editingSection === "arrival") {
        setArrivalBusPrice(price);
      } else {
        setDepartureBusPrice(price);
      }
    },
    [editingSection],
  );

  const handleArrivalChange = (transport: TransportType) => {
    setEditingSection("arrival");
    setArrivalTransport(transport);
    setActiveTransport(transport);
  };

  const handleDepartureChange = (transport: TransportType) => {
    setEditingSection("departure");
    setDepartureTransport(transport);
    setActiveTransport(transport);
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

  const perPerson =
    members > 0 ? Math.ceil(total / members) : 0;

  const handleClose = () => {
    setStep("budget");
    setMembers(2);
    setEditingSection("arrival");
    setActiveTransport("train");

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

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5">
      <div className="flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090909] shadow-2xl">
        <header className="shrink-0 px-4 pt-3 sm:px-5">
          <div className="mx-auto flex w-full items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex min-w-0 items-center gap-3">
              {step === "result" && (
                <button
                  type="button"
                  onClick={() => setStep("budget")}
                  aria-label="Back to budget form"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={15} />
                </button>
              )}

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-amber-300/70">
                  Travel budget planner
                </p>

                <h2 className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
                  {step === "budget"
                    ? "Plan your budget"
                    : "Budget overview"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close budget planner"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:bg-white/10 hover:text-white"
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
          <main className="min-w-0 p-4 sm:p-5 lg:overflow-y-auto">
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
              step === "budget" ? "flex flex-col" : "hidden"
            }`}
          >
            <TransportExplorer
  members={members}
  activeTransport={activeTransport}
  editingSection={editingSection}
  onTrainPriceChange={handleTrainPriceChange}
  onBusPriceChange={handleBusPriceChange}
/>
          </aside>
        </div>
      </div>
    </div>
  );
}
