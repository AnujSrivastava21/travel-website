"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Search,
} from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Ephesis } from "next/font/google";

import { mainNavigation } from "../../config/navigation";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, status } = useSession();

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Account";

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);

    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Main Glass Navbar */}
      <div className="border-b border-white/[0.06] bg-black/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center px-5 sm:px-6 lg:px-8">

          {/* =====================================================
              LEFT — LOGO
          ====================================================== */}
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              className="group relative shrink-0"
              onClick={() => {
                setIsOpen(false);
                setProfileOpen(false);
              }}
            >
              <span
                className={`${ephesis.className} text-[30px] font-normal tracking-wide text-white transition-all duration-500 group-hover:text-white/75`}
              >
                The Local Route
              </span>

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-500 group-hover:w-full" />
            </Link>
          </div>

          {/* =====================================================
              CENTER — NAVIGATION
          ====================================================== */}
          <nav className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.025] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex">

            {mainNavigation.map((item) => {
              const isItinerary = item.href === "/itineraries";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative ${
                    isItinerary ? "z-10" : ""
                  }`}
                >
                  <span
                    className={`
                      ${ephesis.className}
                      relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-[19px]
                      transition-all duration-300
                      ${
                        isItinerary
                          ? "border border-[#d4af37]/25 bg-[#d4af37]/[0.08] text-white shadow-[0_0_20px_rgba(212,175,55,0.06)] group-hover:border-[#d4af37]/45 group-hover:bg-[#d4af37]/[0.14]"
                          : "text-white/55 group-hover:bg-white/[0.08] group-hover:text-white"
                      }
                    `}
                  >
                    {item.title}

                    {/* Premium feature badge */}
                    {isItinerary && (
                      <span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-1.5 py-[2px] text-[8px] font-sans font-medium uppercase tracking-[0.14em] text-[#d4af37]">
                        Plan
                      </span>
                    )}
                  </span>

                  {/* Bottom glow */}
                  <span
                    className={`
                      absolute bottom-0 left-1/2 h-px -translate-x-1/2
                      transition-all duration-300
                      ${
                        isItinerary
                          ? "w-10 bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.7)] group-hover:w-14"
                          : "w-0 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.5)] group-hover:w-8"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* =====================================================
              RIGHT — SEARCH + AUTH
          ====================================================== */}
          <div className="flex flex-1 items-center justify-end gap-3">

            {/* Premium Search Box */}
            <div className="group relative hidden lg:block">
              <Search
                size={15}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors duration-300 group-focus-within:text-white/70"
              />

              <input
                type="text"
                placeholder="Search destinations..."
                aria-label="Search destinations"
                className="h-10 w-[190px] rounded-full border border-white/[0.10] bg-white/[0.035] pl-10 pr-4 text-[13px] text-white outline-none placeholder:text-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 hover:w-[210px] hover:border-white/[0.18] hover:bg-white/[0.055] focus:w-[230px] focus:border-white/[0.28] focus:bg-white/[0.07] focus:shadow-[0_0_25px_rgba(255,255,255,0.06)]"
              />
            </div>

            {/* =================================================
                AUTH
            ================================================== */}
            {status === "loading" ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-white/[0.06]" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="group flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.045] px-2 py-1.5 text-sm text-white/75 shadow-[0_5px_25px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.20] hover:bg-white/[0.08] hover:text-white"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.07] text-xs transition group-hover:bg-white/[0.12]">
                    👤
                  </div>

                  <span className="max-w-20 truncate">
                    {firstName}
                  </span>

                  <ChevronDown
                    size={13}
                    className={`text-white/40 transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0c0c0c]/95 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

                    <div className="border-b border-white/[0.08] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06]">
                          👤
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {firstName}
                          </p>

                          <p className="mt-1 truncate text-xs text-white/35">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                    >
                      <LogOut
                        size={15}
                        className="text-white/35 transition-colors group-hover:text-white/80"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signup"
                className="group relative hidden overflow-hidden rounded-full border border-white/[0.15] bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_5px_25px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 hover:shadow-[0_8px_35px_rgba(255,255,255,0.14)] sm:block"
              >
                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  Sign up
                </span>
              </Link>
            )}
          </div>

          {/* =====================================================
              MOBILE BUTTON
          ====================================================== */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white md:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        {isOpen && (
          <div className="border-t border-white/[0.07] bg-black/75 px-5 py-6 backdrop-blur-2xl md:hidden">
            <nav className="flex flex-col gap-2">

              {/* Mobile Navigation */}
              {mainNavigation.map((item) => {
                const isItinerary = item.href === "/itineraries";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300
                      ${
                        isItinerary
                          ? "border border-[#d4af37]/20 bg-[#d4af37]/[0.07] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/[0.12]"
                          : "border border-transparent hover:border-white/[0.08] hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`${ephesis.className} text-[22px] transition-colors duration-300 ${
                          isItinerary
                            ? "text-white"
                            : "text-white/65 group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </span>

                      {isItinerary && (
                        <span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-1.5 py-[2px] text-[8px] font-sans font-medium uppercase tracking-[0.14em] text-[#d4af37]">
                          Plan
                        </span>
                      )}
                    </div>

                    <span
                      className={`transition-all duration-300 group-hover:translate-x-1 ${
                        isItinerary
                          ? "text-[#d4af37]/60 group-hover:text-[#d4af37]"
                          : "text-white/20 group-hover:text-white/60"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <div className="group relative mt-4">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-white/70"
                />

                <input
                  type="text"
                  placeholder="Search destinations..."
                  aria-label="Search destinations"
                  className="h-12 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-300 focus:border-white/[0.25] focus:bg-white/[0.07] focus:shadow-[0_0_25px_rgba(255,255,255,0.05)]"
                />
              </div>

              {/* Mobile Auth */}
              {status === "loading" ? (
                <div className="mt-4 h-12 animate-pulse rounded-xl bg-white/[0.06]" />
              ) : user ? (
                <div className="mt-4 border-t border-white/[0.08] pt-5">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06]">
                      👤
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {firstName}
                      </p>

                      <p className="truncate text-xs text-white/35">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3 text-sm text-white/60 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white"
                  >
                    <LogOut
                      size={16}
                      className="text-white/40 transition-colors group-hover:text-white"
                    />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signup"
                  className="mt-4 rounded-xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}