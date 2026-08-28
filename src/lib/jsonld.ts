import { CONDITIONS, CONTACT, COSMETIC, brand } from "@/constants";

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
        logo: "https://melaskin.com/brand/brandmark-gold.png",
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
        // Points at the same search the contact page embeds, so the map a
        // search engine offers and the map on the site agree.
        hasMap: CONTACT.map.directionsUrl,
        medicalSpecialty: ["Dermatology", "Cosmetic Dermatology"],
        /*
          The conditions from constants/conditions.ts. `knowsAbout` rather than
          `availableService` because a condition is not a procedure — the
          procedures are listed separately below.
        */
        knowsAbout: CONDITIONS.map((condition) => condition.title),
        availableService: COSMETIC.map((family) => ({
          "@type": "MedicalProcedure",
          name: family.title,
          description: family.summary,
          url: `https://melaskin.com/cosmetic-dermatology#${family.slug}`,
        })),
        /*
          NO PRICING CLAIMS, deliberately.

          There was an AggregateOffer here with a lowPrice and an offerCount,
          and a priceRange band beside it. Both are gone with the rest of the
          pricing (see the header of constants/menu.ts): asserting a price
          floor or a "$$" band in structured data while declining to publish
          prices on the page is the same disclosure by a side door, and it is
          the version that ends up in a search result rather than on a page a
          patient can read in context.
        */
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
