import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        slug,
        title,
        destination,
        duration_days AS duration,
        description,
        cover_image AS "coverImage",
        is_premium AS "isPremium",
        price,
        days_json AS days
      FROM itineraries
      ORDER BY id
    `);

    const data = result.rows.map((row) => ({
      ...row,
      id: String(row.id),
      duration: Number(row.duration),
      price: Number(row.price),
      isPremium: Boolean(row.isPremium),
      days: Array.isArray(row.days) ? row.days : [],
    }));

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Itineraries API failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch itineraries from PostgreSQL",
      },
      { status: 500 }
    );
  }
}
