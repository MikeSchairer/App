import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  // References for coordinates and smooth lerp
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    // Add class to body to hide default system cursor on fine pointer devices
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the central dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if current target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"], .cursor-pointer'
        );

        if (interactiveEl) {
          setIsHoveringInteractive(true);
          const customLabel = interactiveEl.getAttribute('data-cursor-label');
          setHoverLabel(customLabel);
        } else {
          setIsHoveringInteractive(false);
          setHoverLabel(null);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop for the trailing outer ring
    const renderLoop = () => {
      const ease = 0.18; // smooth interpolation factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // If not a mouse device, do not render anything
  if (!isPointerDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Trailing Outer Neon Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-5 -mt-5 will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
            isHoveringInteractive
              ? isClicking
                ? 'w-10 h-10 border-2 border-[#00f5d4] bg-[#39ff14]/30 shadow-[0_0_25px_#39ff14] scale-90'
                : 'w-14 h-14 -ml-2 -mt-2 border border-[#39ff14] bg-[#39ff14]/15 shadow-[0_0_25px_rgba(57,255,20,0.6)] backdrop-blur-[1px]'
              : isClicking
              ? 'w-7 h-7 ml-1.5 mt-1.5 border border-[#39ff14] bg-[#39ff14]/30 shadow-[0_0_15px_#39ff14] scale-75'
              : 'w-10 h-10 border border-[#39ff14]/70 shadow-[0_0_15px_rgba(57,255,20,0.35)]'
          }`}
        >
          {/* Subtle neon pulse crosshair or label when hovering clickable targets */}
          {isHoveringInteractive && hoverLabel && (
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#39ff14] uppercase drop-shadow-[0_0_5px_#39ff14]">
              {hoverLabel}
            </span>
          )}

          {/* Interactive corner ticks */}
          {isHoveringInteractive && !hoverLabel && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] shadow-[0_0_6px_#00f5d4] animate-ping opacity-60" />
          )}
        </div>
      </div>

      {/* 2. Precision Center Neon Dot (Zero Latency) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 will-change-transform"
      >
        <div
          className={`rounded-full bg-[#39ff14] transition-all duration-150 ${
            isHoveringInteractive
              ? 'w-2 h-2 -ml-0.5 -mt-0.5 shadow-[0_0_12px_#39ff14] bg-white ring-2 ring-[#39ff14]'
              : isClicking
              ? 'w-2.5 h-2.5 -ml-0.5 -mt-0.5 shadow-[0_0_16px_#00f5d4] bg-[#00f5d4]'
              : 'w-3 h-3 shadow-[0_0_10px_#39ff14]'
          }`}
        />
      </div>
    </div>
  );
};
