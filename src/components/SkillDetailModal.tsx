import React, { useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../data/translations';
import { X, Code2, CheckCircle2 } from 'lucide-react';

interface SkillDetailModalProps {
  skillName: string | null;
  lang: Language;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skillName,
  lang,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skillName) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skillName, onClose]);

  if (!skillName) return null;

  // Find skill in categories
  let foundSkill: { name: string; description: string; descriptionFa: string; focus: string; focusFa: string } | null = null;
  let categoryName = '';
  let categoryNameFa = '';

  for (const cat of SKILL_CATEGORIES) {
    const match = cat.skills.find(
      (s) => s.name.toLowerCase() === skillName.toLowerCase() || skillName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (match) {
      foundSkill = match;
      categoryName = cat.name;
      categoryNameFa = cat.nameFa;
      break;
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
            <Code2 size={24} />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#D58BFF] uppercase tracking-wider block">
              {lang === 'fa' ? categoryNameFa || 'مهارت بک‌اند' : categoryName || 'Backend Proficiency'}
            </span>
            <h3 id="skill-modal-title" className="text-2xl font-bold text-white font-['Outfit']">
              {skillName}
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#BDA9C9] leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/25">
            <span className="text-xs font-mono text-[#FF85C0] font-bold block mb-1">
              {lang === 'fa' ? 'حوزه و تمرکز مهندسی' : 'Engineering Focus'}
            </span>
            <p className="text-white font-medium">
              {foundSkill
                ? lang === 'fa'
                  ? foundSkill.focusFa
                  : foundSkill.focus
                : 'Production Backend Engineering'}
            </p>
          </div>

          <p>
            {foundSkill
              ? lang === 'fa'
                ? foundSkill.descriptionFa
                : foundSkill.description
              : `${skillName} is a core component of scalable Python backend workflows.`}
          </p>

          <div className="pt-2 border-t border-[#F12D91]/15 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#D58BFF]">
              <CheckCircle2 size={14} className="text-green-400 shrink-0" />
              <span>{lang === 'fa' ? 'تسلط بر پیاده‌سازی و یکپارچه‌سازی در پروژه‌های پروداکشن' : 'Production-ready integration & best practices'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#D58BFF]">
              <CheckCircle2 size={14} className="text-green-400 shrink-0" />
              <span>{lang === 'fa' ? 'رعایت استانداردها و اصول امنیتی' : 'Security, maintainability & testing'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#F12D91]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44]"
          >
            {lang === 'fa' ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
