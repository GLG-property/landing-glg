/**
 * Proxy same-origin: opțiunile publice ale formularului (grupele deschise pe
 * sedii) din aplicația internă. Fără cache (modificările adminului se văd imediat).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM = (process.env.ENROLL_UPSTREAM ?? "http://app:3000/api/inscriere").replace(/\/$/, "") + "/optiuni";

export async function GET(): Promise<Response> {
  try {
    const r = await fetch(UPSTREAM, { cache: "no-store" });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return new Response(JSON.stringify({ locations: [] }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
