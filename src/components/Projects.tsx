import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types/portfolio';
import { ExternalLink, Github, ArrowUpRight, Plus, Eye, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  onSelectProject,
  onOpenAssistantStep,
  isUpdated,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'Web Applications', label: 'Web Applications' },
    { id: 'Architecture & Systems', label: 'Systems & Architecture' },
    { id: 'Creative Code', label: 'Creative Code' },
    { id: 'Editorial & UI', label: 'Editorial & UI' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="works"
      className={`py-16 md:py-24 border-b border-[#E6DDD0] transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#3F5127] font-semibold">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#251A16] tracking-tight">
              Crafted Projects & Repositories
            </h2>
            <p className="text-sm sm:text-base text-[#615248] max-w-xl">
              High-fidelity web applications, climate telemetry engines, and algorithmic design systems built with precision.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAssistantStep(5)}
              className="px-4 py-2 text-xs font-semibold text-[#251A16] bg-[#ECE6DC] hover:bg-[#E0D8CB] rounded-xl border border-[#D7CDC0] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#3D4F25]" />
              <span>Add / Edit Projects</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Functional segmented controls) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE9DF] rounded-xl border border-[#DFD6C9] max-w-fit mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-white text-[#251A16] shadow-xs font-semibold'
                  : 'text-[#6C5E53] hover:text-[#251A16]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Bento layout arrangement: first item or featured items take larger span
              const isLarge = index % 3 === 0;
              const gridSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className={`${gridSpan} group relative flex flex-col bg-[#FAF8F5] border border-[#DDD3C5] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300`}
                >
                  {/* Media Frame */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative aspect-16/10 w-full overflow-hidden bg-[#E8E1D5] cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201814]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Hover Inspect Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#251A16] text-xs font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5 text-[#3D4F25]" />
                        Explore Case Study
                      </span>
                    </div>

                    {/* Unboxed Metadata in Media corner */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95">
                      <span className="font-mono text-[11px] text-[#DFEBD2]">
                        {project.year}
                      </span>
                      <span className="text-[11px] text-[#F3EFE9]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-xl font-serif font-bold text-[#251A16] group-hover:text-[#3B4D25] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Unboxed & Metric */}
                    <div className="space-y-3 pt-3 border-t border-[#ECE5DA]">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6F6055]">
                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                          <React.Fragment key={tag}>
                            <span className="font-medium text-[#374922]">{tag}</span>
                            {tIdx < Math.min(project.tags.length, 4) - 1 && (
                              <span className="text-[#C7BCAD]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {project.metrics && (
                        <div className="text-[11px] text-[#695B50] font-mono tabular-nums flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#46582D]" />
                          <span>{project.metrics}</span>
                        </div>
                      )}

                      {/* Card Action Links */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-[#483B33] hover:text-[#251A16] flex items-center gap-1 transition-colors"
                              title="GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5 text-[#3A4D24]" />
                              <span>Code</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-[#3C4F26] hover:text-[#243315] flex items-center gap-1 transition-colors"
                              title="Live Deployment"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Preview</span>
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => onSelectProject(project)}
                          className="text-xs font-semibold text-[#4A3C33] hover:text-[#251A16] flex items-center gap-0.5"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
