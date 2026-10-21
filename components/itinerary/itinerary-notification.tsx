
"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export function ItineraryNotification() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting || !email.trim()) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (!response.ok || !data.success) {
        setMessage(
          data.message ?? "Subscription failed. Please try again."
        );
        return;
      }

      setSubmitted(true);
      setMessage(
        data.message ?? "You have subscribed successfully!"
      );
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage(
        "Unable to connect right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setEmail("");
    setMessage("");
  }

  return (
    <section className="mt-16 overflow-hidden rounded-3xl border border-[#E5DFD1] bg-[#EFEBDD]">
      <div className="grid gap-8 px-6 py-9 sm:px-10 sm:py-12 md:grid-cols-[1.3fr_1fr] md:items-center lg:px-14">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8D0BE] bg-[#F8F6F0] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[#626A5D]">
            <Mail size={14} />
            The Local Route Newsletter
          </div>

          <h2 className="max-w-lg font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl">
            Get notified when we publish more routes like this.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#626A5D] sm:text-base">
            New itineraries, quieter places, local experiences, and travel
            inspiration—delivered to your inbox.
          </p>
        </div>

        <div>
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl border border-[#D8D0BE] bg-[#F8F6F0] p-6"
            >
              <CheckCircle2
                size={28}
                className="mb-3 text-[#476B50]"
              />

              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[#263D32]">
                Thanks for subscribing!
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#626A5D]">
                {message}
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="mt-4 text-sm font-medium text-[#8B642F] underline underline-offset-4"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label
                htmlFor="itinerary-notification-email"
                className="block text-sm font-medium text-[#303A32]"
              >
                Your email address
              </label>

              <input
                id="itinerary-notification-email"
                type="email"
                autoComplete="email"
                required
                maxLength={255}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                placeholder="you@example.com"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-[#D8D0BE] bg-[#F8F6F0] px-4 py-3.5 text-sm text-[#303A32] outline-none transition placeholder:text-[#969184] focus:border-[#8B642F] focus:ring-2 focus:ring-[#8B642F]/15 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#263D32] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#354F42] focus:outline-none focus:ring-2 focus:ring-[#263D32]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Subscribing..." : "Notify me"}

                {!isSubmitting && <ArrowRight size={16} />}
              </button>

              {message && (
                <p
                  role="alert"
                  className="text-sm leading-6 text-red-700"
                >
                  {message}
                </p>
              )}

              <p className="pt-1 text-xs leading-5 text-[#77796C]">
                Only travel inspiration and new routes. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
