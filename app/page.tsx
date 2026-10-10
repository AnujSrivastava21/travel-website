
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Compass,
  Route,
  Wallet,
} from "lucide-react";

import { ItineraryPopup } from "../components/navigation/itinerary-popup";
import { headingFont, bodyFont } from "./font";

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

const featuredItineraries = [
  {
    title: "Delhi, Bikaner, Jaisalmer and Jodhpur",
    nights: 6,
    stops: "Delhi · Bikaner · Jaisalmer · Jodhpur",
    image: "/images/home/hero.jpg",
    href: "/itineraries",
  },
  {
    title: "Replace with your second itinerary",
    nights: 5,
    stops: "Stop one · Stop two · Stop three",
    image: "/images/home/hero.jpg",
    href: "/itineraries",
  },
  {
    title: "Replace with your third itinerary",
    nights: 4,
    stops: "Stop one · Stop two · Stop three",
    image: "/images/home/hero.jpg",
    href: "/itineraries",
  },
];

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

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const sectionSpace = "py-14 sm:py-16 lg:py-20";

const h2 =
  "font-[var(--font-heading)] text-3xl font-semibold leading-[1.12] tracking-[-0.015em] sm:text-4xl";

const lead = "text-base leading-7 text-[#626A5D]";

const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6F0]";

export default function HomePage() {
  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      <ItineraryPopup />

      {/* HERO */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#1D3027] sm:min-h-[82svh]">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero.jpg"
            alt="Golden sandstone fort rising above a desert town in Rajasthan"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3027]/75 via-[#1D3027]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3027]/70 via-transparent to-[#1D3027]/20" />

        <div className={`${container} relative z-10 pb-14 pt-28 lg:pb-20`}>
          <div className="max-w-2xl">
            <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Know the route. Know the cost. Just go.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              Day-by-day itineraries across India, with stays, transport and
              a budget for your group, so planning takes an evening, not
              weeks of open tabs.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/itineraries"
                className="group inline-flex items-center gap-2 rounded-full bg-[#A16F35] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(161,111,53,0.65)] transition hover:bg-[#8E5E2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D3027]"
              >
                Browse itineraries
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={CUSTOM_PLAN_LINK}
                className="inline-flex items-center rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D3027]"
              >
                Get a custom plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ITINERARIES */}
      <section>
        <div className={`${container} ${sectionSpace}`}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="max-w-lg">
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
              className={`group inline-flex shrink-0 items-center gap-2 rounded-full text-base font-semibold text-[#263D32] ${focusLight}`}
            >
              View all itineraries
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredItineraries.map((trip) => (
              <Link
                key={trip.title}
                href={trip.href}
                className={`group flex flex-col overflow-hidden rounded-3xl bg-[#FFFEFA] shadow-[0_14px_28px_-18px_rgba(38,61,50,0.25)] ring-1 ring-[#EAE5D9] transition hover:ring-[#A16F35] ${focusLight}`}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={trip.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-[#FFFEFA]/95 px-3 py-1 text-xs font-semibold text-[#263D32]">
                    {trip.nights} nights
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold leading-snug tracking-[-0.01em] text-[#263D32]">
                    {trip.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-[#626A5D]">
                    {trip.stops}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#8E5E2D]">
                    See itinerary and budget
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-[#FFFEFA]">
        <div className={`${container} ${sectionSpace}`}>
          <div className="max-w-lg">
            <h2 className={`${h2} text-[#263D32]`}>
              Everything you need to book with confidence.
            </h2>

            <p className={`mt-3 ${lead}`}>
              Each itinerary answers the questions that normally cost you
              hours of searching.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {inside.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title}>
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
      <section className="bg-[#263D32] text-white">
        <div className={`${container} ${sectionSpace}`}>
          <h2 className={`${h2} max-w-md`}>
            From idea to itinerary in three steps.
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-white/20 pt-5"
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
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#A16F35] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#8E5E2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32]"
          >
            Start with an itinerary
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* CUSTOM PLAN + CONTACT */}
      <section>
        <div className={`${container} ${sectionSpace}`}>
          <div className="relative overflow-hidden rounded-3xl bg-[#334B3D] p-7 text-white sm:p-10">
            {/* Jharokha arch motif */}
            <svg
              aria-hidden="true"
              viewBox="0 0 150 60"
              className="pointer-events-none absolute -bottom-1 right-0 h-28 w-auto text-white/10 sm:h-36"
              fill="currentColor"
            >
              <path d="M0 60V30a15 15 0 0 1 30 0v30Z" />
              <path d="M40 60V22a17 17 0 0 1 34 0v38Z" />
              <path d="M84 60V30a15 15 0 0 1 30 0v30Z" />
              <path d="M122 60V36a14 14 0 0 1 28 0v24Z" />
            </svg>

            <div className="relative max-w-xl">
              <h2 className={h2}>
                Can&apos;t find your trip? I&apos;ll plan it with you.
              </h2>

              <p className="mt-3 text-base leading-7 text-white/90">
                Tell me where you want to go, when, and what you can spend.
                I&apos;ll put together a route and a budget that fits.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={CUSTOM_PLAN_LINK}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#A16F35] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#8E5E2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#334B3D]"
                >
                  Get a custom plan
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base leading-7 text-[#626A5D]">
              I travel to experience places, meet people and find the roads
              less travelled, and I share what I learn so you can travel
              better.
            </p>

            <Link
              href="/journey"
              className={`group inline-flex shrink-0 items-center gap-2 rounded-full text-base font-semibold text-[#263D32] ${focusLight}`}
            >
              My journey
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
