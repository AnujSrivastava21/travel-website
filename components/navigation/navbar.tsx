
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { NavbarSearchResults } from "../../components/search/navbar-search-results";

const ephesis = Ephesis({
  subsets: ["latin"],
  weight: "400",
});

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6F0]";

type NavbarProps = {
  hideNavbar?: boolean;
};

export function Navbar({ hideNavbar = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isItineraryMenuOpen, setIsItineraryMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Account";

  const searchRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Close menus when the route changes.
  useEffect(() => {
    setIsItineraryMenuOpen(false);
    setIsOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close desktop search when clicking outside or pressing Escape.
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

  // Close the itinerary menu when clicking outside the navbar.
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
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isItineraryMenuOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
    setIsItineraryMenuOpen(false);
  };

  const closeSearchResults = () => {
    setSearchQuery("");
    setSearchOpen(false);
    setIsOpen(false);
  };

  // Preserve the existing homepage search-results behavior.
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    setSearchOpen(false);
    setIsOpen(false);
    setProfileOpen(false);
    setIsItineraryMenuOpen(false);

    router.push(
      `/?search=${encodeURIComponent(query)}#home-search-results`,
    );
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);
    setSearchOpen(false);
    setIsItineraryMenuOpen(false);

    await signOut({ callbackUrl: "/" });
  };

  if (hideNavbar) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        ref={navbarRef}
        className="relative mx-auto max-w-7xl"
      >
        {/* NAVBAR */}
        <div className="rounded-2xl border border-[#EAE5D9]/90 bg-[#F8F6F0]/95 shadow-[0_12px_40px_-20px_rgba(29,48,39,0.25)] backdrop-blur-2xl">
          <div className="flex min-h-[66px] items-center px-3 sm:px-5 lg:px-6">
            {/* BRAND */}
            <div className="flex min-w-0 flex-1 items-center">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`group flex shrink-0 items-center gap-2.5 rounded-lg ${focusRing}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#EAE5D9] bg-[#E4EADF] text-[#263D32] transition duration-300 group-hover:-rotate-[8deg] group-hover:bg-[#D7E0D3]">
                  <Compass size={20} strokeWidth={1.6} />
                </span>

                <span className="flex flex-col">
                  <span
                    className={`${ephesis.className} whitespace-nowrap text-[28px] leading-none text-[#263D32] sm:text-[33px]`}
                  >
                    The Local Route
                  </span>

                  <span className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.24em] text-[#626A5D] sm:block">
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
                          ? "bg-[#263D32] text-[#FFFEFA] shadow-sm"
                          : "text-[#263D32] hover:bg-[#E4EADF] hover:text-[#1D3027]"
                      }`}
                    >
                      {item.title}

                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isItineraryMenuOpen ? "rotate-180" : ""
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
                        ? "bg-[#263D32] text-[#FFFEFA] shadow-sm"
                        : "text-[#263D32] hover:bg-[#E4EADF] hover:text-[#1D3027]"
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
                  <>
                    <form
                      onSubmit={handleSearch}
                      role="search"
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
                        aria-label="Search itineraries by destination or location"
                        className="h-10 w-[220px] rounded-full border border-[#EAE5D9] bg-[#FFFEFA] pl-4 pr-11 text-sm text-[#303A32] outline-none placeholder:text-[#626A5D] focus:border-[#A16F35] focus:ring-2 focus:ring-[#A16F35]/20 sm:w-[260px]"
                      />

                      <button
                        type="submit"
                        aria-label="Submit itinerary search"
                        className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-[#A16F35] text-white transition hover:bg-[#8E5E2D]"
                      >
                        <ArrowRight size={15} />
                      </button>
                    </form>

                    {/* DESKTOP SEARCH DROPDOWN */}
                    {searchQuery.trim() && (
                      <div className="absolute right-0 top-12 z-[110] w-[min(90vw,420px)] min-w-0">
                        <NavbarSearchResults
                          query={searchQuery}
                          onSelect={closeSearchResults}
                        />
                      </div>
                    )}
                  </>
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
                    setProfileOpen(false);
                  }}
                  className={`relative z-20 grid h-10 w-10 place-items-center rounded-full border border-[#EAE5D9] bg-[#FFFEFA] text-[#263D32] transition hover:border-[#A16F35] hover:bg-[#E4EADF] ${focusRing} ${
                    searchOpen ? "invisible" : ""
                  }`}
                >
                  <Search size={17} strokeWidth={1.8} />
                </button>
              </div>

              {/* DESKTOP ACCOUNT */}
              {status === "loading" ? (
                <div className="hidden h-10 w-10 animate-pulse rounded-full bg-[#E4EADF] sm:block" />
              ) : user ? (
                <div className="relative hidden sm:block">
                  <button
                    type="button"
                    aria-expanded={profileOpen}
                    aria-label="Open account menu"
                    onClick={() => {
                      setProfileOpen((value) => !value);
                      setIsItineraryMenuOpen(false);
                      setSearchOpen(false);
                    }}
                    className={`flex h-10 items-center gap-2 rounded-full border border-[#EAE5D9] bg-[#FFFEFA] py-1 pl-1 pr-3 text-sm font-semibold text-[#263D32] transition hover:border-[#A16F35] hover:bg-[#F8F6F0] ${focusRing}`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#263D32] text-xs font-semibold text-[#FFFEFA]">
                      {firstName.charAt(0).toUpperCase()}
                    </span>

                    <span className="hidden max-w-20 truncate md:block">
                      {firstName}
                    </span>

                    <ChevronDown
                      size={14}
                      className={`text-[#626A5D] transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] shadow-[0_20px_60px_-20px_rgba(29,48,39,0.25)]">
                      <div className="border-b border-[#EAE5D9] bg-[#F8F6F0] p-4">
                        <p className="truncate text-sm font-semibold text-[#263D32]">
                          {user.name ?? "Account"}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#626A5D]">
                          {user.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-sm font-semibold text-[#303A32] transition hover:bg-[#E4EADF]"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E4EADF] text-[#263D32] transition group-hover:bg-[#D7E0D3]">
                          <LogOut size={15} />
                        </span>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {/* MOBILE SEARCH BUTTON */}
              <button
                type="button"
                aria-label={
                  searchOpen ? "Close search" : "Search itineraries"
                }
                aria-expanded={searchOpen}
                onClick={() => {
                  setIsOpen(true);
                  setSearchOpen((value) => !value);
                  setIsItineraryMenuOpen(false);
                  setProfileOpen(false);
                }}
                className={`grid h-10 w-10 place-items-center rounded-full border border-[#EAE5D9] bg-[#FFFEFA] text-[#263D32] transition hover:border-[#A16F35] hover:bg-[#E4EADF] md:hidden ${focusRing}`}
              >
                {searchOpen ? <X size={17} /> : <Search size={17} />}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className={`grid h-10 w-10 place-items-center rounded-full border border-[#EAE5D9] bg-[#FFFEFA] text-[#263D32] transition hover:border-[#A16F35] hover:bg-[#E4EADF] lg:hidden ${focusRing}`}
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
            <div className="border-t border-[#EAE5D9] px-3 pb-4 pt-3 lg:hidden sm:px-5">
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
                        onClick={() => {
                          setIsItineraryMenuOpen((open) => !open);
                          setSearchOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                          isItineraryMenuOpen
                            ? "bg-[#263D32] text-[#FFFEFA]"
                            : "text-[#263D32] hover:bg-[#E4EADF]"
                        }`}
                      >
                        <span>{item.title}</span>

                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            isItineraryMenuOpen ? "rotate-180" : ""
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
                          ? "bg-[#263D32] text-[#FFFEFA]"
                          : "text-[#263D32] hover:bg-[#E4EADF] hover:text-[#1D3027]"
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

              {/* MOBILE SEARCH + RESULTS */}
              {searchOpen && (
                <div className="relative mt-3">
                  <form
                    onSubmit={handleSearch}
                    role="search"
                    className="flex gap-2"
                  >
                    <input
                      autoFocus
                      type="search"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search destinations..."
                      aria-label="Search itineraries by destination or location"
                      className="h-11 min-w-0 flex-1 rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] px-4 text-sm text-[#303A32] outline-none placeholder:text-[#626A5D] focus:border-[#A16F35] focus:ring-2 focus:ring-[#A16F35]/20"
                    />

                    <button
                      type="submit"
                      aria-label="Submit itinerary search"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#A16F35] text-white transition hover:bg-[#8E5E2D]"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </form>

                  {searchQuery.trim() && (
                    <div className="relative z-[110] mt-2">
                      <NavbarSearchResults
                        query={searchQuery}
                        onSelect={closeSearchResults}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* MOBILE ACCOUNT */}
              {user && (
                <div className="mt-4 border-t border-[#EAE5D9] pt-4 sm:hidden">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#263D32] text-sm font-semibold text-[#FFFEFA]">
                      {firstName.charAt(0).toUpperCase()}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#263D32]">
                        {user.name ?? firstName}
                      </p>

                      <p className="truncate text-xs text-[#626A5D]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border border-[#EAE5D9] bg-[#FFFEFA] px-4 py-3 text-sm font-semibold text-[#263D32] transition hover:bg-[#E4EADF] ${focusRing}`}
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
