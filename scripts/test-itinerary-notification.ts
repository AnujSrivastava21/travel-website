
import "dotenv/config";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.NEWSLETTER_FROM_EMAIL;
const to = process.env.TEST_EMAIL;

if (!apiKey || !from || !to) {
  throw new Error(
    "Missing RESEND_API_KEY, NEWSLETTER_FROM_EMAIL, or TEST_EMAIL in .env.local"
  );
}

const resend = new Resend(apiKey);

const itineraries = [
  {
    title: "Kashmir in Autumn",
    destination: "Kashmir, North India",
    duration: "7 days",
    description:
      "Discover autumn colours, peaceful mountain views, local culture, and slow travel experiences.",
    slug: "kashmir-slow-travel",
  },
  {
    title: "Kerala — Slow Travel",
    destination: "Kerala, South India",
    duration: "7 days",
    description:
      "Explore quiet villages, backwaters, beaches, and the everyday rhythm of Kerala.",
    slug: "kerala-7-days",
  },
];

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

const cards = itineraries
  .map(
    (item) => `
      <div style="padding:20px;border:1px solid #e5e7eb;border-radius:12px;margin:16px 0;background:#ffffff;">
        <p style="margin:0 0 8px;color:#b7791f;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
          ${item.destination} · ${item.duration}
        </p>
        <h2 style="margin:0 0 10px;color:#14213d;font-size:20px;">
          ${item.title}
        </h2>
        <p style="margin:0 0 16px;color:#5b6474;line-height:1.7;">
          ${item.description}
        </p>
        <a href="${siteUrl}/itineraries/${item.slug}"
           style="color:#1e4f8f;font-weight:bold;text-decoration:none;">
          Explore itinerary →
        </a>
      </div>
    `
  )
  .join("");

const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f4efe4;font-family:Arial,Helvetica,sans-serif;color:#14213d;">
  <div style="max-width:620px;margin:0 auto;padding:28px 16px;">
    <div style="background:#14213d;padding:32px 24px;border-radius:16px 16px 0 0;text-align:center;">
      <p style="margin:0 0 10px;color:#e8a317;font-size:12px;letter-spacing:3px;font-weight:bold;">
        THE LOCAL ROUTE
      </p>
      <h1 style="margin:0;color:#ffffff;font-size:30px;line-height:1.25;">
        Find your own way.
      </h1>
      <p style="margin:12px 0 0;color:#e5e7eb;line-height:1.6;">
        New journeys. Local stories. Your next adventure.
      </p>
    </div>

    <div style="background:#ffffff;padding:28px 22px;">
      <p style="font-size:16px;line-height:1.7;margin-top:0;">
        Hello, toh chalein phir Local Route se! 👋
      </p>
      <p style="color:#5b6474;line-height:1.7;">
        We've added <strong style="color:#14213d;">${itineraries.length} new itineraries</strong>
        to help you find your next journey.
      </p>

      ${cards}

      <div style="text-align:center;padding:12px 0 20px;">
        <a href="${siteUrl}/itineraries"
           style="display:inline-block;background:#1e4f8f;color:#ffffff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Explore All Itineraries
        </a>
      </div>

      <p style="line-height:1.7;color:#5b6474;">
        Thanks for subscribing and being part of our journey.
      </p>
      <p style="line-height:1.7;margin-bottom:0;">
        Anuj Srivastava<br />
        <strong>The Local Route</strong>
      </p>
    </div>

    <div style="padding:20px;text-align:center;color:#6b7280;font-size:12px;line-height:1.7;">
      Find your own way.<br />
      This is a preview email sent to your test address.
    </div>
  </div>
</body>
</html>
`;

const text = `
THE LOCAL ROUTE — Find your own way.

Hello, toh chalein phir Local Route se!

We've added ${itineraries.length} new itineraries:

${itineraries
  .map(
    (item) =>
      `• ${item.title} — ${item.destination}, ${item.duration}\n  ${siteUrl}/itineraries/${item.slug}`
  )
  .join("\n\n")}

Explore all itineraries: ${siteUrl}/itineraries

Thanks for subscribing,
Anuj Srivastava
The Local Route

This is a preview email sent to your test address.
`;

async function main() {
  const result = await resend.emails.send({
    from,
    to,
    subject: "Preview: New journeys from The Local Route ✈️",
    html,
    text,
  });

  if (result.error) {
    console.error("Email sending failed:", result.error);
    process.exitCode = 1;
    return;
  }

  console.log(`Test email submitted for ${to}`);
  console.log("Resend email ID:", result.data?.id);
}

main().catch((error) => {
  console.error("Test email failed:", error);
  process.exitCode = 1;
});
