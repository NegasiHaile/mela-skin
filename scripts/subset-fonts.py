"""Subset the Larken WOFF2 files to the glyphs this site renders.

Usage:  python scripts/subset-fonts.py

The supplied family carries a full character set. The site is English, so most
of it is downloaded and never drawn. This keeps printable ASCII, Latin-1, the
punctuation the copy actually uses, and every character found in a string
literal under src/ — then throws the rest away.

Run scripts/fonts-to-woff2.py first; this rewrites its output in place, so the
.ttf masters in src/fonts remain the source of truth for a clean regeneration.

Needs: pip install fonttools brotli
"""
import pathlib
import re
import string

from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "src" / "fonts"
SRC = ROOT / "src"

# Everything printable in English, plus the marks the brand copy leans on.
BASE = set(string.printable)
BASE |= set("\u00a0£€¥§¶©®™°±×÷–—''\u201c\u201d„…·•‹›«»†‡‰′″⁄→←↑↓✓✕")
BASE |= {chr(c) for c in range(0x00C0, 0x0180)}  # accented Latin
# Characters written as HTML entities in JSX never reach a string
# literal, so the scan below cannot see them. Name them here.
BASE |= set("▲▼▶◀")  # the dropdown chevrons


# Anything that appears in a string literal anywhere in the app.
LITERAL = re.compile(r'"([^"\\]*(?:\\.[^"\\]*)*)"|`([^`]*)`|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'')
found = set()
for f in list(SRC.rglob("*.ts")) + list(SRC.rglob("*.tsx")):
    text = f.read_text(encoding="utf8")
    for m in LITERAL.finditer(text):
        found |= set(m.group(1) or m.group(2) or m.group(3) or "")

keep = BASE | found
print(f"keeping {len(keep)} characters\n")

total_before = total_after = 0
for src in sorted(FONTS.glob("*.woff2")):
    before = src.stat().st_size

    font = TTFont(str(src))
    options = Options()
    options.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk"]
    options.desubroutinize = True
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = Subsetter(options=options)
    subsetter.populate(text="".join(sorted(keep)))
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(str(src))

    after = src.stat().st_size
    total_before += before
    total_after += after
    print(f"{src.name:26} {before / 1024:6.1f} KB -> {after / 1024:6.1f} KB")

print(
    f"\ntotal {total_before / 1024:.0f} KB -> {total_after / 1024:.0f} KB"
    f"  ({100 - total_after * 100 // total_before}% smaller)"
)
