import React from 'react';
import { REAL_PORTFOLIO, PortfolioItem } from '../data/projects';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

interface FeaturedCaseStudyProps {
  onSelectProject: (project: PortfolioItem) => void;
  onContactClick: () => void;
}

export const FeaturedCaseStudy: React.FC<FeaturedCaseStudyProps> = ({
  onSelectProject,
  onContactClick,
}) => {
  const project = REAL_PORTFOLIO[0]; // Badger Tobacco

  return (
    <section id="case-study" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="relative rounded-3xl bg-[#0b0e14] border border-white/[0.1] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Ambient background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39ff14]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Case Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#39ff14]">
                Featured Client Spotlight
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight text-balance">
              {project.title}
            </h2>

            <div className="text-sm font-mono text-[#00f5d4]">
              {project.subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.details || project.description}
            </p>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#39ff14] tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Custom Coded</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#00f5d4] tabular-nums">
                  Mobile
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Responsive Design</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                  UI/UX
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Branded Layout</div>
              </div>
            </div>

            {/* Solution Highlights */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#39ff14] shrink-0 mt-0.5" />
                <span>Responsive layout engineered for seamless navigation across all devices.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
                <span>Cohesive visual styling, custom graphics, and product catalog presentation.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#39ff14] shrink-0 mt-0.5" />
                <span>Modern coding standards ensuring high performance and fast load times.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onSelectProject(project)}
                className="px-6 py-3 rounded-xl bg-[#39ff14] hover:bg-[#52ff33] text-black font-bold text-xs box-glow-lime transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Project Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] text-xs font-semibold transition-all cursor-pointer"
              >
                Inquire for Similar Website
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={() => onSelectProject(project)}
              className="relative rounded-2xl overflow-hidden border border-white/[0.15] bg-black/60 shadow-2xl group cursor-pointer"
            >
              <img
                src={project.image}
                alt={`${project.title} - ${project.subtitle}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />

              {/* In-Frame Status Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur border border-white/[0.1] text-white">
                  <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
                  <span>{project.categoryLabel}</span>
                </div>
                <div className="text-slate-300">Click to Expand</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
