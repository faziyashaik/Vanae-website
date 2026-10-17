"use client";

import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl = "/assets/videos/hero.mp4",
}: VideoModalProps) {
  if (!isOpen) return null;

  const isLocalOrMp4 = videoUrl.endsWith(".mp4") || videoUrl.startsWith("/");

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-lg transition-opacity duration-300"
      />

      {/* Video Container */}
      <div className="relative z-10 w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          aria-label="Close Video"
          className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-black/60 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {isLocalOrMp4 ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <iframe
            src={videoUrl}
            title="Property Tour Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
