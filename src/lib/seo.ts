/**
 * Per-page metadata helper. Merges a page-level SEO object (from CMS)
 * with site defaults (also from CMS), producing a Next.js Metadata.
 */
import type { Metadata } from "next";
import { urlFor } from "@/sanity/image";
import type { SeoFields, SiteSettings } from "@/sanity/types";

const SITE_URL = "https://algoritham.com";

export function buildMetadata(opts: {
  site: SiteSettings;
  page?: SeoFields;
  path?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}): Metadata {
  const { site, page, path = "/", fallbackTitle, fallbackDescription } = opts;
  const title       = page?.title       ?? fallbackTitle       ?? site.seo?.title       ?? `${site.shortName ?? "Algoritham"} — IT Managed Services`;
  const description = page?.description ?? fallbackDescription ?? site.seo?.description ?? site.description    ?? "";
  const keywords    = page?.keywords    ?? site.seo?.keywords  ?? [];
  const ogImage     = page?.ogImage ?? site.seo?.ogImage;
  const ogUrl       = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url:   ogUrl,
      siteName: site.name ?? "Algoritham Infrastructure",
      title, description,
      images: ogImage ? [{ url: urlFor(ogImage).width(1200).height(630).url(), width: 1200, height: 630 }]
                      : [{ url: "/logo.png", width: 512, height: 512 }],
    },
    twitter: { card: "summary_large_image", title, description,
      images: ogImage ? [urlFor(ogImage).width(1200).height(630).url()] : ["/logo.png"] },
    robots: { index: !page?.noIndex, follow: !page?.noIndex },
  };
}
