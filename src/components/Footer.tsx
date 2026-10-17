"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2 } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="relative bg-[#070506] text-white/70 pt-16 pb-12 border-t border-white/10 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Brand & Navigation Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-white/10 gap-8">
          {/* Brand Logo in Matching Forest Green Container */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <Link href="#hero" className="inline-block group" aria-label="VANAE Home">
              <div className="inline-flex items-center justify-center bg-[#0D5A46] rounded-xl px-3 py-1.5 md:px-3.5 md:py-2 border border-gold/35 group-hover:border-gold shadow-lg group-hover:shadow-[0_0_20px_rgba(195,150,99,0.3)] transition-all duration-300">
                <Image
                  src={siteContent.branding.logoLight}
                  alt={siteContent.branding.name}
                  width={492}
                  height={430}
                  className="h-10 md:h-12 w-auto object-contain block transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-white/60 text-xs tracking-wider uppercase font-medium">
              {siteContent.branding.tagline}
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/70 hover:text-gold transition-colors text-xs uppercase tracking-wider font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle Tier: Addresses */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 text-white/60">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block mb-0.5">
                Site Address
              </span>
              <p className="text-xs leading-relaxed">{siteContent.footer.siteAddress}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Building2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block mb-0.5">
                Corporate Address
              </span>
              <p className="text-xs leading-relaxed">{siteContent.footer.corporateAddress}</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright, TS RERA, and Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-white/60">
              {siteContent.footer.copyright} — Site by{" "}
              <Link
                href={siteContent.footer.designedByUrl}
                className="text-gold hover:underline font-medium"
              >
                {siteContent.footer.designedBy}
              </Link>
            </p>
          </div>

          {/* Center: RERA Notice */}
          <div className="text-center">
            <p className="text-white/80 uppercase tracking-wider text-[11px]">
              {siteContent.footer.reraNumber}
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center space-x-6">
            {siteContent.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-gold transition-colors font-semibold uppercase tracking-wider text-xs"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
