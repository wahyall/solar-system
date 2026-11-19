# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-11-19

## Product Overview
**One-liner:** See where every planet is right now, in 3D, in your browser.
**What it does:** Heliora is a live 3D model of the solar system. Every planet sits where it really is on today's date, computed in the browser from NASA JPL orbital elements. You can run time forward or backward, fly to any planet, and watch Earth turn with real day and night, city lights and clouds.
**Product category:** Interactive 3D solar system / online orrery (how people search: "solar system 3D", "where are the planets now", "planet positions today", "solar system simulator").
**Product type:** Free static web app (Vite, React, Three.js), open source.
**Business model:** Free. Portfolio and reputation project. No accounts, no ads.

## Target Audience
**Target companies:** Not B2B. Primary audiences:
1. Recruiters, clients and studios looking at the author's work (the real goal).
2. Creative developers and the three.js / WebGL community.
3. Space-curious general public: people who saw a planet in the sky or heard about an alignment.
**Decision-makers:** Hiring managers, tech leads and clients who judge craft from a live demo.
**Primary use case:** Opening a link and immediately seeing the real solar system right now, beautifully rendered.
**Jobs to be done:**
- "Show me where the planets actually are today" (curiosity, sky events).
- "Let me feel the scale and motion of the solar system" (time controls, fly-to).
- "Show me that this developer can build polished real-time 3D" (portfolio).
**Use cases:**
- Checking the planets during a sky event (conjunction, opposition, solstice).
- A teacher or parent showing why Venus is a "morning star" this month.
- A recruiter clicking a portfolio link and getting a wow moment in 5 seconds.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Recruiter / client | Evidence of craft and finish | Most portfolios are screenshots and static demos | A live, data-driven 3D app that opens instantly, on phone too |
| Creative developer | Technique, shaders, performance | Tutorials stop at spinning textured spheres | Real JPL orbits, scattering atmosphere, ring shadows, open code |
| Curious public | "Is that Venus I saw?" | Planetarium apps are heavy or need installs | One link, today's real sky in 3D, no sign-up |

## Problems & Pain Points
**Core problem:** Most solar system visuals are either accurate but utilitarian (NASA Eyes, ephemeris tools) or pretty but fake (random orbits, toy models).
**Why alternatives fall short:**
- NASA Eyes: accurate and rich, but dense UI and a "mission control" feel; heavy first load.
- Solar System Scope: long-standing and accurate, but full web model needs a desktop with WebGL; the best graphics are in the paid desktop app.
- Tutorial demos on GitHub: beautiful screenshots, fake circular orbits and random start angles.
**What it costs them:** Curiosity dies in the loading screen or the controls.
**Emotional tension:** "Space is huge and confusing; I just want to see it."

## Competitive Landscape
**Direct:** NASA's Eyes on the Solar System: real-time, SPICE data, 1950–2050, spacecraft. Falls short for casual viewers because it is built for depth, not a 5-second wow.
**Direct:** Solar System Scope: free online model since 2011, real-time, plus desktop (USD 9.80) and mobile apps. Owns "online model of solar system". Web model is desktop-only.
**Secondary:** TheSkyLive 3D viewer: object search and orbit plotting, utility-first, ad-supported.
**Indirect:** Stellarium / sky apps on phones (sky view from Earth, not the 3D system); YouTube explainer videos.

## Differentiation
**Key differentiators:**
- Live by default: opens on the real configuration of today, with a "Live" indicator.
- Cinematic rendering in a browser tab: physically motivated atmosphere scattering, Earth night lights and ocean glint, Saturn's rings shadowing the planet and vice versa, HDR bloom.
- Runs on phones, no install, no account.
- Guided scroll tour plus free Explore mode in one page.
- Open source, small and readable (one engine file, one shader file, one orbit file).
**How we do it differently:** JPL Keplerian elements evaluated in the browser; directions are real, distances compressed for readability.
**Why that's better:** Accurate where it matters to a viewer (who is where), beautiful where it matters to a first impression.
**Why people choose us:** It is the fastest path from a link to "wow, that's the real sky right now".

