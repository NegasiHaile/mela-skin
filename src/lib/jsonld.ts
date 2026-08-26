import { CONDITIONS, CONTACT, COSMETIC, MENU_FROM, MENU_ITEM_COUNT, brand } from "@/constants";

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
        // Points at the same search the contact page embeds, so the map a
        // search engine offers and the map on the site agree.
        hasMap: CONTACT.map.directionsUrl,
        medicalSpecialty: ["Dermatology", "Cosmetic Dermatology"],
        /*
          The ten conditions from Resources/more-info.md. `knowsAbout` rather
          than `availableService` because a condition is not a procedure — the
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
          Every cosmetic treatment carries a published figure, so the catalogue
          is described honestly as an aggregate rather than left as a vague
          priceRange band.
        */
        makesOffer: {
          "@type": "AggregateOffer",
          priceCurrency: "KES",
          lowPrice: MENU_FROM,
          offerCount: MENU_ITEM_COUNT,
          url: "https://melaskin.com/treatment-menu",
        },
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
