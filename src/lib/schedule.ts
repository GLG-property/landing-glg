/**
 * Sediile și tipurile de opțiuni ale formularului. OPȚIUNILE REALE (zile + oră
 * + limbă) sunt grupele DESCHISE de școală și vin din aplicație
 * (GET /api/inscriere/optiuni, proxy intern) — vezi src/lib/enroll.ts.
 * Copie a părții publice din practica-glg/lib/groupSchedule.ts.
 */
export type StudyLang = "ro" | "ru";

export const LOCATION_NAMES = ["Buiucani", "Botanica", "Strășeni", "Vorniceni"] as const;

/** O grupă deschisă, cum o vede publicul (fără cabinet). */
export interface GroupOption {
  id: string;
  dayPair: string;
  slot: string;
  language: StudyLang;
  label: string;
  labelRu: string;
  startDate: string | null;
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
