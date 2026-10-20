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
  // Fără antetul X-Powered-By (nu ajută la nimic, doar dezvăluie stack-ul).
  poweredByHeader: false,
  images: {
    // Imaginile din /public nu se schimbă între build-uri; cache lung pentru
    // variantele optimizate (30 de zile), mai puține re-encodări pe server.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Analiza site-ului (Umami, pe același server): scriptul și evenimentele
  // trec prin site (/u/*) către containerul intern — fără domeniu public nou
  // și fără cereri către servicii terțe. Destinația e fixată la build
  // (standalone inlinează config-ul), de aceea numele serviciului Docker.
  async rewrites() {
    const upstream = process.env.UMAMI_UPSTREAM ?? "http://umami:3000";
    return [
      { source: "/u/script.js", destination: `${upstream}/script.js` },
      { source: "/u/api/send", destination: `${upstream}/api/send` },
    ];
  },
};

export default nextConfig;
