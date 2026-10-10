
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Lock, ArrowRight } from "lucide-react";

import PaymentModal from "./payment-modal";

type Props = {
  amount: number;
  onClick: () => void;
  title?: string;
  orderId?: string;
};

export default function PayNowButton({
  amount,
  onClick,
  title,
  orderId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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

      {mounted &&
        createPortal(
          <PaymentModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={onClick}
            amount={amount}
            title={title}
            orderId={orderId}
          />,
          document.body,
        )}
    </>
  );
}
