import type { Metadata } from "next";
import { ABOUT, META } from "@/constants";
import { BookingCta } from "@/components/BookingCta";
import { Clinician, Premises } from "@/components/Clinic";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { Principles } from "@/components/Principles";
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
  The clinic itself.

  ORDER. Abseret named what this page is for at 00:17:24: "either about our
  clinic, our mission and vision, and then each provider that we have a little
  bit of a bio about them." So those two come first — the story, then the
  providers — and how the clinic works, what a consultation examines and where
  the building is follow.

  TWO SECTIONS CAME OFF ON 1 SEP, at the daily: the skincare partners band (off
  the whole site, not just this page) and Dr. Hailu's provider block. The
  providers section is one clinician now, so the copy around it says one rather
  than two.

  The provider and premises sections live here rather than on the home page.
  Home carries a short teaser and links across, so neither page says the same
  thing twice.

  ASSESSMENT CAME OFF ON REQUEST -- "how your skin gets read" is not rendered
  on this page for now. components/Assessment.tsx and ABOUT.assessment are
  untouched, so putting the section back is one import and one line here.

  COLOUR. Each section floods its own flat ground now and picks it from the
  site's three-tone rotation -- see the note in app/page.tsx for what that
  rotation is and why it replaced one continuous gradient:

      PageHero    field    the opening
      Story       shell  ┐
      Clinician   paper  │ the rotation, one stop at a time
      Principles  cream  │
      Premises    shell  ┘
      BookingCta  cream    always last, always the deepest of the three
      footer      field

  Nothing between them is faded or gradiated: the steps are small enough that a
  hard edge is the smooth answer, and the only large steps are the hero's and
  the footer's.
*/ export default function About() {
  return (
    <>
      <GoldDefs />
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
              <p className="mb-4 font-display text-[1.35rem] leading-[1.2] text-ms-cream">
                On this page
              </p>
              {[
                { label: ABOUT.story.title, href: "#story" },
                { label: ABOUT.providers.title, href: "#clinician" },
                { label: ABOUT.principles.title, href: "#principles" },
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
              Book an appointment
            </PillSolid>
            <PillGhost
              href="/treatment-menu"
              tone="dark"
              className="min-h-13 px-8"
            >
              Treatment menu
            </PillGhost>
          </div>
        </PageHero>

        <Story />
        <Clinician />
        <Principles />
        <Premises />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
