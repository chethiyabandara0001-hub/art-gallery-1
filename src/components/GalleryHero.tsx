import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { Artwork } from '../types/gallery';
import { GalleryImage } from './GalleryImage';

interface Props { image: Artwork; onSelectArtwork: (artwork: Artwork) => void; }
export function GalleryHero({ image, onSelectArtwork }: Props) {
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="hero-kicker">An independent image collection <span>—</span> Vol. 01</div>
    <div className="hero-body">
      <div className="hero-type">
        <h1 id="hero-heading">A place<br />for <em>looking.</em></h1>
        <p>No rush. No fixed route. Just pictures worth spending a little time with.</p>
        <a className="text-link hero-explore" href="#works">Browse the collection <ArrowDownRight size={19} strokeWidth={1.5} /></a>
      </div>
      <button type="button" className="hero-visual" onClick={() => onSelectArtwork(image)} aria-label={`Open image: ${image.title}`}>
        <GalleryImage src={image.imageUrl} alt={image.alt} loading="eager" className="hero-photo" sizes="(max-width: 800px) 95vw, 54vw" />
        <span className="hero-image-link" aria-hidden="true"><ArrowUpRight size={21} strokeWidth={1.4} /></span>
      </button>
    </div>
    <div className="hero-baseline"><span>Independent image studies</span><span className="hero-base-center">Made to be viewed slowly</span><span>Scroll to see more <ArrowDownRight size={14}/></span></div>
  </section>;
}
