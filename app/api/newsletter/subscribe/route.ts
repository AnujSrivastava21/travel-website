
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (
      !email ||
      email.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    try {
      const result = await pool.query(
        `INSERT INTO newsletter_subscribers (email, user_id)
         VALUES ($1, NULL)
         RETURNING id, email, created_at`,
        [email]
      );

      return NextResponse.json(
        {
          success: true,
          message: "You have subscribed successfully!",
          subscriber: result.rows[0],
        },
        { status: 201 }
      );
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "This email is already subscribed.",
          },
          { status: 409 }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error("Newsletter subscription failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to subscribe right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
