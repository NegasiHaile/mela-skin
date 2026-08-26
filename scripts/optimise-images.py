"""Re-encode public/images to WebP at the size the site actually displays.

Usage:  python scripts/optimise-images.py

The supplied artwork is 1024-1536px PNG at 2-3MB a file, 35MB in total. Nothing
on the site shows one wider than about 640 CSS pixels, and the widest slot
(the cosmetic page card and the clinician portrait) tops out around 620. At 2x
for retina that is 1280, so the long edge is capped there and the rest is
thrown away.

WebP at quality 82 is visually indistinguishable from the PNG at these sizes
and lands about 95% smaller. Next/Image still resizes and re-encodes on demand;
this only means it starts from a sane file rather than a 3MB one, which is what
makes the first paint of a cold page slow.

The .png originals are left alone. They are the masters. Once the .webp files
are committed and the site is verified, the PNGs can be deleted from
public/images and kept in Resources instead.

Needs: pip install pillow
"""
import pathlib

from PIL import Image

IMAGES = pathlib.Path(__file__).resolve().parent.parent / "public" / "images"

# Long edge in px. 2x the widest slot any of these fills on screen.
MAX_EDGE = 1280
QUALITY = 82

total_before = total_after = 0

for src in sorted(IMAGES.glob("*.png")):
    out = src.with_suffix(".webp")

    with Image.open(src) as im:
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
        w, h = im.size
        if max(w, h) > MAX_EDGE:
            scale = MAX_EDGE / max(w, h)
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im.save(out, "WEBP", quality=QUALITY, method=6)

    before, after = src.stat().st_size, out.stat().st_size
    total_before += before
    total_after += after
    print(
        f"{src.name:44} {w}x{h} {before / 1048576:5.2f}MB"
        f"  ->  {im.size[0]}x{im.size[1]} {after / 1024:6.0f}KB"
    )

print(
    f"\ntotal {total_before / 1048576:.1f}MB -> {total_after / 1048576:.2f}MB"
    f"  ({100 - total_after * 100 // total_before}% smaller)"
)
