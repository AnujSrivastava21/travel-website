
"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import type { DestinationTheme } from "../budget/budget-types";

type Props = {
  destinationCount: number;
  onClick: () => void;
  theme: DestinationTheme;
};

export default function DestinationCoverageButton({
  destinationCount,
  onClick,
  theme,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: theme.primary,
        color: theme.buttonText,
        borderColor: `${theme.buttonText}30`,
      }}
      className="group inline-flex w-fit max-w-[145px] shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:max-w-none sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2.5"
    >
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md sm:h-10 sm:w-10 sm:rounded-xl"
        style={{
          backgroundColor: theme.surface,
          color: theme.primary,
        }}
      >
        <MapPin size={14} className="sm:hidden" />
        <MapPin size={19} className="hidden sm:block" />
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-0.5 whitespace-nowrap text-[11px] font-semibold sm:gap-1 sm:text-sm">
          Explore
          <ArrowUpRight
            size={12}
            className="shrink-0 sm:h-[15px] sm:w-[15px]"
          />
        </span>

        <span
          className="mt-0.5 block truncate text-[9px] sm:text-xs"
          style={{ color: theme.buttonText, opacity: 0.85 }}
        >
          {destinationCount} {destinationCount === 1 ? "place" : "places"}
        </span>
      </span>
    </button>
  );
}
