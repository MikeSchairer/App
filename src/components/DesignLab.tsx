import React, { useState } from 'react';
import { LogoMark } from './Logo';
import { Sliders, Eye, RefreshCw, Sparkles, Layers } from 'lucide-react';

export const DesignLab: React.FC = () => {
  const [glowIntensity, setGlowIntensity] = useState<number>(100);
  const [colorMode, setColorMode] = useState<'lime' | 'cyan' | 'both'>('lime');
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [bgStyle, setBgStyle] = useState<'brick' | 'obsidian' | 'grid'>('brick');

  const currentColorHex =
    colorMode === 'lime' ? '#39ff14' : colorMode === 'cyan' ? '#00f0ff' : '#00f5d4';

  const resetControls = () => {
    setGlowIntensity(100);
    setColorMode('lime');
    setShowWireframe(false);
    setBgStyle('brick');
  };

  return (
    <section id="design-lab" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39ff14] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Vector & Light Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
            Interactive Neon Engine
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Tweak luminescence, spectral harmonics, and vector topology in real time. Proving design precision through reactive code.
          </p>
        </div>

        <button
          onClick={resetControls}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-colors border border-white/[0.06] self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Lab Values</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Canvas Stage */}
        <div
          className={`lg:col-span-7 rounded-2xl border border-white/[0.1] relative flex flex-col items-center justify-center p-8 sm:p-14 min-h-[380px] sm:min-h-[460px] overflow-hidden transition-colors duration-500 shadow-2xl ${
            bgStyle === 'brick'
              ? 'bg-brick-texture'
              : bgStyle === 'grid'
              ? 'bg-[#07090b] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-[#050708]'
          }`}
        >
          {/* Real-time Dynamic Ambient Glow Filter */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-300"
            style={{
              width: `${260 + glowIntensity * 1.5}px`,
              height: `${260 + glowIntensity * 1.5}px`,
              backgroundColor: currentColorHex,
              opacity: (glowIntensity / 100) * 0.18,
              filter: `blur(${60 + glowIntensity * 0.4}px)`,
            }}
          />

          {/* Interactive Logo Mark rendered with dynamic values */}
          <div
            className="relative z-10 transition-transform duration-300 hover:scale-105 select-none"
            style={{
              filter: `drop-shadow(0 0 ${(glowIntensity / 100) * 22}px ${currentColorHex}) drop-shadow(0 0 ${
                (glowIntensity / 100) * 45
              }px ${currentColorHex}66)`,
            }}
          >
            <LogoMark size="hero" glow={false} />
          </div>

          {/* Wireframe coordinates overlay */}
          {showWireframe && (
            <div className="absolute inset-4 border border-dashed border-[#00f5d4]/40 rounded-xl pointer-events-none p-3 font-mono text-[9px] text-[#00f5d4] flex flex-col justify-between">
              <div className="flex justify-between">
                <span>COORD: [0, 0]</span>
                <span>ASPECT: 320x260 (MS INITIALS)</span>
              </div>
              <div className="flex justify-between">
                <span>BEVEL: 45° ISOMETRIC</span>
                <span>FILTER: GAUSSIAN ({glowIntensity}%)</span>
              </div>
            </div>
          )}

          {/* Live Stage Info Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <span>Mode: {colorMode.toUpperCase()}</span>
            <span>Intensity: {glowIntensity}%</span>
            <span>Backdrop: {bgStyle.toUpperCase()}</span>
          </div>
        </div>

        {/* Right Column: Control Dashboard */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0d1117] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider pb-3 border-b border-white/[0.06]">
              <Sliders className="w-4 h-4 text-[#39ff14]" />
              <span>Vector Shader Controls</span>
            </div>

            {/* Slider 1: Glow Luminescence */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300">Luminescence Output</span>
                <span className="font-mono text-[#39ff14]">{glowIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                className="w-full accent-[#39ff14] bg-white/[0.1] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% (Matte)</span>
                <span>100% (Default)</span>
                <span>180% (Overdrive)</span>
              </div>
            </div>

            {/* Control 2: Color Spectrum */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-300">Chromatic Spectrum</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setColorMode('lime')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    colorMode === 'lime'
                      ? 'bg-[#39ff14]/20 border border-[#39ff14] text-[#39ff14] font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#39ff14]" />
                  <span>Lime</span>
                </button>

                <button
                  onClick={() => setColorMode('cyan')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    colorMode === 'cyan'
                      ? 'bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  <span>Cyan</span>
                </button>

                <button
                  onClick={() => setColorMode('both')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    colorMode === 'both'
                      ? 'bg-gradient-to-r from-[#39ff14]/20 to-[#00f0ff]/20 border border-[#00f5d4] text-[#00f5d4] font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
                  <span>Spectral</span>
                </button>
              </div>
            </div>

            {/* Control 3: Backdrop Environment */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-300">Surface Environment</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setBgStyle('brick')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    bgStyle === 'brick'
                      ? 'bg-white/[0.1] border border-white/30 text-white font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  Dark Brick
                </button>
                <button
                  onClick={() => setBgStyle('obsidian')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    bgStyle === 'obsidian'
                      ? 'bg-white/[0.1] border border-white/30 text-white font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  Obsidian
                </button>
                <button
                  onClick={() => setBgStyle('grid')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    bgStyle === 'grid'
                      ? 'bg-white/[0.1] border border-white/30 text-white font-bold'
                      : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  Tech Grid
                </button>
              </div>
            </div>

            {/* Control 4: Wireframe Toggle */}
            <div className="pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04]">
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">Display Topology Wireframe</span>
                </div>
                <input
                  type="checkbox"
                  checked={showWireframe}
                  onChange={(e) => setShowWireframe(e.target.checked)}
                  className="accent-[#39ff14] w-4 h-4 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono text-slate-400 leading-relaxed">
            SVG vector elements are computed natively in React without external images, guaranteeing infinite resolution scaling from smartwatch to 8K displays.
          </div>
        </div>
      </div>
    </section>
  );
};
