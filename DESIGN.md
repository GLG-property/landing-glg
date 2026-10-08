# DESIGN.md, sistemul de design al landing-ului GLG

Regulile de mai jos sunt obligatorii pentru orice sectiune. Cand ai dubii, alege varianta mai simpla si mai discreta. Interzis: em-dash si en-dash oriunde (copy sau cod), folositi virgula, punct sau cratima simpla.

## Paleta
- Fundal: alb pur `#ffffff` (bg-white) sau `surface` `#f5f6f8` pentru benzi alternative.
- Text principal: `ink` `#0a0e17`. Text secundar: `muted` `#5a626f`. Text tertiar: `faint` `#8b93a2`.
- Linii si borduri: `line` `#e8eaf0`, intotdeauna 1px.
- Accent UNIC: `brand` `#1d6bff` (hover `brand-600`). Folosit rar: butonul primar, link-uri, punctul din titlu, un detaliu pe sectiune, atat. Fara gradiente, fara fundaluri albastre mari, fara al doilea accent.
- `brand-50` este permis doar ca fundal discret pentru un badge sau o pictograma, maxim o data pe sectiune.

## Tipografie
- Font: Onest (deja configurat, `--font-sans`).
- H1 (doar hero): clasa `.display` (semibold, tracking -0.02em, line-height 1.1), marime max `text-5xl` pe desktop.
- H2 (titlu de sectiune): folositi componenta `SectionHeading`. Randare: `text-3xl sm:text-4xl font-semibold tracking-tight`. Nu creati titluri de sectiune manual.
- Eyebrow: componenta `Eyebrow`, adica `text-[11px] font-semibold uppercase tracking-[0.14em] text-muted`. Fara pill, fara border, fara iconita.
- H3 (titlu de card): `text-lg font-semibold tracking-tight` sau `text-base font-semibold`.
- Body: `text-base text-muted` sau `text-sm text-muted`. Fara text mai mare de `text-lg` in paragrafe.
- Cifre mari decorative (numerale gigantice) sunt interzise.

## Spatiere
- Padding vertical de sectiune: `py-14 sm:py-20`. Nu `py-20 sm:py-28`.
- Container: componenta `Container` (max-w 1440px, px responsive). Nu redefiniti containerul.
- Gap intre carduri: `gap-4` sau `gap-5`. Gap intre eyebrow, titlu, subtitlu: gestionat de `SectionHeading`.

## Borduri, raze, umbre
- Bordura standard: `border border-line` (1px, hairline). Niciodata 2px, niciodata borduri colorate permanente.
- Raza maxima: 12px. Carduri: `.card` sau `rounded-xl` (12px). Butoane si inputuri: `rounded-[10px]`. Fara `rounded-2xl`, `rounded-3xl`, fara `rounded-full` in afara de avatare si dot-uri de status.
- Umbre: doar cele integrate in clasele 3D de mai jos si `shadow-soft` pe nav-ul sticky. Nimic altceva. `shadow-card` si `shadow-pop` nu mai exista, stergeti orice utilizare.
- Sistem 3D (decizia patronului), singurele locuri cu gradiente si umbre:
  - `.btn-3d` (butoane brand: gradient deschis sus spre inchis jos, bordura brand-700) si `.btn-3d-light` (butoane albe: alb spre surface).
  - `.card` (TOATE cardurile): alb spalacit, gradient alb -> #f1f3f6, muchie luminoasa sus, umbra abia vizibila. NU mai creati carduri manual cu `rounded-xl border border-line bg-white` — folositi `.card` (+ utilitare de padding/radius peste el).
  - `.input-3d` (inputuri/selecturi): usor scufumdate (umbra interioara), alb curat la focus.
  - `.chip-3d` (iconitele-patrat din interiorul cardurilor): acelasi relief ca `.btn-3d-light`, dar fara stari de hover, fiind decorative. Cele interactive (socials) folosesc `.btn-3d-light`.

## Hover si motion
- Hover permis: schimbare de culoare, de bordura sau de opacitate, `transition-colors duration-200` (150-200ms).
- Interzis la hover: scale, translate, rotate, borduri animate, shine, wiggle, umbre care apar. `active:scale-*` este interzis.
- Reveal la scroll: componenta `Reveal` (fade-up 0.4s, 8px). Pentru liste: `<Reveal stagger>` (pas de 60ms intre copii). Nu adaugati alte animatii de intrare.
- `animate-rise` exista doar pentru hero (fade-up 0.4s). `animate-pop`, `animate-float`, `btn-shine`, `border-animated`, `gift-wiggle`, `pattern-wheel` NU mai exista, stergeti orice utilizare din componente.

## Iconografie
- Doar lucide-react, `strokeWidth={1.5}`, marime 16-20px (`size-4` sau `size-5`), monocrom: `text-ink` sau `text-muted`, rar `text-brand`.
- Iconitele au rol functional (marcheaza un item), nu decorativ. Interzise: Sparkles, Gift, emoji, iconite animate, iconite in cercuri cu gradient.
- Container de iconita permis: patrat `size-9 rounded-[10px] border border-line` sau `bg-surface`, fara umbra.

## Componente partajate (src/components/primitives.tsx)
- `Container`: wrapper de latime, folositi-l in fiecare sectiune.
- `Eyebrow`: eticheta mica uppercase.
- `SectionHeading`: eyebrow + titlu + subtitlu, props: `eyebrow`, `title`, `accent`, `subtitle`, `align` ("left" implicit sau "center"). Adauga singur punctul albastru final.
- `Button`: variante `primary` (`.btn-3d`), `secondary` (`.btn-3d-light`), `ghost` (text brand). Prop `withArrow` pentru sageata statica (fara translate la hover).
- `BlockButton`: CTA full-width `.btn-3d` pentru carduri de pret, sageata statica.
- `Reveal`: reveal la scroll, props `stagger`, `delay`, `as`.

## Clase utilitare care EXISTA dupa acest pas (globals.css)
- `.display`, `.dot`, `.card`, `.grid-lines` (grila blueprint foarte discreta, doar in hero), `.fade-x`, `.no-scrollbar`, `.animate-rise`, `shadow-soft` (doar nav sticky), `.reveal` / `.reveal-group` / `.is-visible` (interne, folosite de `Reveal`).
- Orice alta clasa custom din vechiul CSS a fost stearsa. Nu adaugati clase noi in globals.css fara acordul design-system agent.
