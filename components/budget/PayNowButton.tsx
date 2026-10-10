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
      className="group flex w-full items-center justify-between rounded-2xl bg-[#E8A317] px-5 py-3.5 text-left text-sm font-semibold text-[#14213D] shadow-[0_10px_20px_-12px_rgba(232,163,23,0.9)] transition hover:bg-[#F2B53A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <span className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#14213D]/10">
          <Lock size={16} />
        </span>
        Pay ₹{amount.toLocaleString("en-IN")} to unlock
      </span>

      <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}