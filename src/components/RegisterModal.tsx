"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function RegisterModal({
  isOpen,
  onClose,
  title = "Register Now",
  subtitle = "THE ART OF ROOTED LIVING · KOLLUR ORR EXIT 2",
}: RegisterModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 8) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

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
          source: "register-interest",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to complete registration. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2400);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to complete registration. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-lg bg-[#181719] border border-gold/30 rounded-2xl p-8 sm:p-10 shadow-2xl text-white transform transition-all duration-300 scale-100">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold block mb-2">
            Priority Access
          </span>
          <h3 className="font-serif text-3xl font-normal text-white uppercase tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-white/60 text-xs tracking-wider uppercase font-sans">
            {subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto animate-bounce" />
            <h4 className="font-serif text-2xl text-white">Request Received</h4>
            <p className="text-white/70 text-sm">
              Our Relationship Manager will reach out to you shortly with exclusive details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Full Name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Email Address <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Phone Number <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2.5 font-sans">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-gold hover:bg-white text-luxury-black font-semibold rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-glow flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isSubmitting ? "PROCESSING..." : "CONFIRM REGISTRATION"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
