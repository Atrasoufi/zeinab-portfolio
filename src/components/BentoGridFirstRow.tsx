import React, { useState } from 'react';
import { NeonButterfly } from './NeonButterfly';
import { GITHUB_ACTIVITY_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { Github, Code2, User, Sparkles, ArrowUpRight } from 'lucide-react';

interface BentoGridFirstRowProps {
  lang: Language;
  onOpenGithubModal: () => void;
  onOpenAboutModal: () => void;
  onSelectSkill: (skillName: string) => void;
  onScrollToContact: () => void;
}

export const BentoGridFirstRow: React.FC<BentoGridFirstRowProps> = ({
  lang,
  onOpenGithubModal,
  onOpenAboutModal,
  onSelectSkill,
  onScrollToContact,
}) => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];

  // Flattened skills for the quick pills
  const featuredSkillPills = [
    'Python',
    'Django',
    'DRF',
    'PostgreSQL',
    'Docker',
    'Git',
    'Linux',
    'Celery',
  ];

  return (
    <section id="skills" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1: GitHub Activity */}
          <div
            onClick={onOpenGithubModal}
            className="glass-panel rounded-3xl p-6 relative flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-[#FF85C0]">
                  <div className="p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30">
                    <Github size={20} />
                  </div>
                  <h3 className="font-bold text-base font-['Outfit'] tracking-wide text-white">
                    {t.bento1.githubActivity}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#BDA9C9] group-hover:text-[#FF85C0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-extrabold font-['Outfit'] text-white flex items-baseline gap-2">
                  <span>{t.bento1.commitsTotal}</span>
                  <span className="text-xs font-normal text-[#D58BFF] font-sans">
                    {t.bento1.commitsLabel}
                  </span>
                </div>
                <p className="text-xs text-[#BDA9C9]">
                  {t.bento1.last30Days}
                </p>
              </div>
            </div>

            {/* Neon Pink Activity Bar Chart */}
            <div className="mt-6 pt-4 border-t border-[#F12D91]/20">
              <div className="flex items-end justify-between gap-1.5 h-16">
                {GITHUB_ACTIVITY_DATA.bars.map((val, index) => {
                  const heightPercent = Math.max(20, Math.min(100, (val / 25) * 100));
                  const isHovered = hoveredBarIndex === index;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredBarIndex(index)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      className="relative flex-1 h-full flex items-end group/bar"
                    >
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#FF85C0] shadow-[0_0_12px_#FF85C0]'
                            : 'bg-gradient-to-t from-[#B84DFF] to-[#F12D91]'
                        }`}
                      />
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#100817] border border-[#FF85C0] text-[10px] font-mono text-white whitespace-nowrap z-20 shadow-lg pointer-events-none">
                          {val} commits
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#8E79A5]">
                <span>30d ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* CARD 2: My Skills */}
          <div className="glass-panel rounded-3xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5 text-[#D58BFF]">
                  <div className="p-2 rounded-xl bg-[#221332] border border-[#B84DFF]/30">
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-bold text-base font-['Outfit'] tracking-wide text-white">
                    {t.bento1.mySkills}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#FF85C0]">10+ Technologies</span>
              </div>
              <p className="text-xs text-[#BDA9C9] mb-4">
                {t.bento1.skillsSubtitle}
              </p>
            </div>

            {/* Skill Pills matching the two rows in reference */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Django', 'DRF', 'PostgreSQL'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => onSelectSkill(skill)}
                    className="px-3 py-1.5 rounded-xl bg-[#1A0E26] border border-[#F12D91]/35 hover:border-[#FF85C0] hover:bg-[#F12D91]/20 text-xs font-semibold font-mono text-[#F8ECFA] transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(241,45,145,0.15)] focus:outline-none"
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Docker', 'Git', 'Linux', 'Celery'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => onSelectSkill(skill)}
                    className="px-3 py-1.5 rounded-xl bg-[#1A0E26] border border-[#B84DFF]/35 hover:border-[#D58BFF] hover:bg-[#B84DFF]/20 text-xs font-semibold font-mono text-[#F8ECFA] transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(184,77,255,0.15)] focus:outline-none"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F12D91]/15 flex items-center justify-between text-[11px] text-[#D58BFF]">
              <span>{lang === 'fa' ? 'برای مشاهده جزئیات کلیک کنید' : 'Click any skill to inspect'}</span>
              <span className="font-mono text-xs text-[#FF85C0]">8 stack items</span>
            </div>
          </div>

          {/* CARD 3: About Me */}
          <div
            id="about"
            className="glass-panel rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden group"
          >
            {/* Glowing Neon Butterfly from reference design (transparent with screen blend mode) */}
            <img
              src="/public/assets/portfolio/card_butterfly_trans.png"
              alt="Glowing Neon Butterfly"
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2 w-28 h-28 object-contain pointer-events-none drop-shadow-[0_0_20px_#F12D91] group-hover:scale-105 transition-transform opacity-95"
              style={{ mixBlendMode: 'screen' }}
            />

            <div>
              <div className="flex items-center gap-2.5 text-[#FF85C0] mb-4">
                <div className="p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30">
                  <User size={20} />
                </div>
                <h3 className="font-bold text-base font-['Outfit'] tracking-wide text-white">
                  {t.bento1.aboutMe}
                </h3>
              </div>

              <div className="space-y-1.5 pr-20 rtl:pr-0 rtl:pl-20 z-10 relative">
                <div className="text-sm font-bold text-white">
                  {t.bento1.aboutHeadline}
                </div>
                <p className="text-xs text-[#BDA9C9] leading-relaxed">
                  {t.bento1.aboutSub}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F12D91]/20 z-10 relative">
              <button
                onClick={onOpenAboutModal}
                className="w-full py-2.5 rounded-xl bg-[#221332] hover:bg-[#2F1A44] border border-[#F12D91]/40 text-[#FF85C0] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(241,45,145,0.2)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF85C0]"
              >
                <span>{t.bento1.learnMore}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* CARD 4: Collab Quote */}
          <div
            onClick={onScrollToContact}
            className="glass-panel rounded-3xl p-6 relative flex flex-col justify-between cursor-pointer group hover:-translate-y-1 bg-gradient-to-br from-[#160D20] via-[#200D2B] to-[#12081B]"
          >
            <div>
              <div className="flex items-center gap-2 text-yellow-300 mb-3">
                <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <Sparkles size={20} />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-yellow-300">
                  {lang === 'fa' ? 'فرصت‌های همکاری' : 'Collaboration'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#FF85C0] transition-colors leading-snug">
                {t.bento1.collabQuote}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F12D91]/20">
              <p className="text-xs text-[#BDA9C9]">
                {t.bento1.collabSub}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#FF85C0] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <span>{lang === 'fa' ? 'ارسال پیام و شروع گفتگو' : 'Get in touch'}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
