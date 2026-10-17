"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";

interface LightboxModalProps {
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const prev = (currentIndex - 1 + siteContent.gallery.items.length) % siteContent.gallery.items.length;
        onNavigate(prev);
      }
      if (e.key === "ArrowRight") {
        const next = (currentIndex + 1) % siteContent.gallery.items.length;
        onNavigate(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const currentItem = siteContent.gallery.items[currentIndex];
  const total = siteContent.gallery.items.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % total);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous Image"
        className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        aria-label="Next Image"
        className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-4 text-center">
          <h4 className="font-serif text-xl text-white font-normal">
            {currentItem.title}
          </h4>
          <span className="text-xs text-gold uppercase tracking-widest mt-1 block font-medium">
            {currentItem.category} • {currentIndex + 1} of {total}
          </span>
        </div>
      </div>
    </div>
  );
}
