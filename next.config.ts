import type { NextConfig } from "next";
import withTM from 'next-transpile-modules';

const nextConfig: NextConfig = {
  images: {
    domains: ["pvatkdnarbmmdjbihsmg.supabase.co"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  /* config options here */
};

export default withTM(['react-icons'])(nextConfig);
