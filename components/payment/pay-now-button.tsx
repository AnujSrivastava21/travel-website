
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
  itinerarySlug?: string;
};

async function trackAnalyticsEvent(
  slug: string | undefined,
  eventType: "paynow_click" | "demo_payment_success",
) {
  if (!slug) return;

  try {
    const response = await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, eventType }),
      keepalive: true,
    });

    if (!response.ok) {
      console.error("Analytics event was not recorded:", eventType);
    }
  } catch (error) {
    // Analytics failures should not interrupt the payment UI.
    console.error("Analytics request failed:", error);
  }
}

export default function PayNowButton({
  amount,
  onClick,
  title,
  orderId,
  itinerarySlug,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handlePayNowClick() {
    void trackAnalyticsEvent(itinerarySlug, "paynow_click");
    setOpen(true);
  }

  function handleDemoSuccess() {
    void trackAnalyticsEvent(
      itinerarySlug,
      "demo_payment_success",
    );

    // Preserve the existing local unlock behavior.
    onClick();
  }

  return (
    <>
      <button
        type="button"
        onClick={handlePayNowClick}
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
            onSuccess={handleDemoSuccess}
            amount={amount}
            title={title}
            orderId={orderId}
          />,
          document.body,
        )}
    </>
  );
}
