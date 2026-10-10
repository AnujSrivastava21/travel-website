"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  AtSign,
  Check,
  ChevronDown,
  Clock3,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  X,
} from "lucide-react";

/*
  Palette (shared across the site)
  blue   #1E4F8F   selected state, amount
  ink    #14213D   headings, overlay tint
  gold   #E8A317   main action + focus ring
  sand   #F4EFE4   modal background
  line   #DDD3BE   borders
  stone  #2B2A26   text, muted #6B665A
*/

type UpiAppId = "gpay" | "phonepe" | "paytm";
type Status = "choose" | "waiting" | "verifying" | "success";
type Panel = "qr" | "upiId" | null;

type Props = {
  open: boolean;
  onClose: () => void;
  /** Called once payment is confirmed. Unlock the itinerary here. */
  onSuccess: () => void;
  amount: number;
  /** What the person is buying, e.g. the itinerary title. */
  title?: string;
  /** TODO: your UPI ID / merchant details (used for the app links and the QR). */
  merchantVpa?: string;
  merchantName?: string;
  /** TODO: create this on your server for every payment attempt. */
  orderId?: string;
  durationSeconds?: number;
};

const UPI_APPS: { id: UpiAppId; name: string; short: string; scheme: string }[] =
  [
    { id: "gpay", name: "Google Pay", short: "G", scheme: "tez://upi/pay" },
    { id: "phonepe", name: "PhonePe", short: "Pe", scheme: "phonepe://pay" },
    { id: "paytm", name: "Paytm", short: "Pt", scheme: "paytmmp://pay" },
  ];

const UPI_ID_PATTERN = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE4]";

const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const formatTime = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

function buildUpiQuery({
  vpa,
  name,
  amount,
  note,
  orderId,
}: {
  vpa: string;
  name: string;
  amount: number;
  note: string;
  orderId: string;
}) {
  return [
    `pa=${encodeURIComponent(vpa)}`,
    `pn=${encodeURIComponent(name)}`,
    `am=${amount.toFixed(2)}`,
    "cu=INR",
    `tn=${encodeURIComponent(note)}`,
    `tr=${encodeURIComponent(orderId)}`,
  ].join("&");
}

