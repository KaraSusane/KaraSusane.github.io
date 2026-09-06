export type LegalPageData = {
  title: string;
  intro: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
};

export const legalPages: Record<string, LegalPageData> = {
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności',
    intro: 'Polityka prywatności strony internetowej Pismo w Sprawie.',
    sections: [
      {
        title: '§ 1. Administrator Danych Osobowych',
        paragraphs: [
          'Właścicielem strony internetowej i Administratorem Twoich danych osobowych jest Karolina Zdrojek, prowadząca nierejestrowaną działalność gospodarczą pod firmą PISMO W SPRAWIE.',
          'W sprawach związanych z ochroną danych osobowych możesz skontaktować się z Administratorem pod adresem e-mail: pismowsprawie@gmail.com.',
        ],
      },
      {
        title: '§ 2. Zakres i cel przetwarzania danych',
        paragraphs: [
          'Strona ma charakter informacyjny (tzw. wizytówka). Nie posiadamy formularzy kontaktowych, kont użytkowników ani nie wysyłamy newsletterów. Twoje dane przetwarzamy w minimalnym zakresie w dwóch przypadkach:',
          'Kontakt mailowy: gdy dobrowolnie do nas napiszesz, korzystając z adresu podanego na stronie, przetwarzamy Twoje dane (np. adres e-mail, imię i treść wiadomości) w celu udzielenia odpowiedzi na zapytanie lub przygotowania wyceny usług prawnych.',
          'Podstawa prawna: Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na komunikacji z potencjalnymi klientami).',
          'Logi serwera (dane techniczne): korzystanie ze strony wiąże się z przesyłaniem zapytań do serwera, na którym strona jest przechowywana. Każde zapytanie jest zapisywane w logach serwera (m.in. adres IP, data i czas serwera, informacje o przeglądarce internetowej i systemie operacyjnym).',
          'Dane te nie są kojarzone z konkretnymi osobami i są usuwane po upływie określonego czasu. Służą wyłącznie do celów administracyjnych i zapewnienia bezpieczeństwa działania strony.',
          'Podstawa prawna: Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).',
        ],
      },
      {
        title: '§ 3. Odbiorcy danych',
        paragraphs: ['Twoje dane mogą być przetwarzane przez podmioty zewnętrzne, które wspierają nas technicznie w prowadzeniu działalności. Są to wyłącznie: dostawca usług hostingowych (firma przechowująca pliki strony i obsługująca pocztę e-mail) oraz biuro rachunkowe (tylko w przypadku, gdy dojdzie do współpracy i wystawienia faktury).'],
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
        paragraphs: ['Zgodnie z RODO przysługuje Ci prawo do: dostępu do swoich danych oraz otrzymania ich kopii, sprostowania (poprawiania) swoich danych, usunięcia danych, ograniczenia przetwarzania danych, wniesienia sprzeciwu wobec przetwarzania danych oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeśli uznasz, że przetwarzanie narusza przepisy prawa.'],
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
        paragraphs: ['Polityka Prywatności jest na bieżąco weryfikowana i w razie potrzeby aktualizowana.', 'Data ostatniej aktualizacji: 09.08.2026'],
      },
    ],
  },
  '/nota-prawna': {
    title: 'Nota prawna i prawa autorskie',
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
  '/wazne-informacje': {
    title: 'Ważne informacje',
    intro: 'Najważniejsze zasady realizacji usługi.',
    sections: [
      { title: '§ 1. Dokumenty i informacje od klienta', paragraphs: ['Klient powinien przekazać prawdziwe, kompletne i aktualne informacje dotyczące sprawy. Treść przygotowanego dokumentu opiera się na materiałach otrzymanych od klienta. Jeżeli po wykonaniu usługi pojawią się nowe fakty, dokumenty albo okoliczności, mogą one wymagać dodatkowej analizy i odrębnej wyceny, a co za tym idzie zmiany terminów wykonywania usług.'] },
      { title: '§ 2. Płatność', paragraphs: ['Płatność następuje przed rozpoczęciem pracy nad zleceniem, chyba że strony ustalą inaczej. Rozpoczęcie realizacji usługi następuje po zaakceptowaniu wyceny, warunków współpracy oraz zaksięgowaniu płatności.'] },
      { title: '§ 3. Odstąpienie od umowy', paragraphs: ['Jeżeli klient jest konsumentem i zawiera umowę na odległość, co do zasady przysługuje mu prawo odstąpienia od umowy w terminie 14 dni. Jeżeli klient wyraźnie zgadza się na rozpoczęcie realizacji usługi przed upływem tego terminu, przyjmuje do wiadomości, że po pełnym wykonaniu usługi może utracić prawo odstąpienia od umowy w zakresie wykonanej usługi.'] },
      { title: '§ 4. Poufność i dane', paragraphs: ['Informacje oraz dokumenty przekazane przez klienta są traktowane poufnie i wykorzystywane wyłącznie w celu realizacji zlecenia. Dane osobowe są przetwarzane w zakresie niezbędnym do kontaktu z klientem, wykonania usługi, rozliczenia płatności oraz obsługi ewentualnych reklamacji.'] },
      { title: '§ 5. Terminy', paragraphs: ['Termin realizacji ustalany jest indywidualnie przed rozpoczęciem pracy. Standardowy czas przygotowania prostego pisma wynosi zwykle od 2 do 3 dni roboczych, chyba że strony ustalą inaczej. W sprawach pilnych możliwa jest szybsza realizacja po wcześniejszym potwierdzeniu dostępności. Usługa ekspresowa może wiązać się z dodatkową opłatą.'] },
      { title: '§ 6. Korekty', paragraphs: ['W cenie usługi zawarta jest jedna korekta, jeżeli dotyczy tego samego zakresu sprawy i nie wymaga analizy nowych dokumentów ani nowych okoliczności. Zmiana koncepcji pisma, rozszerzenie zlecenia albo dodanie nowych wątków może wymagać dodatkowej wyceny.'] },
      { title: '§ 7. Reklamacje', paragraphs: ['Reklamację można zgłosić mailowo na adres: pismowsprawie@gmail.com. W zgłoszeniu należy opisać, czego dotyczy reklamacja oraz wskazać numer zamówienia albo dane pozwalające zidentyfikować zlecenie. Odpowiedź na reklamację zostanie udzielona w terminie 14 dni od dnia jej otrzymania.'] },
      { title: '§ 8. Uwagi', paragraphs: ['Dokumenty wyceniane są indywidualnie. Każde zlecenie przyjmujemy po wcześniejszym sprawdzeniu zakresu sprawy, terminu oraz możliwości rzetelnego wykonania usługi. Przesłanie wiadomości nie oznacza przyjęcia zlecenia. Zlecenie zostaje przyjęte dopiero po potwierdzeniu zakresu usługi, ceny, terminu realizacji oraz po dokonaniu płatności zgodnie z ustaleniami. Usługa nie obejmuje gwarancji określonego rozstrzygnięcia sprawy. Przygotowanie pisma lub analiza dokumentu następuje na podstawie informacji i materiałów przekazanych przez klienta. Podane ceny są cenami minimalnymi. Ostateczna cena zależy od rodzaju sprawy, objętości materiałów, stopnia skomplikowania problemu oraz terminu realizacji.'] },
    ],
  },
};
