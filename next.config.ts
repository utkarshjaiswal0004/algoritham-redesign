import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Silences Next 16's "detected multiple lockfiles" warning by pinning the
// workspace root explicitly to this project directory.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },

  images: {
    remotePatterns: [
      // Sanity CDN — image assets served via @sanity/image-url
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  // Fewer identical work re-triggers in production builds
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
