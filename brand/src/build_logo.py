"""Builds the Heliora logo masters from geometry (no fonts, no live text).

Concept "First Light": a disc of space split by a planet's limb, drawn as a line of
light, with the Sun resting on it. The wordmark's i-dot is the same Sun.

Run: python brand/src/build_logo.py   (writes into brand/logo/)
"""
from math import asin, cos, degrees, radians, sin, sqrt
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "logo"
OUT.mkdir(parents=True, exist_ok=True)

NIGHT = "#0a0d1a"      # disc and ink on light backgrounds
DEEP = "#1c2650"       # disc on dark backgrounds (reads against #050508)
SUN = "#ffb347"        # the light: limb line, Sun, i-dot on dark
SUN_DEEP = "#e07a12"   # i-dot on light backgrounds (contrast on white)
STAR = "#f0f0f5"       # ink on dark backgrounds
TITLE = "Heliora"


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def circle(cx, cy, r, cw=True):
    s = 1 if cw else 0
    return (f"M{f(cx - r)} {f(cy)}A{f(r)} {f(r)} 0 1 {s} {f(cx + r)} {f(cy)}"
            f"A{f(r)} {f(r)} 0 1 {s} {f(cx - r)} {f(cy)}Z")


def svg(body, w, h, title=TITLE):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n')


def path(d, fill, evenodd=False):
    rule = ' fill-rule="evenodd"' if evenodd else ""
    return f'<path fill="{fill}"{rule} d="{d}"/>'


# ------------------------------------------------------------------ symbol
C = 128
R = 120


def geo(small):
    if small:   # small-size cut: thicker light, bigger Sun, tighter curvature
        return dict(limb=170, top=150, band=18, sun=26)
    return dict(limb=230, top=156, band=9, sun=14)


def _hits(g, rho):
    lcy = g["top"] + g["limb"]
    d = lcy - C
    a = (d * d + rho * rho - R * R) / (2 * d)
    h = sqrt(rho * rho - a * a)
    return (C - h, lcy - a), (C + h, lcy - a)


def space_region(g, sun_hole):
    rb = g["limb"] + g["band"]
    (lx, ly), (rx, ry) = _hits(g, rb)
    d = f"M{f(lx)} {f(ly)}A{R} {R} 0 1 1 {f(rx)} {f(ry)}A{rb} {rb} 0 0 0 {f(lx)} {f(ly)}Z"
    if sun_hole:
        d += circle(C, sun_cy(g), g["sun"], cw=False)
    return d


def planet_region(g):
    lr = g["limb"]
    (lx, ly), (rx, ry) = _hits(g, lr)
    return f"M{f(lx)} {f(ly)}A{lr} {lr} 0 0 1 {f(rx)} {f(ry)}A{R} {R} 0 0 1 {f(lx)} {f(ly)}Z"


def band_region(g):
    lr, rb = g["limb"], g["limb"] + g["band"]
    (l1x, l1y), (r1x, r1y) = _hits(g, rb)
    (l2x, l2y), (r2x, r2y) = _hits(g, lr)
    return (f"M{f(l1x)} {f(l1y)}A{rb} {rb} 0 0 1 {f(r1x)} {f(r1y)}"
            f"A{R} {R} 0 0 1 {f(r2x)} {f(r2y)}"
            f"A{lr} {lr} 0 0 0 {f(l2x)} {f(l2y)}"
            f"A{R} {R} 0 0 1 {f(l1x)} {f(l1y)}Z")


def sun_cy(g):
    # the Sun rests on the line of light (tangent at the top of the limb)
    return g["top"] - g["band"] - g["sun"]


def symbol_body(small=False, mode="black"):
    g = geo(small)
    if mode in ("black", "white"):
        ink = "#000000" if mode == "black" else "#ffffff"
        return path(space_region(g, True) + planet_region(g), ink, evenodd=True)
    disc = NIGHT if mode == "light" else DEEP
    light = SUN
    return (path(circle(C, C, R), disc)
            + path(band_region(g), light)
            + path(circle(C, sun_cy(g), g["sun"]), light))


# ------------------------------------------------------------------ wordmark
W = 24             # stroke
YT, YB = 90, 210   # x-height top, baseline
ASC = 40           # ascender top
OS = 2             # overshoot for round letters
CY = (YT + YB) / 2


def rect(x, y0, y1, w=W):
    return f"M{f(x)} {f(y0)}H{f(x + w)}V{f(y1)}H{f(x)}Z"


def ring_arc(cx, cy, ri, ro, a0, a1):
    span = (a1 - a0) % 360
    large = 1 if span > 180 else 0
    p = lambda r, a: (cx + r * cos(radians(a)), cy + r * sin(radians(a)))
    o0, o1, i1, i0 = p(ro, a0), p(ro, a1), p(ri, a1), p(ri, a0)
    return (f"M{f(o0[0])} {f(o0[1])}A{f(ro)} {f(ro)} 0 {large} 1 {f(o1[0])} {f(o1[1])}"
            f"L{f(i1[0])} {f(i1[1])}A{f(ri)} {f(ri)} 0 {large} 0 {f(i0[0])} {f(i0[1])}Z")


def arch(x, width):
    """n-style arch: two legs to the baseline joined by a half ring."""
    ro = width / 2
    ri = ro - W
    cy = YT - OS / 2 + ro
    return (f"M{f(x)} {f(YB)}V{f(cy)}A{f(ro)} {f(ro)} 0 0 1 {f(x + width)} {f(cy)}"
            f"V{f(YB)}H{f(x + width - W)}V{f(cy)}A{f(ri)} {f(ri)} 0 0 0 {f(x + W)} {f(cy)}"
            f"V{f(YB)}Z")


