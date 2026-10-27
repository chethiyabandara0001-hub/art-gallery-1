/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ARTWORKS } from './data/artworks';
import { Artwork, ExhibitionCategory } from './types/gallery';
import { TopNav } from './components/TopNav';
import { GalleryHero } from './components/GalleryHero';
import { ExhibitionNav } from './components/ExhibitionNav';
import { ArtworkGrid } from './components/ArtworkGrid';
import { PinnedStorySection } from './components/PinnedStorySection';
import { EditorialInterlude } from './components/EditorialInterlude';
import { ArtworkViewer } from './components/ArtworkViewer';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { ExhibitionFooter } from './components/ExhibitionFooter';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ExhibitionCategory>('ALL');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [manifestoOpen, setManifestoOpen] = useState(false);

  // Filter artworks by selected category
  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'ALL') return ARTWORKS;
    return ARTWORKS.filter((art) => art.category === activeCategory);
  }, [activeCategory]);

  // Compute artwork counts for the exhibition chamber tabs
  const artworkCounts = useMemo(() => {
    const counts: Record<ExhibitionCategory, number> = {
      ALL: ARTWORKS.length,
      FORM: 0,
      NATURE: 0,
      HUMAN: 0,
      ABSTRACT: 0,
      SPACES: 0,
    };
    ARTWORKS.forEach((art) => {
      if (counts[art.category] !== undefined) {
        counts[art.category]++;
      }
    });
    return counts;
  }, []);

  const heroArtwork = ARTWORKS[0];
  const interludeArtwork = ARTWORKS[1];

  return (
    <div className="min-h-screen bg-[#F0EEE8] text-[#171715] flex flex-col font-sans selection:bg-[#D84A32] selection:text-[#F9F8F4]">
      {/* Top Bar following strict Top Bar Contract */}
      <TopNav onOpenManifesto={() => setManifestoOpen(true)} />

      {/* The Opening — An Artistic Hero */}
      <main className="flex-1 w-full">
        <GalleryHero
          heroArtwork={heroArtwork}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
        />

        {/* Curatorial Exhibition Chambers Navigation */}
        <ExhibitionNav
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          artworkCounts={artworkCounts}
        />

        {/* The Main Gallery — Controlled Chaos (Asymmetrical & Art-directed) */}
        <ArtworkGrid
          artworks={filteredArtworks}
          activeCategory={activeCategory}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
        />

        {/* Pinned Storytelling: Architectural Genesis */}
        <PinnedStorySection />

        {/* An Artistic Interlude: Fullscreen Poster Statement */}
        <EditorialInterlude
          interludeArtwork={interludeArtwork}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
        />
      </main>

      {/* Complete Catalog Index & Museum Colophon Footer */}
      <ExhibitionFooter
        artworks={ARTWORKS}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onOpenManifesto={() => setManifestoOpen(true)}
      />

      {/* Fullscreen Immersive Artwork Inspection Viewer */}
      <ArtworkViewer
        artwork={selectedArtwork}
        artworks={filteredArtworks}
        onClose={() => setSelectedArtwork(null)}
        onNavigate={(art) => setSelectedArtwork(art)}
      />

      {/* Curatorial Manifesto Drawer */}
      <CuratorialDrawer
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </div>
  );
}
