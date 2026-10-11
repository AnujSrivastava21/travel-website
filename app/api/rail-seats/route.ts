
import { NextRequest, NextResponse } from "next/server";

type CalendarEntry = {
  date?: string;
  rawDate?: string;
  status?: string;
  statusCode?: string;
  isAvailable?: boolean;
  availableSeats?: number;
  waitlistNumber?: number;
  waitlistType?: string;
};

type AvailabilityType =
  | "available"
  | "confirmed"
  | "rac"
  | "waitlist"
  | "unavailable"
  | "unknown";

function normalizeStatus(entry?: CalendarEntry): AvailabilityType {
  if (!entry) return "unknown";

  const code = String(entry.statusCode ?? "").trim().toUpperCase();
  const status = String(entry.status ?? "").trim().toUpperCase();

  if (/^(AVAILABLE|AVL)(?:[-\s:]+\d+)?$/.test(status)) {
    return "available";
  }

  if (
    code === "AVAILABLE" ||
    code === "AVL" ||
    entry.isAvailable === true
  ) {
    return "available";
  }

  if (
    ["CNF", "CONFIRMED", "CONFIRM"].includes(code) ||
    /\b(CNF|CONFIRMED)\b/.test(status)
  ) {
    return "confirmed";
  }

  if (code === "RAC" || /\bRAC\b/.test(status)) {
    return "rac";
  }

  if (
    ["WAITLIST", "WL"].includes(code) ||
    /\b(WL|GNWL|RLWL|PQWL|TQWL|RQWL|WAITLIST)\b/.test(status)
  ) {
    return "waitlist";
  }

  if (
    ["UNAVAILABLE", "CLOSED", "REGRET", "NOT_AVAILABLE"].includes(code) ||
    /NOT AVAILABLE|NOTAVAILABLE|CLOSED|REGRET|CANCELLED/.test(status)
  ) {
    return "unavailable";
  }

  return "unknown";
}

function normalizeDate(value?: string) {
  if (!value) return "";
  return value.trim().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.RAILRADAR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RAILRADAR_API_KEY is missing in .env.local" },
      { status: 500 },
    );
  }

  const params = request.nextUrl.searchParams;

  const trainNumber = params.get("trainNumber")?.trim();
  const source = params.get("source")?.trim().toUpperCase();
  const destination = params.get("destination")?.trim().toUpperCase();
  const journeyDate = params.get("journeyDate")?.trim();
  const classCode = (params.get("classCode") || "SL").trim().toUpperCase();
  const quotaCode = (params.get("quotaCode") || "GN").trim().toUpperCase();

  if (!trainNumber || !source || !destination || !journeyDate) {
    return NextResponse.json(
      {
        error:
          "trainNumber, source, destination, and journeyDate are required",
      },
      { status: 400 },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(journeyDate)) {
    return NextResponse.json(
      { error: "journeyDate must use YYYY-MM-DD format" },
      { status: 400 },
    );
  }

  try {
    const url = new URL(
      `https://api.railradar.in/v1/trains/${encodeURIComponent(trainNumber)}/seats`,
    );

    url.searchParams.set("source", source);
    url.searchParams.set("destination", destination);
    url.searchParams.set("journeyDate", journeyDate);
    url.searchParams.set("classCode", classCode);
    url.searchParams.set("quotaCode", quotaCode);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    let payload: any;

    try {
      payload = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error: "RailRadar returned a non-JSON response",
          upstreamStatus: response.status,
          responsePreview: responseText.slice(0, 500),
        },
        { status: 502 },
      );
    }

    if (!response.ok || payload?.success === false) {
      return NextResponse.json(
        {
          error: "RailRadar seat availability request failed",
          upstreamStatus: response.status,
          details: payload,
        },
        { status: response.ok ? 502 : response.status },
      );
    }

    const calendar: CalendarEntry[] = Array.isArray(payload?.data?.calendar)
      ? payload.data.calendar
      : [];

    const entry = calendar.find((item) => {
      const itemDate = normalizeDate(item.date || item.rawDate);
      return itemDate === journeyDate;
    });

    const type = normalizeStatus(entry);

    const status =
      entry?.status ||
      entry?.statusCode ||
      "UNKNOWN";

    const message = entry
      ? entry.status ||
        (type === "available"
          ? "Available"
          : type === "confirmed"
            ? "Confirmed"
            : type === "rac"
              ? "RAC"
              : type === "waitlist"
                ? "Waitlisted"
                : "Availability unknown")
      : `No availability entry matched ${journeyDate}`;

    return NextResponse.json({
      success: true,
      trainNumber,
      classCode,
      quotaCode,
      journeyDate,

      // Frontend reads data.calendar here.
      data: payload?.data ?? {},

      // Frontend reads availability.type here.
      availability: {
        type,
        status,
        message,
        availableSeats: entry?.availableSeats ?? null,
        waitlistNumber: entry?.waitlistNumber ?? null,
        waitlistType: entry?.waitlistType ?? null,
        isAvailable: entry?.isAvailable === true,
        canSelect: type === "available" || type === "confirmed",
      },

      // Diagnostic fields for verifying the actual response.
      debug: {
        requestedDate: journeyDate,
        returnedCalendarEntries: calendar.length,
        matchedDate: entry?.date || entry?.rawDate || null,
        matchedStatus: entry?.status || null,
        matchedStatusCode: entry?.statusCode || null,
      },

      raw: payload,
    });
  } catch (error) {
    console.error("RailRadar seat availability error:", error);

    return NextResponse.json(
      {
        error: "Unable to fetch seat availability",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
