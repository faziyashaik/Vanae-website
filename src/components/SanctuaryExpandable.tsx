"use client";

import { useEffect, useRef } from "react";
import { Play, ArrowRight, ShieldCheck, Wind, SunMedium } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SanctuaryExpandableProps {
  onPlayVideo: () => void;
  onOpenOutdoor?: () => void;
}

export default function SanctuaryExpandable({
  onPlayVideo,
  onOpenOutdoor,
}: SanctuaryExpandableProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const ecosystemData = siteContent.verticalEcosystem;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Dynamic container width expansion from 68% to 100% on scroll
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { width: "68%", borderRadius: "24px" },
          {
            width: "100%",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }

      // Heading clip reveal
      const lines = headingRef.current?.querySelectorAll(".clip-line");
      if (lines) {
        gsap.fromTo(
          lines,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 30 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ecosystem"
      ref={containerRef}
      className="relative w-full bg-[#0a0809] py-16 md:py-24 overflow-hidden flex items-center justify-center"
    >
      {/* Expanding Card Banner */}
      <div
        ref={cardRef}
        className="relative mx-auto min-h-[620px] md:min-h-[720px] flex items-center justify-center bg-cover bg-center overflow-hidden will-change-transform shadow-2xl"
        style={{
          backgroundImage: `url('${ecosystemData.bgImage}')`,
          width: "100%",
        }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/75 pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center py-16">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-medium">
              Ecosystem Architecture
            </span>
          </div>

          {/* Pulsing Play Button */}
          <button
            onClick={onPlayVideo}
            aria-label="Play Video Tour"
            className="group relative mb-8 w-20 h-20 rounded-full border-2 border-white/50 bg-black/40 hover:bg-gold hover:border-gold backdrop-blur-md flex items-center justify-center transition-all duration-300"
          >
            {/* Concentric Pulse Rings */}
            <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping opacity-75 pointer-events-none" />
            <Play className="w-8 h-8 text-white ml-1 transition-transform group-hover:scale-110" />
          </button>

          {/* Title */}
          <h3
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight tracking-tight uppercase mb-6"
          >
            {ecosystemData.headingLines.map((line, idx) => (
              <span key={idx} className="block clip-line overflow-hidden">
                {line}
              </span>
            ))}
          </h3>

          {/* Description */}
          <p className="text-white/85 text-base md:text-lg leading-relaxed font-sans max-w-2xl mb-8">
            {ecosystemData.supportingCopy}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3.5 border border-white/15 text-center">
              <ShieldCheck className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <div className="font-serif text-sm font-medium text-white">5 Stilt Levels</div>
              <div className="text-[11px] text-white/70 font-sans">Dedicated Parking Podium</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3.5 border border-white/15 text-center">
              <SunMedium className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <div className="font-serif text-sm font-medium text-white">6th Floor Start</div>
              <div className="text-[11px] text-white/70 font-sans">Residences Begin Elevated</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3.5 border border-white/15 text-center">
              <Wind className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <div className="font-serif text-sm font-medium text-white">Unobstructed Views</div>
              <div className="text-[11px] text-white/70 font-sans">Vibrancy, Ventilation & Vitality</div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onOpenOutdoor}
            className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold hover:bg-white text-luxury-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-luxury"
          >
            <span>{ecosystemData.btnText}</span>
            <div className="relative overflow-hidden w-4 h-4">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-6" />
              <ArrowRight className="w-4 h-4 absolute top-0 left-0 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