/*
  TODO: replace with a real check against YOUR SERVER (or your payment
  gateway's webhook). Never unlock paid content based on the browser alone.
  This demo version always succeeds so you can test the screens.
*/
async function verifyPayment(_orderId: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return true;
}

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
  title = "Itinerary unlock",
  merchantVpa = "yourname@upi",
  merchantName = "The Local Route",
  orderId = "ORDER-DEMO-001",
  durationSeconds = 600,
}: Props) {
  const [status, setStatus] = useState<Status>("choose");
  const [selectedApp, setSelectedApp] = useState<UpiAppId | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const endTimeRef = useRef(0);

  const startSession = () => {
    endTimeRef.current = Date.now() + durationSeconds * 1000;
    setSecondsLeft(durationSeconds);
    setStatus("choose");
    setSelectedApp(null);
    setPanel(null);
    setUpiId("");
    setMessage("");
  };

  // Reset every time the modal opens.
  useEffect(() => {
    if (open) startSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Countdown, based on a fixed end time so it never drifts.
  useEffect(() => {
    if (!open || status === "success") return;

    const tick = () => {
      const left = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000),
      );
      setSecondsLeft(left);
    };

    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [open, status]);

  // Escape closes, and the page behind does not scroll.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "verifying") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, status, onClose]);

  if (!open) return null;

  const expired = secondsLeft === 0 && status !== "success";
  const urgent = secondsLeft <= 60 && !expired;
  const progress = Math.max(0, Math.min(100, (secondsLeft / durationSeconds) * 100));

  const query = buildUpiQuery({
    vpa: merchantVpa,
    name: merchantName,
    amount,
    note: title,
    orderId,
  });
  const genericUpiLink = `upi://pay?${query}`;

  const confirmPayment = async () => {
    setStatus("verifying");
    setMessage("");

    try {
      const paid = await verifyPayment(orderId);

      if (paid) {
        setStatus("success");
      } else {
        setStatus("waiting");
        setMessage(
          "We haven't received the payment yet. Finish it in your UPI app, then try again.",
        );
      }
    } catch {
      setStatus("waiting");
      setMessage("We couldn't check the payment. Please try again.");
    }
  };

  const payWithApp = () => {
    const app = UPI_APPS.find((item) => item.id === selectedApp);
    if (!app || expired) return;

    // TODO: if you use a payment gateway, start the order here instead.
    window.location.href = `${app.scheme}?${query}`;
    setStatus("waiting");
    setMessage(`Approve the payment in ${app.name}, then come back here.`);
  };

  const payWithUpiId = () => {
    if (expired) return;

    if (!UPI_ID_PATTERN.test(upiId.trim())) {
      setMessage("Enter a valid UPI ID, for example name@bank.");
      return;
    }

    // TODO: send a collect request to this UPI ID through your gateway.
    setStatus("waiting");
    setMessage(
      `Approve the request sent to ${upiId.trim()} in your UPI app, then come back here.`,
    );
  };

  const choosing = status === "choose";

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center bg-[#14213D]/60 backdrop-blur-sm sm:items-center sm:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Complete your payment"
        className="flex max-h-[100dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-[#F4EFE4] text-[#2B2A26] shadow-[0_30px_80px_-20px_rgba(20,33,61,0.6)] sm:max-h-[92dvh] sm:rounded-3xl"
      >
        {/* Accent strip */}
        <div className="h-1.5 shrink-0 bg-gradient-to-r from-[#1E4F8F] via-[#1E4F8F] to-[#E8A317]" />

        {/* Header */}
        <header className="flex shrink-0 items-start justify-between gap-3 px-5 pb-3 pt-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-[#14213D]">
              {status === "success" ? "Payment received" : "Complete your payment"}
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#6B665A]">
              <Lock size={13} />
              Secure UPI payment
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={status === "verifying"}
            aria-label="Close payment"
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#DDD3BE] bg-white text-[#14213D] transition hover:border-[#1E4F8F] hover:text-[#1E4F8F] disabled:opacity-40 ${focusRing}`}
          >
            <X size={18} />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 pb-6">
          {/* Timer */}
          {status !== "success" && (
            <div
              className={`rounded-2xl bg-white p-4 ring-1 ${
                expired ? "ring-[#B42318]/40" : "ring-[#DDD3BE]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#14213D]">
                  <Clock3 size={16} className={urgent || expired ? "text-[#B42318]" : "text-[#1E4F8F]"} />
                  {expired ? "Time is up" : "Pay within"}
                </span>

                <span
                  className={`font-serif text-2xl font-semibold tabular-nums ${
                    urgent || expired ? "text-[#B42318]" : "text-[#1E4F8F]"
                  }`}
                >
                  {formatTime(secondsLeft)}
                </span>
              </div>

              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DDD3BE]/60"
                role="progressbar"
                aria-label="Time left to pay"
                aria-valuemin={0}
                aria-valuemax={durationSeconds}
                aria-valuenow={secondsLeft}
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${
                    urgent || expired ? "bg-[#B42318]" : "bg-[#1E4F8F]"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {expired && (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-[#B42318]" role="alert">
                    This payment session has expired.
                  </p>

                  <button
                    type="button"
                    onClick={startSession}
                    className={`shrink-0 rounded-full border-2 border-[#1E4F8F] bg-white px-4 py-2 text-sm font-semibold text-[#1E4F8F] transition hover:bg-[#1E4F8F] hover:text-white ${focusRing}`}
                  >
                    Start again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Order summary */}
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#DDD3BE]">
            <div className="min-w-0">
              <p className="text-sm text-[#6B665A]">You are paying for</p>
              <p className="mt-0.5 truncate text-base font-semibold text-[#14213D]">
                {title}
              </p>
            </div>

            <p className="shrink-0 font-serif text-3xl font-semibold tabular-nums text-[#1E4F8F]">
              {rupees(amount)}
            </p>
          </div>

          {/* SUCCESS */}
{/* SUCCESS */}
{status === "success" && (
  <div className="rounded-3xl bg-white p-6 text-center ring-1 ring-[#DDD3BE]">
    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#1E4F8F] text-white">
      <Check size={28} strokeWidth={3} />
    </span>

    <p className="mt-4 font-serif text-xl font-semibold text-[#14213D]">
      Thank You for Trusting Us! ❤️
    </p>

    <p className="mt-3 text-sm leading-6 text-[#6B665A]">
      Your support means more than you know. Every contribution helps
      me put more time, research, and hard work into making your travel
      experience smoother and more memorable.
    </p>

    <p className="mt-4 text-sm font-medium text-[#14213D]">
      This money isn't just for me; it's for the effort behind every
      itinerary, every detail, and every journey I help you plan.
    </p>

    <p className="mt-4 font-serif text-2xl font-semibold text-[#1E4F8F]">
      {rupees(amount)}
    </p>

    <p className="mt-2 text-sm text-[#6B665A]">
      Thank you for being part of The Local Route. Happy travels! ✨
    </p>

    <button
      type="button"
      onClick={() => {
        onSuccess();
        onClose();
      }}
      className={`mt-5 w-full rounded-2xl bg-[#E8A317] px-5 py-3.5 text-base font-semibold text-[#14213D] transition hover:bg-[#F2B53A] ${focusRing}`}
    >
      View Bill
    </button>
  </div>
)}


          {/* WAITING / VERIFYING */}
          {(status === "waiting" || status === "verifying") && (
            <div className="rounded-3xl bg-white p-6 text-center ring-1 ring-[#DDD3BE]">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#1E4F8F]/10 text-[#1E4F8F]">
                <Loader2 size={26} className="animate-spin" />
              </span>

              <p className="mt-4 font-serif text-xl font-semibold text-[#14213D]">
                Waiting for your payment
              </p>

              <p
                className="mt-1 text-sm leading-6 text-[#6B665A]"
                aria-live="polite"
              >
                {message || "Finish the payment in your UPI app, then come back here."}
              </p>

              <button
                type="button"
                disabled={status === "verifying" || expired}
                onClick={confirmPayment}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8A317] px-5 py-3.5 text-base font-semibold text-[#14213D] transition hover:bg-[#F2B53A] disabled:cursor-not-allowed disabled:bg-[#DDD3BE] disabled:text-white ${focusRing}`}
              >
                {status === "verifying" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Checking payment
                  </>
                ) : (
                  "I've completed the payment"
                )}
              </button>

              <button
                type="button"
                disabled={status === "verifying"}
                onClick={() => {
                  setStatus("choose");
                  setMessage("");
                }}
                className={`mt-3 rounded-full text-sm font-semibold text-[#1E4F8F] disabled:opacity-40 ${focusRing}`}
              >
                Choose another way to pay
              </button>
            </div>
          )}

          {/* CHOOSE A WAY TO PAY */}
          {choosing && (
            <>
              <section aria-labelledby="upi-apps-heading">
                <h3
                  id="upi-apps-heading"
                  className="text-base font-semibold text-[#14213D]"
                >
                  Pay with a UPI app
                </h3>
                <p className="mt-0.5 text-sm text-[#6B665A]">
                  On a computer? Scan the QR code instead.
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {UPI_APPS.map((app) => {
                    const active = selectedApp === app.id;

                    return (
                      <button
                        key={app.id}
                        type="button"
                        aria-pressed={active}
                        disabled={expired}
                        onClick={() => setSelectedApp(app.id)}
                        className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${
                          active
                            ? "border-[#1E4F8F] bg-[#1E4F8F] text-white shadow-[0_8px_18px_-10px_rgba(30,79,143,0.9)]"
                            : "border-[#DDD3BE] bg-white text-[#2B2A26] hover:border-[#1E4F8F]/50"
                        }`}
                      >
                        {active && (
                          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#E8A317] text-[#14213D]">
                            <Check size={10} strokeWidth={3.5} />
                          </span>
                        )}

                        {/* Swap this tile for the official app logo (follow each brand's guidelines) */}
                        <span
                          className={`grid h-11 w-11 place-items-center rounded-xl text-base font-bold ${
                            active
                              ? "bg-white/15 text-white"
                              : "bg-[#1E4F8F]/10 text-[#1E4F8F]"
                          }`}
                        >
                          {app.short}
                        </span>

                        <span className="text-xs font-semibold leading-4">
                          {app.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!selectedApp || expired}
                  onClick={payWithApp}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E8A317] px-5 py-3.5 text-base font-semibold text-[#14213D] shadow-[0_10px_20px_-12px_rgba(232,163,23,0.9)] transition hover:bg-[#F2B53A] disabled:cursor-not-allowed disabled:bg-[#DDD3BE] disabled:text-white disabled:shadow-none ${focusRing}`}
                >
                  {selectedApp
                    ? `Pay ${rupees(amount)} with ${
                        UPI_APPS.find((app) => app.id === selectedApp)?.name
                      }`
                    : "Choose an app to continue"}
                </button>
              </section>

              {/* More ways to pay */}
              <section className="space-y-2.5">
                {/* QR */}
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#DDD3BE]">
                  <button
                    type="button"
                    aria-expanded={panel === "qr"}
                    disabled={expired}
                    onClick={() => setPanel(panel === "qr" ? null : "qr")}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left disabled:opacity-50 ${focusRing}`}
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-[#14213D]">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1E4F8F]/10 text-[#1E4F8F]">
                        <QrCode size={18} />
                      </span>
                      View QR code
                    </span>

                    <ChevronDown
                      size={18}
                      className={`text-[#6B665A] transition-transform ${
                        panel === "qr" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {panel === "qr" && !expired && (
                    <div className="border-t border-[#DDD3BE] px-4 pb-5 pt-4 text-center">
                      <div className="mx-auto inline-block rounded-2xl bg-white p-3 ring-1 ring-[#DDD3BE]">
                        <QRCodeSVG
                          value={genericUpiLink}
                          size={192}
                          level="M"
                          marginSize={1}
                          fgColor="#14213D"
                          bgColor="#FFFFFF"
                          title="UPI payment QR code"
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#14213D]">
                        Scan with any UPI app
                      </p>
                      <p className="mt-0.5 text-sm text-[#6B665A]">
                        Amount {rupees(amount)} is filled in for you.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus("waiting");
                          setMessage("");
                          void confirmPayment();
                        }}
                        className={`mt-4 w-full rounded-2xl border-2 border-[#1E4F8F] bg-white px-4 py-3 text-sm font-semibold text-[#1E4F8F] transition hover:bg-[#1E4F8F] hover:text-white ${focusRing}`}
                      >
                        I've scanned and paid
                      </button>
                    </div>
                  )}
                </div>

                {/* UPI ID */}
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#DDD3BE]">
                  <button
                    type="button"
                    aria-expanded={panel === "upiId"}
                    disabled={expired}
                    onClick={() => setPanel(panel === "upiId" ? null : "upiId")}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left disabled:opacity-50 ${focusRing}`}
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-[#14213D]">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1E4F8F]/10 text-[#1E4F8F]">
                        <AtSign size={18} />
                      </span>
                      Pay with UPI ID
                    </span>

                    <ChevronDown
                      size={18}
                      className={`text-[#6B665A] transition-transform ${
                        panel === "upiId" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {panel === "upiId" && !expired && (
                    <div className="border-t border-[#DDD3BE] px-4 pb-4 pt-4">
                      <label
                        htmlFor="upi-id"
                        className="text-sm font-semibold text-[#14213D]"
                      >
                        Your UPI ID
                      </label>

                      <input
                        id="upi-id"
                        type="text"
                        inputMode="email"
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="name@bank"
                        value={upiId}
                        onChange={(event) => {
                          setUpiId(event.target.value);
                          setMessage("");
                        }}
                        className="mt-2 w-full rounded-xl border border-[#DDD3BE] bg-[#F4EFE4]/60 px-3 py-3 text-base text-[#2B2A26] outline-none transition placeholder:text-[#6B665A] focus:border-[#1E4F8F] focus:ring-2 focus:ring-[#1E4F8F]/20"
                      />

                      {message && (
                        <p className="mt-2 text-sm text-[#B42318]" role="alert">
                          {message}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={payWithUpiId}
                        className={`mt-3 w-full rounded-2xl border-2 border-[#1E4F8F] bg-white px-4 py-3 text-sm font-semibold text-[#1E4F8F] transition hover:bg-[#1E4F8F] hover:text-white ${focusRing}`}
                      >
                        Send payment request
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          {/* Reassurance */}
          {status !== "success" && (
            <p className="flex items-start gap-2 px-1 text-xs leading-5 text-[#6B665A]">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#1E4F8F]" />
              You enter your UPI PIN only inside your UPI app. We never see or
              store it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}