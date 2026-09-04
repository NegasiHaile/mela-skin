import { SOCIAL } from "@/constants";
import type { SocialAccount } from "@/constants";

/*
  The clinic's accounts, in the footer under the logo.

  IT SAT AT THE RIGHT-HAND END OF THE BOTTOM BAR until 2 Sep, opposite the
  copyright and the medical disclaimer, which put the clinic's channels in the
  same breath as a KRA PIN. It is under the mark now, centred on the lockup's
  own axis.

  TWO STATES PER ACCOUNT, and which one renders is decided by the data rather
  than by a prop: an account with a URL is a link on a filled disc, an account
  without one is a visibly unfinished dashed slot. ALL FOUR HAVE URLS as of
  2 Sep, so the second state is currently unused — it stays because it is the
  contract for adding a fifth platform, or for pulling one that turns out not to
  be the clinic's. See constants/placeholders.ts → SOCIAL.

  THE TWO STATES HAVE TO LOOK DIFFERENT AT REST, which they did not until 2 Sep:
  the live one lit up on hover only, so the single account that went anywhere was
  indistinguishable from the three that did not until you pointed at it.

  A dead icon is worse than a missing one. An anchor to `#`, or to a platform's
  home page, is a footer link that gets clicked and goes nowhere; the slot below
  is not focusable, is not announced as a link, and carries the bracketed label
  as its accessible name — the same contract every unshot photograph on this
  site has, and the dashed ring is the same signal `PhotoSlot` uses.

  THE GLYPHS ARE THIRD-PARTY MARKS, drawn here rather than fetched, so the
  footer costs no extra request and they inherit `currentColor` like every other
  icon on the site. Each is the platform's own mark: two of them carry a
  container of their own and two do not, which is how the real set looks.
*/

/** One 24px viewBox for all four, so a single size prop drives them. */
const BOX = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" } as const;

/**
 * Shared stroke for the three marks that are drawn as line.
 *
 * TikTok is the exception and is filled. Its mark is a solid form with no
 * outline version; stroking it turns the note into two hooks that are
 * unreadable below about 22px, and the row runs at 21.
 *
 * The stroke is unchanged at 1.6 in a 24 viewBox, which is 1.4px at 21 against
 * 1.2 at the old 18 — so the three line marks gained weight with the size rather
 * than thinning out inside it.
 */
const LINE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Glyph({ id, size = 21 }: { id: SocialAccount["id"]; size?: number }) {
  if (id === "tiktok") {
    return (
      <svg {...BOX} width={size} height={size} fill="currentColor">
        {/*
          Inset to 88%. The mark is drawn edge to edge in its own viewBox, and
          alongside three glyphs that sit inside an 18-unit window it reads a
          size larger than the rest of the row at the same nominal px.
        */}
        <g transform="translate(1.44 1.44) scale(0.88)">
          <path
            d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
          />
        </g>
      </svg>
    );
  }

  if (id === "instagram") {
    /* The squircle is Instagram's own mark, not a container this file added. */
    return (
      <svg {...BOX} width={size} height={size} {...LINE}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.9" />
        <circle cx="16.7" cy="7.3" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === "facebook") {
    /*
      The letterform drawn as strokes, not the outline of the solid mark. Both
      are "the Facebook f"; stroking the solid one draws its edge, which at 18px
      is two hairlines a millimetre apart.
    */
    return (
      <svg {...BOX} width={size} height={size} {...LINE}>
        <path d="M16.5 5.6h-1.9c-1.5 0-2.5 1-2.5 2.5v11.4" />
        <path d="M8.6 11.6h6.7" />
      </svg>
    );
  }

  /* LinkedIn. The square is part of the mark: a bare "in" is not the logo. */
  return (
    <svg {...BOX} width={size} height={size} {...LINE}>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.6 10.6v6.1M7.6 7.7v.02M11.7 16.7v-6.1M11.7 13.3c0-1.45.85-2.35 2.15-2.35s2.15.9 2.15 2.65v3.1" />
    </svg>
  );
}

/**
 * A 44px hit target around a 21px glyph.
 *
 * IT WAS 40 AROUND 18 until 2 Sep, sized to the smallest thing WCAG 2.5.8 will
 * accept: at 40 with `gap-1` the CENTRES of two adjacent icons sit exactly 44px
 * apart, which is what the rule actually measures, so the row was as tight as it
 * could legally be. Under a 246px lockup that was the right size; under the
 * enlarged mark, at its column's full 376px, it read as a line of specks.
 *
 * 44 with `gap-1.5` puts the centres 50px apart and the row at 194px — about
 * half the mark's width, which is the proportion a secondary row under a big
 * wordmark should have.
 */
const SLOT =
  "inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1.5 ${className ?? ""}`}>
      {SOCIAL.map((account) => (
        <li key={account.id}>
          {account.href ? (
            <a
              href={account.href}
              target="_blank"
              /*
                `noopener` is the security half and `noreferrer` the courtesy;
                both, because these open on a platform we do not control.
              */
              rel="noopener noreferrer"
              aria-label={`${account.label} (opens in a new tab)`}
              /*
                A REAL LINK WEARS A FILLED DISC, AT REST AND ON HOVER. It only
                lit up on hover until 2 Sep, when LinkedIn was the one account
                with a URL — so the single icon that went anywhere looked
                identical to the three that did not until you happened to point
                at it. All four are live now, but the disc is what distinguishes
                a real account from a placeholder and it has to be visible at
                rest to do that.

                The disc is `cream/18` at rest, 1.66:1 against the footer, which
                is enough to read as a disc without reading as a button. Hover
                turns it `gold/30` — a change of hue rather than only of weight,
                because gold is what every other interaction in this footer uses
                (the link arrows, the current page) — and takes the glyph to
                ivory. Measured on the field colour: the glyph is 7.32:1 on its
                resting disc and 8.14:1 on the hover one.
              */
              className={`${SLOT} bg-ms-cream/18 text-ms-cream/90 hover:bg-ms-gold/30 hover:text-ms-ivory`}
            >
              <Glyph id={account.id} />
            </a>
          ) : (
            /*
              NO DISC, and the dashed ring stays. The gap between a filled
              circle and an outlined one is the whole signal: this account has
              no URL yet. Its glyph is `sand/55`, 3.27:1 — a little clearer than
              the 2.62 it was, and still about a third of the contrast the live
              one carries, which is what keeps the difference readable at a
              glance rather than only on inspection.
            */
            <span
              role="img"
              aria-label={`${account.label}, not set up yet`}
              title={account.label}
              className={`${SLOT} border border-dashed border-ms-sand/30 text-ms-sand/55`}
            >
              <Glyph id={account.id} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
