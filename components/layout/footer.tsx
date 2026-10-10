
import Link from "next/link";
import { Users } from "lucide-react";
import { Ephesis } from "next/font/google";
import { prisma } from "../../lib/prisma";

/*
  Brand palette: The Local Route
  forest green  #263D32   footer background
  deep green    #1D3027   darker accents
  sand gold     #A16F35   hover + focus
  light gold    #D4AC73   secondary accents
  warm ivory    #F8F6F0   text highlights
  sandstone     #EAE5D9   borders
*/

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

const linkClass =
  "w-fit rounded-sm text-[15px] text-white/80 transition hover:text-[#D4AC73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AC73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32]";

export async function Footer() {
  const userCount = await prisma.user.count();

  return (
    <footer className="bg-[#263D32] text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className={`${ephesis.className} inline-block rounded-sm text-[34px] leading-none text-white transition hover:text-[#D4AC73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AC73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263D32]`}
            >
              The Local Route
            </Link>

            <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/80">
              Travel stories, practical itineraries and experiences from
              exploring India one journey at a time.
            </p>

            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] py-2 pl-2 pr-4 text-sm text-white/90">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D4AC73] text-[#263D32]">
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

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-base font-semibold text-white">Explore</h3>

            <div className="mt-4 flex flex-col gap-3">
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
          <nav aria-label="Journey">
            <h3 className="text-base font-semibold text-white">Journey</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/journey" className={linkClass}>
                My journey
              </Link>

              <Link href="/about" className={linkClass}>
                About me
              </Link>
            </div>
          </nav>

          {/* Follow */}
          <nav aria-label="Follow">
            <h3 className="text-base font-semibold text-white">Follow</h3>

            <div className="mt-4 flex flex-col gap-3">
              {/* Replace "#" with your real Instagram profile link */}
              <a href="#" className={linkClass}>
                Instagram
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
          © {new Date().getFullYear()} TravelWithAnuj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
