import type { ImgHTMLAttributes } from 'react';
import { responsiveImages } from '../data/responsiveImages';

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

export function ResponsiveImage({ src, sizes = '100vw', ...props }: Props) {
  const image = responsiveImages[src];
  if (!image) return <img src={src} {...props} />;
  return <picture className="contents"><source type="image/webp" srcSet={image.srcSet} sizes={sizes} /><img src={src} {...props} /></picture>;
}
