import type { Metadata } from "next";

import { travelPosts } from "../../../data/travel-posts";
import { TravelCard } from "../../../components/travel/travel-card";

export const metadata: Metadata = {
  title: "Travel Stories",
  description:
    "Solo travel stories, experiences and journeys from across India.",
};

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-black pt-32">

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            From the road
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
            Travel Stories
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Stories, experiences and lessons from travelling across India.
          </p>

        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">

          {travelPosts.map((post) => (
            <TravelCard key={post.id} post={post} />
          ))}

        </div>

      </section>

    </div>
  );
}