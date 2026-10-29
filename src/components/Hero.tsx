import React from 'react';
import { motion } from 'motion/react';
import { ProfileData } from '../types/portfolio';
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, Pencil, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  profile: ProfileData;
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenAssistantStep, isUpdated }) => {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="hero"
      className={`relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#E6DDD0] transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Screen 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Editorial Kicker & Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#67594E]">
              <span className="text-[#3B4D25] font-semibold">Editorial Portfolio</span>
              <span aria-hidden="true" className="text-[#BCAE9F]">·</span>
              <span>Works 2024 — 2027</span>
              <span aria-hidden="true" className="text-[#BCAE9F]">·</span>
              <span className="flex items-center gap-1 text-[#45572C]">
                <MapPin className="w-3.5 h-3.5" />
                {profile.socials.location}
              </span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#251A16] leading-[1.12] text-balance">
                {profile.heroHeadline || `${profile.name} — Interface Architect`}
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#4D6031] tracking-wide">
                {profile.title} <span className="text-[#8F8174] font-normal">({profile.pronouns})</span>
              </p>
            </div>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-[#55463D] leading-relaxed max-w-2xl">
              {profile.bioLead}
            </p>

            {/* Primary Action & Social Links Group */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* GitHub Direct Link */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#2E201B] hover:bg-[#1E1410] rounded-xl transition-all shadow-xs hover:shadow-sm"
              >
                <Github className="w-4 h-4 text-[#A8BE88]" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#BBAFA2]" />
              </a>

              {/* LinkedIn Direct Link */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#291F1A] bg-[#ECE5DA] hover:bg-[#DFD7CA] border border-[#D5CBBF] rounded-xl transition-all shadow-xs hover:shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#3C4F25]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7F7065]" />
              </a>

              {/* Email Copy Action */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-[#463931] hover:text-[#251A16] bg-white hover:bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl transition-colors"
                title="Copy contact email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#425528]" />
                    <span className="text-[#3A4C24]">Copied email!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-[#736458]" />
                    <span>Copy Email</span>
                    <Copy className="w-3 h-3 text-[#9A8D80]" />
                  </>
                )}
              </button>

              {/* Quick Section Edit Button */}
              <button
                onClick={() => onOpenAssistantStep(1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5E5045] hover:text-[#2B201A] rounded-lg transition-colors border border-transparent hover:border-[#DACFC0]"
                title="Edit hero headline and identity"
              >
                <Pencil className="w-3.5 h-3.5 text-[#7B6E63]" />
                <span>Edit Hero</span>
              </button>
            </div>

            {/* Availability Kicker */}
            {profile.availability && (
              <div className="pt-2 text-xs text-[#66574C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4E6333]" />
                <span>{profile.availability}</span>
              </div>
            )}
          </motion.div>

          {/* Right Column: High-Resolution Editorial Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden bg-[#E7E0D5] border-2 border-[#DDD3C5] shadow-xl">
              <img
                src={profile.heroImage}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201814]/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge in Bottom Corner */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E0D7CB] flex items-center justify-between">
                <div>
                  <div className="text-xs font-serif font-bold text-[#2A1F1B]">
                    {profile.name}
                  </div>
                  <div className="text-[11px] text-[#695C51]">
                    {profile.socials.location}
                  </div>
                </div>

                <button
                  onClick={() => onOpenAssistantStep(2)}
                  className="text-[11px] text-[#3D4F26] font-semibold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Socials
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Metrics Row Below Split (Rule §2.B of Portfolio Guide) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 pt-8 border-t border-[#E6DDD0] grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#251A16] font-mono tabular-nums">
              5+ Years
            </div>
            <div className="text-xs text-[#6F6054]">
              Full-Stack Architecture & Design
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#3B4D25] font-mono tabular-nums">
              18+ Projects
            </div>
            <div className="text-xs text-[#6F6054]">
              Shipped into Production
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#251A16] font-mono tabular-nums">
              100% WCAG
            </div>
            <div className="text-xs text-[#6F6054]">
              AA Accessibility Contrast
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#3B4D25] font-mono tabular-nums">
              Open Source
            </div>
            <div className="text-xs text-[#6F6054]">
              Active GitHub Contributor
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
