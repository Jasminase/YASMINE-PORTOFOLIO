import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData, Project, ExperienceItem } from '../types/portfolio';
import { 
  X, Check, ChevronRight, ChevronLeft, Github, Linkedin, 
  Mail, MapPin, Sparkles, Plus, Trash2, ExternalLink
} from 'lucide-react';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData, updatedSectionKey: string) => void;
  initialStep?: number;
}

const steps = [
  { id: 1, title: 'Identity & Headline', kicker: 'Personal Branding' },
  { id: 2, title: 'GitHub & LinkedIn', kicker: 'Social Profiles' },
  { id: 3, title: 'Bio & Ethos', kicker: 'Editorial Narrative' },
  { id: 4, title: 'Skills & Craft', kicker: 'Technical Stack' },
  { id: 5, title: 'Featured Projects', kicker: 'Works & Repositories' },
  { id: 6, title: 'Career Journey', kicker: 'Experience Timeline' },
];

export const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  initialStep = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<ProfileData>(profile);

  // Sync if profile prop changes
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  React.useEffect(() => {
    if (initialStep) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = (sectionKey: string = 'all') => {
    onSave(formData, sectionKey);
    onClose();
  };

  // Helper for adding a project
  const handleAddProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: "New Featured Project",
      category: "Web Applications",
      description: "Brief summary of the architecture and client problem solved.",
      fullStory: "Expanded case study details on implementation choices and impact.",
      image: "/src/assets/images/project_artisan_studio_1793297184883.jpg",
      tags: ["TypeScript", "React", "Tailwind CSS"],
      githubUrl: formData.socials.github,
      liveUrl: "https://example.com",
      featured: true,
      year: new Date().getFullYear().toString(),
      metrics: "Sub-50ms response time"
    };
    setFormData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  // Helper for adding experience
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Senior Software Engineer",
      company: "Independent Client Studio",
      location: "Remote",
      period: `${new Date().getFullYear()} — Present`,
      description: "Architecting performant interfaces and distributed backend APIs.",
      highlights: [
        "Delivered critical full-stack initiatives with high test coverage",
        "Collaborated across design and engineering teams to establish design tokens"
      ]
    };
    setFormData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1412]/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#DDD4C6] rounded-2xl shadow-2xl overflow-hidden my-6 z-10 text-[#2B211D] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E7DFD4] bg-[#F4EFEB] flex items-center justify-between shrink-0">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#695B50] font-semibold">
                Question {currentStep} of {steps.length} · {steps[currentStep - 1].kicker}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#2A1F1B]">
                {steps[currentStep - 1].title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#E5DDD0] text-[#55473E] flex items-center justify-center transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress Ribbon */}
          <div className="flex border-b border-[#E7DFD4] bg-[#EFE9DF] overflow-x-auto text-xs shrink-0">
            {steps.map((st) => (
              <button
                key={st.id}
                onClick={() => setCurrentStep(st.id)}
                className={`px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  currentStep === st.id
                    ? 'bg-[#FAF8F5] text-[#3D4F25] font-semibold border-b-2 border-[#475C2C]'
                    : 'text-[#6F6156] hover:text-[#2B211D]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{st.id}.</span>
                <span>{st.title}</span>
              </button>
            ))}
          </div>

          {/* Form Content Area (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <p className="text-sm text-[#5D5047] leading-relaxed">
                    Let's configure your core identity and hero presentation. What name and role should visitors see first?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                        placeholder="e.g. Yasmine Mtimet"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                        Pronouns
                      </label>
                      <input
                        type="text"
                        value={formData.pronouns}
                        onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                        placeholder="e.g. she/her"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Professional Title & Headline
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="e.g. Full-Stack Engineer & Creative Interface Architect"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Hero Display Headline
                    </label>
                    <input
                      type="text"
                      value={formData.heroHeadline}
                      onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="e.g. Building Tactile Digital Artifacts in Earth Tones"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                        Location / Timezone
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#7B6E64] absolute left-3 top-3" />
                        <input
                          type="text"
                          value={formData.socials.location}
                          onChange={(e) => setFormData({
                            ...formData,
                            socials: { ...formData.socials, location: e.target.value }
                          })}
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                          placeholder="e.g. Tunis / Paris · Remote"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                        Availability Notice
                      </label>
                      <input
                        type="text"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                        placeholder="e.g. Available for Q1 / Q2 Projects"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <p className="text-sm text-[#5D5047] leading-relaxed">
                    Connect your LinkedIn and GitHub accounts. These will power direct links, verified identity badges, and contact channels across the site.
                  </p>

                  {/* GitHub Profile URL */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#4A3D35] flex items-center gap-1.5 uppercase tracking-wider">
                        <Github className="w-4 h-4 text-[#3C4E26]" />
                        GitHub Account URL / Handle
                      </label>
                      {formData.socials.github && (
                        <a
                          href={formData.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#405327] hover:underline flex items-center gap-1"
                        >
                          Test Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.socials.github}
                      onChange={(e) => setFormData({
                        ...formData,
                        socials: { ...formData.socials, github: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="https://github.com/your-username"
                    />
                    <span className="text-[11px] text-[#786C62] block">
                      Tip: You can enter full URL (e.g. https://github.com/yasminemtimet) or your username.
                    </span>
                  </div>

                  {/* LinkedIn Profile URL */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#4A3D35] flex items-center gap-1.5 uppercase tracking-wider">
                        <Linkedin className="w-4 h-4 text-[#3C4E26]" />
                        LinkedIn Account URL
                      </label>
                      {formData.socials.linkedin && (
                        <a
                          href={formData.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#405327] hover:underline flex items-center gap-1"
                        >
                          Test Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.socials.linkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        socials: { ...formData.socials, linkedin: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    <span className="text-[11px] text-[#786C62] block">
                      Directly links recruiters and partners to your professional profile.
                    </span>
                  </div>

                  {/* Primary Email */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-2">
                    <label className="text-xs font-semibold text-[#4A3D35] flex items-center gap-1.5 uppercase tracking-wider">
                      <Mail className="w-4 h-4 text-[#3C4E26]" />
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.socials.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        socials: { ...formData.socials, email: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="e.g. yasminemtimet2@gmail.com"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <p className="text-sm text-[#5D5047] leading-relaxed">
                    Tell your story in thoughtful editorial prose. What is your craft philosophy and approach to software?
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Bio Lead Introduction
                    </label>
                    <textarea
                      rows={2}
                      value={formData.bioLead}
                      onChange={(e) => setFormData({ ...formData, bioLead: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="Brief one-sentence elevator summary..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Design Philosophy & Principles
                    </label>
                    <input
                      type="text"
                      value={formData.designPhilosophy}
                      onChange={(e) => setFormData({ ...formData, designPhilosophy: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="e.g. Software should feel like crafted linen and carved cedar..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Detailed Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bioStory[0] || ''}
                      onChange={(e) => {
                        const copy = [...formData.bioStory];
                        copy[0] = e.target.value;
                        setFormData({ ...formData, bioStory: copy });
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="Narrative about your journey and focus areas..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#574A41] uppercase tracking-wider mb-1.5">
                      Detailed Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bioStory[1] || ''}
                      onChange={(e) => {
                        const copy = [...formData.bioStory];
                        copy[1] = e.target.value;
                        setFormData({ ...formData, bioStory: copy });
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#2A1F1B] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      placeholder="Narrative about past client engagements, ethics, and performance..."
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <p className="text-sm text-[#5D5047] leading-relaxed">
                    Review and curate your core technical competencies and craft disciplines.
                  </p>

                  <div className="space-y-4">
                    {formData.skillCategories.map((cat, catIdx) => (
                      <div key={cat.category} className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3F5127]">
                            {cat.category}
                          </h4>
                          <span className="text-[11px] text-[#7D7065]">{cat.skills.length} skills listed</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {cat.skills.map((skill, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-2.5 rounded-lg bg-[#F8F5EF] border border-[#E4DCCE] flex items-center justify-between"
                            >
                              <div>
                                <span className="font-medium text-[#2E231F]">{skill.name}</span>
                                <p className="text-[10px] text-[#7B6E63] mt-0.5">{skill.context || skill.level}</p>
                              </div>
                              <button
                                onClick={() => {
                                  const updatedCats = [...formData.skillCategories];
                                  updatedCats[catIdx].skills = updatedCats[catIdx].skills.filter((_, i) => i !== sIdx);
                                  setFormData({ ...formData, skillCategories: updatedCats });
                                }}
                                className="text-[#A49483] hover:text-[#B23826] p-1"
                                title="Remove skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add custom skill to this category */}
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            id={`new-skill-${catIdx}`}
                            placeholder="Add skill (e.g. Next.js 15, Rust, WebAssembly)"
                            className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2B211D]"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) {
                                  const updatedCats = [...formData.skillCategories];
                                  updatedCats[catIdx].skills.push({ name: val, level: 'Proficient' });
                                  setFormData({ ...formData, skillCategories: updatedCats });
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById(`new-skill-${catIdx}`) as HTMLInputElement;
                              if (input && input.value.trim()) {
                                const updatedCats = [...formData.skillCategories];
                                updatedCats[catIdx].skills.push({ name: input.value.trim(), level: 'Proficient' });
                                setFormData({ ...formData, skillCategories: updatedCats });
                                input.value = '';
                              }
                            }}
                            className="px-3 py-1.5 text-xs font-medium bg-[#45582B] text-white rounded-md hover:bg-[#34441F] flex items-center gap-1 shrink-0"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#5D5047]">
                      Manage featured projects in your portfolio. You can modify titles, GitHub repos, live links, and descriptions.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="px-3 py-1.5 text-xs font-medium bg-[#45582B] text-white rounded-lg hover:bg-[#34441F] flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.projects.map((proj, idx) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F5127]">
                            Project 0{idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                projects: formData.projects.filter(p => p.id !== proj.id)
                              });
                            }}
                            className="text-[#988776] hover:text-[#B23826] p-1 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Project Title
                            </label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const copy = [...formData.projects];
                                copy[idx].title = e.target.value;
                                setFormData({ ...formData, projects: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Category
                            </label>
                            <select
                              value={proj.category}
                              onChange={(e) => {
                                const copy = [...formData.projects];
                                copy[idx].category = e.target.value as any;
                                setFormData({ ...formData, projects: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            >
                              <option value="Web Applications">Web Applications</option>
                              <option value="Architecture & Systems">Architecture & Systems</option>
                              <option value="Creative Code">Creative Code</option>
                              <option value="Editorial & UI">Editorial & UI</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => {
                              const copy = [...formData.projects];
                              copy[idx].description = e.target.value;
                              setFormData({ ...formData, projects: copy });
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              GitHub Repo Link
                            </label>
                            <input
                              type="text"
                              value={proj.githubUrl}
                              onChange={(e) => {
                                const copy = [...formData.projects];
                                copy[idx].githubUrl = e.target.value;
                                setFormData({ ...formData, projects: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                              placeholder="https://github.com/..."
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Live Demo URL
                            </label>
                            <input
                              type="text"
                              value={proj.liveUrl}
                              onChange={(e) => {
                                const copy = [...formData.projects];
                                copy[idx].liveUrl = e.target.value;
                                setFormData({ ...formData, projects: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#5D5047]">
                      Curate your career journey timeline, leadership positions, and client engagements.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="px-3 py-1.5 text-xs font-medium bg-[#45582B] text-white rounded-lg hover:bg-[#34441F] flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Role
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.experience.map((exp, idx) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-white border border-[#DCD3C5] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F5127]">
                            Milestone 0{idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                experience: formData.experience.filter(e => e.id !== exp.id)
                              });
                            }}
                            className="text-[#988776] hover:text-[#B23826] p-1 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Role Title
                            </label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => {
                                const copy = [...formData.experience];
                                copy[idx].role = e.target.value;
                                setFormData({ ...formData, experience: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Company / Studio
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const copy = [...formData.experience];
                                copy[idx].company = e.target.value;
                                setFormData({ ...formData, experience: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Period / Dates
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const copy = [...formData.experience];
                                copy[idx].period = e.target.value;
                                setFormData({ ...formData, experience: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const copy = [...formData.experience];
                                copy[idx].location = e.target.value;
                                setFormData({ ...formData, experience: copy });
                              }}
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#5B4F46] uppercase mb-1">
                            Role Description
                          </label>
                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => {
                              const copy = [...formData.experience];
                              copy[idx].description = e.target.value;
                              setFormData({ ...formData, experience: copy });
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD4C5] rounded-md text-[#2A1F1B]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-[#F2EDE5] border-t border-[#E5DDD0] flex items-center justify-between shrink-0">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 text-xs font-medium text-[#4D3F37] hover:text-[#2B211D] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#44562B] hover:bg-[#34441F] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFinish('all')}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#374921] hover:bg-[#2A3918] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C4D9A8]" />
                  <span>Save & Apply Updates</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
