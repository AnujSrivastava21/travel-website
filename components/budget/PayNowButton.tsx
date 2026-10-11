
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Lock, ArrowRight } from "lucide-react";

import PaymentModal from "../payment/payment-modal";

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
  const [freeMessage, setFreeMessage] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (amount === 0) {
      setFreeMessage(true);
      return;
    }

    if (amount > 0) {
      setOpen(true);
    }
  };

  const handleFreeContinue = () => {
    setFreeMessage(false);
    onClick();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group flex w-full items-center justify-between rounded-2xl bg-[#E8A317] px-5 py-3.5 text-left text-sm font-semibold text-[#14213D] shadow-[0_10px_20px_-12px_rgba(232,163,23,0.9)] transition hover:bg-[#F2B53A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <span className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#14213D]/10">
            <Lock size={16} />
          </span>

          {amount === 0
            ? "Get free itinerary"
            : `Pay ₹${amount.toLocaleString("en-IN")} to unlock`}
        </span>

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      {/* Gratitude message for free itineraries */}
      {freeMessage && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-[#14213D]/60 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="free-itinerary-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#F4EFE4] p-6 text-center shadow-2xl">
            <h2
              id="free-itinerary-title"
              className="font-serif text-2xl font-semibold text-[#263D32]"
            >
              This itinerary is on me! ❤️
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#626A5D]">
              No payment needed. I&apos;m happy to help you plan your next
              adventure. Thank you for being part of The Local Route.
              Travel more, discover more, and make memories worth remembering.
            </p>

            <p className="mt-4 font-serif text-lg font-semibold text-[#263D32]">
              With gratitude, Anuj
            </p>

            <button
              type="button"
              onClick={handleFreeContinue}
              className="mt-5 w-full rounded-xl bg-[#263D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D3027] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] focus-visible:ring-offset-2"
            >
              View itinerary
            </button>

            <button
              type="button"
              onClick={() => setFreeMessage(false)}
              className="mt-3 text-sm font-medium text-[#626A5D] hover:text-[#263D32]"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
