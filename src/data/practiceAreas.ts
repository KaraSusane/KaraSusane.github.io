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
