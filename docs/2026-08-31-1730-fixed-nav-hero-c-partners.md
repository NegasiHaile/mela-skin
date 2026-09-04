# 31 Aug 2026, 17:30 — fixed nav, a third hero, the shelf, and Moipa's benchmarks

Four things, from one message. Three are code; the fourth is a set of reference
sites, and what came out of it is folded into the other three rather than left as
a list of links nobody opens twice.

---

## 1. The top bar is fixed

It scrolled away with the page. It does not now.

**The bar is `position: fixed` and renders its own spacer.** The height lives in
one constant, `BAR_HEIGHT` in `SiteHeader.tsx`, read by both the bar and the
spacer, because a spacer that disagrees with the bar is either a gap above the
hero or a headline hidden behind the nav. It is a fixed height per breakpoint
(80 / 96 / 112) rather than padding around the content: a padded bar's height
depends on whichever child happens to be tallest at that width, and that is not
a number a spacer can be written against. Verified equal at 390, 768 and 1440.

**Transparent at the top, a dark bar once the page moves.** Every route opens on
a `ms-field` hero, so at rest the bar has a dark ground of its own. Past 16px of
scroll it brings its own `ms-field/92` and a blur, rather than switching its ink
from cream to cocoa — one set of colours at every scroll position and no flash as
the ink swaps. 16 and not 0 because below that a rubber-band scroll on a phone
flickers the bar at rest.

**Everything the bar now covers moved down.** Two kinds of thing:

- Anchor targets. `scroll-padding-top` on `html`, set once for the whole site to
  the bar's three heights, rather than `scroll-mt` on each target. The targets
  are section ids, condition cards, treatment families and the menu's five
  sections, and hunting them one at a time guarantees missing one.
- The menu page's own sticky filter bar, which was `top-0` and would have parked
  behind the header. It is `top-20 sm:top-24 lg:top-28` now, and the menu's
  `scroll-mt` dropped to just its own bar's height, since counting the header
  twice overshoots every jump.

Verified on all seven routes: after scrolling 2400px the bar is at `top: 0`, has
a ground, and its links still hit-test to the header. Anchor jumps land clear of
both bars at all three widths.

---

## 2. Hero C, from the benchmark sites

A third variant on the demo switcher, and it exists because A and B make the same
argument twice: white display type laid straight onto a moving picture, once on a
photograph and once on a portrait. Neither says what the clinic is like to walk
into or where it is.

C is a light card over one still photograph, carrying the address, the hours and
the free cosmetic consultation.

| | |
| --- | --- |
| A | white type on a full-bleed slider. Atmosphere, no facts. |
| B | copy on a colour, portrait sliding in beside it. Brand, no facts. |
| C | dark type in a light card over a still frame, with the details on it. The only one a reader can act on without scrolling, and the only one whose type sits on a solid ground. |

**Still, not sliding.** A and B both move. A third mover would make the choice
harder rather than easier, because with three sliding heroes the demo becomes
about which pictures you prefer. C is also the answer to "what if we do not want
motion".

It uses `heroSamples[1]`, the frame neither other variant lands on, so the demo
now shows three different rooms.

---

## 3. Two skincare-range placeholders on /about

A new `partners` section between the providers and "How we work". That order is
the page's own argument: who treats you, what they will sell you, then the rules
they operate under.

Two panels rather than a row of logos, because the question a patient has about a
clinic's shelf is not which brands it carries but who chose them and on what
evidence — and that question can be answered honestly now even though the names
cannot. So the section's lede is real copy and everything inside the panels is
bracketed, with the dashed borders the site already uses for unfilled content.

---

## 4. Moipa's three reference sites

Read in full, and here is what each is actually worth.

**zelaaesthetics.co.ke.** The closest comparator. Homepage runs hero → "Why us?"
→ service cards → testimonials → Instagram feed → newsletter. **No prices
anywhere**; every route ends in "Book a consultation". Trust marks in the opening
screen: a 4.9 Google rating and an award nomination. Skincare sits behind a
"Shop" item in the top nav with categories but nothing about who makes any of it.
A WhatsApp widget is pinned to every page.

*Taken:* the single strong CTA and a credibility line in the first screen, in
hero C. The one credential Mela Skin can claim today is that the cosmetic consult
is free, which the 26 Aug meeting settled — no rating and no award, because the
clinic has neither and inventing one is how a website starts lying. The Shop-in-
nav pattern is the inverse of what /about now does, deliberately.

**revivme.com — Nairobi.** A location page. Opens on a large photograph of the
room with the address, the hours and an "Open until 6:00 PM" status right at the
top, then narrative service groups, then a clinic-information block. Prices
appear for two add-ons only and nowhere else. Two CTAs: WhatsApp and "Book this
location".

*Taken:* the fact strip in hero C. On a clinic page the address and the hours are
not footer material, they are why somebody is on the page.

**aestheticsafrica.com.** Not a clinic — a B2B distributor of treatment devices
(Lumenis, Classys, HydraFacial) and two skincare lines, Dermaceutic and
Elementre. No practitioners, no booking, no prices, and nothing about darker
skin.

*Taken:* nothing structural. It is useful as context for the shelf, since it is
where several ranges of this kind are distributed in Kenya, which is a question
for whoever fills in the two panels on /about.

### What all three confirm

- **No published prices** is the local norm, not a risk. All three withhold them;
  the one exception is REVIV's two add-ons.
