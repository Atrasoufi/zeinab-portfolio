import React from 'react';
import { Language } from '../data/translations';
import { SECTIONS } from '../hooks/useScrollProgress';

interface ScrollProgressBarProps {
  lang: Language;
  progress: number;
  activeSection: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  lang,
  progress,
  activeSection,
}) => {
  const isRtl = lang === 'fa';
  const activeSectionItem = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];
  const activeLabel = isRtl ? activeSectionItem.labelFa : activeSectionItem.labelEn;
  const roundedProgress = Math.round(progress);

  const handleSectionClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="sticky top-0 z-50 w-full h-8 bg-[#08040D]/95 backdrop-blur-md border-b border-[#F12D91]/25 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3 sm:gap-6 text-xs font-mono">
        {/* Active Section Name & Status indicator placed independently outside progressbar */}
        <button
          type="button"
          onClick={() => handleSectionClick(activeSection)}
          className="flex items-center gap-2 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] rounded-lg px-2 py-0.5 transition-colors cursor-pointer bg-[#140A1D]/80 border border-[#F12D91]/30 hover:border-[#FF85C0]"
          title={isRtl ? `پرش به ابتدای ${activeLabel}` : `Jump to start of ${activeLabel}`}
          aria-label={isRtl ? `بخش فعال: ${activeLabel}. کلیک برای پرش به این بخش` : `Active section: ${activeLabel}. Click to jump to this section`}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF85C0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]" />
          </span>
          <span className="text-[#BDA9C9] text-[10px] uppercase tracking-wider hidden sm:inline">
            {isRtl ? 'بخش فعلی:' : 'Section:'}
          </span>
          <span className="text-[#FF85C0] group-hover:text-white font-bold text-xs drop-shadow-[0_0_8px_rgba(255,133,192,0.4)] transition-colors">
            {activeLabel}
          </span>
        </button>

        {/* Progress Bar Track with proper progressbar ARIA semantics */}
        <div className="flex-1 flex items-center gap-3">
          <div
            role="progressbar"
            aria-valuenow={roundedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={
              isRtl
                ? `میزان پیمایش صفحه: ${roundedProgress}٪`
                : `Page scroll progress: ${roundedProgress}%`
            }
            className="flex-1 h-2 bg-[#160D20] border border-[#F12D91]/30 rounded-full overflow-hidden relative shadow-inner"
          >
            <div
              aria-hidden="true"
              className="h-full bg-gradient-to-r from-[#F12D91] via-[#FF85C0] to-[#B84DFF] shadow-[0_0_12px_rgba(241,45,145,0.95),0_0_20px_rgba(184,77,255,0.7)] transition-[width] duration-100 ease-out will-change-[width] rounded-full relative"
              style={{
                width: `${progress}%`,
                marginLeft: isRtl ? 'auto' : undefined,
                marginRight: isRtl ? undefined : 'auto',
              }}
            >
              {/* Subtle glowing head particle on leading edge */}
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 right-0 rtl:right-auto rtl:left-0 w-2 bg-white rounded-full shadow-[0_0_8px_#FFFFFF]"
              />
            </div>
          </div>

          {/* Numerical progress percentage next to the progress bar */}
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[11px] sm:text-xs font-bold text-[#D58BFF] min-w-[32px] text-right rtl:text-left"
          >
            {roundedProgress}%
          </span>
        </div>
      </div>
    </div>
  );
};
