import React from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  brandName: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName,
  activeSection,
  onNavigate,
  onOpenAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Works', id: 'works' },
    { label: 'About', id: 'about' },
    { label: 'Journey', id: 'journey' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7DFD3] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-lg font-serif font-bold tracking-tight text-[#2A1F1B] whitespace-nowrap shrink-0 hover:text-[#415328] transition-colors text-left"
        >
          {brandName || 'Yasmine Mtimet'}
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#65574D]">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`hover:text-[#2A1F1B] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activeSection === item.id ? 'text-[#3E5125] font-semibold' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B602F] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAssistant}
            className="px-4 py-2 text-xs font-medium text-[#FAF8F5] bg-[#3B4D25] hover:bg-[#2F3D1C] rounded-lg transition-all shadow-xs hover:shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CBE1B0]" />
            <span>Customize Portfolio</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3C34] hover:text-[#2A1F1B] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7DFD3] bg-[#FAF8F5] px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                activeSection === item.id ? 'text-[#3E5125] font-semibold' : 'text-[#65574D]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
