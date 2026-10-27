import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import type { Artwork } from '../types/gallery';

interface Props { artworks: Artwork[]; onSelectArtwork: (a: Artwork) => void; }
export function GalleryFooter({ artworks, onSelectArtwork }: Props) {
  return <>
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="section-topline" data-reveal><span>03 / A note</span><span>Behind this page</span></div>
      <div className="about-body">
        <h2 id="about-heading" data-reveal>Just a space<br/>to <em>look.</em></h2>
        <div className="about-copy" data-reveal>
          <p>The Unframed is a small digital gallery concept. It is built around the idea that a picture can hold its own without a lot of explanation.</p>
          <p>This demo uses photographs already referenced in the original project. The editorial titles are sample labels, not verified artwork attributions. Add your own photographs and real credits before publishing it as an artist's portfolio.</p>
          <a href="#index" className="text-link">Explore the full index <ArrowUpRight size={18} strokeWidth={1.5}/></a>
        </div>
      </div>
    </section>
    <footer className="footer" id="index" aria-labelledby="index-title">
      <div className="footer-head"><div><span>04 / Index</span><h2 id="index-title">Every image,<br/><em>in one place.</em></h2></div><span className="footer-head-side">A quick way back to anything you liked.</span></div>
      <div className="index-list">
        {artworks.map((art, index) => <button type="button" className="index-item" key={art.id} onClick={() => onSelectArtwork(art)}>
          <span>{String(index + 1).padStart(2, '0')}</span><span>{art.title}</span><span>{art.category.toLowerCase()}</span><ArrowUpRight size={19} strokeWidth={1.35} aria-hidden="true"/>
        </button>)}
      </div>
      <div className="footer-bottom"><a href="#top" className="footer-logo">the unframed<span>.</span></a><span>Independent image studies · Concept edition</span><a className="back-to-top" href="#top">Back to top <ArrowUp size={15}/></a></div>
    </footer>
  </>;
}
