import type { Post } from "../types";

export const post: Post = {
  slug: "condusul-iarna-in-moldova",
  category: "sfaturi",
  tags: ["iarnă", "anvelope", "polei", "siguranță"],
  publishedAt: "2026-10-06",
  updatedAt: "2026-10-15",
  related: [
    "ce-faci-dupa-ce-iei-permisul-sofer-incepator",
    "amenzi-si-puncte-de-penalizare-moldova",
    "mecanica-sau-automata-ce-alegi",
  ],
  ro: {
    title: "Condusul iarna în Moldova: anvelope, polei, ceață și ce faci când mașina derapează",
    seoTitle: "Condusul iarna în Moldova: ghid pentru șoferi",
    description:
      "Ce spune legea despre anvelopele de iarnă în Republica Moldova, cum pregătești mașina, cum conduci pe polei și în ceață și ce faci dacă derapezi. Sfaturi practice de la instructori.",
    intro: [
      "Prima iarnă la volan este, pentru majoritatea șoferilor noi, cel mai greu test de după examen. Drumurile din Moldova au porțiuni neacoperite de sare, ceața de pe traseele naționale apare brusc, iar poleiul de dimineață nu se vede. Vestea bună: cele mai multe situații periculoase se pot evita cu o mașină pregătită și câteva reguli simple.",
      "Iată ghidul pe care instructorii noștri îl repetă în fiecare noiembrie, inclusiv ce prevede legea despre anvelope.",
    ],
    sections: [
      {
        id: "anvelope",
        title: "Anvelopele de iarnă: ce spune legea",
        blocks: [
          {
            type: "p",
            text: "În Republica Moldova, Regulamentul circulației rutiere nu mai leagă obligația anvelopelor de iarnă de un interval calendaristic fix (vechea regulă „1 decembrie - 1 martie” nu mai este în vigoare). Obligația depinde de condițiile de drum: dacă circuli pe drumuri acoperite cu zăpadă, gheață sau polei, mașina trebuie echipată cu anvelope de iarnă, indiferent de lună. Nerespectarea se sancționează cu amendă.",
          },
          {
            type: "p",
            text: "Practic, asta înseamnă să montezi anvelopele de iarnă înainte de prima ninsoare, nu după. Regula de bun-simț: când temperatura medie zilnică scade constant sub 7 °C, cauciucul de vară se întărește și pierde aderență chiar și pe asfalt uscat. Verifică și adâncimea profilului: sub 4 mm, anvelopa de iarnă nu mai evacuează zăpada eficient.",
          },
          {
            type: "note",
            text: "Textul exact al obligației și sancțiunea se găsesc în Regulamentul circulației rutiere (HG 357/2009) și în Codul contravențional. Pentru forma actualizată, consultă legis.md sau întreabă la școală.",
          },
        ],
      },
      {
        id: "pregatirea-masinii",
        title: "Pregătirea mașinii înainte de iarnă",
        blocks: [
          {
            type: "ul",
            items: [
              "**Bateria**: la frig, o baterie slăbită nu mai pornește motorul. Verifică tensiunea la service înainte de noiembrie.",
              "**Lichidul de parbriz** pentru iarnă (cu antigel), ștergătoare în stare bună și un răzuitor în portbagaj.",
              "**Antigelul** din sistemul de răcire, la concentrația recomandată.",
              "**Luminile**: curăță farurile și verifică becurile; iarna conduci mai mult pe întuneric.",
              "**Trusa de iarnă**: cabluri de pornire, o pătură, lanternă, mănuși, puțin nisip sau un covoraș pentru deblocare.",
              "**Rezervorul** cel puțin pe jumătate plin, ca să nu rămâi fără căldură într-un ambuteiaj pe traseu.",
            ],
          },
        ],
      },
      {
        id: "polei",
        title: "Cum conduci pe polei și zăpadă",
        blocks: [
          {
            type: "ol",
            items: [
              "**Totul mai lent și mai lin.** Accelerezi ușor, frânezi devreme și progresiv, virezi cu mișcări mici. Pe gheață, orice comandă bruscă rupe aderența.",
              "**Distanța de siguranță de 3-4 ori mai mare.** Distanța de frânare pe gheață poate fi de până la zece ori mai lungă decât pe asfalt uscat.",
              "**Pornirea de pe loc** pe mecanică: treapta a doua și ambreiaj eliberat lent; pe automată, folosește modul „iarnă” sau „snow” dacă există.",
              "**Frâna de motor** la coborâri: treaptă inferioară, nu frână continuă.",
              "**Atenție la poduri, pasaje și porțiuni umbrite**: îngheață primele și se dezgheață ultimele.",
              "**Nu dezactiva ESP/ABS.** Sistemele moderne te ajută; lasă-le pornite și nu „pompa” frâna cu ABS, apasă ferm și ține.",
            ],
          },
        ],
      },
      {
        id: "derapaj",
        title: "Ce faci dacă mașina derapează",
        blocks: [
          {
            type: "p",
            text: "La o mașină cu tracțiune față (majoritatea autoturismelor din Moldova), derapajul tipic este subvirarea: virezi, dar mașina continuă drept. Soluția: ridică ușor piciorul de pe accelerație, nu frâna brusc, redu puțin unghiul de virare ca roțile să recapete aderență, apoi virează din nou lin. Dacă spatele mașinii „fuge” (supravirare), privește și virează în direcția în care vrei să mergi, cu mișcări mici, fără să frânezi.",
          },
          {
            type: "p",
            text: "Regula de aur: privește unde vrei să ajungi, nu obstacolul. Mâinile urmează ochii. Toate acestea se învață cel mai bine într-o parcare goală, ninsă, cu un instructor lângă tine, nu pe traseu.",
          },
        ],
      },
      {
        id: "ceata",
        title: "Ceața și vizibilitatea redusă",
        blocks: [
          {
            type: "p",
            text: "Pe traseele naționale (M1, M2, drumurile spre Hâncești, Orhei, Ungheni), ceața apare frecvent toamna și iarna, uneori pe porțiuni de câteva sute de metri. Poliția recomandă constant aceleași lucruri: lumini de întâlnire aprinse și ziua, proiectoare de ceață dacă le ai, viteză adaptată distanței pe care o vezi efectiv, distanță mai mare față de vehiculul din față, fără depășiri. Nu folosi faza lungă în ceață: lumina se reflectă și vezi mai puțin.",
          },
        ],
      },
      {
        id: "incepatori",
        title: "Dacă ești la prima iarnă cu permis",
        blocks: [
          {
            type: "p",
            text: "Ieși la drum devreme, când traficul e mai liniștit, și evită traseele lungi pe vreme rea în primele luni. Dacă ai luat permisul vara, cere-ne o lecție suplimentară de iarnă: o oră într-o parcare acoperită de zăpadă, cu un instructor, face mai mult decât orice articol. Citește și [ce te așteaptă în perioada de început](/blog/ce-faci-dupa-ce-iei-permisul-sofer-incepator).",
          },
          {
            type: "p",
            text: "Încă nu ai permis? Iarna este un moment bun să te înscrii: termini teoria în lunile reci și faci practica în trafic real, inclusiv pe vreme mai dificilă, ceea ce te pregătește cu adevărat. [Înscrie-te online la GLG Property](/inscriere).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Anvelopele de iarnă sunt obligatorii de la 1 decembrie în Moldova?",
        a: "Nu există un interval calendaristic fix. Obligația se aplică atunci când circuli pe drumuri acoperite cu zăpadă, gheață sau polei, indiferent de lună. Verifică textul actual al Regulamentului pe legis.md.",
      },
      {
        q: "Pot folosi anvelope „all-season” iarna?",
        a: "Depinde de marcaj: anvelopele cu simbolul fulgului de zăpadă în munte (3PMSF) sunt considerate de iarnă. Cele doar cu marcajul M+S oferă mai puțină aderență pe gheață. Verifică cerințele legale actuale.",
      },
      {
        q: "Ce fac dacă rămân blocat în zăpadă?",
        a: "Nu accelera puternic, roțile se îngroapă. Curăță zăpada din fața roților, pune nisip sau un covoraș sub roata motoare și pornește lin, eventual cu mișcări înainte-înapoi.",
      },
    ],
  },
  ru: {
    title: "Вождение зимой в Молдове: шины, гололёд, туман и что делать при заносе",
    seoTitle: "Вождение зимой в Молдове: гид для водителей",
    description:
      "Что говорит закон о зимних шинах в Молдове, как подготовить автомобиль, как ехать по гололёду и в тумане и что делать при заносе. Практические советы инструкторов.",
    intro: [
      "Первая зима за рулём для большинства новичков самый сложный экзамен после ASP. Дороги Молдовы не везде посыпаны, туман на трассах появляется внезапно, утренний гололёд не виден. Хорошая новость: большинство опасных ситуаций можно избежать с подготовленной машиной и несколькими простыми правилами.",
    ],
    sections: [
      {
        id: "anvelope",
        title: "Зимние шины: что говорит закон",
        blocks: [
          {
            type: "p",
            text: "Правила дорожного движения Молдовы больше не привязывают зимние шины к датам (старое правило «1 декабря - 1 марта» не действует). Обязанность зависит от условий: на дорогах, покрытых снегом, льдом или гололёдом, автомобиль должен быть на зимних шинах в любой месяц. За нарушение штраф. Практический вывод: переобувайтесь до первого снега, когда средняя температура стабильно ниже 7 °C.",
          },
          {
            type: "note",
            text: "Точный текст в Правилах дорожного движения (HG 357/2009) и Кодексе о правонарушениях; актуальная редакция на legis.md.",
          },
        ],
      },
      {
        id: "pregatirea-masinii",
        title: "Подготовка автомобиля",
        blocks: [
          {
            type: "ul",
            items: [
              "Аккумулятор: проверьте перед ноябрём.",
              "Зимняя омывайка, исправные дворники, скребок.",
              "Антифриз нужной концентрации.",
              "Чистые фары, рабочие лампы.",
              "Провода для прикуривания, плед, фонарь, перчатки, песок.",
              "Бак не меньше чем наполовину.",
            ],
          },
        ],
      },
      {
        id: "polei",
        title: "Гололёд и снег",
        blocks: [
          {
            type: "ol",
            items: [
              "Всё медленнее и плавнее: газ, тормоз, руль. Резкие команды срывают сцепление.",
              "Дистанция в 3-4 раза больше: тормозной путь на льду до десяти раз длиннее.",
              "Старт со второй передачи на механике, режим «snow» на автомате.",
              "Торможение двигателем на спусках.",
              "Осторожно на мостах, эстакадах и в тени: замерзают первыми.",
              "Не отключайте ESP/ABS; с ABS тормозите твёрдо и держите педаль.",
            ],
          },
        ],
      },
      {
        id: "derapaj",
        title: "Если машину занесло",
        blocks: [
          {
            type: "p",
            text: "У переднеприводной машины типичный снос: руль повёрнут, машина едет прямо. Плавно отпустите газ, не тормозите резко, чуть уменьшите угол поворота, затем снова плавно поверните. Если «уходит» задняя ось, смотрите и поворачивайте руль туда, куда хотите ехать, без торможения. Золотое правило: смотрите туда, куда хотите попасть, а не на препятствие.",
          },
        ],
      },
      {
        id: "ceata",
        title: "Туман",
        blocks: [
          {
            type: "p",
            text: "На трассах (M1, M2, дороги на Хынчешты, Орхей, Унгены) туман частый гость. Рекомендации полиции неизменны: ближний свет и днём, противотуманки, скорость по видимости, большая дистанция, без обгонов. Дальний свет в тумане только мешает.",
          },
        ],
      },
      {
        id: "incepatori",
        title: "Если это первая зима с правами",
        blocks: [
          {
            type: "p",
            text: "Выезжайте пораньше, когда трафик спокойнее, избегайте дальних поездок в плохую погоду. Если права получены летом, попросите у нас дополнительное зимнее занятие на заснеженной парковке. Ещё нет прав? Зима хорошее время записаться: теория в холодные месяцы, практика в реальных условиях. [Запишитесь онлайн](/inscriere).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Зимние шины обязательны с 1 декабря?",
        a: "Фиксированных дат нет. Обязанность действует на дорогах со снегом, льдом или гололёдом в любой месяц.",
      },
      {
        q: "Что делать, если застрял в снегу?",
        a: "Не газуйте резко. Уберите снег перед колёсами, подложите песок или коврик под ведущее колесо и трогайтесь плавно.",
      },
    ],
  },
};
