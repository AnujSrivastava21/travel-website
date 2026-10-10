
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
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
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

      <p className="mt-5 text-xs uppercase tracking-wider text-[#A16F35]">
        {post.location}
      </p>

      <h2 className="mt-2 text-xl font-semibold leading-snug text-[#263D32] transition-colors group-hover:text-[#A16F35]">
        {post.title}
      </h2>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#626A5D]">
        {post.excerpt}
      </p>

      <Link
        href={`/stories/${post.slug}`}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#263D32] transition hover:text-[#A16F35]"
      >
        Read story
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}
