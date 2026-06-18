import { type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { StorytellingSection } from './components/StorytellingSection';

const contactEmail = 'pismowsprawie@gmail.com';
const tiktokUrl = 'https://www.tiktok.com/@pismowsprawie?_r=1&_t=ZN-97Er7B8gTdW';

const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();

  if (subject) {
    params.set('subject', subject);
  }

  if (body) {
    params.set('body', body);
  }

  const query = params.toString();

  return `mailto:${contactEmail}${query ? `?${query}` : ''}`;
};

const navItems = [
  { label: 'Usługi', href: '/#uslugi' },
  { label: 'Warunki współpracy', href: '/#warunki' },
  { label: 'O startupie', href: '/#o-startupie' },
  { label: 'Blog', href: tiktokUrl },
  { label: 'Kontakt', href: '/#kontakt' },
];

const services = [
  {
    title: 'Wstępna analiza zgłoszenia i wycena',
    price: '0 zł',
    details: [
      'Pilna sprawa: cena podstawowa plus 50 procent za tryb szybszej realizacji.',
      'Tryb pilny jest dostępny po wcześniejszym sprawdzeniu terminu i zakresu dokumentów.',
    ],
  },
  {
    title: 'Sporządzenie pisma',
    price: 'od 149 zł',
    details: [
      'Krótkie pismo do dwóch stron: od 149 zł',
      'Odpowiedź na pismo: od 299 zł',
      'Umowy: od 299 zł',
      'Pismo z argumentacją: od 399 zł',
      'Rozbudowane pismo powyżej 4 stron: od 499 zł',
    ],
  },
  {
    title: 'Korekta dokumentacji',
    price: 'od 199 zł',
    details: ['Do 5 stron: od 199 zł', 'Do 10 stron: od 349 zł', 'Do 20 stron: od 599 zł'],
  },
  {
    title: 'Konsulting prawny',
    price: 'od 99 zł',
    details: ['Pisemna konsultacja lub opracowanie sprawy: od 99 zł'],
  },
  {
    title: 'Prawo medyczne i beauty',
    price: 'od 99 zł',
    details: [
      'Zgoda RODO: od 99 zł',
      'Umowy i pisma do dwóch stron: od 299 zł',
      'Korekta dokumentacji medycznej: od 199 zł',
    ],
  },
];

const cooperationSteps = [
  'Najpierw opisujesz sprawę w mailu i przesyłasz dokumenty.',
  'Następnie otrzymujesz wycenę, zakres usługi i termin realizacji.',
  'Po Twojej akceptacji oraz dokonaniu płatności zabieramy się do pracy.',
  'Gotowy materiał otrzymujesz w pliku edytowalnym i PDF.',
  'W cenie otrzymujesz jedną turę poprawek w ustalonym zakresie.',
];

const startupScope = [
  'Przygotowywanie pism, wezwań, wniosków i odwołań',
  'Analiza dokumentów przekazanych przez klienta',
  'Przygotowywanie prostych opinii prawnych',
  'Wstępny research prawny',
  'Tworzenie regulaminów, umów i innych treści prawnych',
  'Porządkowanie argumentacji i stanowiska klienta w sprawie',
];

