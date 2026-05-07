import type { MetadataRoute } from "next";

const SITE = "https://algoritham.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow general crawlers + AI bots (GPTBot, PerplexityBot, ClaudeBot, Google-Extended)
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host:    SITE,
  };
}
