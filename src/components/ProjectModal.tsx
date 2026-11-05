import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { X, ExternalLink, Github, Code, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pr-12 rtl:pr-0 rtl:pl-12 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F12D91]/20 text-[#FF85C0] border border-[#F12D91]/40">
              {lang === 'fa' ? project.statusFa : project.status}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#1A0E26] text-[#D58BFF] border border-[#B84DFF]/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            {lang === 'fa' ? project.titleFa : project.title}
          </h2>
          <p className="text-sm text-[#BDA9C9] mt-2 leading-relaxed">
            {lang === 'fa' ? project.shortDescFa : project.shortDesc}
          </p>
        </div>

        {/* Implementation Highlights */}
        <div className="space-y-6 pt-4 border-t border-[#F12D91]/20">
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-3 flex items-center gap-2">
              <Code size={18} className="text-[#FF85C0]" />
              <span>{t.modals.architectureBreakdown}</span>
            </h3>
            <div className="space-y-2">
              {(lang === 'fa' ? project.implementationDetailsFa : project.implementationDetails).map(
                (detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#BDA9C9]">
                    <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Technical Challenges Solved */}
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-400" />
              <span>{t.modals.challenges}</span>
            </h3>
            <div className="space-y-2">
              {(lang === 'fa' ? project.challengesFa : project.challenges).map((ch, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#BDA9C9]">
                  <span className="text-[#FF85C0] font-bold font-mono">0{idx + 1}.</span>
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REST Endpoints Table */}
          {project.endpoints && project.endpoints.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit'] mb-3">
                {t.modals.restEndpoints}
              </h3>
              <div className="rounded-xl border border-[#F12D91]/25 overflow-hidden bg-[#100817]">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-[#1A0E26] text-[#FF85C0] font-mono border-b border-[#F12D91]/25">
                    <tr>
                      <th className="p-3">Method</th>
                      <th className="p-3">Endpoint Path</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F12D91]/15 font-mono text-[#BDA9C9]">
                    {project.endpoints.map((ep, idx) => (
                      <tr key={idx} className="hover:bg-[#1A0E26]/50">
                        <td className="p-3 font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] ${
                              ep.method === 'GET'
                                ? 'bg-green-500/20 text-green-400'
                                : ep.method === 'POST'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-purple-500/20 text-purple-400'
                            }`}
                          >
                            {ep.method}
                          </span>
                        </td>
                        <td className="p-3 text-white font-semibold">{ep.path}</td>
                        <td className="p-3 text-xs font-sans">
                          {lang === 'fa' ? ep.descFa : ep.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#F12D91]/20 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Github size={16} />
              <span>{t.modals.viewOnGithub}</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44]"
            >
              {t.modals.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
