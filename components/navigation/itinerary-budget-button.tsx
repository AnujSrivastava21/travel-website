"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { BudgetPopup } from "./budget-popup";

type Itinerary = {
  title: string;
  duration: number;
  
  days: {
    day: number;
    title: string;
    description: string;
    locations: string[];
  }[],

};

interface ItineraryBudgetButtonProps {
  itinerary: Itinerary;
}

export function ItineraryBudgetButton({
  itinerary,
}: ItineraryBudgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm font-medium text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-300/20"
      >
        <Calculator size={17} />
        <span>Plan Your Travel Budget</span>
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <BudgetPopup
        itinerary={itinerary}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}