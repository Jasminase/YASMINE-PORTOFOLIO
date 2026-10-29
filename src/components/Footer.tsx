import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F4EFEB] border-t border-[#E6DDD0] py-12 text-[#63554A]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Editorial Notice */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-serif font-bold text-[#251A16]">
            {profile.name}
          </div>
          <p className="text-xs text-[#7B6E63]">
            Digital architecture in warm earth tones, beige linen, and olive botanicals.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#251A16] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#251A16] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-[#251A16] transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#85776B]">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#EAE2D5] hover:bg-[#DDD3C3] text-[#251A16] flex items-center justify-center transition-colors"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
