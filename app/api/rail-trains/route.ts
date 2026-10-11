import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.RAILRADAR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RAILRADAR_API_KEY is missing in .env.local" },
      { status: 500 }
    );
  }

  const params = request.nextUrl.searchParams;
  const source = params.get("source")?.trim().toUpperCase();
  const destination = params.get("destination")?.trim().toUpperCase();
  const journeyDate = params.get("journeyDate");

  if (!source || !destination || !journeyDate) {
    return NextResponse.json(
      { error: "Required: source, destination, journeyDate" },
      { status: 400 }
    );
  }

  if (source === destination) {
    return NextResponse.json(
      { error: "Source and destination cannot be the same." },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(journeyDate)) {
    return NextResponse.json(
      { error: "Journey date must use YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  const apiUrl = new URL(
    `https://api.railradar.in/v1/trains/between/${encodeURIComponent(
      source
    )}/${encodeURIComponent(destination)}`
  );

  apiUrl.searchParams.set("date", journeyDate);

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to connect to RailRadar.",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}