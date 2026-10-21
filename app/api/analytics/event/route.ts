
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export const runtime = "nodejs";

const allowedEvents = [
  "paynow_click",
  "demo_payment_success",
] as const;

type AnalyticsEvent = (typeof allowedEvents)[number];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const slug =
      typeof body.slug === "string" ? body.slug.trim() : "";

    const eventType = body.eventType as AnalyticsEvent;

    if (
      !slug ||
      !allowedEvents.includes(eventType)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid analytics event" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `SELECT id, is_premium, price
       FROM itineraries
       WHERE slug = $1
       LIMIT 1`,
      [slug],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: "Itinerary not found" },
        { status: 404 },
      );
    }

    const itinerary = result.rows[0];

    // A demo success is only meaningful for a premium itinerary.
    if (
      eventType === "demo_payment_success" &&
      !itinerary.is_premium
    ) {
      return NextResponse.json(
        { success: false, error: "Not a premium itinerary" },
        { status: 400 },
      );
    }

    const amount =
      eventType === "demo_payment_success"
        ? itinerary.price
        : null;

    await pool.query(
      `INSERT INTO itinerary_analytics_events
         (itinerary_id, user_id, event_type, amount)
       VALUES ($1, NULL, $2, $3)`,
      [itinerary.id, eventType, amount],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics event tracking failed:", error);

    return NextResponse.json(
      { success: false, error: "Unable to record analytics event" },
      { status: 500 },
    );
  }
}
