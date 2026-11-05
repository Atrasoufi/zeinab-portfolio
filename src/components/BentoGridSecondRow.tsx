import React, { useState } from 'react';
import { FEATURED_PROJECTS, TECH_STACK_ITEMS, ProjectItem } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { ExternalLink, Calendar, Zap, Star, ArrowUpRight } from 'lucide-react';

interface BentoGridSecondRowProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

export const BentoGridSecondRow: React.FC<BentoGridSecondRowProps> = ({
  lang,
  onSelectProject,
}) => {
  const [selectedRange, setSelectedRange] = useState('Last year');
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);
  const t = TRANSLATIONS[lang];

  // 7 rows x 16 cols contribution heatmap matrix
  const heatmapData = [
    [1, 2, 0, 3, 4, 2, 1, 3, 2, 4, 1, 0, 2, 3, 4, 2],
    [2, 3, 1, 0, 2, 4, 3, 1, 0, 2, 3, 4, 1, 2, 0, 3],
    [0, 1, 4, 2, 3, 1, 2, 4, 3, 1, 0, 2, 4, 3, 1, 2],
    [3, 4, 2, 1, 0, 3, 4, 2, 1, 3, 2, 4, 1, 0, 2, 4],
    [1, 0, 3, 4, 2, 1, 0, 3, 4, 2, 1, 0, 3, 4, 2, 1],
    [4, 2, 1, 3, 2, 4, 1, 0, 2, 3, 4, 2, 1, 3, 2, 4],
    [2, 3, 4, 1, 0, 2, 3, 4, 1, 2, 3, 1, 0, 2, 3, 4],
  ];

  const getCellColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#1C1026] border-[#2A173A]';
      case 1:
        return 'bg-[#7E22CE]/60 border-[#9333EA]/70';
      case 2:
        return 'bg-[#A855F7] border-[#C084FC]';
      case 3:
        return 'bg-[#F12D91] border-[#FF85C0] shadow-[0_0_6px_rgba(241,45,145,0.4)]';
      case 4:
        return 'bg-[#FF85C0] border-[#FFFFFF] shadow-[0_0_10px_#FF85C0]';
      default:
        return 'bg-[#1C1026] border-[#2A173A]';
    }
  };

  const projectThumbnails = {
    'portfolio-website': '/public/assets/portfolio/project1_icon_trans.png',
    'ecommerce-api': '/public/assets/portfolio/project2_icon_trans.png',
    'chat-service': '/public/assets/portfolio/project3_icon_trans.png',
  };

  return (
    <section id="projects" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CARD 1: Featured Projects (6 cols on lg) */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-[#FF85C0] fill-[#FF85C0]/20" />
                  <h3 className="text-lg font-bold font-['Outfit'] text-white">
                    {t.bento2.featuredProjects}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProject(FEATURED_PROJECTS[0])}
                  aria-label="View all featured projects and details"
                  aria-haspopup="dialog"
                  className="text-xs font-mono text-[#D58BFF] hover:text-[#FF85C0] flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] rounded-md px-1"
                >
                  <span>{lang === 'fa' ? 'مشاهده پروژه‌ها' : 'View All Projects'}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              {/* 3 Project Sub-Cards Side by Side (matching master reference image) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FEATURED_PROJECTS.map((project) => {
                  const thumb = projectThumbnails[project.id as keyof typeof projectThumbnails];
                  const projectTitle = lang === 'fa' ? project.titleFa : project.title;
                  return (
                    <div
                      key={project.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectProject(project);
                        }
                      }}
                      aria-haspopup="dialog"
                      aria-label={`View architecture details and REST endpoints for ${projectTitle}`}
                      className="p-3.5 rounded-2xl bg-[#140C1D] border border-[#F12D91]/25 hover:border-[#FF85C0] hover:bg-[#1C1028] transition-all cursor-pointer group flex flex-col justify-between shadow-[0_0_15px_rgba(241,45,145,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
                    >
                      <div>
                        {/* Thumbnail Icon */}
                        <div className="w-full h-16 rounded-xl bg-gradient-to-b from-[#1C0F2B]/60 to-[#0B0612]/80 border border-[#F12D91]/25 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform" aria-hidden="true">
                          <img
                            src={thumb}
                            alt=""
                            className="max-h-12 max-w-[70px] object-contain drop-shadow-[0_0_15px_#F12D91]"
                            style={{ mixBlendMode: 'screen' }}
                          />
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF85C0] transition-colors font-['Outfit'] truncate">
                          {projectTitle}
                        </h4>
                        <p className="text-[11px] text-[#BDA9C9] mt-1 line-clamp-2 leading-relaxed">
                          {lang === 'fa' ? project.shortDescFa : project.shortDesc}
                        </p>
                      </div>

                      {/* Tags & External Icon */}
                      <div className="mt-3 pt-2.5 border-t border-[#F12D91]/15 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-[#100817] text-[9px] font-mono text-[#D58BFF] border border-[#B84DFF]/25"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ExternalLink size={13} aria-hidden="true" className="text-[#BDA9C9] group-hover:text-[#FF85C0] transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F12D91]/15 flex items-center justify-between text-[11px] text-[#BDA9C9]">
              <span>{lang === 'fa' ? 'برای مشاهده معماری و اندپوینت‌ها کلیک کنید' : 'Click to inspect endpoints & system architecture'}</span>
              <span className="text-[#FF85C0] font-mono">Django &amp; REST</span>
            </div>
          </div>

          {/* CARD 2: Tech Stack (3 cols on lg) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-[#FF85C0]" aria-hidden="true" />
                <h3 className="text-lg font-bold font-['Outfit'] text-white">
                  {t.bento2.techStack}
                </h3>
              </div>

              {/* 8 Icons in a 2x4 grid */}
              <div className="grid grid-cols-4 gap-2 pt-2" role="list" aria-label="Core Technical Stack">
                {TECH_STACK_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    role="listitem"
                    className="p-2.5 rounded-xl bg-[#140C1D] border border-[#F12D91]/25 hover:border-[#FF85C0] hover:bg-[#1E122C] transition-all flex flex-col items-center justify-center text-center group cursor-default shadow-[0_0_10px_rgba(241,45,145,0.05)]"
                    title={item.name}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}25`, color: item.color, border: `1px solid ${item.color}50` }}
                      aria-hidden="true"
                    >
                      {item.icon === 'django' ? 'dj' : item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-bold text-white group-hover:text-[#FF85C0] transition-colors mt-1 truncate max-w-full">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F12D91]/15 text-center text-[10px] font-mono text-[#BDA9C9]">
              {lang === 'fa' ? 'ابزارهای تخصصی پروداکشن' : 'Core Production Tooling'}
            </div>
          </div>

          {/* CARD 3: GitHub Contributions (3 cols on lg) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#FF85C0]" aria-hidden="true" />
                  <h3 className="text-sm font-bold font-['Outfit'] text-white">
                    {lang === 'fa' ? 'مشارکت‌های گیت‌هاب' : 'GitHub Contributions'}
                  </h3>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#160D20] text-[#FF85C0] border border-[#F12D91]/30">
                  {selectedRange}
                </span>
              </div>

              {/* Heatmap Grid */}
              <div
                role="region"
                aria-label="GitHub annual contribution activity matrix"
                className="p-3 rounded-2xl bg-[#0E0716] border border-[#F12D91]/20 overflow-x-auto"
              >
                <span className="sr-only">Annual GitHub contribution activity matrix showing consistent weekly commit frequency.</span>
                <div className="flex gap-2 min-w-[210px]" aria-hidden="true">
                  {/* Weekday labels */}
                  <div className="flex flex-col justify-between py-0.5 text-[9px] font-mono text-[#BDA9C9]">
                    <span>{t.bento2.mon}</span>
                    <span>{t.bento2.wed}</span>
                    <span>{t.bento2.fri}</span>
                  </div>

                  {/* 7x16 Matrix */}
                  <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1">
                    {heatmapData.map((row, rIdx) =>
                      row.map((level, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-2.5 h-2.5 rounded-xs border transition-all ${getCellColor(
                            level
                          )}`}
                          title={`Level ${level}`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Keep coding! 🌸 */}
            <div className="mt-4 pt-3 border-t border-[#F12D91]/15 text-center text-xs font-mono text-[#FF85C0] flex items-center justify-center gap-1.5 font-semibold">
              <span>{t.bento2.keepCoding}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
