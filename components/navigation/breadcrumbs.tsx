
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm"
    >
      <Link
        href="/"
        aria-label="Home"
        className="text-white/40 transition hover:text-white"
      >
        <Home size={15} />
      </Link>

      {items.map((item) => (
        <div
          key={`${item.label}-${item.href ?? "current"}`}
          className="flex items-center gap-2"
        >
          <ChevronRight
            size={14}
            className="text-white/20"
          />

          {item.href ? (
            <Link
              href={item.href}
              className="text-white/40 transition hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="max-w-[220px] truncate text-white/60">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

