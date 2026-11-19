"""Heliora logo concepts, round 1. Generates black SVG symbols and exploratory lockups.

Run: python brand/src/concepts.py
Lockups use <text> for exploration only; the final wordmark is drawn as paths.
"""
from math import asin, cos, degrees, radians, sin
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "concepts"
OUT.mkdir(parents=True, exist_ok=True)


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def circle(cx, cy, r, sweep=1):
    """Closed circle as two arcs. sweep=0 draws it counter-clockwise (a hole with nonzero fill)."""
    return (
        f"M{f(cx - r)} {f(cy)}A{f(r)} {f(r)} 0 1 {sweep} {f(cx + r)} {f(cy)}"
        f"A{f(r)} {f(r)} 0 1 {sweep} {f(cx - r)} {f(cy)}Z"
    )


def ring_arc(cx, cy, r_in, r_out, a0, a1):
    """Thick arc from angle a0 to a1 (degrees, clockwise in SVG space) with square ends."""
    span = (a1 - a0) % 360
    large = 1 if span > 180 else 0
    p = lambda r, a: (cx + r * cos(radians(a)), cy + r * sin(radians(a)))
    o0, o1 = p(r_out, a0), p(r_out, a1)
    i1, i0 = p(r_in, a1), p(r_in, a0)
    return (
        f"M{f(o0[0])} {f(o0[1])}A{f(r_out)} {f(r_out)} 0 {large} 1 {f(o1[0])} {f(o1[1])}"
        f"L{f(i1[0])} {f(i1[1])}A{f(r_in)} {f(r_in)} 0 {large} 0 {f(i0[0])} {f(i0[1])}Z"
    )


def rrect(x, y, w, h, r):
    return (
        f"M{f(x + r)} {f(y)}H{f(x + w - r)}A{f(r)} {f(r)} 0 0 1 {f(x + w)} {f(y + r)}"
        f"V{f(y + h - r)}A{f(r)} {f(r)} 0 0 1 {f(x + w - r)} {f(y + h)}"
        f"H{f(x + r)}A{f(r)} {f(r)} 0 0 1 {f(x)} {f(y + h - r)}V{f(y + r)}"
        f"A{f(r)} {f(r)} 0 0 1 {f(x + r)} {f(y)}Z"
    )


def svg(d, size=256, evenodd=True, extra=""):
    rule = ' fill-rule="evenodd"' if evenodd else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} 256" width="{size}" height="256">'
        f'<path fill="#000"{rule} d="{d}"/>{extra}</svg>\n'
    )


C = 128

# ---------------------------------------------------------------- A: Orbit Hour
# Sun at the centre, two orbits, both planets aligned on one radius like a clock hand.
HAND = -45  # degrees, SVG space (upper right)


def orbit_hour(sun_r, rings, gap):
    parts = [circle(C, C, sun_r)]
    for rc, thick, pr in rings:
        g = degrees(asin((pr + gap) / rc))
        parts.append(ring_arc(C, C, rc - thick / 2, rc + thick / 2, HAND + g, HAND - g + 360))
        px, py = C + rc * cos(radians(HAND)), C + rc * sin(radians(HAND))
        parts.append(circle(px, py, pr))
    return "".join(parts)


a_symbol = orbit_hour(28, [(62, 16, 15), (104, 16, 20)], 8)

# ---------------------------------------------------------------- B: Day Line H
# Two stems of an H with a planet as the crossbar, split by the day/night terminator.
def day_line_h(planet_r, gap, term_w):
    stem_w = 46
    left = rrect(26, 34, stem_w, 188, 9)
    right = rrect(256 - 26 - stem_w, 34, stem_w, 188, 9)
    # planet: lit part (right of terminator) and night part (left), separated by a curved band.
    # Terminator = ellipse arc centred on the planet, semi-axes (k*r, r): a curve bulging to the right.
    r = planet_r
    k = 0.42
    # Night side: left half disc + half-ellipse bulge (outer edge of the band)
    night = (
        f"M{f(C)} {f(C - r)}A{f(r)} {f(r)} 0 0 0 {f(C)} {f(C + r)}"
        f"A{f(k * r - term_w / 2)} {f(r)} 0 0 0 {f(C)} {f(C - r)}Z"
    )
    # Day side: right half disc minus the bulge (inner edge of the band is offset)
    day = (
        f"M{f(C)} {f(C - r)}A{f(r)} {f(r)} 0 0 1 {f(C)} {f(C + r)}"
        f"A{f(k * r + term_w / 2)} {f(r)} 0 0 0 {f(C)} {f(C - r)}Z"
    )
    return left + right + night + day, gap


