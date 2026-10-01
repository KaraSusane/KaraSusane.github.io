const imageDimensions: Record<string, [number, number]> = {
  '/karolina-zdrojek.jpg': [1086, 1448],
  '/auto-po-zakupie-okazalo-sie-mina.jpeg': [1280, 853],
  '/dziedziczenie-ustawowe.jpg': [1800, 1200],
  '/klauzula-sumienia-lekarza.jpg': [1280, 889],
  '/mediacja-a-sprawa-w-sadzie.jpg': [1800, 1200],
  '/najtaniej-jest-wyrwac.jpg': [1280, 717],
  '/prawo-pierwokupu-kowr.jpg': [1280, 851],
};

export function SiteImage({ src, alt, className, priority = false, sizes = '100vw' }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const dimensions = imageDimensions[src];
  const webp = dimensions ? src.replace(/\.jpe?g$/, '.webp') : src;
  return <img src={webp} alt={alt} className={className} width={dimensions?.[0]} height={dimensions?.[1]} srcSet={dimensions ? `${webp.replace('.webp', '-640.webp')} 640w, ${webp} ${dimensions[0]}w` : undefined} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}
