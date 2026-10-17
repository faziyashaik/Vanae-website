"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverables = () => {
      const hoverables = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .cursor-hoverable"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    const loop = () => {
      // Smooth lerp follower ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    checkHoverables();
    const observer = new MutationObserver(checkHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold transition-opacity duration-300 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "w-2 h-2" : "w-1.5 h-1.5"}`}
      />
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[999998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 transition-all duration-300 ease-out hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-14 h-14 bg-gold/15 border-gold scale-110"
            : "w-8 h-8 scale-100"
        }`}
      />
    </>
  );
}
