import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
  useCallback,
} from 'react';

export interface TiltContextType {
  tiltX: number; // Normalized -1 (left) to +1 (right)
  tiltY: number; // Normalized -1 (up) to +1 (down)
  rawGamma: number; // Relative tilt left/right deg
  rawBeta: number; // Relative tilt front/back deg
  isSupported: boolean;
  permission: 'prompt' | 'granted' | 'denied' | 'not-needed';
  isMobile: boolean;
  isEnabled: boolean;
  requestPermission: () => Promise<boolean>;
  toggleTilt: () => void;
  recenter: () => void;
}

const TiltContext = createContext<TiltContextType | undefined>(undefined);

export const TiltProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [rawDeg, setRawDeg] = useState({ gamma: 0, beta: 0 });
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<
    'prompt' | 'granted' | 'denied' | 'not-needed'
  >('prompt');
  const [isMobile, setIsMobile] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Mutable refs to prevent stale closures and unnecessary re-attachments
  const isEnabledRef = useRef(true);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Calibration baseline (records posture when enabled or recentered)
  const isCalibratedRef = useRef(false);
  const baselineRef = useRef({ gamma: 0, beta: 45 });
  const isListeningRef = useRef(false);

  // Sync isEnabled state with ref
  useEffect(() => {
    isEnabledRef.current = isEnabled;
    if (!isEnabled) {
      targetX.current = 0;
      targetY.current = 0;
    }
  }, [isEnabled]);

  // Recenter / Calibrate current device posture as neutral zero
  const recenter = useCallback(() => {
    isCalibratedRef.current = false;
    targetX.current = 0;
    targetY.current = 0;
  }, []);

  // Stable device orientation listener
  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (!isEnabledRef.current) return;

    const rawG = event.gamma; // Left-to-right tilt in deg
    const rawB = event.beta; // Front-to-back tilt in deg

    // Ignore events without orientation data
    if (rawG === null || rawB === null) return;

    // Calibrate baseline on first valid reading
    if (!isCalibratedRef.current) {
      baselineRef.current = { gamma: rawG, beta: rawB };
      isCalibratedRef.current = true;
      return;
    }

    // Relative delta from calibrated baseline
    const deltaGamma = rawG - baselineRef.current.gamma;
    const deltaBeta = rawB - baselineRef.current.beta;

    // Sensitivity: ±22 degrees tilts to full 1.0 range
    const normX = Math.max(-1, Math.min(1, deltaGamma / 22));
    const normY = Math.max(-1, Math.min(1, deltaBeta / 22));

    targetX.current = normX;
    targetY.current = normY;

    setRawDeg({
      gamma: Math.round(deltaGamma),
      beta: Math.round(deltaBeta),
    });
  }, []);

  const attachOrientationListener = useCallback(() => {
    if (isListeningRef.current || typeof window === 'undefined') return;

    window.addEventListener('deviceorientation', handleDeviceOrientation, {
      passive: true,
    });
    isListeningRef.current = true;
  }, [handleDeviceOrientation]);

  // Initialization and desktop mouse fallback
  useEffect(() => {
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsMobile(isTouchDevice);

    if (typeof window !== 'undefined') {
      const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof DeviceOrientationEventAny !== 'undefined') {
        setIsSupported(true);

        if (typeof DeviceOrientationEventAny.requestPermission === 'function') {
          // iOS 13+ requires user gesture request
          setPermission('prompt');
        } else {
          // Android and modern non-iOS browsers require no permission
          setPermission('not-needed');
          attachOrientationListener();
        }
      } else {
        setIsSupported(false);
        setPermission('not-needed');
      }

      // Reset calibration on orientation changes (portrait <-> landscape)
      const handleOrientationChange = () => {
        isCalibratedRef.current = false;
      };
      window.addEventListener('orientationchange', handleOrientationChange);

      // Desktop mouse fallback
      const handleMouseMove = (e: MouseEvent) => {
        if (!isEnabledRef.current || isListeningRef.current) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const xPct = (e.clientX / width - 0.5) * 2;
        const yPct = (e.clientY / height - 0.5) * 2;
        targetX.current = Math.max(-1, Math.min(1, xPct));
        targetY.current = Math.max(-1, Math.min(1, yPct));
      };

      const handleMouseLeave = () => {
        if (!isListeningRef.current) {
          targetX.current = 0;
          targetY.current = 0;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [attachOrientationListener]);

  const requestPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    const DeviceOrientationEventAny = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (
      typeof DeviceOrientationEventAny !== 'undefined' &&
      typeof DeviceOrientationEventAny.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          setPermission('granted');
          setIsEnabled(true);
          isEnabledRef.current = true;
          isCalibratedRef.current = false; // Fresh calibration
          attachOrientationListener();
          return true;
        } else {
          setPermission('denied');
          return false;
        }
      } catch (err) {
        console.warn('DeviceOrientation permission request error:', err);
        setPermission('denied');
        return false;
      }
    } else {
      setPermission('granted');
      setIsEnabled(true);
      isEnabledRef.current = true;
      isCalibratedRef.current = false;
      attachOrientationListener();
      return true;
    }
  };

  const toggleTilt = () => {
    setIsEnabled((prev) => {
      const next = !prev;
      isEnabledRef.current = next;
      if (!next) {
        targetX.current = 0;
        targetY.current = 0;
      } else {
        isCalibratedRef.current = false; // Calibrate when re-enabling
      }
      return next;
    });
  };

  // Continuous buttery-smooth physics LERP loop (60-120fps)
  useEffect(() => {
    let animId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updatePhysics = () => {
      // Smooth lerp (0.16 factor = ultra-responsive with organic damping)
      currentX.current = lerp(currentX.current, targetX.current, 0.16);
      currentY.current = lerp(currentY.current, targetY.current, 0.16);

      const roundedX = Math.round(currentX.current * 1000) / 1000;
      const roundedY = Math.round(currentY.current * 1000) / 1000;

      // Update CSS variables on documentElement for direct hardware-accelerated transforms
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.style.setProperty('--tilt-x', roundedX.toString());
        root.style.setProperty('--tilt-y', roundedY.toString());
        root.style.setProperty('--tilt-rot-x', `${(-roundedY * 18).toFixed(2)}deg`);
        root.style.setProperty('--tilt-rot-y', `${(roundedX * 18).toFixed(2)}deg`);
      }

      setTilt((prev) => {
        if (
          Math.abs(prev.x - roundedX) > 0.001 ||
          Math.abs(prev.y - roundedY) > 0.001
        ) {
          return { x: roundedX, y: roundedY };
        }
        return prev;
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <TiltContext.Provider
      value={{
        tiltX: tilt.x,
        tiltY: tilt.y,
        rawGamma: rawDeg.gamma,
        rawBeta: rawDeg.beta,
        isSupported,
        permission,
        isMobile,
        isEnabled,
        requestPermission,
        toggleTilt,
        recenter,
      }}
    >
      {children}
    </TiltContext.Provider>
  );
};

export const useTilt = (): TiltContextType => {
  const context = useContext(TiltContext);
  if (!context) {
    throw new Error('useTilt must be used within a TiltProvider');
  }
  return context;
};
