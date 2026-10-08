import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { destinations } from "../data/destinations";
import { travelPosts } from "../data/travel-posts";
import { DestinationCard } from "../components/destination/destination-card";
import { TravelCard } from "../components/travel/travel-card";
import { ItineraryPopup } from "../components/navigation/itinerary-popup";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <ItineraryPopup />
      {/* HERO */}
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/home.jpg"
            alt="Kee Monastery, Spiti Valley"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Black Shade — 50% */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-end px-6 pb-12 pt-32 lg:px-8 lg:pb-16">
          <div className="w-full max-w-5xl">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-white/75">
              <span className="h-px w-8 bg-white/60"  />
              41 destinations · India
            </div>

            {/* Heading */}
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl lg:text-[7.5rem]">
              <span className="block whitespace-nowrap">
                I Travel Slowly
                
              </span>

              <span className="block whitespace-nowrap">
                So You Can Travel Better
                
                  Better.
                
              </span>
            </h1>

            {/* Story */}
            <div className="mt-8 max-w-2xl">
              <p className="text-base leading-7 text-white/95 sm:text-lg sm:leading-8">
                Buses through the mountains. Rides with strangers. Small
                villages, long roads and moments I never planned for.
              </p>

              <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                These are the places I&apos;ve explored — and the journeys
                I&apos;ve turned into real stories, practical routes and
                itineraries.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
              >
                Explore my journeys
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/itineraries"
                className="text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
              >
                Plan your trip →
              </Link>
            </div>

            {/* Bottom */}
            {/* <div className="mt-14 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-white/55">
              <span className="h-10 w-px bg-white/45" />

              <span>Real journeys · Real places · Your next story</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:700px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          {/* Left */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
              Why I travel
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Some journeys stay
              <span className="block text-white/40">with you forever.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              I didn&apos;t start travelling just to collect destinations. I
              wanted to know what it feels like to actually be there.
            </p>

            <p className="mt-6 text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
              Sleeping in unfamiliar places. Taking a bus into the mountains.
              Hitchhiking when there was no other way. Meeting people I had
              never known before and finding beautiful places I never expected.
            </p>

            <p className="mt-6 text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
              Somewhere along the way, travelling became more than reaching a
              destination. It became about the road, the people, the unexpected
              moments and the memories I bring back with me.
            </p>

            <Link
              href="/journey"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              Follow my journey
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="border-y border-white/10 bg-white/[0.02] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
              Explore
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Places that stayed with me.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
              A collection of places, moments and journeys from across India.
            </p>
          </div>

          {/* DESTINATION BENTO */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4">
            {/* Kee — 1 column × 1 row */}
            <div className="lg:col-span-2 lg:row-span-2">
              <DestinationCard destination={destinations[2]} />
            </div>
            {/* Hikkim — 2 columns × 2 rows */}
            <div className="lg:col-span-1 lg:row-span-2">
              <DestinationCard destination={destinations[0]} />
            </div>

            {/* Langza — 1 column × 1 row */}
            <div className="lg:col-span-1 lg:row-span-1">
              <DestinationCard destination={destinations[1]} />
            </div>

            {/* Chandratal — 1 column × 2 rows */}
            <div className="lg:col-span-1 lg:row-span-2">
              <DestinationCard destination={destinations[3]} />
            </div>

            {/* Manali — 1 column × 1 row */}
            <div className="lg:col-span-1 lg:row-span-2">
              <DestinationCard destination={destinations[4]} />
            </div>

            {/* Kalpa — 1 column × 2 rows */}
            <div className="lg:col-span-1 lg:row-span-2">
              <DestinationCard destination={destinations[5]} />
            </div>

            {/* Shimla — 1 column × 1 row */}
            <div className="lg:col-span-1 lg:row-span-1">
              <DestinationCard destination={destinations[6]} />
            </div>

            {/* Manali — 2 columns × 1 row */}
            <div className="lg:col-span-2 lg:row-span-2">
              <DestinationCard destination={destinations[7]} />
            </div>
          </div>

          {/* More Destinations */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              More Destinations
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:900px]">
        {/* Section Heading */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            Travel stories
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            From the road
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
            Stories, places and moments from journeys across India.
          </p>
        </div>

        {/* Travel Cards */}
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {travelPosts.slice(0, 6).map((post) => (
            <TravelCard key={post.id} post={post} />
          ))}
        </div>

        {/* More Travel Stories */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/stories"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            More Travel Stories
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* ITINERARY CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#080808]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-amber-500/[0.06] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
          {/* Main */}
          <div className="relative grid gap-16 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            {/* Large background number */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-20 select-none text-[16rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[20rem] lg:-top-28 lg:text-[25rem]"
            >
              01
            </div>

            {/* Left */}
            <div className="relative max-w-4xl">
              <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-[6.5rem]">
                The journey
                <span className="block text-white/35">starts before</span>
                you leave.
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-8 text-white/55 sm:text-lg sm:leading-9">
                I&apos;ve spent days figuring out which road to take, where to
                stop, what is actually worth seeing and what can be skipped.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/35 sm:text-lg sm:leading-9">
                Now I&apos;m putting those journeys together — real routes,
                places worth stopping for, stays, budgets and the little details
                that can make a trip feel effortless.
              </p>
            </div>

            {/* Right */}
            <div className="relative lg:pb-2">
              {/* Route detail */}
              <div className="mb-8 border-l border-amber-300/30 pl-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Built from experience
                </p>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  No copy-paste routes.
                  <br />
                  No unnecessary stops.
                  <br />
                  Just the journey, mapped properly.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/itineraries"
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-5 transition-all duration-500 hover:border-amber-200/40 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(245,158,11,0.10)]"
              >
                {/* Hover light */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  <span className="block text-xs uppercase tracking-[0.18em] text-white/35">
                    Explore
                  </span>

                  <span className="mt-1 block text-lg font-medium text-white">
                    My travel itineraries
                  </span>
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] transition-all duration-300 group-hover:border-amber-300/40 group-hover:bg-amber-300 group-hover:text-black">
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <p className="mt-5 text-[11px] leading-5 text-white/25">
                Routes · Stays · Budgets · Experiences
              </p>
            </div>
          </div>

          {/* Bottom statement */}
          <div className="mt-20">
            <p className="max-w-3xl text-sm leading-7 text-white/25 sm:text-base">
              Because a good itinerary isn&apos;t about fitting more places into
              one trip. It&apos;s about knowing which places are worth your
              time.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT I CAN OFFER */}
      {/* WHAT I CAN OFFER */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          {/* Section Heading */}
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
              Make your trip count
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              You bring the destination.
              <span className="block text-white/40">
                I&apos;ll help with everything in between.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              You shouldn&apos;t have to spend your trip figuring out what to do
              next. I can help you build the route, discover the places most
              travellers miss, and turn your journey into something worth
              remembering.
            </p>
          </div>

          {/* OFFER CARDS */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {/* CARD 01 */}
            <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-transparent p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(255,255,255,0.08)]">
              {/* Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl transition duration-500 group-hover:bg-white/[0.12]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                    01
                  </span>

                  <span className="text-xs text-white/30">Route</span>
                </div>

                <h3 className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-white">
                  Know where
                  <span className="block text-white/45">
                    you&apos;re going.
                  </span>
                </h3>

                <p className="mt-6 text-sm leading-7 text-white/55">
                  I&apos;ll create a route that makes sense for your trip —
                  helping you cover the important places, nearby gems and local
                  experiences without wasting time going back and forth.
                </p>

                <div className="mt-8 space-y-3 text-sm text-white/65">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Smart route planning
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Local & nearby places
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Practical travel flow
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 02 */}
            <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-transparent p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(255,255,255,0.08)]">
              {/* Glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl transition duration-500 group-hover:bg-white/[0.12]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                    02
                  </span>

                  <span className="text-xs text-white/30">1:1</span>
                </div>

                <h3 className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-white">
                  Don&apos;t just plan it.
                  <span className="block text-white/45">Talk it through.</span>
                </h3>

                <p className="mt-6 text-sm leading-7 text-white/55">
                  Got a destination in mind but too many questions? Let&apos;s
                  have a 1:1 call and build your journey together — from route
                  and timing to the places worth your time.
                </p>

                <div className="mt-8 space-y-3 text-sm text-white/65">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Personal trip discussion
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Route & destination advice
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    One-on-one guidance
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 03 */}
            <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-transparent p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(255,255,255,0.08)]">
              {/* Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl transition duration-500 group-hover:bg-white/[0.12]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                    03
                  </span>

                  <span className="text-xs text-white/30">Create</span>
                </div>

                <h3 className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-white">
                  Your place.
                  <span className="block text-white/45">Your story.</span>
                </h3>

                <p className="mt-6 text-sm leading-7 text-white/55">
                  Have a beautiful place, stay or experience you want people to
                  remember? I can create a cinematic reel around it and tell its
                  story through my travel style.
                </p>

                <div className="mt-8 space-y-3 text-sm text-white/65">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Cinematic travel reels
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Destination storytelling
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    Travel-focused content
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT CTA */}
          {/* CONTACT CTA */}
          <div className="group relative mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent transition-all duration-500 hover:border-amber-200/30 hover:bg-white/[0.07] hover:shadow-[0_20px_80px_rgba(245,158,11,0.08)]">
            {/* Hover light */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/[0.05] blur-3xl transition duration-500 group-hover:bg-amber-400/[0.10]" />

            <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-300/55">
                  Have something in mind?
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Let&apos;s turn an idea
                  <span className="text-white/40"> into a journey.</span>
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                  Tell me where you&apos;re going, what you&apos;re planning, or
                  what you want to create. We&apos;ll take it from there.
                </p>
              </div>

              {/* Email CTA */}
              <a
                href="mailto:anujsrivastava.dev@gmail.com?subject=Travel%20Planning%20%2F%20Collaboration"
                className="group/email relative inline-flex shrink-0 items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-5 transition-all duration-500 hover:border-amber-200/40 hover:bg-white/[0.08]"
              >
                {/* Button hover sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover/email:translate-x-full" />

                <span className="relative">
                  <span className="block text-xs uppercase tracking-[0.18em] text-white/35">
                    Let&apos;s talk
                  </span>

                  <span className="mt-1 block text-lg font-medium text-white">
                    Email me
                  </span>
                </span>

                {/* Arrow */}
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-all duration-300 group-hover/email:border-amber-300/40 group-hover/email:bg-amber-300 group-hover/email:text-black">
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/email:translate-x-1"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
