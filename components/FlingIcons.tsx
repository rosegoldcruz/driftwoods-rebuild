"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useNav } from "@/context/NavContext";

const ICONS = [
  "/icons/dw.svg",
  "/icons/wave.svg",
  "/icons/surfboard.svg",
  "/icons/mug.svg",
  "/icons/umbrella.svg",
  "/icons/fire.svg",
  "/icons/horizon.svg",
  "/icons/neon-sign-icon.svg",
];

const COUNT = 12;
const rand = gsap.utils.random;

export default function FlingIcons() {
  const { isNavOpen } = useNav();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const driftTweens = useRef<gsap.core.Tween[]>([]);

  const instances = useMemo(
    () => Array.from({ length: COUNT }).map((_, i) => ({ id: i, src: ICONS[i % ICONS.length] })),
    []
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    driftTweens.current.forEach((t) => t.kill());
    driftTweens.current = [];

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".dwIcon"));
    gsap.set(nodes, { autoAlpha: 0, clearProps: "x,y,rotate,scale,filter" });

    if (!isNavOpen) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    nodes.forEach((node) => {
      const startX   = vw + rand(120, 420);
      const startY   = rand(60, vh - 120);
      const landX    = rand(-40, vw * 0.42);
      const landY    = rand(80, vh - 140);
      const hitX     = landX - rand(90, 170);
      const rotStart = rand(-35, 35);
      const rotEnd   = rotStart + rand(-90, 90);
      const scale    = rand(0.5, 1.1);

      gsap.set(node, {
        x: startX,
        y: startY,
        rotate: rotStart,
        scale,
        autoAlpha: 1,
        filter: "blur(6px)",
      });

      gsap
        .timeline()
        .to(node, {
          x: hitX,
          y: landY,
          rotate: rotEnd,
          filter: "blur(0px)",
          duration: rand(0.5, 0.85),
          ease: "power4.out",
        })
        .to(
          node,
          {
            x: landX,
            duration: rand(0.18, 0.28),
            ease: "elastic.out(1, 0.55)",
          },
          "<"
        );

      const drift = gsap.to(node, {
        x: `+=${rand(-80, 80)}`,
        y: `+=${rand(-60, 60)}`,
        rotate: `+=${rand(-20, 20)}`,
        duration: rand(6, 14),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: rand(0.2, 0.7),
      });

      driftTweens.current.push(drift);
    });

    return () => {
      driftTweens.current.forEach((t) => t.kill());
      driftTweens.current = [];
    };
  }, [isNavOpen]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 116 }}
    >
      {instances.map((ic) => (
        <img
          key={ic.id}
          src={ic.src}
          alt=""
          className="dwIcon absolute top-0 left-0 w-16 md:w-20 opacity-0 select-none"
          style={{ mixBlendMode: "screen" }}
          draggable={false}
        />
      ))}
    </div>
  );
}
