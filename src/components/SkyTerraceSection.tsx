"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

export default function SkyTerraceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax background drift
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Heading reveal
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

      // Benefits stagger
      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: benefitsRef.current,
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
      id="nature"
      ref={sectionRef}
      className="relative min-h-[850px] overflow-hidden flex flex-col justify-end py-24 md:py-32"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%] w-full h-[140%] bg-cover bg-center pointer-events-none will-change-transform"
        style={{ backgroundImage: `url('/assets/images/sky-terrace.jpg')` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-auto space-y-16">
        {/* Title & Brand Philosophy */}
        <div className="max-w-3xl">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold block mb-4">
            BRAND PHILOSOPHY
          </span>
          <h3
            ref={headingRef}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight uppercase mb-6"
          >
            {siteContent.natureStorytelling.philosophyHeading.map((line, idx) => (
              <span key={idx} className="block clip-line overflow-hidden">
                {line}
              </span>
            ))}
          </h3>
          <p className="text-white/85 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
            {siteContent.natureStorytelling.philosophyCopy}
          </p>
        </div>

        {/* 3 Distinct Nature-Led Storytelling Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.natureStorytelling.panels.map((panel, idx) => (
            <div
              key={idx}
              className="bg-black/50 backdrop-blur-md border border-white/15 p-8 rounded-2xl group hover:border-gold transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center p-3 mb-6 border border-gold/40 group-hover:scale-110 transition-transform duration-300">
                <span className="text-gold font-serif font-bold text-lg">{idx + 1}</span>
              </div>

              <h4 className="text-base font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                {panel.phrase}
              </h4>

              <p className="text-white/85 text-sm md:text-base leading-relaxed font-sans">
                {panel.copy}
              </p>
            </div>
          ))}
        </div>

        {/* Environmental Benefits Section */}
        <div className="pt-10 border-t border-white/15">
          <div className="max-w-2xl mb-8">
            <h4 className="font-serif text-xl sm:text-2xl text-white font-normal uppercase tracking-wide mb-3">
              {siteContent.natureStorytelling.environmentalBenefits.heading}
            </h4>
            <p className="text-white/70 text-sm leading-relaxed font-sans">
              {siteContent.natureStorytelling.environmentalBenefits.supportingCopy}
            </p>
          </div>

          <div
            ref={benefitsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {siteContent.natureStorytelling.environmentalBenefits.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3.5 bg-white/5 border border-white/10 px-5 py-4 rounded-xl backdrop-blur-sm hover:border-gold/50 transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
