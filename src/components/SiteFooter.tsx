import { FOOTER_COLUMNS, brand } from "@/constants";
import { ActiveLink } from "./ActiveLink";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { SocialLinks } from "./SocialLinks";
import { Wrap } from "./ui";

/*
  The pattern reads through here the way it does on the letterhead: the motif
  holds the bottom of the sheet and the type sits on top of it. It is the same
  tile at the same phase as every section above, so the lattice runs unbroken
  into the footer rather than restarting at it.

THE GOLD HAIRLINE ACROSS THE TOP HAS GONE, and the reason it existed went
  with it. The booking band above used to be the field colour too, so the two ran
  together into one long brown block and a rule was the only thing dividing them.
  Nothing on a page is flooded except this now — "we do not have to use much
  darker version other than the footer" — so the band above is `ms-cream`,
  BookingCta's own flat ground (see the note in components/BookingCta.tsx),
  and there is no line to draw: cream to field is a large enough jump on its
  own to read as the footer arriving rather than as a join that needs marking.

  IT IS A HARD EDGE, same as every join on the site now that the light
  sections are isolated flats rather than one continuous gradient (see the
  note in app/page.tsx) — it used to be the only one, back when the booking
  band's ground ramped smoothly down from linen and the footer was the sole
  place that broke the ramp. A footer arriving as a clean change of colour is
  what a footer normally does; it no longer needs the band above pushed down
  or the lattice cross-faded underneath to earn that, because nothing ramps
  into it any more regardless.

  The footer's OWN colour is untouched: the clinic asked for it to stay exactly
  as it is, and it has.

  ITS TYPE CAME UP A LONG WAY ON 1 SEP. Everything in here was `ms-sand` at 75%,
  which is 4.91:1 on the field colour — over the line for AA and under it for
  anything you would call comfortable, on the one band of the page that is
  entirely small print. It is `ms-cream` now: the links at 80% (9.22:1) and the
  bottom bar's two lines at 75% (8.27), which read as one weight of quiet type
  now that both lines are plain fact (the entity's name, the building's
  address) rather than one fact and one legal disclaimer. The gold headings
  are unchanged; they were already the brightest thing in here.

  THREE PARTS NOW, NOT FOUR:

    the mark    left column, wider than the lists beside it on request — the
                supplied logo at the column's full width, with the social row
                centred under it
    the lists   dermatology, the menu, the clinic — the email joined the
                clinic list as its last row, on request
    the bottom bar   the entity name and the address, under the footer's one
                     hairline

  THERE USED TO BE A FOURTH PART, a contact band between the lists and the
  bottom bar carrying the email on the left and the address on the right. Both
  moved on request: the email onto the end of the Clinic list, the address
  down into the bottom bar in place of the medical disclaimer that used to sit
  there (see the note on the bottom bar below). Nothing was left for the band
  to hold, so it came off rather than standing empty.

  THE LISTS WERE FOUR, "medical" AND "cosmetic" SEPARATE, until those two
  merged into one "Dermatology" column on request — see the note beside
  `dermatologyLinks` in constants/navigation.ts. Three lists rather than four
  is also why the logo can be wider than each one and the row still divide
  evenly: `lg:grid-cols-10` is `lg:col-span-4` (the logo) plus three lists at
  `lg:col-span-2` each (4 + 2+2+2 = 10) — the logo twice as wide as any one
  list, the way it read before the merge cost it a column's worth of width.

  HOW IT GOT THERE, over 2 Sep. The address, the phone and the email were stacked
  under the logo, which made that column the only one in the footer doing two jobs
  and squeezed the address into a 280px measure so it wrapped to three lines; they
  came out into a row of their own. Then the social row came DOWN into the logo
  column from the far end of the bottom bar, and the phone came off the site
  altogether.

  The contact row was rebuilt on the letterhead's three-part arrangement after
  that -- email, tagline, address -- and then reduced to two: the tagline came out
  of it, spent an afternoon centred under the mark, and came off the footer
  entirely. It is on the home hero and nowhere else. The row itself came off in
  turn once its two halves had somewhere else to be — see above.
*/
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ms-field py-12 lg:py-14">
      <PatternField tone="field" />

      <Wrap className="relative">
        {/*
          Two columns from `sm` up. Stacked, the three link lists run to the
          better part of a phone screen on their own; paired, a tablet gets
          the whole footer in one view (three lists plus the logo means the
          last row is a single column rather than a full pair, which reads
          fine at this width). Phones keep the single column — "Skin
          boosters & biostimulators" was the long label this guarded against;
          it no longer appears in the footer, but the menu section titles
          beside it still run long enough to want the room.

          `lg:gap-x-16`, WIDER THAN THE BASE `gap-x-10`, on request. One gap
          value for the whole grid, so the logo-to-list gap and every
          list-to-list gap stay identical by construction rather than by
          checking each one.
        */}
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-10 lg:gap-x-16">
          {/*
            THE LOGO, AND NOTHING ELSE IN THIS COLUMN. The address, the phone and
            the email used to sit under it; they are their own section now, below
            the link columns.

            IT IS THE SUPPLIED FILE, SERVED AS IT CAME.
            `1_Logo/Primary Logo/SVG/MELA SKIN - Primary Logo_2.svg`, copied to
            public/brand byte for byte — the cream variant, which is the one drawn
            for a dark ground. The lockup was composed from parts here before (the
            emblem as an image, the wordmark as its own vector paths, the
            descriptor as live type at proportions measured off the letterhead);
            it landed in the right place and it was still a reconstruction. This
            is the artwork.

            `<img>` rather than `next/image`: Next does not optimise SVG unless
            `dangerouslyAllowSVG` is set, so the component would pass the file
            through unchanged while adding a wrapper and a srcset that cannot
            apply. Lazy, because the footer is below the fold on all seven routes
            — which is what keeps a 654KB file off the critical path.

            Width and height are the file's own viewBox, 245.7 x 110.62, so the
            box is reserved before it lands and nothing shifts.
          */}
          <Reveal eager className="sm:col-span-2 lg:col-span-4">
            {/*
              THE COLUMN IS THE ARTWORK'S OWN WIDTH, which is the whole reason
              this box exists: the social row inside it centres on the lockup's
              axis rather than on the footer's column. The supplied logo is a
              centred stack — emblem over wordmark, descriptor centred under it
              — so a row of icons hung off its left edge would be the one thing
              in the column that is not on that axis.
            */}
            <div className="w-[264px] sm:w-[320px] lg:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element -- see above:
                  next/image cannot optimise an SVG without `dangerouslyAllowSVG`,
                  so it would wrap this file and pass it through unchanged. */}
              <img
                src="/brand/primary-logo-2.svg"
                alt={`${brand.name} — ${brand.descriptor}`}
                width={246}
                height={111}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />

              {/*
                THE SOCIAL ROW BELONGS TO THE LOGO, as of 2 Sep. It was at the
                right-hand end of the bottom bar, opposite the legal copy, which
                put the clinic's accounts in the same breath as a KRA PIN and a
                medical disclaimer. Under the mark they read as the clinic's own
                channels, which is what they are.

                THE TAGLINE IS NOT IN HERE, and it passed through twice on 2 Sep
                on its way out: first as the centre of the contact band, then
                centred under this mark. The clinic took it off the footer
                altogether. It reads on the home hero, which is where the line
                was praised in the first place (Aser, 26 Aug [00:37:22]: "the
                text is strong, like the 'richer, radiant you' reads well"), and
                a brand line printed twice on the same page is a brand line
                nobody reads once. `brand.tagline` still feeds the heroes and
                the JSON-LD `slogan`.
              */}
              <SocialLinks className="mt-8 justify-center lg:mt-9" />
            </div>
          </Reveal>

          {FOOTER_COLUMNS.map((column, index) => (
            <Stagger
              eager
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
                  {/*
                    The arrow holds its space whether it is shown or not —
                    `opacity-0` rather than conditional rendering — so nothing
                    reflows on hover and a two-line label cannot rewrap under
                    the cursor. It slides in from the left of where it lands,
                    which reads as the link pointing somewhere rather than as a
                    glyph appearing.

                    THE PAGE YOU ARE ON is gold, the same accent the top bar
                    uses for it, and it carries `aria-current="page"` with it.
                    Only whole routes qualify: four of these columns point at
                    sections of /about and /treatment-menu, and lighting five
                    links at once on one page says nothing. See ActiveLink.tsx.
                  */}
                  <ActiveLink
                    href={link.href}
                    className="group/link inline-flex w-fit items-start gap-1.5 font-sans text-[16px] font-light leading-[1.5] text-ms-cream/80 transition-colors hover:text-ms-ivory"
                    activeClassName="!text-ms-gold"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="mt-[0.1em] shrink-0 -translate-x-1 text-ms-gold opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    >
                      &rarr;
                    </span>
                  </ActiveLink>
                </StaggerItem>
              ))}
            </Stagger>
          ))}
        </div>

        {/*
          THE BOTTOM BAR: a hairline and two lines, and nothing else.

          THERE USED TO BE A CONTACT BAND ABOVE THIS, one line carrying the
          email on the left and the address on the right -- see the note at
          the top of the file for the shape of it and why it came off. Both of
          its halves had somewhere else to go, so this bar's own top margin
          grew from `mt-7` to `mt-16`/`lg:mt-20` to hold roughly the gap the
          two of them left between the columns and this rule, rather than the
          bar suddenly sitting hard against the lists above it.

          THE SOCIAL ROW WAS AT THIS BAR'S RIGHT-HAND END, which is where it
          went on 1 Sep to stop the middle of the rule sitting empty above
          about 1100px. It is under the logo now, so the two lines here are
          held apart across the full width again.

          IT USED TO BE FOUR FACTS: the entity's name, its KRA PIN, its
          regulator, and a medical disclaimer. The PIN, the regulator and the
          disclaimer all came off on request, and the address took the
          disclaimer's place on the right rather than leaving that side blank
          -- the two lines now are the entity's registered name and where to
          find it, which is why both read at the same weight (`/75`) instead
          of one being deliberately quieter than the other the way the
          disclaimer used to be.

          The rule is `cream/20`, the weight it has always been, because it
          divides a part of the footer from another part of the footer rather
          than the footer from the page.

          IT DOES NOT ANIMATE, AND THAT IS THE POINT. This is the one block on
          the site that is legal or near-legal text: the company's registered
          name and its address. It renders as plain markup at full opacity, so
          it is on the page whatever happens to the JavaScript, the observers,
          or the motion library.

          IT WAS INVISIBLE ON EVERY SCREEN UNTIL 2 SEP, and the mechanism is
          worth keeping written down. `Reveal` starts at `opacity: 0` and waits
          for a viewport trigger set 12% of the screen height above the bottom
          edge, so a block fires when `top < scrollY + 0.88 x V`. Scrolling
          stops at `doc - V`, which makes `doc - 0.12 x V` the highest threshold
          a reader can ever reach — and ANY BLOCK IN THE LAST 0.12 x V OF THE
          DOCUMENT NEVER FIRES AT ALL. This bar's top is 60px from the end of
          the document; the dead zone is 108px at a 900px viewport and 173px at
          1440. It needed a viewport under 500px tall to appear.

          The rest of the footer takes `eager`, which is the same trigger with
          no dead zone (see motion.tsx -> VIEWPORT_END). That was the first fix
          and it is the right one for the logo and the columns. It is not
          enough for THIS block, because the reason to animate two lines of
          registration detail was never strong enough to put them behind an
          observer in the first place.
        */}
        <div className="mt-16 flex flex-col gap-2 border-t border-ms-cream/20 pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 lg:mt-20">
          <p className="font-sans text-[13.5px] font-light text-ms-cream/75">
            &copy; {new Date().getFullYear()} {brand.entity}.
          </p>
          <p className="font-sans text-[13.5px] font-light text-ms-cream/75 sm:text-right">
            {brand.address.oneLine}
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
