
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

import type { Itinerary } from "../../types/itinerary";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const isPremium = Boolean(itinerary.isPremium);

  return (
    <article className="group">
      <Link
        href={`/itineraries/${itinerary.slug}`}
        className="block"
        aria-label={`View ${itinerary.title} itinerary`}
      >
        <CardContent itinerary={itinerary} />
      </Link>
    </article>
  );
}

function CardContent({ itinerary }: { itinerary: Itinerary }) {
  const isPremium = Boolean(itinerary.isPremium);

  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#EAE5D9]">
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition duration-500 ${
            isPremium
              ? "scale-105 blur-[1px] brightness-90"
              : "group-hover:scale-105"
          }`}
        />

        {isPremium && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/70 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300 backdrop-blur-md">
            <Sparkles size={13} />
            Premium
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-medium leading-snug text-[#263D32] transition group-hover:text-[#A16F35]">
            {itinerary.title}
          </h2>

          <ArrowRight
            size={18}
            className="mt-1 shrink-0 text-[#8B8171] transition group-hover:translate-x-1 group-hover:text-[#A16F35]"
          />
        </div>

        <p className="mt-3 text-sm leading-6 text-[#626A5D]">
          {itinerary.description}
        </p>

        {isPremium && (
          <div className="mt-4 flex items-center gap-2 text-sm text-[#A16F35]">
            <Lock size={14} />
            Premium itinerary
          </div>
        )}
      </div>
    </>
  );
}
