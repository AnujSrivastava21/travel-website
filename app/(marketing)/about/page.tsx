import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

import { topVideos } from "../../../src/data/top-videos";

export const metadata: Metadata = {
  title: "About Anuj",
  description:
    "Meet Anuj — a solo traveller, techie and travel creator exploring India, creating reels and documenting real journeys.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden border-b border-white/10">
        <Image
          src="/images/about/anuj.jpg"
          alt="Anuj — solo traveller and travel creator"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 pt-40 lg:px-8 lg:pb-28">
          <div className="max-w-5xl">
            <p className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/65">
              <Icon
                icon="mdi:map-marker-outline"
                width="15"
                height="15"
              />
              India · Solo Traveller
            </p>

            <h1 className="mt-6 text-6xl font-semibold tracking-tight sm:text-7xl lg:text-9xl">
              I&apos;m Anuj.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
              A solo traveller, techie and travel creator exploring India —
              making reels from the places I visit and documenting the real
              journeys along the way.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/travel"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Explore my journeys

                <Icon
                  icon="lucide:arrow-up-right"
                  width="16"
                  height="16"
                />
              </Link>

              <a
                href="https://www.instagram.com/srivastava_._anuj/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 py-3 text-sm text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Icon
                  icon="simple-icons:instagram"
                  width="16"
                  height="16"
                />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
    <section className="border-b border-white/10">
  <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.2em] text-white/35">
        A little about me
      </p>

      <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        I travel. I create.
        <br />
        I keep exploring.
      </h2>
    </div>

    <div className="mt-12 max-w-3xl space-y-7 text-lg leading-8 text-white/55 sm:text-xl sm:leading-9">
      <p>
        I&apos;m currently travelling across India as a solo traveller,
        visiting new places and creating reels around the experiences I have
        along the way.
      </p>

      <p>
        I&apos;m also a techie, so travelling and building things on the
        internet are both a big part of what I do.
      </p>

      <p>
        What started with exploring places has turned into something I
        genuinely enjoy — discovering a destination, experiencing it for
        myself and sharing that experience through content.
      </p>
    </div>

    <div className="mt-14 h-px w-24 bg-white/20" />

    <p className="mt-8 max-w-2xl text-base leading-7 text-white/35">
      I&apos;m not just interested in reaching a destination. I want to
      experience the journey, meet people, discover places and remember the
      moments in between.
    </p>
  </div>
</section>

      {/* WHAT I DO */}
      {/* <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/35">
              What I do
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              More than just travelling.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/50">
              Travel is what takes me places. Creating and sharing the
              experience is what keeps the journey going.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            <div className="bg-black p-8 lg:p-10">
              <p className="text-sm text-white/30">01</p>

              <h3 className="mt-10 text-2xl font-medium">Solo Travel</h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                Exploring India independently, finding my own routes and
                experiencing destinations at my own pace.
              </p>
            </div>

            <div className="bg-black p-8 lg:p-10">
              <p className="text-sm text-white/30">02</p>

              <h3 className="mt-10 text-2xl font-medium">Travel Reels</h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                Creating short-form videos from the places I visit and the
                moments that make each journey memorable.
              </p>
            </div>

            <div className="bg-black p-8 lg:p-10">
              <p className="text-sm text-white/30">03</p>

              <h3 className="mt-10 text-2xl font-medium">Travel Stories</h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                Sharing real experiences, destinations and practical
                information to help other travellers plan their journeys.
              </p>
            </div>

            <div className="bg-black p-8 lg:p-10">
              <p className="text-sm text-white/30">04</p>

              <h3 className="mt-10 text-2xl font-medium">Techie</h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                A technology background that lets me build websites, create
                digital experiences and combine tech with travel.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* REAL JOURNEYS */}
      {/* <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/35">
              Real journeys
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              I don&apos;t always take the usual route.
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
      </section> */}

      {/* WHAT'S NEXT */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                What&apos;s next
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                The journey continues.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-xl leading-9 text-white/60">
                There is still a lot of India left to explore.
              </p>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/40">
                My next plans are focused on exploring more of Northeast India
                and South India — discovering new landscapes, local cultures,
                food and stories along the way.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/60">
                  Northeast India
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/60">
                  South India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP VIDEOS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/35">
              From the journey
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Top videos.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/45">
              A few of the reels that have reached the most people so far.
            </p>
          </div>

          <a
            href="https://www.instagram.com/srivastava_._anuj/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            View Instagram

            <Icon
              icon="lucide:arrow-up-right"
              width="16"
              height="16"
            />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {topVideos.map((video) => (
            <a
              key={video.rank}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm text-white/30">
                  {String(video.rank).padStart(2, "0")}
                </span>

                <Icon
                  icon="lucide:arrow-up-right"
                  width="20"
                  height="20"
                  className="text-white/30 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  {video.label}
                </p>

                <h3 className="mt-3 text-2xl font-medium">
                  {video.title}
                </h3>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-sm text-white/40">
                    {video.views} views
                  </span>

                  <span className="text-sm text-white/50 transition group-hover:text-white">
                    Watch Reel ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COLLABORATION */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">
            Work with me
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Have something worth sharing?
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/50">
            I&apos;m open to travel collaborations, brand collaborations and
            creating reels for people, places and businesses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:anujsrivastava.dev@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <Icon
                icon="lucide:mail"
                width="16"
                height="16"
              />
              Get in touch
            </a>

            <a
              href="https://www.instagram.com/srivastava_._anuj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon
                icon="simple-icons:instagram"
                width="16"
                height="16"
              />
              Instagram
            </a>
          </div>

          <p className="mt-7 text-sm text-white/30">
            anujsrivastava.dev@gmail.com
          </p>

          <a
            href="https://www.linkedin.com/in/anuj-srivastava-/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <Icon
              icon="simple-icons:linkedin"
              width="15"
              height="15"
            />

            Connect on LinkedIn

            <Icon
              icon="lucide:arrow-up-right"
              width="14"
              height="14"
            />
          </a>
        </div>
      </section>
    </div>
  );
}