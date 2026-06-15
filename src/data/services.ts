import type { Service } from '../types';

type ServiceItem = {
  title: string;
  lawArea: string;
};

const categoryClient = 'Usługi dla klientów';
const categoryProceedings = 'Pisma w toczącym się postępowaniu lub procesie';
const categoryAdditional = 'Usługi dodatkowe';

const clientServices: ServiceItem[] = [
  { title: 'Pismo do urzędu', lawArea: 'Prawo administracyjne' },
  { title: 'Wniosek lub podanie', lawArea: 'Prawo administracyjne' },
  { title: 'Odwołanie od decyzji', lawArea: 'Prawo administracyjne' },
  { title: 'Skarga do urzędu lub instytucji', lawArea: 'Prawo administracyjne' },
  { title: 'Zażalenie na decyzję lub działanie organu', lawArea: 'Prawo administracyjne' },
  { title: 'Ponaglenie za brak odpowiedzi', lawArea: 'Prawo administracyjne' },
  { title: 'Wezwanie do zapłaty', lawArea: 'Prawo cywilne' },
  { title: 'Odpowiedź na wezwanie do zapłaty', lawArea: 'Prawo cywilne' },
  { title: 'Reklamacja towaru lub usługi', lawArea: 'Prawo konsumenckie' },
  { title: 'Odpowiedź na reklamację', lawArea: 'Prawo konsumenckie' },
  { title: 'Odstąpienie od umowy', lawArea: 'Prawo konsumenckie' },
  { title: 'Wypowiedzenie umowy', lawArea: 'Prawo cywilne' },
  { title: 'Pismo do banku', lawArea: 'Prawo cywilne' },
  { title: 'Pismo do ubezpieczyciela', lawArea: 'Prawo cywilne' },
  { title: 'Pismo do firmy windykacyjnej', lawArea: 'Prawo cywilne' },
  { title: 'Pismo do operatora telefonu, internetu lub telewizji', lawArea: 'Prawo konsumenckie' },
  { title: 'Pismo do pracodawcy', lawArea: 'Prawo pracy' },
  { title: 'Odpowiedź na pismo od pracodawcy', lawArea: 'Prawo pracy' },
  { title: 'Wniosek pracowniczy', lawArea: 'Prawo pracy' },
  { title: 'Pismo do szkoły, przedszkola lub uczelni', lawArea: 'Prawo administracyjne' },
  { title: 'Pismo do spółdzielni mieszkaniowej', lawArea: 'Prawo mieszkaniowe' },
  { title: 'Pismo do wspólnoty mieszkaniowej', lawArea: 'Prawo mieszkaniowe' },
  { title: 'Pismo do zarządcy nieruchomości', lawArea: 'Prawo mieszkaniowe' },
  { title: 'Pismo w sprawie problemu sąsiedzkiego', lawArea: 'Prawo cywilne' },
  { title: 'Zawiadomienie o możliwości popełnienia przestępstwa', lawArea: 'Prawo karne' },
  { title: 'Oświadczenie lub wyjaśnienie na piśmie', lawArea: 'Prawo cywilne' },
];

