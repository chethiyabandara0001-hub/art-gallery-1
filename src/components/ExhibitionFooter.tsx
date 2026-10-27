import React from 'react';
import { Artwork } from '../types/gallery';
import { ArrowUp, BookOpen, Compass } from 'lucide-react';

interface ExhibitionFooterProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onOpenManifesto: () => void;
}

export const ExhibitionFooter: React.FC<ExhibitionFooterProps> = ({
  artworks,
  onSelectArtwork,
  onOpenManifesto,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="catalog-archive" className="w-full bg-[#171715] text-[#F9F8F4] border-t border-black/20 pt-20 pb-16 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Top Header of Footer: Comprehensive Catalog Archive Index */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#D84A32] uppercase">
              INDEX RERUM // ARCHIVE REGISTRY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-1">
              Complete Exhibition Catalog
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>{artworks.length} WORKS DISPLAYED</span>
            <span>·</span>
            <button
              onClick={onOpenManifesto}
              className="text-[#D84A32] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Manifesto</span>
            </button>
          </div>
        </div>

        {/* Tabular Numerals Catalog Index */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-stone-500 uppercase tracking-widest">
                <th className="py-3 pr-4 font-normal">ACCESSION</th>
                <th className="py-3 px-4 font-normal">WORK TITLE</th>
                <th className="py-3 px-4 font-normal">ARTIST</th>
                <th className="py-3 px-4 font-normal">YEAR</th>
                <th className="py-3 px-4 font-normal hidden md:table-cell">MEDIUM</th>
                <th className="py-3 px-4 font-normal hidden lg:table-cell">DIMENSIONS</th>
                <th className="py-3 pl-4 text-right font-normal">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {artworks.map((art) => (
                <tr
                  key={art.id}
                  onClick={() => onSelectArtwork(art)}
                  className="group hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 pr-4 text-[#D84A32] font-semibold">
                    {art.accessionNumber}
                  </td>
                  <td className="py-4 px-4 font-serif text-sm font-medium text-stone-200 group-hover:text-white transition-colors">
                    {art.title}
                  </td>
                  <td className="py-4 px-4 text-stone-300 font-sans">
                    {art.artist}
                  </td>
                  <td className="py-4 px-4 tabular-nums text-stone-400">
                    {art.year}
                  </td>
                  <td className="py-4 px-4 text-stone-400 italic font-serif hidden md:table-cell truncate max-w-xs">
                    {art.medium}
                  </td>
                  <td className="py-4 px-4 tabular-nums text-stone-400 hidden lg:table-cell">
                    {art.dimensions}
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <span className="text-[10px] text-stone-400 group-hover:text-[#D84A32] uppercase tracking-wider font-grotesk underline underline-offset-4">
                      Inspect →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Colophon & Exhibition Monograph Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-12 text-xs font-mono text-stone-400">
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-grotesk text-sm font-bold tracking-tight text-white uppercase">
              THE UNFRAMED: A GALLERY WITHOUT BOUNDARIES
            </h4>
            <p className="text-stone-400 text-xs font-sans leading-relaxed max-w-md">
              An independent curated digital art exhibition testing the dialectic between artwork,
              monumental typography, and architectural paper space. Designed and engineered as a bespoke
              spatial installation.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <span className="text-stone-500 uppercase block tracking-widest text-[10px]">
              CURATORIAL CREDITS
            </span>
            <p className="text-stone-300 font-sans">
              Curator: Dr. Helene Bergström
            </p>
            <p className="text-stone-300 font-sans">
              Typography: Cormorant Garamond & Space Grotesk
            </p>
            <p className="text-stone-300 font-sans">
              Acoustic Synthesis: Web Audio API Studio Engine (432Hz Drone)
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-[#D84A32] text-white hover:text-[#D84A32] transition-colors uppercase tracking-widest text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
            <span className="text-[10px] text-stone-500 mt-6 md:mt-0">
              © MMXXVI THE UNFRAMED. ALL ARCHIVAL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
