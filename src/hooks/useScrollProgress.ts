import { useState, useEffect } from 'react';

export const SECTIONS = [
  { id: 'hero', labelEn: 'Home', labelFa: 'خانه' },
  { id: 'skills', labelEn: 'Skills & Activity', labelFa: 'مهارت‌ها' },
  { id: 'projects', labelEn: 'Projects', labelFa: 'پروژه‌ها' },
  { id: 'education', labelEn: 'Education', labelFa: 'تحصیلات' },
  { id: 'contact', labelEn: 'Contact', labelFa: 'تماس' },
];

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;

    const calculateScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = docHeight > 0 ? (winScroll / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, currentProgress)));

      // Calculate which section is currently centered or prominent in the viewport
      const scrollPosition = winScroll + window.innerHeight * 0.35;
      let matched = SECTIONS[0].id;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          matched = SECTIONS[i].id;
          break;
        }
      }

      // If scrolled to the bottom of the page, activate the contact section
      if (winScroll + window.innerHeight >= document.documentElement.scrollHeight - 40) {
        matched = SECTIONS[SECTIONS.length - 1].id;
      }

      setActiveSection(matched);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { progress, activeSection };
}
