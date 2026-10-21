
import { NextResponse } from "next/server";
import { getItinerariesFromDatabase } from "../../../lib/itineraries-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const itineraries = await getItinerariesFromDatabase();

    return NextResponse.json({
      success: true,
      source: "PostgreSQL",
      count: itineraries.length,
      sample: itineraries.slice(0, 2),
    });
  } catch (error) {
    console.error("Itinerary database test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch itineraries from PostgreSQL",
      },
      { status: 500 }
    );
  }
}
