import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      {/* The glowing neon-lime indicator bar */}
      <div
        className="h-full bg-gradient-to-r from-[#39ff14] via-[#68ff3b] to-[#00f5d4] transition-[width] duration-75 ease-out shadow-[0_0_8px_#39ff14,0_0_16px_rgba(57,255,20,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading neon particle tip at the current scroll head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#39ff14,0_0_15px_#00f0ff] opacity-90" />
      </div>
    </div>
  );
};
