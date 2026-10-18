"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formTitle?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  title = "BRINGING IN THE EASE YOU DESIRE",
  formTitle = "Register Your Interest",
  triggerRef,
}: EnquiryModalProps) {
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

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Manage body scroll lock and escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the first input after opening
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger button
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your full name." });
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
        message:
          "Thank you for registering your interest. Our Relationship Manager will be in touch with you shortly.",
      });
      setFormData({ name: "", email: "", phone: "" });

      // Automatically close modal after brief success presentation
      setTimeout(() => {
        onClose();
        setStatus({ type: null, message: "" });
      }, 2400);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-heading"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#F8F5ED] border border-[#EAE1D1] rounded-2xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)] text-[#44382D] transition-all transform animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top-Right Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full border border-[#EAE1D1] bg-white/90 hover:bg-[#0D5A46] text-[#44382D] hover:text-white flex items-center justify-center transition-colors duration-200 shadow-sm cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-[#C6A568] focus-visible:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A568] font-semibold block mb-2">
            ENQUIRIES
          </span>

          <h2
            id="enquiry-modal-heading"
            className="font-serif text-2xl sm:text-3xl text-[#44382D] font-normal uppercase tracking-tight leading-snug mb-2"
          >
            {title}
          </h2>

          <p className="text-xs uppercase tracking-[0.2em] text-[#736B63] font-medium font-sans">
            {formTitle}
          </p>

          <div className="h-[1px] w-16 bg-[#C6A568]/50 mt-4" />
        </div>

        {/* Form Body */}
        {status.type === "success" ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#105D49]/10 border border-[#105D49]/30 flex items-center justify-center mx-auto text-[#105D49]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#105D49] font-medium">
              Registration Received
            </h3>
            <p className="text-[#736B63] text-sm leading-relaxed max-w-sm mx-auto font-sans">
              {status.message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-1.5 font-medium font-sans">
                Full Name <span className="text-[#C6A568]">*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#EAE1D1] focus:border-[#C6A568] focus:ring-1 focus:ring-[#C6A568]/30 text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-1.5 font-medium font-sans">
                Email Address <span className="text-[#C6A568]">*</span>
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#EAE1D1] focus:border-[#C6A568] focus:ring-1 focus:ring-[#C6A568]/30 text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-1.5 font-medium font-sans">
                Phone Number <span className="text-[#C6A568]">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#EAE1D1] focus:border-[#C6A568] focus:ring-1 focus:ring-[#C6A568]/30 text-[#44382D] placeholder-[#A49A8E] text-sm outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Error Message */}
            {status.type === "error" && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2.5 font-sans">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#C6A568] hover:bg-[#105D49] text-white font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "PROCESSING..." : "REGISTER INTEREST"}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Privacy Note */}
            <p className="text-[11px] text-[#A49A8E] font-sans leading-relaxed pt-1">
              By submitting this form, you agree to receive communications regarding VANAE residences. Your privacy is respected.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
