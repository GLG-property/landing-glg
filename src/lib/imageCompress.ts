/**
 * Pregătirea pozelor de buletin pe client (browser), înainte de trimitere:
 * imaginile se micșorează cu canvas la max MAX_SIDE px pe latura mare și se
 * re-encodează JPEG, scăzând calitatea până intră sub MAX_BYTES. PDF-urile
 * trec neschimbate (doar cu limita de mărime).
 *
 * Rezultatul e un data URL (`data:image/jpeg;base64,...`): servește direct
 * ca previzualizare în <img> și ca payload pentru API (care taie prefixul).
 */

export const MAX_SIDE = 1600;
/** Ținta pe client; aplicația refuză peste 2 MB decodat. */
export const MAX_BYTES = 1.5 * 1024 * 1024;
/** PDF-urile nu se pot comprima aici: limita aplicației, strict. */
export const MAX_PDF_BYTES = 2 * 1024 * 1024;

export type PreparedPhoto = { dataUrl: string; kind: "image" | "pdf"; name: string };
export type PrepareError = "fileType" | "fileTooBig";

const ACCEPTED_IMAGE = /^image\//;

/** Octeții unui data URL base64 (lungimea payload-ului x 3/4). */
export function dataUrlBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(",");
  const len = comma >= 0 ? dataUrl.length - comma - 1 : dataUrl.length;
  return Math.floor((len * 3) / 4);
}

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

/** Decodează imaginea (cu orientarea EXIF aplicată, unde browserul o suportă). */
async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* HEIC pe unele browsere, sau opțiunea nesuportată: cădem pe <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("decode"));
      img.src = url;
    });
    return img;
  } finally {
    // src-ul e deja decodat; eliberăm obiectul după ce imaginea e desenată
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

/**
 * Pregătește fișierul ales: imagine => JPEG micșorat; PDF => neschimbat.
 * Întoarce un cod de eroare (nu aruncă) pentru tip nepermis / prea mare.
 */
export async function preparePhoto(file: File): Promise<PreparedPhoto | { error: PrepareError }> {
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  if (isPdf) {
    if (file.size > MAX_PDF_BYTES) return { error: "fileTooBig" };
    return { dataUrl: await readAsDataUrl(file), kind: "pdf", name: file.name };
  }
  if (!ACCEPTED_IMAGE.test(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
    return { error: "fileType" };
  }

  let source: ImageBitmap | HTMLImageElement;
  try {
    source = await decode(file);
  } catch {
    return { error: "fileType" };
  }
  const sw = "naturalWidth" in source ? source.naturalWidth : source.width;
  const sh = "naturalHeight" in source ? source.naturalHeight : source.height;
  if (!sw || !sh) return { error: "fileType" };

  const scale = Math.min(1, MAX_SIDE / Math.max(sw, sh));
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { error: "fileType" };
  // fundal alb: PNG-urile cu transparență nu devin negre în JPEG
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(source, 0, 0, w, h);
  if ("close" in source) source.close();

  // Calitate descrescătoare până intră sub limită (0.8 e de obicei suficient).
  for (const q of [0.8, 0.7, 0.6, 0.5, 0.4]) {
    const dataUrl = canvas.toDataURL("image/jpeg", q);
    if (dataUrlBytes(dataUrl) <= MAX_BYTES) return { dataUrl, kind: "image", name: file.name };
  }
  return { error: "fileTooBig" };
}
