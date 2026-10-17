"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ElevationParallax() {
  const containerRef = useRef<HTMLElement>(null);
  const topTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const towerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Top Headline scrolls left-to-right
      gsap.fromTo(
        topTextRef.current,
        { x: -90 },
        {
          x: 90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Bottom Headline scrolls right-to-left
      gsap.fromTo(
        bottomTextRef.current,
        { x: 90 },
        {
          x: -90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Tower image scales smoothly as you scroll through
      gsap.fromTo(
        towerRef.current,
        { scale: 1.15, y: 30 },
        {
          scale: 0.92,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Narrative fade in
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="relative w-full min-h-[850px] lg:min-h-[980px] bg-[#0f0708] overflow-hidden flex items-center justify-center py-24"
      style={{
        backgroundImage: `url('${siteContent.architecture.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center">
        {/* Top Text Layer */}
        <h2
          ref={topTextRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-white/90 font-normal tracking-tight text-center lg:text-left self-start lg:-ml-8 z-0 uppercase will-change-transform drop-shadow-2xl"
        >
          {siteContent.architecture.headingLines.join(" ")}
        </h2>

        {/* Supporting Narrative Callout */}
        <p
          ref={narrativeRef}
          className="text-white/80 font-sans text-sm sm:text-base md:text-lg max-w-2xl text-center my-6 tracking-wide leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 z-20"
        >
          {siteContent.architecture.supportingCopy}
        </p>

        {/* Center Tower Render */}
        <div
          ref={towerRef}
          className="relative z-10 my-[-20px] md:my-[-40px] w-full max-w-[540px] flex items-center justify-center will-change-transform"
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_35px_75px_rgba(0,0,0,0.9)] border border-white/10 group">
            <Image
              src={siteContent.architecture.towerImage}
              alt="Vanae Tower Architecture"
              width={525}
              height={677}
              priority
              className="w-full h-auto object-cover max-h-[700px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Text Layer */}
        <h2
          ref={bottomTextRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-white/95 font-normal tracking-tight text-center lg:text-right self-end lg:-mr-8 z-20 uppercase will-change-transform drop-shadow-2xl text-shadow-large"
        >
          {siteContent.architecture.subheadingLines.join(" ")}
        </h2>
      </div>
    </section>
  );
}
