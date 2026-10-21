
"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

/* ───────────────────── Types ───────────────────── */

export type PlanId = "free" | "starter" | "pro" | "premium";

export type Plan = {
  id: PlanId;
  name: string;
  priceLabel: string;
  price: number;
  color: string;
};

export type TopItinerary = {
  title: string;
  plan: PlanId;
  views: number;
  change: number;
};

export type DashboardData = {
  plans: Plan[];
  daily: Record<PlanId, number[]>;
  conversion: Record<PlanId, number>;
  top: TopItinerary[];
};

/* ───────────────────── Sample Data ───────────────────── */
/* Replace this with your real analytics API data when ready. */

const PLANS: Plan[] = [
  { id: "free", name: "Free", priceLabel: "₹0", price: 0, color: "#7a8b93" },
  { id: "starter", name: "Starter", priceLabel: "₹29–49", price: 39, color: "#1e8e8a" },
  { id: "pro", name: "Pro", priceLabel: "₹99", price: 99, color: "#4c5fd5" },
  { id: "premium", name: "Premium", priceLabel: "₹149", price: 149, color: "#d9912b" },
];

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;

    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(): DashboardData {
  const base: Record<PlanId, number> = {
    free: 420,
    starter: 130,
    pro: 90,
    premium: 40,
  };

  const daily = {} as Record<PlanId, number[]>;

  PLANS.forEach((plan, index) => {
    const random = rng(11 + index * 7);

    daily[plan.id] = Array.from({ length: 180 }, (_, dayIndex) => {
      const weekend = dayIndex % 7 === 5 || dayIndex % 7 === 6;
      const trend = 1 + dayIndex * 0.004;
      const weekendFactor = weekend ? 1.15 : 1;

      return Math.round(
        base[plan.id] * trend * weekendFactor * (0.85 + random() * 0.3)
      );
    });
  });

  return {
    plans: PLANS,
    daily,
    conversion: {
      free: 0,
      starter: 0.024,
      pro: 0.031,
      premium: 0.018,
    },
    top: [
      {
        title: "Kerala — 7 Day Complete Itinerary",
        plan: "starter",
        views: 5120,
        change: 12.4,
      },
      {
        title: "Udaipur — 3 Day Weekend Itinerary",
        plan: "free",
        views: 4780,
        change: 5.1,
      },
      {
        title: "Spiti Valley — 10 Day Complete Itinerary",
        plan: "free",
        views: 3960,
        change: -3.2,
      },
      {
        title: "Guwahati, Shillong and Dawki — 7 Days",
        plan: "pro",
        views: 2410,
        change: 18.9,
      },
      {
        title: "Hornbill Festival, Nagaland — 7 Days",
        plan: "pro",
        views: 1880,
        change: 41,
      },
      {
        title: "Aizawl and Mizoram — 4N/5D",
        plan: "premium",
        views: 960,
        change: 7.6,
      },
    ],
  };
}

/* ───────────────────── Helpers ───────────────────── */

const RANGES = [7, 30, 90] as const;

const nf = new Intl.NumberFormat("en-IN");

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);

const pct = (current: number, previous: number) => {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
};

const compact = (value: number) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;

  return String(Math.round(value));
};

