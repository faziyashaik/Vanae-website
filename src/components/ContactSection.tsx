"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactData = siteContent.contact;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header subtle fade up
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // Form & Info container reveal
      if (formRef.current && infoRef.current) {
        gsap.fromTo(
          [formRef.current, infoRef.current],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName) {
      setStatus({ type: "error", message: "Please enter your full name." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 8) {
      setStatus({ type: "error", message: "Please enter a valid phone number." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: "",
          source: "contact",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your enquiry. Please try again.");
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Thank you for registering your interest. Our Relationship Manager will be in touch with you shortly.",
      });
      setFormData({ name: "", email: "", phone: "" });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unable to submit your enquiry. Please try again.";
      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contactus"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 bg-[#F8F5ED] text-[#44382D] border-t border-[#EAE1D1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Editorial Eyebrow & Display Heading */}
        <div ref={headingRef} className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[#C6A568] text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
            {contactData.tag}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#44382D] font-normal leading-[1.12] tracking-tight uppercase mb-6">
            {contactData.titleLines.join(" ")}
          </h2>

          <p className="text-[#736B63] text-base md:text-lg font-sans leading-relaxed max-w-2xl">
            Experience elevated living where nature rises with every floor. Register your interest for private consultations, detailed floor plans, and exclusive project presentations.
          </p>

          <div className="h-[1px] w-20 bg-[#C6A568]/60 mt-8" />
        </div>

        {/* 2-Column Editorial Grid: Form + Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form Card (The Focal Point) */}
          <div
            ref={formRef}
            className="lg:col-span-7 bg-white/85 backdrop-blur-sm rounded-2xl border border-[#EAE1D1] p-8 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(68,56,45,0.06)]"
          >
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6A568] font-semibold block mb-1.5">
                Private Consultation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#44382D] font-medium">
                Register Your Interest
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-2 font-medium">
                  Full Name <span className="text-[#C6A568]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3.5 rounded-lg bg-[#FAF7F2] border border-[#EAE1D1] focus:border-[#C6A568] focus:bg-white text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-2 font-medium">
                  Email Address <span className="text-[#C6A568]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3.5 rounded-lg bg-[#FAF7F2] border border-[#EAE1D1] focus:border-[#C6A568] focus:bg-white text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-2 font-medium">
                  Phone Number <span className="text-[#C6A568]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3.5 rounded-lg bg-[#FAF7F2] border border-[#EAE1D1] focus:border-[#C6A568] focus:bg-white text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`p-4 rounded-lg text-sm flex items-start space-x-3 transition-all duration-300 ${
                    status.type === "success"
                      ? "bg-[#105D49]/10 text-[#105D49] border border-[#105D49]/20"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#105D49]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 rounded-full bg-[#C6A568] hover:bg-[#105D49] text-white font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "PROCESSING..." : "REGISTER INTEREST"}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <p className="text-[11px] text-[#A49A8E] font-sans">
                By submitting this form, you agree to receive communications regarding VANAE residences. Your privacy is respected.
              </p>
            </form>
          </div>

          {/* Right Column: Editorial Contact Presentation */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-between space-y-10 pt-2 lg:pt-4">
            {/* 1. Visit Vanae */}
            <div className="space-y-3 pb-8 border-b border-[#EAE1D1]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-semibold block">
                VISIT VANAE
              </span>
              <p className="text-sm md:text-base text-[#44382D] leading-relaxed font-sans font-medium">
                {contactData.siteAddress}
              </p>
              <a
                href="https://maps.google.com/?q=Kollur+Exit+2+Nehru+Outer+Ring+Road+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#C6A568] hover:text-[#105D49] font-semibold tracking-wider uppercase transition-colors pt-1"
              >
                <span>View on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 2. Corporate Office */}
            <div className="space-y-3 pb-8 border-b border-[#EAE1D1]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-semibold block">
                CORPORATE OFFICE
              </span>
              <p className="text-sm md:text-base text-[#44382D] leading-relaxed font-sans">
                {contactData.corporateAddress}
              </p>
            </div>

            {/* 3. Get in Touch */}
            <div className="space-y-3 pb-8 border-b border-[#EAE1D1]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A568] font-semibold block">
                GET IN TOUCH
              </span>
              <div>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-serif text-xl sm:text-2xl text-[#44382D] hover:text-[#105D49] transition-colors font-medium block"
                >
                  {contactData.email}
                </a>
                <p className="text-xs text-[#736B63] font-sans mt-2">
                  Our sales advisors and architectural representatives respond within one business day.
                </p>
              </div>
            </div>

            {/* Architectural Philosophy Note */}
            <div className="pt-2">
              <p className="font-serif italic text-base sm:text-lg text-[#736B63] leading-relaxed">
                “There’s a certain wonder in rising higher while staying rooted below.”
              </p>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A568] font-semibold block mt-2">
                — VANAE Brand Philosophy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
