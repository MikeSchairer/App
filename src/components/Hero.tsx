import React, { useState } from 'react';
import { BrandLockup } from './Logo';
import { ParticleBackground } from './ParticleBackground';
import { ArrowDown, FileText, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'Mike.Schairer@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResumeClick = () => {
    window.open('/Michael_Schairer_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-brick-texture overflow-hidden"
    >
      {/* Interactive Neon-Lime Particle Canvas */}
      <ParticleBackground />

      {/* Ambient Radial Spotlight and Vignette mimicking the photo */}
      <div className="absolute inset-0 bg-radial-spotlight pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090b]/80 via-transparent to-[#07090b] pointer-events-none" />

      {/* Decorative neon ambient orbs in corners */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#39ff14]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#00f0ff]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14] animate-pulse" />
          <span className="text-xs font-mono tracking-wide text-slate-300">
            Available for Freelance & Custom Web Projects
          </span>
        </div>

        {/* Hero Brand Centerpiece — Exactly styled after the provided logo */}
        <div className="mb-6 transform hover:scale-[1.02] transition-transform duration-500">
          <BrandLockup size="hero" glow={true} centered={true} />
        </div>

        {/* Disciplines Kicker Line from Michael's site */}
        <div className="text-xs sm:text-sm font-mono tracking-wider text-[#00f5d4] uppercase mb-6 flex flex-wrap items-center justify-center gap-2">
          <span>Graphic Design</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>UI/UX</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>WordPress</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Front-End Development</span>
        </div>

        {/* Hero Description from Michael's site */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10 text-balance">
          I design and develop websites and digital experiences that combine creative design with practical functionality. With extensive experience in graphic design and web development, I&apos;ve designed and developed 100+ websites for businesses and organizations.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-black bg-[#39ff14] hover:bg-[#52ff33] rounded-xl transition-all duration-300 box-glow-lime hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <span>View My Portfolio</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={handleResumeClick}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-[#39ff14]/50 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-[#39ff14]" />
            <span>View My Resume</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#00f5d4]/50 rounded-xl transition-all duration-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Contact Me</span>
            <span className="text-[#00f5d4] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-4 py-3.5 text-xs font-mono text-slate-400 hover:text-[#00f5d4] bg-transparent border border-white/[0.08] hover:border-[#00f5d4]/40 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            title="Click to copy email address"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#39ff14]" />
                <span className="text-[#39ff14]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="truncate">{email}</span>
              </>
            )}
          </button>
        </div>

        {/* Quantified Metrics Proof Bar from Michael's site */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#39ff14] tabular-nums tracking-tight">
              100<span className="text-white">+</span>
            </span>
            <span className="text-xs text-slate-300 font-sans mt-1">Websites Designed & Developed</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#00f5d4] tabular-nums tracking-tight">
              15<span className="text-white">+</span>
            </span>
            <span className="text-xs text-slate-300 font-sans mt-1">Years of Design & Development Experience</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#39ff14] tabular-nums tracking-tight">
              10<span className="text-white">+</span>
            </span>
            <span className="text-xs text-slate-300 font-sans mt-1">Years in Web & Design Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
};
