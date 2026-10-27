import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen } from 'lucide-react';
import { audioAtmosphere } from '../utils/audioAtmosphere';

interface TopNavProps {
  onOpenManifesto: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenManifesto }) => {
  const [audioActive, setAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = audioAtmosphere.toggle();
    setAudioActive(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F0EEE8]/95 backdrop-blur-md border-b border-black/10 py-3.5 shadow-xs'
          : 'bg-transparent border-b border-black/5 py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-baseline gap-2 font-grotesk text-base lg:text-lg font-bold tracking-tighter text-[#171715] uppercase whitespace-nowrap shrink-0 hover:text-[#D84A32] transition-colors"
        >
          <span>THE UNFRAMED</span>
          <span className="text-[10px] font-mono font-normal tracking-widest text-stone-500 group-hover:text-[#D84A32] transition-colors">
            / 2026
          </span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-grotesk uppercase tracking-widest text-stone-600">
          <a
            href="#main-gallery"
            className="hover:text-[#171715] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Exhibition
          </a>
          <a
            href="#pinned-story"
            className="hover:text-[#171715] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Process & Form
          </a>
          <a
            href="#interlude"
            className="hover:text-[#171715] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Interval
          </a>
          <a
            href="#catalog-archive"
            className="hover:text-[#171715] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog Index
          </a>
        </nav>

        {/* Zone 3: 1 primary action + subtle acoustic soundscape control */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio Atmosphere Synth Button */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-mono tracking-wider ${
              audioActive
                ? 'bg-[#171715] text-[#F9F8F4] border-[#171715]'
                : 'bg-transparent text-stone-700 border-black/15 hover:border-black/40'
            }`}
            title={audioActive ? 'Mute Museum Atmosphere' : 'Enable 432Hz Museum Acoustic Ambience'}
            aria-label="Toggle gallery acoustics"
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D84A32] animate-pulse" />
                <span className="hidden sm:inline text-[10px]">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline text-[10px]">SOUND OFF</span>
              </>
            )}
          </button>

          {/* Primary Action Button: Curatorial Manifesto */}
          <button
            onClick={onOpenManifesto}
            className="px-4 py-2 text-xs font-grotesk tracking-widest uppercase bg-[#171715] text-[#F9F8F4] hover:bg-[#D84A32] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curatorial Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};
