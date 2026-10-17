"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Ensure content starts fully visible
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
      }

      // Parallax effect on hero video scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content fade out as user scrolls down into the next section
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Property Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={siteContent.hero.posterSrc}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 origin-center will-change-transform opacity-85"
      >
        <source src={siteContent.hero.videoSrc} type="video/mp4" />
      </video>

      {/* Luxury Vignette & Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-10 right-8 md:bottom-12 md:right-12 z-20 w-11 h-11 rounded-full bg-black/50 border border-white/20 hover:border-gold hover:bg-gold/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-gold transition-all duration-300 shadow-lg"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Centered Scroll Prompt, Lifestyle Statement & Project Facts */}
      <div
        id="hero-content"
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center mt-auto pb-12 md:pb-16 will-change-transform"
      >
        {/* Major Lifestyle Statement Badge */}
        <span className="inline-block py-2 px-6 mb-4 rounded-full border border-gold/50 bg-[#0D5A46]/80 text-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold backdrop-blur-md shadow-xl">
          {siteContent.hero.badgeText}
        </span>

        {/* Supporting Copy */}
        <h1 className="text-white font-serif text-xl sm:text-2xl md:text-3xl tracking-wide font-normal mb-6 drop-shadow-lg max-w-2xl">
          {siteContent.hero.majorStatement}
        </h1>

        {/* Project Facts Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-8 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-white/90 font-sans border border-white/20 py-3 px-6 rounded-full bg-black/40 backdrop-blur-md shadow-lg">
          {siteContent.hero.facts.map((fact, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <span>{fact}</span>
              {idx < siteContent.hero.facts.length - 1 && (
                <span className="text-gold font-bold">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Mouse Cue Icon & Prompt */}
        <p className="text-white/70 font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium mb-4 drop-shadow">
          {siteContent.hero.scrollText}
        </p>

        <Link
          href="#overview"
          aria-label="Scroll down to overview"
          className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <div className="w-7 h-11 rounded-full border-2 border-gold/70 flex items-start justify-center p-1.5 transition-colors group-hover:border-gold shadow-md">
            <div className="w-1.5 h-2.5 rounded-full bg-gold animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
