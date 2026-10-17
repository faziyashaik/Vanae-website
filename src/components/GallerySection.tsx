"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export default function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Stagger gallery items appearance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-36 bg-[#f7f5f2] text-[#232323]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold block mb-4">
            {siteContent.gallery.tag}
          </span>

          <h3
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold font-normal leading-tight tracking-tight uppercase"
          >
            {siteContent.gallery.headingLines.map((line, idx) => (
              <span key={idx} className="block clip-line overflow-hidden">
                {line}
              </span>
            ))}
          </h3>
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {siteContent.gallery.items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(idx)}
              className="group relative h-[300px] rounded-xl overflow-hidden cursor-pointer shadow-lg bg-[#181719] border border-black/5"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold self-start">
                  {item.category}
                </span>

                <div className="w-12 h-12 rounded-full bg-gold/25 border border-gold/40 flex items-center justify-center self-center transition-transform duration-300 group-hover:scale-110">
                  <Search className="w-5 h-5 text-gold" />
                </div>

                <h4 className="text-white text-sm font-serif tracking-wide leading-tight transition-transform duration-300 translate-y-3 group-hover:translate-y-0">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
