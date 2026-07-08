import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Silences Next 16's "detected multiple lockfiles" warning by pinning the
// workspace root explicitly to this project directory.
const projectRoot = dirname(fileURLToPath(import.meta.url));

// Response security headers. Applied to all routes; the CSP is deliberately
// scoped a little loose because framer-motion needs 'unsafe-inline' for
// injected keyframes and Sanity Studio embedded at /studio needs its own
// bootstrap script. For a stricter policy later, split into two matchers
// (site vs. /studio) or move to a report-only variant + tighten iteratively.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live https://*.sanity.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.googleapis.com https://*.gstatic.com https://vercel.com",
  "connect-src 'self' https://*.sanity.io https://cdn.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com wss://*.sanity.io https://vercel.live",
  "frame-src 'self' https://*.sanity.io https://www.google.com https://maps.google.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy",   value: CSP },
  { key: "X-Frame-Options",           value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy",value: "same-origin" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
];

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // Serve modern formats when browsers support them
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,
  reactStrictMode: true,
  compress:        true,

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
    ];
  },
};

export default nextConfig;
