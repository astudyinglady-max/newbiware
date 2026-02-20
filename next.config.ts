import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // GitHub Pages: 빌드 결과를 ./out 에 출력
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
