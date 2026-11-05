import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, BookOpen, Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, lang, onClose }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const t = TRANSLATIONS[lang];

  const handleDismiss = () => {
    if (activeArticle) {
      setActiveArticle(null);
    } else {
      onClose();
    }
  };

  const containerRef = useFocusTrap(isOpen, handleDismiss);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)] focus:outline-none"
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

        {activeArticle ? (
          /* Single Article Reader View */
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF85C0] hover:text-white transition-colors p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
              aria-label={t.modals.backToArticles}
            >
              {lang === 'fa' ? <ArrowRight size={14} aria-hidden="true" /> : <ArrowLeft size={14} aria-hidden="true" />}
              <span>{t.modals.backToArticles}</span>
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1A0E26] text-[11px] font-mono text-[#D58BFF] border border-[#B84DFF]/30">
                  {activeArticle.category}
                </span>
                <span className="text-[11px] font-mono text-[#BDA9C9] flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {lang === 'fa' ? activeArticle.readTimeFa : activeArticle.readTime}
                </span>
              </div>

              <h2 id="blog-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                {lang === 'fa' ? activeArticle.titleFa : activeArticle.title}
              </h2>
            </div>

            <div className="pt-4 border-t border-[#F12D91]/20 space-y-4 text-xs sm:text-sm text-[#BDA9C9] leading-relaxed">
              {(lang === 'fa' ? activeArticle.contentFa : activeArticle.content).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F12D91]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#160D20] text-xs font-mono text-[#FF85C0] hover:bg-[#221332] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
              >
                {t.modals.backToArticles}
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
        ) : (
          /* Articles List */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
                <BookOpen size={24} aria-hidden="true" />
              </div>
              <div>
                <h2 id="blog-modal-title" className="text-2xl font-bold font-['Outfit'] text-white">
                  {t.modals.blogTitle}
                </h2>
                <p className="text-xs text-[#BDA9C9]">
                  {lang === 'fa' ? 'مقالات فنی و تجربیات عملی در جنگو و سیستم‌های توزیع‌شده' : 'Technical notes on Django, ORM performance & WebSockets'}
                </p>
              </div>
            </div>

            <div className="space-y-4" role="feed" aria-label={t.modals.blogTitle}>
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveArticle(post)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveArticle(post);
                    }
                  }}
                  aria-label={`${lang === 'fa' ? 'مطالعه مقاله: ' : 'Read article: '} ${lang === 'fa' ? post.titleFa : post.title}`}
                  className="p-5 rounded-2xl bg-[#160D20] border border-[#F12D91]/25 hover:border-[#FF85C0] hover:bg-[#221332] transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#BDA9C9] mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#100817] text-[#D58BFF] border border-[#B84DFF]/25">
                      {post.category}
                    </span>
                    <span>{lang === 'fa' ? post.readTimeFa : post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#FF85C0] transition-colors font-['Outfit']">
                    {lang === 'fa' ? post.titleFa : post.title}
                  </h3>

                  <p className="text-xs text-[#BDA9C9] mt-2 line-clamp-2 leading-relaxed">
                    {lang === 'fa' ? post.summaryFa : post.summary}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-[#FF85C0]">
                    <span>{t.modals.readArticle}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F12D91]/20 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
              >
                {t.modals.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
