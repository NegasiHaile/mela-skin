import { CONDITIONS, CONTACT, COSMETIC, SOCIAL, brand } from "@/constants";

/** Local clinic schema for Google / rich results. */
export function clinicJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${brand.address.line1}, ${brand.address.line2}`,
    /*
      THE SUBURB IS ITS OWN FIELD, and it has to be: `addressLocality` is the
      city, and Muthaiga in the street line would be read as part of the street.
      Google matches a Kenyan address on the suburb more than on anything else
      in it.
    */
    addressRegion: brand.address.area,
    addressLocality: brand.address.city,
    addressCountry: brand.address.country,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${brand.origin}/#clinic`,
        name: brand.name,
        legalName: brand.entity,
        alternateName: "MELA SKIN",
        description:
          "Medical and cosmetic dermatology clinic built for melanin-rich skin in Muthaiga, Nairobi.",
        url: brand.origin,
        logo: `${brand.origin}/brand/brandmark-gold.png`,
        image: `${brand.origin}/og-image.jpg`,
        /* No `telephone`. See the note in constants/brand.ts. */
        email: brand.email,
        slogan: brand.tagline,
        address,
        /*
          NO `geo`, deliberately.

          There was one, at -1.2674 / 36.8108, commented "approximate Westlands
          / The Atrium". The final letterhead puts the clinic in Muthaiga, which
          makes those coordinates not approximate but wrong, and a wrong pin in
          structured data is what a phone's Maps app navigates to. Nobody has
          stood outside OLA Energy Plaza with a handset yet, so there is no
          honest replacement and the field is absent instead -- `hasMap` below
          hands Google the address to resolve, which it does well.

          Add `geo` back the same day somebody reads the real coordinates off
          the door, and swap CONTACT.map over to a place link at the same time.
        */
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
          url: `${brand.origin}/cosmetic-dermatology#${family.slug}`,
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
        /*
          The accounts that exist. Three of the four in constants/placeholders.ts
          are still bracketed, and `flatMap` drops those rather than asserting a
          profile the clinic does not have -- which is what an empty array used
          to do to all four, LinkedIn included.
        */
        sameAs: SOCIAL.flatMap((account) => (account.href ? [account.href] : [])),
      },
      {
        "@type": "WebSite",
        "@id": `${brand.origin}/#website`,
        url: brand.origin,
        name: brand.name,
        description: `${brand.descriptor} in ${brand.address.area}, ${brand.address.city}.`,
        publisher: { "@id": `${brand.origin}/#clinic` },
        inLanguage: "en-KE",
      },
    ],
  };
}
