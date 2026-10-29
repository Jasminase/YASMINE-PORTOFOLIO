import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialProfileData } from './data/defaultProfile';
import { ProfileData, Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuestionnaireModal } from './components/QuestionnaireModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { UpdateNotificationToast } from './components/UpdateNotificationToast';
import { Sparkles, SlidersHorizontal, RefreshCw, Download, FileText } from 'lucide-react';

const STORAGE_KEY = 'yasmine_portfolio_profile_v1';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return initialProfileData;
  });

  const [activeSection, setActiveSection] = useState<string>('works');
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [assistantStep, setAssistantStep] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [recentlyUpdatedSection, setRecentlyUpdatedSection] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(true);

  // Sync with localStorage
  const handleSaveProfile = (updated: ProfileData, sectionKey: string) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }

    // Trigger update highlight animation
    setRecentlyUpdatedSection(sectionKey);
    setTimeout(() => {
      setRecentlyUpdatedSection(null);
    }, 2500);

    // Show feedback toast
    const labelMap: Record<string, string> = {
      hero: 'Hero headline, identity & socials updated',
      about: 'Editorial story & design philosophy updated',
      skills: 'Technical stack & competencies updated',
      works: 'Selected works & project showcase updated',
      journey: 'Career journey & milestones updated',
      all: 'Portfolio profile successfully updated!',
    };
    setToastMessage(labelMap[sectionKey] || 'Portfolio changes applied smoothly!');

    // Smooth scroll to relevant section if appropriate
    if (sectionKey !== 'all' && sectionKey !== 'hero') {
      const el = document.getElementById(sectionKey);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenAssistantStep = (step: number) => {
    setAssistantStep(step);
    setAssistantOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset portfolio back to default earth-toned profile configuration?')) {
      setProfile(initialProfileData);
      localStorage.removeItem(STORAGE_KEY);
      setToastMessage('Portfolio restored to initial defaults.');
    }
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage('Portfolio data exported as JSON file!');
  };

  // Scrollspy to update activeSection indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['works', 'about', 'journey', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#281D19] font-sans selection:bg-[#4E6135] selection:text-[#FAF8F5]">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        brandName={profile.name}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAssistant={() => handleOpenAssistantStep(1)}
      />

      {/* Interactive Setup Banner */}
      {showBanner && (
        <div className="bg-[#EFE9DE] border-b border-[#DFD6C8] px-6 py-3 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#3D2E27]">
              <Sparkles className="w-4 h-4 text-[#435529] shrink-0" />
              <span>
                <strong className="font-semibold text-[#291F1B]">Portfolio Setup Guide:</strong> Answer the 6 structured questions to add your real information, projects, and accounts.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenAssistantStep(1)}
                className="px-3 py-1.5 bg-[#3B4D25] hover:bg-[#2E3C1D] text-white font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Answer Questions</span>
              </button>
              <button
                onClick={() => handleOpenAssistantStep(2)}
                className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-white text-[#3D2E27] font-medium rounded-lg border border-[#DDD3C5] transition-colors"
              >
                <span>Add LinkedIn & GitHub</span>
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-[#7F7065] hover:text-[#281D19] p-1 ml-1"
                aria-label="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Section Transitions */}
      <main className="w-full">
        {/* Split Hero Section */}
        <Hero
          profile={profile}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'hero' || recentlyUpdatedSection === 'all'}
        />

        {/* Selected Works Section */}
        <Projects
          projects={profile.projects}
          onSelectProject={setSelectedProject}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'works' || recentlyUpdatedSection === 'all'}
        />

        {/* About & Narrative Philosophy */}
        <About
          profile={profile}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'about' || recentlyUpdatedSection === 'all'}
        />

        {/* Experience & Career Journey */}
        <Experience
          experience={profile.experience}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'journey' || recentlyUpdatedSection === 'all'}
        />

        {/* Skills & Craft Matrix */}
        <Skills
          categories={profile.skillCategories}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'skills' || recentlyUpdatedSection === 'all'}
        />

        {/* Contact & Social Inquiry */}
        <Contact
          profile={profile}
          onOpenAssistantStep={handleOpenAssistantStep}
          isUpdated={recentlyUpdatedSection === 'contact' || recentlyUpdatedSection === 'all'}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />

      {/* Floating Interactive Controls */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <button
          onClick={() => handleOpenAssistantStep(1)}
          className="px-4 py-2.5 bg-[#2B1F1B] hover:bg-[#1A120F] text-[#FAF8F5] text-xs font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-[#4E3A32] active:scale-97"
          title="Open Profile Customizer Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B2C997]" />
          <span>Tailor Portfolio Questions</span>
        </button>

        <button
          onClick={handleExportData}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#63554A] hover:text-[#281D19] border border-[#DDD3C5] flex items-center justify-center shadow-md transition-colors"
          title="Export portfolio as JSON"
          aria-label="Export portfolio as JSON"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleResetToDefault}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#63554A] hover:text-[#281D19] border border-[#DDD3C5] flex items-center justify-center shadow-md transition-colors"
          title="Reset to default data"
          aria-label="Reset to default data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Questionnaire Modal */}
      <QuestionnaireModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        initialStep={assistantStep}
      />

      {/* Project Lightbox Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={(proj) => {
          setSelectedProject(null);
          handleOpenAssistantStep(5);
        }}
      />

      {/* Animated Update Notification Toast */}
      <UpdateNotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
