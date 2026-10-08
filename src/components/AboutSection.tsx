import React from 'react';
import { EDUCATION_DATA, EXPERIENCE_DATA, RESUME_URL } from '../data/projects';
import { StaggerContainer, StaggerItem } from './ScrollReveal';
import { User, GraduationCap, Briefcase, FileText, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const handleResumeClick = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* About Me Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Authentic Bio from Michael's site */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#39ff14]">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
            Design, Technology & Usability
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            <p className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] border-l-2 border-l-[#39ff14]">
              I&apos;m a Graphic Designer and Web Developer with a background that combines creative design, web development, database technology, and digital problem-solving.
            </p>
            <p>
              I&apos;ve designed and developed 100+ websites, creating everything from visual layouts and branding to responsive websites and custom web solutions.
            </p>
            <p>
              My experience includes UI/UX design, WordPress, HTML, CSS, JavaScript, PHP, ASP.NET, SQL databases, graphic design, website management, and digital marketing.
            </p>
            <p className="text-slate-200 font-medium">
              I enjoy taking an idea from concept to finished product—bringing together design, technology, and usability to create websites that look great and work effectively.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleResumeClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#39ff14] hover:bg-[#52ff33] text-black font-bold text-xs box-glow-lime transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="mailto:Mike.Schairer@gmail.com"
              className="text-xs font-mono text-[#00f5d4] hover:underline"
            >
              Mike.Schairer@gmail.com
            </a>
          </div>
        </div>

        {/* Right Column: Education Timeline from Michael's site */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00f5d4]">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </div>

          <h3 className="text-2xl font-display font-bold text-white">
            Academic Background
          </h3>

          <StaggerContainer staggerDelay={0.1} className="space-y-4">
            {EDUCATION_DATA.map((edu) => (
              <StaggerItem key={edu.institution}>
                <div className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.08] hover:border-[#00f5d4]/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base font-display font-bold text-white">
                      {edu.institution}
                    </h4>
                    <span className="text-xs font-mono text-[#00f5d4] px-2 py-0.5 rounded bg-[#00f5d4]/10 self-start sm:self-auto">
                      {edu.year}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 font-medium">{edu.degree}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono">{edu.graduated}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Professional Experience Section from Michael's site */}
      <div id="experience" className="pt-12 border-t border-white/[0.08] scroll-mt-20">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#39ff14] mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Work History</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-8">
          Professional Experience
        </h3>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPERIENCE_DATA.map((exp) => (
            <StaggerItem key={exp.company + exp.period}>
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/[0.08] hover:border-[#39ff14]/30 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#39ff14] tracking-wide">
                      {exp.period}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Verified
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    {exp.company}
                  </h4>
                  <div className="text-xs font-mono text-[#00f5d4] mb-3">
                    {exp.role}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
