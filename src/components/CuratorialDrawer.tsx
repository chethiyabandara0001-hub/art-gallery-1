import React, { useEffect } from 'react';
import { CURATORIAL_MANIFESTO } from '../data/artworks';
import { X, Award, ShieldCheck, FileText } from 'lucide-react';

interface CuratorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorialDrawer: React.FC<CuratorialDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#F0EEE8] text-[#171715] h-full shadow-2xl overflow-y-auto p-8 sm:p-12 flex flex-col justify-between border-l border-black/20"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Curatorial Manifesto"
      >
        <div className="space-y-8">
          {/* Header Row */}
          <div className="flex items-start justify-between border-b border-black/15 pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D84A32] uppercase">
                EXHIBITION MONOGRAPH // 2026
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal mt-1">
                Curatorial Manifesto
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-black/20 hover:bg-black/10 transition-colors"
              aria-label="Close manifesto"
            >
              <X className="w-5 h-5 text-[#171715]" />
            </button>
          </div>

          {/* Exhibition Specs Block */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-white p-4 border border-black/10">
            <div>
              <span className="text-stone-400 block">CHIEF CURATOR</span>
              <span className="font-semibold text-stone-900">{CURATORIAL_MANIFESTO.curator}</span>
            </div>
            <div>
              <span className="text-stone-400 block">INSTITUTION</span>
              <span className="font-semibold text-stone-900">{CURATORIAL_MANIFESTO.institution}</span>
            </div>
            <div>
              <span className="text-stone-400 block">CATALOGUE NUMBER</span>
              <span className="font-semibold text-[#D84A32]">{CURATORIAL_MANIFESTO.catalogueId}</span>
            </div>
            <div>
              <span className="text-stone-400 block">PHYSICAL VENUE</span>
              <span className="font-semibold text-stone-900">Pavilion 4, Basel Art Space</span>
            </div>
          </div>

          {/* Manifesto Text */}
          <div className="space-y-6 font-sans text-stone-800 text-sm sm:text-base leading-relaxed">
            {CURATORIAL_MANIFESTO.manifestoParagraphs.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#D84A32]' : ''}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Curatorial Principles Checklist */}
          <div className="border-t border-black/15 pt-6 space-y-3">
            <h4 className="font-grotesk text-xs uppercase tracking-widest font-bold text-stone-700">
              The Three Exhibition Invariants
            </h4>
            <div className="space-y-2 text-xs font-mono text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D84A32]" />
                <span>01. Artworks dictate the geometry; layouts never force conformity.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D84A32]" />
                <span>02. Negative space constitutes tangible architectural tension.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D84A32]" />
                <span>03. The spectator moves as an active presence through the field.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer of the Drawer */}
        <div className="pt-8 border-t border-black/15 mt-8 flex items-center justify-between text-xs font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>AUTHENTICATED CATALOGUE TEXT</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#171715] text-[#F9F8F4] hover:bg-[#D84A32] transition-colors text-xs font-grotesk tracking-widest uppercase"
          >
            Return to Exhibition
          </button>
        </div>
      </div>
    </div>
  );
};
