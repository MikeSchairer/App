import React, { useEffect } from 'react';
import { PortfolioItem } from '../data/projects';
import { X, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0d1117] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0d1117]/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] shadow-[0_0_10px_#39ff14]" />
            <span className="text-xs font-mono tracking-wider text-[#39ff14] uppercase">
              {project.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff14] cursor-pointer"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Cover Showcase Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/[0.08] bg-black/60 max-h-[500px]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight"
            >
              {project.title}
            </h2>
            <div className="text-sm font-mono text-[#00f5d4] mt-1">
              {project.subtitle}
            </div>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {project.details || project.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technologies & Role Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#39ff14]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="py-3 px-6 rounded-xl bg-[#39ff14] hover:bg-[#52ff33] text-black font-semibold text-xs box-glow-lime transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="mailto:Mike.Schairer@gmail.com"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Mike.Schairer@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
