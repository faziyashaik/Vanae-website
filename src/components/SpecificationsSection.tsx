"use client";

import { useState, useId } from "react";
import { ChevronDown, Search, CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function SpecificationsSection() {
  const specsData = siteContent.specifications;
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]); // default first 3 open

  const toggleCategory = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => {
    setOpenIndices(specsData.categories.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndices([]);
  };

  const filteredCategories = specsData.categories.filter((cat) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const titleMatch = cat.title.toLowerCase().includes(term);
    const itemMatch = cat.items.some((item) => item.toLowerCase().includes(term));
    return titleMatch || itemMatch;
  });

  return (
    <section
      id="specifications"
      className="relative py-24 md:py-36 bg-[#fcfbf9] text-[#232323] overflow-hidden border-b border-[#e5e1da]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-gold text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>{specsData.tag}</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#232323] font-normal leading-tight tracking-tight uppercase mb-4">
            {specsData.heading}
          </h3>
          <p className="text-neutral-600 text-sm md:text-base font-sans leading-relaxed">
            {specsData.subheading}
          </p>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specifications (e.g., flooring, lift)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-neutral-300 focus:border-[#0D5A46] text-xs md:text-sm text-[#232323] outline-none transition-colors shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-3 text-xs font-sans">
            <button
              onClick={expandAll}
              className="px-4 py-2 rounded-full bg-white border border-neutral-300 hover:border-gold hover:text-gold text-neutral-600 transition-colors shadow-sm font-medium"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 rounded-full bg-white border border-neutral-300 hover:border-neutral-700 text-neutral-600 transition-colors shadow-sm font-medium"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Categories Accordion Grid */}
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
              <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <p className="font-serif text-lg text-neutral-700">No specifications matched "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-xs text-gold hover:underline font-semibold uppercase tracking-wider"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((category, catIdx) => {
              const originalIndex = specsData.categories.findIndex((c) => c.title === category.title);
              const isOpen = openIndices.includes(originalIndex);

              return (
                <div
                  key={category.title}
                  className="bg-white rounded-xl border border-neutral-200/90 shadow-sm transition-all duration-300 hover:border-neutral-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(originalIndex)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left group hover:bg-[#faf9f7] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      <h4 className="font-serif text-base sm:text-lg text-[#232323] font-medium group-hover:text-[#0D5A46] transition-colors">
                        {category.title}
                      </h4>
                      <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {category.items.length} {category.items.length === 1 ? "spec" : "specs"}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-[#0D5A46] group-hover:text-white transition-all duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-neutral-100 bg-[#fdfdfc]">
                      <ul className="space-y-3">
                        {category.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start space-x-3 text-xs sm:text-sm leading-relaxed text-neutral-700">
                            <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quality Commitment Footer Note */}
        <div className="mt-12 text-center p-6 bg-white rounded-xl border border-neutral-200/80 shadow-sm">
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            All materials, fittings, fixtures, and finishes mentioned are of reputed make or equivalent conforming to Bureau of Indian Standards (BIS) and relevant IS codes.
          </p>
        </div>
      </div>
    </section>
  );
}
