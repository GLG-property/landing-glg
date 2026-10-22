/**
 * Proxy same-origin: contractul de studii GOL (PDF, fără date personale) din
 * aplicația internă, pe care solicitantul îl citește înainte de a bifa
 * „Am citit și sunt de acord" în formularul de înscriere.
 *
 * Documentul e identic pentru toată lumea, deci poate sta în cache (o oră),
 * inclusiv la Cloudflare.
 */
export const runtime = "nodejs";

const UPSTREAM = (process.env.ENROLL_UPSTREAM ?? "http://app:3000/api/inscriere").replace(/\/$/, "") + "/contract";

export async function GET(): Promise<Response> {
  try {
    const r = await fetch(UPSTREAM, { next: { revalidate: 3600 } });
    if (!r.ok) return new Response("Contractul nu este disponibil momentan.", { status: 502 });
    const bytes = await r.arrayBuffer();
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="contract-studii-glg.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Contractul nu este disponibil momentan.", { status: 502 });
  }
}
