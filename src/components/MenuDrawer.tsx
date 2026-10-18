"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { siteContent } from "@/data/siteContent";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onOpenRegister }: MenuDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
      }`}
    >
      {/* Backdrop with texture */}
      <div
        className="absolute inset-0 bg-[#0c0a0b]/95 backdrop-blur-xl bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/images/menu-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Menu"
        className="absolute top-8 right-8 md:top-12 md:right-12 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-all duration-300 group border border-white/10"
      >
        <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
      </button>

      {/* Drawer Container */}
      <div className="relative z-10 w-full h-full overflow-y-auto px-6 py-16 md:px-20 md:py-16 flex flex-col justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="text-center md:text-left mb-10">
          <Link href="#hero" onClick={onClose} className="inline-block group" aria-label="VANAE Home">
            <div className="inline-flex items-center justify-center bg-[#0D5A46] rounded-2xl px-3 py-1.5 md:px-4 md:py-2 border border-gold/40 group-hover:border-gold shadow-xl group-hover:shadow-[0_0_25px_rgba(195,150,99,0.35)] transition-all duration-300">
              <Image
                src={siteContent.branding.logoLight}
                alt={siteContent.branding.name}
                width={492}
                height={430}
                className="h-11 md:h-14 w-auto object-contain block transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
          {/* Nav Links Column */}
          <div className="lg:col-span-7">
            <nav className="flex flex-col space-y-2 sm:space-y-2.5 md:space-y-3 text-center lg:text-left">
              {siteContent.navigation.map((item, index) => (
                <div
                  key={item.label}
                  className={`transition-all duration-700 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 45 + 150}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group inline-flex items-center space-x-3 sm:space-x-4 font-serif text-lg sm:text-xl md:text-2xl text-white/90 hover:text-gold transition-colors duration-300 tracking-wider"
                  >
                    <span className="font-sans text-[11px] sm:text-xs tracking-widest text-gold/60 font-medium group-hover:text-gold transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Quick Contact & Details Column */}
          <div
            className={`lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-md transition-all duration-700 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium block mb-4">
              Quick Contact
            </span>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-white/90 text-sm">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{siteContent.contact.displayPhone}</span>
              </div>

              <a
                href={`mailto:${siteContent.contact.email}`}
                className="flex items-center space-x-3 text-white/90 hover:text-gold transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{siteContent.contact.email}</span>
              </a>

              <div className="flex items-start space-x-3 text-white/70 text-sm">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs leading-relaxed">{siteContent.contact.siteAddress}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full py-3.5 bg-gold hover:bg-white text-luxury-black font-semibold rounded-full text-xs tracking-widest uppercase transition-all duration-300 shadow-glow"
            >
              Enquire Now / Register
            </button>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50 uppercase tracking-widest">Connect</span>
              <div className="flex space-x-4">
                {siteContent.contact.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/70 hover:text-gold transition-colors font-medium"
                  >
                    {social.short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Disclaimer */}
        <div className="text-center text-xs text-white/40 pt-8 border-t border-white/10">
          {siteContent.footer.reraNumber}
        </div>
      </div>
    </div>
  );
}
