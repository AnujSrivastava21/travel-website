
import ExcelJS from "exceljs";
import path from "node:path";
import { pool } from "../lib/db";

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

function readRows(
  sheet: ExcelJS.Worksheet
): Record<string, string>[] {
  const headers: Record<number, string> = {};

  sheet.getRow(1).eachCell((cell, column) => {
    headers[column] = text(cell.value);
  });

  const records: Record<string, string>[] = [];

  for (
    let rowNumber = 2;
    rowNumber <= sheet.rowCount;
    rowNumber++
  ) {
    const row = sheet.getRow(rowNumber);
    const record: Record<string, string> = {};

    for (const [column, header] of Object.entries(headers)) {
      if (header) {
        record[header.trim()] = text(
          row.getCell(Number(column)).value
        );
      }
    }

    if (Object.values(record).some(Boolean)) {
      records.push(record);
    }
  }

  return records;
}

function getField(
  record: Record<string, string>,
  field: string
): string {
  const key = Object.keys(record).find(
    (header) => header.toLowerCase() === field.toLowerCase()
  );

  return key ? record[key].trim() : "";
}

async function main() {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(
    path.resolve(
      process.cwd(),
      "data/the_local_route_full_itineraries.xlsx"
    )
  );

  const itinerariesSheet = workbook.getWorksheet("Itineraries");
  const themesSheet = workbook.getWorksheet("Themes");

  if (!itinerariesSheet) {
    throw new Error("Itineraries sheet not found");
  }

  if (!themesSheet) {
    throw new Error("Themes sheet not found");
  }

  const itineraries = readRows(itinerariesSheet);
  const themes = readRows(themesSheet);

  // Map itinerary_id to the canonical slug from Excel.
  const slugById = new Map<string, string>();

  for (const itinerary of itineraries) {
    const itineraryId = getField(itinerary, "itinerary_id");
    const slug = getField(itinerary, "slug");

    if (itineraryId && slug) {
      slugById.set(itineraryId, slug);
    }
  }

  const client = await pool.connect();
  let updated = 0;

  try {
    await client.query("BEGIN");

    for (const row of themes) {
      const itineraryId = getField(row, "itinerary_id");

      const slug =
        getField(row, "slug") ||
        slugById.get(itineraryId) ||
        "";

      if (!slug) {
        throw new Error(
          `No matching slug found for itinerary_id: ${itineraryId}`
        );
      }

      const theme = {
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

      // Validate all nine colors before writing to the database.
      for (const [name, color] of Object.entries(theme)) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
          throw new Error(
            `Invalid or missing ${name} color for ${slug}: "${color}"`
          );
        }
      }

      const result = await client.query(
        `UPDATE public.itineraries
         SET theme = $1::jsonb,
             updated_at = NOW()
         WHERE LOWER(TRIM(slug)) = LOWER(TRIM($2))`,
        [JSON.stringify(theme), slug]
      );

      if (result.rowCount === 0) {
        throw new Error(
          `No itinerary found in PostgreSQL for slug: ${slug}. ` +
          `Add the itinerary through your existing Excel importer first.`
        );
      }

      updated++;
      console.log(`Theme synced: ${slug}`);
    }

    await client.query("COMMIT");
    console.log(`Successfully synced ${updated} itinerary themes.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

main()
  .catch((error) => {
    console.error("Theme sync failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
