import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, Plus, Minus } from 'lucide-react';
import type { Artwork } from '../types/gallery';
import { GalleryImage } from './GalleryImage';

interface Props { artwork: Artwork | null; artworks: Artwork[]; onClose: () => void; onNavigate: (a: Artwork) => void; }
export function ArtworkViewer({ artwork, artworks, onClose, onNavigate }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const index = artwork ? artworks.findIndex((item) => item.id === artwork.id) : -1;
  const go = useCallback((direction: number) => {
    if (index < 0 || !artworks.length) return;
    setZoomed(false);
    onNavigate(artworks[(index + direction + artworks.length) % artworks.length]);
  }, [index, artworks, onNavigate]);

  useEffect(() => {
    if (!artwork) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; previousFocus.current?.focus(); };
  }, [Boolean(artwork)]);

  useEffect(() => {
    if (!artwork) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.viewer button:not(:disabled)'));
        if (!elements.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [artwork, onClose, go]);

  useEffect(() => { setZoomed(false); }, [artwork?.id]);
  if (!artwork) return null;
  return <div className="viewer" role="dialog" aria-modal="true" aria-label={`Viewing ${artwork.title}`}>
    <div className="viewer-top">
      <span className="viewer-logo">the unframed<span>.</span></span>
      <span className="viewer-counter">{String(index + 1).padStart(2,'0')} <span>/</span> {String(artworks.length).padStart(2,'0')}</span>
      <button className="viewer-close" ref={closeRef} onClick={onClose} aria-label="Close artwork viewer">Close <X size={19} strokeWidth={1.4}/></button>
    </div>
    <div className={`viewer-stage ${zoomed ? 'viewer-stage--zoom' : ''}`}>
      <GalleryImage key={artwork.id} src={artwork.imageUrl} alt={artwork.alt} loading="eager" className="viewer-image" />
    </div>
    <div className="viewer-bottom">
      <div className="viewer-caption"><span>{artwork.subtitle}</span><h2>{artwork.title}</h2></div>
      <div className="viewer-controls"><button onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Zoom out' : 'Zoom in'}>{zoomed ? <Minus size={20}/> : <Plus size={20}/>}</button><button onClick={() => go(-1)} aria-label="Previous image"><ArrowLeft size={23} strokeWidth={1.3}/></button><button onClick={() => go(1)} aria-label="Next image"><ArrowRight size={23} strokeWidth={1.3}/></button></div>
    </div>
  </div>;
}
