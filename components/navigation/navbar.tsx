
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Search,
  ArrowRight,
  Compass,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { signOut, useSession } from "next-auth/react";
import { Ephesis } from "next/font/google";

import ItineraryMegaMenu from "./itinerary-mega-menu";
import { mainNavigation } from "../../config/navigation";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C58B35] focus-visible:ring-offset-2";

type NavbarProps = {
  hideNavbar?: boolean;
};

export function Navbar({ hideNavbar = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isItineraryMenuOpen, setIsItineraryMenuOpen] =
    useState(false);

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Account";

  const searchRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Close menus when navigating to another page.
  useEffect(() => {
    setIsItineraryMenuOpen(false);
    setIsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close the desktop search when clicking outside or pressing Escape.
  useEffect(() => {
    if (!searchOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
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
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  // Close the itinerary dropdown when clicking outside the navbar.
  useEffect(() => {
    if (!isItineraryMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsItineraryMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsItineraryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isItineraryMenuOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);
    setIsItineraryMenuOpen(false);

    await signOut({ callbackUrl: "/" });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
    setIsItineraryMenuOpen(false);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    window.location.href =
      `/destinations?search=${encodeURIComponent(query)}`;

    setSearchOpen(false);
  };

  if (hideNavbar) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        ref={navbarRef}
        className="relative mx-auto max-w-7xl"
      >
        {/* NAVBAR */}
        <div className="rounded-2xl border border-[#DED3C0]/80 bg-[#FFFCF6]/90 shadow-[0_12px_40px_-20px_rgba(20,33,61,0.30)] backdrop-blur-2xl">
          <div className="flex min-h-[66px] items-center px-3 sm:px-5 lg:px-6">
            {/* BRAND */}
            <div className="flex min-w-0 flex-1 items-center">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`group flex shrink-0 items-center gap-2.5 rounded-lg ${focusRing}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#D8C59F] bg-[#F1E6D1] text-[#14213D] transition duration-300 group-hover:-rotate-[8deg] group-hover:bg-[#E8D8B7]">
                  <Compass size={20} strokeWidth={1.6} />
                </span>

                <span className="flex flex-col">
                  <span
                    className={`${ephesis.className} whitespace-nowrap text-[28px] leading-none text-[#14213D] sm:text-[33px]`}
                  >
                    The Local Route
                  </span>

                  <span className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.24em] text-[#8A7755] sm:block">
                    Find your own way
                  </span>
                </span>
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {mainNavigation.map((item) => {
                const active = isActive(item.href);
                const isItineraries =
                  item.title.toLowerCase() === "itineraries";

                if (isItineraries) {
                  return (
                    <button
                      key={item.href}
                      type="button"
                      aria-expanded={isItineraryMenuOpen}
                      aria-haspopup="true"
                      onClick={() => {
                        setIsItineraryMenuOpen((open) => !open);
                        setProfileOpen(false);
                        setSearchOpen(false);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors xl:px-3.5 ${focusRing} ${
                        isItineraryMenuOpen || active
                          ? "bg-[#14213D] text-[#FFFCF6] shadow-sm"
                          : "text-[#59554B] hover:bg-[#F0E7D8] hover:text-[#14213D]"
                      }`}
                    >
                      {item.title}

                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isItineraryMenuOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className={`rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors xl:px-3.5 ${focusRing} ${
                      active
                        ? "bg-[#14213D] text-[#FFFCF6] shadow-sm"
                        : "text-[#59554B] hover:bg-[#F0E7D8] hover:text-[#14213D]"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT-SIDE ACTIONS */}
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2.5">
              {/* DESKTOP SEARCH */}
              <div
                ref={searchRef}
                className="relative hidden md:block"
              >
                {searchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="absolute right-0 top-0 z-30"
                  >
                    <input
                      autoFocus
                      type="search"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search destinations..."
                      aria-label="Search destinations"
                      className="h-10 w-[220px] rounded-full border border-[#D8C8A8] bg-white pl-4 pr-11 text-sm text-[#2B2A26] outline-none placeholder:text-[#8A8172] focus:ring-2 focus:ring-[#C58B35]/30 sm:w-[260px]"
                    />

                    <button
                      type="submit"
                      aria-label="Submit search"
                      className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-[#14213D] text-white transition hover:bg-[#285078]"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  aria-label={
                    searchOpen ? "Close search" : "Open search"
                  }
                  aria-expanded={searchOpen}
                  onClick={() => {
                    setSearchOpen((value) => !value);
                    setIsItineraryMenuOpen(false);
                  }}
                  className={`relative z-20 grid h-10 w-10 place-items-center rounded-full border border-[#E3D8C5] bg-white/80 text-[#14213D] transition hover:border-[#C7AC76] hover:bg-[#F3E8D3] ${focusRing} ${
                    searchOpen ? "invisible" : ""
                  }`}
                >
                  <Search size={17} strokeWidth={1.8} />
                </button>
              </div>

              {/* DESKTOP ACCOUNT */}
              {status === "loading" ? (
                <div className="h-10 w-10 animate-pulse rounded-full bg-[#E6DDCE]" />
              ) : user ? (
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    aria-expanded={profileOpen}
                    aria-label="Open account menu"
                    onClick={() => {
                      setProfileOpen((value) => !value);
                      setIsItineraryMenuOpen(false);
                    }}
                    className={`flex h-10 items-center gap-2 rounded-full border border-[#E3D8C5] bg-white/80 py-1 pl-1 pr-3 text-sm font-semibold text-[#14213D] transition hover:border-[#C7AC76] hover:bg-white ${focusRing}`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#14213D] text-xs font-semibold text-white">
                      {firstName.charAt(0).toUpperCase()}
                    </span>

                    <span className="hidden max-w-20 truncate md:block">
                      {firstName}
                    </span>

                    <ChevronDown
                      size={14}
                      className={`text-[#8A7755] transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-[#E3D8C5] bg-[#FFFCF6] shadow-[0_20px_60px_-20px_rgba(20,33,61,0.30)]">
                      <div className="border-b border-[#E8DFD0] bg-[#F5EFE3] p-4">
                        <p className="truncate text-sm font-semibold text-[#14213D]">
                          {user.name ?? "Account"}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#777064]">
                          {user.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-sm font-semibold text-[#3C3932] transition hover:bg-[#F4EFE4]"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EDE5D7] text-[#1E4F8F] group-hover:bg-[#E2D3B6]">
                          <LogOut size={15} />
                        </span>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {/* MOBILE SEARCH */}
              <button
                type="button"
                aria-label="Search destinations"
                onClick={() => {
                  setIsOpen(true);
                  setSearchOpen((value) => !value);
                  setIsItineraryMenuOpen(false);
                }}
                className={`grid h-10 w-10 place-items-center rounded-full border border-[#E3D8C5] bg-white/80 text-[#14213D] transition hover:bg-[#F3E8D3] md:hidden ${focusRing}`}
              >
                <Search size={17} />
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className={`grid h-10 w-10 place-items-center rounded-full border border-[#E3D8C5] bg-white/80 text-[#14213D] transition hover:bg-[#F3E8D3] lg:hidden ${focusRing}`}
                onClick={() => {
                  setIsOpen((value) => !value);
                  setIsItineraryMenuOpen(false);
                }}
              >
                {isOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="border-t border-[#E8DFD0] px-3 pb-4 pt-3 lg:hidden sm:px-5">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1.5"
              >
                {mainNavigation.map((item) => {
                  const active = isActive(item.href);
                  const isItineraries =
                    item.title.toLowerCase() === "itineraries";

                  if (isItineraries) {
                    return (
                      <button
                        key={item.href}
                        type="button"
                        aria-expanded={isItineraryMenuOpen}
                        onClick={() =>
                          setIsItineraryMenuOpen((open) => !open)
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                          isItineraryMenuOpen
                            ? "bg-[#14213D] text-[#FFFCF6]"
                            : "text-[#59554B] hover:bg-[#F0E7D8]"
                        }`}
                      >
                        <span>{item.title}</span>

                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isItineraryMenuOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-[#14213D] text-[#FFFCF6]"
                          : "text-[#59554B] hover:bg-[#F0E7D8] hover:text-[#14213D]"
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              {/* MOBILE ITINERARY DROPDOWN */}
              {isItineraryMenuOpen && (
                <div className="mt-3">
                  <ItineraryMegaMenu
                    variant="mobile"
                    onClose={closeMobileMenu}
                  />
                </div>
              )}

              {/* MOBILE SEARCH FORM */}
              {searchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="mt-3 flex gap-2"
                >
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search destinations..."
                    aria-label="Search destinations"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-[#D8C8A8] bg-white px-4 text-sm text-[#2B2A26] outline-none placeholder:text-[#8A8172] focus:ring-2 focus:ring-[#C58B35]/30"
                  />

                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#14213D] text-white transition hover:bg-[#285078]"
                  >
                    <ArrowRight size={17} />
                  </button>
                </form>
              )}

              {/* MOBILE ACCOUNT */}
              {user && (
                <div className="mt-4 border-t border-[#E8DFD0] pt-4 sm:hidden">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#14213D] text-sm font-semibold text-white">
                      {firstName.charAt(0).toUpperCase()}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#14213D]">
                        {user.name ?? firstName}
                      </p>

                      <p className="truncate text-xs text-[#777064]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border border-[#E3D8C5] bg-white px-4 py-3 text-sm font-semibold text-[#14213D] transition hover:bg-[#F0E7D8] ${focusRing}`}
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DESKTOP ITINERARY MEGA MENU */}
        {isItineraryMenuOpen && !isOpen && (
          <div className="hidden lg:block">
            <ItineraryMegaMenu
              variant="desktop"
              onClose={() => setIsItineraryMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}
