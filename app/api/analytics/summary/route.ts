
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [totalsResult, topResult] = await Promise.all([
      pool.query(`
        SELECT
          (SELECT COUNT(*) FROM itinerary_views)::int
            AS total_views,

          (SELECT COUNT(*)
           FROM itinerary_analytics_events
           WHERE event_type = 'paynow_click')::int
            AS paynow_clicks,

          (SELECT COUNT(*)
           FROM itinerary_analytics_events
           WHERE event_type = 'demo_payment_success')::int
            AS demo_successes,

          COALESCE(
            (SELECT SUM(amount)
             FROM itinerary_analytics_events
             WHERE event_type = 'demo_payment_success'),
            0
          )::numeric AS estimated_demo_revenue
      `),

      pool.query(`
        WITH view_counts AS (
          SELECT itinerary_id, COUNT(*) AS views
          FROM itinerary_views
          GROUP BY itinerary_id
        ),
        event_counts AS (
          SELECT
            itinerary_id,
            COUNT(*) FILTER (
              WHERE event_type = 'paynow_click'
            ) AS paynow_clicks,
            COUNT(*) FILTER (
              WHERE event_type = 'demo_payment_success'
            ) AS demo_successes,
            COALESCE(
              SUM(amount) FILTER (
                WHERE event_type = 'demo_payment_success'
              ),
              0
            ) AS estimated_demo_revenue
          FROM itinerary_analytics_events
          GROUP BY itinerary_id
        )
        SELECT
          i.id,
          i.slug,
          i.title,
          COALESCE(v.views, 0)::int AS views,
          COALESCE(e.paynow_clicks, 0)::int AS paynow_clicks,
          COALESCE(e.demo_successes, 0)::int AS demo_successes,
          COALESCE(e.estimated_demo_revenue, 0)::numeric
            AS estimated_demo_revenue
        FROM itineraries i
        LEFT JOIN view_counts v ON v.itinerary_id = i.id
        LEFT JOIN event_counts e ON e.itinerary_id = i.id
        ORDER BY
          COALESCE(v.views, 0) DESC,
          COALESCE(e.paynow_clicks, 0) DESC
        LIMIT 10
      `),
    ]);

    const totals = totalsResult.rows[0];

    const totalViews = Number(totals.total_views);
    const paynowClicks = Number(totals.paynow_clicks);
    const demoSuccesses = Number(totals.demo_successes);

    return NextResponse.json({
      success: true,
      metrics: {
        totalViews,
        paynowClicks,
        demoSuccesses,
        estimatedDemoRevenue: Number(
          totals.estimated_demo_revenue,
        ),
        viewToClickRate:
          totalViews > 0
            ? Number(((paynowClicks / totalViews) * 100).toFixed(2))
            : 0,
        demoSuccessRate:
          paynowClicks > 0
            ? Number(((demoSuccesses / paynowClicks) * 100).toFixed(2))
            : 0,
      },
      topItineraries: topResult.rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        views: Number(row.views),
        paynowClicks: Number(row.paynow_clicks),
        demoSuccesses: Number(row.demo_successes),
        estimatedDemoRevenue: Number(
          row.estimated_demo_revenue,
        ),
      })),
    });
  } catch (error) {
    console.error("Analytics summary failed:", error);

    return NextResponse.json(
      { success: false, error: "Unable to load analytics" },
      { status: 500 },
    );
  }
}