const day = (date: Date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

function niceMax(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 1;

  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const step = magnitude / 2;

  return Math.max(step, Math.ceil((value * 1.1) / step) * step);
}

/**
 * Returns a fixed-size date window.
 * Missing earlier data is padded with zeroes.
 * offset = 0 means current period.
 * offset = 1 means the preceding period.
 */
function getWindow(
  values: number[],
  length: number,
  offset = 0
): number[] {
  const safeValues = Array.isArray(values)
    ? values.map((value) =>
        Number.isFinite(value) && value > 0 ? value : 0
      )
    : [];

  const end = Math.max(0, safeValues.length - offset * length);
  const start = Math.max(0, end - length);
  const selected = safeValues.slice(start, end);

  return [
    ...Array(Math.max(0, length - selected.length)).fill(0),
    ...selected,
  ];
}

/* ───────────────────── Small Components ───────────────────── */

function Delta({ value }: { value: number }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const up = safeValue >= 0;

  return (
    <span
      className={`dz-delta ${up ? "up" : "down"}`}
      aria-label={`${up ? "up" : "down"} ${Math.abs(safeValue).toFixed(1)} percent`}
    >
      {up ? "▲" : "▼"} {Math.abs(safeValue).toFixed(1)}%
    </span>
  );
}

function Spark({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  const safeValues = values.length ? values : [0, 0];

  const max = Math.max(...safeValues);
  const min = Math.min(...safeValues);
  const denominator = max - min || 1;

  const points = safeValues
    .map((value, index) => {
      const x =
        safeValues.length === 1
          ? 50
          : (index / (safeValues.length - 1)) * 100;

      const y = 28 - ((value - min) / denominator) * 26;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="dz-spark"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ───────────────────── Views Chart ───────────────────── */

function ViewsChart({
  plans,
  series,
  prev,
  dates,
}: {
  plans: Plan[];
  series: number[][];
  prev: number[];
  dates: Date[];
}) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 860;
  const H = 300;
  const L = 46;
  const R = 12;
  const T = 12;
  const B = 28;

  const n = dates.length;

  if (n === 0) {
    return <p className="dz-empty">No chart data available.</p>;
  }

  const safeSeries = plans.map((_, index) =>
    Array.from({ length: n }, (_, i) => {
      const value = series[index]?.[i] ?? 0;
      return Number.isFinite(value) && value > 0 ? value : 0;
    })
  );

  const safePrev = Array.from({ length: n }, (_, index) => {
    const value = prev[index] ?? 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  });

  const totals = dates.map((_, index) =>
    safeSeries.reduce((total, values) => total + values[index], 0)
  );

  const max = niceMax(Math.max(...totals, ...safePrev, 1));

  const x = (index: number) =>
    n === 1
      ? L + (W - L - R) / 2
      : L + (index / (n - 1)) * (W - L - R);

  const y = (value: number) =>
    T + (1 - value / max) * (H - T - B);

  const layers = plans.map((plan, index) => {
    const lower = dates.map((_, i) =>
      safeSeries
        .slice(0, index)
        .reduce((total, values) => total + values[i], 0)
    );

    const upper = dates.map(
      (_, i) => lower[i] + safeSeries[index][i]
    );

    const upperPath = upper
      .map(
        (value, i) =>
          `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(value).toFixed(1)}`
      )
      .join("");

    const lowerPath = lower
      .map((_, i) => {
        const indexFromEnd = n - 1 - i;
        return `L${x(indexFromEnd).toFixed(1)},${y(lower[indexFromEnd]).toFixed(1)}`;
      })
      .join("");

    return {
      plan,
      path: `${upperPath}${lowerPath}Z`,
    };
  });

  const previousPath = safePrev
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(value).toFixed(1)}`
    )
    .join("");

  const ticks = [0, 0.25, 0.5, 0.75, 1].map(
    (fraction) => fraction * max
  );

  const tickCount = Math.min(6, n);

  const xTicks = Array.from({ length: tickCount }, (_, index) =>
    tickCount === 1
      ? 0
      : Math.round((index / (tickCount - 1)) * (n - 1))
  );

  function move(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    if (!rect.width) return;

    const pixel = ((event.clientX - rect.left) / rect.width) * W;

    const index =
      n === 1
        ? 0
        : Math.round(((pixel - L) / (W - L - R)) * (n - 1));

    setHover(Math.max(0, Math.min(n - 1, index)));
  }

  return (
    <div
      className="dz-chart"
      onMouseMove={move}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Daily views stacked by plan, compared with the previous period"
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={L}
              x2={W - R}
              y1={y(tick)}
              y2={y(tick)}
              className="dz-grid"
            />
            <text
              x={L - 8}
              y={y(tick) + 4}
              textAnchor="end"
              className="dz-axis"
            >
              {compact(Math.round(tick))}
            </text>
          </g>
        ))}

        {layers.map(({ plan, path }) => (
          <path
            key={plan.id}
            d={path}
            fill={plan.color}
            fillOpacity="0.82"
            stroke="var(--dz-surface)"
            strokeWidth="0.8"
          />
        ))}

        <path
          d={previousPath}
          fill="none"
          stroke="var(--dz-ink)"
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />

        {xTicks.map((index) => (
          <text
            key={index}
            x={x(index)}
            y={H - 8}
            textAnchor="middle"
            className="dz-axis"
          >
            {day(dates[index])}
          </text>
        ))}

        {hover !== null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={T}
            y2={H - B}
            stroke="var(--dz-ink)"
            strokeWidth="1"
          />
        )}
      </svg>

      {hover !== null && (
        <div
          className="dz-tip"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            transform: `translateX(${hover > n / 2 ? "-105%" : "5%"})`,
          }}
        >
          <b>{day(dates[hover])}</b>

          {plans.map((plan, index) => (
            <div key={plan.id}>
              <i style={{ background: plan.color }} />
              {plan.name}
              <span>{nf.format(safeSeries[index][hover])}</span>
            </div>
          ))}

          <div className="dz-tip-total">
            Total
            <span>{nf.format(totals[hover])}</span>
          </div>

          <div className="dz-tip-prev">
            Previous period
            <span>{nf.format(safePrev[hover])}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────── Dashboard ───────────────────── */

export default function AnalyticsDashboard({
  data,
}: {
  data?: DashboardData;
}) {
  const d = useMemo(() => data ?? sample(), [data]);

  const [range, setRange] =
    useState<(typeof RANGES)[number]>(30);

  const [active, setActive] = useState<Set<PlanId>>(
    () => new Set((data ?? sample()).plans.map((plan) => plan.id))
  );

  // Keep selected plans valid if the supplied data changes.
  useEffect(() => {
    setActive((previous) => {
      const validIds = new Set(d.plans.map((plan) => plan.id));

      const next = new Set(
        [...previous].filter((id) => validIds.has(id))
      );

      // Add newly introduced plans by default.
      d.plans.forEach((plan) => {
        if (!previous.has(plan.id)) next.add(plan.id);
      });

      if (next.size === 0 && d.plans.length > 0) {
        next.add(d.plans[0].id);
      }

      return next;
    });
  }, [d]);

  const toggle = (id: PlanId) => {
    setActive((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const m = useMemo(() => {
    const selectedPlans = d.plans.filter((plan) =>
      active.has(plan.id)
    );

    const today = new Date();

    const dates = Array.from({ length: range }, (_, index) => {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - (range - 1 - index));
      return date;
    });

    const current = (id: PlanId) =>
      getWindow(d.daily?.[id] ?? [], range);

    const previous = (id: PlanId) =>
      getWindow(d.daily?.[id] ?? [], range, 1);

    const series = selectedPlans.map((plan) =>
      current(plan.id)
    );

    const prevTotal = dates.map((_, index) =>
      selectedPlans.reduce(
        (total, plan) => total + previous(plan.id)[index],
        0
      )
    );

    const curTotal = dates.map((_, index) =>
      series.reduce(
        (total, values) => total + (values[index] ?? 0),
        0
      )
    );

    const rows = d.plans.map((plan) => {
      const views = sum(current(plan.id));
      const prev = sum(previous(plan.id));

      const conversion = Math.max(
        0,
        Math.min(1, d.conversion?.[plan.id] ?? 0)
      );

      const buy = Math.round(views * conversion);
      const buyPrev = Math.round(prev * conversion);

      return {
        p: plan,
  views,
  prev,
  buy,
  buyPrev,
  revenue: buy * plan.price,
  revenuePrev: buyPrev * plan.price,
      };
    });

    const selectedRows = rows.filter((row) =>
      active.has(row.p.id)
    );

    const views = sum(curTotal);
    const viewsPrev = sum(prevTotal);

    const purchases = sum(
      selectedRows.map((row) => row.buy)
    );

   const purchasesPrev = sum(
  selectedRows.map((row) => row.buyPrev)
);

    const revenue = sum(
      selectedRows.map((row) => row.revenue)
    );

    const revenuePrev = sum(
      selectedRows.map((row) => row.revenuePrev)
    );

    const allViews = sum(rows.map((row) => row.views));

    return {
      sel: selectedPlans,
      dates,
      series,
      prevTotal,
      curTotal,
      rows,
      views,
      viewsPrev,
      purchases,
      purchasesPrev,
      revenue,
      revenuePrev,
      allViews,
    };
  }, [d, range, active]);

  const planOf = (id: PlanId) =>
    d.plans.find((plan) => plan.id === id);

  const top = d.top.filter((itinerary) =>
    active.has(itinerary.plan)
  );

  const kpis = [
    {
      label: "Total views",
      value: nf.format(m.views),
      delta: pct(m.views, m.viewsPrev),
      spark: m.curTotal,
      color: "#1e8e8a",
    },
    {
      label: "Unique visitors",
      value: "—",
      delta: 0,
      spark: m.curTotal,
      color: "#4c5fd5",
    },
    {
      label: "Plans purchased",
      value: nf.format(m.purchases),
      delta: pct(m.purchases, m.purchasesPrev),
      spark: m.curTotal,
      color: "#d9912b",
    },
    {
      label: "Revenue",
      value: `₹${nf.format(m.revenue)}`,
      delta: pct(m.revenue, m.revenuePrev),
      spark: m.curTotal,
      color: "#c2485a",
    },
  ];

  return (
    <div className="dz">
      <style>{CSS}</style>

      <header className="dz-head">
        <div>
          <h1>Website dashboard</h1>
          <p>
            Last {range} days, compared with the {range} days before.
          </p>
          <p className="dz-demo-note">
            Metrics depend on the data supplied to this dashboard.
          </p>
        </div>

        <div className="dz-controls">
          <div className="dz-seg" role="group" aria-label="Date range">
            {RANGES.map((value) => (
              <button
                key={value}
                aria-pressed={range === value}
                onClick={() => setRange(value)}
              >
                {value} days
              </button>
            ))}
          </div>

          <div className="dz-chips" role="group" aria-label="Plans to include">
            {d.plans.map((plan) => (
              <button
                key={plan.id}
                aria-pressed={active.has(plan.id)}
                onClick={() => toggle(plan.id)}
              >
                <i style={{ background: plan.color }} />
                {plan.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="dz-kpis" aria-label="Key numbers">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="dz-kpi">
            <span className="dz-kpi-label">{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <div className="dz-kpi-foot">
              <Delta value={kpi.delta} />
              <Spark values={kpi.spark} color={kpi.color} />
            </div>
          </div>
        ))}
      </section>

      <section className="dz-panel" aria-label="Views over time">
        <div className="dz-panel-head">
          <h2>Views by plan</h2>

          <div className="dz-legend">
            {m.sel.map((plan) => (
              <span key={plan.id}>
                <i style={{ background: plan.color }} />
                {plan.name}
              </span>
            ))}

            <span>
              <i className="dash" />
              Previous period
            </span>
          </div>
        </div>

        <ViewsChart
          plans={m.sel}
          series={m.series}
          prev={m.prevTotal}
          dates={m.dates}
        />
      </section>

      <div className="dz-two">
        <section className="dz-panel" aria-label="Plan comparison">
          <div className="dz-panel-head">
            <h2>Plan comparison</h2>
          </div>

          <div className="dz-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Views</th>
                  <th>Share</th>
                  <th>Change</th>
                  <th>Bought</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {m.rows.map((row) => {
                  const share =
                    m.allViews > 0
                      ? (row.views / m.allViews) * 100
                      : 0;

                  return (
                    <tr
                      key={row.p.id}
                      className={active.has(row.p.id) ? "" : "off"}
                    >
                      <td>
                        <i
                          className="dz-dot"
                          style={{ background: row.p.color }}
                        />
                        {row.p.name}
                        <small>{row.p.priceLabel}</small>
                      </td>

                      <td className="n">{nf.format(row.views)}</td>

                      <td>
                        <div
                          className="dz-bar"
                          title={`${share.toFixed(1)}%`}
                          aria-label={`${share.toFixed(1)} percent of views`}
                        >
                          <span
                            style={{
                              width: `${share}%`,
                              background: row.p.color,
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <Delta value={pct(row.views, row.prev)} />
                      </td>

                      <td className="n">
                        {row.p.price ? nf.format(row.buy) : "—"}
                      </td>

                      <td className="n">
                        {row.p.price
                          ? `₹${nf.format(row.revenue)}`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dz-panel" aria-label="Top itineraries">
          <div className="dz-panel-head">
            <h2>Top itineraries</h2>
          </div>

          {top.length === 0 ? (
            <p className="dz-empty">
              No itineraries for the selected plans. Turn a plan back on above.
            </p>
          ) : (
            <ol className="dz-top">
              {top.map((itinerary) => {
                const plan = planOf(itinerary.plan);

                return (
                  <li key={itinerary.title}>
                    <i
                      className="dz-dot"
                      style={{ background: plan?.color ?? "#7a8b93" }}
                      title={plan?.name ?? itinerary.plan}
                    />

                    <span className="dz-top-title">
                      {itinerary.title}
                    </span>

                    <span className="n">
                      {nf.format(
                        Math.round((itinerary.views * range) / 30)
                      )}
                    </span>

                    <Delta value={itinerary.change} />
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}

/* ───────────────────── Styles ───────────────────── */

const CSS = `
.dz {
  --dz-bg: #eef2f4;
  --dz-surface: #fff;
  --dz-ink: #14262b;
  --dz-mute: #5d7077;
  --dz-line: #d9e1e4;
  --dz-up: #15803d;
  --dz-down: #b42342;
  --dz-focus: #1e8e8a;
  background: var(--dz-bg);
  color: var(--dz-ink);
  padding: clamp(16px, 3vw, 36px);
  min-height: 100%;
  font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-variant-numeric: tabular-nums;
}
@media (prefers-color-scheme: dark) {
  .dz {
    --dz-bg: #0f1a1d;
    --dz-surface: #162326;
    --dz-ink: #e6eef0;
    --dz-mute: #93a8ae;
    --dz-line: #27393d;
    --dz-up: #4ade80;
    --dz-down: #fb7185;
    --dz-focus: #5fd1cb;
  }
}
.dz * { box-sizing: border-box; }
.dz h1 { font-size: clamp(22px, 3vw, 30px); letter-spacing: -.02em; margin: 0; font-weight: 700; }
.dz h2 { font-size: 16px; margin: 0; font-weight: 650; }
.dz p { margin: 4px 0 0; color: var(--dz-mute); }
.dz button { font: inherit; color: inherit; cursor: pointer; }
.dz button:focus-visible { outline: 2px solid var(--dz-focus); outline-offset: 2px; }
.dz-head { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; }
.dz-demo-note { font-size: 12px; }
.dz-controls { display: flex; flex-wrap: wrap; gap: 10px; }
.dz-seg, .dz-chips { display: flex; gap: 4px; padding: 3px; background: var(--dz-surface); border: 1px solid var(--dz-line); border-radius: 10px; flex-wrap: wrap; }
.dz-seg button, .dz-chips button { border: 0; background: transparent; padding: 6px 12px; border-radius: 7px; display: flex; align-items: center; gap: 7px; }
.dz-seg button[aria-pressed=true] { background: var(--dz-ink); color: var(--dz-surface); }
.dz-chips button[aria-pressed=false] { opacity: .45; }
.dz-chips button[aria-pressed=true] { background: var(--dz-bg); }
.dz-chips i, .dz-legend i, .dz-dot { display: inline-block; width: 10px; height: 10px; border-radius: 3px; flex: none; }
.dz-dot { margin-right: 8px; }
.dz-kpis { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--dz-surface); border: 1px solid var(--dz-line); border-radius: 10px; margin-bottom: 16px; }
.dz-kpi { padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; border-right: 1px solid var(--dz-line); min-width: 0; }
.dz-kpi:last-child { border-right: 0; }
.dz-kpi-label { color: var(--dz-mute); }
.dz-kpi strong { font-size: clamp(22px, 2.6vw, 30px); letter-spacing: -.02em; line-height: 1.1; }
.dz-kpi-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.dz-spark { width: 84px; height: 26px; }
.dz-delta { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.dz-delta.up { color: var(--dz-up); }
.dz-delta.down { color: var(--dz-down); }
.dz-panel { background: var(--dz-surface); border: 1px solid var(--dz-line); border-radius: 10px; padding: 18px 20px; min-width: 0; }
.dz-panel-head { display: flex; flex-wrap: wrap; gap: 8px 20px; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.dz-legend { display: flex; flex-wrap: wrap; gap: 6px 16px; color: var(--dz-mute); font-size: 13px; }
.dz-legend span { display: flex; align-items: center; gap: 6px; }
.dz-legend i.dash { background: none; border-top: 2px dashed var(--dz-ink); height: 0; border-radius: 0; width: 16px; }
.dz-chart { position: relative; }
.dz-chart svg { width: 100%; height: auto; display: block; }
.dz-grid { stroke: var(--dz-line); stroke-width: 1; }
.dz-axis { fill: var(--dz-mute); font-size: 11.5px; }
.dz-tip { position: absolute; top: 8px; background: var(--dz-ink); color: var(--dz-surface); padding: 10px 12px; border-radius: 8px; font-size: 12.5px; min-width: 170px; pointer-events: none; display: grid; gap: 3px; z-index: 2; }
.dz-tip div { display: flex; align-items: center; gap: 6px; }
.dz-tip div span { margin-left: auto; padding-left: 14px; font-weight: 600; }
.dz-tip i { width: 8px; height: 8px; border-radius: 2px; }
.dz-tip-total { border-top: 1px solid rgba(255,255,255,.25); padding-top: 4px; margin-top: 2px; font-weight: 600; }
.dz-tip-prev { opacity: .75; }
.dz-two { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; margin-top: 16px; }
.dz-scroll { overflow-x: auto; }
.dz table { width: 100%; border-collapse: collapse; min-width: 560px; }
.dz th { text-align: left; font-weight: 500; color: var(--dz-mute); padding: 0 10px 8px 0; border-bottom: 1px solid var(--dz-line); }
.dz td { padding: 11px 10px 11px 0; border-bottom: 1px solid var(--dz-line); white-space: nowrap; }
.dz tr:last-child td { border-bottom: 0; }
.dz tr.off { opacity: .4; }
.dz td small { color: var(--dz-mute); margin-left: 4px; }
.dz .n { text-align: right; font-weight: 600; }
.dz th:nth-child(2), .dz th:nth-child(5), .dz th:nth-child(6) { text-align: right; }
.dz-bar { width: 100%; min-width: 70px; height: 8px; border-radius: 4px; background: var(--dz-bg); overflow: hidden; }
.dz-bar span { display: block; height: 100%; border-radius: 4px; }
.dz-top { list-style: none; margin: 0; padding: 0; }
.dz-top li { display: flex; align-items: center; gap: 8px; padding: 11px 0; border-bottom: 1px solid var(--dz-line); min-width: 0; }
.dz-top li:last-child { border-bottom: 0; }
.dz-top-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dz-empty { padding: 16px 0; }
@media (max-width: 900px) {
  .dz-kpis { grid-template-columns: repeat(2, 1fr); }
  .dz-kpi:nth-child(2) { border-right: 0; }
  .dz-kpi:nth-child(-n+2) { border-bottom: 1px solid var(--dz-line); }
  .dz-two { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .dz-kpis { grid-template-columns: 1fr; }
  .dz-kpi { border-right: 0; border-bottom: 1px solid var(--dz-line); }
  .dz-kpi:last-child { border-bottom: 0; }
  .dz-spark { width: 64px; }
  .dz-panel { padding: 14px; }
}
`;
