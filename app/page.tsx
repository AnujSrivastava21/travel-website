
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Compass, Route, Wallet } from "lucide-react";
import { Suspense } from "react";

import { ItineraryPopup } from "../components/navigation/itinerary-popup";
import { headingFont, bodyFont } from "./font";
import { HomeSearchResults } from "../components/search/home-search-results";
import { itineraries } from "../data/itineraries/index";

/*
  Brand palette: The Local Route
  Forest green  #263D32  primary
  Deep green    #1D3027  dark sections
  Sand gold     #A16F35  accents and actions
  Warm ivory    #F8F6F0  page background
  White         #FFFEFA  cards and surfaces
  Sandstone     #EAE5D9  borders
  Stone         #303A32  headings and text
  Sage grey     #626A5D  muted text

  Fonts:
  Headings: Fraunces
  Body and UI: Figtree
*/

const EMAIL = "anujsrivastava.dev@gmail.com";

const CUSTOM_PLAN_LINK = `mailto:${EMAIL}?subject=Personalized%20Trip%20Planning`;
const COLLAB_LINK = `mailto:${EMAIL}?subject=Travel%20Content%20Collaboration`;

const featuredItineraries = itineraries.slice(0, 3);

const inside = [
  {
    icon: Route,
    title: "A day-by-day route",
    text: "What to see, in what order, and which stops are worth your time.",
  },
  {
    icon: Wallet,
    title: "A budget for your group",
    text: "Choose travellers, train or bus, and local transport to see what the trip costs.",
  },
  {
    icon: BedDouble,
    title: "Stays and meals",
    text: "Where to sleep each night and what to expect to spend on food.",
  },
  {
    icon: Compass,
    title: "Getting around",
    text: "How to arrive, move between places and get back home.",
  },
];

const steps = [
  {
    title: "Pick a trip",
    text: "Browse itineraries and choose one that fits your days and your style.",
  },
  {
    title: "See your budget",
    text: "Add your group size and transport. You get an estimate before you commit to anything.",
  },
  {
    title: "Follow the plan",
    text: "Use the day-by-day route to book, pack and go. No more dozens of open tabs.",
  },
];

const container = "mx-auto w-full max-w-6xl min-w-0 px-5 sm:px-8";
const sectionSpace = "py-14 sm:py-16 lg:py-20";

const h2 =
  "font-[var(--font-heading)] text-3xl font-semibold leading-[1.12] tracking-[-0.015em] sm:text-4xl";

const lead = "text-base leading-7 text-[#626A5D]";

const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6F0]";

