"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
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
      {/* Glass background */}
      <div className="border-b border-white/[0.08] bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group"
            onClick={() => {
              setIsOpen(false);
              setProfileOpen(false);
            }}
          >
            <span
              className={`${ephesis.className} text-3xl font-normal tracking-wide text-white transition-opacity duration-300 group-hover:opacity-70`}
            >
              The Local Route
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${ephesis.className} relative text-[20px] text-white/70 transition-colors duration-300 hover:text-white`}
              >
                {item.title}

                {/* Minimal hover line */}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Auth */}
            {status === "loading" ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/80 backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    👤
                  </div>

                  <span className="max-w-24 truncate">{firstName}</span>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-2xl">
                    <div className="border-b border-white/10 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                          👤
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {firstName}
                          </p>

                          <p className="mt-1 truncate text-xs text-white/40">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-sm text-white/80 backdrop-blur-md transition duration-300 hover:border-white/30 hover:bg-white hover:text-black"
              >
                Sign in
              </Link>
            )}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="text-white/80 transition hover:text-white md:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-white/[0.08] bg-black/60 px-6 py-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-5">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${ephesis.className} text-[22px] text-white/75 transition hover:text-white`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              {status === "loading" ? (
                <div className="h-12 animate-pulse rounded-xl bg-white/10" />
              ) : user ? (
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      👤
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {firstName}
                      </p>

                      <p className="truncate text-xs text-white/40">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-center text-sm text-white/80 transition hover:bg-white hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}