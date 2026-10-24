export type BlogCategory = {
  name: string;
  slug: string;
  description: string;
  paragraphs: string[];
  practiceId?: string;
  updatedAt: string;
};

export const blogCategoryPages: BlogCategory[] = [
  {
    name: 'Pisma i dokumenty', slug: 'pisma-i-dokumenty', updatedAt: '2026-10-24',
    description: 'Jak napisać pismo w sprawie do sklepu, urzędu lub sądu: budowa pisma, wymagane elementy, sposób wysyłki, załączniki i najczęstsze błędy.',
    paragraphs: [
      'Reklamacja, wniosek do urzędu, wezwanie do zapłaty czy odpowiedź na pismo z sądu mają wspólny cel: jasno przedstawić sprawę i powiedzieć adresatowi, czego od niego oczekujesz. Różnią się jednak wymaganiami, terminami i sposobem doręczenia.',
      'W tej kategorii znajdziesz praktyczne wskazówki dotyczące przygotowania pism: od uporządkowania faktów i sformułowania żądania, przez wymagania przepisów, po wysyłkę i dołączanie dokumentów.',
    ],
  },
  {
    name: 'Ochrona danych osobowych', slug: 'ochrona-danych-osobowych', practiceId: 'prawo-sztucznej-inteligencji', updatedAt: '2026-10-11',
    description: 'RODO w praktyce: zgody klientów, obowiązek informacyjny, dane wrażliwe i bezpieczeństwo dokumentacji. Artykuły o ochronie danych osobowych.',
    paragraphs: [
      'Ochrona danych osobowych dotyczy codziennych decyzji: jakie informacje zbierać od klienta, do czego je wykorzystywać i komu udostępniać. Ważne są nie tylko formularze zgód, ale też rzeczywisty sposób pracy z dokumentami i bazą klientów.',
      'W tej kategorii znajdziesz przykłady dotyczące sklepów internetowych, gabinetów beauty i komunikacji marketingowej. Artykuły pomagają rozróżnić cele przetwarzania danych oraz zauważyć sytuacje, w których warto sprawdzić procedury, umowy i treść obowiązku informacyjnego.',
    ],
  },
  {
    name: 'Prawo cywilne i konsumenckie', slug: 'prawo-cywilne-i-konsumenckie', updatedAt: '2026-10-11',
    description: 'Prawo cywilne i konsumenckie w praktyce: wady używanego auta, rękojmia, reklamacje i umowy. Poznaj przykłady spraw oraz możliwe kierunki działania.',
    paragraphs: [
      'Zakup rzeczy, podpisanie umowy i reklamacja mogą wyglądać inaczej w zależności od tego, kto jest drugą stroną transakcji. Inne pytania pojawiają się przy zakupie od przedsiębiorcy, a inne przy umowie z osobą prywatną.',
      'Artykuły w tej kategorii pokazują, jak uporządkować okoliczności sporu, zapewnienia sprzedawcy i dokumenty potwierdzające przebieg transakcji. Znajdziesz tu analizę zakupu używanego samochodu oraz różnic między odpowiedzialnością cywilną a ochroną konsumenta.',
    ],
  },
  {
    name: 'Prawo medyczne', slug: 'prawo-medyczne', practiceId: 'prawo-medyczne', updatedAt: '2026-10-11',
    description: 'Prawo medyczne i prawa pacjenta: zgoda na leczenie, dokumentacja medyczna, klauzula sumienia i obowiązki lekarza. Artykuły oraz analizy spraw.',
    paragraphs: [
      'Prawo medyczne obejmuje nie tylko ocenę wyniku leczenia, ale również rozmowę z pacjentem, przekazywanie informacji i sposób prowadzenia dokumentacji. Znaczenie ma to, co zostało wyjaśnione, na co pacjent wyraził zgodę i jakie okoliczności odnotowano.',
      'W tej kategorii przeczytasz o zgodzie poinformowanej, odmowie konkretnego świadczenia i klauzuli sumienia lekarza. Analizy pokazują, jak oddzielać opis zdarzenia od jego oceny prawnej i dlaczego przy sprawach medycznych potrzebne jest spojrzenie na całość dokumentów.',
    ],
  },
  {
    name: 'Prawo spadkowe', slug: 'prawo-spadkowe', practiceId: 'prawo-spadkowe', updatedAt: '2026-10-19',
    description: 'Prawo spadkowe przystępnie: dziedziczenie bez testamentu, kolejność spadkobierców i udziały w majątku. Przykłady dotyczące małżonka i dzieci.',
    paragraphs: [
      'Sprawy spadkowe często wymagają ustalenia dwóch rzeczy: kto należy do kręgu spadkobierców oraz jaki majątek rzeczywiście wchodzi do spadku. Sam opis rodzinnej sytuacji nie zawsze wystarcza do obliczenia udziałów.',
      'Artykuły omawiają dziedziczenie ustawowe na konkretnych przykładach, w tym sytuację małżonka i dzieci. Pokazują też różnicę między udziałem w majątku wspólnym małżeńskim a udziałem dziedziczonym po zmarłym.',
    ],
  },
  {
    name: 'Mediacje', slug: 'mediacje', practiceId: 'mediacje', updatedAt: '2026-10-11',
    description: 'Mediacja a sprawa w sądzie: dobrowolność, poufność, rola mediatora i skutki ugody. Artykuły o porozumieniu i sposobach rozwiązywania sporów.',
    paragraphs: [
      'Nie każdy spór musi być rozwiązywany w ten sam sposób. Przy wyborze między rozmową, mediacją a postępowaniem sądowym znaczenie mają cel stron, charakter konfliktu i możliwość dalszej współpracy.',
      'W tej kategorii znajdziesz wyjaśnienie roli mediatora, zasad poufności i dobrowolności oraz znaczenia ugody. Treści mają charakter informacyjny; usługa prowadzenia mediacji w Pismo w Sprawie jest zapowiedziana jako dostępna wkrótce.',
    ],
  },
  {
    name: 'Prawo rolne', slug: 'prawo-rolne', practiceId: 'prawo-nieruchomosci', updatedAt: '2026-10-11',
    description: 'Prawo rolne i sprzedaż ziemi: prawo pierwokupu KOWR, dzierżawa, umowa warunkowa i formalności. Praktyczne wyjaśnienia dotyczące nieruchomości rolnych.',
    paragraphs: [
      'Sprzedaż nieruchomości rolnej wymaga spojrzenia nie tylko na cenę i treść umowy. Znaczenie mogą mieć powierzchnia gruntu, jego przeznaczenie, dzierżawa i status osoby, która chce go kupić.',
      'Artykuły w tej kategorii omawiają prawo pierwokupu KOWR, kolejność czynności przy sprzedaży i ryzyka pominięcia wymaganej procedury. Wyjaśniają, jakie pytania warto uporządkować przed przygotowaniem dokumentów i wizytą u notariusza.',
    ],
  },
];

export const categoryPath = (category: BlogCategory) => `/blog/kategoria/${category.slug}/`;
export const findBlogCategory = (pathname: string) => blogCategoryPages.find(category => categoryPath(category).replace(/\/$/, '') === pathname.replace(/\/$/, ''));
export const findCategoryByName = (name: string) => blogCategoryPages.find(category => category.name === name);
