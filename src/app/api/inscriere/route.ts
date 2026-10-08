/**
 * Proxy same-origin pentru formularul de înscriere.
 *
 * Motiv: browser-ul postează la /api/inscriere (aceeași origine ca landing-ul),
 * iar acest handler forwardează cererea, PE SERVER, către aplicația internă.
 * Astfel domeniul aplicației (app.scoalaautoglg.com) nu mai apare nicăieri în
 * bundle-ul public, iar submit-ul nu mai e o cerere cross-origin.
 *
 * Upstream-ul e adresa INTERNĂ din rețeaua Docker (`http://app:3000/...`),
 * nu trece prin Cloudflare. Pasăm IP-ul real al vizitatorului în
 * `x-forwarded-for`: aplicația citește întâi `cf-connecting-ip` (absent pe
 * legătura internă) și cade pe `x-forwarded-for`, deci limitarea de rată
 * per-IP rămâne corectă.
 */

export const runtime = "nodejs";

const UPSTREAM =
  process.env.ENROLL_UPSTREAM ?? "http://app:3000/api/inscriere";

function clientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "";
}

export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const ip = clientIp(req);

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ip ? { "x-forwarded-for": ip } : {}),
      },
      body,
    });
    // Retransmitem verbatim statusul și corpul JSON al aplicației, ca
    // interpretarea din formular (ok / duplicate / invalid / rate limit) să
    // rămână neschimbată.
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // Aplicația nu răspunde: eroare generică, formularul oferă telefonul.
    return new Response(JSON.stringify({ ok: false, error: "error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
