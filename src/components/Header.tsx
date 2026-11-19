import React, { useState } from 'react';
import { NeonButterfly } from './NeonButterfly';
import { TRANSLATIONS, Language } from '../data/translations';
import { Download, Sun, Moon, Menu, X, BookOpen } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCvModal: () => void;
  onOpenBlogModal: () => void;
  onOpenDjangoModal: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenCvModal,
  onOpenBlogModal,
  onOpenDjangoModal,
  activeSection = 'hero',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNavLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
      isActive
        ? 'text-white bg-[#F12D91]/25 border border-[#F12D91]/50 shadow-[0_0_12px_rgba(241,45,145,0.3)]'
        : 'text-[#F8ECFA] hover:text-[#FF85C0] hover:bg-[#F12D91]/10 border border-transparent'
    }`;
  };

  return (
    <header className="sticky top-8 z-40 w-full backdrop-blur-xl bg-[#08040D]/80 border-b border-[#F12D91]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F12D91] rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center p-1 rounded-2xl bg-[#160D20] border border-[#F12D91]/40 group-hover:border-[#F12D91] shadow-[0_0_20px_rgba(241,45,145,0.35)] transition-all">
            <img
              src="/assets/portfolio/logo_butterfly_trans.png"
              alt="Zeinab Soufi"
              className="w-9 h-9 object-contain drop-shadow-[0_0_15px_#F12D91]"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#FF85C0] transition-colors font-['Outfit']">
              {lang === 'fa' ? 'زینب صوفی' : 'Zeinab Soufi'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Pill matching reference */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#160D20]/90 border border-[#F12D91]/30 backdrop-blur-md shadow-[0_0_20px_rgba(241,45,145,0.12)]">
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className={getNavLinkClass('hero')}
          >
            <span aria-hidden="true">⌂</span>
            <span>{t.nav.home}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('projects')}
            className={getNavLinkClass('projects')}
          >
            <span aria-hidden="true">📁</span>
            <span>{t.nav.projects}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('skills')}
            className={getNavLinkClass('skills')}
          >
            <span aria-hidden="true">&lt;/&gt;</span>
            <span>{t.nav.skills}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('education')}
            className={getNavLinkClass('education')}
          >
            <span aria-hidden="true">🎓</span>
            <span>{lang === 'fa' ? 'تحصیلات' : 'Education'}</span>
          </button>
          <button
            type="button"
            onClick={onOpenBlogModal}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#F8ECFA] hover:text-[#FF85C0] hover:bg-[#F12D91]/10 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] border border-transparent"
          >
            <span aria-hidden="true">📖</span>
            <span>{t.nav.blog}</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={getNavLinkClass('contact')}
          >
            <span aria-hidden="true">✉</span>
            <span>{t.nav.contact}</span>
          </button>
        </nav>

        {/* Right Action Tools: Language, Theme & Download CV */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Django Architecture Inspector Button */}
          <button
            type="button"
            onClick={onOpenDjangoModal}
            className="px-3 py-1.5 rounded-lg bg-[#160D20] border border-[#B84DFF]/40 text-[#D58BFF] hover:border-[#B84DFF] hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84DFF]"
            title="Inspect Django Backend Project Architecture"
            aria-label="Inspect Django backend project architecture"
            aria-haspopup="dialog"
          >
            <BookOpen size={14} aria-hidden="true" />
            <span>{t.nav.architecture}</span>
          </button>

          {/* Bilingual Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-lg bg-[#160D20] border border-[#F12D91]/30 hover:border-[#F12D91] text-xs font-semibold text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)] flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F12D91]"
            aria-label={`Switch language. Current language is ${lang === 'fa' ? 'Persian' : 'English'}`}
          >
            <span className={lang === 'fa' ? 'text-[#FF85C0] font-bold' : 'text-gray-400'}>FA</span>
            <span className="text-gray-500">/</span>
            <span className={lang === 'en' ? 'text-[#FF85C0] font-bold' : 'text-gray-400'}>EN</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[#160D20] border border-[#F12D91]/30 hover:border-[#F12D91] text-[#FF85C0] hover:text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F12D91]"
            aria-label={`${t.nav.themeToggle}. Current mode is ${theme}`}
          >
            {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>

          {/* Download CV CTA */}
          <button
            type="button"
            onClick={onOpenCvModal}
            className="neon-glow-btn px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
            aria-haspopup="dialog"
            aria-label={t.nav.downloadCv}
          >
            <Download size={15} aria-hidden="true" />
            <span>{t.nav.downloadCv}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1 rounded-md bg-[#160D20] border border-[#F12D91]/30 text-xs font-bold text-[#FF85C0]"
            aria-label={`Switch language. Current language is ${lang === 'fa' ? 'Persian' : 'English'}`}
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#160D20] border border-[#F12D91]/30 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" role="region" aria-label="Mobile Navigation Menu" className="sm:hidden px-4 pt-3 pb-6 bg-[#0E0816] border-b border-[#F12D91]/30 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => handleNavClick('skills')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.skills}
            </button>
            <button
              onClick={() => handleNavClick('education')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.education}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBlogModal();
              }}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left rtl:text-right px-3 py-2 text-sm font-medium text-white hover:bg-[#F12D91]/15 rounded-lg"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-3 border-t border-[#F12D91]/20 flex items-center justify-between">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-[#160D20] border border-[#F12D91]/30 text-[#FF85C0]"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="neon-glow-btn px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
            >
              <Download size={14} />
              <span>{t.nav.downloadCv}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
