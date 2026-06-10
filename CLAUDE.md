@AGENTS.md

# Algoritham Redesign — agent notes

## Stack pinning
- **Next.js 16.2.5** + **React 19** + **Tailwind v4** + **framer-motion 12**.
- **lucide-react ^1.14** is the current mainline (latest 1.17.x). The 0.x line is legacy. Brand-mark SVGs were dropped in 1.x, so LinkedIn/X/GitHub icons live inline as components in `src/components/sections/Footer.tsx`.
- AGENTS.md says "this is NOT the Next.js you know" — when in doubt, consult `node_modules/next/dist/docs/` before writing new patterns.

## Content model (Sanity)
- Sanity project: `gphbi065`, dataset `production`.
- Embedded Studio at `/studio` (`src/app/studio/[[...tool]]/page.tsx`).
- Schemas in `src/sanity/schemas/` split into `objects/`, `singletons/`, `documents/`.
- Singletons are pinned in Studio via `src/sanity/structure.ts`.
- **Single source of truth for marketing claims** (uptime SLA, years in business, carriers, projects) lives in `siteSettings`. The Hero badge and Infrastructure stats both derive from it — do not hardcode `99.99%` or `15+` in section components.

## Data flow
- Every route is a server component that fetches via `src/sanity/content.ts`.
- `content.ts` wraps the GROQ queries in `src/sanity/queries.ts` and falls back to `src/sanity/defaults.ts` whenever Sanity returns null/empty. The site renders correctly with Studio empty.
- Section components are `"use client"` and accept typed props from the parent server component. They never fetch themselves.
- Icons are stored as **string names** in Sanity and resolved through `src/lib/icon-map.ts`. Add new icons to that registry as you reference them.

## SEO
- `src/lib/seo.ts` builds `Metadata` from CMS `siteSettings.seo` + per-page `seo`.
- JSON-LD in `src/components/SeoSchema.tsx` reads from `siteSettings`. Inner pages add `BreadcrumbSchema`; `FaqSchema` is available for pages that grow an FAQ.
- `src/app/sitemap.ts` is hand-maintained — add new top-level routes there.

## Forms
- `/api/newsletter` → creates `subscriber` doc in Sanity.
- `/api/contact` → creates `contactSubmission` doc.
- Both require `SANITY_API_TOKEN` (server-only, never expose). Set in `.env.local`.

## Revalidation
- `/api/revalidate` accepts Sanity webhooks. Configure at sanity.io/manage with `SANITY_REVALIDATE_SECRET`. The route maps `_type` → page paths in `PATH_FOR_TYPE`.

## Conventions
- Don't put CMS-derivable content in code. If it's editor-facing copy, schema it.
- Don't hardcode the brand gradient hexes (`#7c3aed` → `#06b6d4`) in new code without checking whether a `brand-gradient` utility class would do.
- Sub-page pattern: `app/<route>/page.tsx` (server, fetch + `generateMetadata`) + `app/<route>/view.tsx` (`"use client"`, animations).

## Don't touch
- `src/components/ui/india-paths.ts` — large path-data file; treat as a data asset, not source.
- `src/components/ui/wireframe-globe.tsx` and `src/components/ui/india-coverage-map.tsx` — imperative DOM/canvas, dynamic-loaded with skeletons. If you edit them, re-test on a slow connection.

## Decision log
See `docs/decisions/` for ADRs.
