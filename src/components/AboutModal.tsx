import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, User, Terminal, Shield, Cpu, ArrowRight } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onScrollToContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  lang,
  onClose,
  onScrollToContact,
}) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
            <User size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 id="about-modal-title" className="text-2xl font-bold font-['Outfit'] text-white">
              {t.bento1.aboutMe}
            </h2>
            <p className="text-xs font-mono text-[#D58BFF]">
              {lang === 'fa' ? PERSONAL_INFO.roleFa : PERSONAL_INFO.role}
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-xs sm:text-sm text-[#BDA9C9] leading-relaxed">
          <p>
            {lang === 'fa'
              ? 'من زینب صوفی نیستانی هستم؛ توسعه‌دهنده بک‌اند متمرکز بر پایتون و جنگو. با پس‌زمینه تحصیلی در رشته مهندسی کامپیوتر، علاقه شدیدی به معماری نرم‌افزار، حل مسائل پیچیده الگوریتمی و بهینه‌سازی سیستم‌های توزیع‌شده دارم.'
              : "I am Zeinab Soufi Neyestani, a dedicated Python & Django Backend Developer. With a strong computer engineering academic foundation, I am deeply passionate about software architecture, algorithmic problem solving, and optimizing scalable distributed systems."}
          </p>

          <p>
            {lang === 'fa'
              ? 'در فرآیند توسعه، پایبندی به اصول کدنویسی تمیز (Clean Code)، تست‌پذیری، طراحی امن دیتابیس‌های رابطه‌ای و سرعت پاسخ‌دهی بالای وب‌سرویس‌ها اولویت اصلی من است.'
              : 'Throughout my engineering practice, I prioritize clean architectural patterns, test-driven reliability, secure relational database design, and sub-millisecond API response efficiency.'}
          </p>
        </div>

        {/* Engineering Pillars */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
            <Terminal size={18} aria-hidden="true" className="text-[#FF85C0]" />
            <h4 className="text-xs font-bold text-white">
              {lang === 'fa' ? 'کد تمیز و ساختاریافته' : 'Clean & Idiomatic'}
            </h4>
            <p className="text-[11px] text-[#BDA9C9]">
              {lang === 'fa' ? 'رعایت PEP 8 و معماری ماژولار' : 'Strict PEP 8 & modular Django apps'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#160D20] border border-[#B84DFF]/25 space-y-1">
            <Cpu size={18} aria-hidden="true" className="text-[#D58BFF]" />
            <h4 className="text-xs font-bold text-white">
              {lang === 'fa' ? 'بهینه‌سازی کوئری‌ها' : 'Query Optimization'}
            </h4>
            <p className="text-[11px] text-[#BDA9C9]">
              {lang === 'fa' ? 'حذف N+1 و ایندکس‌گذاری دقیق' : 'Zero N+1 & tuned SQL indexing'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
            <Shield size={18} aria-hidden="true" className="text-[#FF85C0]" />
            <h4 className="text-xs font-bold text-white">
              {lang === 'fa' ? 'امنیت و پایداری' : 'Security by Design'}
            </h4>
            <p className="text-[11px] text-[#BDA9C9]">
              {lang === 'fa' ? 'احراز هویت امن JWT و مجوزها' : 'JWT auth, sanitization & CORS'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#F12D91]/20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onScrollToContact();
            }}
            className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          >
            <span>{lang === 'fa' ? 'ارسال پیام به من' : 'Send a Message'}</span>
            <ArrowRight size={14} aria-hidden="true" className="rtl:rotate-180" />
          </button>

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
