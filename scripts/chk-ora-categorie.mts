/**
 * Verificarea regulii orei pe categorie în formularul de înscriere (19.11.2026).
 * Patronul: „trecerile de la o categorie la alta sunt toate 18:00-22:00 vineri. toate restul
 * categoriile ianfara de B, inclusiv A,C,E etc sa fie fara ora”.
 * Rulare: npx tsx scripts/chk-ora-categorie.mts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { categoryHourKind } from "../src/lib/schedule";
import { CATEGORIES } from "../src/lib/categories";
import {
  buildEnrollPayload,
  emptyEnrollValues,
  hourNotes,
  needsTheoryGroup,
  requestHourKind,
  validateEnroll,
  type EnrollValues,
} from "../src/lib/enroll";
import type { EnrollOptions } from "../src/lib/schedule";

let n = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  n++;
  console.log("ok " + name);
};

ok("felul orei pe categorie (copia din groupSchedule)", () => {
  assert.equal(categoryHourKind("B"), "sediu");
  assert.equal(categoryHourKind(""), "sediu");
  assert.equal(categoryHourKind(null), "sediu");
  for (const c of ["A1", "A2", "A", "C", "CE", "D"]) assert.equal(categoryHourKind(c), "fara", c);
  for (const c of ["B la C", "B la A", "C1 la C", "A la B"]) assert.equal(categoryHourKind(c), "vineri", c);
});

ok("fiecare categorie din catalog: B = sediu, trecere = vineri, restul = fara", () => {
  for (const c of CATEGORIES) {
    const want = c.key === "B" ? "sediu" : c.kind === "trecere" ? "vineri" : "fara";
    assert.equal(requestHourKind(c.key), want, c.key);
  }
  assert.equal(requestHourKind("B-C"), "vineri");
  assert.equal(requestHourKind("b -> a2"), "vineri");
});

const cats = (category: string, category2 = ""): Pick<EnrollValues, "category" | "category2"> => ({ category, category2 });

ok("grupa se alege doar cu B", () => {
  assert.equal(needsTheoryGroup(cats("B")), true);
  assert.equal(needsTheoryGroup(cats("C")), false);
  assert.equal(needsTheoryGroup(cats("B la C")), false);
  assert.equal(needsTheoryGroup(cats("B la A1")), false);
  assert.equal(needsTheoryGroup(cats("B", "A2")), true);
  assert.equal(needsTheoryGroup(cats("C", "A")), false);
  assert.equal(needsTheoryGroup(cats("A1 la B")), false);
});

ok("rândurile din locul grupei", () => {
  assert.deepEqual(hourNotes(cats("B")), []);
  assert.deepEqual(hourNotes(cats("C")), [{ category: "C", kind: "fara" }]);
  assert.deepEqual(hourNotes(cats("B la C")), [{ category: "B la C", kind: "vineri" }]);
  assert.deepEqual(hourNotes(cats("B", "A2")), [{ category: "A2", kind: "fara" }]);
  assert.deepEqual(hourNotes(cats("C", "B la A")), [
    { category: "C", kind: "fara" },
    { category: "B la A", kind: "vineri" },
  ]);
});

const GID = "11111111-1111-4111-8111-111111111111";
const options: EnrollOptions = {
  locations: [{ name: "Buiucani", options: [{ id: GID, dayPair: "lu-mi", slot: "17:30", language: "ro", label: "x", labelRu: "x", startDate: null }] }],
};
const filled = (category: string, category2 = "", group_id = ""): EnrollValues => ({
  ...emptyEnrollValues("ro"),
  category,
  category2,
  location: "Buiucani",
  group_id,
  slot: group_id ? "17:30" : "",
});

ok("validarea: grupa obligatorie doar cu B", () => {
  assert.equal(validateEnroll(filled("B"), options).group_id, "required");
  assert.equal(validateEnroll(filled("B", "", GID), options).group_id, undefined);
  assert.equal(validateEnroll(filled("C"), options).group_id, undefined);
  assert.equal(validateEnroll(filled("B la C"), options).group_id, undefined);
  assert.equal(validateEnroll(filled("B", "A2"), options).group_id, "required");
});

ok("payload: fără oră și grupă când nu e B", () => {
  const c = buildEnrollPayload(filled("C", "", GID));
  assert.equal(c.slot, undefined);
  assert.equal(c.group_id, undefined);
  assert.equal(c.location, "Buiucani");
  const t = buildEnrollPayload(filled("B la C", "", GID));
  assert.equal(t.slot, undefined);
  assert.equal(t.group_id, undefined);
  const b = buildEnrollPayload(filled("B", "A2", GID));
  assert.equal(b.group_id, GID);
  assert.equal(b.category2, "A2");
});

ok("textele RO și RU, fără liniuță lungă", () => {
  const src = readFileSync(new URL("../src/lib/content.ts", import.meta.url), "utf8");
  const hits = (k: string) => src.split("\n").filter((l) => l.trim().startsWith(k + ": \""));
  for (const k of ["hourNone", "hourFriday"]) {
    const lines = hits(k);
    assert.equal(lines.length, 2, k + " în ambele limbi");
    for (const l of lines) assert.ok(!/[\u2013\u2014]/.test(l), k + " fără liniuță lungă");
  }
});

// Copia trebuie să rămână la fel ca în aplicație (dacă depozitul aplicației e alături).
const crm = new URL("../../practica-glg/lib/groupSchedule.ts", import.meta.url);
let crmSrc = "";
try {
  crmSrc = readFileSync(crm, "utf8");
} catch {
  console.log("(aplicația nu e alături, comparația cu ea sare)");
}
if (crmSrc) {
  ok("copia categoryHourKind e la fel ca în aplicație", () => {
    const body = (s: string) => {
      const m = s.match(/export function categoryHourKind[\s\S]*?\n\}/);
      return (m?.[0] ?? "").replace(/\r/g, "");
    };
    const mine = readFileSync(new URL("../src/lib/schedule.ts", import.meta.url), "utf8");
    assert.ok(body(crmSrc), "funcția din aplicație");
    assert.equal(body(mine), body(crmSrc));
  });
}

console.log(`\n${n} verificări trecute`);
