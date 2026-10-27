import React, { useState, useEffect } from 'react';
import { Artwork } from '../types/gallery';
import { ArrowDown } from 'lucide-react';

interface GalleryHeroProps {
  heroArtwork: Artwork;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({ heroArtwork, onSelectArtwork }) => {
  const [curtainRemoved, setCurtainRemoved] = useState(false);
  const [elementsSettled, setElementsSettled] = useState(false);

  useEffect(() => {
    // Choreographed entrance animation sequence
    const t1 = setTimeout(() => setCurtainRemoved(true), 350);
    const t2 = setTimeout(() => setElementsSettled(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 lg:px-12 bg-[#F0EEE8] overflow-hidden border-b border-black/10">
      {/* Monochrome Exhibition Curtain Wipe */}
      <div
        className={`fixed inset-0 z-50 bg-[#171715] pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          curtainRemoved ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Top Editorial Label Corner */}
      <div
        className={`w-full flex justify-between items-start text-xs font-grotesk tracking-widest uppercase text-stone-500 transition-opacity duration-1000 ${
          elementsSettled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-[#171715] font-semibold">AN INDEPENDENT VISUAL EXHIBITION</span>
          <span className="text-stone-400 font-mono text-[10px]">EDITION MMXXVI · PARIS / BASEL</span>
        </div>
        <div className="text-right hidden sm:block">
          <span className="font-mono text-stone-600">GALLERY FLOOR: LEVEL 0</span>
          <span className="block text-stone-400 text-[10px]">MONOGRAPH SERIES VOL. IX</span>
        </div>
      </div>

      {/* Hero Architectural Typography & Unusually Cropped Overlapping Artwork Composition */}
      <div className="relative my-auto py-8 lg:py-12 w-full max-w-[1440px] mx-auto">
        {/* Layer 1: Oversized Headline Fragment 1 */}
        <div className="overflow-hidden">
          <h1
            className={`font-grotesk font-black text-5xl sm:text-7xl md:text-8xl lg:text-[112px] xl:text-[124px] tracking-tighter leading-[0.88] text-[#171715] uppercase transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              elementsSettled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            ART IS NOT
          </h1>
        </div>

        {/* Layer 2: Overlapping Crop & Mid Headline Fragment */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 lg:-my-4 z-10">
          {/* Overlapping Unusually Cropped Artwork */}
          <div
            className={`lg:col-span-6 xl:col-span-5 relative transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group ${
              elementsSettled ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={() => onSelectArtwork(heroArtwork)}
            title="Inspect focal sculpture"
          >
            <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] bg-[#171715] overflow-hidden border border-black/20 shadow-xl group-hover:border-[#D84A32] transition-colors">
              {/* Image layer */}
              <img
                src="https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop"
                alt="Plaster and bronze sculptural form in raking sunlight"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Mask overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Corner accession tag */}
              <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-[#F9F8F4]">
                <span>FOCAL WORK // {heroArtwork.title}</span>
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono tracking-widest text-[#D84A32] bg-[#171715]/80 px-2 py-0.5">
                CLICK TO ENTER
              </div>
            </div>
          </div>

          {/* Typography Fragment 2: High-contrast Editorial Serif Moment */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center overflow-hidden">
            <span
              className={`font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[96px] xl:text-[108px] text-[#171715] leading-[0.92] tracking-tight transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                elementsSettled ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              Meant to Stay
            </span>
          </div>
        </div>

        {/* Layer 3: Final Graphic Impact Word */}
        <div className="overflow-hidden flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1
            className={`font-grotesk font-black text-6xl sm:text-8xl md:text-9xl lg:text-[132px] xl:text-[148px] tracking-tighter leading-[0.82] text-[#D84A32] uppercase transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              elementsSettled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            STILL.
          </h1>

          <div
            className={`max-w-xs text-xs font-sans text-stone-600 leading-relaxed transition-all duration-1000 delay-400 ${
              elementsSettled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="border-l-2 border-[#171715] pl-3 py-1 font-serif italic text-sm text-[#171715]">
              "A digital exhibition where artwork, typography, and negative space dissolve into an unbroken architectural installation."
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Invitation & Scroll Guide */}
      <div
        className={`w-full flex items-end justify-between text-xs font-grotesk tracking-widest uppercase transition-opacity duration-1000 delay-500 ${
          elementsSettled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 text-stone-500">
          <span className="w-8 h-[1px] bg-stone-400" />
          <span>CURATED SELECTION OF 8 MONUMENTAL INSTALLATIONS</span>
        </div>

        <a
          href="#main-gallery"
          className="group flex items-center gap-2 text-[#171715] hover:text-[#D84A32] transition-colors py-1"
        >
          <span className="font-semibold">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
