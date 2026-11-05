import React from 'react';
import { PERSONAL_INFO, EDUCATION_DATA } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, Printer, Mail, Github, MapPin, CheckCircle, GraduationCap, Briefcase } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, lang, onClose }) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-9 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="print:hidden absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Action Header */}
        <div className="print:hidden flex items-center justify-between pb-6 mb-6 border-b border-[#F12D91]/25">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF85C0]">
            <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
            <span>{t.modals.cvTitle}</span>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          >
            <Printer size={15} aria-hidden="true" />
            <span>{t.modals.printCv}</span>
          </button>
        </div>

        {/* CV Body */}
        <div className="space-y-6 text-[#F8ECFA]">
          {/* Header Info */}
          <div className="space-y-2 pb-6 border-b border-[#F12D91]/20">
            <h1 id="cv-modal-title" className="text-3xl font-extrabold text-white font-['Outfit']">
              {lang === 'fa' ? PERSONAL_INFO.nameFa : PERSONAL_INFO.name}
            </h1>
            <p className="text-base font-semibold text-[#FF85C0] font-mono">
              {lang === 'fa' ? PERSONAL_INFO.roleFa : PERSONAL_INFO.role}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#BDA9C9] pt-2">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#FF85C0]" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Github size={13} className="text-[#FF85C0]" />
                github.com/Atrasoufi
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#FF85C0]" />
                {lang === 'fa' ? PERSONAL_INFO.locationFa : PERSONAL_INFO.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono text-[#D58BFF] uppercase tracking-wider mb-2 font-bold">
              {lang === 'fa' ? 'خلاصه حرفه‌ای' : 'Professional Summary'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BDA9C9] leading-relaxed">
              {lang === 'fa' ? PERSONAL_INFO.bioFa : PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h3 className="text-xs font-mono text-[#D58BFF] uppercase tracking-wider mb-3 font-bold">
              {lang === 'fa' ? 'مهارت‌ها و فناوری‌های کلیدی' : 'Core Technical Competencies'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#160D20] border border-[#F12D91]/25">
                <span className="font-bold text-[#FF85C0] block mb-1">
                  {lang === 'fa' ? 'زبان‌ها و فریم‌ورک‌ها' : 'Backend & APIs'}
                </span>
                <span className="text-[#BDA9C9]">
                  Python, Django, Django REST Framework, Celery, ASGI / Channels
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#160D20] border border-[#F12D91]/25">
                <span className="font-bold text-[#FF85C0] block mb-1">
                  {lang === 'fa' ? 'پایگاه‌های داده و کش' : 'Databases & Caching'}
                </span>
                <span className="text-[#BDA9C9]">
                  PostgreSQL, SQL Query Optimization, Redis In-Memory Store
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#160D20] border border-[#F12D91]/25">
                <span className="font-bold text-[#FF85C0] block mb-1">
                  {lang === 'fa' ? 'دواپس و لینوکس' : 'DevOps & Tooling'}
                </span>
                <span className="text-[#BDA9C9]">
                  Docker, Docker Compose, Linux Server Admin, Git, GitHub Actions
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#160D20] border border-[#F12D91]/25">
                <span className="font-bold text-[#FF85C0] block mb-1">
                  {lang === 'fa' ? 'متدولوژی و معماری' : 'Architecture & Quality'}
                </span>
                <span className="text-[#BDA9C9]">
                  RESTful Design, JWT Auth, Modular MTV, Unit & Integration Testing
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono text-[#D58BFF] uppercase tracking-wider mb-3 font-bold flex items-center gap-1.5">
              <GraduationCap size={15} />
              <span>{lang === 'fa' ? 'سوابق تحصیلی' : 'Education'}</span>
            </h3>
            <div className="p-4 rounded-xl bg-[#160D20] border border-[#F12D91]/25 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'fa' ? EDUCATION_DATA.degreeFa : EDUCATION_DATA.degree}
                </h4>
                <p className="text-xs text-[#BDA9C9] mt-0.5">
                  {lang === 'fa' ? EDUCATION_DATA.institutionFa : EDUCATION_DATA.institution}
                </p>
              </div>
              <span className="text-xs font-mono text-[#FF85C0]">
                {lang === 'fa' ? EDUCATION_DATA.periodFa : EDUCATION_DATA.period}
              </span>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xs font-mono text-[#D58BFF] uppercase tracking-wider mb-2 font-bold">
              {lang === 'fa' ? 'زبان‌ها' : 'Languages'}
            </h3>
            <div className="flex gap-4 text-xs font-mono text-[#BDA9C9]">
              <span>Persian (Native)</span>
              <span>●</span>
              <span>English (Technical Proficiency)</span>
            </div>
          </div>
        </div>

        {/* Print Only Stylesheet note */}
        <div className="print:hidden mt-8 pt-4 border-t border-[#F12D91]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};
