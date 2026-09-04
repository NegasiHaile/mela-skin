import { FOOTER_COLUMNS_COMPACT, brand, todo } from "@/constants";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { Card, Shell } from "./ui";

export function SiteFooter() {
  return (
    <Shell>
      <Card as="footer" className="mb-4 mt-4 bg-ms-field">
       {/*
         The pattern reads strongest at the foot of the page, the way it does
         on the letterhead: inked along the bottom edge, falling away under the
         link columns.
       */}
       <PatternField tone="field" />
       <div className="relative px-7 py-11 sm:px-10 lg:px-16 lg:py-12">
        {/*
          Two columns from `sm` up. Stacked, the four link lists run to the
          better part of a phone screen on their own; paired, a tablet gets
          the whole footer in one view. Phones keep the single column —
          "Skin boosters & biostimulators" in a 165px cell is three lines.
        */}
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-4 sm:col-span-2 lg:col-span-6">
            <Wordmark size="md" tone="text-ms-cream" />
            <p className="max-w-[280px] font-sans text-[14px] font-light leading-[1.7] text-ms-sand/70">
              {brand.address.oneLine}.
            </p>
            <div className="flex flex-col gap-1.5 font-sans text-[14px] font-light text-ms-sand/70">
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors hover:text-ms-cream"
              >
                {brand.email}
              </a>
            </div>
          </Reveal>

          {FOOTER_COLUMNS_COMPACT.map((column, index) => (
            <Stagger
              as="nav"
              key={column.heading}
              step={0.05}
              delay={0.1 + index * 0.08}
              aria-label={column.heading}
              className="flex flex-col gap-2.5 lg:col-span-2"
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
          className="mt-10 flex flex-col gap-2 border-t border-ms-sand/15 pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
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
