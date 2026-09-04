"use client";

import { brand } from "@/constants";
import { PatternField } from "../brand/PatternField";
import { SiteHeader } from "../SiteHeader";
import { MountItem, MountStagger } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "../ui";

/*
  HERO C — the clinic's own demonstration clip, full-bleed.

  WHAT THIS REPLACED. A glass serum bottle, modelled and lit live in the
  browser (still in SerumScene.tsx / serumShader.ts, just unused here — real
  WebGL geometry, not deleted for a video that could as easily have gone
  elsewhere). Before that, a light card over a stock photograph, and before
  that an abstract 3D lattice of the brand's sparkle. Each was tried and
  correctly rejected in turn; this option is `mela-skin-demonstration.mp4`
  instead.

  NO OVERLAY, ON REQUEST. This carried Hero A's four `ms-field` scrims for a
  while, reproduced rather than reinvented so the two variants shared one wash
  and one contrast behaviour. Taken off on request, for this hero specifically
  — the video shows at full brightness and colour, with nothing brown washed
  over it. The type below still has to read against whatever the clip is
  showing at the time (there is no scrim earning its keep any more), so a
  brighter stretch of footage is the trade-off for a clean picture.

  MUTED + `playsInline` ARE LOAD-BEARING, NOT DECORATION. Autoplay is only ever
  granted when the element is muted, and without `playsInline` iOS Safari takes
  the video fullscreen the instant it plays. `loop` keeps it going for as long
  as this hero is the one showing.

  THE PATTERN STAYS UNDER THE VIDEO, not removed: the same graceful fallback
  the bottle used to lean on: a decoding video is not an instant paint, so for
  the moment before its first frame lands, and on the rare browser that refuses
  it outright, the section is the brand pattern rather than a bare box.

  THE COPY DOES NOT CHANGE, and neither does its width: with the video full-
  bleed there is no bottle reserving the right half any more, so the copy
  column is no longer capped short of it.

  PLAYBACK RUNS SLOWER THAN THE SOURCE FILE, ON REQUEST: 0.75x overall, and
  0.5x for the clip's first second specifically -- that opening beat is the
  most important part of the shot, and it read as too quick at normal speed.
  `playbackRate` is the only part of the HTML5 video API that does this; there
  is no attribute for it, so it has to be set imperatively, which is the whole
  reason this file is now a client component. Set twice, not once:

    the `ref` callback   the rate at the moment the element exists, before
                          `autoPlay` has moved `currentTime` off zero
    `onTimeUpdate`        re-asserted on every fired update thereafter, which
                          is what actually carries the rate through playback
                          and back through it every time `loop` restarts the
                          clip at zero

  `timeupdate` fires several times a second, not continuously, so the switch
  from 0.5x to 0.75x lands within a fraction of a second of the true one-second
  mark rather than exactly on it -- imperceptible here, and the only accuracy
  a browser's own event actually offers.
*/
const BASE_RATE = 0.75;
const SLOW_RATE = 0.5;
const SLOW_UNTIL_SECONDS = 1;

/** Only writes `playbackRate` when it would actually change, so this is not fighting the browser every time `timeupdate` fires. */
function applyPlaybackRate(video: HTMLVideoElement) {
  const rate = video.currentTime < SLOW_UNTIL_SECONDS ? SLOW_RATE : BASE_RATE;
  if (video.playbackRate !== rate) video.playbackRate = rate;
}

export function HeroSerum() {
  return (
    <section
      id="top"
      data-no-lazy
      className="relative min-h-svh overflow-hidden bg-ms-field"
    >
      {/*
        The flat pattern sits UNDER the canvas, not instead of it. It is what a
        machine without WebGL sees, and it is what shows through in the second
        before the first frame lands, so the section is never a bare brown box.
      */}
      <PatternField tone="field" />

      {/* The clip, full-bleed and behind everything, at its own colour — no wash over it. */}
      <video
        /*
          NO `autoPlay` ATTRIBUTE -- `.play()` IS CALLED HERE INSTEAD, on
          purpose, so the rate can be set before playback starts rather than
          racing it. With `autoPlay`, measured with a headless browser at
          ~150ms resolution: Chromium quietly resets `playbackRate` back to
          1x at the exact moment it begins playing, even when the rate was set
          correctly beforehand, and the first `timeupdate` does not land for a
          few hundred ms after that -- a real gap at 1x inside what is
          supposed to be the 0.5x second. Setting the rate synchronously and
          THEN calling `.play()` ourselves avoids the browser's own autoplay
          machinery being the thing that resets it. A muted `<video>` can be
          started from a plain `.play()` call under the same autoplay
          allowance `autoPlay` relies on, so nothing about consent changes.
        */
        ref={(el) => {
          if (!el) return;
          applyPlaybackRate(el);
          void el.play().catch(() => {});
        }}
        onTimeUpdate={(event) => applyPlaybackRate(event.currentTarget)}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-center"
        src="/mela-skin-demonstration.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/*
        `z-40`, not the usual `z-10` -- this div carries the fixed SiteHeader,
        and a later section's own `relative z-10` wrapper would otherwise tie
        with this one and win the stacking comparison by DOM order, painting
        over the header once scrolled far enough. Full explanation on the
        identical div in components/PageHero.tsx.
      */}
      <div className="relative z-40 flex min-h-svh flex-col">
        <SiteHeader tone="dark" />

        <Wrap className="flex flex-1 items-center py-16 sm:py-20 lg:py-24">
          <MountStagger step={0.13} delay={0.35} className="w-full">
            <MountItem y={28}>
              <h1 className="max-w-[15ch] font-display text-[clamp(4.4rem,13vw,7rem)] font-normal italic leading-[0.95] tracking-[-0.02em] text-ms-ivory">
                <span className="sr-only">
                  Mela Skin, dermatology and cosmetic clinic in Muthaiga,
                  Nairobi.{" "}
                </span>
                {brand.tagline}
              </h1>
            </MountItem>

            <MountItem>
              <p className="mt-9 max-w-[46ch] font-sans text-[clamp(1.25rem,2.4vw,1.5rem)] font-light leading-[1.6] text-ms-cream/90 sm:mt-10">
                {brand.hero.line}
              </p>
            </MountItem>

            <MountItem className="mt-12 sm:mt-14">
              <div className="flex flex-wrap items-center gap-3.5">
                <PillSolid
                  href="/contact"
                  tone="dark"
                  className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                >
                  Book an appointment
                </PillSolid>
                <PillGhost
                  href="/treatment-menu"
                  tone="dark"
                  className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                >
                  Treatment menu
                </PillGhost>
              </div>
            </MountItem>
          </MountStagger>
        </Wrap>
      </div>
    </section>
  );
}
