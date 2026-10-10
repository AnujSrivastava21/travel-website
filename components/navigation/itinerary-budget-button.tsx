"use client";

import { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

import BudgetPopup from "../budget/budget-popup";
import type { Itinerary } from "../budget/budget-types";

interface ItineraryBudgetButtonProps {
  itinerary: Itinerary;
  variant?: "hero" | "light";
}

export function ItineraryBudgetButton({
  itinerary,
  variant = "hero",
}: ItineraryBudgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const theme = itinerary.theme ?? {
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

  const isHero = variant === "hero";

  const buttonStyle = isHero
    ? {
        backgroundColor: theme.accent,
        color: theme.text,
        borderColor: `${theme.accent}99`,
      }
    : {
        backgroundColor: theme.primary,
        color: theme.buttonText,
        borderColor: theme.primary,
      };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={buttonStyle}
        className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold shadow-md transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Calculator
          size={17}
          style={{
            color: isHero ? theme.text : theme.accent,
          }}
        />

        <span>Plan Your Travel Budget</span>

        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
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