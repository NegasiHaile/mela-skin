import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  Ranade — the brand's official secondary typeface, from
  Resources/MELA SKIN - Visual Identity Assets/5_Typography/Secondary Font/
  Ranade_Complete. It is the face the official logo lockup sets
  "DERMATOLOGY & COSMETIC CLINIC" in, so it is what the descriptor line and all
  body copy should be in.

  It replaced Space Grotesk, which was a stand-in from Google Fonts chosen
  before the brand package arrived. Self-hosting it drops a third-party origin
  from every page load, and the package ships production .woff2 files plus an
  ITF Free Font License that permits self-hosting.

  Three upright cuts, matching the three the stand-in loaded. No italic: the
  only italic on the site is Larken (the tagline and the family summaries), so
  an italic Ranade would be 23KB fetched and never drawn.
*/
const ranade = localFont({
  src: [
    { path: "../fonts/Ranade-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Ranade-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Ranade-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ranade",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const titleDefault = `${brand.name} — ${brand.descriptor} in ${brand.address.area}, ${brand.address.city}`;
const description = META.siteDescription;

export const metadata: Metadata = {
  /*
    ONE ORIGIN, from constants/brand.ts, and it changed on 2 Sep. It was
    `https://melaskin.com`, written out by hand here and in ten other places
    across robots.ts, sitemap.ts and lib/jsonld.ts. The final letterhead prints
    `www.melaskin.ke`, so all eleven now read `brand.origin` and there is one
    line to edit if it ever moves again.
  */
  metadataBase: new URL(brand.origin),
  title: {
    default: titleDefault,
    template: `%s — ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  authors: [{ name: brand.entity, url: brand.origin }],
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
    url: brand.origin,
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
  /*
    `telephone: false` since 2 Sep, and the reason is the phone coming off the
    site rather than a change of heart about the feature. With no number to
    linkify, Safari's detector has nothing to find and everything to get wrong:
    what is left in this shape on these pages is a KRA PIN, a KMPDC
    registration number and a consultation fee, and a tel: link wrapped round
    any of those is a dial prompt to nothing.
  */
  formatDetection: {
    telephone: false,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4e7d6" },
    { media: "(prefers-color-scheme: dark)", color: "#2c190b" },
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
    <html lang="en-KE" className={`${larken.variable} ${ranade.variable}`}>
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