export default function HomePage() {
  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen w-full min-w-0 overflow-x-clip bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      <ItineraryPopup />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] w-full min-w-0 max-w-full items-center justify-center overflow-hidden bg-[#1D3027]">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero_mains.jpg"
            alt="Golden sandstone fort rising above a desert town in Rajasthan"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[#1D3027]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D3027]/30 via-[#1D3027]/30 to-[#1D3027]/80" />

        <div className={`${container} relative z-10 py-20 text-center sm:py-24`}>
          <div className="mx-auto w-full max-w-3xl min-w-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#E5C18B] sm:text-sm">
              Your next journey starts here
            </p>

            <h1 className="break-words font-[var(--font-heading)] text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              Have a place in mind?
              <span className="mt-2 block text-[#E5C18B]">
                Let’s plan the journey.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Discover thoughtfully planned itineraries, explore new places,
              and make your next trip easier to plan and easier on your budget.
            </p>

            <div className="mt-9 flex justify-center">
              <Link
                href="/itineraries"
                className="group inline-flex max-w-full items-center justify-center gap-3 rounded-full border border-[#FFFEFA]/80 bg-[#F8F6F0] px-7 py-3.5 text-sm font-semibold text-[#263D32] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D3027] sm:px-8 sm:py-4 sm:text-base"
              >
                Plan your trip
                <ArrowRight
                  size={18}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE SEARCH RESULTS */}
      <Suspense fallback={null}>
        <HomeSearchResults />
      </Suspense>

      {/* FEATURED ITINERARIES */}
      <section className="w-full min-w-0">
        <div className={`${container} ${sectionSpace}`}>
          <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 max-w-lg">
              <h2 className={`${h2} text-[#263D32]`}>
                Pick a trip. Follow the plan.
              </h2>

              <p className={`mt-3 ${lead}`}>
                Every itinerary comes with the route, the stays and a budget
                you can adjust for your group.
              </p>
            </div>

            <Link
              href="/itineraries"
              className={`group inline-flex w-fit max-w-full shrink-0 items-center gap-2 rounded-full text-base font-semibold text-[#263D32] ${focusLight}`}
            >
              View all itineraries
              <ArrowRight
                size={18}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItineraries.map((itinerary) => (
              <Link
                key={itinerary.id}
                href={`/itineraries/${itinerary.slug}`}
                className={`group block min-w-0 overflow-hidden rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] transition duration-300 hover:-translate-y-1 hover:shadow-lg ${focusLight}`}
              >
                {/* Cover image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E4EADF]">
                  <Image
                    src={itinerary.coverImage}
                    alt={itinerary.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    {itinerary.duration}N / {itinerary.duration + 1}D
                  </span>
                </div>

                {/* Itinerary details */}
                <div className="min-w-0 p-5">
                  <p className="break-words text-xs font-semibold uppercase tracking-[0.16em] text-[#A16F35]">
                    {itinerary.destination}
                  </p>

                  <h3 className="mt-2 break-words font-[var(--font-heading)] text-xl font-semibold leading-snug text-[#263D32] transition-colors group-hover:text-[#A16F35]">
                    {itinerary.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-[#626A5D]">
                    {itinerary.description}
                  </p>

                  <div className="mt-5 flex min-w-0 items-center justify-between gap-3 border-t border-[#EAE5D9] pt-4">
                    <span className="text-sm font-medium text-[#626A5D]">
                      View itinerary
                    </span>

                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E4EADF] text-[#263D32] transition-colors group-hover:bg-[#263D32] group-hover:text-white">
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="w-full min-w-0 bg-[#FFFEFA]">
        <div className={`${container} ${sectionSpace}`}>
          <div className="max-w-lg">
            <h2 className={`${h2} text-[#263D32]`}>
              Everything you need to book with confidence.
            </h2>

            <p className={`mt-3 ${lead}`}>
              Each itinerary answers the questions that normally cost you hours
              of searching.
            </p>
          </div>

          <div className="mt-10 grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {inside.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="min-w-0">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E4EADF] text-[#263D32]">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>

                  <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-[#263D32]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[#626A5D]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full min-w-0 overflow-hidden bg-[#263D32] text-white">
        <div className={`${container} ${sectionSpace}`}>
          <h2 className={`${h2} max-w-md`}>
            From idea to itinerary in three steps.
          </h2>

          <ol className="mt-10 grid min-w-0 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="min-w-0 border-t border-white/20 pt-5"
              >
                <span className="font-[var(--font-heading)] text-4xl font-semibold text-[#D4AC73]">
                  {index + 1}
                </span>

                <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-1.5 max-w-xs text-base leading-7 text-white/80">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <Link
            href="/itineraries"
            className="group mt-10 inline-flex max-w-full items-center gap-2 rounded-full bg-[#A16F35] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#8E5E2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32]"
          >
            Start with an itinerary
            <ArrowRight
              size={18}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* CUSTOM PLAN + CONTACT */}
      <section className="w-full min-w-0">
        <div className={`${container} ${sectionSpace}`}>
          <div className="relative min-w-0 overflow-hidden rounded-3xl bg-[#334B3D] p-7 text-white sm:p-10">
            {/* Jharokha arch motif */}
            <svg
              aria-hidden="true"
              viewBox="0 0 150 60"
              className="pointer-events-none absolute -bottom-1 right-0 h-28 w-auto max-w-full text-white/10 sm:h-36"
              fill="currentColor"
            >
              <path d="M0 60V30a15 15 0 0 1 30 0v30Z" />
              <path d="M40 60V22a17 17 0 0 1 34 0v38Z" />
              <path d="M84 60V30a15 15 0 0 1 30 0v30Z" />
              <path d="M122 60V36a14 14 0 0 1 28 0v24Z" />
            </svg>

            <div className="relative min-w-0 max-w-xl">
              <h2 className={h2}>
                Can&apos;t find your trip? I&apos;ll plan it with you.
              </h2>

              <p className="mt-3 text-base leading-7 text-white/90">
                Tell me where you want to go, when, and what you can spend.
                I&apos;ll put together a route and a budget that fits.
              </p>

              <div className="mt-6 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={CUSTOM_PLAN_LINK}
                  className="group inline-flex max-w-full items-center gap-2 rounded-full bg-[#A16F35] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#8E5E2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#334B3D]"
                >
                  Get a custom plan
                  <ArrowRight
                    size={18}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href={COLLAB_LINK}
                  className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Travel content and collaborations
                </Link>
              </div>
            </div>
          </div>

          {/* Personal note */}
          <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base leading-7 text-[#626A5D]">
              I travel to experience places, meet people and find the roads
              less travelled, and I share what I learn so you can travel better.
            </p>

            <Link
              href="/journey"
              className={`group inline-flex w-fit max-w-full shrink-0 items-center gap-2 rounded-full text-base font-semibold text-[#263D32] ${focusLight}`}
            >
              My journey
              <ArrowRight
                size={16}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
