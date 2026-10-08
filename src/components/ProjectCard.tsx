import React, { useRef } from 'react';
import { PortfolioItem } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ProjectCardProps {
  project: PortfolioItem;
  onSelect: (project: PortfolioItem) => void;
  featuredSpan?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  featuredSpan = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics spring interpolation
  const springConfig = { stiffness: 260, damping: 25 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 3D rotation transforms (subtle 8 degree max tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8.5, -8.5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8.5, 8.5]);

  // Dynamic specular glare translation
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized offset from center: -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative [perspective:1000px] ${
        featuredSpan ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      <motion.article
        onClick={() => onSelect(project)}
        data-cursor-label="VIEW"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col justify-between rounded-2xl bg-[#0d1117] border border-white/[0.08] hover:border-[#39ff14]/50 transition-colors duration-300 overflow-hidden cursor-pointer h-full will-change-transform shadow-lg hover:shadow-[0_15px_35px_-10px_rgba(57,255,20,0.2)]"
      >
        {/* Dynamic Specular Glare Overlay */}
        <motion.div
          style={{
            background:
              'radial-gradient(circle 300px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(57, 255, 20, 0.12), transparent 70%)',
          }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        />

        {/* Visual Image Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/40 [transform:translateZ(20px)]">
          <img
            src={project.image}
            alt={`${project.title} - ${project.subtitle}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />

          {/* Top Floating Badge */}
          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1] text-white opacity-80 group-hover:opacity-100 group-hover:text-[#39ff14] group-hover:border-[#39ff14]/50 transition-all [transform:translateZ(30px)]">
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1 justify-between -mt-6 relative z-10 [transform:translateZ(25px)]">
          <div>
            {/* Category & Title */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span className="text-[#39ff14]">{project.categoryLabel}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#39ff14] transition-colors tracking-tight text-balance">
              {project.title}
            </h3>

            <div className="text-xs font-mono text-[#00f5d4] mt-1">
              {project.subtitle}
            </div>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills & Detail Link */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5 max-w-[70%]">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.04]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-xs font-semibold text-[#00f5d4] group-hover:underline flex items-center gap-1 shrink-0">
              Details
              <span>→</span>
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