def day_line_h_v2():
    """Stems overlap the planet so the three parts read as one H; the terminator splits the planet."""
    stem_w = 44
    r = 62
    left = rrect(C - r - stem_w + 6, 34, stem_w, 188, 9)
    right = rrect(C + r - 6, 34, stem_w, 188, 9)
    k = 0.34
    tw = 13
    # day side on the right (gibbous), night side on the left, band between them bulging left
    night = (
        f"M{f(C)} {f(C - r)}A{f(r)} {f(r)} 0 0 0 {f(C)} {f(C + r)}"
        f"A{f(k * r + tw / 2)} {f(r)} 0 0 1 {f(C)} {f(C - r)}Z"
    )
    day = (
        f"M{f(C)} {f(C - r)}A{f(r)} {f(r)} 0 0 1 {f(C)} {f(C + r)}"
        f"A{f(max(k * r - tw / 2, 0.1))} {f(r)} 0 0 1 {f(C)} {f(C - r)}Z"
    )
    return [left, right, night, day]


def crescent_h():
    """H built from two crescents (the lit limb at dawn and at dusk) joined by a crossbar."""
    R = 92  # outer radius of each crescent's circle
    off = 30  # how far the cutting circle is shifted
    top, bot = 36, 220
    h = (bot - top) / 2
    # Each stem: the region between an outer arc and an inner arc through the same end points.
    def stem(x_outer_edge, x_inner_edge, direction):
        # end points at (x, top) and (x, bot); outer arc bulges outward by `bulge`
        x = x_inner_edge
        bulge_out = direction * 34
        bulge_in = direction * 10
        rx_o = (h * h + bulge_out * bulge_out) / (2 * abs(bulge_out))
        rx_i = (h * h + bulge_in * bulge_in) / (2 * abs(bulge_in))
        so = 0 if direction < 0 else 1
        si = 1 - so
        return (
            f"M{f(x)} {f(top)}A{f(rx_o)} {f(rx_o)} 0 0 {so} {f(x)} {f(bot)}"
            f"A{f(rx_i)} {f(rx_i)} 0 0 {si} {f(x)} {f(top)}Z"
        )
    left = stem(0, 86, -1)
    right = stem(0, 170, 1)
    bar = rrect(80, C - 14, 96, 28, 4)
    return [left, right, bar]


def sun_and_phase():
    """A small sun lighting a planet: the lit side always faces the sun, split by the terminator."""
    r, k, tw = 84, 0.42, 12
    a_day = max(k * r - tw / 2, 0.1)
    a_night = k * r + tw / 2
    day = (
        f"M0 {-r}A{r} {r} 0 0 0 0 {r}"
        f"A{f(a_day)} {r} 0 0 0 0 {-r}Z"
    )
    night = (
        f"M0 {-r}A{r} {r} 0 0 1 0 {r}"
        f"A{f(a_night)} {r} 0 0 0 0 {-r}Z"
    )
    g = '<g transform="translate(148 148) rotate(45)">' + f'<path fill="#000" d="{day}"/><path fill="#000" d="{night}"/></g>'
    sun = f'<path fill="#000" d="{circle(48, 48, 22)}"/>'
    return g + sun


b_markup = sun_and_phase()
b_paths = []
b_symbol = "".join(b_paths)

# ---------------------------------------------------------------- C: First Light
# A disc of space; the planet's limb is a thin line of light with the Sun breaking over it.
def first_light():
    """Space (top) and planet (bottom) as two regions of one disc, split by a line of light,
    with the Sun resting on the limb as a negative dot."""
    R = 120
    limb_r = 230
    band = 9
    top_of_limb = 156
    lcy = top_of_limb + limb_r
    d = lcy - C

    def hits(rho):
        a = (d * d + rho * rho - R * R) / (2 * d)
        h = (rho * rho - a * a) ** 0.5
        return (C - h, lcy - a), (C + h, lcy - a)

    rb = limb_r + band
    (lx, ly), (rx, ry) = hits(rb)
    space = (
        f"M{f(lx)} {f(ly)}A{R} {R} 0 1 1 {f(rx)} {f(ry)}"
        f"A{rb} {rb} 0 0 0 {f(lx)} {f(ly)}Z"
    )
    sun_r = 14
    sun = circle(C, top_of_limb - band - sun_r, sun_r, sweep=0)
    (lx2, ly2), (rx2, ry2) = hits(limb_r)
    planet = (
        f"M{f(lx2)} {f(ly2)}A{limb_r} {limb_r} 0 0 1 {f(rx2)} {f(ry2)}"
        f"A{R} {R} 0 0 1 {f(lx2)} {f(ly2)}Z"
    )
    return space + sun + planet


c_symbol = first_light()

(OUT / "a-symbol.svg").write_text(svg(a_symbol, evenodd=False))
(OUT / "b-symbol.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">'
    + b_markup
    + "</svg>\n"
)
(OUT / "c-symbol.svg").write_text(svg(c_symbol, evenodd=True))

# exploratory lockups (live text, flagged)
for key in "abc":
    sym = (OUT / f"{key}-symbol.svg").read_text()
    start = min(i for i in (sym.find("<path"), sym.find("<g")) if i >= 0)
    inner = sym[start: sym.index("</svg>")]
    lock = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 256" width="900" height="256">'
        f"<g>{inner}</g>"
        '<text x="300" y="168" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="132" '
        'font-weight="600" letter-spacing="-2" fill="#000">heliora</text></svg>\n'
    )
    (OUT / f"{key}-lockup.svg").write_text(lock)

print("wrote", sorted(p.name for p in OUT.glob("*.svg")))
