import React, { useState, useEffect } from 'react';
import { LogoMark } from './Logo';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ArrowUpRight, FileText, ChevronRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { number: '01', label: 'Home', href: '#hero' },
    { number: '02', label: 'About Me', href: '#about' },
    { number: '03', label: 'What I Do', href: '#what' },
    { number: '04', label: 'My Portfolio', href: '#view-work' },
    { number: '05', label: 'Skills & Tools', href: '#skills' },
    { number: '06', label: 'Experience', href: '#experience' },
    { number: '07', label: 'Contact Me', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    window.open('/Michael_Schairer_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#07090b]/98 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#07090b]/80 backdrop-blur-sm border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Zone 1: Brand title / lockup */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff14] rounded-lg p-1 -ml-1 cursor-pointer min-w-0"
          aria-label="Michael Schairer Homepage"
        >
          <LogoMark size="sm" glow={true} className="group-hover:scale-105 transition-transform shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-display font-extrabold text-white text-xs xs:text-sm sm:text-base tracking-[0.14em] sm:tracking-[0.16em] uppercase group-hover:text-[#39ff14] transition-colors truncate">
              Michael Schairer
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#00f5d4] tracking-wider uppercase -mt-0.5 truncate hidden xs:block">
              Web Designer & Developer
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop Navigation links (lg screens and up) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium tracking-wide">
          {navLinks.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-slate-300 hover:text-white transition-colors py-1 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#39ff14] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Desktop Buttons & Theme Toggle & High-Visibility Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Button (Desktop & Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#39ff14]/50 text-slate-300 hover:text-[#39ff14] transition-all cursor-pointer flex items-center gap-1.5 group select-none"
            aria-label={theme === 'dark' ? 'Switch to high-contrast light mode' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[#e2ff40] group-hover:rotate-45 transition-transform" />
                <span className="text-[10px] font-mono font-medium hidden md:inline text-slate-300">
                  Light
                </span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#16a34a] group-hover:-rotate-12 transition-transform" />
                <span className="text-[10px] font-mono font-medium hidden md:inline text-slate-700">
                  Dark
                </span>
              </>
            )}
          </button>

          {/* Desktop-only action buttons */}
          <button
            onClick={handleResumeClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-[#39ff14] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-all whitespace-nowrap cursor-pointer"
            title="Open Resume PDF"
          >
            <FileText className="w-3.5 h-3.5 text-[#39ff14]" />
            <span>Resume</span>
          </button>

          <button
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-[#39ff14] hover:bg-[#52ff33] rounded-lg transition-all duration-200 box-glow-lime hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* HIGH-VISIBILITY MOBILE NAVIGATION MENU BUTTON (Always visible below lg breakpoint) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none ${
              mobileMenuOpen
                ? 'bg-[#131720] border-[#39ff14] text-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.5)]'
                : 'bg-[#0d1117] border-[#39ff14] text-white hover:bg-[#131720] shadow-[0_0_12px_rgba(57,255,20,0.35)]'
            }`}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="font-mono text-xs font-bold tracking-wider text-[#39ff14]">
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#39ff14] shrink-0" />
            ) : (
              <Menu className="w-5 h-5 text-[#39ff14] shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          FULL-HEIGHT, HIGH-CONTRAST MOBILE DRAWER NAVIGATION
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#07090b]/98 backdrop-blur-2xl border-t border-white/[0.1] z-50 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 px-6 py-6 pb-12">
          {/* Nav List */}
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500">
                Site Navigation
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-slate-300"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#e2ff40]" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <nav className="flex flex-col divide-y divide-white/[0.06]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group flex items-center justify-between py-3.5 text-slate-100 hover:text-white active:text-[#39ff14] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00f5d4] group-hover:text-[#39ff14] transition-colors">
                      {link.number}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-bold tracking-tight group-hover:text-[#39ff14] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#39ff14] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>
          </div>

          {/* Action Area at bottom of Mobile Drawer */}
          <div className="space-y-3 pt-6 border-t border-white/[0.1] mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleResumeClick();
              }}
              className="w-full py-3.5 px-4 text-center text-xs font-mono font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-xl border border-white/[0.12] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <FileText className="w-4 h-4 text-[#39ff14]" />
              <span>View Resume (PDF)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-4 px-4 text-center text-sm font-display font-extrabold text-black bg-[#39ff14] hover:bg-[#52ff33] rounded-xl box-glow-lime active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <a
                href="mailto:Mike.Schairer@gmail.com"
                className="font-mono text-xs text-[#00f5d4] hover:underline"
              >
                Mike.Schairer@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
