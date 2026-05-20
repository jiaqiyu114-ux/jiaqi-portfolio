@AGENTS.md

# Development Rules

**IMPORTANT: Read `site-brief.md` before making any changes to this project.**

`site-brief.md` contains the visual direction, color system, typography rules, page structure, and content philosophy for this site. All decisions must align with it.

## Quick Reference

- Stack: Next.js App Router + TypeScript + Tailwind CSS v4 + Framer Motion
- Content: edit `src/lib/content.ts` only — do not hardcode copy in components
- Colors: warm cream `#E1E0CC` / `#DEDBC8` on black — never cold white
- After every change: `npm run lint && npm run build`
- Do not introduce video, WebGL, or external media URLs