const proceedingsServices: ServiceItem[] = [
  { title: 'Odpowiedź na pozew', lawArea: 'Postępowanie cywilne' },
  { title: 'Sprzeciw od nakazu zapłaty', lawArea: 'Postępowanie cywilne' },
  { title: 'Zarzuty od nakazu zapłaty', lawArea: 'Postępowanie cywilne' },
  { title: 'Odpowiedź na pismo drugiej strony', lawArea: 'Postępowanie cywilne' },
  { title: 'Pismo do sądu w toku sprawy', lawArea: 'Postępowanie cywilne' },
  { title: 'Wniosek dowodowy', lawArea: 'Postępowanie cywilne' },
  { title: 'Wniosek o przedłużenie terminu', lawArea: 'Postępowanie cywilne' },
  { title: 'Wniosek o przywrócenie terminu', lawArea: 'Postępowanie cywilne' },
  { title: 'Wniosek o uzasadnienie wyroku lub postanowienia', lawArea: 'Postępowanie cywilne' },
  { title: 'Apelacja', lawArea: 'Postępowanie cywilne' },
  { title: 'Zażalenie do sądu', lawArea: 'Postępowanie cywilne' },
  { title: 'Skarga na czynności w toku postępowania', lawArea: 'Postępowanie cywilne' },
  { title: 'Pismo uzupełniające do sprawy', lawArea: 'Postępowanie cywilne' },
  { title: 'Stanowisko w sprawie', lawArea: 'Postępowanie cywilne' },
  { title: 'Odpowiedź na wezwanie z sądu lub urzędu', lawArea: 'Postępowanie cywilne' },
  { title: 'Skarga do wojewódzkiego sądu administracyjnego', lawArea: 'Postępowanie administracyjne' },
  { title: 'Wniosek o wstrzymanie wykonania decyzji administracyjnej', lawArea: 'Postępowanie administracyjne' },
  { title: 'Skarga na decyzję administracyjną', lawArea: 'Postępowanie administracyjne' },
];

const additionalServices: ServiceItem[] = [
  { title: 'Korekta gotowego pisma', lawArea: 'Wsparcie formalne' },
  { title: 'Przeredagowanie pisma na język formalny', lawArea: 'Wsparcie formalne' },
  { title: 'Sprawdzenie pisma przed wysłaniem', lawArea: 'Wsparcie formalne' },
  { title: 'Uporządkowanie treści i załączników', lawArea: 'Wsparcie formalne' },
];

const baseBenefits = [
  'Dokument dopasowany do Twojej sytuacji i celu sprawy',
  'Poprawność formalna, językowa i logiczna argumentacja',
  'Jasne wskazanie kolejnych kroków po wysłaniu pisma',
];

const baseProcess = [
  'Analiza Twojej sprawy i dokumentów źródłowych',
  'Przygotowanie projektu pisma i ewentualne poprawki',
  'Przekazanie finalnej wersji gotowej do wysłania',
];

