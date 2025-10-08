import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for subdomain deployment
  trailingSlash: true,
  images: {
    unoptimized: true // Disable image optimization for static export
  }
};

export default nextConfig;
