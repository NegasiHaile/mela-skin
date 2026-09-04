import type { ReactNode } from "react";
import Link from "next/link";

/*
  THE CONTACT PAGE'S PANEL, AS A COMPONENT.

  It was inline markup in the /contact hero, holding "Reach us directly" over
  the email and the address. It is a component now on general principle -- one
  card, one place it is defined -- though /contact's hero is currently its only
  caller.

  NOTHING ABOUT IT IS REDESIGNED. Every class is the one that was on the contact
  page: `rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7
  backdrop-blur-sm`, a `font-display text-[1.35rem]` title, a lead row at
  `text-[1.4rem]` display in ivory with a gold arrow, plain rows at 16.5px sans
  in cream, and `border-b border-ms-sand/15` between them.

  IT USED TO CARRY A `tone` PROP for a second caller, components/ClinicianBand
  .tsx, which sat this same card over a cream ground and needed the fill opaque
  rather than translucent. That caller is gone: the clinician's card is
  components/ClinicianProfile.tsx now, shared with /about instead of built out
  of this one, so there is only ever one ground under this card -- the dark
  /contact hero -- and only one fill to paint.
*/

export type DetailRow = {
  /** A string, or lines. */
  text: ReactNode;
  /** Makes the row a link and gives it the arrow. */
  href?: string;
  /** Opens in a new tab, for anything off this site. */
  external?: boolean;
  /**
   * The prominent row: 1.4rem display in ivory rather than 16.5px sans in cream.
   * The contact card's email row is the one that has it.
   */
  lead?: boolean;
};

const CARD =
  "flex flex-col gap-5 rounded-[20px] border border-ms-gold/30 p-7 backdrop-blur-sm";

const LEAD =
  "font-display text-[1.4rem] leading-none text-ms-ivory transition-colors hover:text-ms-gold";
const PLAIN =
  "font-sans text-[16.5px] font-light leading-[1.55] text-ms-cream transition-colors hover:text-ms-ivory";
const ARROW =
  "shrink-0 font-sans text-[13px] text-ms-gold transition-transform duration-300 group-hover:translate-x-1";

export function DetailCard({
  title,
  rows,
  className,
}: {
  title: string;
  rows: DetailRow[];
  className?: string;
}) {
  return (
    <div className={`${CARD} bg-ms-espresso/35 ${className ?? ""}`}>
      <p className="font-display text-[1.35rem] leading-[1.2] text-ms-cream">
        {title}
      </p>

      {rows.map((row, index) => {
        const last = index === rows.length - 1;
        const skin = `${row.lead ? LEAD : PLAIN} ${last ? "" : "border-b border-ms-sand/15"}`;
        /*
          The lead row centres its arrow against a single line; a plain row can
          run to three, so its arrow pins to the top. Both are the contact
          card's own behaviour.
        */
        const box = row.lead
          ? "group flex min-h-12 items-center justify-between gap-4"
          : "group flex items-start justify-between gap-4";
        const arrow = (
          <span
            aria-hidden="true"
            className={`${ARROW} ${row.lead ? "" : "mt-1"}`}
          >
            &rarr;
          </span>
        );

        if (!row.href) {
          return (
            <p key={index} className={`${box} ${skin} ${last ? "" : "pb-5"}`}>
              <span>{row.text}</span>
            </p>
          );
        }

        const inner = (
          <>
            <span>{row.text}</span>
            {arrow}
          </>
        );

        return row.external ? (
          <a
            key={index}
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${box} ${skin} ${last ? "" : "pb-5"}`}
          >
            {inner}
          </a>
        ) : (
          <Link
            key={index}
            href={row.href}
            className={`${box} ${skin} ${last ? "" : "pb-5"}`}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