const policySections = [
  {
    title: 'Dokumenty i informacje od klienta',
    content:
      'Klient powinien przekazać prawdziwe, kompletne i aktualne informacje dotyczące sprawy. Treść przygotowanego dokumentu opiera się na materiałach otrzymanych od klienta. Jeżeli po wykonaniu usługi pojawią się nowe fakty, dokumenty albo okoliczności, mogą one wymagać dodatkowej analizy i odrębnej wyceny, a co za tym idzie zmiany terminów wykonywania usług.',
  },
  {
    title: 'Terminy',
    content:
      'Termin realizacji ustalany jest indywidualnie przed rozpoczęciem pracy. Standardowy czas przygotowania prostego pisma wynosi zwykle od 2 do 3 dni roboczych, chyba że strony ustalą inaczej. W sprawach pilnych możliwa jest szybsza realizacja po wcześniejszym potwierdzeniu dostępności. Usługa ekspresowa może wiązać się z dodatkową opłatą.',
  },
  {
    title: 'Płatność',
    content:
      'Płatność następuje przed rozpoczęciem pracy nad zleceniem, chyba że strony ustalą inaczej. Rozpoczęcie realizacji usługi następuje po zaakceptowaniu wyceny, warunków współpracy oraz zaksięgowaniu płatności.',
  },
  {
    title: 'Korekty',
    content:
      'W cenie usługi zawarta jest jedna korekta, jeżeli dotyczy tego samego zakresu sprawy i nie wymaga analizy nowych dokumentów ani nowych okoliczności. Zmiana koncepcji pisma, rozszerzenie zlecenia albo dodanie nowych wątków może wymagać dodatkowej wyceny.',
  },
  {
    title: 'Odstąpienie od umowy',
    content:
      'Jeżeli klient jest konsumentem i zawiera umowę na odległość, co do zasady przysługuje mu prawo odstąpienia od umowy w terminie 14 dni. Jeżeli klient wyraźnie zgadza się na rozpoczęcie realizacji usługi przed upływem tego terminu, przyjmuje do wiadomości, że po pełnym wykonaniu usługi może utracić prawo odstąpienia od umowy w zakresie wykonanej usługi.',
  },
  {
    title: 'Reklamacje',
    content:
      'Reklamację można zgłosić mailowo na adres: pismowsprawie@gmail.com. W zgłoszeniu należy opisać, czego dotyczy reklamacja oraz wskazać numer zamówienia albo dane pozwalające zidentyfikować zlecenie. Odpowiedź na reklamację zostanie udzielona w terminie 14 dni od dnia jej otrzymania.',
  },
  {
    title: 'Poufność i dane',
    content:
      'Informacje oraz dokumenty przekazane przez klienta są traktowane poufnie i wykorzystywane wyłącznie w celu realizacji zlecenia. Dane osobowe są przetwarzane w zakresie niezbędnym do kontaktu z klientem, wykonania usługi, rozliczenia płatności oraz obsługi ewentualnych reklamacji.',
  },
  {
    title: 'Uwagi',
    content:
      'Dokumenty wyceniane są indywidualnie. Każde zlecenie przyjmujemy po wcześniejszym sprawdzeniu zakresu sprawy, terminu oraz możliwości rzetelnego wykonania usługi. Przesłanie formularza nie oznacza przyjęcia zlecenia. Zlecenie zostaje przyjęte dopiero po potwierdzeniu zakresu usługi, ceny, terminu realizacji oraz po dokonaniu płatności zgodnie z ustaleniami. Usługa nie obejmuje gwarancji określonego rozstrzygnięcia sprawy. Przygotowanie pisma lub analiza dokumentu następuje na podstawie informacji i materiałów przekazanych przez klienta. Podane ceny są cenami minimalnymi. Ostateczna cena zależy od rodzaju sprawy, objętości materiałów, stopnia skomplikowania problemu oraz terminu realizacji.',
  },
];

