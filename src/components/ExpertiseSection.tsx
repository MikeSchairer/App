import React from 'react';
import { WHAT_I_DO, SKILLS_DATA } from '../data/projects';
import { StaggerContainer, StaggerItem } from './ScrollReveal';
import { Layout, Code2, Compass, Palette, Globe, Settings, Wrench } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6 text-[#39ff14]" />;
      case 'code':
        return <Code2 className="w-6 h-6 text-[#00f5d4]" />;
      case 'compass':
        return <Compass className="w-6 h-6 text-[#39ff14]" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-[#00f5d4]" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-[#39ff14]" />;
      case 'settings':
        return <Settings className="w-6 h-6 text-[#00f5d4]" />;
      default:
        return <Wrench className="w-6 h-6 text-[#39ff14]" />;
    }
  };

  return (
    <section id="what" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* 1. What I Do Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#39ff14] uppercase mb-2">
          <span>What I Do</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
          Full-Lifecycle Design & Web Development
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From initial brand concept to responsive frontend code and ongoing management.
        </p>
      </div>

      {/* What I Do 6-Grid with Cascading Staggered Entrance */}
      <StaggerContainer
        staggerDelay={0.08}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
      >
        {WHAT_I_DO.map((item, idx) => (
          <StaggerItem key={item.title}>
            <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] hover:border-[#39ff14]/40 transition-all duration-300 relative group flex flex-col justify-between h-full">
              <div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#39ff14] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>SPECIALTY #{idx + 1}</span>
                <span className="text-[#00f5d4] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 2. Skills Section from Michael's site */}
      <div id="skills" className="scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00f5d4] uppercase mb-2">
            <span>Technical & Creative Arsenal</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Skills & Technologies
          </h3>
        </div>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Design Skills */}
          <StaggerItem>
            <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] relative overflow-hidden group h-full">
              <div className="h-1 bg-gradient-to-r from-[#39ff14] to-transparent -mx-8 -mt-8 mb-6" />
              <h4 className="text-xl font-display font-bold text-white mb-4 flex items-center justify-between">
                <span>Design</span>
                <span className="text-xs font-mono text-[#39ff14]">CREATIVE</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.design.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 hover:border-[#39ff14]/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Web Development Skills */}
          <StaggerItem>
            <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] relative overflow-hidden group h-full">
              <div className="h-1 bg-gradient-to-r from-[#00f5d4] to-transparent -mx-8 -mt-8 mb-6" />
              <h4 className="text-xl font-display font-bold text-white mb-4 flex items-center justify-between">
                <span>Web Development</span>
                <span className="text-xs font-mono text-[#00f5d4]">ENGINEERING</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.webDevelopment.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 hover:border-[#00f5d4]/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Software & Tools */}
          <StaggerItem>
            <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] relative overflow-hidden group h-full">
              <div className="h-1 bg-gradient-to-r from-[#39ff14] via-[#00f5d4] to-transparent -mx-8 -mt-8 mb-6" />
              <h4 className="text-xl font-display font-bold text-white mb-4 flex items-center justify-between">
                <span>Software & Tools</span>
                <span className="text-xs font-mono text-slate-400">TOOLKIT</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.software.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 hover:border-white/20 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
