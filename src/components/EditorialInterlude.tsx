import React from 'react';
import { Artwork } from '../types/gallery';
import { ArtCanvas } from './ArtCanvas';

interface EditorialInterludeProps {
  interludeArtwork: Artwork;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const EditorialInterlude: React.FC<EditorialInterludeProps> = ({
  interludeArtwork,
  onSelectArtwork,
}) => {
  return (
    <section
      id="interlude"
      className="relative min-h-[90vh] py-28 lg:py-40 px-6 lg:px-12 bg-[#F0EEE8] flex flex-col justify-between border-b border-black/10 overflow-hidden"
    >
      {/* Top Poster Meta Details */}
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between text-xs font-grotesk tracking-widest uppercase text-stone-500">
        <span>EXHIBITION INTERVAL // ROOM IV</span>
        <span className="font-mono text-stone-400">PAUSE FOR CONTEMPLATION</span>
      </div>

      {/* Monumental Central Typographic Statement & Carefully Positioned Singular Artwork */}
      <div className="max-w-[1440px] w-full mx-auto my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Bold Gallery Poster Typographic Statement */}
        <div className="lg:col-span-8 space-y-4">
          <p className="font-grotesk text-xs uppercase tracking-widest text-[#D84A32] font-semibold">
            CURATORIAL THESIS
          </p>

          <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[98px] leading-[0.92] text-[#171715] tracking-tight">
            The Space
          </h2>

          <h2 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[98px] leading-[0.9] text-[#171715] uppercase tracking-tighter">
            BETWEEN IMAGES
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 pt-2">
            <h2 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[98px] leading-[0.92] text-stone-600 tracking-tight">
              is part of the
            </h2>
            <h2 className="font-grotesk font-black text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[116px] leading-[0.8] text-[#D84A32] uppercase tracking-tighter">
              ART.
            </h2>
          </div>
        </div>

        {/* Right: One Small, Carefully Positioned Piece of Artwork */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end">
          <div className="w-full max-w-xs p-4 bg-[#F9F8F4] border border-black/15 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <ArtCanvas
              artwork={interludeArtwork}
              onSelect={onSelectArtwork}
              showCaption={false}
              className="w-full aspect-square"
            />
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase">
              <span>{interludeArtwork.title}</span>
              <span className="text-[#D84A32]">{interludeArtwork.year}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-stone-400 mt-4 tracking-wider uppercase">
            AESTHETIC RESTING POINT // 04-A
          </span>
        </div>
      </div>

      {/* Bottom Poster Footnote */}
      <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs font-mono text-stone-500 border-t border-black/10 pt-4">
        <span>DR. HELENE BERGSTRÖM · CHIEF CURATOR</span>
        <span>MUSEUM CATALOGUE REF: UNFRM-INT-2026</span>
      </div>
    </section>
  );
};
