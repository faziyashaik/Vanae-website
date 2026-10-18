"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import MenuDrawer from "./MenuDrawer";

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrollState, setScrollState] = useState<"top" | "up" | "down">("top");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let upScrollAccumulator = 0;
    let downScrollAccumulator = 0;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. At the very top of the homepage (within 80px), restore the initial top navbar
      if (currentScrollY <= 80) {
        setScrollState("top");
        upScrollAccumulator = 0;
        downScrollAccumulator = 0;
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      if (diff < 0) {
        // Scrolling UP
        downScrollAccumulator = 0;
        upScrollAccumulator += Math.abs(diff);

        // Responsive threshold: once user scrolls up by >= 8px, show the floating pill
        if (upScrollAccumulator >= 8) {
          setScrollState((prev) => (prev !== "up" ? "up" : prev));
        }
      } else if (diff > 0) {
        // Scrolling DOWN
        upScrollAccumulator = 0;
        downScrollAccumulator += diff;

        // Requiring 14px downward scroll prevents micro-jitters or trackpad momentum bounce
        if (downScrollAccumulator >= 14) {
          setScrollState((prev) => (prev !== "down" ? "down" : prev));
        }
      }

      lastScrollY = Math.max(0, currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 1. Initial Top-of-Page Transparent Navbar */}
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 will-change-transform ${
          scrollState === "top"
            ? "py-6 md:py-8 bg-transparent translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Emblem */}
          <Link href="#hero" className="flex items-center group" aria-label="VANAE Home">
            <div className="relative flex items-center justify-center bg-[#0D5A46] rounded-xl px-2.5 py-1.5 md:px-3 md:py-2 border border-gold/35 group-hover:border-gold shadow-md group-hover:shadow-[0_0_20px_rgba(195,150,99,0.3)] transition-all duration-300">
              <Image
                src={siteContent.branding.logoLight}
                alt={siteContent.branding.name}
                width={492}
                height={430}
                priority
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-5 md:space-x-8">
            {/* Register Now CTA Button */}
            <button
              onClick={onOpenRegister}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gold hover:bg-white text-luxury-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-glow cursor-pointer"
            >
              REGISTER NOW
            </button>

            {/* Hamburger Push Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="w-12 h-12 rounded-full border border-white/20 hover:border-gold bg-black/30 hover:bg-gold/15 flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <span className="w-5 h-0.5 bg-white group-hover:bg-gold transition-all duration-300" />
              <span className="w-4 h-0.5 bg-white group-hover:bg-gold transition-all duration-300 group-hover:w-5" />
              <span className="w-5 h-0.5 bg-white group-hover:bg-gold transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Scroll-Up Compact Floating Pill Navbar */}
      <nav
        aria-label="Floating navigation pill"
        className={`fixed top-4 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[90%] md:w-full md:max-w-[680px] lg:max-w-[720px] h-[64px] sm:h-[70px] md:h-[72px] px-3.5 sm:px-6 md:px-7 rounded-full bg-[#F8F5ED]/95 backdrop-blur-md border border-[#EAE1D1] shadow-[0_12px_36px_rgba(30,25,20,0.14)] flex items-center justify-between transition-all duration-300 ease-out will-change-transform ${
          scrollState === "up"
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* Left: Prominent VANAE Brand Logo Badge */}
        <Link href="#hero" className="flex items-center group shrink-0" aria-label="VANAE Home">
          <div className="relative flex items-center justify-center bg-[#0D5A46] rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 border border-[#C6A568]/40 group-hover:border-[#C6A568] shadow-sm transition-all duration-200">
            <Image
              src={siteContent.branding.logoLight}
              alt={siteContent.branding.name}
              width={492}
              height={430}
              priority
              className="h-8 sm:h-9 md:h-10 w-auto object-contain block transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Right Controls: Balanced Action Buttons (Register Now + Dark Forest-Green Menu) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Register Now / Enquire Action Button */}
          <button
            onClick={onOpenRegister}
            aria-label="Register interest"
            className="inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-5 md:px-6 rounded-full bg-[#C6A568] hover:bg-[#B59355] active:scale-95 text-white font-semibold text-xs sm:text-[13px] tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap border border-[#B89456] focus-visible:ring-2 focus-visible:ring-[#C6A568] focus-visible:outline-none"
          >
            <span className="sm:hidden">ENQUIRE</span>
            <span className="hidden sm:inline">REGISTER NOW</span>
          </button>

          {/* Dark Forest-Green Menu Control with Ivory Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="inline-flex items-center justify-center space-x-2 sm:space-x-2.5 h-10 sm:h-11 px-3.5 sm:px-5 rounded-full bg-[#0D5A46] hover:bg-[#093F31] active:scale-95 text-[#F8F5ED] transition-all duration-200 shadow-sm cursor-pointer border border-[#093F31] focus-visible:ring-2 focus-visible:ring-[#0D5A46] focus-visible:outline-none"
          >
            <div className="w-3.5 sm:w-4 h-2.5 sm:h-3 flex flex-col justify-between" aria-hidden="true">
              <span className="w-full h-0.5 bg-[#F8F5ED] rounded-full transition-all duration-200" />
              <span className="w-full h-0.5 bg-[#F8F5ED] rounded-full transition-all duration-200" />
              <span className="w-full h-0.5 bg-[#F8F5ED] rounded-full transition-all duration-200" />
            </div>
            <span className="font-sans text-xs sm:text-[13px] uppercase tracking-wider font-semibold text-[#F8F5ED]">
              MENU
            </span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Navigation Push Menu */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenRegister={onOpenRegister}
      />
    </>
  );
}
