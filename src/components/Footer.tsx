import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { Github, Linkedin, Mail, Send, BookOpen } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenDjangoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenDjangoModal }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="relative pt-12 pb-10 mt-12 overflow-hidden">
      {/* Decorative Neon Pink Divider Line matching reference image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F12D91]/60 to-transparent shadow-[0_0_8px_#F12D91]" />
          
          {/* Centered Small Neon Butterfly Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#08040D] flex items-center justify-center">
            <img
              src="/public/assets/portfolio/logo_butterfly_trans.png"
              alt="Butterfly Badge"
              className="w-6 h-6 object-contain drop-shadow-[0_0_10px_#F12D91]"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left rtl:md:text-right text-xs">
          {/* Left: Copyright */}
          <div className="text-[#8E79A5] font-mono flex items-center gap-1.5 justify-center md:justify-start">
            <span>© 2025 Zeinab Soufi. All rights reserved.</span>
            <span className="text-[#FF4DB8]">🤍</span>
          </div>

          {/* Center: Thank you message with Django inspector */}
          <div className="flex items-center gap-3">
            <span className="text-[#BDA9C9] flex items-center gap-1.5 font-medium">
              <span>Thank you for visiting my portfolio</span>
              <span className="text-[#FF4DB8]">🤍</span>
            </span>

            <button
              onClick={onOpenDjangoModal}
              className="px-2.5 py-1 rounded-lg bg-[#160D20] border border-[#B84DFF]/30 text-[#D58BFF] hover:border-[#FF85C0] hover:text-white text-[11px] font-mono transition-all flex items-center gap-1"
            >
              <BookOpen size={12} />
              <span>Django</span>
            </button>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] text-[#FF85C0] hover:text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)]"
              aria-label="GitHub Profile"
            >
              <Github size={15} />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] text-[#FF85C0] hover:text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>

            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] text-[#FF85C0] hover:text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)]"
              aria-label="Telegram"
            >
              <Send size={15} />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] text-[#FF85C0] hover:text-white transition-all shadow-[0_0_10px_rgba(241,45,145,0.15)]"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
