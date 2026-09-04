"""
Build every raster brand asset the site serves, from the official package.

    python scripts/build-brand-assets.py

SOURCE
    ../Resources/MELA SKIN - Visual Identity Assets/

That folder is the designer's handover of 26 Aug 2026 and supersedes every
earlier brand file. This script replaced `extract-logo.py`, which flood-filled a
monogram out of a social-media JPEG — that crop is where the white disc behind
the ring came from, the one Dr. Abseret Hailu flagged in the 26 Aug meeting
(00:41:07: "it shouldn't have a white background. That's an error. It should be
just gold with a gold circle"). Nothing is reconstructed here. Every output is
a resize, a trim, or a composite of supplied artwork.

WHAT IT WRITES

    public/brand/brandmark-{gold,cream,brown}.png   trimmed, square, 512px
    public/brand/wordmark-{brown,cream}.png         trimmed, 1024px wide
    public/favicon.png                              32px
    public/favicon.ico                              16 / 32 / 48
    public/apple-touch-icon.png                     180px
    public/icons/icon-{192,512}.png
    public/icons/maskable-512.png
    public/images/hero-background.webp              2400x1350
    public/og-image.jpg                             1200x630
    src/app/icon.png                                512px
    src/app/apple-icon.png                          180px
    src/app/opengraph-image.jpg                     1200x630
    src/app/twitter-image.jpg                       1200x630

The icons are the gold mark on the field brown rather than on transparency. The
mark is a hairline ring: on a transparent 32px favicon it all but disappears
against a browser's own chrome, and a maskable icon is required to be opaque
anyway. Everything under public/brand/ stays transparent.

Idempotent. Safe to re-run.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT.parent / "Resources" / "MELA SKIN - Visual Identity Assets"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
FONTS = ROOT / "src" / "fonts"

MARK_GOLD = ASSETS / "2_Brand Mark/PNG/MELA SKIN - Primary Brandmark_1_3D Gold Emblem.png"
MARK_BROWN = ASSETS / "2_Brand Mark/PNG/MELA SKIN - Primary Brandmark_2.png"
MARK_CREAM = ASSETS / "2_Brand Mark/PNG/MELA SKIN - Primary Brandmark_3.png"
WORD_BROWN = ASSETS / "1_Logo/Secondary Logo/PNG/MELA SKIN - Secondary Logo_3.png"
WORD_CREAM = ASSETS / "1_Logo/Secondary Logo/PNG/MELA SKIN - Secondary Logo_4.png"
PATTERN = ASSETS / "4_Pattern/PNG/MELA SKIN - Pattern.png"

# Official palette, 3_Color Pallet/MELA SKIN - Color Pallet Info.png.
FIELD = (0x2C, 0x19, 0x0B)  # Primary 2 — the flooded brown, the "second brown"
CREAM = (0xF4, 0xE7, 0xD6)  # Primary 7
ESPRESSO = (0x2C, 0x19, 0x0B)  # Primary 2 — the darkest the brand goes


def load(path: Path) -> Image.Image:
    if not path.exists():
        raise SystemExit(f"missing source artwork: {path}")
    return Image.open(path).convert("RGBA")


def trim(img: Image.Image) -> Image.Image:
    """Crop to the artwork's own alpha bounds."""
    box = img.getchannel("A").getbbox()
    return img.crop(box) if box else img


