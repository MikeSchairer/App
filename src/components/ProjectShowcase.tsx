import React, { useState } from 'react';
import { PortfolioItem, REAL_PORTFOLIO } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { StaggerContainer, StaggerItem } from './ScrollReveal';
import { Layers } from 'lucide-react';

interface ProjectShowcaseProps {
  onContactClick: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: `All Works (${REAL_PORTFOLIO.length})` },
    { id: 'websites', label: 'Websites & Development' },
    { id: 'graphic-design', label: 'Graphic & Social Media' },
    { id: 'email-ads', label: 'Email Advertisements' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? REAL_PORTFOLIO
      : REAL_PORTFOLIO.filter((p) => p.category === activeCategory);

  return (
    <section id="view-work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39ff14] uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>My Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
            Selected Client Work & Projects
          </h2>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm self-start md:self-auto overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#39ff14] text-black font-semibold box-glow-lime'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout with Cascading Staggered Entrance */}
      <StaggerContainer
        staggerDelay={0.06}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, idx) => (
          <StaggerItem
            key={project.id}
            className={activeCategory === 'all' && (idx === 0 || idx === 6) ? 'md:col-span-2' : 'col-span-1'}
          >
            <ProjectCard
              project={project}
              onSelect={setSelectedProject}
              featuredSpan={false}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Case Study Modal Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={onContactClick}
      />
    </section>
  );
};
