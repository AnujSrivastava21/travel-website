import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover  bg-[center_65%]"
            style={{
              backgroundImage: "url('/images/profile/anujs.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">

            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              <MapPin size={14} />
              India · Solo Travel
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">
              I didn't start
              <span className="block text-white/45">
                travelling to escape.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              I started travelling because I wanted to see what was beyond
              the familiar — and somewhere along the way, the journey became
              a part of who I am.
            </p>

          </div>
        </div>
      </section>

      {/* THE BEGINNING */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
              Where it began
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              At first,
              <span className="block text-white/40">
                it was just a trip.
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-white/55 sm:text-lg">
            <p>
              Like most people, I used to think travelling meant choosing a
              destination, booking a ticket and taking a few pictures.
            </p>

            <p>
              But my first few journeys slowly changed that idea.
              The excitement of getting on a bus without knowing exactly
              what the road would look like. Waking up somewhere completely
              unfamiliar. Finding a small local place to eat. Talking to
              someone I had never met before.
            </p>

            <p>
              Those moments stayed with me much longer than the photographs
              did.
            </p>

            <p className="text-white/80">
              And I realised I wasn't just collecting places.
              <br />
              <span className="text-white">
                I was collecting experiences.
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* SOLO TRAVEL */}
      <section className="border-y border-white/10 bg-white/[0.02]">
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
              <p>
                Solo travel isn't always beautiful.
              </p>

              <p>
                Sometimes there is no one to share the view with.
                No one to ask what to do next.
                No familiar face when the road gets confusing.
              </p>

              <p>
                But there is something special about making every decision
                yourself — where to stop, which road to take, where to eat,
                and when to simply sit and watch the world pass by.
              </p>

              <p className="text-white/80">
                You begin to listen to yourself a little more.
                <br />
                And somewhere along the way,
                <span className="text-white">
                  {" "}being alone stops feeling lonely.
                </span>
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WHAT TRAVEL TAUGHT ME */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">

        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            What the road taught me
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            The places changed.
            <span className="block text-white/40">
              So did I.
            </span>
          </h2>
        </div>

        <div className="mt-16 space-y-0">

          <div className="border-t border-white/10 py-10">
            <p className="text-sm text-white/30">01</p>

            <h3 className="mt-3 text-2xl font-medium">
              The mountains taught me to slow down.
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/50">
              Some roads don't need to be rushed. Sometimes the best part
              of the journey is simply sitting somewhere quiet and watching
              the clouds move across the mountains.
            </p>
          </div>

          <div className="border-t border-white/10 py-10">
            <p className="text-sm text-white/30">02</p>

            <h3 className="mt-3 text-2xl font-medium">
              People made unfamiliar places feel familiar.
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/50">
              A conversation with a local, a shared meal, a small gesture
              from a stranger — these are the moments that make a place
              feel alive.
            </p>
          </div>

          <div className="border-t border-white/10 py-10">
            <p className="text-sm text-white/30">03</p>

            <h3 className="mt-3 text-2xl font-medium">
              Getting lost isn't always a bad thing.
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/50">
              Some of my favourite memories were never part of the plan.
              A wrong turn, an unexpected viewpoint, a quiet village,
              a road that looked too beautiful to ignore.
            </p>
          </div>

          <div className="border-t border-white/10 py-10">
            <p className="text-sm text-white/30">04</p>

            <h3 className="mt-3 text-2xl font-medium">
              A destination is more than a location.
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/50">
              It's the food you remember, the people you meet, the road
              you take, the sunrise you wake up for and the feeling you
              carry home.
            </p>
          </div>

        </div>
      </section>

      {/* 40+ DESTINATIONS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                The journey so far
              </p>

              <h2 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
                40+
                <span className="block text-white/40">
                  destinations.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                From the valleys of Himachal to the lakes of Rajasthan,
                from crowded cities to quiet villages — every place has
                left something behind.
              </p>
            </div>

            <Link
              href="/destinations"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-sm text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Explore the places
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>
      </section>

      {/* THE REAL REASON */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-8 lg:py-40">

        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
          Why I keep going
        </p>

        <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Maybe I'm not searching
          <span className="block text-white/40">
            for new places.
          </span>

          <span className="mt-2 block">
            Maybe I'm searching for
            <span className="text-white/40"> new versions of myself.</span>
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
          Every journey leaves something behind — a memory, a lesson,
          a person, a feeling. And that's probably why, even after
          seeing more than 40 destinations, I still feel like I've
          barely started.
        </p>

      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-40">

          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            My travel philosophy
          </p>

          <blockquote className="mt-8 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Travel like a local.
            <span className="block text-white/40">
              Not like a tourist.
            </span>
          </blockquote>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            I don't want to simply say I've been somewhere.
            I want to remember how it felt to be there.
          </p>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                And the journey continues
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                There are still roads
                <span className="text-white/40">
                  {" "}I haven't taken.
                </span>
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
      </section>

    </div>
  );
}