## Objections
| Objection | Response |
|-----------|----------|
| "Distances are not to scale" | Correct, on purpose: true scale makes planets invisible. Directions and dates are real; the overview says so. |
| "NASA already has this" | NASA Eyes is the reference for depth. Heliora is the 5-second, phone-friendly version with a cinematic look. |
| "Only 1800–2050?" | That is the validity range of the JPL table used; the clock stops at the edge instead of drifting into wrong positions. |

**Anti-persona:** Amateur astronomers who need precise ephemerides, observing planners, or spacecraft trajectories. Point them to JPL Horizons or NASA Eyes.

## Switching Dynamics
**Push:** Heavy apps, installs, dense UIs, fake toy models.
**Pull:** One link, live sky, beautiful on any screen.
**Habit:** Googling "planets tonight" and reading a text list.
**Anxiety:** "Is it accurate?" Answered by citing JPL and showing the date and Live indicator.

## Customer Language
**How they describe the problem:**
- "where are the planets right now"
- "is that Venus or a star"
- "planet alignment tonight"
*(Search-phrase style, not verbatim user quotes yet. Replace with real comments after launch.)*
**How they describe us:** Not available yet (no users). Collect from comments in the first month.
**Words to use:** live, right now, real positions, in your browser, fly to, time-lapse, today's sky.
**Words to avoid:** revolutionary, next-level, game-changer, "simulator" claims of precision, "to scale".
**Glossary:**
| Term | Meaning |
|------|---------|
| Live | Clock running at real time on the current date |
| Tour | Scroll-driven guided journey from the Sun outward |
| Explore | Free camera mode with fly-to and labels |
| JPL elements | NASA JPL "Approximate Positions of the Planets", Table 1 |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Calm | Unhurried, lets visuals carry the wow | Flat or dull | "See where every planet is right now." |
| Precise | Real numbers, cited sources, honest limits | Jargon walls | "Positions from NASA JPL orbital elements, valid 1800–2050." |
| Warm | Sunlight, curiosity, invitation | Cute or childish | "Fly to Saturn and watch its rings throw a shadow." |
| Crafted | Details shown, not boasted | Bragging about tech | "Earth's city lights switch on as the terminator passes." |

**Tone by context:**
- Launch: show the clip first, one plain sentence, link.
- Errors: plain cause and next step ("WebGL is not available in this browser.").
- Social: curious and timely ("Venus just passed Earth. Here's the real geometry today.").
- Technical posts: open with the visual and one lay sentence, then the shader detail.
**Terms we own:** "live sky", "right now", "today's solar system".
**Never use (and why):** "to scale" (it isn't), "accurate to the second" (it's a low-precision model), hype adjectives (contradict calm voice).

## Proof Points
**Metrics:** None yet (pre-launch). Technical facts that can be shown: real JPL positions; Earth heliocentric longitude 56.3° on 2026-11-19 (expected ≈56.6°); ~114 fps measured in a test browser at 1440×900; ~20 ms/frame on Intel UHD integrated graphics.
**Customers:** None yet.
**Testimonials:** None yet.
**Value themes:**
| Theme | Proof |
|-------|-------|
| Real | JPL elements, live clock, date shown |
| Beautiful | Clips of Earth terminator, Saturn ring shadows, Sun corona |
| Instant | No install, opens on phone |
| Open | Public repository |

## Goals
**Business goal:** Portfolio and reputation with recruiters, clients and the dev/3D community.
**Conversion action:** Open the live demo (and, for developers, star the repo).
**Current metrics:** Not deployed yet. Budget Rp0, 3–5 hours per week, solo.

## Learnings
*Decisions and tested lessons. Newest first. Keep it to about 20 active entries.*
| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| 2026-11-19 | Name is Heliora; channels Threads, LinkedIn, TikTok/Reels/Shorts; repo public; email only as manual outreach | User decision | All marketing | active |
| 2026-11-19 | Do not compete on the generic "online model of solar system" term; Solar System Scope has owned it since 2011 | Quick teardown, `teardowns/solarsystemscope/playbook.md` | SEO, copy | active |

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-11-19) — Initial context, auto-drafted from the codebase, the user's decisions and the competitor research.
