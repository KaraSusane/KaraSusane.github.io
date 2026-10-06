import type { BlogPost } from '../types';

export const rodoWPraktyce: BlogPost = {
  slug: '10-bledow-stosowania-przepisow-rodo-w-praktyce',
  title: '10 błędów stosowania przepisów RODO w praktyce.',
  excerpt:
    '10 częstych błędów w stosowaniu RODO: zgody klientów, obowiązek informacyjny, dane wrażliwe, bezpieczeństwo bazy danych i marketing.',
  category: 'Ochrona danych osobowych',
  readTime: '13 min',
  publishedAt: '2026-10-05',
  keywords: [
    'RODO w praktyce',
    'błędy stosowania RODO',
    'zgoda na przetwarzanie danych',
    'ochrona danych osobowych',
    'obowiązek informacyjny',
    'dane wrażliwe',
    'marketing bezpośredni',
  ],
  coverImage: '/rodo-w-praktyce.jpeg',
  coverWidth: 1280,
  coverHeight: 853,
  coverAlt: 'Stanowisko komputerowe z monitorami wyświetlającymi dane i mapę świata',
  content: `## Zgoda klienta nie jest magicznym zaklęciem.

Wielu przedsiębiorców myśli o RODO (Rozporządzenia o Ochronie Danych Osobowych) w bardzo prosty sposób: „dam klientowi checkbox, klient kliknie zgodę i jestem bezpieczny, mogę wszystko”. Brzmi wygodnie, ale prawnie jest to jeden z najczęstszych błędów. Zgoda klienta nie zawsze jest potrzebna. Czasem jest nieważna. Czasem wprowadza klienta w błąd. A czasem daje firmie fałszywe poczucie bezpieczeństwa, bo przedsiębiorca skupia się na samym checkboxie, zamiast na całym procesie przetwarzania danych.

RODO nie polega na tym, żeby na wszystko zbierać zgodę. RODO polega na tym, żeby wiedzieć, **po co firma przetwarza dane, na jakiej podstawie, przez jaki czas, komu je przekazuje, jak je zabezpiecza i czy klient rzeczywiście rozumie, co dzieje się z jego danymi**. Zgoda jest tylko jedną z możliwych podstaw przetwarzania danych osobowych, obok między innymi wykonania umowy, obowiązku prawnego albo prawnie uzasadnionego interesu administratora. Art. 6 RODO przewiduje kilka podstaw zgodności przetwarzania z prawem, a nie jedną uniwersalną zgodę na wszystko.

## Pierwszy błąd: firma zbiera zgodę tam, gdzie zgoda nie jest wcale potrzebna.

Najbardziej klasyczny przykład to sklep internetowy. Klient kupuje produkt i podaje imię, nazwisko, adres dostawy, numer telefonu, adres e-mail oraz dane do faktury. Czy sklep musi mieć zgodę klienta na przetwarzanie tych danych, żeby zrealizować zamówienie? Co do zasady nie. Przetwarzanie danych jest wtedy potrzebne do zawarcia i wykonania umowy. Bez adresu sklep nie wyśle paczki. Bez danych do faktury nie wykona obowiązków podatkowych. Bez danych kontaktowych może nie obsłużyć zamówienia.

Jeżeli w takiej sytuacji firma pyta klienta o zgodę na przetwarzanie danych „w celu realizacji zamówienia”, tworzy się problem. Klient może pomyśleć, że gdy cofnie zgodę, sklep musi usunąć wszystkie dane, nawet te, które musi przechowywać ze względu na przepisy księgowe, podatkowe albo dowodowe? UODO wskazuje, że pozyskiwanie zgody w sytuacji, gdy administrator ma inną podstawę przetwarzania, może prowadzić do naruszenia zasady przejrzystości i rzetelności z art. 5 ust. 1 lit. a RODO.

**Nadmiar zgód nie wzmacnia firmy.** Jeżeli firma sama komunikuje klientowi, że podstawą przetwarzania jest zgoda, musi potem liczyć się z konsekwencjami tej konstrukcji, w tym z prawem do jej cofnięcia.

## Drugi błąd: zgoda nie jest dobrowolna.

Zgoda w RODO musi być dobrowolna, konkretna, świadoma i jednoznaczna. Tak wynika z definicji zgody oraz z wyjaśnień UODO. Problem zaczyna się wtedy, gdy firma mówi klientowi: „wyraź zgodę, bo inaczej nie wykonamy usługi”, mimo że zgoda dotyczy czegoś, co nie jest konieczne do tej usługi.

Przykład: klient zapisuje się na wizytę w gabinecie kosmetologicznym. Do umówienia wizyty potrzebne są dane identyfikacyjne i kontaktowe. Ale zgoda na otrzymywanie newslettera, promocji, SMS-ów marketingowych albo publikację zdjęcia „przed i po” nie jest konieczna do wykonania zabiegu. Jeżeli firma uzależnia usługę od zgody marketingowej albo wizerunkowej, można mieć poważne wątpliwości, czy taka zgoda jest wtedy dobrowolną.

Dobrowolność nie oznacza, że klient kliknął checkbox. Dobrowolność oznacza, że klient miał realny wybór. Mógł odmówić bez negatywnych konsekwencji. Mógł skorzystać z usługi bez zgody na cele poboczne. Mógł zrozumieć, że jedno nie jest warunkiem drugiego.

## Trzeci błąd: jedna zgoda na wszystko.

Kolejny problem to tzw. przeze mnie roboczo „zgody zbiorcze”. Firma pisze: „Wyrażam zgodę na przetwarzanie moich danych osobowych w celach kontaktowych, marketingowych, handlowych, analitycznych, statystycznych oraz w celu otrzymywania informacji o produktach i usługach partnerów”. Dla przedsiębiorcy brzmi wygodnie, bo załatwia wiele tematów jednym kliknięciem. Dla użycia RODO to może być problem, bo zgoda powinna być konkretna.

Klient powinien wiedzieć, na co dokładnie się zgadza. Inaczej wygląda zgoda na odpowiedź na formularz kontaktowy. Inaczej zgoda na newsletter. Inaczej zgoda na SMS czy mail marketingowy. Inaczej zgoda na telefon sprzedażowy. Inaczej zgoda na przekazanie danych partnerom handlowym. Inaczej zgoda na publikację wizerunku.

Art. 7 RODO wymaga, aby administrator mógł wykazać, że osoba, której dane dotyczą, wyraziła zgodę. Jeżeli zgoda jest częścią większego oświadczenia, zapytanie o zgodę musi być przedstawione w sposób pozwalający wyraźnie odróżnić je od innych kwestii, w zrozumiałej i łatwo dostępnej formie, jasnym i prostym językiem.

Dlatego checkbox „zgadzam się na wszystko” bywa bardziej ryzykowny niż brak checkboxa. Taka zgoda może nie pokazywać, czego klient naprawdę chciał. A w razie sporu firma musi wykazać nie tylko to, że ktoś kliknął, ale również to, **co dokładnie kliknął, kiedy, w jakim celu i po jakiej informacji**.

## Czwarty błąd: firma myli RODO z marketingiem.

RODO odpowiada na pytanie, czy firma ma podstawę do przetwarzania danych osobowych. Ale marketing elektroniczny i telefoniczny ma jeszcze dodatkowe przepisy. Od 10 listopada 2024 r. istotne znaczenie ma Prawo komunikacji elektronicznej. Art. 398 PKE zakazuje używania automatycznych systemów wywołujących albo telekomunikacyjnych urządzeń końcowych do przesyłania informacji handlowej, w tym marketingu bezpośredniego, chyba że abonent albo użytkownik końcowy uprzednio wyraził na to zgodę.

To oznacza, że firma może mieć podstawę z RODO do przechowywania danych klienta, ale to jeszcze nie oznacza, że może do niego dzwonić z ofertą albo wysyłać SMS-y marketingowe. UOKiK wprost podkreśla zasadę: najpierw konsument musi wyrazić zgodę na kontakt.

Praktycznie wygląda to tak: klient kupił produkt w sklepie internetowym. Sklep może przetwarzać jego dane w zakresie potrzebnym do realizacji umowy, rozliczenia, obsługi reklamacji czy obrony roszczeń. Ale wykorzystanie numeru telefonu do marketingu to już inny cel i inny reżim. Nie wystarczy powiedzieć: „przecież klient podał numer”. Podał numer do dostawy, kontaktu z kurierem albo obsługi zamówienia, a nie automatycznie do późniejszego bombardowania go ofertami.

## Piąty błąd: zgoda bez obowiązku informacyjnego.

Zgoda nie zastępuje obowiązku informacyjnego. To, że klient kliknął checkbox, nie oznacza, że firma może pominąć klauzulę informacyjną. Art. 12 RODO wymaga, aby administrator przekazywał informacje w zwięzłej, przejrzystej, zrozumiałej i łatwo dostępnej formie, jasnym i prostym językiem. Art. 13 RODO określa informacje, które trzeba przekazać, gdy dane są zbierane od osoby, której dotyczą, w tym między innymi tożsamość administratora, cele przetwarzania, podstawy prawne, odbiorców danych, okres przechowywania i prawa osoby, której dane dotyczą.

W praktyce wiele firm traktuje politykę prywatności jak dokument „do odhaczenia”. Jest długa, niezrozumiała, skopiowana z internetu i niepasująca do realnego biznesu. Klient ma kliknąć, nie czytać. Tylko że RODO nie wymaga dokumentu dla samego dokumentu. Wymaga przejrzystej informacji.

Jeżeli firma faktycznie używa danych do newslettera, remarketingu, CRM, analityki, systemu rezerwacji, zewnętrznej księgowości, hostingu, płatności online i narzędzi AI, to klient powinien otrzymać uczciwą informację o tym, co dzieje się z jego danymi. Sama zgoda nie przykrywa chaosu informacyjnego.

## Szósty błąd: zgoda na dane wrażliwe zaznaczona bez zrozumienia.

Jeszcze poważniejszy problem pojawia się przy danych szczególnych kategorii, potocznie nazywanych danymi wrażliwymi. Chodzi między innymi o dane dotyczące zdrowia, dane biometryczne, dane genetyczne, informacje o poglądach politycznych, religii, orientacji seksualnej czy przynależności do związków zawodowych. Art. 9 RODO wprowadza zasadę zakazu przetwarzania takich danych, chyba że zachodzi jeden z wyjątków przewidzianych w tym przepisie.

To ważne dla gabinetów medycznych, kosmetologicznych, dietetycznych, fizjoterapeutycznych, psychologicznych, klinik medycyny estetycznej, trenerów personalnych i aplikacji zdrowotnych. Jeżeli klient wpisuje w formularzu informacje o chorobach, lekach, alergiach, ciąży, przeciwwskazaniach, przebytych zabiegach albo stanie skóry, firma nie przetwarza już zwykłego imienia i numeru telefonu. Wchodzi w dane o zdrowiu.

Wtedy ten checkbox/miejsce na dokonanie podpisu pod „wyrażam zgodę na przetwarzanie danych” nie może być przypadkowe. Trzeba wiedzieć, czy zgoda jest właściwą podstawą, czy przetwarzanie wynika z przepisów dotyczących świadczeń zdrowotnych, czy dane są niezbędne, kto ma do nich dostęp, jak długo będą przechowywane i czy podmiot potrafi je zabezpieczyć. Przy danych zdrowotnych błąd nie jest tylko formalny. Może naruszać intymność, prywatność i poczucie bezpieczeństwa pacjenta albo klienta.

## Siódmy błąd: zgoda za zgodą, a nadmiar danych.

Firma może mieć zgodę, a mimo to naruszać RODO, bo zbiera zbyt dużo danych. Art. 5 RODO przewiduje podstawowe zasady przetwarzania danych, w tym minimalizację danych, ograniczenie celu, prawidłowość, ograniczenie przechowywania oraz integralność i poufność. Dane powinny być adekwatne, stosowne i ograniczone do tego, co niezbędne do celów, w których są przetwarzane.

Przykład: salon beauty do zapisu na manicure hybrydowy żąda numeru PESEL. Sklep internetowy do wysyłki kubka żąda daty urodzenia. Newsletter wymaga adresu zamieszkania. Formularz kontaktowy do prostego pytania w portalu pracowym wymaga przesłania skanu dowodu osobistego. Firma może powiedzieć: „klient wyraził zgodę”. Ale zgoda nie zawsze legitymizuje zbieranie danych, które nie są potrzebne.

Właśnie w takich momentach RODO zapytuje: po co ci te dane? Czy naprawdę ich potrzebujesz? Czy celu nie da się osiągnąć mniej inwazyjnie? Czy klient wie, dlaczego je podaje? Czy przechowujesz je krócej, niż to konieczne?

Zgoda nie jest przepustką do zbierania wszystkiego „jak leci” i „na wszelki wypadek”.

## Ósmy błąd: wyrażenie zgody nie zastępuje bezpieczeństwa bazy danych.

Firma może mieć prawidłową zgodę, dobrą klauzulę informacyjną i sensowną podstawę prawną, a mimo to naruszyć RODO przez brak wystarczających zabezpieczeń. Dane klientów zapisane w Excelu na prywatnym komputerze pracownika lub w chmurze. Hasło do systemu rezerwacji na kartce przy monitorze. Wspólny login dla całego zespołu. Wysyłka maila do wielu klientów w polu „DW” zamiast „UDW”. Brak umowy powierzenia z firmą obsługującą hosting, newsletter albo system rezerwacji.

To są sytuacje, w których problemem nie jest sama zgoda. Problemem jest organizacja procesu. Jeżeli zewnętrzny podmiot przetwarza dane w imieniu administratora, zastosowanie może mieć art. 28 RODO dotyczący powierzenia przetwarzania danych. UODO wskazuje, że podmiot przetwarzający działa w imieniu administratora i przetwarza dane wyłącznie na udokumentowane polecenie administratora.

## Dziewiąty błąd: firma zapomina, że zgodę można wycofać.

Zgoda ma jeszcze jedną cechę, o której przedsiębiorcy często zapominają: można ją wycofać. Art. 7 RODO stanowi, że osoba, której dane dotyczą, ma prawo w dowolnym momencie wycofać zgodę, a wycofanie zgody musi być równie łatwe jak jej wyrażenie. Wycofanie nie wpływa na zgodność z prawem przetwarzania dokonanego przed wycofaniem.

To oznacza, że jeżeli newsletter można włączyć jednym kliknięciem, to wypisanie się nie powinno wymagać wysyłania pisma, dzwonienia na infolinię, logowania do pięciu paneli albo tłumaczenia się z decyzji. Jeżeli firma opiera proces na zgodzie, musi być gotowa na jej wycofanie.

I tu wracamy do podstaw: jeżeli firma niepotrzebnie oparła na zgodzie coś, co powinna oprzeć na umowie, obowiązku prawnym albo uzasadnionym interesie, sama stworzyła problem. Klient cofnie zgodę, a firma nie wie, co dalej. Czy usuwać konto? Czy usuwać faktury? Czy kasować historię zamówień? Czy przestać obsługiwać reklamację? Chaos wynika z błędnie dobranej podstawy prawnej.

## Dziesiąty błąd: polityka prywatności z internetu.

Wiele małych firm działa na dokumentach skopiowanych z internetu. Regulamin od kogoś z branży. Polityka prywatności z generatora lub modelu językowego. Checkbox z innej strony. Klauzula informacyjna od konkurencji. Problem polega na tym, że RODO jest mocno procesowe i indywidualne. Dokument ma opisywać rzeczywistość, a nie udawać, że rzeczywistość wygląda jak dokument.

Jeżeli firma w polityce prywatności pisze, że nie przekazuje danych poza Europejski Obszar Gospodarczy, a jednocześnie korzysta z narzędzi analitycznych, reklamowych, mailingowych albo chmurowych powiązanych z dostawcami spoza EOG, dokument w prost może być nieprawdziwy. Jeżeli pisze, że przechowuje dane „do czasu cofnięcia zgody”, ale w praktyce trzyma je bezterminowo, również tworzy problem. Jeżeli pisze, że klient może łatwo usunąć dane, ale nikt w firmie nie wie, jak obsłużyć takie żądanie, to jest pozór zgodności.

## Przykład pierwszy: sklep internetowy i checkbox na realizację zamówienia.

Sklep internetowy dodaje przy koszyku checkbox: „Wyrażam zgodę na przetwarzanie danych osobowych w celu realizacji zamówienia”. Klient bez zaznaczenia checkboxa nie może kupić produktu. Na pierwszy rzut oka wygląda to bezpiecznie, wystarczy po prostu kliknąć. W praktyce jest to wątpliwe. Realizacja zamówienia opiera się zasadniczo na wykonaniu umowy, a nie na zgodzie. Jeżeli sklep pyta o zgodę, sugeruje klientowi, że może ją cofnąć i zablokować przetwarzanie danych potrzebnych do wykonania umowy albo obowiązków prawnych.

Lepsze prawnie jest rozdzielenie celów. Dane potrzebne do zamówienia są przetwarzane w celu wykonania umowy. Dane do faktury w celu wykonania obowiązków prawnych. Dane do newslettera na podstawie odrębnej zgody, jeżeli sklep chce taką zgodę zastosować. Dane do obrony przed roszczeniami mogą opierać się na prawnie uzasadnionym interesie. Każdy cel powinien mieć własną logikę.

## Przykład drugi: gabinet beauty i zdjęcia „przed i po”.

Gabinet kosmetologiczny wykonuje zdjęcia twarzy klientki przed i po zabiegu. Część zdjęć jest niezbędna i służy dokumentacji przebiegu terapii, a część ma trafić na Instagram jako efekt zabiegu, co nie jest konieczne. To nie jest jeden cel. Dokumentacja procesu, ocena efektów, ochrona przed roszczeniami i publikacja marketingowa to różne sytuacje prawne i zupełnie różne wykorzystanie danych.

Największy błąd polega na wrzuceniu wszystkiego do jednego zdania: „wyrażam zgodę na wykonywanie zdjęć i ich wykorzystanie”. Klientka może zgodzić się na wykonanie zdjęć do dokumentacji zabiegu, ale nie zgodzić się na publikację w social mediach. Może zgodzić się na publikację bez twarzy, ale nie zgodzić się na oznaczenie profilu. Może zgodzić się dziś, a potem zgodę cofnąć w zakresie dalszego rozpowszechniania.

Wizerunek, dane o stanie skóry, informacje o zabiegach i efekty terapii mogą dotykać prywatności znacznie bardziej niż zwykły adres e-mail. Im bardziej intymny kontekst, tym mniej miejsca na uogólnianie zgód.

## Przykład trzeci: newsletter, który miał być informacją, a stał się sprzedażą.

Firma zbiera adresy e-mail przez formularz „pobierz darmowy poradnik”. Klient wpisuje e-mail, pobiera materiał, a potem zaczyna dostawać regularne oferty sprzedażowe, zaproszenia na webinary, promocje partnerów i SMS-y. Firma mówi: „przecież podał e-mail”. Tylko że podanie e-maila w celu otrzymania konkretnego pliku nie jest automatycznie zgodą na każdy przyszły marketing.

Przy komunikacji marketingowej trzeba odróżnić podstawę przetwarzania danych w RODO od zgody wymaganej przepisami Prawa komunikacji elektronicznej. Art. 398 PKE wprost odnosi się do przesyłania informacji handlowej, w tym marketingu bezpośredniego, przy użyciu określonych narzędzi komunikacji. Dlatego formularz powinien jasno oddzielać pobranie materiału od zapisu na marketing. Klient w ten sposób nie powinien być łapany w pułapkę: „pobierz poradnik”, a drobnym drukiem „zgadzasz się na wszystko do końca świata”.

## Dlaczego to wszystko ma znaczenie?

Bo RODO bardzo często wywraca się nie na wielkich cyberatakach, tylko na codziennej bylejakości. Na źle nazwanym celu. Na zgodzie wrzuconej wszędzie. Na formularzu, który zbiera za dużo danych. Na polityce prywatności, która nie odpowiada rzeczywistości. Na newsletterze bez realnego wypisu. Na braku umowy z dostawcą narzędzia. Na pracowniku, który nie wie, komu może wysłać bazę klientów.

Administracyjne kary pieniężne w RODO mają być skuteczne, proporcjonalne i odstraszające. W określonych przypadkach naruszenia mogą podlegać karze do 20 000 000 euro, a w przypadku przedsiębiorstwa do 4% całkowitego rocznego światowego obrotu z poprzedniego roku obrotowego, przy czym stosuje się kwotę wyższą. Nie chodzi jednak tylko o karę. Chodzi o reputację, utratę zaufania klientów, skargi, kontrole, roszczenia i chaos organizacyjny.

Dane osobowe są dziś częścią relacji z klientem. Klient powierza firmie swój adres, numer telefonu, historię zakupów, problemy zdrowotne, zdjęcia, preferencje, lokalizację, wiadomości prywatne albo dane płatnicze. Firma, która traktuje RODO jak zbiór checkboxów, niezbędnych do zabezpieczenia tej firmy pokazuje klientowi, że nie rozumie wagi tej relacji.

*Niniejszy artykuł ma charakter informacyjny i nie stanowi porady prawnej.*

*Autor: mgr prawa Karolina Zdrojek*

## Bibliografia i podstawy prawne

- Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE, ogólne rozporządzenie o ochronie danych, Dz.Urz. UE L 119 z 4.05.2016, s. 1, ze sprost
- Ustawa z dnia 12 lipca 2024 r. Prawo komunikacji elektronicznej (Dz.U. z 2024 r. poz. 1221 ze zm.).
- [magnific.com](https://www.magnific.com)`,
};
