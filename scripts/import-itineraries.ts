
import ExcelJS from "exceljs";
import { Pool } from "pg";
import path from "node:path";
import dotenv from "dotenv";
import { sendNewItineraryNotifications } from "../lib/send-new-itinerary-notifications";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

type SheetRow = Record<string, unknown>;

interface NewItinerary {
  slug: string;
  title: string;
  destination: string;
  description: string;
  coverImage: string | null;
}

interface DestinationTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
  buttonText: string;
}

function text(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value).trim();
  }

  if (typeof value === "object") {
    const cell = value as Record<string, unknown>;

    if ("result" in cell) return text(cell.result);

    if (Array.isArray(cell.richText)) {
      return cell.richText
        .map((part) => {
          if (
            typeof part === "object" &&
            part !== null &&
            "text" in part
          ) {
            return text(part.text);
          }
          return "";
        })
        .join("")
        .trim();
    }

    if ("text" in cell) return text(cell.text);
  }

  return "";
}

function number(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const result = Number(value);

  if (!Number.isFinite(result)) {
    throw new Error(`Invalid number: ${String(value)}`);
  }

  return result;
}

function boolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;

  return ["true", "1", "yes"].includes(text(value).toLowerCase());
}

function rowsFromSheet(sheet: ExcelJS.Worksheet): SheetRow[] {
  const headers: string[] = [];

  sheet.getRow(1).eachCell((cell, column) => {
    headers[column] = text(cell.value).trim();
  });

  const result: SheetRow[] = [];

  for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber++) {
    const row = sheet.getRow(rowNumber);
    const record: SheetRow = {};

    headers.forEach((header, column) => {
      if (header) {
        record[header] = row.getCell(column).value;
      }
    });

    if (
      Object.values(record).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== ""
      )
    ) {
      result.push(record);
    }
  }

  return result;
}

function getField(row: SheetRow, field: string): string {
  const key = Object.keys(row).find(
    (header) => header.trim().toLowerCase() === field.toLowerCase()
  );

  return key ? text(row[key]) : "";
}

