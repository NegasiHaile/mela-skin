import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { META, brand } from "@/constants";
import { clinicJsonLd } from "@/lib/jsonld";
import "./globals.css";

/*
  Larken is the clinic's primary typeface (brand deck p.9). Self-hosted from
  the licensed files in Resources/Marketing/Brand Identity/Fonts/Larken.rar.

  Served as WOFF2, converted from the supplied TTFs: 377KB of TTF becomes
  138KB, which is the single cheapest weight saving on the site and changes
  nothing on screen. The .ttf files are kept as the masters; nothing loads
  them. Regenerate with scripts/fonts-to-woff2.py if the family is updated.

  Four cuts only — the family is not variable despite the archive's naming, so
  every extra weight is another ~34KB over the wire.
*/
const larken = localFont({
  src: [
    { path: "../fonts/Larken-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Larken-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Larken-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Larken-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-larken",
  display: "swap",
  fallback: ["Didot", "Bodoni MT", "Georgia", "serif"],
});

/*
  Secondary typography, option 3 of the three the brand deck offers (p.9).

  Three weights, not four. Nothing on the site sets `font-bold` on sans type —
  the only bold on the page is the Larken wordmark — so 700 was a font file
  fetched and never used.
*/
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-grotesk",
  display: "swap",
});

const titleDefault = `${brand.name} — ${brand.descriptor} in Westlands, Nairobi`;
const description = META.siteDescription;

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
  keywords: META.keywords,
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
    description: META.shortDescription,
    url: "https://melaskin.com",
    siteName: brand.name,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${brand.name}, ${brand.descriptor}. ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.descriptor}`,
    description: META.shortDescription,
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
      <head>
        {/*
          Framer Motion renders its `initial` state into the server HTML, which
          means roughly eighty blocks ship at opacity 0 and are revealed on
          hydration. If the bundle never arrives — JS off, a failed chunk, a
          text-mode reader — the page would be blank. Every wrapper that ships
          hidden carries `data-motion`, so this puts all of them back.
        */}
        <noscript>
          <style>{`
            [data-motion] {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
            }
            [data-motion="progress"] { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
