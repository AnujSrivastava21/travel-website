
import { Resend } from "resend";
import type { Pool } from "pg";

export interface NewItinerary {
  slug: string;
  title: string;
  destination: string;
  description: string;
  coverImage: string | null;
}

export interface NotificationResult {
  totalSubscribers: number;
  sent: number;
  failed: number;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getItineraryUrl(siteUrl: string, slug: string): string {
  return `${siteUrl}/itineraries/${encodeURIComponent(slug)}`;
}

function buildHtmlEmail(
  itineraries: NewItinerary[],
  siteUrl: string
): string {
  const count = itineraries.length;

  const itineraryCards = itineraries
    .map((itinerary, index) => {
      const title = escapeHtml(itinerary.title);
      const destination = escapeHtml(itinerary.destination);
      const description = escapeHtml(
        itinerary.description || "Discover this destination with The Local Route."
      );
      const url = escapeHtml(getItineraryUrl(siteUrl, itinerary.slug));

      return `
        <tr>
          <td style="padding:0 0 14px;">
            <table role="presentation" width="100%" cellpadding="0"
              cellspacing="0" border="0"
              style="background:#ffffff;border:1px solid #e5e7eb;
              border-radius:12px;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 8px;color:#b7790b;
                    font-size:11px;font-weight:bold;
                    letter-spacing:1.5px;">
                    NEW ITINERARY ${index + 1}
                  </p>

                  <h3 style="margin:0 0 8px;color:#14213d;
                    font-size:19px;line-height:1.4;">
                    ${title}
                  </h3>

                  <p style="margin:0 0 10px;color:#1e4f8f;
                    font-size:13px;font-weight:bold;">
                    ${destination}
                  </p>

                  <p style="margin:0 0 16px;color:#596579;
                    font-size:14px;line-height:1.8;">
                    ${description}
                  </p>

                  <a href="${url}"
                    style="color:#1e4f8f;font-size:14px;
                    font-weight:bold;text-decoration:none;">
                    Explore itinerary &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  const itineraryWord = count === 1 ? "itinerary" : "itineraries";
  const journeyWord = count === 1 ? "journey" : "journeys";

  const allItinerariesUrl = escapeHtml(`${siteUrl}/itineraries`);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Local Route — New Travel Itineraries</title>
      </head>

      <body style="margin:0;padding:0;background-color:#f4efe4;
        font-family:Arial,Helvetica,sans-serif;color:#14213d;">

        <table role="presentation" width="100%" cellpadding="0"
          cellspacing="0" border="0"
          style="background-color:#f4efe4;padding:28px 12px;">
          <tr>
            <td align="center">

              <table role="presentation" width="100%" cellpadding="0"
                cellspacing="0" border="0"
                style="max-width:620px;width:100%;">

                <!-- Header -->
                <tr>
                  <td align="center"
                    style="background-color:#14213d;padding:36px 22px;
                    border-radius:18px 18px 0 0;">

                    <p style="margin:0 0 12px;color:#e8a317;
                      font-size:12px;font-weight:bold;
                      letter-spacing:3px;">
                      THE LOCAL ROUTE
                    </p>

                    <h1 style="margin:0;color:#ffffff;
                      font-size:30px;line-height:1.3;">
                      Find your own way.
                    </h1>

                    <p style="margin:12px 0 0;color:#e5e7eb;
                      font-size:14px;line-height:1.8;">
                      New places. Local stories. Your next adventure.
                    </p>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="background-color:#ffffff;padding:30px 22px;">

                    <p style="margin:0 0 16px;color:#14213d;
                      font-size:18px;line-height:1.7;">
                      Hello, toh chalein phir Local Route se! 👋
                    </p>

                    <p style="margin:0 0 22px;color:#596579;
                      font-size:15px;line-height:1.9;">
                      Your next adventure might be just around the corner.
                      We've just added
                      <strong style="color:#1e4f8f;">
                        ${count} more ${itineraryWord}
                      </strong>
                      to help you discover new places, local experiences,
                      and journeys worth remembering.
                    </p>

                    <!-- Count highlight -->
                    <table role="presentation" width="100%" cellpadding="0"
                      cellspacing="0" border="0"
                      style="background-color:#fff8e8;border-radius:12px;
                      margin-bottom:28px;">
                      <tr>
                        <td align="center" style="padding:22px 16px;">
                          <p style="margin:0 0 6px;color:#8a5a00;
                            font-size:11px;font-weight:bold;
                            letter-spacing:2px;">
                            JUST ADDED
                          </p>

                          <p style="margin:0;color:#14213d;
                            font-size:28px;font-weight:bold;">
                            ${count} new ${journeyWord}
                          </p>

                          <p style="margin:8px 0 0;color:#596579;
                            font-size:13px;">
                            More reasons to take the road less travelled.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <h2 style="margin:0 0 18px;color:#14213d;
                      font-size:21px;line-height:1.4;">
                      Your new travel plans
                    </h2>

                    <!-- Dynamic itinerary list -->
                    <table role="presentation" width="100%" cellpadding="0"
                      cellspacing="0" border="0">
                      ${itineraryCards}
                    </table>

                    <!-- Explore button -->
                    <table role="presentation" align="center" cellpadding="0"
                      cellspacing="0" border="0"
                      style="margin:20px auto 8px;">
                      <tr>
                        <td align="center"
                          style="background-color:#1e4f8f;border-radius:10px;">
                          <a href="${allItinerariesUrl}"
                            style="display:inline-block;padding:16px 24px;
                            color:#ffffff;text-decoration:none;
                            font-size:14px;font-weight:bold;">
                            Explore All Itineraries &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:28px 0 0;color:#596579;
                      font-size:14px;line-height:1.9;">
                      Thanks for subscribing and being part of our travel
                      community. Here's to discovering new roads, meeting
                      new people, and collecting stories along the way.
                    </p>

                    <p style="margin:22px 0 0;color:#14213d;
                      font-size:15px;line-height:1.9;">
                      Happy travelling,<br />
                      <strong>Anuj Srivastava</strong><br />
                      <span style="color:#1e4f8f;">The Local Route</span>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center"
                    style="background-color:#14213d;padding:24px 18px;
                    border-radius:0 0 18px 18px;">

                    <p style="margin:0;color:#ffffff;
                      font-size:13px;font-weight:bold;">
                      THE LOCAL ROUTE
                    </p>

                    <p style="margin:8px 0;color:#e5e7eb;
                      font-size:12px;line-height:1.8;">
                      Find your own way. Discover India your way.
                    </p>

                    <p style="margin:12px 0 0;color:#cbd5e1;
                      font-size:11px;line-height:1.8;">
                      You received this email because you subscribed
                      to The Local Route.
                    </p>

                    <p style="margin:8px 0 0;color:#9ca3af;
                      font-size:11px;line-height:1.7;">
                      Please use the newsletter unsubscribe option
                      when it becomes available.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function buildTextEmail(
  itineraries: NewItinerary[],
  siteUrl: string
): string {
  const count = itineraries.length;

  const itineraryLines = itineraries
    .map(
      (itinerary, index) =>
        `${index + 1}. ${itinerary.title}\n` +
        `   Destination: ${itinerary.destination}\n` +
        `   ${getItineraryUrl(siteUrl, itinerary.slug)}`
    )
    .join("\n\n");

  return [
    "THE LOCAL ROUTE",
    "Find your own way.",
    "",
    "Hello, toh chalein phir Local Route se!",
    "",
    `We've added ${count} more ${
      count === 1 ? "itinerary" : "itineraries"
    } to help you plan your next adventure.`,
    "",
    "YOUR NEW TRAVEL PLANS",
    "",
    itineraryLines,
    "",
    `Explore all itineraries: ${siteUrl}/itineraries`,
    "",
    "Thanks for subscribing!",
    "",
    "Happy travelling,",
    "Anuj Srivastava",
    "The Local Route",
  ].join("\n");
}

export async function sendNewItineraryNotifications(
  db: Pool,
  itineraries: NewItinerary[]
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM_EMAIL;
  const siteUrl = process.env.SITE_URL?.replace(/\/+$/, "");

  if (!apiKey || !from || !siteUrl) {
    throw new Error(
      "Missing RESEND_API_KEY, NEWSLETTER_FROM_EMAIL, or SITE_URL."
    );
  }

  if (itineraries.length === 0) {
    return { totalSubscribers: 0, sent: 0, failed: 0 };
  }

  const subscriberResult = await db.query<{ email: string }>(
    `SELECT email
     FROM newsletter_subscribers
     WHERE is_active = TRUE
     ORDER BY id ASC`
  );

  const subscribers = subscriberResult.rows;

  const result: NotificationResult = {
    totalSubscribers: subscribers.length,
    sent: 0,
    failed: 0,
  };

  if (subscribers.length === 0) {
    console.log("No active newsletter subscribers.");
    return result;
  }

  const resend = new Resend(apiKey);
  const count = itineraries.length;

  const subject =
    count === 1
      ? `The Local Route: ${itineraries[0].title} is here!`
      : `The Local Route: ${count} new travel itineraries are here!`;

  const html = buildHtmlEmail(itineraries, siteUrl);
  const text = buildTextEmail(itineraries, siteUrl);

  // Send one combined email to each active subscriber.
  for (const subscriber of subscribers) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [subscriber.email],
        subject,
        html,
        text,
      });

      if (error) {
        result.failed++;
        console.error(
          `Email failed for ${subscriber.email}:`,
          error
        );
        continue;
      }

      result.sent++;

      console.log("Newsletter accepted by Resend:", {
        recipient: subscriber.email,
        emailId: data?.id,
        itineraryCount: count,
      });
    } catch (error) {
      result.failed++;

      console.error(
        `Unexpected notification error for ${subscriber.email}:`,
        error
      );
    }
  }

  return result;
}
