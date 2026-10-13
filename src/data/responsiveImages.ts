const variants = (name: string, width: number) => ({
  srcSet: [480, 960, width].filter((value, index, values) => value <= width && values.indexOf(value) === index).map(value => `/images/${name}-${value}.webp ${value}w`).join(', '),
});

export const responsiveImages: Record<string, { srcSet: string }> = {
  '/karolina-zdrojek.jpg': variants('karolina-zdrojek', 1086),
  '/intymnosc-i-godnosc-w-szpitalu.jpeg': variants('intymnosc-i-godnosc-w-szpitalu', 1280),
  '/rodo-w-praktyce.jpeg': variants('rodo-w-praktyce', 1280),
  '/auto-po-zakupie-okazalo-sie-mina.jpeg': variants('auto-po-zakupie-okazalo-sie-mina', 1280),
  '/najtaniej-jest-wyrwac.jpg': variants('najtaniej-jest-wyrwac', 1280),
  '/klauzula-sumienia-lekarza.jpg': variants('klauzula-sumienia-lekarza', 1280),
  '/dziedziczenie-ustawowe.jpg': variants('dziedziczenie-ustawowe', 1800),
  '/mediacja-a-sprawa-w-sadzie.jpg': variants('mediacja-a-sprawa-w-sadzie', 1800),
  '/prawo-pierwokupu-kowr.jpg': variants('prawo-pierwokupu-kowr', 1280),
};
