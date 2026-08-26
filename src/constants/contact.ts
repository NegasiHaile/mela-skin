/**
 * THE CONTACT PAGE — the form, the details, and the map.
 *
 * The booking form lives here and only here. Every other route ends with a
 * short band that points at this page, so there is one place to write to the
 * clinic rather than five copies of the same form.
 *
 * ON THE MAP. The embed is a Google Maps search rather than a coordinate pin,
 * and that is deliberate. The only coordinates the clinic has supplied are
 * approximate (lib/jsonld.ts carries them, flagged), and a pin dropped on
 * approximate coordinates sends a patient to the wrong door with more
 * confidence than no pin at all. Searching the address lets Google resolve the
 * building, which it does better than a guessed lat/lng.
 *
 * Replace `placeUrl` with the clinic's own Google Maps place link once someone
 * has stood outside the building with a phone. That is the fix; the search
 * query is the stand-in until then.
 */

import { brand } from "./brand";
import { todo } from "./placeholders";

/** What Google is asked to find. Built from the verified address. */
const MAP_QUERY = `${brand.address.line1}, ${brand.address.line2}, ${brand.address.city}, ${brand.address.country}`;

export const CONTACT = {
  eyebrow: "Contact",
  title: "Come and see us",
  lede: "The clinic is on the fourth floor of The Atrium on 88 Serenity, Westlands. Write using the form, call during opening hours, or use the map below to work out how long it will take you to get here.",

  /* -- The form ----------------------------------------------------------- */

  form: {
    eyebrow: "Write to us",
    note: "We reply within hours.",
    messagePrompt: "Tell us briefly what brings you in",
    submitLabel: "Send message",
    submittingLabel: "Opening mail…",
  },

  /* -- The map ------------------------------------------------------------ */

  map: {
    eyebrow: "Finding us",
    title: "The Atrium, Westlands",
    /**
     * Keyless Google Maps embed. Works without an API key and without a
     * billing account, which matters for a site that prerenders to static
     * files and has no server.
     */
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`,
    /** Opens the same search in the Maps app on a phone. */
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
    directionsLabel: "Get directions",
    /** Screen-reader label for the iframe. */
    frameTitle: `Map showing ${brand.name} at ${MAP_QUERY}`,
    /** Replace with the clinic's own place link once it has been verified. */
    placeUrl:
      "[Paste the clinic's Google Maps place link here once someone has confirmed the pin outside the building, then swap embedUrl and directionsUrl over to it.]",
    /**
     * The things people actually ring to ask. All three need the clinic to
     * answer them, so all three are visible placeholders rather than guesses.
     */
    notes: [
      {
        label: "Parking",
        body: "[Where patients park, whether it is validated, and what it costs.]",
      },
      {
        label: "Getting here",
        body: "[The nearest matatu stage or landmark, and roughly how long from the CBD at the times people book.]",
      },
      {
        label: "Access",
        body: "[Lift access to the fourth floor, step-free routes, and anything a patient with limited mobility should know before arriving.]",
      },
    ],
  },

  /* -- The closing band on every other route ------------------------------ */

  cta: {
    eyebrow: "Book",
    title: "Book a consultation",
    body: `${todo.consultLength} min with ${todo.clinicianName}. Online booking opens ${todo.bookingOpens}.`,
    primary: "Contact the clinic",
    secondary: "Call the clinic",
  },
} as const;
