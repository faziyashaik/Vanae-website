"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FloorPlansSectionProps {
  onOpenPlans?: () => void;
}

export default function FloorPlansSection({ onOpenPlans }: FloorPlansSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const plan1Ref = useRef<HTMLDivElement>(null);
  const plan2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      // Parallax on foreground plan
      gsap.fromTo(
        plan2Ref.current,
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="floor-plans"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#f8f6f3] text-[#232323] overflow-hidden border-b border-[#e4e4e4]"
      style={{
        backgroundImage: `url('/assets/images/home-bg-01.jpg')`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Heading and Text */}
          <div className="lg:col-span-6 space-y-8">
            <h3
              ref={headingRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-normal leading-tight tracking-tight uppercase"
            >
              {siteContent.floorPlans.headingLines.map((line, idx) => (
                <span key={idx} className="block clip-line overflow-hidden">
                  {line}
                </span>
              ))}
            </h3>

            <div className="space-y-6 text-[#555a64] text-base leading-relaxed font-sans max-w-xl">
              {siteContent.floorPlans.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div>
              <button
                onClick={onOpenPlans}
                className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold hover:bg-[#181719] text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-luxury"
              >
                <span>{siteContent.floorPlans.btnText}</span>
                <div className="relative overflow-hidden w-4 h-4">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-6" />
                  <ArrowRight className="w-4 h-4 absolute top-0 left-0 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Overlapping Plans */}
          <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] md:h-[600px] w-full flex items-center justify-end">
            {/* Background Floor Plan */}
            <div
              ref={plan1Ref}
              className="w-[80%] rounded-xl overflow-hidden shadow-2xl z-10 border border-black/10 bg-white p-3 group"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={siteContent.floorPlans.plans[0].src}
                  alt={siteContent.floorPlans.plans[0].title}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#717580] mt-3">
                {siteContent.floorPlans.plans[0].title}
              </p>
            </div>

            {/* Foreground Overlapping Floor Plan */}
            <div
              ref={plan2Ref}
              className="absolute left-0 bottom-4 w-[60%] sm:w-[58%] rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] z-20 border-2 border-white bg-white p-3 will-change-transform group"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={siteContent.floorPlans.plans[1].src}
                  alt={siteContent.floorPlans.plans[1].title}
                  width={450}
                  height={350}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#717580] mt-2">
                {siteContent.floorPlans.plans[1].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
