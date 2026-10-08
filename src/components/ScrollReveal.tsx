import React, { ReactNode } from 'react';
import { motion, Variants, Transition } from 'motion/react';

type AnimationEffect =
  | 'bounce-up'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-bounce'
  | 'fade-up';

interface ScrollRevealProps {
  children: ReactNode;
  effect?: AnimationEffect;
  className?: string;
  delay?: number;
  duration?: number;
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  effect = 'bounce-up',
  className = '',
  delay = 0,
  viewportMargin = '-70px',
  once = false,
}) => {
  const getInitial = () => {
    switch (effect) {
      case 'slide-left':
        return { opacity: 0, x: -80, scale: 0.97 };
      case 'slide-right':
        return { opacity: 0, x: 80, scale: 0.97 };
      case 'zoom-bounce':
        return { opacity: 0, scale: 0.8, y: 20 };
      case 'fade-up':
        return { opacity: 0, y: 45 };
      case 'bounce-up':
      default:
        return { opacity: 0, y: 70, scale: 0.94 };
    }
  };

  const getWhileInView = () => {
    switch (effect) {
      case 'slide-left':
      case 'slide-right':
        return { opacity: 1, x: 0, scale: 1 };
      case 'zoom-bounce':
        return { opacity: 1, scale: 1, y: 0 };
      case 'fade-up':
      case 'bounce-up':
      default:
        return { opacity: 1, y: 0, scale: 1 };
    }
  };

  const getTransition = (): Transition => {
    switch (effect) {
      case 'slide-left':
      case 'slide-right':
        return {
          type: 'spring',
          stiffness: 95,
          damping: 14,
          mass: 0.8,
          delay,
        };
      case 'zoom-bounce':
        return {
          type: 'spring',
          stiffness: 140,
          damping: 11,
          bounce: 0.4,
          delay,
        };
      case 'fade-up':
        return {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1] as const,
          delay,
        };
      case 'bounce-up':
      default:
        return {
          type: 'spring',
          stiffness: 90,
          damping: 12,
          mass: 0.9,
          bounce: 0.3,
          delay,
        };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getWhileInView()}
      viewport={{ once, margin: viewportMargin }}
      transition={getTransition()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* Stagger Grid Container & Items for cards cascading in as you scroll */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportMargin?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  viewportMargin = '-60px',
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 13,
        bounce: 0.3,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
