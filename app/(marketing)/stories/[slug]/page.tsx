import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/navigation/breadcrumbs";
import { travelPosts } from "../../../../data/travel-posts";

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

export default async function TravelStoryPage({ params }: TravelPageProps) {
  const { slug } = await params;

  const post = travelPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 lg:px-8">
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

          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            {post.location}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {post.excerpt}
          </p>

          <p className="mt-6 text-sm text-white/40">{post.date}</p>
        </div>
      </section>

<section className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
  <div className="space-y-4">
    {post.content
      .trim()
      .split(/\n\s*\n/)
      .map((paragraph, index) => {
        const parts = paragraph.split(/(\[\[.*?\]\])/g);

        return (
          <p
            key={index}
            className="text-[15px] leading-7 tracking-[-0.005em] text-white/65 sm:text-base sm:leading-8"
          >
            {parts.map((part, i) => {
              if (part.startsWith("[[") && part.endsWith("]]")) {
                return (
                  <span
                    key={i}
                    className="font-medium text-amber-300"
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
</section>
    </article>
  );
}