- **WhatsApp is a first-class channel** on both clinic sites. Mela Skin has no
  WhatsApp route at all: the header has a phone number in the mobile menu and the
  footer has an email. This is the one clear gap the benchmarking turned up and
  it is **not built** — it is a decision for the clinic, and it sits close to the
  AI chat agent that is deliberately deferred.
- **Nobody names their clinicians.** Zela says "board-certified specialists" and
  shows nobody; REVIV says "expert medical professionals". Mela Skin's providers
  section, with a named clinician and a registration number, is a differentiator
  in this market rather than table stakes.

---

## Addendum, same day: hero C, twice

### First rebuild: an abstract 3D lattice. Rejected, and the reason is the useful part.

The card-over-a-photograph was thrown out for two reasons: the photograph is not
the clinic's, so a photographic hero is a picture of a room nobody will walk
into; and A and B were already type over a moving picture, so a third of the same
is not a choice.

The replacement was a raymarched lattice of the brand's four-pointed sparkle. It
was three-dimensional by construction and not by appearance: brown shapes on a
brown ground in hero A's own layout, so it read as "hero A with the picture taken
out". Rejected, correctly.

**The lesson: a 3D hero needs a subject, and the subject has to be the business.**
Abstraction is not a subject, and a novel rendering technique is not one either.

### Second rebuild: the bottle

A glass dropper bottle. Amber serum to the fill line, gold collar, cap and teat,
turning slowly on its own shadow, standing on the brand pattern. It is the object
a skincare consultation ends with, and the only hero of the three that is about a
treatment rather than about a mood.

**It is real geometry.** Every surface is a signed distance function solved per
pixel, per frame: the body is a rounded cylinder, the shoulder is a smooth blend
into the neck, the cap is a tapered cylinder with an ellipsoid teat, and the
serum is the body shrunk by the wall thickness and cut by a plane at the fill
line. Turn it and the highlights travel across the glass, because the light is
computed rather than painted.

**The glass actually refracts.** A ray that meets the bottle splits: part mirrors
the room, part bends in at the surface, crosses the interior, and bends again on
the way out to sample the environment from a different direction. Beer-Lambert
absorption along the interior path is what makes the bottom read as liquid and
the top as air. Three marches a pixel instead of one, which is the entire cost.

**The canvas is transparent.** Straight alpha, cleared to zero every frame: only
the bottle and its shadow are drawn, so the site's own brand pattern is the
ground. The object sits on the page rather than replacing its background, and
without WebGL the page is simply itself with no bottle on it.

**Two compositions from one scene**, set by a single framing uniform: beside the
copy and full size on a desktop, above it and pulled back on a phone.

### What it took to stop it looking like a render

All four found by looking at the output rather than by reasoning about it:

| symptom | cause |
| --- | --- |
| Brown rubble, not jewellery (the lattice) | the size ceiling was nearly double, and the light was diffuse-led. Rock shading. |
| Flat cut faces slicing the solids | scaling an axis inside a distance function overestimates distance by that factor, so the marcher steps through the surface. Divide by the same factor. |
| A dim, muddy bottle | glass only ever shows you the environment, so a dim environment is a dim bottle however the glass itself is shaded. The fix was in the environment function, not in the glass. |
| Speckles up one side | a per-step radius test on a 0.011 pipette hit on some steps and missed on the next. The pipette went. |

### Measured, by instrumenting drawArrays

| | |
| --- | --- |
| On screen | draws every frame |
| Scrolled past | **0 draws** |
| Tab hidden | **0 draws** |
| Back on screen | resumes |
| Reduced motion | one still frame, then **0 draws** |
| No WebGL2 | canvas at opacity 0; headline, buttons and pattern all intact |

Also `aria-hidden` and `pointer-events: none`, verified by hit-testing the
booking button through it. No horizontal bleed at 390 or 1440.

### The ceiling on this approach, and what to use past it

There is no image-generation model in this environment, so a rendered 3D
*picture* could not be produced as a file. What is here is geometry computed live
in the browser, which is a different thing with its own limits: excellent for one
clean manufactured object, poor for anything organic. A face, a hand, skin, a
real product with a printed label, or a scene with several objects in it are all
past what is worth hand-writing as mathematics.

For those, in rough order of effort:

| want | tool | note |
| --- | --- | --- |
| A 3D scene on the web, no code | **Spline** (spline.design) | Model or import, animate, publish, embed. The usual answer for a hero like this. Watch the payload: exports commonly run 1 to 3MB. |
| Full control, best quality | **Blender** (free), export `.glb`, load with **three.js** or React Three Fiber | What a studio would do. Needs a 3D artist and adds roughly 600KB of runtime. |
| A rendered still or a short loop | **Blender** or **KeyShot**, rendered to PNG or MP4 | Cheapest to serve: one image. No interactivity. |
| A ready-made bottle model | **Sketchfab**, **CGTrader**, **Poly Haven** (CC0) | Check the licence. Poly Haven is public domain. |
| Generated imagery | **Midjourney**, **Adobe Firefly**, **Freepik** | Fastest to a look. Firefly is the safer licence for commercial use. Fake products only, never presented as the clinic's own. |
| 2.5D motion from flat art | **Rive** or **Lottie** | Light, and reads as motion design rather than as 3D. |

**And the honest recommendation:** once the clinic stocks its shelf, an hour of
product photography of the actual bottles beats all of it. Everything above is a
stand-in for a photograph nobody has taken yet.
