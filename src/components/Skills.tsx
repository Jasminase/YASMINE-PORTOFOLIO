import React from 'react';
import { motion } from 'motion/react';
import { SkillCategory } from '../types/portfolio';
import { Plus, Code2, Layers, Cpu } from 'lucide-react';

interface SkillsProps {
  categories: SkillCategory[];
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ categories, onOpenAssistantStep, isUpdated }) => {
  return (
    <section
      id="skills"
      className={`py-16 md:py-24 border-b border-[#E6DDD0] transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#3F5127] font-semibold">
              Technical Stack & Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#251A16] tracking-tight">
              Disciplines, Tooling & Craft
            </h2>
            <p className="text-sm sm:text-base text-[#615248] max-w-xl">
              An inventory of core technologies, architectural systems, and design conventions refined across production applications.
            </p>
          </div>

          <button
            onClick={() => onOpenAssistantStep(4)}
            className="px-4 py-2 text-xs font-semibold text-[#251A16] bg-[#ECE6DC] hover:bg-[#E0D8CB] rounded-xl border border-[#D7CDC0] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#3D4F25]" />
            <span>Curate Skills</span>
          </button>
        </div>

        {/* 3-Column Categorized Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              key={cat.category}
              className="p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-[#DDD3C5] space-y-5"
            >
              <div className="border-b border-[#E7DFD4] pb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#3A4C24]">
                  {cat.category}
                </h3>
                <span className="font-mono text-[11px] text-[#7A6D63]">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-3.5">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#291F1B]">{skill.name}</span>
                      <span className="text-[11px] font-mono text-[#44562B]">{skill.level}</span>
                    </div>
                    {skill.context && (
                      <p className="text-[11px] text-[#73655A]">{skill.context}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
