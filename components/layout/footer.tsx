import Link from "next/link";
import { Ephesis } from "next/font/google";
import { prisma } from "../../lib/prisma";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

export async function Footer() {
  const userCount = await prisma.user.count();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
  <Link
    href="/"
    className={`${ephesis.className} text-lg font-semibold tracking-tight text-white`}
  >
    The   Local   Route 
  </Link>

  <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
    Travel stories, practical itineraries and experiences from
    exploring India one journey at a time.
  </p>

  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/70">
    <span className="text-base">✈️</span>
    <span>
      <strong className="text-white">{userCount}</strong>{" "}
      {userCount === 1 ? "people" : "peoples"} see this profile
    </span>
  </div>
</div>

          <div>
            <h3 className="text-sm font-medium text-white">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/50">
              <Link href="/stories" className="hover:text-white">
                Travel Stories
              </Link>

              <Link href="/destinations" className="hover:text-white">
                Destinations
              </Link>

              <Link href="/itineraries" className="hover:text-white">
                Itineraries
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">
              Journey
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/50">
              <Link href="/journey" className="hover:text-white">
                My Journey
              </Link>

              <Link href="/about" className="hover:text-white">
                About Me
              </Link>

              {/* <Link href="/login" className="hover:text-white">
                Sign in
              </Link> */}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">
              Follow
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/50">
              <a href="#" className="hover:text-white">
                Instagram
              </a>

              {/* <a href="#" className="hover:text-white">
                YouTube
              </a> */}

              {/* <a href="#" className="hover:text-white">
                GitHub
              </a> */}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/40">
          © {new Date().getFullYear()} TravelWithAnuj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}