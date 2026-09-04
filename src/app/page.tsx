import { AboutTeaser } from "@/components/AboutTeaser";
import { BookingCta } from "@/components/BookingCta";
import { Focus } from "@/components/Focus";
import { GoldDefs } from "@/components/brand/Marks";
import { HeroSerum } from "@/components/hero/HeroSerum";
import { Pillars } from "@/components/Pillars";
import { SiteFooter } from "@/components/SiteFooter";
import { Treatments } from "@/components/Treatments";
import { Visit } from "@/components/Visit";

/**
 * Direction B — immersive, full-bleed. Direction A lives at /editorial.
 *
 * The order is an argument, in four beats: here is the problem (Focus), here is
 * how the clinic is arranged around it (Pillars), here is everything it treats
 * (Treatments), here is what to expect when you come in (Visit). Then the proof:
 * who you will see, and the way to book.
 *
 * FOUR SECTIONS CAME OFF ON 1 SEP, at the daily. Three of them were on this page:
 *
 *   Consultation      "Tailored first, quoted second" — the band that replaced
 *                     the price list. Taken off because its purpose was not clear
 *                     on the page. What it carried is not lost: the free cosmetic
 *                     consult, the paid medical one and the no-price-list argument
 *                     are all on /treatment-menu's FAQ and in the closing band of
 *                     /cosmetic-dermatology.
 *   SkincarePartners  the shelf. Off the whole site, not just this page.
 *   Reviews           "In their words". It held three empty slots, because the
 *                     clinic has not opened and there is nobody to quote yet.
 *
 * The fourth was Dr. Hailu's block on /about.
 *
 * The full clinician biography and the premises live on /about. AboutTeaser
 * renders the same provider card /about does -- ClinicianProfile, shared since
 * the request to stop keeping two different designs for one person -- and
 * links across for the rest.
 *
 * COLOUR: ONE CONTINUOUS GRADIENT AGAIN, `body`'s own, shell at the top of the
 * page to linen at the bottom -- see the note in globals.css. This page's
 * colour has had three lives: alternating near-white and #2C190B six times
 * over (killed at the 31 Aug review, "too drastic from one to another"),
 * then a rotation of three isolated flats per section (`ms-shell` / `ms-paper`
 * / `ms-cream`, on request, after the first gradient came off), and now the
 * gradient back a second time, also on request, once the isolated flats
 * turned out to show a visible step in the pattern at every section boundary
 * -- see the fuller history in components/brand/PatternField.tsx. Every
 * section below is transparent; the gradient is what shows through all of
 * them, and each one still carries its own `PatternField tone="light"` for
 * the motif over it. `BookingCta` is the one exception that predates all
 * three colour schemes and outlives them: it always floods `ms-cream`
 * regardless of where it falls on a page, because it is always the last
 * thing before the footer -- see the note in components/BookingCta.tsx.
 *
 * THE HERO WAS THREE HEROES FOR A WHILE, with a switcher bottom right so the
 * team could pick between them -- components/hero/HeroSwitcher.tsx. The
 * choice is made: `HeroSerum`, the clinic's own demonstration video, full-
 * bleed. Rendered directly here now, per the switcher file's own plan for
 * this moment. The other two variants (HeroPhoto, HeroOriginal) and the
 * switcher itself are UNLINKED, not deleted -- their files, and
 * HeroOriginalFrames/HeroBackground under them, are untouched in
 * components/hero/, kept in case a later review wants them back. Nothing on
 * this page imports them any more.
 */ export default function Home() {
  return (
    <>
      <GoldDefs />
      <main>
        <HeroSerum />

        <Focus />
        <Pillars />
        <Treatments />
        <Visit />
        <AboutTeaser />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
