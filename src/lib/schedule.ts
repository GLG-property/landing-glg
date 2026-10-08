export type StudyLang = "ro" | "ru";
export interface Slot { key: string; hour: string; saturday: boolean; langs: readonly StudyLang[] }
export interface LocationSchedule { name: string; slots: readonly Slot[] }
const RO: readonly StudyLang[] = ["ro"];
const RO_RU: readonly StudyLang[] = ["ro", "ru"];
function week(hour: string, langs: readonly StudyLang[] = RO): Slot { return { key: hour, hour, saturday: false, langs }; }
function sat(hour: string): Slot { return { key: "sa-" + hour, hour, saturday: true, langs: RO }; }
export const LOCATION_SCHEDULES: readonly LocationSchedule[] = [
  { name: "Buiucani", slots: [week("09:30"), week("16:00"), week("17:30", RO_RU), week("19:00", RO_RU), sat("09:00")] },
  { name: "Botanica", slots: [week("09:30"), week("16:00"), week("17:30"), week("19:00"), sat("09:00")] },
  { name: "Strășeni", slots: [week("15:00")] },
  { name: "Vorniceni", slots: [week("17:00")] },
];
export function scheduleForLocation(name: string): LocationSchedule | null { return LOCATION_SCHEDULES.find((l) => l.name === name) ?? null; }
export function slotsFor(name: string, lang: StudyLang): Slot[] { return (scheduleForLocation(name)?.slots ?? []).filter((s) => s.langs.includes(lang)); }
