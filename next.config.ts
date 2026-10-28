import type { NextConfig } from "next";

/**
 * Content-Security-Policy — croit pe ce folosește EFECTIV site-ul.
 *
 * Note despre alegerile care par permisive, dar nu pot fi strânse mai mult
 * fără modificări în `src/`:
 *
 *  • `script-src 'unsafe-inline'` — Next (App Router) injectează inline
 *    `<script>self.__next_f.push(...)</script>` pentru streaming-ul RSC, iar
 *    `src/app/layout.tsx` are propriul script inline (comutatorul `.js`).
 *    Alternativa curată e un nonce per cerere, dar asta cere un
 *    `src/middleware.ts` — fișier din zona interzisă acestui agent.
 *    ATENȚIE: dacă se adaugă vreodată un nonce sau un hash, browserul IGNORĂ
 *    `'unsafe-inline'` (CSP nivel 2+) și scripturile inline ale lui Next cad.
 *
 *  • `style-src 'unsafe-inline'` — Tailwind v4 + Next pun CSS inline, iar
 *    componentele folosesc `style={{ animationDelay: ... }}` (atribute style).
 *
 *  • fonts.googleapis.com / fonts.gstatic.com — `next/font/google` descarcă
 *    fontul Onest la BUILD și îl servește din `/_next/static/media`, deci în
 *    producție nu se cere nimic de la Google. Gazdele rămân permise ca plasă
 *    de siguranță (dacă se adaugă un `<link>` clasic, nu cade pagina).
 *
 *  • `frame-src` www.google.com — harta din `src/components/Contact.tsx`
 *    (`https://www.google.com/maps?...&output=embed`), încărcată DOAR după
 *    consimțământ. `maps.google.com` e inclus pentru variantele de URL.
 *
 *  • `img-src data: blob:` — formularul de înscriere comprimă pozele
 *    buletinului cu canvas (`src/lib/imageCompress.ts` → `toDataURL`) și le
 *    previzualizează; fără `data:`/`blob:` previzualizarea ar fi goală.
 *
 *  • `connect-src` — Umami (`/u/api/send`) și proxy-ul de înscriere
 *    (`/api/inscriere`) sunt pe ACELAȘI domeniu (rewrite-urile de mai jos),
 *    deci `'self'` acoperă tot ce trimite codul nostru.
 *
 *  • static.cloudflareinsights.com — Cloudflare injectează SINGUR, la margine,
 *    scriptul „Web Analytics” (`beacon.min.js`) în HTML-ul servit; nu există
 *    în codul nostru. Fără gazda asta în `script-src`/`connect-src`, CSP-ul îl
 *    blochează și consola fiecărei pagini arată o violare (verificat live).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self' https://static.cloudflareinsights.com https://cloudflareinsights.com",
  "frame-src https://www.google.com https://maps.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Permisiuni pentru interfețele browserului. `camera=(self)` e OBLIGATORIU:
 * formularul de înscriere fotografiază buletinul direct din telefon
 * (`<input type="file" capture>`). Restul sunt închise — site-ul nu le cere.
 */
const permissionsPolicy = [
  "camera=(self)",
  "microphone=()",
  "geolocation=()",
  "payment=()",
  "usb=()",
  "magnetometer=()",
  "gyroscope=()",
  "accelerometer=()",
  "midi=()",
  "serial=()",
  "bluetooth=()",
  "display-capture=()",
  "fullscreen=(self)",
].join(", ");

const securityHeaders = [
  // HSTS: browserul refuză http pentru 2 ani. Cloudflare termină TLS-ul și
  // trimite antetul mai departe neatins (verificat cu `curl -sI`).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Dublează `frame-ancestors` din CSP pentru browserele/scanerele vechi.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  // Izolează fereastra de paginile care deschid site-ul prin `window.open`
  // (unsafe-none ar lăsa `window.opener` accesibil). `same-origin-allow-popups`
  // păstrează funcționale ferestrele de partajare socială.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // `same-site` în loc de `same-origin`: harta Google trebuie să poată fi
  // încadrată, iar `same-origin` ar bloca resursele cross-origin legitime.
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: csp },
];

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
  // Comprimare gzip/br la origine. Cloudflare recomprimă oricum la margine,
  // dar antetul contează când se testează direct containerul (127.0.0.1:3001).
  compress: true,
  images: {
    // AVIF/WebP pentru `next/image`: ~30-50% mai puțini octeți decât JPEG la
    // aceeași calitate percepută. Ordinea contează — Next alege primul format
    // acceptat de browser, deci AVIF (mai mic) înaintea WebP.
    formats: ["image/avif", "image/webp"],
    // Imaginile din /public nu se schimbă între build-uri; cache lung pentru
    // variantele optimizate (30 de zile), mai puține re-encodări pe server.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      // Anteturile de securitate pe TOT site-ul, inclusiv /api și /u.
      { source: "/:path*", headers: securityHeaders },
      // Fișierele din /public sunt imuabile în practică (se schimbă doar la
      // redeploy, iar numele rămâne același) — dar le ținem la 7 zile cu
      // `stale-while-revalidate`, ca o poză înlocuită să intre în maxim o zi.
      {
        source: "/:file*.(jpg|jpeg|png|svg|webp|avif|mp4|woff2|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // www → apex (un singur domeniu canonic; altfel Google vede conținut
      // duplicat, iar auditurile raportează „fără redirect canonic”).
      // `host` se potrivește pe antetul Host, pe care tunelul Cloudflare îl
      // trimite neschimbat.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.scoalaautoglg.com" }],
        destination: "https://scoalaautoglg.com/:path*",
        permanent: true,
      },
      // http → https. Cloudflare pune `X-Forwarded-Proto: http` când clientul
      // a venit pe http; pe https antetul e `https`, deci regula NU se
      // declanșează și nu există buclă de redirectare.
      // Aceasta e doar plasa de siguranță la origine — comutatorul corect e
      // „Always Use HTTPS” în panoul Cloudflare (vezi raportul).
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://scoalaautoglg.com/:path*",
        permanent: true,
      },
    ];
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
