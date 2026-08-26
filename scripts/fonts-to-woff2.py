"""Convert the supplied Larken TTFs to WOFF2.

Usage:  python scripts/fonts-to-woff2.py

The .ttf files in src/fonts are the masters from the brand archive; nothing on
the site loads them. layout.tsx loads the .woff2 output, which is about a third
of the size for identical rendering. Re-run this if the family is ever updated.

Needs: pip install fonttools brotli
"""
import pathlib
from fontTools.ttLib import TTFont

FONTS = pathlib.Path(__file__).resolve().parent.parent / "src" / "fonts"

for ttf in sorted(FONTS.glob("*.ttf")):
    out = ttf.with_suffix(".woff2")
    font = TTFont(str(ttf))
    font.flavor = "woff2"
    font.save(str(out))
    before, after = ttf.stat().st_size, out.stat().st_size
    print(f"{ttf.name} -> {out.name}  {before // 1024}KB -> {after // 1024}KB")
