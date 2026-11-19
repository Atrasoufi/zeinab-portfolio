import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, Github, ExternalLink, GitBranch, Star, BookMarked } from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  const repositories = [
    {
      name: 'zeinab-portfolio',
      desc: 'Bilingual dark neon glassmorphism portfolio built with React, TypeScript, Vite, and Three.js.',
      descFa: 'پورتفولیوی شخصی دوزبانه با React، TypeScript، Vite و Three.js.',
      language: 'TypeScript / React',
      stars: 12,
      forks: 3,
    },
    {
      name: 'ecommerce-drf-api',
      desc: 'High-performance modular REST API built with Django REST Framework, PostgreSQL, and Celery.',
      descFa: 'وب‌سرویس فروشگاهی ماژولار با جنگو، پستگرس‌کیوال و صفوف سلری.',
      language: 'Python',
      stars: 28,
      forks: 7,
    },
    {
      name: 'django-channels-chat',
      desc: 'Asynchronous WebSockets real-time service leveraging Daphne ASGI and Redis.',
      descFa: 'سرویس ناهمگام وب‌سوکت با استفاده از سرور دافنه و ردیس.',
      language: 'Python',
      stars: 19,
      forks: 4,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="github-modal-title"
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

        {/* Profile Card */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
            <Github size={32} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="github-modal-title" className="text-2xl font-bold font-['Outfit'] text-white">
                Atrasoufi
              </h2>
              <span className="text-xs font-mono text-[#D58BFF] px-2 py-0.5 rounded bg-[#160D20] border border-[#B84DFF]/30">
                Verified
              </span>
            </div>
            <p className="text-xs text-[#BDA9C9] font-mono mt-0.5">
              github.com/Atrasoufi
            </p>
          </div>
        </div>

        {/* Visual Notice */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#160D20] border border-[#F12D91]/30 text-xs text-[#BDA9C9] flex items-center justify-between">
          <span>📊 {t.bento1.vizNotice}</span>
          <span className="text-[#FF85C0] font-mono font-bold">412 Contributions</span>
        </div>

        {/* Repositories */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-[#D58BFF] uppercase tracking-wider font-bold">
            {lang === 'fa' ? 'مخازن کلیدی' : 'Featured Repositories'}
          </h3>

          {repositories.map((repo) => (
            <div
              key={repo.name}
              className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/20 hover:border-[#FF85C0] transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono font-bold text-sm text-white">
                  <BookMarked size={16} aria-hidden="true" className="text-[#FF85C0]" />
                  <span>{repo.name}</span>
                </div>
                <span className="text-[11px] font-mono text-[#D58BFF] px-2 py-0.5 rounded bg-[#100817]">
                  {repo.language}
                </span>
              </div>

              <p className="text-xs text-[#BDA9C9] leading-relaxed">
                {lang === 'fa' ? repo.descFa : repo.desc}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-[#BDA9C9] pt-1">
                <span className="flex items-center gap-1">
                  <Star size={13} aria-hidden="true" className="text-yellow-400" />
                  <span>{repo.stars} stars</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch size={13} aria-hidden="true" className="text-[#FF85C0]" />
                  <span>{repo.forks} forks</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#F12D91]/20 flex items-center justify-between">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          >
            <Github size={15} aria-hidden="true" />
            <span>{lang === 'fa' ? 'مشاهده پروفایل در گیت‌هاب' : 'Open Profile on GitHub'}</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>

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
