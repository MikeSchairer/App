import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Michael delivered both our complete brand identity system and our React analytics frontend in under 6 weeks. Having one person master both disciplines saved us hundreds of meeting hours and gave us a unified product quality that helped us close our $4.5M Series A.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'FinScale Logistics',
      accent: '#39ff14',
    },
    {
      quote:
        'Finding a developer who genuinely understands typography, line height, and color harmony is almost impossible. Michael not only implemented our design flawlessly down to the pixel, but he also enhanced our responsiveness and dropped our load times to 400ms.',
      author: 'Sarah Chen',
      role: 'Head of Product Design',
      company: 'Vektor Acoustics Lab',
      accent: '#00f5d4',
    },
    {
      quote:
        'Our brand launch needed an unmistakable visual edge. Michael created an identity that our community immediately fell in love with, then built an interactive 3D web experience that won multiple design site-of-the-day recognitions.',
      author: 'Julian Reed',
      role: 'Founder & Creative Lead',
      company: 'Kroma Studio',
      accent: '#39ff14',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono tracking-widest text-[#39ff14] uppercase mb-2">
          Client Feedback & Attributions
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight text-balance">
          Trusted by High-Velocity Founders & Product Teams
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.15] transition-all relative group"
          >
            <div className="space-y-4">
              <Quote
                className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: t.accent }}
              />
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="font-display font-bold text-white text-sm">
                {t.author}
              </div>
              <div className="text-xs text-slate-400 font-sans mt-0.5">
                {t.role} · <span className="text-slate-300">{t.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