const legalPages = {
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności',
    eyebrow: 'Dokument prawny',
    intro: 'Polityka prywatności strony internetowej Pismo w Sprawie.',
    sections: [
      {
        title: '§ 1. Administrator Danych Osobowych',
        paragraphs: [
          'Właścicielem strony internetowej i Administratorem Twoich danych osobowych jest Karolina Zdrojek, prowadząca nierejestrowaną działalność gospodarczą pod firmą PISMO W SPRAWIE.',
          'W sprawach związanych z ochroną danych osobowych możesz skontaktować się z Administratorem pod adresem e-mail: pismowsprawie@gmail.com',
        ],
      },
      {
        title: '§ 2. Zakres i cel przetwarzania danych',
        paragraphs: [
          'Strona ma charakter informacyjny (tzw. wizytówka). Nie posiadamy formularzy kontaktowych, kont użytkowników ani nie wysyłamy newsletterów. Twoje dane przetwarzamy w minimalnym zakresie w dwóch przypadkach:',
          'Kontakt mailowy lub telefoniczny: gdy dobrowolnie do nas napiszesz lub zadzwonisz, korzystając z danych podanych na stronie, przetwarzamy Twoje dane (np. adres e-mail, imię, treść wiadomości) w celu udzielenia odpowiedzi na Twoje zapytanie lub przygotowania wyceny usług graficznych.',
          'Podstawa prawna: Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na komunikacji z potencjalnymi klientami).',
          'Logi serwera (dane techniczne): korzystanie ze strony wiąże się z przesyłaniem zapytań do serwera, na którym strona jest przechowywana. Każde zapytanie jest zapisywane w logach serwera (m.in. adres IP, data i czas serwera, informacje o przeglądarce internetowej i systemie operacyjnym).',
          'Dane te nie są kojarzone z konkretnymi osobami i są usuwane po upływie określonego czasu. Służą wyłącznie do celów administracyjnych i zapewnienia bezpieczeństwa działania strony.',
          'Podstawa prawna: Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).',
        ],
      },
      {
        title: '§ 3. Odbiorcy danych',
        paragraphs: [
          'Twoje dane mogą być przetwarzane przez podmioty zewnętrzne, które wspierają nas technicznie w prowadzeniu działalności. Są to wyłącznie: dostawca usług hostingowych (firma przechowująca pliki strony i obsługująca pocztę e-mail) oraz biuro rachunkowe (tylko w przypadku, gdy dojdzie do współpracy i wystawienia faktury).',
        ],
      },
      {
        title: '§ 4. Okres przechowywania danych',
        paragraphs: [
          'Korespondencja mailowa jest przechowywana przez okres niezbędny do wyjaśnienia sprawy lub do momentu przedawnienia ewentualnych roszczeń.',
          'Dane na fakturach (jeśli zostaniesz naszym klientem) są przechowywane przez 5 lat, zgodnie z przepisami podatkowymi.',
        ],
      },
      {
        title: '§ 5. Twoje prawa',
        paragraphs: [
          'Zgodnie z RODO przysługuje Ci prawo do: dostępu do swoich danych oraz otrzymania ich kopii, sprostowania (poprawiania) swoich danych, usunięcia danych, ograniczenia przetwarzania danych, wniesienia sprzeciwu wobec przetwarzania danych oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeśli uznasz, że przetwarzanie narusza przepisy prawa.',
        ],
      },
      {
        title: '§ 6. Pliki Cookies (Ciasteczka)',
        paragraphs: [
          'Strona może wykorzystywać pliki cookies (niewielkie pliki tekstowe zapisywane na Twoim urządzeniu).',
          'Wykorzystujemy je wyłącznie w celach technicznych, niezbędnych do prawidłowego wyświetlania zawartości strony. Nie wykorzystujemy cookies śledzących ani reklamowych.',
          'Jeżeli nie wyrażasz zgody na używanie plików cookies, możesz w każdej chwili zmienić ustawienia swojej przeglądarki internetowej (zablokować automatyczną obsługę plików cookies).',
        ],
      },
      {
        title: '§ 7. Postanowienia końcowe',
        paragraphs: [
          'Polityka Prywatności jest na bieżąco weryfikowana i w razie potrzeby aktualizowana.',
          'Data ostatniej aktualizacji: 15.06.2026',
        ],
      },
    ],
  },
  '/nota-prawna': {
    title: 'Nota prawna i prawa autorskie',
    eyebrow: 'Dokument prawny',
    intro: 'Informacje dotyczące praw autorskich i wyłączenia odpowiedzialności.',
    sections: [
      {
        title: '§ 1. Prawa autorskie',
        paragraphs: [
          'Wszelkie treści zamieszczone na stronie internetowej PISMO W SPRAWIE, w szczególności: logotypy, grafiki, zdjęcia, wizualizacje projektów, teksty oraz układ strony, stanowią własność firmy PISMO W SPRAWIE Karolina Zdrojek lub zostały użyte na podstawie odpowiednich licencji.',
          'Treści te podlegają ochronie prawnej zgodnie z ustawą z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych.',
          'Jakiekolwiek kopiowanie, powielanie, rozpowszechnianie lub wykorzystywanie materiałów znajdujących się na stronie w celach komercyjnych (bez pisemnej zgody właściciela) jest zabronione i może skutkować odpowiedzialnością cywilną oraz karną.',
        ],
      },
      {
        title: '§ 2. Wyłączenie odpowiedzialności',
        paragraphs: [
          'Informacje zamieszczone na stronie mają charakter wyłącznie informacyjny i handlowy; nie stanowią one oferty w rozumieniu art. 66 Kodeksu Cywilnego.',
          'Prezentowane portfolio ma charakter poglądowy. Ostateczna wycena usług zależy od indywidualnych ustaleń z Klientem.',
          'Administrator dokłada wszelkich starań, aby treści na stronie były aktualne i rzetelne, jednak nie ponosi odpowiedzialności za ewentualne błędy lub nieaktualność informacji.',
        ],
      },
    ],
  },
};

