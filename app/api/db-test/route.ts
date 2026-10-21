
import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        slug,
        title,
        destination,
        duration_days,
        is_premium,
        price,
        days_json
      FROM itineraries
      ORDER BY id
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch itineraries from PostgreSQL",
      },
      { status: 500 }
    );
  }
}
