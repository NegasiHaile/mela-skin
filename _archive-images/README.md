# Archived, unreferenced images

Moved out of `public/` on 4 Sep during the production-readiness pass, so they
stop shipping in every deploy. Nothing in `src/` referenced any of these —
confirmed by grep across the whole codebase before the move.

- `treatments.png`, `pigmentation-melasma.png`, `keloids-scarring.png`,
  `dermatology-skin-care-treatment-collage.png`, `acne-acne_scarring.png`,
  `medcal-dermatology-treatment.png`, `cosmotic-dermatology-treatment.png`,
  `hero.png` — full-resolution originals of images that were already replaced
  site-wide by much smaller `.webp` versions of the same name, which are what
  actually renders (see `public/images/`). Kept here only as source masters,
  in case a future re-export at a different size is ever needed.
- `dermatologist.png` — a licensed stock portrait, superseded by the real
  clinician photos (`dr-margaret-gachanja.webp`, `dr-abseret-hailu.webp`).
  See the note on it in `src/constants/placeholders.ts`.
- `treatments.webp`, `keloids-scarring.webp` — two of the ten treatment-family
  stock photographs that came off every card on 2 Sep, per the note in
  `src/components/TreatmentMedia.tsx` ("it was not the clinic's work"). Not
  wired to anything.

This folder is not under `public/`, so Next.js never serves or bundles it.
Safe to delete for good once nobody needs the source masters; safe to restore
into `public/images/` if any of this is wanted back.