const polishMap: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ż: 'z',
  ź: 'z',
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[ąćęłńóśżź]/g, (char) => polishMap[char] ?? char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSummary = (title: string) => {
  const customSummaries: Record<string, string> = {
    'Pismo do urzędu': 'Pismo przygotowane do złożenia w urzędzie.',
    'Wniosek lub podanie': 'Formalny wniosek dopasowany do konkretnej sprawy.',
    'Odwołanie od decyzji': 'Rzeczowe odwołanie z jasnym żądaniem zmiany decyzji.',
    'Skarga do urzędu lub instytucji': 'Treść do zgłoszenia problemu i zabezpieczenia stanowiska.',
    'Zażalenie na decyzję lub działanie organu': 'Krótka, konkretna reakcja na decyzję albo czynność organu.',
    'Ponaglenie za brak odpowiedzi': 'Pismo przypominające o bezczynności i braku odpowiedzi.',
    'Wezwanie do zapłaty': 'Dokument porządkujący roszczenie i termin spłaty.',
    'Odpowiedź na wezwanie do zapłaty': 'Odpowiedź na roszczenie z zachowaniem formalnego tonu.',
    'Reklamacja towaru lub usługi': 'Przygotowanie reklamacji towaru lub usługi, również z tytułu rękojmi.',
    'Odpowiedź na reklamację': 'Pismo do ustosunkowania się do reklamacji drugiej strony.',
    'Odstąpienie od umowy': 'Oświadczenie o odstąpieniu od umowy z zachowaniem terminów.',
    'Wypowiedzenie umowy': 'Formalne wypowiedzenie z czytelnym skutkiem prawnym.',
    'Pismo do banku': 'Pismo do banku z precyzyjnym opisem sprawy.',
    'Pismo do ubezpieczyciela': 'Formalne wystąpienie do ubezpieczyciela z argumentami.',
    'Pismo do firmy windykacyjnej': 'Treść do podmiotu windykacyjnego z jasnym stanowiskiem.',
    'Pismo do operatora telefonu, internetu lub telewizji': 'Pismo do operatora z opisem problemu i żądaniem.',
    'Pismo do pracodawcy': 'Pismo pracownicze przygotowane do złożenia w firmie.',
    'Odpowiedź na pismo od pracodawcy': 'Formalna odpowiedź na korespondencję od pracodawcy.',
    'Wniosek pracowniczy': 'Wniosek związany z zatrudnieniem i organizacją pracy.',
    'Pismo do szkoły, przedszkola lub uczelni': 'Pismo do placówki edukacyjnej z konkretnym żądaniem.',
    'Pismo do spółdzielni mieszkaniowej': 'Treść przygotowana do spółdzielni mieszkaniowej.',
    'Pismo do wspólnoty mieszkaniowej': 'Formalna korespondencja do wspólnoty mieszkaniowej.',
    'Pismo do zarządcy nieruchomości': 'Pismo porządkujące sprawę wobec zarządcy nieruchomości.',
    'Pismo w sprawie problemu sąsiedzkiego': 'Spokojne pismo porządkujące spór sąsiedzki.',
    'Zawiadomienie o możliwości popełnienia przestępstwa': 'Treść porządkująca zgłoszenie do organów.',
    'Oświadczenie lub wyjaśnienie na piśmie': 'Krótki dokument wyjaśniający stan faktyczny.',
    'Odpowiedź na pozew': 'Odpowiedź procesowa do wykorzystania w sprawie cywilnej.',
    'Sprzeciw od nakazu zapłaty': 'Pismo do zakwestionowania nakazu zapłaty.',
    'Zarzuty od nakazu zapłaty': 'Formalne zarzuty wobec nakazu zapłaty.',
    'Odpowiedź na pismo drugiej strony': 'Reakcja na korespondencję strony przeciwnej.',
    'Pismo do sądu w toku sprawy': 'Pismo procesowe dopasowane do bieżącego etapu sprawy.',
    'Wniosek dowodowy': 'Wniosek o dopuszczenie i przeprowadzenie dowodu.',
    'Wniosek o przedłużenie terminu': 'Pismo o wydłużenie terminu w toczącej się sprawie.',
    'Wniosek o przywrócenie terminu': 'Wniosek o przywrócenie uchybionego terminu.',
    'Wniosek o uzasadnienie wyroku lub postanowienia': 'Pismo otwierające drogę do dalszych czynności.',
    'Apelacja': 'Środek zaskarżenia do ponownej oceny rozstrzygnięcia.',
    'Zażalenie do sądu': 'Pismo do zakwestionowania konkretnego postanowienia.',
    'Skarga na czynności w toku postępowania': 'Skarga dotycząca czynności w prowadzonej sprawie.',
    'Pismo uzupełniające do sprawy': 'Doprecyzowanie stanowiska i materiału w sprawie.',
    'Stanowisko w sprawie': 'Uporządkowane stanowisko procesowe.',
    'Odpowiedź na wezwanie z sądu lub urzędu': 'Gotowa odpowiedź na wezwanie instytucji.',
    'Skarga do wojewódzkiego sądu administracyjnego': 'Skarga w sprawie administracyjnej do sądu.',
    'Wniosek o wstrzymanie wykonania decyzji administracyjnej': 'Wniosek o czasowe wstrzymanie wykonania decyzji.',
    'Skarga na decyzję administracyjną': 'Skarga administracyjna z uporządkowaną argumentacją.',
    'Korekta gotowego pisma': 'Korekta treści, błędów i układu pisma.',
    'Przeredagowanie pisma na język formalny': 'Przepisanie treści na bardziej formalny i czytelny język.',
    'Sprawdzenie pisma przed wysłaniem': 'Szybka weryfikacja pisma przed wysyłką.',
    'Uporządkowanie treści i załączników': 'Pomoc w uporządkowaniu materiałów i załączników.',
  };

  if (customSummaries[title]) {
    return customSummaries[title];
  }

  if (title === 'Reklamacja towaru lub usługi') {
    return 'Przygotowanie reklamacji towaru lub usługi, również z tytułu rękojmi.';
  }

  return 'Pismo przygotowane z myślą o konkretnej sprawie.';
};

