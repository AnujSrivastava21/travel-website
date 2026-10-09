"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, Search } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { Ephesis } from "next/font/google";

import { mainNavigation } from "../../config/navigation";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Account";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);

    await signOut({ callbackUrl: "/" });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/[0.07] bg-black/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center px-5 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="flex flex-1 items-center justify-start">
            <Link href="/" onClick={closeMobileMenu} className="group shrink-0">
              <span
                className={`${ephesis.className} text-[30px] font-normal tracking-wide text-white/95 transition-colors group-hover:text-amber-200`}
              >
                The Local Route
              </span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.025] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex">
            {mainNavigation.map((item) => {
              const active = isActive(item.href);
              const isItinerary = item.href === "/itineraries";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative isolate overflow-hidden rounded-full px-4 py-2 text-[19px] transition-all duration-300 ${
                    ephesis.className
                  } ${
                    active
                      ? isItinerary
                        ? "bg-amber-300/[0.13] text-amber-200 shadow-[inset_0_0_0_1px_rgba(252,211,77,0.25)]"
                        : "bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                      : isItinerary
                        ? "text-amber-100/75 hover:bg-amber-300/[0.07] hover:text-amber-200"
                        : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {active && isItinerary && (
                    <span className="pointer-events-none absolute inset-0 -z-10 animate-pulse rounded-full bg-amber-300/[0.08]" />
                  )}
                  {item.title}
                  {active && (
                    <span
                      className={`absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full ${
                        isItinerary ? "bg-amber-300" : "bg-white/80"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* SEARCH + ACCOUNT */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {/* Search icon and expandable input */}
            <div ref={searchRef} className="relative hidden lg:block">
              {searchOpen && (
                <input
                  autoFocus
                  type="search"
                  placeholder="Search destinations..."
                  aria-label="Search destinations"
                  className="h-10 w-[230px] rounded-full border border-amber-300/40 bg-[#111]/95 pl-4 pr-12 text-[13px] text-white outline-none shadow-[0_0_24px_rgba(252,211,77,0.10)] placeholder:text-white/40 focus:border-amber-300/70 focus:bg-[#151515]"
                />
              )}

              <button
                type="button"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((value) => !value)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                  searchOpen
                    ? "absolute right-0 top-0 border-amber-300/40 bg-amber-300/10 text-amber-200"
                    : "border-white/[0.10] bg-white/[0.035] text-white/60 hover:border-amber-300/40 hover:bg-amber-300/[0.08] hover:text-amber-200"
                }`}
              >
                {searchOpen ? <X size={17} /> : <Search size={17} />}
              </button>
            </div>

            {/* Mobile search icon */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                setIsOpen(true);
                setSearchOpen((value) => !value);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.035] text-white/65 transition hover:border-amber-300/40 hover:bg-amber-300/[0.08] hover:text-amber-200 md:hidden"
            >
              <Search size={17} />
            </button>

            {/* ACCOUNT */}
            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-white/[0.06]" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={profileOpen}
                  aria-label="Open account menu"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.045] px-2 py-1.5 text-sm text-white/75 transition hover:border-white/[0.20] hover:bg-white/[0.08] hover:text-white"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.07] text-xs">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <span className="hidden max-w-20 truncate sm:block">
                    {firstName}
                  </span>

                  <ChevronDown
                    size={13}
                    className={`text-white/40 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0c0c0c]/95 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                    <div className="border-b border-white/[0.08] p-4">
                      <p className="truncate text-sm font-medium text-white">
                        {user.name ?? "Account"}
                      </p>
                      <p className="mt-1 truncate text-xs text-white/40">
                        {user.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-sm text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <LogOut
                        size={15}
                        className="text-white/35 group-hover:text-amber-200"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition hover:border-amber-300/30 hover:bg-amber-300/[0.08] hover:text-amber-200 md:hidden"
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {isOpen && (
          <div className="border-t border-white/[0.07] bg-black/95 px-5 py-5 backdrop-blur-2xl md:hidden">
            <nav className="flex flex-col gap-1">
              {mainNavigation.map((item) => {
                const active = isActive(item.href);
                const isItinerary = item.href === "/itineraries";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 ${
                      ephesis.className
                    } text-[22px] ${
                      active
                        ? isItinerary
                          ? "border-amber-300/25 bg-amber-300/[0.10] text-amber-200"
                          : "border-white/[0.10] bg-white/[0.07] font-semibold text-white"
                        : isItinerary
                          ? "border-transparent text-amber-100/80 hover:bg-amber-300/[0.06]"
                          : "border-transparent text-white/65 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ArrowRight
                      size={15}
                      className={active ? "text-amber-200" : "text-white/25"}
                    />
                  </Link>
                );
              })}

              {/* Mobile search input: visual only for now */}
              {searchOpen && (
                <input
                  autoFocus
                  type="search"
                  placeholder="Search destinations..."
                  aria-label="Search destinations"
                  className="mt-3 h-12 w-full rounded-xl border border-amber-300/35 bg-amber-300/[0.08] px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-amber-300/70"
                />
              )}

              {user && (
                <div className="mt-4 border-t border-white/[0.08] pt-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-white">
                      {user.name ?? firstName}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{user.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.07] hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