def squared(img: Image.Image) -> Image.Image:
    """Pad to a square without scaling, so a resize cannot distort the ring."""
    side = max(img.size)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(img, ((side - img.width) // 2, (side - img.height) // 2), img)
    return out


def fit(img: Image.Image, width: int) -> Image.Image:
    height = max(1, round(width * img.height / img.width))
    return img.resize((width, height), Image.LANCZOS)


def on_ground(mark: Image.Image, size: int, inset: float, ground=FIELD) -> Image.Image:
    """The gold mark centred on an opaque brand ground."""
    out = Image.new("RGBA", (size, size), (*ground, 255))
    art = fit(mark, round(size * inset))
    out.alpha_composite(art, ((size - art.width) // 2, (size - art.height) // 2))
    return out


def larken(size: int, italic: bool = False) -> ImageFont.FreeTypeFont:
    """Primary face. Self-hosted in src/fonts as the site uses it."""
    name = "Larken-Italic.ttf" if italic else "Larken-Light.ttf"
    return ImageFont.truetype(str(FONTS / name), size)


# Pillow cannot read woff2, so the OTF masters come straight from the package.
RANADE = ASSETS / "5_Typography/Secondary Font/Ranade_Complete/Ranade_Complete/Fonts/OTF"


def ranade(size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    """Secondary face — what the official lockup sets the descriptor in."""
    return ImageFont.truetype(str(RANADE / f"Ranade-{weight}.otf"), size)


def write(img: Image.Image, path: Path, **kw) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, **kw)
    print(f"  {path.relative_to(ROOT)}  {img.size[0]}x{img.size[1]}")


def build_marks(gold, brown, cream) -> None:
    print("brand marks")
    for img, name in ((gold, "gold"), (brown, "brown"), (cream, "cream")):
        write(fit(squared(img), 512), PUBLIC / "brand" / f"brandmark-{name}.png")

    print("wordmarks")
    for src, name in ((WORD_BROWN, "brown"), (WORD_CREAM, "cream")):
        write(fit(trim(load(src)), 1024), PUBLIC / "brand" / f"wordmark-{name}.png")


def build_icons(gold: Image.Image) -> None:
    print("icons")
    square = squared(gold)

    # 0.70 for the app icons: enough ground around the ring that it reads as a
    # tile rather than as a clipped circle.
    write(on_ground(square, 512, 0.70), PUBLIC / "icons" / "icon-512.png")
    write(on_ground(square, 192, 0.70), PUBLIC / "icons" / "icon-192.png")
    write(on_ground(square, 512, 0.70), APP / "icon.png")
    write(on_ground(square, 180, 0.74), PUBLIC / "apple-touch-icon.png")
    write(on_ground(square, 180, 0.74), APP / "apple-icon.png")

    # Maskable icons are cropped to a circle inscribed in the middle 80%, so the
    # mark has to sit inside a much tighter safe zone.
    write(on_ground(square, 512, 0.52), PUBLIC / "icons" / "maskable-512.png")

    # At 32px the ring is a couple of pixels wide, so it gets the most room.
    favicon = on_ground(square, 32, 0.86)
    write(favicon, PUBLIC / "favicon.png")
    favicon.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("  public/favicon.ico  16/32/48")


def build_social(gold: Image.Image) -> None:
    """1200x630: field ground, official pattern, gold mark, wordmark, tagline."""
    print("social card")
    W, H = 1200, 630
    card = Image.new("RGBA", (W, H), (*FIELD, 255))

    # The official pattern, cover-cropped and held low. It is a single
    # dark-to-caramel gradient of overlapping circles, so at this opacity it
    # reads as the letterhead's watermark rather than as a second image.
    pattern = load(PATTERN)
    scale = max(W / pattern.width, H / pattern.height) * 1.35
    pattern = pattern.resize(
        (round(pattern.width * scale), round(pattern.height * scale)), Image.LANCZOS
    )
    pattern = pattern.crop(
        (
            (pattern.width - W) // 2,
            (pattern.height - H) // 2,
            (pattern.width - W) // 2 + W,
            (pattern.height - H) // 2 + H,
        )
    )
    pattern.putalpha(pattern.getchannel("A").point(lambda a: round(a * 0.16)))
    card.alpha_composite(pattern)

    mark = fit(squared(gold), 132)
    card.alpha_composite(mark, (84, 92))

    word = fit(trim(load(WORD_CREAM)), 470)
    card.alpha_composite(word, (84, 92 + mark.height + 46))

    draw = ImageDraw.Draw(card)

    y = 92 + mark.height + 46 + word.height + 58
    draw.text((84, y), "Richer. Radiant. You.", font=larken(84, italic=True), fill=(*CREAM, 255))

    # Set in Ranade, tracked out, exactly as the official lockup sets it.
    draw.text(
        (84, H - 106),
        "D E R M A T O L O G Y   &   C O S M E T I C   C L I N I C",
        font=ranade(20, "Medium"),
        fill=(0xDC, 0xBC, 0x63, 255),
    )
    draw.text(
        (84, H - 64),
        "The Atrium, 4th Floor · 88 Serenity, Westlands · Nairobi",
        font=ranade(25),
        fill=(0xCB, 0xAA, 0x7D, 225),
    )

    flat = Image.new("RGB", (W, H), ESPRESSO)
    flat.paste(card, (0, 0), card)
    for path in (
        PUBLIC / "og-image.jpg",
        APP / "opengraph-image.jpg",
        APP / "twitter-image.jpg",
    ):
        write(flat, path, quality=88, optimize=True, progressive=True)


def build_hero_background() -> None:
    """The home hero's last-resort full-bleed ground, 2400x1350.

    WHY THIS IS GENERATED RATHER THAN PHOTOGRAPHED. The 26 Aug meeting settled
    that the first screen is one full-bleed image with very little on top of it
    — the Canadian reference's frame, with the Elevate reference's name over it.
    It also settled that the image should eventually be the clinic's own
    reception and entrance. Aser, 00:49:00: "one thing is, we don't have the
    clean space pictures yet, so I think we need to also keep that in mind."

    So this is the floor: the official 4_Pattern motif at architectural scale
    over Primary 2, vignetted, with the left third deepened so the display type
    has somewhere to sit. It is a real image file and unmistakably Mela Skin,
    and it does not pretend to be a room that does not exist yet.

    The hero does not normally show it. `photos.reception` carries a licensed
    stock photograph of a reception, credited on the page, and this is what the
    hero falls back to if every frame in `heroFrames` is emptied. Keep it: it is
    the one hero ground that needs nobody's permission.
    """
    print("hero background")
    W, H = 2400, 1350
    ground = Image.new("RGBA", (W, H), (*FIELD, 255))

    # Two-and-a-bit rows of circles across the height, which is the scale at
    # which the motif reads as architecture rather than as texture.
    pattern = load(PATTERN)
    scale = (H / pattern.height) * 2.6
    pattern = pattern.resize(
        (round(pattern.width * scale), round(pattern.height * scale)), Image.LANCZOS
    )
    left = (pattern.width - W) // 2
    top = round(pattern.height * 0.18)
    pattern = pattern.crop((left, top, left + W, top + H))
    pattern.putalpha(pattern.getchannel("A").point(lambda a: round(a * 0.42)))
    ground.alpha_composite(pattern)

    # Vignette. `radial_gradient` is white at the centre and black at the edge,
    # so it is used directly as the alpha of a black overlay after inverting.
    vignette = Image.radial_gradient("L").resize((W, H), Image.LANCZOS)
    vignette = vignette.point(lambda v: round(v * 0.42))
    shade = Image.new("RGBA", (W, H), (*ESPRESSO, 255))
    shade.putalpha(vignette)
    ground.alpha_composite(shade)

    # And a left-to-right deepening under the type column. `linear_gradient` is
    # black at the top, so it is rotated a quarter turn to run horizontally.
    ramp = Image.linear_gradient("L").rotate(-90, expand=True).resize((W, H), Image.LANCZOS)
    ramp = ramp.point(lambda v: round((255 - v) * 0.30))
    column = Image.new("RGBA", (W, H), (*ESPRESSO, 255))
    column.putalpha(ramp)
    ground.alpha_composite(column)

    flat = Image.new("RGB", (W, H), FIELD)
    flat.paste(ground, (0, 0), ground)
    write(flat, PUBLIC / "images" / "hero-background.webp", quality=86, method=6)


def main() -> None:
    gold, brown, cream = load(MARK_GOLD), load(MARK_BROWN), load(MARK_CREAM)
    build_marks(gold, brown, cream)
    build_icons(gold)
    build_hero_background()
    build_social(gold)
    print("done")


if __name__ == "__main__":
    main()