const simpleTitles = new Set([
  'Wezwanie do zapłaty',
  'Odpowiedź na wezwanie do zapłaty',
  'Reklamacja towaru lub usługi',
  'Odpowiedź na reklamację',
  'Odstąpienie od umowy',
  'Wypowiedzenie umowy',
  'Pismo do banku',
  'Pismo do ubezpieczyciela',
  'Pismo do firmy windykacyjnej',
  'Pismo do operatora telefonu, internetu lub telewizji',
  'Pismo do pracodawcy',
  'Odpowiedź na pismo od pracodawcy',
  'Wniosek pracowniczy',
  'Pismo do szkoły, przedszkola lub uczelni',
  'Pismo do spółdzielni mieszkaniowej',
  'Pismo do wspólnoty mieszkaniowej',
  'Pismo do zarządcy nieruchomości',
  'Pismo w sprawie problemu sąsiedzkiego',
  'Oświadczenie lub wyjaśnienie na piśmie',
]);

const standardTitles = new Set([
  'Pismo do urzędu',
  'Wniosek lub podanie',
  'Skarga do urzędu lub instytucji',
  'Ponaglenie za brak odpowiedzi',
  'Zawiadomienie o możliwości popełnienia przestępstwa',
  'Odpowiedź na pozew',
  'Sprzeciw od nakazu zapłaty',
  'Odpowiedź na pismo drugiej strony',
  'Pismo do sądu w toku sprawy',
  'Wniosek dowodowy',
  'Wniosek o przedłużenie terminu',
  'Wniosek o uzasadnienie wyroku lub postanowienia',
  'Stanowisko w sprawie',
  'Odpowiedź na wezwanie z sądu lub urzędu',
  'Skarga na czynności w toku postępowania',
  'Pismo uzupełniające do sprawy',
]);

const premiumTitles = new Set([
  'Odwołanie od decyzji',
  'Zażalenie na decyzję lub działanie organu',
  'Zarzuty od nakazu zapłaty',
  'Wniosek o przywrócenie terminu',
  'Apelacja',
  'Zażalenie do sądu',
  'Skarga do wojewódzkiego sądu administracyjnego',
  'Wniosek o wstrzymanie wykonania decyzji administracyjnej',
  'Skarga na decyzję administracyjną',
]);

const getPriceFrom = (title: string) => {
  if (simpleTitles.has(title)) return '159 PLN';
  if (standardTitles.has(title)) return '229 PLN';
  if (premiumTitles.has(title)) return '349 PLN';
  return '279 PLN';
};

const createService = (
  category: string,
  lawArea: string,
  title: string,
  priceFrom = getPriceFrom(title),
): Service => ({
  slug: slugify(title),
  title,
  category,
  lawArea,
  summary: getSummary(title),
  description:
    'Zakres obejmuje analizę materiałów, przygotowanie treści i dopasowanie dokumentu do wymogów formalnych oraz celu sprawy.',
  benefits: baseBenefits,
  process: baseProcess,
  priceFrom,
});

export const services: Service[] = [
  ...clientServices.map((item) => createService(categoryClient, item.lawArea, item.title)),
  ...proceedingsServices.map((item) =>
    createService(categoryProceedings, item.lawArea, item.title),
  ),
  ...additionalServices.map((item) =>
    createService(categoryAdditional, item.lawArea, item.title, '119 PLN'),
  ),
];

export const serviceCategories = [categoryClient, categoryProceedings, categoryAdditional];
