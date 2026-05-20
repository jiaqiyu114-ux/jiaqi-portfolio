# Site Brief — Jiaqi Yu Personal Portfolio

## Who This Is For

This is the personal portfolio site of **Jiaqi Yu** — a third-year undergraduate student building at the intersection of aesthetics, systems thinking, and execution.

## Core Identity

**Name:** Jiaqi Yu  
**Roles:** Student · Builder · System Thinker  
**One-liner:** 一个正在把审美、系统思考和行动能力，压成可见作品的大三学生。  
**Belief:** I am early, but I am serious. I care about useful output, strong taste, and long-term compounding.

## Site Purpose

This is **not** a standard resume site. It is a living document that lets anyone quickly understand:
- Who Jiaqi is (identity, values)
- What they are building (current work and direction)
- What they believe (principles)
- What they are focused on now (current focus)
- How to reach them (contact)

The site should communicate **seriousness, taste, and intentionality** at first glance.

## Visual Direction

Inspired by MotionSites / premium creative-studio aesthetics:

| Token | Value |
|---|---|
| Background | `#000000` |
| Primary text | `#E1E0CC` (warm cream) |
| Tailwind `primary` | `#DEDBC8` |
| Card bg | `#0d0d0d` |
| Border | `rgba(255,255,255,0.06)` |

**Visual language:**
- Dark / moody / cinematic
- Warm cream color palette — never cold white
- Full-screen hero with inset rounded container (`p-4 md:p-5`, `rounded-[2rem]`)
- Giant editorial typography, bottom-aligned hero content
- Pill navbar floating from top center
- Pull-up text animation (words slide up on enter)
- Subtle CSS noise texture (no video, no WebGL)
- Card hover: border glow + soft shadow
- Section fade-up on scroll

**Typography:**
- Primary: Almarai (weights 300, 400, 700, 800) — editorial, slightly Arabic-inspired geometry
- Accent: Instrument Serif italic — used for italic contrast phrases
- Scale: vw-based for hero (`20vw` desktop), large rems for section headings

## Tech Stack

- **Framework:** Next.js App Router (NOT Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (lightweight — pull-up, fade-up, scale-in only)
- **Icons:** Lucide React
- **No WebGL, no heavy 3D, no external media URLs**

## Page Structure

| # | Section | Purpose |
|---|---|---|
| 1 | Hero | First impression — name, tagline, inset container |
| 2 | Identity | Who I am — multi-style heading + bio |
| 3 | What I Am Building | Current projects — 3 cards |
| 4 | Proof of Work | Selected work — list with links |
| 5 | Principles | What I believe — numbered list |
| 6 | Current Focus | Now — 2-column layout |
| 7 | Contact | Let's connect — email + social links |

## Content Source

All page content lives in `src/lib/content.ts`. Update that file to change copy without touching components.

## Rules

1. Always keep this `site-brief.md` up to date when making major changes.
2. Never use cold white (`#ffffff`) for text — always use cream tones.
3. Never introduce video, heavy WebGL, or external media dependencies.
4. Framer Motion usage: pull-up, fade-up, scale-in only. No particle systems.
5. Mobile-first responsive — every section must work on 375px viewport.
6. Run `npm run lint && npm run build` before considering any task done.
