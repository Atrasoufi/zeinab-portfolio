import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BentoGridFirstRow } from './components/BentoGridFirstRow';
import { BentoGridSecondRow } from './components/BentoGridSecondRow';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SparkleCanvas } from './components/SparkleCanvas';

// Modals
import { ProjectModal } from './components/ProjectModal';
import { AboutModal } from './components/AboutModal';
import { CvModal } from './components/CvModal';
import { BlogModal } from './components/BlogModal';
import { GithubModal } from './components/GithubModal';
import { SkillDetailModal } from './components/SkillDetailModal';
import { DjangoArchitectureModal } from './components/DjangoArchitectureModal';

import { ProjectItem, PERSONAL_INFO } from './data/portfolioData';
import { Language } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Modal visibility states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isDjangoOpen, setIsDjangoOpen] = useState(false);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);

  // Sync document language, direction, and title
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title =
      lang === 'fa'
        ? `${PERSONAL_INFO.nameFa} | ${PERSONAL_INFO.roleFa}`
        : `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`;
  }, [lang]);

  // Sync theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Lock body scroll whenever any modal is open
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      selectedProject || isAboutOpen || isCvOpen || isBlogOpen || isGithubOpen || isDjangoOpen || selectedSkillName
    );
    if (isAnyModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProject, isAboutOpen, isCvOpen, isBlogOpen, isGithubOpen, isDjangoOpen, selectedSkillName]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'fa' : 'en'));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--color-text-main)] overflow-x-hidden transition-colors duration-300">
      {/* Background 2D Star & Sparkle Particle Canvas */}
      <SparkleCanvas />

      {/* Top Navigation */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCvModal={() => setIsCvOpen(true)}
        onOpenBlogModal={() => setIsBlogOpen(true)}
        onOpenDjangoModal={() => setIsDjangoOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-6">
        <HeroSection
          lang={lang}
          onExploreProjects={handleScrollToProjects}
          onOpenGithubModal={() => setIsGithubOpen(true)}
        />

        <BentoGridFirstRow
          lang={lang}
          onOpenGithubModal={() => setIsGithubOpen(true)}
          onOpenAboutModal={() => setIsAboutOpen(true)}
          onSelectSkill={(skill) => setSelectedSkillName(skill)}
          onScrollToContact={handleScrollToContact}
        />

        <BentoGridSecondRow
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <EducationSection lang={lang} />

        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenDjangoModal={() => setIsDjangoOpen(true)}
      />

      {/* Modals Subsystem */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        lang={lang}
        onClose={() => setIsAboutOpen(false)}
        onScrollToContact={handleScrollToContact}
      />

      <CvModal
        isOpen={isCvOpen}
        lang={lang}
        onClose={() => setIsCvOpen(false)}
      />

      <BlogModal
        isOpen={isBlogOpen}
        lang={lang}
        onClose={() => setIsBlogOpen(false)}
      />

      <GithubModal
        isOpen={isGithubOpen}
        lang={lang}
        onClose={() => setIsGithubOpen(false)}
      />

      <SkillDetailModal
        skillName={selectedSkillName}
        lang={lang}
        onClose={() => setSelectedSkillName(null)}
      />

      <DjangoArchitectureModal
        isOpen={isDjangoOpen}
        lang={lang}
        onClose={() => setIsDjangoOpen(false)}
      />
    </div>
  );
}
