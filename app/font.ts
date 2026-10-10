import { Fraunces, Figtree } from "next/font/google";

// Headlines: a warm, soft serif with real character (variable font).
export const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

// Body and UI text: a friendly, very readable sans.
export const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});