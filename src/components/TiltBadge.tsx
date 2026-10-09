import React from 'react';
import { useTilt } from '../context/TiltContext';
import { Compass, Sparkles, Smartphone, EyeOff } from 'lucide-react';

interface TiltBadgeProps {
  className?: string;
}

export const TiltBadge: React.FC<TiltBadgeProps> = ({ className = '' }) => {
  const {
    isSupported,
    permission,
    isMobile,
    isEnabled,
    tiltX,
    tiltY,
    rawGamma,
    rawBeta,
    requestPermission,
    toggleTilt,
    recenter,
  } = useTilt();

  // If user is on iOS and hasn't granted permission yet
  if (isMobile && permission === 'prompt') {
    return (
      <button
        onClick={requestPermission}
        className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#39ff14]/15 via-white/[0.06] to-[#00f5d4]/15 border border-[#39ff14]/40 hover:border-[#39ff14] backdrop-blur-md text-xs font-mono text-slate-200 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.25)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-95 cursor-pointer ${className}`}
        title="Tap to enable interactive 3D phone tilting"
      >
        <Smartphone className="w-3.5 h-3.5 text-[#39ff14] animate-bounce" />
        <span className="font-semibold text-white">Enable Live 3D Tilt</span>
        <Sparkles className="w-3 h-3 text-[#00f5d4] group-hover:rotate-45 transition-transform" />
      </button>
    );
  }

  // Active status indicator with interactive toggle and tap-to-recenter level bubble
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-md text-[11px] font-mono text-slate-300 transition-all select-none ${className}`}
    >
      <button
        onClick={toggleTilt}
        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
        title={isEnabled ? 'Click to pause 3D motion' : 'Click to enable 3D motion'}
      >
        {isEnabled ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39ff14]" />
            </span>
            <Compass className="w-3.5 h-3.5 text-[#39ff14] group-hover:rotate-45 transition-transform" />
            <span className="text-slate-300 group-hover:text-white">
              3D Live Tilt
            </span>
          </>
        ) : (
          <>
            <EyeOff className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400">Tilt Paused</span>
          </>
        )}
      </button>

      {/* Interactive Level Bubble (tap to recenter zero point) */}
      {isEnabled && (
        <button
          onClick={recenter}
          className="w-7 h-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors"
          title="Tap to recenter / level zero position"
        >
          <div
            className="w-2 h-2 rounded-full bg-[#00f5d4] shadow-[0_0_6px_#00f5d4]"
            style={{
              transform: `translate(${tiltX * 8}px, ${tiltY * 2}px)`,
            }}
          />
        </button>
      )}
    </div>
  );
};
