"use client";

import { useState } from "react";
import { heroSampleCredit } from "@/constants";
import { HeroOriginal } from "./HeroOriginal";
import type { HeroGround } from "./HeroOriginal";
import { HeroPhoto } from "./HeroPhoto";

/*
  TWO HEROES ON ONE PAGE, with a toggle, for the team to choose between.

  Built for the review the 26 Aug meeting set up. Abseret, 00:57:11: "why don't
  you send us screenshots of the landing page, because obviously it's going to be
  hard for you to constantly change the website, but you can send us screenshots
  of the landing page and then we can see what looks good." Dr. Gachanja, same
  moment: "you can play around with it and share with us; we can pick, you know,
  the one that comes out best."

  Screenshots are one way to do that. Two live heroes with a switch is better:
  the difference between these two is motion and proportion, and neither survives
  a still.

    photo     The current one. Four elements over a full-bleed sliding
              photograph, on Primary 2.
    committed The hero on the last commit (b894798), restored with its own
              palette: copy on the left, a cut-out portrait push-sliding on the
              right half, on the old #74370c brown.

  THIS IS A DEMO CONTROL, NOT A FEATURE. When the choice is made, delete the
  losing variant, drop this file, and render the winner directly from
  app/page.tsx. Nothing else imports it. The order below is the order the dots
  appear in, and the first entry is what a visitor sees.

  THERE ARE TWO TOGGLES, and only one of them is always there.

    Hero    A or B, always.
    Ground  B's brown: today's #2C190B or the committed #74370c. Rendered only
            while B is showing, because A has a photograph where B has a colour
            and there is nothing on A for it to change.

  A control that appears and disappears is usually a smell. It is the right thing
  here: the alternative is a dead third dot on variant A, and in a demo a dot
  that does nothing gets clicked and then explained.

  THE TOGGLES ARE WHERE THE CREDIT LINE WAS: bottom right of the first screen. The
  credit moved to sit beside it rather than being displaced, because neither
  variant's images are the clinic's own and that has to keep saying so.

  It switches with the variant. The two are not showing the same pictures: A is
  on the licensed stock interiors, B is on the generated portraits that were on
  the site all along — the ones Abseret asked us to replace (00:17:24: "I'm not a
  huge fan on the AI pics of the people, because I do want it to be real"). One
  line covering both would have credited Unsplash for images Unsplash did not
  take.

  Nothing is persisted. A reload returns to the first variant, which is what you
  want when several people are looking at the same laptop.
*/

const VARIANTS = [
  {
    id: "photo",
    /** Read out by the dot's accessible name, so it has to say what it picks. */
    label: "Hero A — four elements over a full-bleed photograph",
    short: "A",
    credit: heroSampleCredit,
    /** No ground toggle: A's opening is a photograph, not a colour. */
    grounds: false,
  },
  {
    id: "committed",
    label: "Hero B — the committed hero: portrait slider",
    short: "B",
    credit: "Placeholder portraits · generated, pending the clinic's own",
    grounds: true,
  },
] as const;

/** B's two browns. Order is the dot order, and the first one is the default. */
const GROUNDS: readonly { id: HeroGround; label: string }[] = [
  { id: "dark", label: "Ground: today's brown, the one the page heroes use" },
  { id: "committed", label: "Ground: the committed brown, a stop brighter" },
];

/**
 * One dot group. Both toggles are the same control with different contents, and
 * the label matters more than it looks: on a 10px dot the accessible name is the
 * only thing that says what it does.
 */
function Dots<T extends string>({
  name,
  options,
  active,
  onPick,
}: {
  /** The word before the dots. Two unlabelled groups in one corner is a puzzle. */
  name: string;
  options: readonly { id: T; label: string }[];
  active: T;
  onPick: (id: T) => void;
}) {
  return (
    <div
      className="pointer-events-auto flex shrink-0 items-center gap-2.5"
      role="group"
      aria-label={name}
    >
      <span
        aria-hidden="true"
        className="mr-0.5 font-sans text-[9.5px] font-medium uppercase tracking-[0.2em] text-ms-cream/80"
      >
        {name}
      </span>
      {options.map((option) => {
        const selected = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onPick(option.id)}
            aria-pressed={selected}
            aria-label={option.label}
            title={option.label}
            /*
              44px of tap target around a 10px dot, which is why the padding is
              doing more work here than the dot is. `-m-2.5` pulls the extra back
              out of the layout so the row still reads as small dots.
            */
            className="group -m-2.5 flex size-11 items-center justify-center p-2.5"
          >
            <span
              className={`block rounded-full transition-[width,background-color] duration-400 ${
                selected
                  ? "h-1.5 w-7 bg-ms-gold"
                  : "size-1.5 bg-ms-cream/45 group-hover:bg-ms-cream/90"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function HeroSwitcher() {
  const [variant, setVariant] = useState<"photo" | "committed">("photo");
  const [ground, setGround] = useState<HeroGround>("dark");
  const current = VARIANTS.find((entry) => entry.id === variant) ?? VARIANTS[0];

  return (
    <div className="relative">
      {variant === "photo" ? <HeroPhoto /> : <HeroOriginal ground={ground} />}

      {/*
        Sits over the hero rather than under it, so it lands in the corner both
        variants leave empty. `z-30` clears the header's own `z-40` stacking
        without competing with it: they are at opposite ends of the screen.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex items-center justify-end gap-4 px-6 sm:bottom-6 sm:px-10 lg:px-14">
        {/*
          `min-w-0` rather than a `vw` cap: at 45vw the line wrapped onto two on
          a phone even though there was room for it beside the dots.

          Cream at 85%, not 70%. Measured on both variants: the worse ground is
          B's, where the row crosses the portrait's shoulder at #774D3F, and 70%
          reached only 3.82:1 there. 85% is 4.79:1, which clears AA for text this
          small on the harder of the two backgrounds.
        */}
        <p className="min-w-0 text-right font-sans text-[11px] font-light tracking-[0.06em] text-ms-cream/85">
          {current.credit}
        </p>

        {current.grounds ? (
          <Dots
            name="Ground"
            options={GROUNDS}
            active={ground}
            onPick={setGround}
          />
        ) : null}

        <Dots
          name="Hero"
          options={VARIANTS.map((entry) => ({
            id: entry.id,
            label: entry.label,
          }))}
          active={variant}
          onPick={setVariant}
        />
      </div>
    </div>
  );
}
