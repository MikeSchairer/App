/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExpertiseSection } from './components/ExpertiseSection';
import { FeaturedCaseStudy } from './components/FeaturedCaseStudy';
import { DesignLab } from './components/DesignLab';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollReveal } from './components/ScrollReveal';
import { REAL_PORTFOLIO, PortfolioItem } from './data/projects';
import { ThemeProvider } from './context/ThemeContext';
import { TiltProvider } from './context/TiltContext';
import { TiltBadge } from './components/TiltBadge';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('view-work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: PortfolioItem) => {
    setSelectedProject(project);
  };

  return (
    <ThemeProvider>
      <TiltProvider>
        <div className="min-h-screen bg-[#07090b] text-[#f1f5f9] flex flex-col selection:bg-[#39ff14] selection:text-black">
        {/* Top Neon-Lime Scroll Progress Tracker */}
        <ScrollProgress />

        {/* Animated Custom Neon-Lime Cursor */}
        <CustomCursor />

        {/* Top Fixed Header */}
        <Navbar onContactClick={scrollToContact} />

        {/* Main Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onExploreClick={scrollToWork}
            onContactClick={scrollToContact}
          />

          {/* 2. About Michael Schairer (Slides in with Spring from Left) */}
          <ScrollReveal effect="slide-left" viewportMargin="-80px">
            <AboutSection />
          </ScrollReveal>

          {/* 3. What I Do & Skills (Slides in with Spring from Right) */}
          <ScrollReveal effect="slide-right" viewportMargin="-80px">
            <ExpertiseSection />
          </ScrollReveal>

          {/* 4. Portfolio Project Showcase (Bounces & Fades Up onto Screen) */}
          <ScrollReveal effect="bounce-up" viewportMargin="-60px">
            <ProjectShowcase onContactClick={scrollToContact} />
          </ScrollReveal>

          {/* 5. Flagship Client Spotlight (Zoom-Bounces into Focus) */}
          <ScrollReveal effect="zoom-bounce" viewportMargin="-70px">
            <FeaturedCaseStudy
              onSelectProject={handleSelectProject}
              onContactClick={scrollToContact}
            />
          </ScrollReveal>

          {/* 6. Interactive Vector & Neon Light Lab (Slides in from Left) */}
          <ScrollReveal effect="slide-left" viewportMargin="-80px">
            <DesignLab />
          </ScrollReveal>

          {/* 7. Contact Section (Bounces & Fades Up onto Screen) */}
          <ScrollReveal effect="bounce-up" viewportMargin="-70px">
            <ContactSection />
          </ScrollReveal>
        </main>

        {/* Footer (Fully Responsive with touch-friendly navigation) */}
        <Footer />

        {/* Global Project Modal Lightbox */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={scrollToContact}
        />

          {/* Floating Subtle 3D Tilt Status Pill (Bottom-Left) */}
          <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
            <TiltBadge />
          </div>

          {/* Floating Animated Scroll-To-Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollToTop}
                aria-label="Scroll to top of page"
                className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#0d1117]/90 hover:bg-[#39ff14] text-slate-300 hover:text-black border border-white/[0.1] hover:border-[#39ff14] backdrop-blur-md shadow-2xl transition-all duration-300 box-glow-lime cursor-pointer group"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </TiltProvider>
    </ThemeProvider>
  );
}
