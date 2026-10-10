import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "../components/navigation/navbar";
import { Footer } from "../components/layout/footer"
import { headingFont, bodyFont } from "./font";
// import { AuthSessionProvider } from "@/components/providers/session-provider";

import { AuthSessionProvider } from "../components/provider/session-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Travel With Anuj | Explore India Like a Local",
    template: "%s | Travel With Anuj",
  },

  description:
    "Explore India through solo travel stories, destination guides and practical itineraries by Anuj.",

  keywords: [
    "India travel",
    "solo travel India",
    "India travel itineraries",
    "budget travel India",
    "Spiti Valley",
    "Kashmir travel",
  ],

  authors: [{ name: "Anuj Srivastava" }],
  creator: "Anuj Srivastava",

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Travel With Anuj",
    title: "Travel With Anuj | Explore India Like a Local",
    description:
      "Solo travel stories, destination guides and practical itineraries for exploring India.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <AuthSessionProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}