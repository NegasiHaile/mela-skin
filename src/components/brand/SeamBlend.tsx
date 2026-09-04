/*
  THE SOFT JOIN BETWEEN TWO CONSECUTIVE FLAT SECTIONS, on request -- the
  shell/paper/cream rotation (see the note in app/page.tsx) was a hard cut at
  every boundary, which read as a line rather than a handover.

  A SHORT GRADIENT INSIDE THE SECOND SECTION'S OWN BOX, from the previous
  section's colour at its very top pixel to this section's own colour by
  ~64px down. The first attempt tried to do this without naming the previous
  colour at all -- fade from transparent and let whatever is actually behind
  it show through -- but every section here is `overflow-hidden` (for
  PatternField's own overhang and the Wipe/Drift transforms), which clips
  anything positioned above a section's own top edge before it ever reaches
  the screen. Once the blend has to live inside the box, it has to know both
  ends of it.

  `from` IS SUPPLIED, NOT DERIVED, the same way the old per-band ramp system
  named its neighbours -- and that system broke when a band declared the
  wrong one. The difference here is scale: this is one value, at each call
  site, matching a rotation this file's author already tracked exactly for
  every page (see the sequence in app/page.tsx and the per-page notes next to
  it); it is not a configurable ramp depth or a tone type threaded through
  props. Get `from` wrong and the fix is one word, not a system to debug.
*/
export function SeamBlend({
  from,
  to,
}: {
  /** The colour of whatever section comes immediately before this one. */
  from: "shell" | "paper" | "cream";
  /** This section's own flood colour. */
  to: "shell" | "paper" | "cream";
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-16"
      style={{
        backgroundImage: `linear-gradient(to bottom, var(--color-ms-${from}), var(--color-ms-${to}))`,
      }}
    />
  );
}
