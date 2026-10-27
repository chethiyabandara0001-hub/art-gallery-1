import React from 'react';
import { ExhibitionCategory } from '../types/gallery';

interface ExhibitionNavProps {
  activeCategory: ExhibitionCategory;
  onSelectCategory: (cat: ExhibitionCategory) => void;
  artworkCounts: Record<ExhibitionCategory, number>;
}

export const ExhibitionNav: React.FC<ExhibitionNavProps> = ({
  activeCategory,
  onSelectCategory,
  artworkCounts,
}) => {
  const categories: { key: ExhibitionCategory; label: string; indexNumber: string }[] = [
    { key: 'ALL', label: 'All Works', indexNumber: '00' },
    { key: 'FORM', label: 'Form & Mass', indexNumber: '01' },
    { key: 'NATURE', label: 'Nature & Void', indexNumber: '02' },
    { key: 'HUMAN', label: 'Human Presence', indexNumber: '03' },
    { key: 'ABSTRACT', label: 'Abstract Matter', indexNumber: '04' },
    { key: 'SPACES', label: 'Architectonic Spaces', indexNumber: '05' },
  ];

  return (
    <div className="w-full border-y border-black/10 bg-[#F0EEE8] sticky top-16 z-30 py-4 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Curatorial Header Stamp */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-stone-500 uppercase">
            Curatorial Index
          </span>
          <span className="w-4 h-[1px] bg-stone-300" />
          <span className="text-xs font-serif italic text-stone-700">
            Select an Exhibition Chamber
          </span>
        </div>

        {/* Refined Typographic Filter Links (Zero pills, intentional underlines) */}
        <div className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`group flex items-baseline gap-1.5 text-xs font-grotesk tracking-widest uppercase transition-all whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                  isActive ? 'text-[#D84A32] font-bold' : 'text-stone-600 hover:text-[#171715]'
                }`}
              >
                <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-600">
                  {cat.indexNumber}
                </span>
                <span>/</span>
                <span>{cat.label}</span>
                <span className="text-[10px] font-mono opacity-60">
                  ({artworkCounts[cat.key] || 0})
                </span>

                {/* Refined Architectural Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D84A32] animate-in fade-in duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
