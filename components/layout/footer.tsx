
import Link from "next/link";
import { Users } from "lucide-react";
import { Ephesis } from "next/font/google";
import { prisma } from "../../lib/prisma";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

const linkClass =
  "w-fit rounded-sm text-sm text-white/80 transition hover:text-[#D4AC73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AC73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32] sm:text-[15px]";

export async function Footer() {
  const userCount = await prisma.user.count();

  return (
    <footer className="bg-[#263D32] text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-7 sm:gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className={`${ephesis.className} inline-block rounded-sm text-[32px] leading-none text-white transition hover:text-[#D4AC73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AC73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32] sm:text-[34px]`}
            >
              The Local Route
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80 sm:mt-4 sm:text-[15px] sm:leading-7">
              Travel stories, practical itineraries and experiences from
              exploring India one journey at a time.
            </p>

            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] py-1.5 pl-2 pr-3 text-xs text-white/90 sm:mt-5 sm:py-2 sm:pr-4 sm:text-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#D4AC73] text-[#263D32]">
                <Users size={15} />
              </span>

              <span>
                <strong className="font-semibold text-white">
                  {userCount}
                </strong>{" "}
                {userCount === 1 ? "person sees" : "people see"} this profile
              </span>
            </div>
          </div>

          {/* Mobile: three compact columns. Desktop: original grid columns. */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 sm:gap-6 sm:border-0 sm:pt-0 md:col-span-2 lg:col-span-3 lg:contents">
            {/* Explore */}
            <nav aria-label="Explore" className="min-w-0">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Explore
              </h3>

              <div className="mt-3 flex flex-col items-start gap-2.5 sm:mt-4 sm:gap-3">
                <Link href="/itineraries" className={linkClass}>
                  Itineraries
                </Link>

                <Link href="/destinations" className={linkClass}>
                  Destinations
                </Link>

                <Link href="/stories" className={linkClass}>
                  Travel stories
                </Link>
              </div>
            </nav>

            {/* Journey */}
            <nav aria-label="Journey" className="min-w-0">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Journey
              </h3>

              <div className="mt-3 flex flex-col items-start gap-2.5 sm:mt-4 sm:gap-3">
                <Link href="/journey" className={linkClass}>
                  My journey
                </Link>

                <Link href="/about" className={linkClass}>
                  About me
                </Link>
              </div>
            </nav>

            {/* Follow */}
            <nav aria-label="Follow" className="min-w-0">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Follow
              </h3>

              <div className="mt-3 flex flex-col items-start gap-2.5 sm:mt-4 sm:gap-3">
                <a
                  href="https://www.instagram.com/srivastava_._anuj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-7 border-t border-white/15 pt-5 text-xs text-white/70 sm:mt-10 sm:pt-6 sm:text-sm">
          © {new Date().getFullYear()} TravelWithAnuj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
