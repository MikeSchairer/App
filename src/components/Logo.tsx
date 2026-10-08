import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  glow?: boolean;
  glowColor?: 'lime' | 'cyan' | 'both';
  interactive?: boolean;
}

export const LogoMark: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  glow = true,
  glowColor = 'lime',
  interactive = false,
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60',
  };

  const glowStyles = glow
    ? glowColor === 'lime'
      ? 'filter drop-shadow-[0_0_16px_rgba(57,255,20,0.65)] drop-shadow-[0_0_36px_rgba(57,255,20,0.35)]'
      : glowColor === 'cyan'
      ? 'filter drop-shadow-[0_0_16px_rgba(0,240,255,0.65)] drop-shadow-[0_0_36px_rgba(0,240,255,0.35)]'
      : 'filter drop-shadow-[0_0_18px_rgba(57,255,20,0.55)] drop-shadow-[0_0_32px_rgba(0,240,255,0.4)]'
    : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${glowStyles} ${
        interactive ? 'transition-transform duration-300 hover:scale-105 active:scale-95' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 320 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Main neon lime gradients based directly on user's logo */}
          <linearGradient id="neonLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="25%" stopColor="#84ff20" />
            <stop offset="60%" stopColor="#39ff14" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <linearGradient id="limeFacetHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2ff40" />
            <stop offset="50%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#39ff14" />
          </linearGradient>

          <linearGradient id="limeFacetShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#0f4618" />
          </linearGradient>

          <linearGradient id="cyanOutlineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#00f5d4" />
          </linearGradient>

          {/* SVG Glow Filter */}
          <filter id="monogramHalo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Halo behind the MS Monogram */}
        {glow && (
          <g opacity="0.45" filter="url(#monogramHalo)">
            {/* M Halo */}
            <polygon points="40,45 76,45 76,179 40,215" fill="#39ff14" opacity="0.3" />
            <polygon points="76,45 110,45 152,148 120,158" fill="#39ff14" opacity="0.3" />
            <polygon points="120,158 152,148 198,45 166,45" fill="#39ff14" opacity="0.3" />
            {/* S Halo */}
            <polygon points="180,45 275,45 245,77 155,77" fill="#39ff14" opacity="0.3" />
            <polygon points="245,77 215,77 142,152 172,152" fill="#00f0ff" opacity="0.3" />
            <polygon points="172,152 142,152 215,215 245,215" fill="#39ff14" opacity="0.3" />
            <polygon points="135,215 165,183 275,183 245,215" fill="#39ff14" opacity="0.3" />
          </g>
        )}

        {/* ========================================================
            AUTHENTIC INTERLOCKING "MS" INITIALS MONOGRAM
            ======================================================== */}

        {/* --- LETTER 'M' (LEFT SIDE) --- */}

        {/* M Left Vertical Pillar (with 45-degree angled bottom-left spear) */}
        <polygon
          points="40,45 76,45 76,179 40,215"
          fill="url(#neonLimeGrad)"
        />
        {/* M Left Pillar Top Bevel Highlight */}
        <polygon
          points="40,45 76,45 72,52 44,52"
          fill="#efff70"
        />

        {/* M Chevron: Down-slope towards center V */}
        <polygon
          points="76,45 110,45 152,148 120,158"
          fill="url(#limeFacetShadow)"
        />

        {/* M Chevron: Up-slope from center V towards top-right */}
        <polygon
          points="120,158 152,148 198,45 166,45"
          fill="url(#limeFacetHighlight)"
        />

        {/* --- LETTER 'S' (RIGHT SIDE INTERLOCKED) --- */}

        {/* S Top Horizontal Bar (flat horizontal top with 45-degree beveled cut) */}
        <polygon
          points="180,45 275,45 245,77 155,77"
          fill="url(#limeFacetHighlight)"
        />
        {/* S Top Bar Bright Edge Highlight */}
        <polygon
          points="180,45 275,45 270,49 184,49"
          fill="#efff70"
        />

        {/* S Upper Diagonal (Spine crossing down-left across center) */}
        <polygon
          points="245,77 215,77 142,152 172,152"
          fill="url(#neonLimeGrad)"
        />

        {/* S Lower Diagonal (Spine folding down-right) */}
        <polygon
          points="172,152 142,152 215,215 245,215"
          fill="url(#limeFacetShadow)"
        />

        {/* S Bottom Horizontal Bar (flat base returning left with 45-degree beveled cut) */}
        <polygon
          points="135,215 165,183 275,183 245,215"
          fill="url(#neonLimeGrad)"
        />
        {/* S Bottom Bar Left Bevel Highlight */}
        <polygon
          points="135,215 165,183 162,187 139,212"
          fill="#efff70"
        />

        {/* --- SHARP NEON CYAN RIM ACCENTS & INTERSECTIONS --- */}
        {/* Outer subtle cyan rim stroke for high-contrast clarity */}
        <g stroke="url(#cyanOutlineGlow)" strokeWidth="1.5" strokeOpacity="0.5" fill="none">
          {/* M Left Outline */}
          <path d="M 40,45 L 76,45 L 76,179 L 40,215 Z" />
          {/* M Chevron Outline */}
          <path d="M 76,45 L 110,45 L 152,148 L 198,45 L 166,45" />
          {/* S Outer Contour */}
          <path d="M 180,45 L 275,45 L 245,77 L 172,152 L 245,215 L 275,183" />
          <path d="M 135,215 L 165,183 L 275,183" />
        </g>
      </svg>
    </div>
  );
};

interface BrandLockupProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  glow?: boolean;
  centered?: boolean;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  glow = true,
  centered = false,
}) => {
  const isHero = size === 'hero';

  return (
    <div
      className={`inline-flex flex-col ${
        centered ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {/* MS Monogram Initials Emblem */}
      <div className={isHero ? 'mb-6 sm:mb-8' : 'mb-2'}>
        <LogoMark
          size={isHero ? 'hero' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
          glow={glow}
          interactive={true}
        />
      </div>

      {/* Primary Wordmark Name: MICHAEL SCHAIRER */}
      <h1
        className={`font-display font-extrabold text-white tracking-[0.22em] uppercase transition-colors select-none ${
          isHero
            ? 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.25em]'
            : size === 'lg'
            ? 'text-xl sm:text-2xl tracking-[0.2em]'
            : 'text-sm sm:text-base tracking-[0.18em]'
        }`}
      >
        Michael Schairer
      </h1>

      {/* Cyan Divider Accent Bar */}
      <div
        className={`h-[2px] bg-gradient-to-r from-transparent via-[#00f5d4] to-transparent my-2 sm:my-3 ${
          isHero
            ? 'w-36 sm:w-56 h-[2.5px] shadow-[0_0_12px_#00f0ff]'
            : 'w-24 h-[1.5px] shadow-[0_0_8px_#00f0ff]'
        }`}
      />

      {/* Subtitle: WEB GRAPHIC DESIGNER & DEVELOPER */}
      {showSubtitle && (
        <p
          className={`font-mono font-medium text-[#00f5d4] uppercase tracking-[0.22em] ${
            isHero
              ? 'text-xs sm:text-sm md:text-base tracking-[0.28em]'
              : size === 'lg'
              ? 'text-[11px] sm:text-xs'
              : 'text-[9px] sm:text-[10px]'
          }`}
        >
          Web Graphic Designer & Developer
        </p>
      )}
    </div>
  );
};
