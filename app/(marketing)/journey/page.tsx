
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Mail, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "My Journey | Anuj Srivastava",
  description:
    "Meet Anuj Srivastava, a solo traveller and travel creator documenting real journeys, mountain roads and unforgettable experiences across India.",
};

const instagramUrl = "https://www.instagram.com/srivastava_._anuj/";
const linkedinUrl = "https://www.linkedin.com/in/anuj-srivastava-/";
const emailAddress = "anujsrivastava.dev@gmail.com";

const experiences = [
  {
    number: "01",
    title: "Solo travel",
    description:
      "Exploring India independently, travelling by public transport, staying in hostels and discovering places at my own pace.",
  },
  {
    number: "02",
    title: "Travel reels",
    description:
      "Creating cinematic videos that capture the landscapes, atmosphere and little moments that make a journey memorable.",
  },
  {
    number: "03",
    title: "Stories from the road",
    description:
      "Documenting real experiences, unexpected encounters and the people and places that make every journey different.",
  },
  {
    number: "04",
    title: "Technology",
    description:
      "Building digital experiences and bringing my interests in technology, storytelling and travel together.",
  },
];

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#303A32]">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden border-b border-[#EAE5D9] sm:min-h-[90vh]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_65%]"
            style={{
              backgroundImage: "url('/images/profile/heros.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75 sm:text-xs">
              <MapPin size={14} className="text-amber-200" />
              India · Solo traveller · Travel creator
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              I&apos;m Anuj.
              <span className="mt-2 block text-white/65">
                I travel to feel more alive.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              A solo traveller, techie and travel creator exploring India,
              capturing cinematic moments and sharing the real stories behind
              every journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/stories"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F8F6F0] px-5 py-3 text-sm font-medium text-[#263D32] transition hover:bg-white"
              >
                Read my stories
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-5 py-3 text-sm text-white transition hover:border-white/50 hover:bg-white/10"
              >
                <Icon icon="simple-icons:instagram" width="16" height="16" />
                Follow the journey
              </a>
            </div>

            <a
              href="#my-story"
              className="mt-12 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/65 transition hover:text-white sm:text-xs"
            >
              A little about me
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section
        id="my-story"
        className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
              The person behind the journey
            </p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
              More than a list of places.
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
            <p>
              I&apos;m Anuj, a solo traveller and technology enthusiast with a
              growing love for exploring India. I create travel reels, document
              my experiences and share the moments that make a place special.
            </p>

            <p>
              I also enjoy building things online. Combining technology with
              travel has given me a way to turn my experiences into something I
              can share with other travellers.
            </p>

            <p>
              This website brings those interests together: the places I visit,
              the stories I collect and the practical lessons I learn along the
              way.
            </p>

            <p className="border-l-2 border-[#A16F35]/60 pl-5 font-medium text-[#263D32]">
              I don&apos;t just want to remember where I went. I want to
              remember how it felt to be there.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT STARTED */}
      <section className="border-y border-[#EAE5D9] bg-[#FFFEFA]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
                Where it began
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
                It started with a trip.
                <span className="mt-1 block text-[#626A5D]/70">
                  Then came the stories.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
              <p>
                At first, travelling meant choosing a destination, booking a
                ticket and taking a few photographs. But the more I travelled,
                the more I realised that the best parts rarely went according
                to plan.
              </p>

              <p>
                It was the unfamiliar roads, the small local eateries, the
                conversations with strangers and the places I discovered
                without expecting to. Those moments often stayed with me
                longer than the photographs.
              </p>

              <p className="font-medium text-[#263D32]">
                Somewhere along the way, I stopped collecting destinations and
                started collecting experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLO TRAVEL */}
      <section className="border-b border-[#EAE5D9]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
                Going alone
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
                Freedom begins
                <span className="block text-[#626A5D]/70">
                  outside your comfort zone.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
              <p>
                Solo travel isn&apos;t always easy. Sometimes plans fall apart,
                roads get confusing and there&apos;s no familiar face to turn
                to.
              </p>

              <p>
                But travelling alone also means choosing your own path, staying
                longer when a place feels right and finding unexpected
                connections with people you might never have met otherwise.
              </p>

              <p>
                It has taught me to trust myself, stay curious and become
                comfortable with the unknown.
              </p>

              <p className="font-medium text-[#263D32]">
                Sometimes, the best company you find on the road is yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="border-b border-[#EAE5D9] bg-[#FFFEFA]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
              What I do
            </p>

            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
              Travel, stories and technology.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#626A5D] sm:text-base">
              Different interests, connected by one thing: creating and sharing
              experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {experiences.map((experience) => (
              <article
                key={experience.number}
                className="rounded-2xl border border-[#EAE5D9] bg-[#F8F6F0] p-6 transition duration-300 hover:border-[#A16F35]/50 hover:shadow-lg hover:shadow-[#263D32]/[0.04] sm:p-8"
              >
                <p className="text-xs tracking-[0.18em] text-[#A16F35]">
                  {experience.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#263D32] sm:text-2xl">
                  {experience.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#626A5D] sm:text-base">
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPITI STORY */}
      <section className="border-b border-[#EAE5D9]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
                A journey to remember
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
                Spiti Valley.
                <span className="block text-[#626A5D]/70">
                  No private vehicle. Just the road.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
              <p>
                One of my memorable adventures was completing the Spiti Valley
                circuit using buses and local transport, travelling through
                remote villages and dramatic mountain landscapes without
                relying on a private vehicle.
              </p>

              <p>
                Along the way came unexpected lifts, conversations with
                strangers, quiet village mornings and experiences I could never
                have planned in advance.
              </p>

              <p>
                It reminded me that a journey isn&apos;t defined only by where
                you arrive. Sometimes, the road itself becomes the reason you
                remember it.
              </p>

              <Link
                href="/stories"
                className="group inline-flex items-center gap-2 pt-1 text-sm font-medium text-[#263D32] transition hover:text-[#A16F35]"
              >
                Explore my travel stories
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY I TRAVEL */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:px-8 lg:py-32">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
          Why I keep going
        </p>

        <h2 className="mt-6 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
          Maybe it&apos;s not about finding new places.
          <span className="mt-2 block text-[#626A5D]/70">
            Maybe it&apos;s about seeing life differently.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
          After exploring more than 40 destinations, I still feel like
          I&apos;ve barely scratched the surface. Every journey leaves me with
          a new memory, a different perspective or a story worth sharing.
        </p>
      </section>

      {/* WHAT'S NEXT */}
      <section className="border-y border-[#EAE5D9] bg-[#FFFEFA]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
                What&apos;s next
              </p>

              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
                More roads to take.
                <span className="block text-[#626A5D]/70">
                  More stories to live.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
              <p>
                There&apos;s still so much of India I want to explore, from
                Northeast India and quiet villages to coastal towns and mountain
                roads far from the usual tourist trail.
              </p>

              <p>
                Not every journey needs a perfect plan. Some of the most
                memorable experiences happen when you leave room for the
                unexpected.
              </p>

              <p className="font-medium text-[#263D32]">
                The map is far from complete, and that&apos;s exactly how I
                like it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK WITH ME */}
      <section className="border-b border-[#EAE5D9]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-8 lg:py-28">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A16F35] sm:text-xs">
            Work with me
          </p>

          <h2 className="mt-5 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-[#263D32] sm:text-4xl lg:text-5xl">
            Let&apos;s create something
            <span className="block text-[#626A5D]/70">
              worth remembering.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#626A5D] sm:text-base sm:leading-8">
            Open to travel and brand collaborations, destination features and
            creating cinematic reels for places, people and businesses.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#263D32] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1D3027]"
            >
              <Mail size={16} />
              Get in touch
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#EAE5D9] bg-[#FFFEFA] px-5 py-3 text-sm text-[#263D32] transition hover:border-[#A16F35]/50 hover:bg-[#EAE5D9]/50"
            >
              <Icon icon="simple-icons:instagram" width="16" height="16" />
              Instagram
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#EAE5D9] bg-[#FFFEFA] px-5 py-3 text-sm text-[#263D32] transition hover:border-[#A16F35]/50 hover:bg-[#EAE5D9]/50"
            >
              <Icon icon="simple-icons:linkedin" width="16" height="16" />
              LinkedIn
            </a>
          </div>

          <p className="mt-7 text-sm text-[#626A5D]">
            {emailAddress}
          </p>
        </div>
      </section>
    </main>
  );
}
