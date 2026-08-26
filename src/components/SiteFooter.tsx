import Link from "next/link";
import { FOOTER_COLUMNS, LEGAL, brand, todo } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

/*
  The pattern reads strongest here, at the foot of the page, the way it does on
  the letterhead: the motif holds the bottom of the sheet and the type sits on
  top of it. `bottom` keeps it inked below and lets it fall away under the link
  columns, and the tile is smaller than in the sections above (300px) so the
  footer reads as texture rather than as another full-bleed statement.
*/
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ms-espresso py-16 lg:py-20">
      <PatternField
        id="footer"
        tone="espresso"
        fade="bottom"
        scale={300}
        opacity={0.75}
        drift={38}
      />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-5 lg:col-span-4">
            <Wordmark size="md" tone="text-ms-cream" />
            <p className="max-w-[280px] font-sans text-[15px] font-light leading-[1.7] text-ms-sand/75">
              {brand.address.line1}, {brand.address.line2}, {brand.address.city}.
            </p>
            <div className="flex flex-col gap-1.5 font-sans text-[15px] font-light text-ms-sand/75">
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

          {FOOTER_COLUMNS.map((column, index) => (
            <Stagger
              key={column.heading}
              step={0.05}
              delay={0.1 + index * 0.08}
              as="nav"
              aria-label={column.heading}
              className="flex flex-col gap-3.5 lg:col-span-2"
            >
              <StaggerItem y={14}>
                <h2 className="eyebrow font-normal text-ms-gold">
                  {column.heading}
                </h2>
              </StaggerItem>
              {column.links.map((link) => (
                <StaggerItem key={`${column.heading}-${link.label}`} y={14}>
                  <Link
                    href={link.href}
                    className="font-sans text-[15px] font-light text-ms-sand/75 transition-colors hover:text-ms-cream"
                  >
                    {link.label}
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          ))}
        </div>

        <Reveal
          y={16}
          delay={0.2}
          className="mt-14 flex flex-col gap-5 border-t border-ms-sand/15 pt-7"
        >
          <nav aria-label="Legal" className="flex flex-wrap gap-x-7 gap-y-2">
            {LEGAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[13px] font-light text-ms-sand/75 transition-colors hover:text-ms-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-sans text-[13px] font-light text-ms-sand/75">
              &copy; {new Date().getFullYear()} {brand.entity}. {todo.pin}.
              Regulated by {todo.regulator}.
            </p>
            <p className="font-sans text-[13px] font-light text-ms-sand/75">
              Nothing on this site is a substitute for individual medical advice.
            </p>
          </div>
        </Reveal>
      </Wrap>
    </footer>
  );
}
