
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "../../../../components/navigation/breadcrumbs";
import { travelPosts } from "../../../../data/travel-posts";
import { headingFont, bodyFont } from "../../../font";

interface TravelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return travelPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: TravelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = travelPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function TravelStoryPage({
  params,
}: TravelPageProps) {
  const { slug } = await params;
  const post = travelPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#F8F6F0] font-[var(--font-body)] text-[#303A32] antialiased`}
    >
      {/* HERO */}
      <section className="relative flex min-h-[75svh] items-end overflow-hidden bg-[#1D3027] sm:min-h-[80svh]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#1D3027]/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1D3027]/20 via-[#1D3027]/20 to-[#1D3027]/90" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:pb-20">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                {
                  label: "Stories",
                  href: "/stories",
                },
                {
                  label: post.title,
                },
              ]}
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E5C18B] sm:text-sm">
            {post.location}
          </p>

          <h1 className="mt-5 max-w-4xl break-words font-[var(--font-heading)] text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {post.excerpt}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AC73]" />
            <p className="text-sm text-white/70">{post.date}</p>
          </div>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-[#A16F35]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A16F35]">
              The story
            </p>
          </div>

          <div className="space-y-6">
            {post.content
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph, index) => {
                const parts = paragraph.split(/(\[\[.*?\]\])/g);

                return (
                  <p
                    key={index}
                    className="break-words text-[15px] leading-8 tracking-[-0.005em] text-[#626A5D] sm:text-base sm:leading-9"
                  >
                    {parts.map((part, i) => {
                      if (part.startsWith("[[") && part.endsWith("]]")) {
                        return (
                          <span
                            key={i}
                            className="font-semibold text-[#A16F35]"
                          >
                            {part.slice(2, -2)}
                          </span>
                        );
                      }

                      return part;
                    })}
                  </p>
                );
              })}
          </div>

          {/* STORY ENDING */}
          <div className="mt-12 border-t border-[#EAE5D9] pt-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#A16F35]" />
              <span className="h-px w-12 bg-[#EAE5D9]" />
              <span className="h-2 w-2 rounded-full bg-[#A16F35]" />
            </div>

            <p className="mt-5 font-[var(--font-heading)] text-xl italic leading-8 text-[#263D32] sm:text-2xl">
              Some journeys stay with you long after the road ends.
            </p>

            <p className="mt-3 text-sm text-[#626A5D]">
              A story from The Local Route.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

