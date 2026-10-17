"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ElevationParallax from "@/components/ElevationParallax";
import BespokeCollage from "@/components/BespokeCollage";
import SkyTerraceSection from "@/components/SkyTerraceSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import SanctuaryExpandable from "@/components/SanctuaryExpandable";
import FloorPlansSection from "@/components/FloorPlansSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import RegisterModal from "@/components/RegisterModal";
import VideoModal from "@/components/VideoModal";
import LightboxModal from "@/components/LightboxModal";

import OpeningLogoAnimation from "@/components/OpeningLogoAnimation";
import { siteContent } from "@/data/siteContent";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Register Now");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openRegister = (title: string = "Register Now") => {
    setModalTitle(title);
    setIsRegisterOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0f0708] text-white">
      {/* 0. Opening Logo Brand Animation with 3D Flip Transition */}
      <OpeningLogoAnimation />

      {/* 1. Sticky / Transparent Header Navbar */}
      <Navbar onOpenRegister={() => openRegister("Register Now")} />

      {/* 2. Hero Video & Parallax Section */}
      <HeroSection />

      {/* 3. Intro / Overview & 4-Column Statistics */}
      <IntroSection onOpenBrochure={() => openRegister("Download Brochure")} />

      {/* 4. Elevation & New Heights Parallax Section */}
      <ElevationParallax />

      {/* 5. Bespoke Living & Floating 3-Image Collage */}
      <BespokeCollage onOpenApartments={() => openRegister("Apartment Enquiry")} />

      {/* 6. Nature Storytelling & Environmental Perks Banner */}
      <SkyTerraceSection />

      {/* 7. Upscale Lifestyle Amenities with 3D Flip Cards & 6 Category Directory */}
      <AmenitiesSection onOpenAmenities={() => openRegister("Amenities Enquiry")} />

      {/* 8. Vertical Ecosystem Dynamic Expanding Section with Play Button */}
      <SanctuaryExpandable
        onPlayVideo={() => setIsVideoOpen(true)}
        onOpenOutdoor={() => openRegister("Outdoor Lifestyle Enquiry")}
      />

      {/* 9. Floor Plans Crafted to Suit Your Lifestyle */}
      <FloorPlansSection onOpenPlans={() => openRegister("Request Floor Plans")} />

      {/* 10. Location Split Panel with Kollur ORR Exit 2 & Live Map */}
      <LocationSection />

      {/* 12. Luxury Gallery with Hover Zoom and Lightbox */}
      <GallerySection onOpenLightbox={(idx) => setLightboxIndex(idx)} />

      {/* 13. Relationship Manager Lead Capture & Sales Info */}
      <ContactSection />

      {/* 14. Footer & Regulatory Information */}
      <Footer />

      {/* Interactive Popups & Modals */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title={modalTitle}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={siteContent.verticalEcosystem.videoUrl}
      />

      <LightboxModal
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </main>
  );
}
