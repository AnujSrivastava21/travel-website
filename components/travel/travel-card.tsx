import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { TravelPost } from "../../types/travel";

interface TravelCardProps {
  post: TravelPost;
}

export function TravelCard({ post }: TravelCardProps) {
  return (
    <article>
      <Link
        href={`/stories/${post.slug}`}
        className="group block overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      <p className="mt-5 text-xs uppercase tracking-wider text-white/40">
        {post.location}
      </p>

      <h2 className="mt-2 text-xl font-medium text-white">
        {post.title}
      </h2>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/50">
        {post.excerpt}
      </p>

      <Link
  href={`/stories/${post.slug}`}
  className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
>
  Read story
  <ArrowRight size={15} />
</Link>
    </article>
  );
}