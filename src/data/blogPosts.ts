import type { BlogPost } from '../types';
import { autoPoZakupie } from './autoPoZakupie';
import { najtaniejJestWyrwac } from './najtaniejJestWyrwac';
import { rodoWPraktyce } from './rodoWPraktyce';
import { intymnoscIGodnosc } from './intymnoscIGodnosc';
import { jakNapisacPismo } from './jakNapisacPismo';
import { wezwanieDoZaplaty } from './wezwanieDoZaplaty';

export const blogPosts: BlogPost[] = [
  wezwanieDoZaplaty,
  jakNapisacPismo,
  intymnoscIGodnosc,
  rodoWPraktyce,
  autoPoZakupie,
  najtaniejJestWyrwac,
  {
    slug: 'klauzula-sumienia-lekarza-kiedy-mozna-odmowic-wykonania-swiadczenia',
    title: 'Klauzula sumienia lekarza. Kiedy można odmówić wykonania świadczenia?',
    seoTitle: 'Klauzula sumienia lekarza - kiedy można odmówić świadczenia',
    excerpt:
      'Kiedy lekarz może powołać się na klauzulę sumienia, gdzie przebiega granica w stanie nagłym i jakie formalności powinien zachować.',
    category: 'Prawo medyczne',
    readTime: '5 min',
    publishedAt: '2026-08-24',
    updatedAt: '2026-10-11',
    keywords: [
      'klauzula sumienia lekarza',
      'odmowa wykonania świadczenia',
      'prawo medyczne',
      'obowiązek udzielenia pomocy',
      'art. 39 ustawy o zawodach lekarza',
    ],
    coverImage: '/klauzula-sumienia-lekarza.jpg',
    coverWidth: 1280,
    coverHeight: 889,
    coverAlt: 'Lekarki w białych fartuchach ze stetoskopami',
  },
  {
    slug: 'dziedziczenie-ustawowe-kto-dostaje-spadek-gdy-nie-ma-testamentu',
    title: 'Dziedziczenie ustawowe. Kto dostaje spadek, gdy nie ma testamentu?',
    seoTitle: 'Dziedziczenie ustawowe - kto dziedziczy bez testamentu?',
    excerpt:
      'Kto dziedziczy po zmarłym bez testamentu, jak dzieli się spadek między małżonka, dzieci i rodziców oraz co dzieje się z mieszkaniem należącym do małżonków.',
    category: 'Prawo spadkowe',
    readTime: '8 min',
    publishedAt: '2026-08-16',
    updatedAt: '2026-10-11',
    keywords: [
      'dziedziczenie ustawowe',
      'kto dziedziczy bez testamentu',
      'kolejność dziedziczenia',
      'spadek po małżonku',
      'podział spadku',
    ],
    coverImage: '/dziedziczenie-ustawowe.jpg',
    coverWidth: 1280,
    coverHeight: 853,
    coverAlt: 'Dwie osoby obejmujące się podczas żałoby na cmentarzu',
  },
  {
    slug: 'mediacja-a-sprawa-w-sadzie-dwie-drogi-rozwiazywania-sporu',
    title: 'Mediacja a sprawa w sądzie. Dwie drogi rozwiązywania sporu',
    excerpt:
      'Czym mediacja różni się od postępowania sądowego, jaką rolę pełni mediator i jakie skutki może mieć ugoda mediacyjna.',
    category: 'Mediacje',
    readTime: '6 min',
    publishedAt: '2026-08-13',
    updatedAt: '2026-10-11',
    keywords: [
      'mediacja a sprawa w sądzie',
      'mediacja cywilna',
      'ugoda mediacyjna',
      'mediator',
      'rozwiązywanie sporów',
    ],
    coverImage: '/mediacja-a-sprawa-w-sadzie.jpg',
    coverWidth: 1280,
    coverHeight: 853,
    coverAlt: 'Dłoń dopasowująca biały element układanki na drewnianym stole',
  },
  {
    slug: 'prawo-pierwokupu-kowr-przy-sprzedazy-nieruchomosci-rolnej',
    title: 'Prawo pierwokupu KOWR przy sprzedaży nieruchomości rolnej',
    excerpt:
      'Kiedy KOWR może skorzystać z prawa pierwokupu ziemi rolnej, jak przebiega sprzedaż i jakie ryzyko wiąże się z pominięciem wymaganej procedury.',
    category: 'Prawo rolne',
    readTime: '5 min',
    publishedAt: '2026-08-10',
    updatedAt: '2026-10-11',
    keywords: [
      'prawo pierwokupu KOWR',
      'sprzedaż nieruchomości rolnej',
      'sprzedaż ziemi rolnej',
      'warunkowa umowa sprzedaży',
    ],
    coverImage: '/prawo-pierwokupu-kowr.jpg',
    coverWidth: 1280,
    coverHeight: 851,
    coverAlt: 'Pole ze zbożem i belami siana',
  },
];
