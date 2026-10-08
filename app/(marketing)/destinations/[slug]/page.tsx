
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { destinations } from "../../../../data/destinations";
import { Breadcrumbs } from "../../../../components/navigation/breadcrumbs";

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    return {};
  }

  return {
    title: `${destination.name} Travel Guide`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black">
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src={destination.coverImage}
          alt={`${destination.name}, ${destination.state}, ${destination.country}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Hero content */}
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
          {/* BREADCRUMB */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                {
                  label: "Destinations",
                  href: "/destinations",
                },
                {
                  label: destination.name,
                },
              ]}
            />
          </div>

          {/* LOCATION */}
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            {destination.state}, {destination.country}
          </p>

          {/* TITLE */}
          <h1 className="mt-5 text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            {destination.name}
          </h1>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <p className="text-xl leading-9 text-white/70">
          {destination.description}
        </p>

        {/* TRAVEL STATUS */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Travel Status
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {destination.visited && (
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
                ✓ Visited
              </span>
            )}

            {destination.planned && (
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
                Planned
              </span>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}

