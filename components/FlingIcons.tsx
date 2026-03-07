// components/FlingIcons.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";
import { useNav } from "@/context/NavContext";

/**
 * LuckyFolks-inspired menu icon fling animation using Matter.js physics.
 * Based on extracted specs from luckyfolks-analysis/
 * 
 * Physics parameters match original:
 * - friction: 0.9
 * - restitution: 0.8 (80% bounce)
 * - mass: 6
 * - force: leftward fling with random variation
 */

const ICONS = [
  "/icons/dw.svg",
  "/icons/dw3.svg",
  "/icons/wave.svg",
  "/icons/surf.svg",
  "/icons/surfboard.svg",
  "/icons/burger.svg",
  "/icons/mug.svg",
  "/icons/mug2.svg",
  "/icons/umbrella.svg",
  "/icons/fire.svg",
  "/icons/wing.svg",
  "/icons/horizon.svg",
  "/icons/neon-sign-icon.svg",
  "/icons/spatula.svg",
  "/icons/booger.svg",
];

const COUNT = 10; // Match LuckyFolks count

interface IconBody {
  body: Matter.Body;
  img: HTMLImageElement;
  width: number;
  height: number;
}

interface LoadedIcon {
  img: HTMLImageElement;
  ratio: number;
}

export default function FlingIcons() {
  const { isNavOpen, celebrationCount } = useNav();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<IconBody[]>([]);
  const rafRef = useRef<number | null>(null);
  const iconsLoadedRef = useRef<LoadedIcon[] | null>(null);
  const isActiveRef = useRef(false);

  // Preload all icon images once
  useEffect(() => {
    let cancelled = false;

    Promise.all(
      ICONS.map(
        (src) =>
          new Promise<LoadedIcon>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const w = img.naturalWidth || 1;
              const h = img.naturalHeight || 1;
              resolve({ img, ratio: w / h });
            };
            img.onerror = () => reject(new Error(`Failed to load ${src}`));
            img.src = src;
          })
      )
    )
      .then((loaded) => {
        if (!cancelled) iconsLoadedRef.current = loaded;
      })
      .catch((err) => {
        console.warn("FlingIcons: Failed to preload some icons", err);
        if (!cancelled) iconsLoadedRef.current = [];
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }

    bodiesRef.current = [];
    isActiveRef.current = false;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  useEffect(() => {
    if (!isNavOpen && celebrationCount === 0) {
      cleanup();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loaded = iconsLoadedRef.current;
    if (!loaded || loaded.length === 0) {
      // Icons not ready yet, wait for next render
      return;
    }

    cleanup();

    isActiveRef.current = true;

    // Setup canvas with device pixel ratio
    const setupCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    const { w: W, h: H } = setupCanvas();

    // Create Matter.js engine with LuckyFolks gravity settings
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 1;
    engine.world.gravity.scale = 0.001;

    // Create boundary walls (LuckyFolks specs)
    const wallLeft = Matter.Bodies.rectangle(-50, 0.5 * H, 100, 3 * H, {
      isStatic: true,
      restitution: 0.8,
    });
    const wallTop = Matter.Bodies.rectangle(0.5 * W, -50, 3 * W, 100, {
      isStatic: true,
      restitution: 0.8,
    });

    Matter.World.add(engine.world, [wallLeft, wallTop]);

    // Spawn icon bodies with LuckyFolks parameters
    const bodies: IconBody[] = [];
    const isMobile = W <= 768;

    for (let i = 0; i < COUNT; i++) {
      const icon = loaded[Math.floor(Math.random() * loaded.length)];
      
      // LuckyFolks spawn position formulas
      const startX = W + Math.random() * W * 0.4;
      const startY = 0.8 * H - Math.random() * H * 0.4;
      
      // LuckyFolks size formulas
      const height = isMobile
        ? Math.round(40 + Math.random() * 40)  // 40-80px
        : Math.round(60 + Math.random() * 60); // 60-120px
      const width = height * icon.ratio;
      
      // LuckyFolks physics parameters
      const friction = 0.9;
      const restitution = 0.8;
      const mass = 6;
      
      // Random angle: -30° to 30°
      const angleDeg = Math.floor(Math.random() * 61 - 30);
      const angleRad = (angleDeg * Math.PI) / 180;
      
      // LuckyFolks force formulas
      const forceX = -0.01 * (60 * Math.random() + 33); // -0.93 to -0.33
      const forceY = -0.01 * (30 * Math.random() + 10); // -0.40 to -0.10
      
      const body = Matter.Bodies.rectangle(startX, startY, width, height, {
        friction,
        restitution,
        frictionAir: 0,
      });
      
      Matter.Body.setAngle(body, angleRad);
      Matter.Body.setMass(body, mass);
      Matter.World.add(engine.world, body);
      
      // Apply initial force (fling left)
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      
      bodies.push({ body, img: icon.img, width, height });
    }
    
    bodiesRef.current = bodies;

    // Animation loop
    const animate = () => {
      if (!isActiveRef.current) return;

      // Update physics (60fps)
      Matter.Engine.update(engine, 1000 / 60);

      // Clear canvas
      ctx.clearRect(0, 0, W, H);

      // Render and cleanup offscreen bodies
      bodiesRef.current = bodiesRef.current.filter((item) => {
        const { body, img, width, height } = item;

        // LuckyFolks offscreen check: y > windowHeight + 100
        if (body.position.y > H + 100) {
          Matter.World.remove(engine.world, body);
          return false;
        }

        // Draw icon at body position
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        
        try {
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
        } catch (err) {
          // Ignore draw errors
        }
        
        ctx.restore();
        return true;
      });

      // Stop animation when all icons are offscreen
      if (bodiesRef.current.length === 0) {
        cleanup();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount or nav close
    return cleanup;
  }, [isNavOpen, celebrationCount, cleanup]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 130 }}
      aria-hidden="true"
    />
  );
}
