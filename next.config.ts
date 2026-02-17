import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/newbiware",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
