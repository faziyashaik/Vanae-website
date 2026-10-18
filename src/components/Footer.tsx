"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Nature", href: "#nature" },
    { label: "Residences", href: "#residences" },
    { label: "Amenities", href: "#amenities" },
    { label: "Floor Plans", href: "#floor-plans" },
    { label: "Location", href: "#location" },
    { label: "Enquiries", href: "#contactus" },
  ];

  return (
    <footer id="footer" className="relative bg-[#0D5A46] text-[#F8F5ED] pt-20 pb-12 overflow-hidden border-t border-[#C6A568]/30">
      <div id="contactus" className="sr-only" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Top 3-Area Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/15">
          {/* Area A: Brand Signature */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="#hero" className="inline-block group" aria-label="VANAE Home">
              <div className="relative inline-block overflow-hidden rounded-xl border border-[#C6A568]/40 shadow-md transition-all duration-300 group-hover:border-[#C6A568]">
                <Image
                  src={siteContent.branding.logoLight}
                  alt={siteContent.branding.name}
                  width={492}
                  height={430}
                  className="h-16 w-auto object-contain block transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide">
                THE ART OF ROOTED LIVING
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-medium font-sans">
                {siteContent.branding.tagline}
              </p>
            </div>

            <p className="text-xs text-[#F8F5ED]/75 leading-relaxed font-sans max-w-sm">
              Rising 36 towering floors above Kollur, ORR Exit 2, Hyderabad. A sanctuary where expansive luxury living preserves an intimate connection to the earth.
            </p>
          </div>

          {/* Area B: Navigation Architecture */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-semibold block">
              EXPLORE VANAE
            </span>

            <nav className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs sm:text-sm text-[#F8F5ED]/80 hover:text-[#C6A568] transition-colors py-1 block font-sans font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Area C: Addresses & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-semibold block">
              ADDRESSES
            </span>

            {/* Site Address */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A568]/90 font-medium block">
                Site Address
              </span>
              <p className="text-xs text-[#F8F5ED]/85 leading-relaxed font-sans">
                {siteContent.footer.siteAddress}
              </p>
              <a
                href="https://maps.google.com/?q=Kollur+Exit+2+Nehru+Outer+Ring+Road+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[11px] text-[#C6A568] hover:underline pt-0.5"
              >
                View on Google Maps →
              </a>
            </div>

            {/* Corporate Address */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A568]/90 font-medium block">
                Corporate Office
              </span>
              <p className="text-xs text-[#F8F5ED]/85 leading-relaxed font-sans">
                {siteContent.footer.corporateAddress}
              </p>
            </div>

            {/* Inquiries */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A568]/90 font-medium block">
                Official Inquiries
              </span>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="text-xs sm:text-sm text-white hover:text-[#C6A568] transition-colors font-medium font-sans block"
              >
                {siteContent.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright, RERA, and Socials */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F8F5ED]/65 font-sans">
          {/* Copyright & Attribution */}
          <div className="text-center md:text-left">
            <p>
              {siteContent.footer.copyright}
            </p>
          </div>

          {/* RERA Notice */}
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-wider text-[#F8F5ED]/80">
              {siteContent.footer.reraNumber}
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center space-x-6">
            {siteContent.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-[#F8F5ED]/75 hover:text-[#C6A568] transition-colors font-semibold"
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
