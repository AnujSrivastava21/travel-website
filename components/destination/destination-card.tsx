import Image from "next/image";
import Link from "next/link";
import type { Destination } from "../../types/destination";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
     className="group relative block h-full min-h-[260px] overflow-hidden rounded-xl bg-white/[0.03]"
    >
      <Image
        src={destination.coverImage}
        alt={`${destination.name}, ${destination.state}, India`}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Cinematic black overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      {/* Extra cinematic shade */}
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {destination.state}
        </p>

        <h3 className="mt-1.5 text-xl font-medium tracking-tight text-white sm:text-2xl">
          {destination.name}
        </h3>
      </div>
    </Link>
  );
}