const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-[1px] bg-[#D4AF37]" />
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">{eyebrow}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] max-w-4xl">{title}</h2>
    {children && <div className="mt-6 max-w-3xl text-lg text-[#424245] leading-relaxed font-light">{children}</div>}
  </div>
);

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 min-h-16 bg-white/88 backdrop-blur-md z-50 border-b border-gray-100 px-5 md:px-8 xl:px-10 py-3">
    <div className="flex items-center justify-between gap-4">
      <a href="/" className="flex items-center gap-3 shrink-0">
        <Scale className="text-[#1D1D1F] w-5 h-5" />
        <span className="font-semibold tracking-tight text-sm uppercase">Pismo w Sprawie</span>
      </a>

      <div className="hidden xl:flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.16em] text-[#86868B]">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            className="hover:text-[#1D1D1F] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href={mailto()}
        className="hidden md:inline-flex bg-[#1D1D1F] hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all"
      >
        Napisz maila
      </a>
    </div>

    <div className="xl:hidden mt-3 flex items-center gap-4 overflow-x-auto text-[10px] font-medium uppercase tracking-[0.16em] text-[#86868B] pb-1">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          className="whitespace-nowrap hover:text-[#1D1D1F] transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  </nav>
);

const Hero = () => (
  <section id="top" className="min-h-screen flex items-center px-5 md:px-8 pt-28 pb-16 bg-[#FBFBFD]">
    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_420px] gap-12 items-center">
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] font-bold text-[#86868B] mb-6">WWW.PISMOWSPRAWIE.PL</p>
        <h1 className="text-5xl md:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.96] text-[#1D1D1F]">
          Prawne wsparcie
          <span className="block text-[#86868B]">Precyzyjne pisma</span>
        </h1>
        <p className="text-lg md:text-xl text-[#424245] mt-8 max-w-3xl font-light leading-relaxed">
          Pismo w Sprawie to coś więcej niż wirtualna kancelaria prawna. To relacja oparta o wzajemne porozumienie pomiędzy klientem, a prawnikiem, którego implikacją jest zaoszczędzony czas, estetyczny dokument skrojony na miarę oraz ciągły kontakt i pewność.
        </p>
        <div className="flex flex-wrap gap-3 mt-10">
          <a
            href="#uslugi"
            className="inline-flex items-center gap-2 bg-[#1D1D1F] text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Sprawdź usługi <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={mailto('Wstępna wycena sprawy')}
            className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-7 py-3 text-sm font-medium hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all"
          >
            Poproś o wycenę
          </a>
        </div>
      </div>

      <div className="relative bg-white border border-gray-100 rounded-lg p-7 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-10">
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#86868B]">Pismo w Sprawie</span>
          <FileText className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <div className="space-y-4">
          <div className="h-2 w-24 bg-[#D4AF37]/70 rounded-full" />
          <div className="h-3 w-4/5 bg-[#F0F0F2] rounded-full" />
          <div className="h-3 w-2/3 bg-[#F0F0F2] rounded-full" />
          <div className="pt-8 space-y-3">
            <div className="h-2 w-full bg-[#F5F5F7] rounded-full" />
            <div className="h-2 w-11/12 bg-[#F5F5F7] rounded-full" />
            <div className="h-2 w-full bg-[#F5F5F7] rounded-full" />
            <div className="h-2 w-3/4 bg-[#F5F5F7] rounded-full" />
          </div>
        </div>
        <div className="mt-10 flex items-center gap-3 text-sm text-[#424245]">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          Dokument dopasowany do sprawy, terminu i celu.
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="uslugi" className="py-24 px-5 md:px-8 bg-white border-y border-gray-100 scroll-mt-28">
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow="Usługi" title="Czego potrzebujesz?">
        Każde zlecenie wyceniamy po sprawdzeniu zakresu sprawy, materiałów i oczekiwanego terminu.
      </SectionHeading>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        {services.map((service, index) => (
          <details
            key={service.title}
            className="group bg-[#FBFBFD] border border-gray-100 rounded-lg p-6 min-h-[260px] open:bg-white open:shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-all"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-4 mb-8">
                <span className="text-[#D4AF37] font-semibold text-sm">0{index + 1}</span>
                <ChevronDown className="w-5 h-5 text-[#86868B] group-open:rotate-180 transition-transform" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight mb-4">{service.title}</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-[#86868B]">{service.price}</p>
            </summary>
            <ul className="mt-7 space-y-3 text-sm text-[#424245] leading-relaxed font-light">
              {service.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const CooperationSection = () => (
  <section id="warunki" className="py-24 px-5 md:px-8 bg-[#FBFBFD] scroll-mt-28">
    <div className="max-w-6xl mx-auto">
      <SectionHeading eyebrow="Warunki współpracy" title="Jak będzie wyglądała nasza współpraca?" />

      <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
        <ol className="bg-white border border-gray-100 rounded-lg p-7 md:p-10 space-y-5">
          {cooperationSteps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-sm shrink-0">
                {index + 1}
              </span>
              <span className="text-[#424245] leading-relaxed font-light">{step}</span>
            </li>
          ))}
        </ol>

        <div className="bg-[#1D1D1F] text-white rounded-lg p-7 md:p-8">
          <h3 className="text-2xl font-semibold tracking-tight mb-5">Czego nie obejmuje usługa?</h3>
          <div className="space-y-4 text-white/72 leading-relaxed font-light">
            <p>
              Pismo w Sprawie nie jest kancelarią adwokacką ani radcowską. W ramach projektu nie prowadzimy zastępstwa procesowego, nie występujemy przed sądami, urzędami ani innymi instytucjami jako pełnomocnik klienta oraz nie podpisujemy pism w imieniu klienta.
            </p>
            <p>
              Przygotowane materiały mają pomóc klientowi w uporządkowaniu sprawy, przedstawieniu stanowiska oraz stworzeniu dokumentu dopasowanego do opisanej sytuacji. Klient samodzielnie decyduje o wykorzystaniu przygotowanego pisma.
            </p>
            <p>
              Realizacja usługi nie oznacza gwarancji konkretnego wyniku sprawy. Ostateczne rozstrzygnięcie zależy od okoliczności sprawy, stanowiska drugiej strony, decyzji organu, sądu albo innej instytucji.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="o-startupie" className="py-24 px-5 md:px-8 bg-white border-y border-gray-100 scroll-mt-28">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[420px_1fr] gap-10 items-start">
      <div>
        <figure className="overflow-hidden rounded-lg border border-gray-100 bg-[#FBFBFD] shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
          <img
            src="/karolina-zdrojek.jpg"
            alt="Karolina Zdrojek"
            className="block aspect-[4/5] w-full object-cover object-top"
          />
        </figure>
      </div>

      <div>
        <SectionHeading eyebrow="O startupie" title="O Pismo w Sprawie" />
        <div className="space-y-5 text-lg text-[#424245] leading-relaxed font-light">
          <p>
            Nazywam się Karolina Zdrojek i jestem prawnikiem oraz założycielką Pismo w Sprawie. W swojej pracy łączę praktykę prawniczą z umiejętnością prostego wyjaśniania trudnych treści, które wykorzystuję również w krótkich formach na TikToku.
          </p>
          <p>
            Zależy mi na tym, aby dokument był nie tylko poprawny, ale też zrozumiały dla osoby, która ma się nim posłużyć. Ukończyłam studia podyplomowe z zakresu prawa medycznego, które pozostaje jednym z ważnych obszarów moich zainteresowań zawodowych.
          </p>
          <p>
            Razem z zespołem doświadczonych prawników tworzymy wirtualną kancelarię doradztwa prawnego z myślą o osobach, które potrzebują spokojnie i rzeczowo odpowiedzieć na pismo, uporządkować dokumenty albo lepiej zrozumieć sytuację, zanim podejmą dalsze kroki.
          </p>
          <p>
            W komunikacji stawiamy na precyzję, terminowość, jasny język oraz ludzki punkt widzenia. Pismo w Sprawie powstało po to, aby pomóc osobom, które czują stres przed urzędem, pracodawcą, kontrahentem, firmą albo drugą stroną sporu.
          </p>
        </div>

        <div className="mt-10 bg-[#FBFBFD] border border-gray-100 rounded-lg p-7 md:p-8">
          <h3 className="text-2xl font-semibold tracking-tight mb-5">Zakres pomocy obejmuje w szczególności:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {startupScope.map((item) => (
              <div key={item} className="flex gap-3 text-sm text-[#424245] leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#86868B] leading-relaxed mt-7">
            Każda sprawa jest analizowana indywidualnie. Przed rozpoczęciem pracy ustalam zakres usługi, przewidywany termin realizacji oraz cenę.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BlogSection = () => (
  <section className="py-20 px-5 md:px-8 bg-[#FBFBFD]">
    <div className="max-w-6xl mx-auto bg-[#1D1D1F] text-white rounded-lg p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/45 mb-4">Blog</p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Materiały i komentarze na TikToku.</h2>
      </div>
      <a
        href={tiktokUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-white text-[#1D1D1F] rounded-full px-7 py-3 text-sm font-medium hover:bg-[#F5F5F7] transition-colors"
      >
        Przejdź do bloga <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="kontakt" className="py-24 px-5 md:px-8 bg-white border-y border-gray-100 scroll-mt-28">
    <div className="max-w-6xl mx-auto">
      <SectionHeading eyebrow="Kontakt" title="Opisz sprawę. Wrócimy z konkretną wyceną.">
        W sprawach dotyczących współpracy, wyceny albo realizacji zlecenia proszę o kontakt mailowy.
      </SectionHeading>
      <a
        href={mailto()}
        className="inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        <Mail className="w-5 h-5 text-[#D4AF37]" />
        Napisz maila
      </a>
      <p className="mt-5 text-lg font-medium text-[#424245]">{contactEmail}</p>
    </div>
  </section>
);

const PolicySection = () => (
  <section id="polityka" className="py-24 px-5 md:px-8 bg-[#FBFBFD] scroll-mt-28">
    <div className="max-w-6xl mx-auto">
      <SectionHeading eyebrow="Informacje" title="Najważniejsze zasady realizacji usługi." />
      <div className="grid md:grid-cols-2 gap-4">
        {policySections.map((section) => (
          <details key={section.title} className="group bg-white border border-gray-100 rounded-lg p-6 open:shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
            <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
              <ChevronDown className="w-5 h-5 text-[#86868B] group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <p className="mt-5 text-sm text-[#424245] font-light leading-relaxed">{section.content}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const LegalPage = ({ page }: { page: (typeof legalPages)[keyof typeof legalPages] }) => (
  <main className="min-h-screen bg-[#FBFBFD] font-sans text-[#1D1D1F] selection:bg-[#D4AF37] selection:text-white">
    <Navigation />
    <section className="pt-36 pb-24 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#424245] hover:text-[#1D1D1F] mb-10">
          <ArrowLeft className="w-4 h-4" />
          Wróć na stronę główną
        </a>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B]">{page.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03]">{page.title}</h1>
          <p className="mt-6 text-lg text-[#424245] font-light leading-relaxed">{page.intro}</p>
        </div>

        <article className="bg-white border border-gray-100 rounded-lg p-7 md:p-10 space-y-9">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[#424245] font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </section>
    <Footer />
  </main>
);

const Footer = () => (
  <footer className="bg-white text-[#1D1D1F] border-t border-gray-100 px-5 md:px-8">
    <div className="max-w-6xl mx-auto py-14 flex flex-col md:flex-row justify-between gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-5 h-5" />
          <span className="font-semibold tracking-tight text-sm uppercase">Pismo w Sprawie</span>
        </div>
        <p className="text-[#86868B] font-light max-w-md">
          Prawne wsparcie, precyzyjne pisma i spokojny proces współpracy.
        </p>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-[#424245]">
        <a href="/#uslugi" className="hover:text-[#1D1D1F]">Usługi</a>
        <a href="/#warunki" className="hover:text-[#1D1D1F]">Warunki</a>
        <a href="/#kontakt" className="hover:text-[#1D1D1F]">Kontakt</a>
        <a href={tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-[#1D1D1F]">TikTok</a>
      </div>
    </div>
    <div className="max-w-6xl mx-auto py-5 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#86868B]">
      <span>© Pismo w Sprawie</span>
      <div className="flex flex-wrap gap-4">
        <a href="/polityka-prywatnosci" className="hover:text-[#1D1D1F]">Polityka prywatności</a>
        <a href="/nota-prawna" className="hover:text-[#1D1D1F]">Nota prawna</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const legalPage = legalPages[currentPath as keyof typeof legalPages];

  if (legalPage) {
    return <LegalPage page={legalPage} />;
  }

  return (
    <main className="min-h-screen bg-[#FBFBFD] font-sans text-[#1D1D1F] selection:bg-[#D4AF37] selection:text-white">
      <Navigation />
      <Hero />
      <StorytellingSection />
      <ServicesSection />
      <CooperationSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <PolicySection />
      <Footer />
    </main>
  );
}
