
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Map, Wallet, Route, Compass } from "lucide-react";

import { ItineraryPopup } from "../components/navigation/itinerary-popup";

const features = [
  {
    number: "01",
    icon: Route,
    title: "Routes that make sense",
    description:
      "Know where to go, what to visit first, how to travel between places, and which stops are actually worth your time.",
    detail: "Day-by-day travel routes",
  },
  {
    number: "02",
    icon: Wallet,
    title: "A budget you can plan around",
    description:
      "Understand the expected costs of transport, stays, food and activities before you start your journey.",
    detail: "Practical budget breakdowns",
  },
  {
    number: "03",
    icon: Map,
    title: "The details that save time",
    description:
      "Plan your travel days with useful stops, local experiences and overnight stays instead of figuring everything out on the go.",
    detail: "Stays, transport and experiences",
  },
];

const services = [
  {
    number: "01",
    label: "Ready-made plans",
    title: "Find a trip. Follow the plan.",
    description:
      "Explore detailed itineraries with routes, daily activities, stays and estimated budgets. Find a trip that fits your time and travel style.",
    points: [
      "Day-by-day itineraries",
      "Routes and transport guidance",
      "Budget and stay suggestions",
    ],
    href: "/itineraries",
    action: "Browse itineraries",
  },
  {
    number: "02",
    label: "Personalized planning",
    title: "Your trip, your way.",
    description:
      "Have a destination in mind but don't know where to start? Get help putting together a practical journey around your budget, dates and preferences.",
    points: [
      "Personalized route planning",
      "Budget-conscious suggestions",
      "One-on-one trip guidance",
    ],
    href: "mailto:anujsrivastava.dev@gmail.com?subject=Personalized%20Trip%20Planning",
    action: "Plan my trip",
  },
  {
    number: "03",
    label: "Content creation",
    title: "Make your destination stand out.",
    description:
      "I create cinematic travel reels and destination stories for stays, local experiences and places worth discovering.",
    points: [
      "Cinematic travel reels",
      "Destination storytelling",
      "Travel-focused content",
    ],
    href: "mailto:anujsrivastava.dev@gmail.com?subject=Travel%20Content%20Collaboration",
    action: "Discuss a collaboration",
  },
];

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <ItineraryPopup />

      {/* HERO */}
      <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-black sm:min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero.jpg"
            alt="A scenic travel destination in India"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-32 lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 sm:text-xs">
              <span className="h-px w-7 bg-amber-300" />
              Your next trip starts here
            </div>

            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
  Pick a destination.
  <span className="block text-white/60">
    I’ll figure out the route.
  </span>
</h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              You choose the destination. I&apos;ll help you figure out the
              route, stays, budget and everything in between with practical
              travel itineraries.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/itineraries"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Explore itineraries
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="mailto:anujsrivastava.dev@gmail.com?subject=Personalized%20Trip%20Planning"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Plan my trip
                <ArrowRight size={16} />
              </Link>
            </div>

            <Link
              href="/itineraries"
              className="mt-10 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white sm:text-xs"
            >
              Find your next journey
              <ArrowDown size={14} className="animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300/70">
                Travel planning, simplified
              </p>

              <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                A trip plan that
                <span className="block text-white/45">
                  actually makes sense.
                </span>
              </h2>
            </div>

            <div className="max-w-xl">
              <p className="text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                Planning a trip shouldn&apos;t mean spending hours searching
                through dozens of tabs, comparing routes and wondering how much
                everything will cost.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
                Find useful travel plans in one place, understand your options
                before you leave, and spend more of your time experiencing the
                destination instead of figuring out what to do next.
              </p>
            </div>
          </div>

          {/* PRACTICAL BENEFITS */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:border-amber-200/25 hover:bg-white/[0.045] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-200/80">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>

                    <span className="text-xs tracking-widest text-white/25">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-medium text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/40">
                    <Check size={14} className="text-amber-200/70" />
                    {feature.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Simple by design
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                From idea to itinerary.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
                No complicated planning process. Just a clearer way to prepare
                for your next adventure.
              </p>
            </div>

            <Link
              href="/itineraries"
              className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
            >
              See available plans
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {[
              {
                number: "01",
                title: "Choose your destination",
                text: "Find a trip that matches your interests, available days and budget.",
              },
              {
                number: "02",
                title: "Explore the plan",
                text: "Check the route, daily schedule, suggested stays and estimated expenses.",
              },
              {
                number: "03",
                title: "Make it happen",
                text: "Use the itinerary to prepare your journey, or get in touch for personalized planning.",
              },
            ].map((step) => (
              <div key={step.number} className="border-t border-white/15 pt-5">
                <span className="text-xs font-medium tracking-widest text-amber-200/70">
                  STEP {step.number}
                </span>

                <h3 className="mt-5 text-lg font-medium text-white">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY CTA */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#080808]">
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-amber-500/[0.06] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/60">
                Your journey, better planned
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                The journey starts
                <span className="block text-white/40">
                  before you leave.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                Find practical routes, useful stops, stay suggestions and
                budget guidance in one place. Spend less time wondering about
                the plan and more time looking forward to the journey.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/40">
                <span>Routes</span>
                <span className="text-white/20">/</span>
                <span>Stays</span>
                <span className="text-white/20">/</span>
                <span>Budgets</span>
                <span className="text-white/20">/</span>
                <span>Experiences</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Ready for your next trip?
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Let&apos;s find your route.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Explore the available itineraries and find a plan for your next
                adventure.
              </p>

              <Link
                href="/itineraries"
                className="group mt-7 flex items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-amber-100"
              >
                Browse travel itineraries
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="mailto:anujsrivastava.dev@gmail.com?subject=Personalized%20Trip%20Planning"
                className="mt-4 flex items-center justify-center gap-2 text-sm text-white/55 transition hover:text-white"
              >
                Need a personalized plan?
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I OFFER */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              More ways to travel better
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              One destination.
              <span className="block text-white/40">
                Three ways I can help.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
              Whether you need a ready-made route, a plan designed around your
              needs, or creative content for your travel business, start here.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.number}
                className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest text-white/35">
                    {service.number}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {service.label}
                  </span>
                </div>

                <h3 className="mt-9 text-2xl font-semibold leading-snug tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/50">
                  {service.description}
                </p>

                <div className="mt-7 space-y-3">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/65"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-amber-200/70"
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-amber-200"
                  >
                    {service.action}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CONTACT CTA */}
          <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-200/60">
                Have something in mind?
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Tell me what you&apos;re planning.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Share your destination, trip idea or collaboration request.
                Let&apos;s figure out the next step together.
              </p>
            </div>

            <a
              href="mailto:anujsrivastava.dev@gmail.com?subject=Travel%20Planning%20%2F%20Collaboration"
              className="group inline-flex shrink-0 items-center justify-between gap-8 rounded-xl border border-white/15 px-5 py-4 transition hover:border-amber-200/40 hover:bg-white/[0.04]"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Get in touch
                </span>
                <span className="mt-1 block text-sm font-medium">
                  Email me
                </span>
              </span>

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* PERSONAL NOTE — KEEP JUST ABOVE THE SITE FOOTER */}
      <section className="bg-black px-6 py-7 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/40 sm:text-sm">
            I travel to experience places, meet people and discover the roads
            less travelled — and I share what I learn to help you travel better.
          </p>

          <Link
            href="/journey"
            className="inline-flex shrink-0 items-center gap-2 text-xs text-white/55 transition hover:text-white"
          >
            My journey
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
