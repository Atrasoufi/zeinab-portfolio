import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { AmbientCinematicBackground } from './AmbientCinematicBackground';
import { GraduationCap, BookOpen, Award, CheckCircle2 } from 'lucide-react';

interface EducationSectionProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="education" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-9 relative overflow-hidden">
          {/* Ambient Cinematic Looping Background Layer */}
          <AmbientCinematicBackground />

          <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F12D91]/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0] shadow-[0_0_15px_rgba(241,45,145,0.25)]">
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-['Outfit'] text-white">
                  {t.education.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#BDA9C9] mt-0.5">
                  {t.education.subtitle}
                </p>
              </div>
            </div>

            <div className="px-4 py-1.5 rounded-full bg-[#160D20] border border-[#B84DFF]/40 text-xs font-mono text-[#D58BFF] self-start sm:self-center">
              {lang === 'fa' ? EDUCATION_DATA.periodFa : EDUCATION_DATA.period}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Degree & Institution (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl bg-[#160D20] border border-[#F12D91]/30 shadow-[0_0_20px_rgba(241,45,145,0.1)]">
                <span className="text-[11px] font-mono text-[#FF85C0] uppercase tracking-wider block mb-1">
                  {t.education.degree}
                </span>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  {lang === 'fa' ? EDUCATION_DATA.degreeFa : EDUCATION_DATA.degree}
                </h3>
                <div className="mt-2 text-sm text-[#D58BFF]">
                  {lang === 'fa' ? EDUCATION_DATA.institutionFa : EDUCATION_DATA.institution}
                </div>
                <div className="mt-4 pt-3 border-t border-[#F12D91]/15 flex items-center justify-between text-xs text-[#BDA9C9]">
                  <span>{lang === 'fa' ? 'گرایش: مهندسی نرم‌افزار' : 'Specialization: Software Engineering'}</span>
                  <span className="text-green-400 font-mono">Completed</span>
                </div>
              </div>

              {/* Verified Foundations Card */}
              <div className="p-5 rounded-2xl bg-[#100817] border border-[#B84DFF]/25 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <BookOpen size={16} className="text-[#FF85C0]" />
                  <span>{t.education.foundationsTitle}</span>
                </div>
                <div className="space-y-2">
                  {EDUCATION_DATA.foundations.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#BDA9C9]">
                      <CheckCircle2 size={14} className="text-[#FF85C0] shrink-0" />
                      <span>{lang === 'fa' ? item.titleFa : item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continuous Specializations & Applied Knowledge (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                  <Award size={18} className="text-[#D58BFF]" />
                  <span>{t.education.continuousTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EDUCATION_DATA.continuousLearning.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/20 hover:border-[#FF85C0] hover:bg-[#221332] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#2D143D] border border-[#F12D91]/30 flex items-center justify-center text-xs font-mono font-bold text-[#FF85C0] mb-2">
                        0{idx + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {lang === 'fa' ? item.nameFa : item.name}
                      </h4>
                      <p className="text-[11px] text-[#8E79A5] mt-1 font-mono">
                        {lang === 'fa' ? 'تخصص فنی و معماری نرم‌افزار' : 'Applied engineering practice'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Rigor Notice */}
              <div className="p-4 rounded-xl bg-[#12081B] border border-[#B84DFF]/20 text-xs text-[#BDA9C9] flex items-center justify-between">
                <span>
                  {lang === 'fa'
                    ? 'پایه‌های آکادمیک قدرتمند در کنار تجربه عملی در ساخت سیستم‌های بک‌اند پایتون و جنگو'
                    : 'Solid academic foundation combined with hands-on Python & Django backend engineering'}
                </span>
                <span className="text-[#FF85C0] font-mono font-semibold ml-2">B.S. Eng</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
