"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Building2, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactData = siteContent.contact;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setStatus({ type: "error", message: "Please enter a valid phone number." });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: "success",
        message: "Thank you! Your enquiry has been received. Our Relationship Manager will contact you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 900);
  };

  return (
    <section
      id="contactus"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#0f0708] text-white overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/contact-bg.png')`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold block mb-4">
            {contactData.tag}
          </span>

          <h3
            ref={headingRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight tracking-tight uppercase"
          >
            {contactData.titleLines.map((line, idx) => (
              <span key={idx} className="block clip-line overflow-hidden">
                {line}
              </span>
            ))}
          </h3>
          <p className="text-white/70 text-sm md:text-base font-sans mt-4">
            Register your interest to receive detailed plans, pricing previews, and exclusive invitations.
          </p>
        </div>

        {/* Lead Form Card */}
        <div className="bg-[#181719]/90 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-2xl mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Your Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-black/40 border border-white/15 focus:border-gold text-white placeholder-white/30 text-sm outline-none transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Your E-Mail <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-black/40 border border-white/15 focus:border-gold text-white placeholder-white/30 text-sm outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Phone Number <span className="text-gold">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-black/40 border border-white/15 focus:border-gold text-white placeholder-white/30 text-sm outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-3 px-10 py-4 rounded-full bg-gold hover:bg-white text-luxury-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-glow disabled:opacity-50"
              >
                <span>{isSubmitting ? "SENDING..." : "REGISTER INTEREST"}</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Status Alert */}
            {status.message && (
              <div
                className={`text-center text-sm font-medium pt-2 transition-all duration-300 ${
                  status.type === "success" ? "text-gold" : "text-rose-400"
                }`}
              >
                {status.type === "success" && <CheckCircle2 className="w-5 h-5 inline mr-2 text-gold" />}
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Sales & Enquiries */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 block">
                Sales & Enquiries
              </span>
              <p className="font-serif text-lg text-white font-medium mb-2 flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{contactData.displayPhone}</span>
              </p>
              <a
                href={`mailto:${contactData.email}`}
                className="text-sm text-white/70 hover:text-gold transition-colors inline-flex items-center justify-center md:justify-start space-x-2"
              >
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{contactData.email}</span>
              </a>
            </div>
            <p className="text-[11px] text-white/40 mt-4 font-sans">
              Direct telephone lines will be updated upon final verification.
            </p>
          </div>

          {/* Site Address */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 block">
                Site Address
              </span>
              <div className="flex items-start space-x-3 text-left">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {contactData.siteAddress}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-gold/80 mt-4 font-sans">
              Strategically located by ORR Exit 2
            </p>
          </div>

          {/* Corporate Office */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 block">
                Corporate Office
              </span>
              <div className="flex items-start space-x-3 text-left">
                <Building2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {contactData.corporateAddress}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-white/40 mt-4 font-sans">
              Ravi Shankar Arcade, Gachibowli
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
