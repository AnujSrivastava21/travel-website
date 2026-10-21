import { Resend } from "resend";

async function main() {
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.NEWSLETTER_FROM_EMAIL;
const recipient = process.env.TEST_EMAIL;

if (!apiKey || !from || !recipient) {
throw new Error(
"Missing RESEND_API_KEY, NEWSLETTER_FROM_EMAIL, or TEST_EMAIL in .env.local"
);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
from,
to: [recipient],
subject: "The Local Route — Email Test",
html: `       <div style="font-family:Arial,sans-serif;line-height:1.7">         <h1>The Local Route</h1>         <p>Your Resend email configuration is working!</p>         <p>This is a test email. No newsletter subscribers were contacted.</p>       </div>
    `,
text: "The Local Route: Your Resend email configuration is working!",
});

if (error) {
console.error("Email test failed:", error);
process.exitCode = 1;
return;
}

console.log("Resend accepted the test email.");
console.log("Email ID:", data?.id);
console.log("Recipient:", recipient);
}

main().catch((error: unknown) => {
console.error("Resend test failed:", error);
process.exitCode = 1;
});
