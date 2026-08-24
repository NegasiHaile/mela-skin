import { brand } from "@/lib/brand";

/** Local clinic schema for Google / rich results. */
export function clinicJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${brand.address.line1}, ${brand.address.line2}`,
    addressLocality: brand.address.city,
    addressCountry: brand.address.country,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://melaskin.com/#clinic",
        name: brand.name,
        legalName: brand.entity,
        alternateName: "MELA SKIN",
        description:
          "Medical and cosmetic dermatology clinic built for melanin-rich skin in Westlands, Nairobi.",
        url: "https://melaskin.com",
        logo: "https://melaskin.com/brand/logo.png",
        image: "https://melaskin.com/og-image.jpg",
        telephone: brand.phone,
        email: brand.email,
        slogan: brand.tagline,
        address,
        geo: {
          "@type": "GeoCoordinates",
          // Approximate Westlands / The Atrium — refine with exact coords at launch
          latitude: -1.2674,
          longitude: 36.8108,
        },
        areaServed: {
          "@type": "City",
          name: "Nairobi",
        },
        medicalSpecialty: ["Dermatology", "Cosmetic Dermatology"],
        priceRange: "$$",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://melaskin.com/#website",
        url: "https://melaskin.com",
        name: brand.name,
        description: `${brand.descriptor} in Westlands, Nairobi.`,
        publisher: { "@id": "https://melaskin.com/#clinic" },
        inLanguage: "en-KE",
      },
    ],
  };
}
