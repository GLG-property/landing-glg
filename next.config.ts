import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production server (.next/standalone) — required by the
  // Docker image (see Dockerfile), which runs `node server.js` without the
  // full node_modules tree.
  output: "standalone",
  // Pin the workspace root to this project (a stray lockfile exists in the home dir).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
