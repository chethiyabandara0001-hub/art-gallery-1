import React, { useEffect, useMemo, useState } from 'react';
import { TopNav } from './components/TopNav';
import { GalleryHero } from './components/GalleryHero';
import { ArtworkGrid } from './components/ArtworkGrid';
import { FeaturedStudy } from './components/FeaturedStudy';
import { GalleryFooter } from './components/GalleryFooter';
import { ArtworkViewer } from './components/ArtworkViewer';
import { ARTWORKS } from './data/artworks';
import type { Artwork, ExhibitionCategory } from './types/gallery';

export default function App() {
  const [category, setCategory] = useState<ExhibitionCategory>('ALL');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const filtered = useMemo(() => category === 'ALL' ? ARTWORKS : ARTWORKS.filter((art) => art.category === category), [category]);
  const viewerCollection = selectedArtwork && !filtered.some((art) => art.id === selectedArtwork.id) ? ARTWORKS : filtered;

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -25px 0px' });
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [category]);

  return <div className="site-shell">
    <TopNav />
    <main>
      <GalleryHero image={ARTWORKS[8]} onSelectArtwork={setSelectedArtwork} />
      <ArtworkGrid artworks={filtered} activeCategory={category} onSelectCategory={setCategory} onSelectArtwork={setSelectedArtwork} />
      <FeaturedStudy artwork={ARTWORKS[3]} onSelectArtwork={setSelectedArtwork} />
      <GalleryFooter artworks={ARTWORKS} onSelectArtwork={setSelectedArtwork} />
    </main>
    <ArtworkViewer artwork={selectedArtwork} artworks={viewerCollection} onClose={() => setSelectedArtwork(null)} onNavigate={setSelectedArtwork} />
  </div>;
}
