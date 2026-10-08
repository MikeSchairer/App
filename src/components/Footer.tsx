import React from 'react';
import { LogoMark } from './Logo';
import { RESUME_URL } from '../data/projects';
import { ArrowUp, FileText, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const internalLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About Me', href: '#about' },
    { label: 'What I Do', href: '#what' },
    { label: 'Portfolio', href: '#view-work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090b] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <LogoMark size="sm" glow={true} />
              <span className="font-display font-extrabold text-white text-base sm:text-lg tracking-[0.2em] uppercase">
                Michael Schairer
              </span>
            </div>
            <p className="font-mono text-xs text-[#00f5d4] tracking-widest uppercase">
              Web Graphic Designer & Developer
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
              Combining creative graphic design, responsive web development, and database technology for 100+ businesses and organizations.
            </p>
          </div>

          {/* Quick Page Jump Links */}
          <div className="lg:col-span-4 text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Navigation
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2.5 text-xs font-mono text-slate-300">
              {internalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="py-1 min-h-[36px] flex items-center hover:text-[#39ff14] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Resume Action Area */}
          <div className="lg:col-span-3 text-center md:text-left space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Direct Access
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center md:justify-start">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-start gap-2 px-3.5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#39ff14] hover:border-[#39ff14]/50 transition-all min-h-[44px]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href="mailto:Mike.Schairer@gmail.com"
                className="inline-flex items-center justify-center md:justify-start gap-2 px-3.5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all min-h-[44px]"
              >
                <Mail className="w-3.5 h-3.5 text-[#00f5d4]" />
                <span className="truncate">Mike.Schairer@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links Row — Fully Responsive Wrap */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Social Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <a
              href="https://github.com/mikeschairer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-[#39ff14] transition-colors border border-white/[0.05] flex items-center gap-1.5 min-h-[36px]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://mikeschairer.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-[#00f5d4] transition-colors border border-white/[0.05] flex items-center gap-1.5 min-h-[36px]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub Pages Site</span>
            </a>

            <a
              href="mailto:Mike.Schairer@gmail.com"
              className="px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-[#39ff14] transition-colors border border-white/[0.05] flex items-center gap-1.5 min-h-[36px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} Michael Schairer
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-[#39ff14] transition-colors border border-white/[0.08] cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label="Back to top of page"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
