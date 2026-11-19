# Heliora: logo guidelines

## 1. The logo
- **Idea:** "First Light". A disc of space is split by a planet's limb, drawn as a line of light, with the Sun resting on it: sunrise seen from orbit, light arriving *now*. The same Sun comes back as the dot on the i in the wordmark.
- **Versions:** horizontal lockup (primary), horizontal lockup with the small-size symbol, stacked lockup, symbol, small-size symbol, wordmark, app icon. Each comes in black (one colour), `-white` (one colour, reversed), `-light` (for light backgrounds) and `-dark` (for dark backgrounds).
- **Source:** `src/build_logo.py` generates every file in `logo/` from geometry. The wordmark is drawn with paths, so no font is needed. Edit the script and run it again (`python brand/src/build_logo.py`) instead of editing the SVGs by hand.

| Folder | Contents |
|---|---|
| `logo/` | SVG masters: symbol, small-size symbol, wordmark, horizontal, stacked, app icon |
| `web/` | favicon.ico, favicon.svg, PNG icons, webmanifest, head snippet (copied to `/public`) |
| `og/` | Link preview image (1200 × 630), its HTML source and the scene screenshot |
| `board/` | Presentation board and slides with mockups |
| `concepts/` | The three first-round concepts (A Orbit Hour, B Sun & Phase, C First Light), kept for reference |

## 2. Clear space
Keep a clear zone around the logo equal to the **diameter of the Sun dot** in the symbol on every side. The zone scales with the logo.

## 3. Minimum size
| Version | Screen | Print |
|---|---|---|
| Horizontal lockup | 160 px wide. Below that, use `heliora-horizontal-small` | 40 mm wide |
| Horizontal lockup, small (`-small`) | 90 px wide (used in the site navigation at 28–32 px tall) | 24 mm wide |
| Symbol | 40 px. Below that, use `heliora-symbol-small` or the favicon files | 10 mm |
| Small-size symbol | 16 px | 5 mm |

At 32 px and below, the regular symbol loses its Sun (tested in the preview sheet), so always switch to the small-size cut.

## 4. Colour
| Name | HEX | RGB | Use |
|---|---|---|---|
| Night | `#0a0d1a` | 10, 13, 26 | The disc on light backgrounds, ink on light backgrounds, app-icon tile |
| Deep | `#1c2650` | 28, 38, 80 | The disc on dark backgrounds (it stays visible on the site's `#050508`) |
| Sunlight | `#ffb347` | 255, 179, 71 | The line of light and the Sun inside the disc; the i-dot on dark backgrounds |
| Sunlight Deep | `#e07a12` | 224, 122, 18 | The i-dot on light backgrounds |
| Starlight | `#f0f0f5` | 240, 240, 245 | Wordmark on dark backgrounds |

Amber appears **only** as light: the limb, the Sun and the i-dot. Everything else is Night, Deep or Starlight. The site UI keeps its existing accents (Sun orange `#ff6b35`, teal `#4ecdc4`) for interface states; they are not logo colours. CMYK and Pantone values have not been matched yet; get a proof before printing.

**Approved pairs:** `-light` files on white or very light backgrounds · `-dark` files on Night, `#050508` or space imagery · black on white · white (`-white`) on photos, placed over a calm area.

**One colour:** the black and white masters cut the line of light and the Sun out of the disc as negative space. Never recolour the `-light` or `-dark` files into one colour; they turn into a plain dot.

## 5. Typography
The site uses **Space Grotesk** (display) and **Inter** (UI), both from Google Fonts under the SIL Open Font License. The logo wordmark is custom-drawn geometry, so don't retype "heliora" in a font and call it the logo.

## 6. Don't
- Recolour the disc, or use the amber anywhere except the light, the Sun and the i-dot.
- Move, enlarge, or remove the Sun, or detach it from the line of light.
- Add glows, gradients, outlines or shadows (the product does the glowing; the mark stays flat).
- Stretch, rotate, or tilt the limb.
- Place the `-light` version on dark backgrounds, or `-dark` on white.
- Use the regular symbol below 40 px.

## 7. Tests run
- `svg_audit.py`: 99–100/100 on all masters (no live text, no rasters, no filters).
- Preview sheet at 96 and 32 px, one colour and reversed: the small-size cut keeps the Sun and the line at 32 px; the regular symbol does not.
- Favicon, apple-touch and maskable icons checked visually; the mark sits inside the maskable safe zone.

## 8. Open items
- No trademark search has been done. Do one (for example DJKI and the WIPO Global Brand Database) before any commercial use.
- The canonical URL, sitemap, robots.txt and OG image all assume `heliora.vercel.app`. Update them if the project ends up on another domain.
- The OG scene is a real render of the sky on 19 Nov 2026. Re-shoot it (`og/og.html` + a new `og/scene.png`) if you want a different view.
