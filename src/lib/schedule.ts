/**
 * Sediile și tipurile de opțiuni ale formularului. OPȚIUNILE REALE (zile + oră
 * + limbă) sunt grupele DESCHISE de școală și vin din aplicație
 * (GET /api/inscriere/optiuni, proxy intern) — vezi src/lib/enroll.ts.
 * Copie a părții publice din practica-glg/lib/groupSchedule.ts.
 */
export type StudyLang = "ro" | "ru";

export const LOCATION_NAMES = ["Buiucani", "Botanica", "Strășeni", "Vorniceni"] as const;

/**
 * Gradul de umplere al grupei (capacitate 30 RO / 15 RU): verde = mai sunt
 * locuri (< 80 %), galben = aproape plină (≥ 80 %), roșu = plină (nu se poate alege).
 */
export type GroupFill = "verde" | "galben" | "rosu";

/** O grupă deschisă, cum o vede publicul (fără cabinet). */
export interface GroupOption {
  id: string;
  dayPair: string;
  slot: string;
  language: StudyLang;
  label: string;
  labelRu: string;
  startDate: string | null;
  /**
   * Umplerea, fără cifre (lipsă = tratată ca „verde”): verde = sunt locuri,
   * galben = aproape finisată, roșu = ultimele locuri disponibile. Numărul de
   * locuri rămase NU se expune public.
   */
  fill?: GroupFill;
}
export interface LocationOptions {
  name: string;
  options: GroupOption[];
}
export interface EnrollOptions {
  locations: LocationOptions[];
}

export function optionsFor(all: EnrollOptions | null, location: string, lang: StudyLang): GroupOption[] {
  const loc = all?.locations.find((l) => l.name === location);
  return (loc?.options ?? []).filter((o) => o.language === lang);
}

/** Umplerea unei opțiuni (API-ul vechi, fără câmp, înseamnă „mai sunt locuri”). */
export function fillOf(o: GroupOption): GroupFill {
  return o.fill ?? "verde";
}

/**
 * Orice grupă primită de la API se poate alege: cele pline nu mai sunt
 * trimise, iar roșu înseamnă acum „ultimele locuri disponibile”, nu „plină”.
 */
export function isSelectable(o: GroupOption): boolean {
  void o;
  return true;
}
