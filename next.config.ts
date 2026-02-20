import type { NextConfig } from "next";

// GitHub Pages: 저장소 이름 서브경로 (예: username.github.io/newbiware/)
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubPages && repoName ? `/${repoName}` : "";
const assetPrefix = isGitHubPages && repoName ? `/${repoName}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath && { basePath, assetPrefix }),
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
