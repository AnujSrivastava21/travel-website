"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Eye,
  IndianRupee,
  Info,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Metrics = {
  totalViews: number;
  paynowClicks: number;
  demoSuccesses: number;
  estimatedDemoRevenue: number;
  viewToClickRate: number;
  demoSuccessRate: number;
};

type ItineraryAnalytics = {
  id: number | string;
  slug: string;
  title: string;
  views: number;
  paynowClicks: number;
  demoSuccesses: number;
  estimatedDemoRevenue: number;
};

type AnalyticsResponse = {
  success: boolean;
  metrics: Metrics;
  topItineraries: ItineraryAnalytics[];
  error?: string;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value ?? 0);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

const percent = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0;

const C = {
  views: "#356345",
  clicks: "#D09A3E",
  success: "#365D91",
  revenue: "#8A5A36",
  ink: "#263D32",
  muted: "#626A5D",
  faint: "#8C8577",
  line: "#E9E4D8",
  track: "#F1EEE4",
};

const SLICES = ["#356345", "#D09A3E", "#365D91", "#8A5A36", "#7FA383", "#C9BC9F"];

const card = "rounded-xl border border-[#E9E4D8] bg-white";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadAnalytics = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analytics/summary", {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to load analytics data.");
      }

      setData(result as AnalyticsResponse);
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading analytics.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const metrics = data?.metrics;
  const items = useMemo(() => data?.topItineraries ?? [], [data]);
  const waiting = loading && !data;
  const isEmpty = !waiting && (metrics?.totalViews ?? 0) === 0;
  const insights = useMemo(() => buildInsights(metrics, items), [metrics, items]);

  const kpis = [
    {
      label: "Views",
      value: metrics?.totalViews ?? 0,
      fmt: formatNumber,
      icon: Eye,
      color: C.views,
      bg: "#E8F0E8",
      tip: "Times an itinerary page was opened",
    },
    {
      label: "PayNow clicks",
      value: metrics?.paynowClicks ?? 0,
      fmt: formatNumber,
      icon: MousePointerClick,
      color: "#A9741F",
      bg: "#F8EFDB",
      tip: "Times the PayNow button was pressed",
    },
    {
      label: "Demo successes",
      value: metrics?.demoSuccesses ?? 0,
      fmt: formatNumber,
      icon: CreditCard,
      color: C.success,
      bg: "#E8EEF7",
      tip: "Demo success screens shown. No real payment",
    },
    {
      label: "Demo revenue",
      value: metrics?.estimatedDemoRevenue ?? 0,
      fmt: formatCurrency,
      icon: IndianRupee,
      color: C.revenue,
      bg: "#F4E9DF",
      tip: "Pretend revenue. Not real income",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5EE] px-4 py-5 text-[#303A32] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#263D32] sm:text-3xl">
              Analytics
            </h1>
            <p className="mt-0.5 text-sm text-[#626A5D]">
              The Local Route · how travellers use your itineraries
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="hidden text-xs text-[#8C8577] sm:inline">
                Updated {lastUpdated.toLocaleTimeString("en-IN")}
              </span>
            )}
            <button
              type="button"
              onClick={() => void loadAnalytics(true)}
              disabled={loading || refreshing}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E9E4D8] bg-white px-3 text-sm font-medium text-[#263D32] hover:bg-[#F1EBDD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#356345] disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={refreshing || loading ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing" : "Refresh"}
            </button>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-red-900">
                Analytics could not be loaded
              </p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadAnalytics(true)}
              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* KPI row */}
        <section
          aria-label="Key numbers"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <article key={k.label} className={`${card} p-4`} title={k.tip}>
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                    style={{ backgroundColor: k.bg }}
                  >
                    <Icon size={16} color={k.color} />
                  </span>
                  <p className="text-sm text-[#626A5D]">{k.label}</p>
                </div>
                <p className="mt-3 truncate text-2xl font-bold tabular-nums tracking-tight text-[#263D32]">
                  {waiting ? "—" : k.fmt(k.value)}
                </p>
                <p className="mt-1 text-xs leading-4 text-[#8C8577]">{k.tip}</p>
              </article>
            );
          })}
        </section>

        {/* Funnel + insights */}
        <section className="grid gap-3 lg:grid-cols-5">
          <article className={`${card} p-4 lg:col-span-3`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-[#263D32]">
                  Traveller journey
                </h2>
                <p className="text-xs text-[#8C8577]">
                  From viewing an itinerary to the demo success screen
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                <Pill color={C.clicks} label="View → click" value={metrics?.viewToClickRate} waiting={waiting} />
                <Pill color={C.success} label="Click → success" value={metrics?.demoSuccessRate} waiting={waiting} />
              </div>
            </div>

            {isEmpty ? (
              <Empty text="The journey chart appears after the first views." />
            ) : (
              <Funnel
                waiting={waiting}
                steps={[
                  { label: "Viewed itinerary", value: metrics?.totalViews ?? 0, color: C.views },
                  { label: "Clicked PayNow", value: metrics?.paynowClicks ?? 0, color: C.clicks },
                  { label: "Demo success", value: metrics?.demoSuccesses ?? 0, color: C.success },
                ]}
              />
            )}
          </article>

          <article className={`${card} p-4 lg:col-span-2`}>
            <h2 className="text-sm font-semibold text-[#263D32]">
              What this means
            </h2>
            {waiting ? (
              <p className="mt-3 text-sm text-[#8C8577]">Reading numbers...</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] leading-5 text-[#35433A]">
                    {insight.tone === "good" ? (
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#356345]" />
                    ) : insight.tone === "warn" ? (
                      <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#B5701B]" />
                    ) : (
                      <Info size={15} className="mt-0.5 shrink-0 text-[#365D91]" />
                    )}
                    <span>{insight.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>

        {/* Charts */}
        <section className="grid gap-3 lg:grid-cols-5">
          <article className={`${card} p-4 lg:col-span-3`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-[#263D32]">
                  Itinerary comparison
                </h2>
                <p className="text-xs text-[#8C8577]">
                  Top itineraries by views
                </p>
              </div>
              <div className="flex gap-3 text-xs text-[#626A5D]">
                <Legend color={C.views} label="Views" />
                <Legend color={C.clicks} label="Clicks" />
                <Legend color={C.success} label="Successes" />
              </div>
            </div>

            {waiting ? (
              <p className="py-10 text-center text-sm text-[#8C8577]">Loading...</p>
            ) : items.length === 0 ? (
              <Empty text="No itinerary data yet." />
            ) : (
              <ColumnChart items={items.slice(0, 8)} />
            )}
          </article>

          <article className={`${card} p-4 lg:col-span-2`}>
            <h2 className="text-sm font-semibold text-[#263D32]">
              Share of views
            </h2>
            <p className="text-xs text-[#8C8577]">Where the attention goes</p>

            {waiting ? (
              <p className="py-10 text-center text-sm text-[#8C8577]">Loading...</p>
            ) : items.length === 0 ? (
              <Empty text="No itinerary data yet." />
            ) : (
              <Donut items={items} />
            )}
          </article>
        </section>

        {/* Table */}
        <section className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between gap-3 border-b border-[#E9E4D8] px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-[#263D32]">
                Top-performing itineraries
              </h2>
              <p className="text-xs text-[#8C8577]">
                Click rate = PayNow clicks ÷ views
              </p>
            </div>
            <span className="rounded-full bg-[#F1EBDD] px-2.5 py-1 text-xs font-medium text-[#8A5A36]">
              Top 10
            </span>
          </div>

          {waiting ? (
            <p className="p-6 text-center text-sm text-[#8C8577]">Loading...</p>
          ) : items.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-[#263D32]">No analytics yet</p>
              <p className="mt-1 text-xs text-[#8C8577]">
                Open an itinerary and click PayNow. Numbers will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#FBFAF6] text-xs text-[#8C8577]">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Itinerary</th>
                    <th className="px-3 py-2.5 text-right font-medium">Views</th>
                    <th className="px-3 py-2.5 text-right font-medium">Clicks</th>
                    <th className="px-3 py-2.5 text-right font-medium">Click rate</th>
                    <th className="px-3 py-2.5 text-right font-medium">Successes</th>
                    <th className="px-4 py-2.5 text-right font-medium">Demo revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4D8]">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-[#FBFAF6]">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#F1EBDD] text-xs font-semibold text-[#8A5A36]">
                            {index + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="max-w-[260px] truncate font-medium text-[#263D32]">
                              {item.title}
                            </p>
                            <p className="max-w-[260px] truncate text-xs text-[#8C8577]">
                              {item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-medium">
                        {formatNumber(item.views)}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums">
                        {formatNumber(item.paynowClicks)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <RateBadge
                          rate={percent(item.paynowClicks, item.views)}
                          views={item.views}
                        />
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums">
                        {formatNumber(item.demoSuccesses)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-medium text-[#8A5A36]">
                        {formatCurrency(item.estimatedDemoRevenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Notes */}
        <details className="rounded-xl border border-[#E5D7B9] bg-[#F4EEDF] px-4 py-3 text-xs leading-5 text-[#715F47]">
          <summary className="cursor-pointer text-sm font-medium text-[#634A2A]">
            How to read these numbers
          </summary>
          <ul className="mt-2 space-y-1">
            <li>Views count recorded itinerary visits.</li>
            <li>PayNow clicks count button presses. Repeated clicks are counted, so rates can pass 100%.</li>
            <li>Demo successes and demo revenue are frontend events, not verified payments or real income.</li>
            <li>Per-user analytics will need authenticated user IDs in the tracking APIs.</li>
          </ul>
        </details>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

type Insight = { tone: "good" | "warn" | "info"; text: string };

function buildInsights(
  metrics: Metrics | undefined,
  items: ItineraryAnalytics[],
): Insight[] {
  if (!metrics) return [];

  if (metrics.totalViews === 0) {
    return [
      {
        tone: "info",
        text: "No visits recorded yet. Share an itinerary link to start collecting data.",
      },
    ];
  }

  const out: Insight[] = [];

  if (metrics.viewToClickRate >= 10) {
    out.push({
      tone: "good",
      text: `Good interest: about ${metrics.viewToClickRate} of every 100 views lead to a PayNow click.`,
    });
  } else if (metrics.viewToClickRate > 0) {
    out.push({
      tone: "warn",
      text: `Only ${metrics.viewToClickRate} of every 100 views lead to a PayNow click. Try clearer prices or a more visible button.`,
    });
  } else {
    out.push({
      tone: "warn",
      text: "Nobody has clicked PayNow yet. Check the button is visible and working.",
    });
  }

  if (metrics.paynowClicks > 0) {
    out.push(
      metrics.demoSuccessRate >= 50
        ? {
            tone: "good",
            text: "Most PayNow clicks reach the success screen. The payment flow looks smooth.",
          }
        : {
            tone: "warn",
            text: "Many PayNow clicks do not reach the success screen. Test the payment flow.",
          },
    );
  }

  if (items.length > 0) {
    out.push({
      tone: "info",
      text: `Most viewed: “${items[0].title}” with ${formatNumber(items[0].views)} views.`,
    });

    const stuck = items.filter((i) => i.views >= 5 && i.paynowClicks === 0);
    if (stuck.length > 0) {
      out.push({
        tone: "warn",
        text: `${stuck.length} itinerar${stuck.length === 1 ? "y has" : "ies have"} views but no PayNow clicks, e.g. “${stuck[0].title}”.`,
      });
    }
  }

  return out;
}

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function Pill({
  color,
  label,
  value,
  waiting,
}: {
  color: string;
  label: string;
  value?: number;
  waiting: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E4D8] bg-[#FBFAF6] px-2.5 py-1 text-[#626A5D]">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
      <strong className="tabular-nums text-[#263D32]">
        {waiting ? "—" : `${value ?? 0}%`}
      </strong>
    </span>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-[#E9E4D8] bg-[#FBFAF6] px-4 py-8 text-center text-xs text-[#8C8577]">
      {text}
    </p>
  );
}

function Funnel({
  steps,
  waiting,
}: {
  steps: { label: string; value: number; color: string }[];
  waiting: boolean;
}) {
  const widest = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="mt-4 space-y-3">
      {steps.map((step, i) => {
        const prev = i > 0 ? steps[i - 1].value : null;
        const width = step.value > 0 ? Math.max((step.value / widest) * 100, 2) : 0;
        return (
          <div key={step.label} className="grid grid-cols-[110px_1fr] items-center gap-3 sm:grid-cols-[130px_1fr]">
            <div>
              <p className="text-[13px] font-medium text-[#263D32]">{step.label}</p>
              {prev !== null && !waiting && (
                <p className="text-xs text-[#8C8577]">
                  {percent(step.value, prev)}% of previous
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 flex-1 overflow-hidden rounded-md bg-[#F1EEE4]">
                <div
                  className="h-full rounded-md transition-all duration-500"
                  style={{ width: `${width}%`, backgroundColor: step.color }}
                />
              </div>
              <span className="w-12 text-right text-sm font-semibold tabular-nums text-[#263D32]">
                {waiting ? "—" : formatNumber(step.value)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ColumnChart({ items }: { items: ItineraryAnalytics[] }) {
  const max = Math.max(
    ...items.flatMap((r) => [r.views, r.paynowClicks, r.demoSuccesses]),
    1,
  );
  const ticks = [1, 0.5, 0];

  return (
    <div className="mt-4 flex gap-2">
      {/* Y axis */}
      <div className="flex h-44 flex-col justify-between pb-0 text-right text-[10px] leading-none tabular-nums text-[#8C8577]">
        {ticks.map((t) => (
          <span key={t}>{formatNumber(Math.round(max * t))}</span>
        ))}
      </div>

      <div className="relative min-w-0 flex-1 overflow-x-auto">
        <div className="relative min-w-fit">
          {/* gridlines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-44 flex-col justify-between">
            {ticks.map((t) => (
              <div key={t} className="border-t border-dashed border-[#E9E4D8]" />
            ))}
          </div>

          <div className="relative flex gap-3">
            {items.map((row) => (
              <div
                key={row.id}
                className="flex min-w-[64px] flex-1 flex-col items-center"
                title={`${row.title}\nViews: ${row.views}\nClicks: ${row.paynowClicks}\nSuccesses: ${row.demoSuccesses}`}
              >
                <div className="flex h-44 w-full items-end justify-center gap-1">
                  {[
                    { v: row.views, c: C.views },
                    { v: row.paynowClicks, c: C.clicks },
                    { v: row.demoSuccesses, c: C.success },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="w-3.5 rounded-t-sm transition-all duration-500 sm:w-4"
                      style={{
                        height: `${(b.v / max) * 100}%`,
                        minHeight: b.v > 0 ? 3 : 0,
                        backgroundColor: b.c,
                      }}
                    />
                  ))}
                </div>
                <p className="mt-2 w-full truncate text-center text-[11px] font-medium text-[#35433A]">
                  {row.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Donut({ items }: { items: ItineraryAnalytics[] }) {
  const total = items.reduce((s, i) => s + i.views, 0);
  const top = items.slice(0, 5);
  const other = items.slice(5).reduce((s, i) => s + i.views, 0);
  const slices = [
    ...top.map((i) => ({ label: i.title, value: i.views })),
    ...(other > 0 ? [{ label: "Others", value: other }] : []),
  ];

  const r = 40;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="mt-4 flex items-center gap-4">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        role="img"
        aria-label="Share of views by itinerary"
        className="shrink-0"
      >
        <circle cx="60" cy="60" r={r} fill="none" stroke={C.track} strokeWidth="18" />
        {total > 0 &&
          slices.map((s, i) => {
            const len = (s.value / total) * circ;
            const el = (
              <circle
                key={s.label + i}
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={SLICES[i % SLICES.length]}
                strokeWidth="18"
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 60 60)"
              />
            );
            offset += len;
            return el;
          })}
        <text x="60" y="58" textAnchor="middle" className="fill-[#263D32]" style={{ fontSize: 16, fontWeight: 700 }}>
          {formatNumber(total)}
        </text>
        <text x="60" y="73" textAnchor="middle" className="fill-[#8C8577]" style={{ fontSize: 9 }}>
          views
        </text>
      </svg>

      <ul className="min-w-0 flex-1 space-y-1.5">
        {slices.map((s, i) => (
          <li key={s.label + i} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: SLICES[i % SLICES.length] }}
            />
            <span className="min-w-0 flex-1 truncate text-[#35433A]" title={s.label}>
              {s.label}
            </span>
            <span className="shrink-0 tabular-nums text-[#626A5D]">
              {percent(s.value, total)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RateBadge({ rate, views }: { rate: number; views: number }) {
  let style = "bg-[#E8F0E8] text-[#2A5238]";
  let text = "Strong";

  if (views === 0) {
    style = "bg-[#F1EEE4] text-[#626A5D]";
    text = "No views";
  } else if (rate === 0) {
    style = "bg-[#FBE9E7] text-[#9A3A2E]";
    text = "No clicks";
  } else if (rate < 10) {
    style = "bg-[#F8EFDB] text-[#7A5416]";
    text = "Low";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${style}`}>
      <span className="tabular-nums">{rate}%</span>
      <span className="opacity-75">{text}</span>
    </span>
  );
}