/**
 * Proxy same-origin: opțiunile publice ale formularului (grupele deschise pe
 * sedii) din aplicația internă. Cache 60 s.
 */
export const runtime = "nodejs";
export const revalidate = 60;

const UPSTREAM = (process.env.ENROLL_UPSTREAM ?? "http://app:3000/api/inscriere").replace(/\/$/, "") + "/optiuni";

export async function GET(): Promise<Response> {
  try {
    const r = await fetch(UPSTREAM, { next: { revalidate: 60 } });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" } });
  } catch {
    return new Response(JSON.stringify({ locations: [] }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
