import React, { useState } from 'react';
import { PINNED_STORY_CHAPTERS } from '../data/artworks';
import { ArrowRight, Layers, Sliders } from 'lucide-react';

export const PinnedStorySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const currentChapter = PINNED_STORY_CHAPTERS[activeStep];

  return (
    <section
      id="pinned-story"
      className="relative w-full bg-[#171715] text-[#F9F8F4] border-y border-black/20 py-24 lg:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header Stamp */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#D84A32] uppercase">
              <span>SPECIAL FEATURE SEQUENCE</span>
              <span>—</span>
              <span>THE ARCHITECTURAL GENESIS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 mt-2">
              The Dialogue of Substance
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <Layers className="w-4 h-4 text-[#D84A32]" />
            <span>PROGRESSIVE STUDY IN THREE MOVEMENTS</span>
          </div>
        </div>

        {/* Pinned Gallery Grid: Large Held Piece on Left + Scrolling Editorial Chapters on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Pinned Artwork Monolith (Sticky on Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] w-full bg-[#0E0D0C] border border-white/10 overflow-hidden shadow-2xl">
              {/* Dynamic Chapter Visual Preview */}
              <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-[#262420] via-[#171715] to-[#0A0A09]">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span className="text-[#D84A32] font-bold">
                    MOVEMENT // {currentChapter.stepNumber}
                  </span>
                  <span>4.8T VOLCANIC BASALT</span>
                </div>

                {/* Central Macro Geometry */}
                <div className="my-auto flex flex-col items-center">
                  <div className="relative w-48 h-48 border border-white/15 flex items-center justify-center">
                    <div
                      className="w-36 h-36 border border-[#D84A32]/60 rotate-45 transition-transform duration-700 ease-out"
                      style={{
                        transform: `rotate(${45 + activeStep * 45}deg)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-serif italic text-2xl text-stone-300">
                      § {currentChapter.stepNumber}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end text-[11px] font-mono text-stone-400 border-t border-white/10 pt-4">
                  <span className="truncate max-w-[280px]">{currentChapter.spec}</span>
                  <span className="text-[#D84A32]">SOLSTICE TOLERANCE</span>
                </div>
              </div>

              {/* Edge Optical Hairlines */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/10 pointer-events-none" />
            </div>

            {/* Quick Step Indicators */}
            <div className="mt-6 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">CHOREOGRAPHY:</span>
              <div className="flex items-center gap-2">
                {PINNED_STORY_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.stepNumber}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1 border transition-all text-xs font-mono cursor-pointer ${
                      activeStep === idx
                        ? 'bg-[#D84A32] text-white border-[#D84A32]'
                        : 'border-white/15 text-stone-400 hover:border-white/40'
                    }`}
                  >
                    {ch.stepNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Progressive Editorial Text Chapters */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-24">
            {PINNED_STORY_CHAPTERS.map((chapter, index) => {
              const isSelected = activeStep === index;
              return (
                <div
                  key={chapter.stepNumber}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 lg:p-8 border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#D84A32] bg-[#1F1E1B]/80'
                      : 'border-white/10 bg-[#171715] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#D84A32] uppercase mb-4">
                    <span>PHASE {chapter.stepNumber}</span>
                    <span className="text-stone-400">{chapter.subtitle}</span>
                  </div>

                  <h3 className="font-serif text-2xl lg:text-3xl font-normal text-stone-100 leading-tight mb-4">
                    {chapter.title}
                  </h3>

                  <p className="text-sm font-sans text-stone-300 leading-relaxed mb-6">
                    {chapter.essay}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 pt-4 border-t border-white/10">
                    <span className="text-[11px] truncate max-w-[280px]">{chapter.spec}</span>
                    <div className="flex items-center gap-1 text-[#D84A32]">
                      <span className="text-[10px] uppercase">Observe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
