"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dumbbell,
  Sparkles,
  Coffee,
  BookOpen,
  Gamepad2,
  ArrowRight,
  Compass,
  Trees,
  Activity,
  Heart,
  Users,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="w-8 h-8 text-white" />,
  Sparkles: <Sparkles className="w-8 h-8 text-white" />,
  Coffee: <Coffee className="w-8 h-8 text-white" />,
  BookOpen: <BookOpen className="w-8 h-8 text-white" />,
  Gamepad2: <Gamepad2 className="w-8 h-8 text-white" />,
};

const categoryIcons: Record<string, React.ReactNode> = {
  "FIRST IMPRESSIONS": <Compass className="w-5 h-5 text-gold" />,
  "AMENITIES & NATURE": <Trees className="w-5 h-5 text-gold" />,
  "SPORTS & ACTIVE LIVING": <Activity className="w-5 h-5 text-gold" />,
  "WELLNESS & MINDFULNESS": <Heart className="w-5 h-5 text-gold" />,
  "FAMILY & COMMUNITY": <Users className="w-5 h-5 text-gold" />,
  "WORK & CONVENIENCE": <Briefcase className="w-5 h-5 text-gold" />,
};

interface AmenitiesSectionProps {
  onOpenAmenities?: () => void;
}

export default function AmenitiesSection({ onOpenAmenities }: AmenitiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const amenitiesData = siteContent.clubhouseAmenities;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading clip path reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 30 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Parallax on alternating columns (desktop only)
      if (window.innerWidth >= 1024) {
        gsap.fromTo(
          col1Ref.current,
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
          col2Ref.current,
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
          col3Ref.current,
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split into 3 columns of 2 cards each for desktop layout
  const cards = amenitiesData.featuredCards;
  const col1 = [cards[0], cards[3]];
  const col2 = [cards[1], cards[4]];
  const col3 = [cards[2], cards[5]];

  const renderCard = (item: (typeof cards)[0], idx: number) => {
    if (!item) return null;
    const isFlipped = flippedIndex === idx;

    return (
      <div
        key={item.title}
        className="group relative cursor-pointer"
        onMouseEnter={() => setFlippedIndex(idx)}
        onMouseLeave={() => setFlippedIndex(null)}
        onClick={() => setFlippedIndex(isFlipped ? null : idx)}
      >
        {/* 3D Card Container */}
        <div className="relative w-full h-[280px] sm:h-[300px] perspective-1000">
          <div
            className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border border-black/10">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold/90 font-medium">
                  Signature Amenity
                </span>
                <p className="font-serif text-lg font-medium leading-snug mt-1">
                  {item.title}
                </p>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-[#0D5A46] p-8 flex flex-col justify-center items-center text-center shadow-2xl text-white border border-gold/30">
              <div className="mb-4 p-3 rounded-full bg-white/10 border border-white/20">
                {iconMap[item.icon] || <Sparkles className="w-8 h-8 text-white" />}
              </div>
              <h5 className="font-serif text-lg text-gold mb-2 font-medium">{item.title}</h5>
              <p className="text-white/90 text-sm leading-relaxed font-sans line-clamp-4">
                {item.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Card Title */}
        <h4 className="text-center font-sans font-semibold text-base md:text-lg text-[#232323] mt-5 group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h4>
      </div>
    );
  };

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative bg-[#f5f3f0] py-24 md:py-36 overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/pattern-1.png')`,
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-3">
            CLUBHOUSE & COMMUNITY
          </p>
          <h3
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#232323] font-normal leading-tight tracking-tight uppercase mb-6"
          >
            {amenitiesData.headingLines.join(" ")}
          </h3>
          <p className="text-[#555] text-sm md:text-base font-sans leading-relaxed">
            {amenitiesData.supportingCopy}
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24">
          <div ref={col1Ref} className="space-y-12 will-change-transform">
            {renderCard(col1[0], 0)}
            {renderCard(col1[1], 3)}
          </div>
          <div ref={col2Ref} className="space-y-12 will-change-transform">
            {renderCard(col2[0], 1)}
            {renderCard(col2[1], 4)}
          </div>
          <div ref={col3Ref} className="space-y-12 will-change-transform">
            {renderCard(col3[0], 2)}
            {renderCard(col3[1], 5)}
          </div>
        </div>

        {/* Categorized Amenities Explorer */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-black/5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-gold">
              Complete Lifestyle Directory
            </span>
            <h4 className="font-serif text-2xl md:text-3xl text-[#232323] font-normal uppercase mt-2">
              Explore All 6 Amenity Collections
            </h4>
            <p className="text-neutral-500 text-xs md:text-sm mt-2 font-sans">
              Discover every space planned across the 1,00,000 sqft clubhouse and expansive grounds.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {amenitiesData.categories.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#0D5A46] text-white shadow-md border border-[#0D5A46]"
                      : "bg-[#f5f3f0] text-neutral-700 hover:bg-[#eae6e1] border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-gold" : "text-neutral-500"}>
                    {categoryIcons[cat.name] || <Sparkles className="w-4 h-4" />}
                  </span>
                  <span>{cat.name}</span>
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-300 text-neutral-700"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Amenities Grid */}
          <div className="bg-[#fcfbf9] rounded-xl p-6 md:p-8 border border-neutral-200/70">
            <div className="flex items-center space-x-3 pb-5 mb-6 border-b border-neutral-200">
              <div className="p-2.5 rounded-lg bg-[#0D5A46] text-white">
                {categoryIcons[amenitiesData.categories[activeCategory]?.name] || (
                  <Sparkles className="w-5 h-5 text-gold" />
                )}
              </div>
              <div>
                <h5 className="font-serif text-lg md:text-xl text-[#232323] font-medium uppercase tracking-wide">
                  {amenitiesData.categories[activeCategory]?.name}
                </h5>
                <p className="text-xs text-neutral-500 font-sans">
                  {amenitiesData.categories[activeCategory]?.items.length} dedicated amenities in this collection
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {amenitiesData.categories[activeCategory]?.items.map((amenity, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-center space-x-3 p-3.5 bg-white rounded-lg border border-neutral-200/80 hover:border-gold/60 transition-all duration-200 group shadow-sm hover:shadow"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-xs md:text-sm font-medium text-[#2b2b2b] group-hover:text-[#0D5A46] transition-colors">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
