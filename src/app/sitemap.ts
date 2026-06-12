import type { MetadataRoute } from "next";

const SITE = "https://algoritham.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/",                 priority: 1.0, changeFrequency: "weekly"  as const },
    { path: "/services",         priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/industries",       priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/case-studies",     priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about",            priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/mission-vision",   priority: 0.7, changeFrequency: "yearly"  as const },
    { path: "/contact",          priority: 0.9, changeFrequency: "yearly"  as const },
    { path: "/legal/privacy",    priority: 0.3, changeFrequency: "yearly"  as const },
    { path: "/legal/terms",      priority: 0.3, changeFrequency: "yearly"  as const },
    { path: "/legal/refund",     priority: 0.3, changeFrequency: "yearly"  as const },
  ];
  return routes.map((r) => ({
    url:             `${SITE}${r.path}`,
    lastModified:    now,
    changeFrequency: r.changeFrequency,
    priority:        r.priority,
  }));
}
