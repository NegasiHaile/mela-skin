import type { Metadata } from "next";
import { ABOUT, META } from "@/constants";
import { Assessment } from "@/components/Assessment";
import { BookingCta } from "@/components/BookingCta";
import { Clinician, Premises } from "@/components/Clinic";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { Story } from "@/components/Story";
import { PillGhost, PillSolid } from "@/components/ui";

export const metadata: Metadata = {
  title: "About the clinic",
  description: META.aboutDescription,
  alternates: { canonical: "/about" },
  keywords: META.aboutKeywords,
};

/*
  The clinic itself, in the order somebody deciding whether to book wants it:
  why it exists, how it runs, what a consultation actually examines, who they
  will see, and where the building is.

  The clinician and premises sections moved here from the home page rather than
  being copied. Home carries a short teaser and links across, so neither page
  says the same thing twice.
*/
export default function About() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <PageHero
          id="hero-about"
          eyebrow={ABOUT.eyebrow}
          title={ABOUT.title}
          lede={ABOUT.lede}
          aside={
            <nav
              aria-label="On this page"
              className="flex flex-col gap-1 rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm"
            >
              <p className="eyebrow mb-3 text-ms-gold">On this page</p>
              {[
                { label: ABOUT.story.title, href: "#story" },
                { label: ABOUT.principles.title, href: "#principles" },
                { label: ABOUT.assessment.title, href: "#assessment" },
                { label: "Who you will see", href: "#clinician" },
                { label: "The premises", href: "#premises" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-11 items-center justify-between gap-4 border-b border-ms-sand/15 font-sans text-[15.5px] font-light text-ms-cream/85 transition-colors last:border-b-0 hover:text-ms-ivory"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="text-ms-gold transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              ))}
            </nav>
          }
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid href="/contact" tone="dark" className="min-h-13 px-8">
              Book a consultation
            </PillSolid>
            <PillGhost href="/treatment-menu" tone="dark" className="min-h-13 px-8">
              Menu &amp; prices
            </PillGhost>
          </div>
        </PageHero>

        <Story />
        <Principles />
        <Assessment />
        <Clinician />
        <Premises />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
