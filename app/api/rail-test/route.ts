
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RAILRADAR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RAILRADAR_API_KEY is missing from .env.local" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.railradar.in/v1/stations/PRYJ/trains",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      }
    );

    const raw = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        {
          error: "RailRadar returned a non-JSON response.",
          upstreamStatus: response.status,
          responsePreview: raw.slice(0, 500),
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        upstreamStatus: response.status,
        success: response.ok,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not connect to RailRadar.",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}
