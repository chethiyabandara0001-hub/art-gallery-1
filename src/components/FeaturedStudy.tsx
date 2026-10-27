import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Artwork } from '../types/gallery';
import { GalleryImage } from './GalleryImage';

interface Props { artwork: Artwork; onSelectArtwork: (art: Artwork) => void; }
export function FeaturedStudy({ artwork, onSelectArtwork }: Props) {
  return <section className="feature" aria-labelledby="feature-heading">
    <div className="feature-inner">
      <div className="feature-image-col" data-reveal>
        <button type="button" className="feature-image-button" onClick={() => onSelectArtwork(artwork)} aria-label={`Look more closely at ${artwork.title}`}>
          <GalleryImage src={artwork.imageUrl} alt={artwork.alt} className="feature-photo" sizes="(max-width: 850px) 95vw, 55vw" />
          <span className="open-art" aria-hidden="true"><ArrowUpRight size={18}/></span>
        </button>
        <span className="feature-img-caption">A closer look &nbsp; / &nbsp; {artwork.title}</span>
      </div>
      <div className="feature-copy" data-reveal>
        <span className="feature-small">02 / Pause here</span>
        <h2 id="feature-heading">Some things<br/>are better<br/><em>seen twice.</em></h2>
        <p>There's no audio guide and no correct way to look. You can just stay with one picture for a minute.</p>
        <button type="button" className="text-link feature-link" onClick={() => onSelectArtwork(artwork)}>View the photograph <ArrowUpRight size={18} strokeWidth={1.4}/></button>
      </div>
    </div>
  </section>;
}
