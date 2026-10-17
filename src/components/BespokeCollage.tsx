"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BespokeCollageProps {
  onOpenApartments?: () => void;
}

export default function BespokeCollage({ onOpenApartments }: BespokeCollageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading clip path reveal
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

      // Parallax on 3 images (multi-plane vertical counter parallax)
      gsap.fromTo(
        img1Ref.current,
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

      gsap.fromTo(
        img2Ref.current,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        img3Ref.current,
        { y: 30 },
        {
          y: -30,
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
      id="residences"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#f7f5f2] text-[#232323] overflow-hidden border-b border-[#e4e4e4]"
      style={{
        backgroundImage: `url('/assets/images/home-bg-01.jpg')`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Headings, Narrative, and Button */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-gold font-sans font-semibold text-xs md:text-sm tracking-[0.25em] uppercase block mb-3">
                {siteContent.residential.lifestyleHeading.join(" ")}
              </span>

              <h3
                ref={headingRef}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-normal leading-tight tracking-tight uppercase"
              >
                {siteContent.residential.headingLines.map((line, idx) => (
                  <span key={idx} className="block clip-line overflow-hidden">
                    {line}
                  </span>
                ))}
              </h3>
            </div>

            <div className="space-y-5 text-[#555a64] text-base leading-relaxed font-sans max-w-xl">
              <p className="font-medium text-[#181719] text-lg">
                {siteContent.residential.lifestyleCopy}
              </p>
              <p>
                {siteContent.residential.supportingCopy}
              </p>
            </div>

            <div>
              <button
                onClick={onOpenApartments}
                className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold hover:bg-[#181719] text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-luxury"
              >
                <span>{siteContent.residential.btnText}</span>
                <div className="relative overflow-hidden w-4 h-4">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-6" />
                  <ArrowRight className="w-4 h-4 absolute top-0 left-0 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Multi-Image Floating Collage */}
          <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] md:h-[650px] w-full">
            {/* Image 1: Left Portrait */}
            <div
              ref={img1Ref}
              className="absolute left-0 top-6 w-[48%] md:w-[45%] rounded-lg overflow-hidden shadow-2xl z-10 will-change-transform border border-white/40"
            >
              <Image
                src={siteContent.residential.images[0].src}
                alt={siteContent.residential.images[0].alt}
                width={450}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Image 2: Right Landscape */}
            <div
              ref={img2Ref}
              className="absolute right-0 top-0 w-[55%] md:w-[58%] rounded-lg overflow-hidden shadow-2xl z-20 will-change-transform border border-white/40"
            >
              <Image
                src={siteContent.residential.images[1].src}
                alt={siteContent.residential.images[1].alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Image 3: Center Bottom Overlap */}
            <div
              ref={img3Ref}
              className="absolute left-[20%] bottom-0 w-[60%] md:w-[65%] rounded-lg overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)] z-30 will-change-transform border-2 border-white"
            >
              <Image
                src={siteContent.residential.images[2].src}
                alt={siteContent.residential.images[2].alt}
                width={650}
                height={450}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
