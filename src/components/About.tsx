import React from 'react';
import { motion } from 'motion/react';
import { ProfileData } from '../types/portfolio';
import { Pencil, Compass, Sparkles, Feather } from 'lucide-react';

interface AboutProps {
  profile: ProfileData;
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenAssistantStep, isUpdated }) => {
  return (
    <section
      id="about"
      className={`py-16 md:py-24 border-b border-[#E6DDD0] transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Section Title & Philosophy Monograph */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-wider text-[#3F5127] font-semibold">
              Design Philosophy & Ethos
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#251A16] tracking-tight leading-tight">
              Calm interfaces built with organic endurance.
            </h2>

            {/* Design Quote Box */}
            <div className="p-6 rounded-2xl bg-[#F3EDE3] border border-[#DDD3C5] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#44562A] uppercase tracking-wider">
                <Feather className="w-3.5 h-3.5" />
                Guiding Principle
              </div>
              <blockquote className="text-sm font-serif italic text-[#3A2E28] leading-relaxed">
                "{profile.designPhilosophy}"
              </blockquote>
              <div className="text-[11px] text-[#786B61] pt-1">
                — {profile.name}, Architecture Manifesto
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAssistantStep(3)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#483B33] hover:text-[#251A16] bg-[#ECE5DA] hover:bg-[#E0D7CB] rounded-xl border border-[#D7CDC0] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5 text-[#3D4F25]" />
                <span>Refine Narrative & Philosophy</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Bio Story & Craft Tenets */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-base sm:text-lg text-[#4E3F36] leading-relaxed">
              {profile.bioStory.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8E0D4]">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#251A16]">
                  01. Architectural Rigor
                </h4>
                <p className="text-xs text-[#6B5C51] leading-normal">
                  Strict type safety, decoupled state management, and resilient edge APIs that scale reliably.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#3B4D25]">
                  02. Tactile Aesthetic
                </h4>
                <p className="text-xs text-[#6B5C51] leading-normal">
                  Warm linen palettes, high typographic discipline, and zero AI generic template tropes.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#251A16]">
                  03. Human Accessibility
                </h4>
                <p className="text-xs text-[#6B5C51] leading-normal">
                  WCAG AA compliant contrast, reduced motion alternatives, and lightning-fast zero layout shift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
