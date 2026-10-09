
"use client";

import { Lock, ArrowRight } from "lucide-react";

type Props = {
  amount: number;
  onClick: () => void;
};

export default function PayNowButton({ amount, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl bg-amber-200 px-4 py-3 text-left text-sm font-semibold text-black transition hover:bg-amber-100"
    >
      <span className="flex items-center gap-2">
        <Lock size={15} />
        Pay Now · ₹{amount.toLocaleString("en-IN")}
      </span>

      <ArrowRight
        size={17}
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
