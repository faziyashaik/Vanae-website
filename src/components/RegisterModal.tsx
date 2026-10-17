"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-lg bg-[#181719] border border-gold/30 rounded-2xl p-8 sm:p-10 shadow-2xl text-white transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-gold text-white text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-gold hover:bg-white text-luxury-black font-semibold rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-glow flex items-center justify-center space-x-2"
            >
              <span>CONFIRM REGISTRATION</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
