import { AboutTeaser } from "@/components/AboutTeaser";
import { BookingCta } from "@/components/BookingCta";
import { Consultation } from "@/components/Consultation";
import { Focus } from "@/components/Focus";
import { GoldDefs } from "@/components/brand/Marks";
import { HeroSwitcher } from "@/components/hero/HeroSwitcher";
import { Pillars } from "@/components/Pillars";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { Treatments } from "@/components/Treatments";
import { Visit } from "@/components/Visit";

/**
 * Direction B — immersive, full-bleed. Direction A lives at /editorial.
 *
 * The order is an argument, in five beats: here is the problem (Focus), here
 * is how the clinic is arranged around it (Pillars), here is everything it
 * treats (Treatments), here is how you find out what yours involves
 * (Consultation), here is what happens when you come in (Visit). Then the
 * proof: who you will see, what patients said, and the booking form.
 *
 * Beat four used to be a band of six prices. The 26 Aug 2026 meeting took
 * pricing off the site, so it states the consultative model instead — see
 * components/Consultation.tsx and the header of constants/menu.ts.
 *
 * The full clinician biography and the premises moved to /about. AboutTeaser
 * is a short band that links across, so no section runs twice across the two
 * pages.
 *
 * THE HERO IS TWO HEROES FOR NOW, with a toggle bottom right, so the team can
 * pick between the current one and the one before it — see
 * components/hero/HeroSwitcher.tsx. When they choose, that wrapper goes and the
 * winner is rendered here directly.
 */
export default function Home() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <HeroSwitcher />
        <Focus />
        <Pillars />
        <Treatments />
        <Consultation />
        <Visit />
        <AboutTeaser />
        <Reviews />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
