"use client";

import { useEffect, useRef } from "react";
import { MapPin, Building2, Navigation, Compass, ExternalLink } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  const locationData = siteContent.location;

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

      // Slide in floating map card
      if (mapCardRef.current) {
        gsap.fromTo(
          mapCardRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="relative w-full bg-[#152833] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px] md:min-h-[750px]">
        {/* Left Column: Content Panel */}
        <div className="lg:col-span-6 px-8 py-20 md:p-20 xl:p-28 flex flex-col justify-center text-white z-10">
          <div className="inline-flex items-center space-x-2 text-gold text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <Compass className="w-4 h-4 text-gold" />
            <span>{locationData.tag}</span>
          </div>

          <h3
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight uppercase mb-8"
          >
            {locationData.headingLines.map((line, idx) => (
              <span key={idx} className="block clip-line overflow-hidden">
                {line}
              </span>
            ))}
          </h3>

          <p className="text-white/80 text-base leading-relaxed font-sans max-w-lg mb-10">
            {locationData.copy}
          </p>

          {/* Strategic Address Cards */}
          <div className="space-y-4 max-w-xl">
            {/* Site Address */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-gold/50 transition-all">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-gold/20 text-gold shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold font-semibold">
                      Site Address
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-white font-medium">
                      ORR Exit 2
                    </span>
                  </div>
                  <p className="text-white/90 text-sm font-sans mt-1 leading-relaxed">
                    {locationData.siteAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Address */}
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold/40 transition-all">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-white/80 shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/70 font-semibold block">
                    Corporate Office
                  </span>
                  <p className="text-white/80 text-sm font-sans mt-1 leading-relaxed">
                    {locationData.corporateAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Aerial Image with Floating Google Map Card */}
        <div
          className="lg:col-span-6 relative min-h-[480px] lg:min-h-full bg-cover bg-center overflow-visible"
          style={{ backgroundImage: `url('${locationData.mapImage}')` }}
        >
          {/* Subtle Dark Vignette */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          {/* Floating Live Google Map Card */}
          <div
            ref={mapCardRef}
            className="relative lg:absolute lg:-left-20 lg:bottom-16 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[85%] max-w-[440px] mx-auto my-8 lg:my-0 bg-white rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.45)] border-2 border-white z-20 will-change-transform"
          >
            <div className="w-full h-[240px] rounded-xl overflow-hidden border border-black/10">
              <iframe
                src={locationData.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VANAE Location Map - Kollur Exit 2 ORR Hyderabad"
              />
            </div>
            <div className="pt-3 px-2 flex items-center justify-between">
              <div>
                <span className="block text-xs uppercase tracking-wider text-black font-semibold">
                  Kollur, ORR Exit 2
                </span>
                <span className="text-[11px] text-neutral-500 font-sans">
                  Hyderabad, Telangana – 502300
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Kollur+Exit+2+Nehru+Outer+Ring+Road+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-gold hover:text-[#0D5A46] font-semibold transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