function makeTheme(row: SheetRow, slug: string): DestinationTheme {
  const theme: DestinationTheme = {
    primary: getField(row, "primary"),
    secondary: getField(row, "secondary"),
    background: getField(row, "background"),
    surface: getField(row, "surface"),
    accent: getField(row, "accent"),
    text: getField(row, "text"),
    muted: getField(row, "muted"),
    border: getField(row, "border"),
    buttonText: getField(row, "buttonText"),
  };

  for (const [name, color] of Object.entries(theme)) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      throw new Error(
        `Invalid ${name} color for "${slug}": "${color}". ` +
        "Expected a six-digit hex color such as #B45309."
      );
    }
  }

  return theme;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing from .env.local");
  }

  const filePath = path.resolve(
    process.cwd(),
    "data/the_local_route_full_itineraries.xlsx"
  );

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const itinerarySheet = workbook.getWorksheet("Itineraries");
  const daysSheet = workbook.getWorksheet("Days");
  const locationsSheet = workbook.getWorksheet("Locations");
  const dayLocationsSheet = workbook.getWorksheet("Day_Locations");
  const tagsSheet = workbook.getWorksheet("Tags");
  const itineraryTagsSheet = workbook.getWorksheet("Itinerary_Tags");
  const themesSheet = workbook.getWorksheet("Themes");

  if (
    !itinerarySheet ||
    !daysSheet ||
    !locationsSheet ||
    !dayLocationsSheet ||
    !tagsSheet ||
    !itineraryTagsSheet ||
    !themesSheet
  ) {
    throw new Error(
      "Missing required sheet. Required: Itineraries, Days, Locations, " +
      "Day_Locations, Tags, Itinerary_Tags, Themes."
    );
  }

  const itineraryRows = rowsFromSheet(itinerarySheet);
  const dayRows = rowsFromSheet(daysSheet);
  const locationRows = rowsFromSheet(locationsSheet);
  const dayLocationRows = rowsFromSheet(dayLocationsSheet);
  const tagRows = rowsFromSheet(tagsSheet);
  const itineraryTagRows = rowsFromSheet(itineraryTagsSheet);
  const themeRows = rowsFromSheet(themesSheet);

  if (itineraryRows.length === 0) {
    throw new Error("The Itineraries sheet contains no data rows.");
  }

  for (const column of [
    "itinerary_id",
    "slug",
    "title",
    "destination",
    "duration_days",
  ]) {
    if (!(column in itineraryRows[0])) {
      throw new Error(`Missing Itineraries column: ${column}`);
    }
  }

  // Map each Excel itinerary_id to its canonical slug.
  const slugById = new Map<string, string>();
  const seenSlugs = new Set<string>();

  for (const row of itineraryRows) {
    const id = getField(row, "itinerary_id");
    const slug = getField(row, "slug");

    if (!id || !slug) {
      throw new Error(
        `Missing itinerary_id or slug in Excel row: ${JSON.stringify(row)}`
      );
    }

    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate slug in Excel: ${slug}`);
    }

    seenSlugs.add(slug);
    slugById.set(id, slug);
  }

  // Build and validate theme records from the Themes sheet.
  // A Themes row can contain its own slug or use itinerary_id.
  const themesBySlug = new Map<string, DestinationTheme>();

  for (const row of themeRows) {
    const itineraryId = getField(row, "itinerary_id");
    const slug =
      getField(row, "slug") ||
      slugById.get(itineraryId) ||
      "";

    if (!slug) {
      throw new Error(
        `Could not match a Themes row to an itinerary. ` +
        `itinerary_id: "${itineraryId}".`
      );
    }

    if (themesBySlug.has(slug)) {
      throw new Error(`Duplicate theme row for slug: ${slug}`);
    }

    themesBySlug.set(slug, makeTheme(row, slug));
  }

  // Map tag ID to category and value.
  const tagsById = new Map<
    string,
    { category: string; value: string }
  >();

  for (const row of tagRows) {
    const tagId = getField(row, "tag_id");
    const category = getField(row, "category").toLowerCase();
    const value = getField(row, "value").toLowerCase();

    if (tagId && category && value) {
      tagsById.set(tagId, { category, value });
    }
  }

  // Group tag metadata by itinerary_id.
  const metadataByItinerary = new Map<
    string,
    Record<string, string[]>
  >();

  for (const row of itineraryTagRows) {
    const itineraryId = getField(row, "itinerary_id");
    const tagId = getField(row, "tag_id");
    const tag = tagsById.get(tagId);

    if (!itineraryId || !tag) continue;

    const metadata = metadataByItinerary.get(itineraryId) ?? {};
    const values = metadata[tag.category] ?? [];

    if (!values.includes(tag.value)) {
      values.push(tag.value);
    }

    metadata[tag.category] = values;
    metadataByItinerary.set(itineraryId, metadata);
  }

  console.log("\n--- IMPORT DIAGNOSTICS ---");
  console.log("Itineraries:", itineraryRows.length);
  console.log("Theme rows:", themeRows.length);
  console.log("Valid themes:", themesBySlug.size);
  console.log("Tag definitions:", tagsById.size);
  console.log("Itineraries with tag metadata:", metadataByItinerary.size);
  console.log("Sample themes:", Array.from(themesBySlug.entries()).slice(0, 3));
  console.log("--- END DIAGNOSTICS ---\n");

  // Build location_id -> name map.
  const locationNames = new Map<string, string>();

  for (const row of locationRows) {
    const id = getField(row, "location_id");
    const name = getField(row, "name");

    if (id && name) {
      locationNames.set(id, name);
    }
  }

  // Group locations by itinerary and day.
  const locationsByDay = new Map<
    string,
    { sortOrder: number; name: string }[]
  >();

  for (const row of dayLocationRows) {
    const itineraryId = getField(row, "itinerary_id");
    const dayNumber = number(row.day_number, -1);

    if (!itineraryId || dayNumber < 1) continue;

    const key = `${itineraryId}::${dayNumber}`;
    const locationId = getField(row, "location_id");
    const name =
      getField(row, "location_name") ||
      locationNames.get(locationId) ||
      "";

    if (!name) continue;

    const list = locationsByDay.get(key) ?? [];

    list.push({
      sortOrder: number(row.sort_order, list.length + 1),
      name,
    });

    locationsByDay.set(key, list);
  }

  // Build day JSON.
  const daysByItinerary = new Map<string, object[]>();

  for (const row of dayRows) {
    const itineraryId = getField(row, "itinerary_id");
    const dayNumber = number(row.day_number, -1);

    if (!itineraryId || dayNumber < 1) continue;

    const key = `${itineraryId}::${dayNumber}`;
    const locations = (locationsByDay.get(key) ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => item.name);

    const list = daysByItinerary.get(itineraryId) ?? [];

    list.push({
      day: dayNumber,
      day_key: getField(row, "day_key"),
      title: getField(row, "title"),
      description: getField(row, "description"),
      locations,
    });

    daysByItinerary.set(itineraryId, list);
  }

  for (const days of daysByItinerary.values()) {
    days.sort(
      (a, b) =>
        Number((a as { day: number }).day) -
        Number((b as { day: number }).day)
    );
  }

  const newItineraries: NewItinerary[] = [];
  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const slugsToImport = itineraryRows.map((row) =>
        getField(row, "slug")
      );

      const existingResult = await client.query<{ slug: string }>(
        `SELECT slug
         FROM public.itineraries
         WHERE slug = ANY($1::text[])`,
        [slugsToImport]
      );

      const existingSlugs = new Set(
        existingResult.rows.map((row) => row.slug)
      );

      let imported = 0;
      let themesWritten = 0;

      for (const row of itineraryRows) {
        const sourceId = getField(row, "itinerary_id");
        const slug = getField(row, "slug");
        const title = getField(row, "title");
        const destination = getField(row, "destination");
        const description = getField(row, "description");
        const coverImage = getField(row, "cover_image") || null;
        const durationDays = number(row.duration_days);
        const price = number(row.price);
        const premium = boolean(row.is_premium);
        const direction = getField(row, "direction").toLowerCase() || null;

        if (!sourceId || !slug || !title || !destination) {
          throw new Error(
            `Missing required itinerary fields: ${JSON.stringify(row)}`
          );
        }

        if (!Number.isInteger(durationDays) || durationDays <= 0) {
          throw new Error(`Invalid duration for ${slug}`);
        }

        if (price < 0) {
          throw new Error(`Negative price for ${slug}`);
        }

        const days = daysByItinerary.get(sourceId) ?? [];
        const metadata = metadataByItinerary.get(sourceId) ?? {};
        const theme = themesBySlug.get(slug) ?? null;

        const result = await client.query(
          `INSERT INTO public.itineraries (
             slug,
             title,
             destination,
             direction,
             duration_days,
             description,
             cover_image,
             is_premium,
             price,
             days_json,
             metadata,
             theme,
             updated_at
           )
           VALUES (
             $1, $2, $3, $4, $5, $6, $7, $8, $9,
             $10::jsonb, $11::jsonb, $12::jsonb, NOW()
           )
           ON CONFLICT (slug) DO UPDATE SET
             title = EXCLUDED.title,
             destination = EXCLUDED.destination,
             direction = EXCLUDED.direction,
             duration_days = EXCLUDED.duration_days,
             description = EXCLUDED.description,
             cover_image = EXCLUDED.cover_image,
             is_premium = EXCLUDED.is_premium,
             price = EXCLUDED.price,
             days_json = EXCLUDED.days_json,
             metadata = EXCLUDED.metadata,
             theme = COALESCE(EXCLUDED.theme, public.itineraries.theme),
             updated_at = NOW()
           RETURNING slug`,
          [
            slug,
            title,
            destination,
            direction,
            durationDays,
            description || null,
            coverImage,
            premium,
            price,
            JSON.stringify(days),
            JSON.stringify(metadata),
            theme ? JSON.stringify(theme) : null,
          ]
        );

        imported++;

        if (theme) themesWritten++;

        if (!existingSlugs.has(slug)) {
          newItineraries.push({
            slug,
            title,
            destination,
            description,
            coverImage,
          });
        }

        if (result.rowCount !== 1) {
          throw new Error(`Could not save itinerary: ${slug}`);
        }
      }

      await client.query("COMMIT");

      console.log("\nExcel import completed successfully.");
      console.log(`Itineraries processed: ${imported}`);
      console.log(`Themes written: ${themesWritten}`);
      console.log(`Days read: ${dayRows.length}`);
      console.log(`Locations read: ${locationRows.length}`);
      console.log(`Day-location rows read: ${dayLocationRows.length}`);
      console.log(`Tag definitions read: ${tagRows.length}`);
      console.log(`Itinerary-tag relationships: ${itineraryTagRows.length}`);
      console.log("Existing records absent from Excel were not deleted.");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    console.log(`New itineraries detected: ${newItineraries.length}`);

    if (newItineraries.length === 0) {
      console.log("No new itineraries. No newsletter emails will be sent.");
    } else {
      try {
        const result = await sendNewItineraryNotifications(
          pool,
          newItineraries
        );

        console.log("Newsletter notification results:", {
          newItineraries: newItineraries.length,
          subscribers: result.totalSubscribers,
          acceptedByEmailProvider: result.sent,
          failed: result.failed,
        });
      } catch (error) {
        console.error(
          "Import committed, but newsletter notifications failed:",
          error
        );
      }
    }
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error("Excel import failed:", error);
  process.exitCode = 1;
});
