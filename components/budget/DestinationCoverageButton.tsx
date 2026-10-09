
"use client";

import { MapPin, ArrowUpRight } from "lucide-react";

type Props = {
  destinationCount: number;
  onClick: () => void;
};

export default function DestinationCoverageButton({
  destinationCount,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-3 py-3 text-left transition-all duration-200 hover:border-amber-300/40 hover:bg-amber-300/[0.1] sm:px-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300/15 bg-amber-300/[0.08] text-amber-200">
        <MapPin size={19} />
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          Explore Places
          <ArrowUpRight
            size={14}
            className="text-amber-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>

        <span className="mt-1 block text-[11px] text-white/45">
          {destinationCount} destinations covered
        </span>
      </span>
    </button>
  );
}
