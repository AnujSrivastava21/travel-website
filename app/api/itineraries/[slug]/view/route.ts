
import { NextResponse } from "next/server";
import { pool } from "../../../../../lib/db";

export async function POST(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const result = await pool.query(
      `INSERT INTO itinerary_views (itinerary_id, user_id)
       SELECT id, NULL
       FROM itineraries
       WHERE slug = $1
       RETURNING itinerary_id`,
      [slug]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Itinerary not found" },
        { status: 404 }
      );
    }

    const count = await pool.query(
      `SELECT COUNT(*)::int AS total_views
       FROM itinerary_views
       WHERE itinerary_id = $1`,
      [result.rows[0].itinerary_id]
    );

    return NextResponse.json({
      success: true,
      slug,
      totalViews: count.rows[0].total_views,
    });
  } catch (error) {
    console.error("Failed to record itinerary view:", error);

    return NextResponse.json(
      { success: false, message: "Could not record itinerary view" },
      { status: 500 }
    );
  }
}
