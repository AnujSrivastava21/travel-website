
"use client";

import { BusFront, TrainFront } from "lucide-react";

export type TransportType = "train" | "bus";

interface TransportSelectorProps {
  selected: TransportType[];
  onChange: (transport: TransportType[]) => void;
}

export function TransportSelector({
  selected,
  onChange,
}: TransportSelectorProps) {
  const toggleTransport = (type: TransportType) => {
    onChange(
      selected.includes(type)
        ? selected.filter((item) => item !== type)
        : [...selected, type]
    );
  };

  const options = [
    {
      id: "train" as const,
      title: "Train",
      description: "Explore train travel options",
      icon: TrainFront,
    },
    {
      id: "bus" as const,
      title: "Bus",
      description: "Explore bus travel options",
      icon: BusFront,
    },
  ];

  return (
    <section className="h-fit rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 text-white">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-amber-300/70">
        Travel options
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        How would you like to travel?
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/45">
        Choose the transport options you want to explore.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((option) => {
          const Icon = option.icon;
          const checked = selected.includes(option.id);

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                checked
                  ? "border-amber-300/40 bg-amber-300/[0.07]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon
                  size={21}
                  className={checked ? "text-amber-300" : "text-white/60"}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{option.title}</p>
                <p className="mt-1 text-xs text-white/40">
                  {option.description}
                </p>
              </div>

              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleTransport(option.id)}
                className="h-4 w-4 accent-amber-300"
                aria-label={`Select ${option.title}`}
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}
