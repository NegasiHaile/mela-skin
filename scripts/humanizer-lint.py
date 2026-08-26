"""Scan every rendered string on the site against the humanizer patterns.

Usage:  python scripts/humanizer-lint.py

Checks only what reaches the page: string literals with the comments
stripped out, so developer prose in the code is not scored. Rules are the
pattern list at https://github.com/blader/humanizer, numbered as it does.
Exits 0 either way; read the count.
"""
import re
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src"

BANNED = [
    ("P7  AI vocabulary",
     r"\b(delve|testament|landscape|showcas\w+|seamless\w*|leverage|robust|elevate|unlock|"
     r"cutting.edge|state.of.the.art|game.chang\w+|revolutionar\w+|holistic|synerg\w+|"
     r"bespoke|curated|tapestry|realm|myriad|plethora|embark|ever.evolving|fast.paced|"
     r"vibrant|transformative|empower\w*|unparalleled|meticulous\w*|nestled)\b"),
    ("P9  not-just / not-X-but-Y",
     r"(not just\b|isn't just\b|is not just\b|not only\b.{0,50}\bbut also\b)"),
    ("P23 filler",
     r"\b(in order to|due to the fact that|it is important to note|it should be noted|"
     r"at the end of the day|when it comes to|needless to say)\b"),
    ("P24 over-qualification",
     r"\b(could potentially|may possibly|might perhaps|very unique|quite literally)\b"),
    ("P25 generic ending",
     r"(future looks bright|possibilities are endless|sky is the limit|next level)"),
    ("P27 fake depth",
     r"(at its core|the truth is|the reality is|what matters most is|here's the thing|"
     r"the honest version|worth knowing before you spend)"),
    ("P28 point announcement",
     r"(let's dive|let us dive|we'll explore|let's take a look|in this section)"),
    ("P33 fake-candid opening", r"(honestly[,?]|to be fair,)"),
    ("P18 emoji", "[\U0001F300-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF]"),
    ("P19 curly double quote", "[\u201c\u201d]"),
    ("P14 em/en dash", "[\u2014\u2013]"),
]

LITERAL = re.compile(
    r'"([^"\\]*(?:\\.[^"\\]*)*)"'
    r"|`([^`]*)`"
    r"|'([^'\\]*(?:\\.[^'\\]*)*)'"
)

SKIP = ("className", "rem]", "px]", "polygon(", "http", "image/", "url(", "@/", "./")

# Pattern 14 is about dashes standing in for a comma, a colon or a full stop
# inside prose. Two uses are not that and are allowed:
#
#   a range          Mon-Fri, 00:00-00:00      an en dash with no spaces
#   a separator      "Mela Skin - Descriptor"  a page title, a mail subject,
#                                              an image alt: one clause either
#                                              side, no sentence punctuation
#
# Everything else with a dash in it is prose and gets flagged.
SENTENCE_END = re.compile(r"[.!?;]")


def structural_dash(text: str) -> bool:
    """True when every dash in `text` is a range or a separator."""
    # `${brand.name}` carries a full stop that is not a sentence ending, so
    # interpolations are blanked before the punctuation test.
    text = re.sub(r"\$\{[^}]*\}", "@", text)
    for m in re.finditer("[—–]", text):
        i = m.start()
        spaced = text[i - 1: i] == " " and text[i + 1: i + 2] == " "
        if not spaced:
            continue                       # unspaced: a range
        if len(text) <= 90 and not SENTENCE_END.search(text):
            continue                       # short, one clause each side
        return False
    return True


def literals(path: pathlib.Path):
    src = path.read_text(encoding="utf8")
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)          # block comments
    src = re.sub(r"\{/\*.*?\*/\}", "", src, flags=re.S)      # jsx comments
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)          # line comments
    for m in LITERAL.finditer(src):
        s = m.group(1) or m.group(2) or m.group(3) or ""
        if len(s) < 20 or any(k in s for k in SKIP):
            continue
        yield s


files = sorted(
    list((ROOT / "constants").glob("*.ts"))
    + list((ROOT / "components").rglob("*.tsx"))
    + list((ROOT / "components-editorial").rglob("*.tsx"))
    + list((ROOT / "app").rglob("*.tsx"))
)

violations = 0
for f in files:
    for s in literals(f):
        for name, rx in BANNED:
            hit = re.search(rx, s, re.I)
            if hit and name.startswith("P14") and structural_dash(s):
                continue
            if hit:
                violations += 1
                ctx = s[max(0, hit.start() - 45):hit.end() + 45]
                print(f"{f.relative_to(ROOT)}  |  {name}  |  ...{ctx}...")

print(f"\nscanned {len(files)} files")
print(f"violations: {violations}")
sys.exit(0)
