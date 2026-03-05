'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * LuckyFolks Menu Icon Fling Animation - Driftwoods Rebuild
 * 
 * Original: Matter.js physics + p5.js canvas
 * Rebuild: Framer Motion spring physics (lighter, React-native)
 * 
 * Animation: Icons spawn off-screen right, fling left with spring physics,
 * bounce off invisible left boundary, and fall off-screen.
 */

interface IconConfig {
  id: number;
  icon: string;
  startX: number;
  startY: number;
  rotation: number;
  forceX: number;
  forceY: number;
  size: number;
  delay: number;
}

const ICON_ASSETS = [
  '/icons/fork.svg',
  '/icons/dice.svg', 
  '/icons/fries.svg',
  '/icons/horseshoe.svg',
  '/icons/logo.svg',
];

const FlingIcon: React.FC<{ config: IconConfig; onComplete: () => void }> = ({ 
  config, 
  onComplete 
}) => {
  const controls = useAnimation();
  const [phase, setPhase] = useState<'spawn' | 'fling' | 'bounce' | 'fall'>('spawn');

  useEffect(() => {
    const animate = async () => {
      // Phase 1: Spawn off-screen
      await controls.start({
        x: config.startX,
        y: config.startY,
        rotate: config.rotation,
        opacity: 1,
        transition: { duration: 0 }
      });

      setPhase('fling');

      // Phase 2: Fling left with force
      await controls.start({
        x: -100, // Target: off-screen left (will bounce before reaching)
        y: config.startY + config.forceY * 100,
        rotate: config.rotation + (config.forceX * 20),
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 8,
          mass: 6,
          velocity: config.forceX * 10,
          duration: 0.8,
        }
      });

      setPhase('bounce');

      // Phase 3: Bounce back (simulate wall collision with restitution 0.8)
      await controls.start({
        x: 150 + Math.random() * 200, // Bounce back to left side
        y: config.startY + 200 + Math.random() * 150,
        rotate: config.rotation + (config.forceX * 40),
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 15,
          mass: 6,
          velocity: Math.abs(config.forceX) * 8, // Reduced by restitution
          duration: 0.6,
        }
      });

      setPhase('fall');

      // Phase 4: Fall off-screen with gravity
      await controls.start({
        x: 50 + Math.random() * 100,
        y: window.innerHeight + 200,
        rotate: config.rotation + (config.forceX * 80),
        opacity: 0.8,
        transition: {
          type: 'tween',
          ease: 'easeIn',
          duration: 1.2,
        }
      });

      // Cleanup
      onComplete();
    };

    const timer = setTimeout(animate, config.delay);
    return () => clearTimeout(timer);
  }, [config, controls, onComplete]);

  return (
    <motion.img
      src={config.icon}
      alt="Menu icon"
      className="absolute pointer-events-none"
      style={{
        width: config.size,
        height: config.size,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
      }}
      initial={{ 
        x: config.startX, 
        y: config.startY, 
        rotate: config.rotation,
        opacity: 0 
      }}
      animate={controls}
    />
  );
};

export const MenuIconFling: React.FC<{ 
  isActive: boolean; 
  onComplete?: () => void;
}> = ({ 
  isActive, 
  onComplete 
}) => {
  const [icons, setIcons] = useState<IconConfig[]>([]);
  const [activeIcons, setActiveIcons] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      setIcons([]);
      setActiveIcons(new Set());
      return;
    }

    // Generate 10 random icon configurations
    const configs: IconConfig[] = Array.from({ length: 10 }, (_, i) => {
      const isMobile = window.innerWidth <= 768;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Random values matching LuckyFolks parameters
      const size = isMobile 
        ? Math.round(40 + Math.random() * 40)  // 40-80px
        : Math.round(60 + Math.random() * 60); // 60-120px

      const startX = windowWidth + Math.random() * windowWidth * 0.4;
      const startY = 0.8 * windowHeight - Math.random() * windowHeight * 0.4;
      
      const rotation = Math.floor(Math.random() * 60 - 30); // -30 to 30 degrees
      
      // Force ranges from original
      const forceX = -(60 * Math.random() + 33) * 0.01; // -0.93 to -0.33
      const forceY = -(30 * Math.random() + 10) * 0.01; // -0.40 to -0.10

      return {
        id: i,
        icon: ICON_ASSETS[Math.floor(Math.random() * ICON_ASSETS.length)],
        startX,
        startY,
        rotation,
        forceX,
        forceY,
        size,
        delay: i * 50, // Stagger spawn by 50ms
      };
    });

    setIcons(configs);
    setActiveIcons(new Set(configs.map(c => c.id)));
  }, [isActive]);

  const handleIconComplete = (id: number) => {
    setActiveIcons(prev => {
      const next = new Set(prev);
      next.delete(id);
      
      // All icons completed
      if (next.size === 0 && onComplete) {
        setTimeout(onComplete, 100);
      }
      
      return next;
    });
  };

  if (!isActive || icons.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {icons.map(config => (
        <FlingIcon
          key={config.id}
          config={config}
          onComplete={() => handleIconComplete(config.id)}
        />
      ))}
    </div>
  );
};

/**
 * Usage Example:
 * 
 * ```tsx
 * import { MenuIconFling } from '@/components/MenuIconFling';
 * 
 * function Header() {
 *   const [menuOpen, setMenuOpen] = useState(false);
 * 
 *   const handleMenuOpen = () => {
 *     setMenuOpen(true);
 *   };
 * 
 *   return (
 *     <>
 *       <button onClick={handleMenuOpen}>Open Menu</button>
 *       
 *       <MenuIconFling 
 *         isActive={menuOpen} 
 *         onComplete={() => console.log('Animation complete')}
 *       />
 *       
 *       {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
 *     </>
 *   );
 * }
 * ```
 */

export default MenuIconFling;
