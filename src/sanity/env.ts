/**
 * Public Sanity coordinates. The project ID and dataset are visible in every
 * image URL (cdn.sanity.io/images/<projectId>/...) so baking defaults here is
 * not a leak — it just lets the build run when env vars aren't wired yet.
 *
 * Override with NEXT_PUBLIC_SANITY_* in .env.local or Vercel project settings
 * if you point at a different project/dataset.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
export const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production";
export const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gphbi065";
