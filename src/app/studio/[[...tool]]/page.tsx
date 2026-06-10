/**
 * Embedded Sanity Studio — content editors visit /studio.
 * Authentication is handled by Sanity (sso/email login).
 */
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
