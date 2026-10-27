import React, { useState } from 'react';
import { Artwork } from '../types/gallery';
import { ArrowUpRight, Eye } from 'lucide-react';

interface ArtCanvasProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  className?: string;
  showCaption?: boolean;
  priority?: boolean;
  customCropClass?: string;
}

export const ArtCanvas: React.FC<ArtCanvasProps> = ({
  artwork,
  onSelect,
  className = '',
  showCaption = true,
  customCropClass,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Aspect ratio classes ensuring correct geometric ratios
  const aspectRatioMap: Record<Artwork['aspectRatio'], string> = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
    '21:9': 'aspect-[21/9]',
  };

  const ratioClass = customCropClass || aspectRatioMap[artwork.aspectRatio] || 'aspect-[4/3]';

  return (
    <div
      className={`group relative flex flex-col cursor-pointer transition-all duration-300 ${className}`}
      onClick={() => onSelect(artwork)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
      aria-label={`View ${artwork.title} by ${artwork.artist}`}
    >
      {/* Artwork Canvas Frame with Controlled Masking */}
      <div
        className={`relative w-full ${ratioClass} overflow-hidden bg-[#171715] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered ? 'scale-[1.018]' : 'scale-100'
        }`}
      >
        {/* Generative Procedural Art Rendering (Acts as Instant High-Res Fine Art & Zero-Broken-Image Foundation) */}
        <div className="absolute inset-0 w-full h-full select-none">
          {renderGenerativeArt(artwork)}
        </div>

        {/* Photography Layer (Loads gracefully on top if verified URL is accessible) */}
        {artwork.verifiedImageUrl && !imageError && (
          <img
            src={artwork.verifiedImageUrl}
            alt={`${artwork.title} — ${artwork.medium} by ${artwork.artist}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out mix-blend-multiply opacity-90 contrast-105 ${
              imageLoaded ? 'opacity-90' : 'opacity-0'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        )}

        {/* Delicate Museum Archival Grid / Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Corner Accession Stamp Overlay (Revealed on Hover) */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#F9F8F4] bg-[#171715]/80 backdrop-blur-xs px-2 py-0.5 border border-white/10">
            {artwork.accessionNumber}
          </span>
        </div>

        {/* Floating Minimalist "VIEW" Interaction Indicator */}
        <div
          className={`absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#171715]/90 text-[#F9F8F4] text-xs font-mono tracking-widest uppercase border border-white/15 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-[#D84A32]" />
          <span>INSPECT</span>
          <ArrowUpRight className="w-3 h-3 text-stone-400" />
        </div>

        {/* Thin Architectural Edge Line */}
        <div className="absolute inset-0 border border-black/10 dark:border-white/10 pointer-events-none" />
      </div>

      {/* Museum Metadata Caption (Clean Unboxed Typography) */}
      {showCaption && (
        <div className="mt-3.5 flex flex-col space-y-1 transition-colors duration-200">
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`font-serif text-lg md:text-xl font-medium tracking-tight leading-tight transition-colors duration-200 ${
                isHovered ? 'text-[#D84A32]' : 'text-[#171715]'
              }`}
            >
              {artwork.title}
            </h3>
            <span className="text-xs font-mono text-stone-500 tabular-nums shrink-0">
              {artwork.year}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-xs font-sans text-stone-600">
            <span className="font-medium text-stone-800">{artwork.artist}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="truncate max-w-[280px] text-stone-500 italic font-serif">
              {artwork.medium}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-[11px] font-mono text-stone-500 tabular-nums">
              {artwork.dimensions}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Generates an architectural, museum-grade procedural artwork using vector SVG
 * guaranteeing rich texture, tactile depth, and zero broken image states.
 */
function renderGenerativeArt(artwork: Artwork) {
  const { generativeConfig, id } = artwork;
  const { type, baseColor, secondaryColor, accentColor } = generativeConfig;

  switch (type) {
    case 'architectural':
      return (
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`grad-arch-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={baseColor} />
              <stop offset="60%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor="#0B0A09" />
            </linearGradient>
            <filter id={`noise-${id}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0" />
              <feComposite in2="SourceGraphic" in="gl" operator="in" />
            </filter>
          </defs>
          <rect width="800" height="600" fill={`url(#grad-arch-${id})`} />
          {/* Brutalist structural monolithic slabs */}
          <polygon points="120,0 380,0 260,600 60,600" fill="#201E1B" opacity="0.9" />
          <polygon points="420,0 780,0 640,600 320,600" fill="#141312" opacity="0.95" />
          {/* Laser vertical sun crevice */}
          <line x1="390" y1="0" x2="280" y2="600" stroke={accentColor} strokeWidth="3" opacity="0.9" />
          <line x1="390" y1="0" x2="280" y2="600" stroke="#FFF7ED" strokeWidth="1" opacity="0.7" />
          <circle cx="280" cy="420" r="1.5" fill="#FFF" />
          <text x="32" y="570" fill="#E5E7EB" opacity="0.3" fontSize="12" fontFamily="monospace">
            {artwork.accessionNumber} // GEOMETRIC EXTENSION
          </text>
        </svg>
      );

    case 'chiaroscuro':
      return (
        <svg className="w-full h-full" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id={`grad-chiaro-${id}`} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#44403C" />
              <stop offset="35%" stopColor={secondaryColor} />
              <stop offset="70%" stopColor={baseColor} />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>
          </defs>
          <rect width="600" height="800" fill={`url(#grad-chiaro-${id})`} />
          {/* Contemplative silhouette with dramatic raking rim light */}
          <path
            d="M 300 240 C 330 200, 360 260, 340 330 C 320 400, 370 480, 420 540 C 470 600, 490 740, 500 800 L 150 800 C 180 720, 200 620, 240 540 Z"
            fill="#090807"
            opacity="0.85"
          />
          {/* Rim light highlight */}
          <path
            d="M 340 240 Q 365 290 345 350 T 410 520"
            fill="none"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <text x="40" y="760" fill="#A8A29E" opacity="0.4" fontSize="11" fontFamily="monospace">
            STUDIO MONOGRAPH // SILENT OBSIDIAN
          </text>
        </svg>
      );

    case 'mineral':
      return (
        <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`grad-min-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={baseColor} />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="85%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill={`url(#grad-min-${id})`} />
          {/* Tectonic mineral fracture paths */}
          <path
            d="M 0 320 Q 180 280 290 350 T 600 290 L 600 600 L 0 600 Z"
            fill={secondaryColor}
            opacity="0.75"
          />
          <path
            d="M 0 380 Q 210 330 380 430 T 600 370 L 600 600 L 0 600 Z"
            fill="#451A03"
            opacity="0.9"
          />
          {/* Pure ultramarine pool */}
          <circle cx="290" cy="240" r="140" fill={baseColor} opacity="0.6" />
          <path
            d="M 90 280 L 510 360"
            stroke={accentColor}
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.7"
          />
        </svg>
      );

    case 'ocean':
      return (
        <svg className="w-full h-full" viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`grad-ocean-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="42%" stopColor="#CBD5E1" />
              <stop offset="48%" stopColor="#94A3B8" />
              <stop offset="52%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="1000" height="450" fill={`url(#grad-ocean-${id})`} />
          {/* Subtle mist band */}
          <rect x="0" y="190" width="1000" height="40" fill="#FFFFFF" opacity="0.35" />
          {/* Solitary sea beacon line */}
          <line x1="680" y1="180" x2="680" y2="245" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="680" cy="180" r="3" fill="#D84A32" />
        </svg>
      );

    case 'sculptural':
      return (
        <svg className="w-full h-full" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id={`grad-sculp-${id}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#3F3F46" />
              <stop offset="50%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </radialGradient>
          </defs>
          <rect width="600" height="800" fill={`url(#grad-sculp-${id})`} />
          {/* Fluid bronze ribbon shape */}
          <path
            d="M 220 120 C 380 180, 480 320, 360 480 C 240 640, 160 520, 180 720 C 190 780, 440 760, 480 620 C 520 480, 390 320, 420 180 Z"
            fill="none"
            stroke={accentColor}
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 220 120 C 380 180, 480 320, 360 480 C 240 640, 160 520, 180 720 C 190 780, 440 760, 480 620"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );

    default:
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-6"
          style={{ backgroundColor: baseColor }}
        >
          <div className="flex justify-between items-start text-xs font-mono text-stone-400">
            <span>{artwork.accessionNumber}</span>
            <span>{artwork.category}</span>
          </div>
          <div className="flex flex-col items-center justify-center my-auto">
            <div
              className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-4"
              style={{ borderColor: accentColor }}
            >
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: secondaryColor }}
              />
            </div>
            <p className="font-serif italic text-stone-300 text-sm max-w-[200px] text-center">
              {artwork.title}
            </p>
          </div>
          <div className="text-[10px] font-mono text-stone-500 uppercase">
            {artwork.dimensions}
          </div>
        </div>
      );
  }
}