def ring(x, width):
    r = width / 2 + OS / 2
    return circle(x + width / 2, CY, r) + circle(x + width / 2, CY, r - W, cw=False)


def glyph_h(x):
    return rect(x, ASC, YB) + arch(x, 104), 104


def glyph_e(x):
    w = 114
    cx, ro = x + w / 2, w / 2 + OS / 2
    # open on the lower right; the arc runs clockwise from 40° round to just under the bar
    # bar ends exactly on the bowl's outer curve so no corner pokes out
    bx = cx + sqrt(ro * ro - (W / 2) ** 2)
    bar = f"M{f(x + 4)} {f(CY - W / 2)}H{f(bx)}V{f(CY + W / 2)}H{f(x + 4)}Z"
    return ring_arc(cx, CY, ro - W, ro, 38, 368) + bar, w


def glyph_l(x):
    return rect(x, ASC, YB), W


def glyph_i(x, dot):
    dot.append((x + W / 2, YT - 33, 15))
    return rect(x, YT, YB), W


def glyph_o(x):
    return ring(x, 116), 116


def glyph_r(x):
    ro = 56
    ri = ro - W
    top = YT - OS / 2
    cy = top + ro
    shoulder = (f"M{f(x)} {f(cy)}A{f(ro)} {f(ro)} 0 0 1 {f(x + ro)} {f(top)}"
                f"A{f(ro)} {f(ro)} 0 0 1 {f(x + ro + ro * sin(radians(40)))} {f(cy - ro * cos(radians(40)))}"
                f"L{f(x + ro + ri * sin(radians(40)))} {f(cy - ri * cos(radians(40)))}"
                f"A{f(ri)} {f(ri)} 0 0 0 {f(x + ro)} {f(top + W)}"
                f"A{f(ri)} {f(ri)} 0 0 0 {f(x + W)} {f(cy)}Z")
    return rect(x, YT, YB) + shoulder, ro + ro * sin(radians(40))


def glyph_a(x):
    w = 112
    return ring(x, w) + rect(x + w - W, YT, YB), w


def wordmark(x0=0.0):
    """Returns (ink path, list of i-dot circles, total width)."""
    dots = []
    spacing = {  # gap after each glyph, optically adjusted (rounds sit closer)
        "h": 18, "e": 14, "l": 20, "i": 18, "o": 14, "r": 8, "a": 0,
    }
    x = x0
    d = ""
    for ch in "heliora":
        if ch == "i":
            p, w = glyph_i(x, dots)
        else:
            p, w = {"h": glyph_h, "e": glyph_e, "l": glyph_l, "o": glyph_o, "r": glyph_r, "a": glyph_a}[ch](x)
        d += p
        x += w + spacing[ch]
    return d, dots, x - x0


def wordmark_body(x0, mode):
    ink_d, dots, width = wordmark(x0)
    ink = {"black": "#000000", "white": "#ffffff", "light": NIGHT, "dark": STAR}[mode]
    dot_fill = {"black": "#000000", "white": "#ffffff", "light": SUN_DEEP, "dark": SUN}[mode]
    dot_d = "".join(circle(cx, cy, r) for cx, cy, r in dots)
    return path(ink_d, ink) + path(dot_d, dot_fill), width


# ------------------------------------------------------------------ write files
def write(name, body, w, h):
    (OUT / name).write_text(svg(body, w, h))


MODES = {"black": "", "light": "-light", "dark": "-dark", "white": "-white"}

for mode, suffix in MODES.items():
    write(f"heliora-symbol{suffix}.svg", symbol_body(False, mode), 256, 256)
    write(f"heliora-symbol-small{suffix}.svg", symbol_body(True, mode), 256, 256)

    wb, ww = wordmark_body(8, mode)
    write(f"heliora-wordmark{suffix}.svg", wb, ww + 16, 256)

    gap = 52
    hb, hw = wordmark_body(256 + gap, mode)
    write(f"heliora-horizontal{suffix}.svg", symbol_body(False, mode) + hb, 256 + gap + hw + 8, 256)
    # same lockup with the small-size symbol, for navigation bars and other small uses
    write(f"heliora-horizontal-small{suffix}.svg", symbol_body(True, mode) + hb, 256 + gap + hw + 8, 256)

    # stacked: symbol on top, wordmark at half size centred below
    k = 0.5
    _, _, wordw = wordmark(0)
    total_w = max(256, wordw * k + 16)
    sym_x = (total_w - 256) / 2
    word_x = (total_w - wordw * k) / 2
    gap_v = 28
    dy = 256 + gap_v - ASC * k
    sb, _ = wordmark_body(0, mode)
    body = (f'<g transform="translate({f(sym_x)} 0)">{symbol_body(False, mode)}</g>'
            f'<g transform="translate({f(word_x)} {f(dy)}) scale({k})">{sb}</g>')
    write(f"heliora-stacked{suffix}.svg", body, total_w, 256 + gap_v + (YB - ASC) * k + 8)

# app icon: dark symbol on a Night rounded square (small-size cut for clarity)
icon = (f'<rect width="256" height="256" rx="56" fill="{NIGHT}"/>'
        f'<g transform="translate(28 28) scale(0.78125)">{symbol_body(True, "dark")}</g>')
write("heliora-app-icon.svg", icon, 256, 256)

print("wrote", len(list(OUT.glob("*.svg"))), "files to", OUT)
