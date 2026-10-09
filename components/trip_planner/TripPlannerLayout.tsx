
"use client";

import { useState } from "react";
import { TrainFront, Bus, Plus, X } from "lucide-react";

import BudgetPopup from "../budget/budget-popup";
import type { Itinerary } from "../budget/budget-types";

export function TripPlannerLayout({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [showTrain, setShowTrain] = useState(false);
  const [showBus, setShowBus] = useState(false);

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {/* LEFT: Budget planner */}
      <section className="min-w-0 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/60">
              Your journey
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Trip budget
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Estimate your travel, stay and daily expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBudgetOpen(true)}
            className="shrink-0 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-amber-200"
          >
            Plan budget
          </button>
        </div>

        {!budgetOpen && (
          <div className="mt-6 flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center">
            <Plus size={22} className="text-white/30" />
            <p className="mt-3 text-sm text-white/60">
              Your budget planner will appear here.
            </p>
            <button
              type="button"
              onClick={() => setBudgetOpen(true)}
              className="mt-3 text-sm text-amber-300 transition hover:text-amber-200"
            >
              Open budget planner
            </button>
          </div>
        )}

        {budgetOpen && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">
                Budget calculator
              </p>
              <button
                type="button"
                onClick={() => setBudgetOpen(false)}
                aria-label="Close budget planner"
                className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <BudgetPopup
              itinerary={itinerary}
              open={budgetOpen}
              onClose={() => setBudgetOpen(false)}
            />
          </div>
        )}
      </section>

      {/* RIGHT: Optional transport components */}
      <section className="min-w-0 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/60">
          Travel options
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          Plan your transport
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/45">
          Select the options you want to add to your trip.
        </p>

        <div className="mt-6 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-amber-300/25">
            <input
              type="checkbox"
              checked={showTrain}
              onChange={(event) => setShowTrain(event.target.checked)}
              className="h-4 w-4 accent-amber-300"
            />
            <TrainFront size={19} className="text-amber-300" />
            <span className="flex-1 text-sm font-medium text-white">
              Train
            </span>
            <span className="text-xs text-white/35">
              {showTrain ? "Added" : "Add"}
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-amber-300/25">
            <input
              type="checkbox"
              checked={showBus}
              onChange={(event) => setShowBus(event.target.checked)}
              className="h-4 w-4 accent-amber-300"
            />
            <Bus size={19} className="text-amber-300" />
            <span className="flex-1 text-sm font-medium text-white">
              Bus
            </span>
            <span className="text-xs text-white/35">
              {showBus ? "Added" : "Add"}
            </span>
          </label>
        </div>

        {/* Selected transport components */}
        <div className="mt-5 space-y-4">
          {showTrain && <TrainComponent />}
          {showBus && <BusComponent />}
        </div>
      </section>
    </div>
  );
}

function TrainComponent() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-3">
        <TrainFront size={20} className="text-amber-300" />
        <h3 className="font-medium text-white">Train journey</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/45">
        Train search options will appear here.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs text-white/40">From station</p>
          <div className="rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
            Select departure station
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs text-white/40">To station</p>
          <div className="rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
            Select arrival station
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
        Journey date
      </div>
    </div>
  );
}

function BusComponent() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-3">
        <Bus size={20} className="text-amber-300" />
        <h3 className="font-medium text-white">Bus journey</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/45">
        Bus search options will appear here.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs text-white/40">From city</p>
          <div className="rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
            Select departure city
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs text-white/40">To city</p>
          <div className="rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
            Select arrival city
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 px-3 py-3 text-sm text-white/30">
        Journey date
      </div>
    </div>
  );
}
