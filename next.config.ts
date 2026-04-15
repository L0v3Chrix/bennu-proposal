import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/onboard/bennu-coffee",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/pitch-deck", destination: "/index.html" },
      { source: "/community", destination: "/community.html" },
    ];
  },
};

export default nextConfig;
