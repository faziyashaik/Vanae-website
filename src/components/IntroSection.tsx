"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface IntroSectionProps {
  onOpenBrochure: () => void;
}

export default function IntroSection({ onOpenBrochure }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading lines polygon clip-path reveal
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

      // Paragraphs fade and rise
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 4 stats stagger entry
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#f9f6f3] text-[#232323] overflow-hidden border-b border-[#e4e4e4]"
      style={{
        backgroundImage: `url('/assets/images/home-bg-texture.png')`,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Split: Title and Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Eyebrow + Huge Heading */}
          <div className="lg:col-span-7">
            <span className="text-gold font-sans font-semibold text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
              {siteContent.overview.eyebrow}
            </span>

            <h2
              ref={headingRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] font-normal text-[#1a1718] tracking-tight uppercase"
            >
              {siteContent.overview.headingLines.map((line, idx) => (
                <span key={idx} className="block clip-line overflow-hidden">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Right Column: Narrative Copy */}
          <div ref={textRef} className="lg:col-span-5 space-y-6 text-[#555a64] text-base leading-relaxed font-sans pt-2">
            {siteContent.overview.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* 4 Statistics Metrics Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-[#e6e2de] text-center mb-16"
        >
          {siteContent.overview.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-[#181719] mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider text-[#717580] font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Feature Callout & Brochure Download */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <p className="text-lg md:text-xl font-serif text-[#181719] font-medium tracking-wide max-w-2xl">
            {siteContent.overview.badge}
          </p>

          <button
            onClick={onOpenBrochure}
            className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold hover:bg-[#181719] text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-luxury hover:shadow-2xl"
          >
            <span>{siteContent.overview.brochureBtnText}</span>
            <div className="relative overflow-hidden w-4 h-4">
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-6" />
              <ArrowDown className="w-4 h-4 absolute top-0 left-0 -translate-y-6 transition-transform duration-300 group-hover:translate-y-0" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
