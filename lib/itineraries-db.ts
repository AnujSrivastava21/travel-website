
import { pool } from "../lib/db";
import type { Itinerary, DestinationTheme } from "../types/itinerary";

export async function getItinerariesFromDatabase(): Promise<Itinerary[]> {
  const result = await pool.query(`
    SELECT
      i.id,
      i.slug,
      i.title,
      i.destination,
      i.direction,
      i.duration_days,
      i.description,
      i.cover_image,
      i.is_premium,
      i.price,
      i.days_json,
      i.metadata,
      i.theme,
      i.created_at,
      COALESCE(v.total_views, 0)::int AS views
    FROM public.itineraries AS i
    LEFT JOIN (
      SELECT
        itinerary_id,
        COUNT(*) AS total_views
      FROM public.itinerary_views
      GROUP BY itinerary_id
    ) AS v ON v.itinerary_id = i.id
    ORDER BY i.created_at DESC NULLS LAST, i.id DESC
  `);

  return result.rows.map((row): Itinerary => {
    const rawTheme =
      row.theme &&
      typeof row.theme === "object" &&
      !Array.isArray(row.theme)
        ? row.theme
        : undefined;

    const theme: DestinationTheme | undefined = rawTheme
      ? {
          primary: String(rawTheme.primary ?? "#263D32"),
          secondary: String(rawTheme.secondary ?? "#D9E8E8"),
          background: String(rawTheme.background ?? "#F7F6EF"),
          surface: String(rawTheme.surface ?? "#FFFFFF"),
          accent: String(rawTheme.accent ?? "#C59A50"),
          text: String(rawTheme.text ?? "#2C4247"),
          muted: String(rawTheme.muted ?? "#778589"),
          border: String(rawTheme.border ?? "#D6E1E1"),
          buttonText: String(rawTheme.buttonText ?? "#FFFFFF"),
        }
      : undefined;

    return {
      id: String(row.slug),
      slug: String(row.slug),
      title: String(row.title ?? ""),
      destination: String(row.destination ?? ""),
      direction: String(row.direction ?? "").toLowerCase(),
      duration: Number(row.duration_days ?? 0),
      description: String(row.description ?? ""),
      coverImage: String(row.cover_image ?? ""),
      isPremium: Boolean(row.is_premium),
      price: row.price == null ? undefined : Number(row.price),
      createdAt: row.created_at
        ? new Date(row.created_at).toISOString()
        : null,
      days: Array.isArray(row.days_json) ? row.days_json : [],
      metadata:
        row.metadata &&
        typeof row.metadata === "object" &&
        !Array.isArray(row.metadata)
          ? row.metadata
          : {},
      theme,
      views: Number(row.views ?? 0),
    };
  });
}
