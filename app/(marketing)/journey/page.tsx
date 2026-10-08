import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "My Travel Journey",
  description:
    "The story behind Anuj's solo travel journey across India — the roads, places, people and moments that made travel more than just visiting destinations.",
};

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_65%]"
            style={{
              backgroundImage: "url('/images/profile/anujs.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-8 lg:pb-24">
          <div className="max-w-5xl">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              <MapPin size={14} />
              India · Solo Traveller
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">
              I&apos;m Anuj.
              <span className="block text-white/45">I travel. I create.</span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
              A solo traveller, techie and travel creator exploring India —
              making reels from the places I visit and documenting the real
              journeys along the way.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Explore my stories
                <ArrowUpRight size={16} />
              </Link>

              {/* External Instagram link */}
              <a
                href="https://www.instagram.com/srivastava_._anuj/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Icon icon="simple-icons:instagram" width="16" height="16" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
              About me
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              I travel. I create.
              <span className="block text-white/40">I keep exploring.</span>
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-white/55 sm:text-lg">
            <p>
              I&apos;m currently travelling across India as a solo traveller,
              creating reels from the places I visit and documenting the
              experiences that happen along the way.
            </p>

            <p>
              I&apos;m also a techie who enjoys building things online. So
              somewhere between writing code and travelling through unfamiliar
              places, I started combining both worlds.
            </p>

            <p>
              This website is a place where I can share the destinations,
              stories, experiences and travel ideas that come from actually
              being on the road.
            </p>

            <p className="text-white/80">
              I&apos;m not just interested in reaching a destination.
              <br />
              <span className="text-white">
                I&apos;m interested in everything that happens along the way.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* THE BEGINNING */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                Where it began
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                At first,
                <span className="block text-white/40">it was just a trip.</span>
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-white/55 sm:text-lg">
              <p>
                Like most people, I used to think travelling meant choosing a
                destination, booking a ticket and taking a few pictures.
              </p>

              <p>
                But my first few journeys slowly changed that idea. The
                excitement of getting on a bus without knowing exactly what the
                road would look like. Waking up somewhere completely unfamiliar.
                Finding a small local place to eat. Talking to someone I had
                never met before.
              </p>

              <p>
                Those moments stayed with me much longer than the photographs
                did.
              </p>

              <p className="text-white/80">
                And I realised I wasn&apos;t just collecting places.
                <br />
                <span className="text-white">
                  I was collecting experiences.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLO TRAVEL */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                Going alone
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Somewhere between
                <span className="block text-white/40">
                  being alone and feeling free.
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-white/55 sm:text-lg">
              <p>Solo travel isn&apos;t always beautiful.</p>

              <p>
                Sometimes there is no one to share the view with. No one to ask
                what to do next. No familiar face when the road gets confusing.
              </p>

              <p>
                But there is something special about making every decision
                yourself — where to stop, which road to take, where to eat, and
                when to simply sit and watch the world pass by.
              </p>

              <p className="text-white/80">
                You begin to listen to yourself a little more.
                <br />
                And somewhere along the way,
                <span className="text-white">
                  {" "}
                  being alone stops feeling lonely.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
              What I do
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              More than just
              <span className="block text-white/40">travelling.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            <div className="bg-black p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                01
              </p>

              <h3 className="mt-5 text-2xl font-medium">Solo Travel</h3>

              <p className="mt-4 leading-7 text-white/50">
                Travelling independently, using public transport, staying in
                hostels and experiencing places at my own pace.
              </p>
            </div>

            <div className="bg-black p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                02
              </p>

              <h3 className="mt-5 text-2xl font-medium">Travel Reels</h3>

              <p className="mt-4 leading-7 text-white/50">
                Creating short cinematic reels from the places I visit and the
                moments that make each journey memorable.
              </p>
            </div>

            <div className="bg-black p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                03
              </p>

              <h3 className="mt-5 text-2xl font-medium">Travel Stories</h3>

              <p className="mt-4 leading-7 text-white/50">
                Writing about the real experiences behind the destinations — the
                people, roads, unexpected moments and everything in between.
              </p>
            </div>

            <div className="bg-black p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                04
              </p>

              <h3 className="mt-5 text-2xl font-medium">Techie</h3>

              <p className="mt-4 leading-7 text-white/50">
                A technology background that lets me build websites, create
                digital experiences and combine tech with travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL JOURNEYS */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                Real journeys
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                I don&apos;t always take
                <span className="block text-white/40">the usual route.</span>
              </h2>
            </div>

            <div className="space-y-7 text-lg leading-8 text-white/55">
              <p>
                One of my memorable journeys was completing the Spiti Valley
                circuit using buses — experiencing the landscape and villages
                without relying on a private vehicle.
              </p>

              <p>
                I&apos;ve also hitchhiked from one place to another, met people
                along the way and discovered that some of the best travel
                experiences happen when you leave a little room for the
                unexpected.
              </p>

              <p>
                These are the experiences I want to document — not just the
                destination, but everything that happens between the starting
                point and getting there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY I KEEP GOING */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-8 lg:py-40">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
          Why I keep going
        </p>

        <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Maybe I&apos;m not searching
          <span className="block text-white/40">for new places.</span>
          <span className="mt-3 block">
            Maybe I&apos;m searching for
            <span className="text-white/40"> new versions of myself.</span>
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
          Every journey leaves something behind — a memory, a lesson, a person,
          a feeling. And that&apos;s probably why, even after seeing more than
          40 destinations, I still feel like I&apos;ve barely started.
        </p>
      </section>

      {/* WHAT'S NEXT */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                What&apos;s next
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                The journey
                <span className="block text-white/40">continues.</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-white/55">
              <p>
                There are still so many parts of India I want to explore.
                Northeast India, South India, quiet villages, mountain roads,
                coastal towns and places that rarely make it onto a typical
                travel itinerary.
              </p>

              <p>
                I don&apos;t have everything planned. And honestly, I like it
                that way.
              </p>

              <p className="text-white/80">
                There are still roads I haven&apos;t taken.
                <br />
                <span className="text-white">
                  And stories I haven&apos;t lived yet.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL PHILOSOPHY */}
      {/* <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-40">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            My travel philosophy
          </p>

          <blockquote className="mt-8 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Travel like a local.
            <span className="block text-white/40">Not like a tourist.</span>
          </blockquote>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            I don&apos;t want to simply say I&apos;ve been somewhere. I want to
            remember how it felt to be there.
          </p>
        </div>
      </section> */}

      {/* FINAL CTA */}
      {/* <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                And the journey continues
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                There are still roads
                <span className="text-white/40"> I haven&apos;t taken.</span>
              </h2>
            </div>

            <Link
              href="/itineraries"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Plan your journey
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section> */}

      {/* WORK WITH ME */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">
            Work with me
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Have something
            <span className="block text-white/40">worth sharing?</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/50">
            I&apos;m open to travel collaborations, brand collaborations and
            creating reels for people, places and businesses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {/* Email */}
            <a
              href="mailto:anujsrivastava.dev@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <Mail size={16} />
              Get in touch
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/srivastava_._anuj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon icon="simple-icons:instagram" width="16" height="16" />
              Instagram
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anuj-srivastava-/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon icon="simple-icons:linkedin" width="16" height="16" />
              LinkedIn
            </a>
          </div>

          {/* <p className="mt-7 text-sm text-white/30">
            anujsrivastava.dev@gmail.com
          </p> */}
        </div>
      </section>
    </div>
  );
}
