import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Artwork, ExhibitionCategory } from '../types/gallery';
import { FILTERS } from '../data/artworks';
import { GalleryImage } from './GalleryImage';

interface Props {
  artworks: Artwork[];
  activeCategory: ExhibitionCategory;
  onSelectCategory: (category: ExhibitionCategory) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

// Explicit art direction: these placements correspond to actual individual works.
// This is intentionally NOT an index-based masonry template.
const positions: Record<string, string> = {
  'study-01': 'work--one', 'study-02': 'work--two', 'study-03': 'work--three',
  'study-04': 'work--four', 'study-05': 'work--five', 'study-06': 'work--six',
  'study-07': 'work--seven', 'study-08': 'work--eight', 'study-09': 'work--nine',
};

export function ArtworkGrid({ artworks, activeCategory, onSelectCategory, onSelectArtwork }: Props) {
  return <section id="works" className="works-section" aria-labelledby="works-title">
    <div className="section-topline" data-reveal><span>01 / Pictures</span><span>The collection</span></div>
    <div className="works-intro" data-reveal>
      <h2 id="works-title">A collection<br /><em>of moments.</em></h2>
      <p>Collected here for the way they hold a line, a shadow, a face, a bit of colour. Start anywhere.</p>
    </div>
    <div className="filter-wrap" aria-label="Filter artworks">
      <div className="filter-options">
        {FILTERS.map(({ id, label }) => <button
          key={id} type="button" onClick={() => onSelectCategory(id)}
          className={`filter-button ${activeCategory === id ? 'is-active' : ''}`}
          aria-pressed={activeCategory === id}
        >{label}</button>)}
      </div>
      <span className="filter-count">{String(artworks.length).padStart(2, '0')} images</span>
    </div>
    {artworks.length === 0 ? <p className="empty-gallery">Nothing in this group yet.</p> :
      <div className={`works-grid ${activeCategory !== 'ALL' ? 'works-grid--filtered' : ''}`}>
        {artworks.map((art, index) => <article key={art.id} className={`work ${positions[art.id] || ''}`} data-reveal>
          <button className={`artwork-trigger artwork-trigger--${art.shape}`} type="button" onClick={() => onSelectArtwork(art)} aria-label={`View ${art.title}`}>
            <GalleryImage src={art.imageUrl} alt={art.alt} className="work-photo" sizes="(max-width: 680px) 92vw, (max-width: 1020px) 70vw, 56vw" />
            <span className="open-art" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5}/></span>
          </button>
          <div className="work-caption"><div><span className="work-number">{String(index + 1).padStart(2,'0')}</span><h3>{art.title}</h3></div><span className="work-subtitle">{art.subtitle}</span></div>
        </article>)}
        {activeCategory === 'ALL' && <div className="grid-pause" data-reveal aria-hidden="true"><span>Look for longer.</span><span>There is no next thing to do.</span></div>}
      </div>}
  </section>;
}
