
import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const prefix = `${query}%`;
    const contains = `%${query}%`;

    const result = await pool.query(
      `
        SELECT
          id,
          slug,
          title,
          destination,
          duration_days,
          cover_image
        FROM itineraries
        WHERE
          title ILIKE $1
          OR destination ILIKE $1
          OR slug ILIKE $1
          OR title ILIKE $2
          OR destination ILIKE $2
        ORDER BY
          CASE
            WHEN title ILIKE $1 THEN 1
            WHEN destination ILIKE $1 THEN 2
            WHEN slug ILIKE $1 THEN 3
            ELSE 4
          END,
          title ASC
        LIMIT 8
      `,
      [prefix, contains]
    );

    return NextResponse.json({
      results: result.rows.map((row) => ({
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        destination: row.destination,
        duration: row.duration_days,
        coverImage: row.cover_image,
      })),
    });
  } catch (error) {
    console.error("Autocomplete search error:", error);

    return NextResponse.json(
      { message: "Unable to search itineraries" },
      { status: 500 }
    );
  }
}
