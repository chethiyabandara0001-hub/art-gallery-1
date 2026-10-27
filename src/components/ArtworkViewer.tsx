import React, { useState, useEffect, useCallback } from 'react';
import { Artwork } from '../types/gallery';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sun, Moon, Info } from 'lucide-react';

interface ArtworkViewerProps {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
}

export const ArtworkViewer: React.FC<ArtworkViewerProps> = ({
  artwork,
  artworks,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDarkWall, setIsDarkWall] = useState(true);
  const [showMetadataPanel, setShowMetadataPanel] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Find index for prev/next
  const currentIndex = artwork ? artworks.findIndex((a) => a.id === artwork.id) : -1;
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

  const handlePrev = useCallback(() => {
    if (prevArtwork) {
      setIsZoomed(false);
      setImgLoaded(false);
      onNavigate(prevArtwork);
    }
  }, [prevArtwork, onNavigate]);

  const handleNext = useCallback(() => {
    if (nextArtwork) {
      setIsZoomed(false);
      setImgLoaded(false);
      onNavigate(nextArtwork);
    }
  }, [nextArtwork, onNavigate]);

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!artwork) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === '+' || e.key === '=') setIsZoomed(true);
      if (e.key === '-') setIsZoomed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, onClose, handlePrev, handleNext]);

  // Lock body scroll when viewer is open
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [artwork]);

  if (!artwork) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between transition-colors duration-500 ${
        isDarkWall ? 'bg-[#0E0D0C] text-[#F9F8F4]' : 'bg-[#F9F8F4] text-[#171715]'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed view of ${artwork.title}`}
    >
      {/* Top Floating Control Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 z-20">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#D84A32] font-semibold tracking-wider">
            {artwork.accessionNumber}
          </span>
          <span className="hidden sm:inline text-xs font-mono opacity-50">/</span>
          <span className="hidden sm:inline text-xs font-grotesk uppercase tracking-wider opacity-75">
            {artwork.exhibitionRoom}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Wall Background Switcher */}
          <button
            onClick={() => setIsDarkWall(!isDarkWall)}
            className={`p-2 border transition-colors ${
              isDarkWall ? 'border-white/20 text-stone-300 hover:text-white' : 'border-black/20 text-stone-700 hover:text-black'
            }`}
            title={isDarkWall ? 'Switch to Museum White Wall' : 'Switch to Obsidian Chamber Wall'}
            aria-label="Toggle wall background"
          >
            {isDarkWall ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-2 border transition-colors ${
              isDarkWall ? 'border-white/20 text-stone-300 hover:text-white' : 'border-black/20 text-stone-700 hover:text-black'
            }`}
            title={isZoomed ? 'Reset view' : 'Zoom 2x detail'}
            aria-label="Toggle zoom level"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Toggle Metadata Sidebar */}
          <button
            onClick={() => setShowMetadataPanel(!showMetadataPanel)}
            className={`p-2 border transition-colors ${
              showMetadataPanel ? 'bg-[#D84A32] text-white border-[#D84A32]' : isDarkWall ? 'border-white/20 text-stone-300' : 'border-black/20 text-stone-700'
            }`}
            title="Toggle Curatorial Notes"
            aria-label="Toggle metadata"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close Viewer */}
          <button
            onClick={onClose}
            className={`p-2 border transition-colors ${
              isDarkWall ? 'border-white/20 hover:bg-white/10' : 'border-black/20 hover:bg-black/10'
            }`}
            title="Close viewer (Escape)"
            aria-label="Close exhibition viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Viewing Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Left/Right Floating Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 text-white hover:bg-[#D84A32] transition-colors border border-white/10"
          title="Previous artwork (Arrow Left)"
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 text-white hover:bg-[#D84A32] transition-colors border border-white/10"
          title="Next artwork (Arrow Right)"
          aria-label="Next artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Central Artwork Canvas Display */}
        <div
          className={`flex-1 flex items-center justify-center p-6 lg:p-12 transition-all duration-300 overflow-auto ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div
            className={`relative transition-transform duration-500 ease-out max-h-[82vh] max-w-[90vw] ${
              isZoomed ? 'scale-150 shadow-2xl' : 'scale-100'
            }`}
          >
            {artwork.verifiedImageUrl ? (
              <img
                src={artwork.verifiedImageUrl}
                alt={artwork.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                className={`max-h-[78vh] w-auto object-contain border ${
                  isDarkWall ? 'border-white/15' : 'border-black/15'
                } shadow-2xl`}
              />
            ) : (
              <div className="w-[500px] h-[500px] max-w-full aspect-square bg-[#171715] flex items-center justify-center border border-white/10">
                <span className="font-serif italic text-stone-400">{artwork.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Collapsible Curatorial Metadata Rail */}
        {showMetadataPanel && (
          <aside
            className={`w-full max-w-md border-l overflow-y-auto p-8 flex flex-col justify-between transition-all duration-300 ${
              isDarkWall ? 'bg-[#141312] border-white/10 text-stone-200' : 'bg-white border-black/10 text-[#171715]'
            }`}
          >
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D84A32] uppercase">
                  ARCHIVAL ENTRY
                </span>
                <h2 className="font-serif text-3xl font-normal leading-tight mt-1">
                  {artwork.title}
                </h2>
                {artwork.series && (
                  <p className="font-mono text-xs text-stone-500 mt-1">
                    Series: {artwork.series}
                  </p>
                )}
              </div>

              {/* Artist & Technique Definition List */}
              <dl className="space-y-4 text-xs border-y py-4 border-black/10 dark:border-white/10 font-mono">
                <div className="flex justify-between">
                  <dt className="text-stone-400">ARTIST</dt>
                  <dd className="font-semibold text-right">{artwork.artist}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">YEAR</dt>
                  <dd className="text-right">{artwork.year}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">MEDIUM</dt>
                  <dd className="text-right max-w-[200px] truncate" title={artwork.medium}>
                    {artwork.medium}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">DIMENSIONS</dt>
                  <dd className="text-right">{artwork.dimensions}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">CATEGORY</dt>
                  <dd className="text-right text-[#D84A32]">{artwork.category}</dd>
                </div>
              </dl>

              {/* Curatorial Essay */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  Curatorial Essay
                </h4>
                <p className="text-sm font-sans leading-relaxed text-stone-300">
                  {artwork.curatorialNote}
                </p>
              </div>

              {/* Swatch Palette Analysis */}
              <div className="pt-2">
                <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase block mb-2">
                  Harmonic Tonal Palette
                </span>
                <div className="flex items-center gap-2">
                  {artwork.palette.map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 border border-white/20"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Navigation Shortcut Stamp */}
            <div className="pt-8 border-t border-white/10 mt-8 text-xs font-mono text-stone-500 flex justify-between">
              <span>USE [←] [→] KEYS TO NAVIGATE</span>
              <span>ESC TO EXIT</span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
