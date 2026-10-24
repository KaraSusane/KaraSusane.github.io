import { Building2, Cpu, Handshake, ScrollText, ShieldCheck, Stethoscope, type LucideIcon } from 'lucide-react';

// Order matches the practice page; summaries are the short versions shown on the home page.
export const practiceAreas: Array<{ title: string; slug: string; icon: LucideIcon; summary: string }> = [
  { title: 'Prawo sztucznej inteligencji, AI Act, RODO', slug: 'prawo-sztucznej-inteligencji', icon: Cpu, summary: 'Umowy dotyczące narzędzi AI, klauzule informacyjne i porządek w dokumentacji ochrony danych.' },
  { title: 'Prawo medyczne', slug: 'prawo-medyczne', icon: Stethoscope, summary: 'Dokumentacja medyczna, prawa pacjenta, zgoda na świadczenie i pisma do placówek.' },
  { title: 'Prawo spadkowe', slug: 'prawo-spadkowe', icon: ScrollText, summary: 'Krąg spadkobierców, dokumenty dotyczące spadku i projekty pism.' },
  { title: 'Prawo nieruchomości', slug: 'prawo-nieruchomosci', icon: Building2, summary: 'Analiza umów i zapisów dotyczących nieruchomości przed podjęciem decyzji.' },
  { title: 'Legal tech i cyberbezpieczeństwo', slug: 'legal-tech-i-cyberbezpieczenstwo', icon: ShieldCheck, summary: 'Umowy na usługi IT, zapisy o poufności i dokumentacja bezpieczeństwa informacji.' },
  { title: 'Mediacje', slug: 'mediacje', icon: Handshake, summary: 'Zasady mediacji i różnice wobec postępowania sądowego. Prowadzenie mediacji: już wkrótce.' },
];

export const practiceContent: Record<string, { description: string; examples: string; category: string | null; ebookId?: string }> = {
  'prawo-sztucznej-inteligencji': {
    description: 'Pomagam analizować dokumentację i umowy związane z wykorzystaniem sztucznej inteligencji oraz przetwarzaniem danych osobowych. Porządkuję pytania dotyczące AI Act i RODO, wskazuję ryzyka wymagające oceny i przygotowuję projekty dokumentów dostosowane do sposobu działania klienta.',
    examples: 'Przykładowe sprawy: analiza zapisów umowy dotyczącej narzędzi AI, przygotowanie klauzul informacyjnych oraz uporządkowanie dokumentacji ochrony danych osobowych.',
    category: 'Ochrona danych osobowych',
    ebookId: 'przewodnik-po-rodo',
  },
  'prawo-medyczne': {
    description: 'Pomagam uporządkować dokumentację medyczną, stanowisko pacjenta lub podmiotu medycznego oraz pytania wymagające analizy prawnej. Przygotowuję projekty pism i analizuję dokumenty dotyczące informacji o leczeniu, zgody na świadczenie i przebiegu kontaktu z placówką.',
    examples: 'Przykładowe sprawy: wniosek o dokumentację, odpowiedź na pismo, analiza zgody i umowy dotyczącej świadczeń zdrowotnych.',
    category: 'Prawo medyczne',
  },
  'prawo-spadkowe': {
    description: 'Pomagam uporządkować dokumenty i pytania związane z dziedziczeniem oraz sytuacją majątkową po śmierci bliskiej osoby. Analizuję przedstawione okoliczności, wskazuję kwestie wymagające wyjaśnienia i przygotowuję projekty pism dopasowane do konkretnej sprawy spadkowej.',
    examples: 'Przykładowe sprawy: analiza dokumentów dotyczących spadku, uporządkowanie informacji o majątku i kręgu spadkobierców oraz przygotowanie projektu pisma lub stanowiska.',
    category: 'Prawo spadkowe',
  },
  'prawo-nieruchomosci': {
    description: 'Pomagam przeanalizować dokumenty i zapisy umowne związane z nieruchomością przed podjęciem decyzji. Sprawdzam konstrukcję zobowiązań, wskazuję niejasności i przygotowuję projekty pism dotyczących ustaleń między stronami.',
    examples: 'Przykładowe sprawy: analiza umowy najmu, uporządkowanie warunków współpracy oraz projekt wezwania lub odpowiedzi. Usługa nie zastępuje czynności notariusza.',
    category: 'Prawo rolne',
  },
  'legal-tech-i-cyberbezpieczenstwo': {
    description: 'Pomagam uporządkować prawne aspekty korzystania z technologii oraz dokumentację związaną z bezpieczeństwem informacji. Analizuję umowy dotyczące rozwiązań cyfrowych, zasady współpracy z dostawcami i zapisy określające odpowiedzialność stron oraz sposób postępowania z danymi.',
    examples: 'Przykładowe sprawy: analiza umowy na usługi IT, przygotowanie zapisów o poufności i dostępie do informacji oraz uporządkowanie dokumentacji. Wsparcie prawne nie zastępuje technicznego audytu bezpieczeństwa.',
    category: null,
  },
  mediacje: {
    description: 'Mediacja jest jedną z dróg poszukiwania porozumienia między stronami sporu. Na blogu wyjaśniam jej zasady, rolę mediatora i różnice względem postępowania sądowego, aby łatwiej było zrozumieć dostępne możliwości.',
    examples: 'Prowadzenie mediacji w Pismo w Sprawie: już wkrótce. Obecnie możesz zapytać o przygotowanie dokumentów i uporządkowanie swojego stanowiska.',
    category: 'Mediacje',
  },
};
