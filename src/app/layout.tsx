import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { brand } from "@/lib/brand";
import { clinicJsonLd } from "@/lib/jsonld";
import "./globals.css";

/*
  Larken is the clinic's primary typeface (brand deck p.9). Self-hosted from
  the licensed files in Resources/Marketing/Brand Identity/Fonts/Larken.rar.
  Four cuts only — the family is not variable despite the archive's naming, so
  every extra weight is another ~95KB over the wire.
*/
const larken = localFont({
  src: [
    { path: "../fonts/Larken-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Larken-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Larken-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/Larken-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-larken",
  display: "swap",
  fallback: ["Didot", "Bodoni MT", "Georgia", "serif"],
});

/* Secondary typography, option 3 of the three the brand deck offers (p.9). */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const titleDefault = `${brand.name} — ${brand.descriptor} in Westlands, Nairobi`;
const description =
  "Medical and cosmetic dermatology built for melanin-rich skin. Pigmentation, acne scarring, keloids and hair loss, diagnosed and treated in Westlands, Nairobi.";

export const metadata: Metadata = {
  metadataBase: new URL("https://melaskin.com"),
  title: {
    default: titleDefault,
    template: `%s — ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  authors: [{ name: brand.entity, url: "https://melaskin.com" }],
  creator: brand.entity,
  publisher: brand.entity,
  keywords: [
    "Mela Skin",
    "dermatology Nairobi",
    "cosmetic clinic Westlands",
    "melanin-rich skin",
    "pigmentation treatment",
    "melasma Kenya",
    "acne scarring",
    "keloids",
    "dermatologist Westlands",
  ],
  category: "health",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${brand.name} — ${brand.descriptor}`,
    description:
      "Medical and cosmetic dermatology built for melanin-rich skin, in Westlands, Nairobi.",
    url: "https://melaskin.com",
    siteName: brand.name,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${brand.name} — ${brand.descriptor}. ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.descriptor}`,
    description:
      "Medical and cosmetic dermatology built for melanin-rich skin, in Westlands, Nairobi.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3e7d6" },
    { media: "(prefers-color-scheme: dark)", color: "#74370c" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = clinicJsonLd();

  return (
    <html lang="en-KE" className={`${larken.variable} ${grotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
