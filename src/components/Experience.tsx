import React from 'react';
import { motion } from 'motion/react';
import { ExperienceItem } from '../types/portfolio';
import { Plus, Briefcase, MapPin } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceItem[];
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({
  experience,
  onOpenAssistantStep,
  isUpdated,
}) => {
  return (
    <section
      id="journey"
      className={`py-16 md:py-24 border-b border-[#E6DDD0] transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#3F5127] font-semibold">
              Career Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#251A16] tracking-tight">
              Engineering Leadership & Roles
            </h2>
            <p className="text-sm sm:text-base text-[#615248] max-w-xl">
              A track record of technical ownership, system scaling, and client delivery across high-growth studios.
            </p>
          </div>

          <button
            onClick={() => onOpenAssistantStep(6)}
            className="px-4 py-2 text-xs font-semibold text-[#251A16] bg-[#ECE6DC] hover:bg-[#E0D8CB] rounded-xl border border-[#D7CDC0] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#3D4F25]" />
            <span>Update Timeline</span>
          </button>
        </div>

        {/* Editorial Timeline List */}
        <div className="space-y-8">
          {experience.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#DDD3C5] hover:border-[#C4B7A5] transition-colors shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#405228]">
                    <span className="font-mono">0{index + 1}.</span>
                    <span>{item.company}</span>
                    <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                    <span className="flex items-center gap-1 text-[#6F6054]">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#251A16]">
                    {item.role}
                  </h3>
                </div>

                <div className="text-xs font-mono font-medium text-[#5D4E44] tabular-nums shrink-0 pt-1">
                  {item.period}
                </div>
              </div>

              <p className="mt-4 text-sm text-[#4E3F36] leading-relaxed">
                {item.description}
              </p>

              {/* Bulleted Highlights */}
              <ul className="mt-4 space-y-2 pt-3 border-t border-[#ECE5DA]">
                {item.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-xs sm:text-sm text-[#5C4D44] flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#46582D] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
