/**
 * THE CONTACT PAGE — the form, the details, and the map.
 *
 * The booking form lives here and only here. Every other route ends with a
 * short band that points at this page, so there is one place to write to the
 * clinic rather than five copies of the same form.
 *
 * ON THE MAP. The embed is a Google Maps search rather than a coordinate pin,
 * and that is deliberate: the clinic has supplied no coordinates at all, and a
 * pin dropped on a guess sends a patient to the wrong door with more confidence
 * than no pin at all. Searching the address lets Google resolve the building,
 * which it does better than a lat/lng nobody has stood on.
 *
 * There WERE approximate coordinates, in lib/jsonld.ts. They were Westlands',
 * and the final letterhead puts the clinic in Muthaiga, so they were not
 * approximate any more -- they were wrong. Deleted rather than moved.
 *
 * Replace `placeUrl` with the clinic's own Google Maps place link once someone
 * has stood outside the building with a phone. That is the fix; the search
 * query is the stand-in until then.
 */

import { brand } from "./brand";
import { PRIMARY_CLINICIAN } from "./clinic";
import { todo } from "./placeholders";

/** What Google is asked to find. Built from the letterhead's address. */
const MAP_QUERY = `${brand.address.oneLine}, ${brand.address.country}`;

export const CONTACT = {
  eyebrow: "Contact",
  title: "Come and see us",
  lede: "The clinic is on the 1st floor of OLA Energy Plaza in Muthaiga. Write using the form, or use the map below to work out how long it will take you to get here.",

  /* -- The form ----------------------------------------------------------- */

  form: {
    eyebrow: "Write to us",
    note: "We reply within hours.",
    messagePrompt: "Tell us briefly what brings you in",
    /**
     * Under the send button. The form has no server behind it: it opens the
     * visitor's own mail client with the fields filled in, which is worth
     * saying, because a send button that opens Outlook and sends nothing looks
     * broken. This corner used to hold the phone number instead.
     */
    mailNote: "The button opens your own mail app with this filled in.",
    submitLabel: "Send message",
    submittingLabel: "Opening mail…",
  },

  /* -- The map ------------------------------------------------------------ */

  map: {
    title: brand.address.short,
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
    /*
      THE THINGS PEOPLE ACTUALLY RING TO ASK -- parking, getting here without a
      car, step-free access -- used to sit here as three bracketed rows,
      because all three need the clinic to answer them and none had been.
      Removed rather than shown unconfirmed: a contact page guessing at its
      own building's parking is worse than a contact page saying nothing.
      Bring a note back as `{ label, body }` here, and the row in
      components/ClinicMap.tsx that used to render `notes.map(...)`, once the
      clinic has a real answer for it.
    */
  },

  /* -- The closing band on every other route ------------------------------ */

  /*
     THE ACTION IS AN APPOINTMENT, not a consultation. Changed at the 1 Sep
     daily, and it is the better word for a button: "consultation" is the name of
     a thing that happens once you are in the room, and it costs different amounts
     on the two sides of the clinic, so a button offering one was promising
     something the page then had to qualify. "Appointment" is what you are asking
     for. The word "consultation" is still all over the body copy, where it is
     describing the appointment rather than labelling a control.

     `primary` says "request" and not "book" on purpose: online booking is not
     live yet (see `todo.openingDate` -- booking opens with the doors, not on
     a date of its own), so the button goes to a form and an email address,
     and a button that says book when nothing books is the kind of small lie
     a clinic site cannot afford.
  */
  cta: {
    title: "Book an appointment",
    /*
      WHAT THE VISIT IS, NOT WHEN BOOKING OPENS. It said "Online booking opens
      [date]" here until 3 Sep -- a fine fact, but the wrong one for a band
      whose whole job is to make the appointment sound worth requesting. What
      it is (an examination, a plain-language diagnosis, a plan) does that;
      when online booking starts does not, and the date was still bracketed
      besides. `todo.openingDate` is still stated elsewhere it belongs -- the
      premises band, the skincare page -- this just is not one of those.
    */
    body: `${todo.consultLength} min with ${PRIMARY_CLINICIAN.name}, your skin examined, a diagnosis in plain language, and a written plan to leave with.`,
    primary: "Request an appointment",
  },
} as const;
