"""
Extract the Mela Skin monogram:
- remove only the outer cream field (flood-fill from corners)
- keep the cream disk inside the gold ring
- crop so the ring touches the frame (no side padding)
"""
from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RESOURCES = ROOT.parent / "Resources" / "Marketing" / "Social Media"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

MONOGRAM_SRC = RESOURCES / "MELA SKIN - Social Profile_2.jpg"
WORDMARK_SRC = RESOURCES / "MELA SKIN - Social Profile_1.jpg"
CREAM = (243, 231, 214)
BG_THRESHOLD = 42


def color_dist(a: tuple[int, ...], b: tuple[int, ...]) -> float:
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a[:3], b[:3])))


def flood_remove_outer_bg(im: Image.Image, threshold: float = BG_THRESHOLD) -> Image.Image:
    """Make cream connected to the image border transparent; keep inner cream."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    samples = [
        im.getpixel((2, 2))[:3],
        im.getpixel((w - 3, 2))[:3],
        im.getpixel((2, h - 3))[:3],
        im.getpixel((w - 3, h - 3))[:3],
    ]
    bg = tuple(sum(c[i] for c in samples) // 4 for i in range(3))

    def is_bg(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        return a > 0 and color_dist((r, g, b), bg) <= threshold

    visited = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        i = y * w + x
        if visited[i]:
            return
        if is_bg(x, y):
            visited[i] = 1
            q.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while q:
        x, y = q.popleft()
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            i = ny * w + nx
            if visited[i]:
                continue
            if is_bg(nx, ny):
                visited[i] = 1
                q.append((nx, ny))

    return im


def opaque_bbox(im: Image.Image, alpha_min: int = 8) -> tuple[int, int, int, int]:
    px = im.load()
    w, h = im.size
    min_x, min_y, max_x, max_y = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            if px[x, y][3] >= alpha_min:
                if x < min_x:
                    min_x = x
                if y < min_y:
                    min_y = y
                if x > max_x:
                    max_x = x
                if y > max_y:
                    max_y = y
    if max_x < 0:
        raise RuntimeError("No opaque pixels")
    return min_x, min_y, max_x, max_y


def crop_tight_square(im: Image.Image, margin: int = 0) -> Image.Image:
    min_x, min_y, max_x, max_y = opaque_bbox(im)
    min_x = max(0, min_x - margin)
    min_y = max(0, min_y - margin)
    max_x = min(im.width - 1, max_x + margin)
    max_y = min(im.height - 1, max_y + margin)
    cropped = im.crop((min_x, min_y, max_x + 1, max_y + 1))
    cw, ch = cropped.size
    side = max(cw, ch)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(cropped, ((side - cw) // 2, (side - ch) // 2), cropped)
    return canvas


def extract_wordmark(src: Path, threshold: float = 42) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    return crop_tight_square(flood_remove_outer_bg(im, threshold), margin=2)


def save_resized(im: Image.Image, size: int, dest: Path, *, bg=None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    out = im.resize((size, size), Image.Resampling.LANCZOS)
    if bg is not None:
        base = Image.new("RGBA", (size, size), (*bg, 255))
        base.alpha_composite(out)
        if dest.suffix.lower() == ".ico":
            base.save(dest, format="ICO", sizes=[(size, size)])
            return
        out = base
    out.save(dest, optimize=True)


def main() -> None:
    (PUBLIC / "brand").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "icons").mkdir(parents=True, exist_ok=True)

    # Work at reduced res for speed, then upscale master from a high-quality crop.
    src = Image.open(MONOGRAM_SRC).convert("RGBA")
    # Full-res flood on a downscale first is lossy; do full-res but resize source
    # to 2048 for practicality — still sharper than UI needs.
    if max(src.size) > 2200:
        src.thumbnail((2200, 2200), Image.Resampling.LANCZOS)

    cut = flood_remove_outer_bg(src)
    logo = crop_tight_square(cut, margin=0)
    logo_master = logo.resize((1024, 1024), Image.Resampling.LANCZOS)
    logo_master.save(PUBLIC / "brand" / "logo.png", optimize=True)

    # Wordmark: flood outer cream, crop to ink (not forced square)
    wm_src = Image.open(WORDMARK_SRC).convert("RGBA")
    if max(wm_src.size) > 2200:
        wm_src.thumbnail((2200, 2200), Image.Resampling.LANCZOS)
    wm = flood_remove_outer_bg(wm_src)
    bx = opaque_bbox(wm)
    wordmark = wm.crop((bx[0], bx[1], bx[2] + 1, bx[3] + 1))
    scale = 1200 / max(wordmark.size)
    wordmark = wordmark.resize(
        (max(1, int(wordmark.width * scale)), max(1, int(wordmark.height * scale))),
        Image.Resampling.LANCZOS,
    )
    wordmark.save(PUBLIC / "brand" / "logo-wordmark.png", optimize=True)

    for size, name in ((64, "logo-64.png"), (128, "logo-128.png"), (256, "logo-256.png")):
        save_resized(logo_master, size, PUBLIC / "brand" / name)

    cream = CREAM
    save_resized(logo_master, 32, PUBLIC / "favicon.png")
    save_resized(logo_master, 32, PUBLIC / "favicon.ico", bg=cream)
    save_resized(logo_master, 180, PUBLIC / "apple-touch-icon.png", bg=cream)
    save_resized(logo_master, 180, APP / "apple-icon.png", bg=cream)
    save_resized(logo_master, 512, APP / "icon.png")
    save_resized(logo_master, 192, PUBLIC / "icons" / "icon-192.png", bg=cream)
    save_resized(logo_master, 512, PUBLIC / "icons" / "icon-512.png", bg=cream)

    maskable = Image.new("RGBA", (512, 512), (*cream, 255))
    inner = logo_master.resize((420, 420), Image.Resampling.LANCZOS)
    maskable.alpha_composite(inner, ((512 - 420) // 2, (512 - 420) // 2))
    maskable.save(PUBLIC / "icons" / "maskable-512.png", optimize=True)

    og = Image.new("RGB", (1200, 630), cream)
    wm_og = wordmark.copy()
    ratio = min(900 / wm_og.width, 480 / wm_og.height)
    wm_og = wm_og.resize(
        (max(1, int(wm_og.width * ratio)), max(1, int(wm_og.height * ratio))),
        Image.Resampling.LANCZOS,
    )
    og.paste(wm_og, ((1200 - wm_og.width) // 2, (630 - wm_og.height) // 2), wm_og)
    for path in (
        PUBLIC / "og-image.jpg",
        APP / "opengraph-image.jpg",
        APP / "twitter-image.jpg",
    ):
        og.save(path, quality=90, optimize=True)

    print("logo.png", logo_master.size, "tight circular monogram with inner cream kept")
    print("logo-wordmark.png", wordmark.size)


if __name__ == "__main__":
    main()
