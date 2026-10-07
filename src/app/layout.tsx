import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { clinic } from "@/lib/clinic";
import { FloatingWhatsApp, MobileActionBar, Navbar } from "@/components/chrome";
import { Footer } from "@/components/footer";
import "./globals.css";

/* Fraunces — editorial serif display · Instrument Sans — modern, readable UI */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

/** Set NEXT_PUBLIC_SITE_URL once the clinic's real domain is registered. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.manyattadental.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manyatta Dental — Dentist in Narok, Kenya",
    template: "%s · Manyatta Dental, Narok",
  },
  description: clinic.description,
  keywords: [
    "dentist in Narok",
    "dental clinic Narok",
    "dentist Narok Kenya",
    "dental services Narok",
    "teeth cleaning Narok",
    "dental check-up Narok",
    "dental clinic in Narok",
    "Manyatta Dental",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: clinic.name,
    title: "Manyatta Dental — Dentist in Narok, Kenya",
    description: clinic.description,
    images: [
      {
        url: "/images/smile.jpg",
        width: 900,
        height: 1200,
        alt: "A warm, confident smile — Manyatta Dental, Narok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manyatta Dental — Dentist in Narok, Kenya",
    description: clinic.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  width: "device-width",
  initialScale: 1,
};

/**
 * LocalBusiness / Dentist structured data.
 * Only verified-safe fields are published. [VERIFY_PHONE], [VERIFY_ADDRESS],
 * [VERIFY_HOURS], geo coordinates and social profiles will be added here once
 * confirmed — never guessed.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  description: clinic.description,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Narok",
    addressRegion: "Narok County",
    addressCountry: "KE",
  },
  areaServed: { "@type": "City", name: "Narok" },
  medicalSpecialty: "Dentistry",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-ivory"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="content">{children}</main>
        {/* Clearance so the mobile action bar never covers footer content */}
        <div aria-hidden className="h-20 lg:hidden" />
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
