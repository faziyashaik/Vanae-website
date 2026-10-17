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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,border-color,box-shadow] duration-500 will-change-transform ${
          isScrolled
            ? "py-4 bg-[#0c0a0b]/90 backdrop-blur-md shadow-2xl border-b border-gold/15"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Emblem */}
          <Link href="#hero" className="flex items-center group" aria-label="VANAE Home">
            <div className="relative flex items-center justify-center bg-[#0D5A46] rounded-xl px-2 py-1 md:px-2.5 md:py-1.5 border border-gold/35 group-hover:border-gold shadow-md group-hover:shadow-[0_0_20px_rgba(195,150,99,0.3)] transition-all duration-300">
              <Image
                src={siteContent.branding.logoLight}
                alt={siteContent.branding.name}
                width={492}
                height={430}
                priority
                className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-5 md:space-x-8">
            {/* Register Now CTA Button */}
            <button
              onClick={onOpenRegister}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gold hover:bg-white text-luxury-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-glow"
            >
              REGISTER NOW
            </button>

            {/* Hamburger Push Button with 4 lines */}
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

      {/* Fullscreen Navigation Push Menu */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenRegister={onOpenRegister}
      />
    </>
  );
}
