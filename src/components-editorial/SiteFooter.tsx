import { CONDITIONS, COSMETIC, brand, todo } from "@/constants";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { Card, Shell } from "./ui";

/*
  Generated from lib/services.ts, like the immersive direction's footer, so the
  two cannot advertise different services. The old hard-coded list here named
  four treatments the clinic does not offer.
*/
const COLUMNS = [
  {
    heading: "Medical",
    links: CONDITIONS.slice(0, 4).map((condition) => ({
      label: condition.title,
      href: `/medical-dermatology#${condition.slug}`,
    })),
  },
  {
    heading: "Cosmetic",
    links: COSMETIC.slice(0, 4).map((family) => ({
      label: family.title,
      href: `/cosmetic-dermatology#${family.slug}`,
    })),
  },
  {
    heading: "Clinic",
    links: [
      { label: "Your visit", href: "#visit" },
      { label: "The clinic", href: "#clinic" },
      { label: "Reviews", href: "#reviews" },
      { label: "Book", href: "#book" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy notice", href: "#" },
      { label: "Patient terms", href: "#" },
      { label: "Complaints", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <Shell>
      <Card as="footer" className="mb-4 mt-4 bg-ms-espresso">
       {/*
         The pattern reads strongest at the foot of the page, the way it does
         on the letterhead: inked along the bottom edge, falling away under the
         link columns.
       */}
       <PatternField
         id="ed-footer"
         tone="espresso"
         fade="bottom"
         scale={260}
         opacity={0.75}
         drift={30}
       />
       <div className="relative px-7 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-5 lg:col-span-4">
            <Wordmark size="md" tone="text-ms-cream" />
            <p className="max-w-[280px] font-sans text-[14px] font-light leading-[1.7] text-ms-sand/70">
              {brand.address.line1}, {brand.address.line2}, {brand.address.city}.
            </p>
            <div className="flex flex-col gap-1.5 font-sans text-[14px] font-light text-ms-sand/70">
              <a
                href={brand.phoneHref}
                className="transition-colors hover:text-ms-cream"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors hover:text-ms-cream"
              >
                {brand.email}
              </a>
            </div>
          </Reveal>

          {COLUMNS.map((column, index) => (
            <Stagger
              as="nav"
              key={column.heading}
              step={0.05}
              delay={0.1 + index * 0.08}
              aria-label={column.heading}
              className="flex flex-col gap-3.5 lg:col-span-2"
            >
              <StaggerItem y={14}>
                <h2 className="eyebrow font-normal text-ms-terracotta">
                  {column.heading}
                </h2>
              </StaggerItem>
              {column.links.map((link) => (
                <StaggerItem key={link.label} y={14}>
                  <a
                    href={link.href}
                    className="font-sans text-[14px] font-light text-ms-sand/70 transition-colors hover:text-ms-cream"
                  >
                    {link.label}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          ))}
        </div>

        <Reveal
          y={16}
          delay={0.2}
          className="mt-14 flex flex-col gap-3 border-t border-ms-sand/15 pt-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="font-sans text-[12px] font-light text-ms-sand/55">
            &copy; {new Date().getFullYear()} {brand.entity}. {todo.pin}.
            Regulated by {todo.regulator}.
          </p>
          <p className="font-sans text-[12px] font-light text-ms-sand/55">
            Nothing on this site is a substitute for individual medical advice.
          </p>
        </Reveal>
       </div>
      </Card>
    </Shell>
  );
}
