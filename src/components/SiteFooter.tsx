import Link from "next/link";
import { FOOTER_COLUMNS, brand, todo } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

/*
  The pattern reads through here the way it does on the letterhead: the motif
  holds the bottom of the sheet and the type sits on top of it. It is the same
  tile at the same phase as every section above, so the lattice runs unbroken
  into the footer rather than restarting at it.

  THE GOLD HAIRLINE IS LOAD-BEARING NOW. The footer used to be a stop darker than
  the booking band directly above it, and the change in value was the boundary.
  Both are the field colour since Primary 1 was retired, so without a rule the
  two run together into one long brown block. A hairline is the right amount of
  separation for two bands that genuinely belong together — the same move the
  mobile menu uses to divide places-to-go from ways-to-reach-a-person.
*/
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ms-field py-12 lg:py-14">
      <PatternField tone="field" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ms-gold/45 to-transparent"
      />

      <Wrap className="relative">
        {/*
          Two columns from `sm` up. Stacked, the four link lists run to the
          better part of a phone screen on their own; paired, a tablet gets
          the whole footer in one view. Phones keep the single column —
          "Skin boosters & biostimulators" in a 165px cell is three lines.
        */}
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-4 sm:col-span-2 lg:col-span-4">
            <Wordmark size="md" tone="text-ms-cream" />
            <p className="max-w-[280px] font-sans text-[14.5px] font-light leading-[1.6] text-ms-sand/75">
              {brand.address.line1}, {brand.address.line2}, {brand.address.city}.
            </p>
            <div className="flex flex-col gap-1 font-sans text-[14.5px] font-light text-ms-sand/75">
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
              className="flex flex-col gap-2.5 lg:col-span-2"
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
                    className="font-sans text-[14.5px] font-light leading-[1.5] text-ms-sand/75 transition-colors hover:text-ms-cream"
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
          className="mt-10 flex flex-col gap-2 border-t border-ms-sand/15 pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
        >
          <p className="font-sans text-[13px] font-light text-ms-sand/75">
            &copy; {new Date().getFullYear()} {brand.entity}. {todo.pin}.
            Regulated by {todo.regulator}.
          </p>
          <p className="font-sans text-[13px] font-light text-ms-sand/75">
            Nothing on this site is a substitute for individual medical advice.
          </p>
        </Reveal>
      </Wrap>
    </footer>
  );
}
