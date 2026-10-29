import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types/portfolio';
import { X, ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onEdit?: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onEdit }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1D1512]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E3DBD0] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2B211D]"
        >
          {/* Header Image Frame */}
          <div className="relative aspect-16/9 w-full bg-[#E8E2D7] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // styled fallback container if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201814]/80 via-transparent to-black/20" />

            {/* Top action bar */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2B211D] flex items-center justify-center shadow-md transition-transform hover:scale-105"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title Overlay in Banner */}
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D1E0C4] tracking-wide mb-1">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#FAF8F5]">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Lead description & key metric */}
            <div className="space-y-3">
              <p className="text-base text-[#4A3D36] leading-relaxed">
                {project.description}
              </p>
              {project.fullStory && (
                <p className="text-sm text-[#5E5149] leading-relaxed pt-2 border-t border-[#E8E1D5]">
                  {project.fullStory}
                </p>
              )}
            </div>

            {/* Key Metrics / Highlights if present */}
            {project.metrics && (
              <div className="p-4 rounded-xl bg-[#F0EBE1] border border-[#E1D7C8] flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#736357] font-semibold">
                  Performance & Impact
                </span>
                <span className="text-sm font-semibold text-[#3B4D25] font-mono tabular-nums">
                  {project.metrics}
                </span>
              </div>
            )}

            {/* Tech Stack Unboxed */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#736357] font-semibold mb-2.5">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4E413A]">
                {project.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="font-medium text-[#384A22]">{tag}</span>
                    {idx < project.tags.length - 1 && <span className="text-[#C4B7A5]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E1D5]">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#2B211D] bg-[#EFE9DF] hover:bg-[#E3DCcf] rounded-lg transition-colors border border-[#DDD4C5]"
                  >
                    <Github className="w-3.5 h-3.5 text-[#3D4C27]" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7B6E64]" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#425528] hover:bg-[#34441F] rounded-lg transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Deployment</span>
                  </a>
                )}
              </div>

              {onEdit && (
                <button
                  onClick={() => {
                    onClose();
                    onEdit(project);
                  }}
                  className="text-xs text-[#635449] hover:text-[#2B211D] underline underline-offset-4 decoration-[#B8AA98]"
                >
                  Edit this project in assistant
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
