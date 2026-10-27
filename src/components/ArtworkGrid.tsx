import React from 'react';
import { Artwork, ExhibitionCategory } from '../types/gallery';
import { ArtCanvas } from './ArtCanvas';
import { Compass, Sparkles } from 'lucide-react';

interface ArtworkGridProps {
  artworks: Artwork[];
  activeCategory: ExhibitionCategory;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const ArtworkGrid: React.FC<ArtworkGridProps> = ({
  artworks,
  activeCategory,
  onSelectArtwork,
}) => {
  // If a specific category filter is active, render an asymmetric layout specifically structured for that subset
  if (activeCategory !== 'ALL') {
    return (
      <section id="main-gallery" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[60vh]">
        <div className="mb-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-black/10 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#D84A32] uppercase">
              EXHIBITION CHAMBER FILTER
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-[#171715] mt-1">
              Curated Selection: {activeCategory}
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums">
            {artworks.length} WORKS CATALOGUED
          </span>
        </div>

        {artworks.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif italic text-xl text-stone-600">
              No artworks currently in this chamber rotation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
            {artworks.map((art, idx) => {
              // Asymmetric distribution based on index
              const colSpan = idx % 3 === 0 ? 'md:col-span-8' : idx % 3 === 1 ? 'md:col-span-4' : 'md:col-span-6';
              const offsetTop = idx % 2 === 1 ? 'md:mt-12' : '';
              return (
                <div key={art.id} className={`${colSpan} ${offsetTop} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-stone-400">
                    <span className="text-[#D84A32]">{String(idx + 1).padStart(2, '0')}</span>
                    <span>/</span>
                    <span>{art.exhibitionRoom}</span>
                  </div>
                  <ArtCanvas artwork={art} onSelect={onSelectArtwork} />
                  <p className="mt-3 text-xs font-sans text-stone-600 leading-relaxed max-w-prose line-clamp-3">
                    {art.curatorialNote}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  // MASTER FULL EXHIBITION FLOW: "CONTROLLED CHAOS"
  const artMonument = artworks.find((a) => a.id === 'art-01');
  const artQuiet = artworks.find((a) => a.id === 'art-02');
  const artCollisionA = artworks.find((a) => a.id === 'art-03a');
  const artCollisionB = artworks.find((a) => a.id === 'art-03b');
  const artImmersion = artworks.find((a) => a.id === 'art-04');
  const artArchive1 = artworks.find((a) => a.id === 'art-05a');
  const artArchive2 = artworks.find((a) => a.id === 'art-05b');
  const artArchive3 = artworks.find((a) => a.id === 'art-05c');
  const artVoid = artworks.find((a) => a.id === 'art-06');

  return (
    <div id="main-gallery" className="relative w-full overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 01: THE MONUMENT
          A massive image dominates the viewport. A narrow text column introduces the piece.
      ───────────────────────────────────────────────────────────── */}
      {artMonument && (
        <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10">
          <div className="flex flex-col space-y-3 mb-8">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase">
              <span className="text-[#D84A32] font-semibold">COMPOSITION 01</span>
              <span>—</span>
              <span>THE MONUMENT</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            {/* Massive dominating visual (8 cols) */}
            <div className="lg:col-span-8 relative">
              <ArtCanvas
                artwork={artMonument}
                onSelect={onSelectArtwork}
                className="w-full"
              />
            </div>

            {/* Narrow architectural text column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-6 border-l-0 lg:border-l border-black/10">
              <div className="space-y-6">
                <span className="text-6xl lg:text-7xl font-grotesk font-black text-stone-300 select-none block">
                  01
                </span>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl lg:text-3xl font-normal text-[#171715] leading-tight">
                    Weight, Horizon, and the Basalt Threshold
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Curatorial Commentary / Chamber I
                  </p>
                </div>
                <p className="text-sm font-sans text-stone-700 leading-relaxed">
                  {artMonument.curatorialNote}
                </p>
              </div>

              <div className="pt-8 border-t border-black/10 mt-8 space-y-2 text-xs font-mono text-stone-500">
                <div className="flex justify-between">
                  <span>ROOM:</span>
                  <span className="text-[#171715] font-medium">{artMonument.exhibitionRoom}</span>
                </div>
                <div className="flex justify-between">
                  <span>ACCESSION:</span>
                  <span className="text-[#171715] font-medium">{artMonument.accessionNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>DIMENSIONS:</span>
                  <span className="text-[#171715] font-medium">{artMonument.dimensions}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 02: THE QUIET FRAME
          A small portrait-oriented piece surrounded by substantial negative space.
          A large typographic number sits alongside it.
      ───────────────────────────────────────────────────────────── */}
      {artQuiet && (
        <section className="py-28 lg:py-48 px-6 lg:px-12 bg-[#F9F8F4] border-b border-black/10 relative">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase mb-12">
              <span className="text-[#D84A32]">COMPOSITION 02</span>
              <span>—</span>
              <span>THE QUIET FRAME</span>
            </div>

            {/* Asymmetrical composition with vast negative space */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Massive Typographic Number floating in whitespace */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-8xl sm:text-9xl lg:text-[160px] font-grotesk font-black tracking-tighter text-stone-200 leading-none select-none">
                  02
                </span>
                <p className="font-serif italic text-2xl sm:text-3xl text-stone-800 mt-2 max-w-sm">
                  "The void surrounding a human figure is never empty; it holds the weight of breath."
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase">
                  <Compass className="w-4 h-4 text-[#D84A32]" />
                  <span>Chamber II: Obsidian Chiaroscuro</span>
                </div>
              </div>

              {/* Generous negative space column */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* Small portrait piece isolated on the right */}
              <div className="lg:col-span-5 max-w-md lg:ml-auto w-full">
                <div className="p-3 bg-white border border-black/10 shadow-lg">
                  <ArtCanvas artwork={artQuiet} onSelect={onSelectArtwork} />
                </div>
                <div className="mt-4 text-xs font-mono text-stone-500 text-right">
                  FIG. 02 — ISOLATION EXPERIMENT
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 03: THE COLLISION
          Two differently sized images sit in an intentionally offset composition,
          sharing a subtle visual relationship.
      ───────────────────────────────────────────────────────────── */}
      {artCollisionA && artCollisionB && (
        <section className="py-24 lg:py-40 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10">
          <div className="flex items-center justify-between mb-16 border-b border-black/10 pb-4">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase">
              <span className="text-[#D84A32]">COMPOSITION 03</span>
              <span>—</span>
              <span>THE COLLISION (DIPTYCH IN OPPOSITION)</span>
            </div>
            <span className="text-xs font-mono text-stone-400">KENZO MORIYAMA / 2024</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Square 1:1 Textured Pigment Study (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-baseline justify-between text-xs font-mono text-stone-500">
                <span>MATTER A: CRUSHED LAPIS</span>
                <span className="text-[#D84A32]">ACC. 2026.03.01</span>
              </div>
              <ArtCanvas artwork={artCollisionA} onSelect={onSelectArtwork} />
              <p className="text-xs font-sans text-stone-600 leading-relaxed pt-2">
                {artCollisionA.curatorialNote}
              </p>
            </div>

            {/* Middle Typographic Pivot Column (2 cols) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center pt-24 text-center">
              <span className="w-[1px] h-20 bg-stone-300" />
              <span className="my-4 font-serif italic text-stone-400 text-sm">versus</span>
              <span className="w-[1px] h-20 bg-stone-300" />
            </div>

            {/* Right: Offset 3:4 Vertical Sedimentary Panel (5 cols, pushed down for intentional tension) */}
            <div className="lg:col-span-5 space-y-4 lg:mt-24">
              <div className="flex items-baseline justify-between text-xs font-mono text-stone-500">
                <span>MATTER B: AEOLIAN SAND DUNE</span>
                <span className="text-[#D84A32]">ACC. 2026.03.02</span>
              </div>
              <ArtCanvas artwork={artCollisionB} onSelect={onSelectArtwork} />
              <p className="text-xs font-sans text-stone-600 leading-relaxed pt-2">
                {artCollisionB.curatorialNote}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 04: THE IMMERSION
          A full-width photograph creates a cinematic moment.
          Small museum-style metadata appears at the edge.
      ───────────────────────────────────────────────────────────── */}
      {artImmersion && (
        <section className="py-20 lg:py-32 bg-[#171715] text-[#F9F8F4] border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#D84A32] uppercase">
                <span>COMPOSITION 04</span>
                <span>—</span>
                <span>THE IMMERSION</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-100 mt-2">
                {artImmersion.title}
              </h3>
            </div>
            <div className="text-right text-xs font-mono text-stone-400">
              <span>EXPOSURE TIME: 3 HOURS</span>
              <span className="block text-stone-500">ARCTIC OCEAN MERIDIAN</span>
            </div>
          </div>

          {/* Full-bleed style panoramic artwork */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="border border-white/10 shadow-2xl overflow-hidden">
              <ArtCanvas
                artwork={artImmersion}
                onSelect={onSelectArtwork}
                showCaption={false}
                className="w-full"
              />
            </div>

            {/* Edge museum metadata strip */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-stone-400 border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-[#D84A32]">{artImmersion.accessionNumber}</span>
                <span>{artImmersion.artist}</span>
                <span className="text-stone-600">/</span>
                <span className="italic font-serif text-stone-300">{artImmersion.medium}</span>
              </div>
              <div className="text-stone-400">
                <span>{artImmersion.dimensions}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 05: THE ARCHIVE
          Several carefully arranged images form an experimental editorial
          composition with varying scale and alignment.
      ───────────────────────────────────────────────────────────── */}
      {artArchive1 && artArchive2 && artArchive3 && (
        <section className="py-24 lg:py-40 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10">
          <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase">
                <span className="text-[#D84A32]">COMPOSITION 05</span>
                <span>—</span>
                <span>THE ARCHIVE (TRI-AXIAL ALIGNMENT)</span>
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl font-light text-[#171715] mt-1">
                Materiality in Three Dimensions
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
              <Sparkles className="w-3.5 h-3.5 text-[#D84A32]" />
              <span>Bronze, Refraction Glass & Botanicals</span>
            </div>
          </div>

          {/* Tripartite asymmetric editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Item 1: Vertical 3:4 sculpture (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-[10px] font-mono text-stone-500 uppercase">
                VOL. A // {artArchive1.artist}
              </div>
              <ArtCanvas artwork={artArchive1} onSelect={onSelectArtwork} />
              <p className="text-xs font-sans text-stone-600 leading-relaxed">
                {artArchive1.curatorialNote}
              </p>
            </div>

            {/* Item 2: Square 1:1 glass fracture, offset down (4 cols) */}
            <div className="md:col-span-4 space-y-3 md:mt-16">
              <div className="text-[10px] font-mono text-stone-500 uppercase">
                VOL. B // {artArchive2.artist}
              </div>
              <ArtCanvas artwork={artArchive2} onSelect={onSelectArtwork} />
              <p className="text-xs font-sans text-stone-600 leading-relaxed">
                {artArchive2.curatorialNote}
              </p>
            </div>

            {/* Item 3: Tall botanical study, offset up (4 cols) */}
            <div className="md:col-span-4 space-y-3 md:-mt-6">
              <div className="text-[10px] font-mono text-stone-500 uppercase">
                VOL. C // {artArchive3.artist}
              </div>
              <ArtCanvas artwork={artArchive3} onSelect={onSelectArtwork} />
              <p className="text-xs font-sans text-stone-600 leading-relaxed">
                {artArchive3.curatorialNote}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COMPOSITION 06: THE KINETIC VOID
          A final subterranean monumental study in dark basalt and reflective water.
      ───────────────────────────────────────────────────────────── */}
      {artVoid && (
        <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[#171715] text-[#F9F8F4]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D84A32] uppercase">
                <span>TERMINUS CHAMBER</span>
                <span>/</span>
                <span>CHAMBER VI</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 leading-tight">
                {artVoid.title}
              </h3>
              <p className="text-sm font-sans text-stone-300 leading-relaxed">
                {artVoid.curatorialNote}
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-stone-400">
                <span>{artVoid.year}</span>
                <span>·</span>
                <span>{artVoid.dimensions}</span>
                <span>·</span>
                <span className="text-[#D84A32]">{artVoid.accessionNumber}</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-2 border border-white/10 bg-[#0B0A09]">
                <ArtCanvas artwork={artVoid} onSelect={onSelectArtwork} showCaption={false} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
