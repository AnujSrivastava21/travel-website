"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

import type { Itinerary } from "../../types/itinerary";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const { data: session } = useSession();

  const isPremium = itinerary.isPremium;

  const href =
    isPremium && !session
      ? `/login?callbackUrl=/itineraries/${itinerary.slug}`
      : `/itineraries/${itinerary.slug}`;

  return (
    <article className="group">
      <Link href={href} className="block">
        {/* IMAGE */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5">
          <Image
            src={itinerary.coverImage}
            alt={itinerary.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              isPremium && !session ? "brightness-75" : ""
            }`}
          />

          {/* PREMIUM BADGE */}
          {isPremium && (
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/70 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <Sparkles size={13} />
              Premium
            </div>
          )}

          {/* LOCK ICON */}
          {isPremium && !session && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/30 bg-black/70 backdrop-blur-md">
                <Lock size={18} className="text-amber-300" />
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-medium leading-snug text-white transition group-hover:text-white/70">
              {itinerary.title}
            </h2>

            <ArrowRight
              size={18}
              className="mt-1 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-white"
            />
          </div>

          <p className="mt-3 text-sm leading-6 text-white/50">
            {itinerary.description}
          </p>

          {/* LOGIN MESSAGE */}
          {isPremium && !session && (
            <div className="mt-4 flex items-center gap-2 text-sm text-amber-300">
              <Lock size={14} />
              Login to view this itinerary
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}