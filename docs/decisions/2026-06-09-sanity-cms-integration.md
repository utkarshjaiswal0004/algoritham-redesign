# ADR: Sanity CMS integration

Date: 2026-06-09
Status: Accepted

## Context

The redesign launched with content hardcoded inside each section component. Editors had no way to update copy, the marketing-claim "99.99% uptime" vs "100% uptime" got out of sync between Hero and TrustBar, and a new Mission/Vision page was needed without another round-trip to a developer.

Constraints:
- Next.js 16 / React 19 / Tailwind v4 — bleeding edge. Need a CMS that works cleanly with App Router server components.
- Editors are non-technical. The studio should live on the same domain as the site.
- The site should still render if the CMS is empty (no white-screen during initial Studio population).
- One source of truth for marketing claims (uptime, years, carriers, projects).

## Decision

Adopt **Sanity** (project `gphbi065`) with the Studio **embedded at `/studio`** via `next-sanity/studio`.

- Schemas are split into `objects/`, `singletons/`, `documents/`. Singletons (siteSettings, navigation, footer, page-singletons) are pinned in `structure.ts`.
- Every page is a **server component** that fetches via `src/sanity/content.ts`, which wraps GROQ queries in fallback-aware helpers (`src/sanity/defaults.ts`). Sections stay `"use client"` and take props.
- Icons are stored as **strings** and resolved on the client via `src/lib/icon-map.ts` — keeps Sanity data serializable.
- `siteSettings` is the canonical source for marketing claims. The Hero badge string supports a `{uptime}` placeholder; TrustBar/Infrastructure read directly from `site.uptimeSLA`.
- A new `/mission-vision` route was added (separate from `/about`) for SEO surface area on "mission" queries.
- Per-page `seo` objects (CMS) drive `generateMetadata`. JSON-LD in `SeoSchema.tsx` is sourced from `siteSettings`.
- `/api/newsletter` and `/api/contact` write to Sanity. `/api/revalidate` accepts Sanity webhooks and revalidates the relevant paths by `_type`.

## Alternatives considered

- **Sanity-hosted studio (`<project>.sanity.studio`)** — simpler to deploy, but editors leave our domain and we maintain a separate config repo. Rejected.
- **Strapi / Payload / Contentful** — Sanity has the best Next 16 / RSC story today and the GROQ + Studio v3 combo fits our shape (heavy singletons + a few lists).
- **No CMS, just YAML** — works for a static brochure site but blocks non-dev editing, which is the whole reason for this change.
- **Fetch on the client** — would force "use client" up the tree, miss SSR/SEO benefits, and burn the CDN cache on every visit. Rejected.

## Consequences

- Every section now takes typed props. Hardcoded data arrays are removed from sections and live as `defaults.ts` fallbacks only.
- Newsletter and Contact submissions land in Sanity — no separate ESP unless we decide to wire one later.
- A **rotated** `SANITY_API_TOKEN` is required in `.env.local` for the API routes to write. The token shared in the initial conversation must be rotated.
- Webhook revalidation requires `SANITY_REVALIDATE_SECRET` set on the deploy and configured in Sanity → API → Webhooks.
- ISR is set to 60s as a floor; webhooks make it near-instant on edits.
