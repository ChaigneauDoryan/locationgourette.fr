import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["pvatkdnarbmmdjbihsmg.supabase.co"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  reactStrictMode: false
};

export default nextConfig;
