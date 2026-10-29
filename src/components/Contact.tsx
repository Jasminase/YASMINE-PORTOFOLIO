import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData } from '../types/portfolio';
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, Send, Sparkles, MapPin, Pencil } from 'lucide-react';

interface ContactProps {
  profile: ProfileData;
  onOpenAssistantStep: (step: number) => void;
  isUpdated?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ profile, onOpenAssistantStep, isUpdated }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    projectScope: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName.trim() || !formData.senderEmail.trim()) return;

    // Simulate smooth sending state
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 transition-colors ${
        isUpdated ? 'section-updated-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-wider text-[#3F5127] font-semibold">
              Get in Touch
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#251A16] tracking-tight leading-tight">
              Let's create something enduring together.
            </h2>

            <p className="text-sm sm:text-base text-[#5F5046] leading-relaxed">
              Available for full-stack engineering contracts, design system consultations, and technical leadership engagements.
            </p>

            {/* Direct Social Cards */}
            <div className="space-y-3 pt-2">
              {/* GitHub Card */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD3C5] hover:border-[#3D4F25] transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2E201B] text-[#FAF8F5] flex items-center justify-center">
                    <Github className="w-5 h-5 text-[#A8BE88]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#251A16] group-hover:text-[#3B4D25] transition-colors flex items-center gap-1.5">
                      <span>GitHub</span>
                      <span className="text-[10px] text-[#425427] font-mono font-normal">Verified</span>
                    </div>
                    <div className="text-xs text-[#6F6054] font-mono truncate max-w-[220px]">
                      {profile.socials.github.replace('https://', '')}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7D70] group-hover:text-[#251A16] transition-colors" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD3C5] hover:border-[#3D4F25] transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#251A16] group-hover:text-[#3B4D25] transition-colors flex items-center gap-1.5">
                      <span>LinkedIn Profile</span>
                      <span className="text-[10px] text-[#425427] font-mono font-normal">Professional</span>
                    </div>
                    <div className="text-xs text-[#6F6054] font-mono truncate max-w-[220px]">
                      {profile.socials.linkedin.replace('https://', '')}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7D70] group-hover:text-[#251A16] transition-colors" />
              </a>

              {/* Direct Email Card */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD3C5]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#425528] text-white flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#251A16]">
                      Direct Email
                    </div>
                    <div className="text-xs text-[#6F6054] font-mono">
                      {profile.socials.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-medium text-[#384A22] hover:text-[#251A16] bg-[#ECE5DA] hover:bg-[#E0D7CB] rounded-lg transition-colors flex items-center gap-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenAssistantStep(2)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#685B51] hover:text-[#251A16] underline underline-offset-4 decoration-[#B8AA98]"
              >
                <Pencil className="w-3 h-3 text-[#3D4F25]" />
                Update LinkedIn, GitHub, or Contact Handles
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#DDD3C5] p-6 sm:p-8 rounded-2xl shadow-sm">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-serif font-bold text-[#251A16]">
                    Initiate an Inquiry
                  </h3>
                  <p className="text-xs text-[#695B51]">
                    Share an overview of your planned timeline, scope, or engineering challenge.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#54473F] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.senderName}
                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                        placeholder="e.g. Elena Vance"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#251A16] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#54473F] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.senderEmail}
                        onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                        placeholder="elena@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#251A16] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#54473F] mb-1">
                      Project Scope & Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      placeholder="e.g. Design system + full-stack web build · 3-month engagement"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#251A16] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#54473F] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the goals and specifications of your project..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C5] rounded-lg text-[#251A16] focus:outline-none focus:border-[#4B5E2F] focus:ring-1 focus:ring-[#4B5E2F]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#786C62]">
                      Direct notification dispatched to {profile.socials.email}
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-medium text-white bg-[#3B4D25] hover:bg-[#2F3D1C] rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E5EED8] text-[#3B4D25] mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#251A16]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#615248] max-w-md mx-auto">
                    Thank you, {formData.senderName}. Your message has been recorded and a response will be dispatched to <span className="font-medium text-[#251A16]">{formData.senderEmail}</span> within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ senderName: '', senderEmail: '', projectScope: '', message: '' });
                    }}
                    className="mt-3 px-4 py-2 text-xs font-medium text-[#384A22] bg-[#EFE9DF] hover:bg-[#E3DCcf] rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
