import React, { useState, useEffect } from 'react';
import { Sparkles, Film, Play, Pause, RefreshCw, Wand2 } from 'lucide-react';
import { Language } from '../data/translations';

interface CinematicHeroCharacterProps {
  lang: Language;
  onOpenVideoStudio: (initialMode?: 'image' | 'text') => void;
  generatedVideoUrl?: string | null;
}

export const CinematicHeroCharacter: React.FC<CinematicHeroCharacterProps> = ({
  lang,
  onOpenVideoStudio,
  generatedVideoUrl,
}) => {
  const [isCinematicActive, setIsCinematicActive] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isRtl = lang === 'fa';

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex flex-col items-center justify-center select-none group">
      {/* Ambient Backlight Glow (Subtle Breathing Cycle) */}
      <div
        className={`absolute -inset-6 rounded-full bg-gradient-to-tr from-[#F12D91]/35 via-[#B84DFF]/25 to-transparent blur-3xl transform pointer-events-none transition-opacity duration-1000 ${
          isCinematicActive && !prefersReducedMotion ? 'opacity-100 animate-pulse' : 'opacity-60'
        }`}
        style={{ animationDuration: '4s' }}
        aria-hidden="true"
      />

      {/* Floating Neon Butterfly 1: Top-Right perched / hovering */}
      <div
        className={`absolute -top-4 right-2 sm:right-4 z-20 pointer-events-none select-none transition-transform duration-700 ${
          isCinematicActive && !prefersReducedMotion ? 'animate-float' : ''
        }`}
        style={{ animationDuration: '6s' }}
        aria-hidden="true"
      >
        <img
          src="/public/assets/portfolio/card_butterfly_trans.png"
          alt=""
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_0_15px_#F12D91] opacity-90"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Floating Neon Butterfly 2: Soft lower-left orbital flutter */}
      {isCinematicActive && !prefersReducedMotion && (
        <div
          className="absolute -bottom-2 -left-4 z-20 pointer-events-none select-none animate-float hidden sm:block"
          style={{ animationDuration: '8s', animationDelay: '2s' }}
          aria-hidden="true"
        >
          <img
            src="/public/assets/portfolio/hero_butterfly_trans.png"
            alt=""
            className="w-14 h-14 object-contain filter drop-shadow-[0_0_12px_#B84DFF] opacity-80"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
      )}

      {/* Atmospheric Ambient Particle Sparkles */}
      {isCinematicActive && !prefersReducedMotion && (
        <>
          <span
            className="absolute top-1/4 -left-2 w-1.5 h-1.5 rounded-full bg-[#FF85C0] shadow-[0_0_8px_#FF85C0] animate-ping pointer-events-none"
            style={{ animationDuration: '3s', animationDelay: '0.5s' }}
            aria-hidden="true"
          />
          <span
            className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-[#B84DFF] shadow-[0_0_8px_#B84DFF] animate-ping pointer-events-none"
            style={{ animationDuration: '4s', animationDelay: '1.5s' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Character Visual Container */}
      <div className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center">
        {generatedVideoUrl ? (
          /* Render Generated AI Video Loop if available */
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-[#F12D91]/40 shadow-[0_0_35px_rgba(241,45,145,0.4)]">
            <video
              src={generatedVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B080F]/80 via-transparent to-transparent" />
          </div>
        ) : (
          /* Cinematic Layered Hero Artwork */
          <div className="relative w-full flex items-center justify-center">
            {/* Base Master Illustration */}
            <img
              src="/public/assets/portfolio/hero_girl_clean.png"
              alt="Zeinab Soufi - Backend Developer Illustration"
              className={`w-full h-auto object-contain filter drop-shadow-[0_0_30px_rgba(241,45,145,0.45)] transition-all duration-700 ${
                isCinematicActive && !prefersReducedMotion
                  ? 'hover:scale-[1.03] scale-[1.01]'
                  : 'scale-100'
              }`}
              style={{
                maskImage:
                  'radial-gradient(ellipse 92% 90% at 52% 48%, black 68%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 92% 90% at 52% 48%, black 68%, transparent 100%)',
              }}
            />

            {/* Cinematic Lighting & Subtle Natural Hair/Glow Overlay */}
            {isCinematicActive && !prefersReducedMotion && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 transition-opacity duration-1000"
                style={{
                  background:
                    'radial-gradient(circle at 75% 35%, rgba(241, 45, 145, 0.4) 0%, rgba(184, 77, 255, 0.2) 35%, transparent 70%)',
                  animation: 'heroGlowBreathe 5s ease-in-out infinite alternate',
                }}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>

      {/* Cinematic Experience Control Bar */}
      <div className="mt-4 flex items-center justify-center gap-2 z-20">
        {/* Toggle Cinematic Lighting & Movement */}
        <button
          type="button"
          onClick={() => setIsCinematicActive((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
            isCinematicActive
              ? 'bg-[#F12D91]/20 text-[#FF85C0] border-[#F12D91]/50 shadow-[0_0_12px_rgba(241,45,145,0.3)]'
              : 'bg-[#160D20] text-[#BDA9C9] border-[#BDA9C9]/30 hover:border-white'
          }`}
          aria-label={
            isRtl
              ? isCinematicActive
                ? 'غیرفعال‌سازی حالت انیمیشن کاراکتر'
                : 'فعال‌سازی حالت انیمیشن کاراکتر'
              : isCinematicActive
              ? 'Pause cinematic character effects'
              : 'Enable cinematic character effects'
          }
        >
          <Sparkles size={12} aria-hidden="true" className={isCinematicActive ? 'text-[#FF85C0]' : ''} />
          <span>
            {isRtl
              ? isCinematicActive
                ? 'سینماتیک پویا'
                : 'حالت ایستا'
              : isCinematicActive
              ? 'Cinematic Live'
              : 'Static View'}
          </span>
        </button>

        {/* Generate / Animate with AI Video Button */}
        <button
          type="button"
          onClick={() => onOpenVideoStudio('image')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#160D20] text-[#D58BFF] border border-[#B84DFF]/40 hover:border-[#FF85C0] hover:text-white transition-all shadow-[0_0_12px_rgba(184,77,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={isRtl ? 'متحرک‌سازی کاراکتر با هوش مصنوعی (ویدیو)' : 'Animate character with Gemini Omni video'}
        >
          <Film size={12} aria-hidden="true" />
          <span>{isRtl ? 'ویدیو هوش مصنوعی' : 'Animate to Video'}</span>
        </button>
      </div>
    </div>
  );
};
