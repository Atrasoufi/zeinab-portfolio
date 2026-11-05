import React, { useState } from 'react';
import { NeonButterfly } from './NeonButterfly';
import { PERSONAL_INFO, CORE_TECH_BADGES } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { ArrowRight, Sparkles, Copy, Check, Play, Terminal, ExternalLink, Heart } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExploreProjects: () => void;
  onOpenGithubModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreProjects,
  onOpenGithubModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [testingResponse, setTestingResponse] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const t = TRANSLATIONS[lang];

  const pythonSnippet = `from django.shortcuts import render
from rest_framework.views import APIView

class Developer(APIView):
    def get(self, request):
        return Response({
            "message": "Dream Big 💜",
            "status": "Online"
        })`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleTestResponse = () => {
    setTestingResponse(true);
    setTimeout(() => {
      setTestingResponse(false);
      setShowResponse(true);
    }, 550);
  };

  return (
    <section id="hero" className="relative pt-6 pb-14 lg:py-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="cosmic-glow-top" />
      <div className="cosmic-glow-hero" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Status, Name, Bio, CTAs (4.5 cols) */}
          <div className="lg:col-span-5 space-y-6 z-10 text-center lg:text-left rtl:lg:text-right">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160D20] border border-[#F12D91]/40 shadow-[0_0_15px_rgba(241,45,145,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]" />
              <span className="text-xs font-semibold text-[#FF85C0] tracking-wide">
                {t.hero.statusBadge}
              </span>
            </div>

            {/* Large Gradient Heading with Star Sparkle */}
            <div className="space-y-2 relative">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight font-['Outfit'] flex items-center justify-center lg:justify-start rtl:lg:justify-start gap-2">
                <span className="neon-text-gradient drop-shadow-[0_0_30px_rgba(241,45,145,0.5)]">
                  {lang === 'fa' ? PERSONAL_INFO.nameFa : PERSONAL_INFO.name}
                </span>
                <span className="text-pink-300 text-2xl animate-pulse">✦</span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-[#D58BFF] flex items-center justify-center lg:justify-start rtl:lg:justify-start gap-2">
                <span>{lang === 'fa' ? PERSONAL_INFO.taglineFa : PERSONAL_INFO.tagline}</span>
                <span className="text-[#FF4DB8]">🤍</span>
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-[#BDA9C9] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              {lang === 'fa' ? PERSONAL_INFO.bioFa : PERSONAL_INFO.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start rtl:lg:justify-start gap-4 pt-1">
              <button
                onClick={onOpenGithubModal}
                className="neon-glow-btn px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
              >
                <span>{t.hero.viewGithub}</span>
                <ArrowRight size={16} className="text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreProjects}
                className="px-5 py-3 rounded-full bg-[#160D20] border border-[#F12D91]/40 hover:border-[#F12D91] text-[#F8ECFA] hover:text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(241,45,145,0.15)] flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F12D91]"
              >
                <span>{t.hero.exploreProjects}</span>
                <Sparkles size={16} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="pt-3 border-t border-[#F12D91]/15 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#BDA9C9]/80 block">
                {t.hero.coreStack}
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start rtl:lg:justify-start gap-2">
                {CORE_TECH_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#160D20] border border-[#B84DFF]/30 text-[#D58BFF] hover:border-[#FF85C0] hover:text-white transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flying Neon Butterfly between Hero Left and Terminal (in the ambient space, not overlapping code) */}
          <div className="hidden lg:block absolute left-[38%] top-16 z-0 pointer-events-none animate-float select-none">
            <img
              src="/public/assets/portfolio/hero_butterfly_trans.png"
              alt=""
              className="w-24 h-24 object-contain filter drop-shadow-[0_0_20px_#F12D91] opacity-90"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>

          {/* CENTER COLUMN: Floating Code Terminal (developer.py) (4 cols) */}
          <div className="lg:col-span-4 z-10 relative">
            {/* Terminal Window */}
            <div className="code-window rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] transition-all border border-[#B84DFF]/40">
              {/* Window Title Bar */}
              <div className="px-4 py-2.5 bg-[#160D20] border-b border-[#B84DFF]/25 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                  <span className="text-xs font-mono text-[#D58BFF] ml-2 flex items-center gap-1.5">
                    <Terminal size={13} />
                    {t.hero.editorFile}
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#221332] hover:bg-[#2F1A44] border border-[#F12D91]/30 text-xs font-mono text-[#FF85C0] transition-colors focus:outline-none"
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span className="text-green-400 text-[11px]">{t.hero.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="text-[11px]">{t.hero.copyCode}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Exact Syntax Highlighted Code matching reference image */}
              <div dir="ltr" className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-left select-text bg-[#0E0816]/95">
                <div className="flex items-start gap-3">
                  {/* Line numbers */}
                  <div className="text-[#6B5B7B] select-none text-right font-mono pr-2 border-r border-[#3A1E4D]">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                  </div>

                  {/* Code */}
                  <div className="text-[#F8ECFA]">
                    <div>
                      <span className="text-[#FF85C0]">from</span> django.shortcuts <span className="text-[#FF85C0]">import</span> render
                    </div>
                    <div>
                      <span className="text-[#FF85C0]">from</span> rest_framework.views <span className="text-[#FF85C0]">import</span> APIView
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-[#B84DFF]">class</span> <span className="text-[#00FFCC] font-semibold">Developer</span>(APIView):
                    </div>
                    <div className="pl-4">
                      <span className="text-[#B84DFF]">def</span> <span className="text-[#FFD166]">get</span>(self, request):
                    </div>
                    <div className="pl-8">
                      <span className="text-[#FF85C0]">return</span> Response(&#123;
                    </div>
                    <div className="pl-12 text-[#FFD166]">
                      &quot;message&quot;: <span className="text-[#00FFCC]">&quot;Dream Big 💜&quot;</span>,
                    </div>
                    <div className="pl-12 text-[#FFD166]">
                      &quot;status&quot;: <span className="text-[#00FFCC]">&quot;Online&quot;</span>
                    </div>
                    <div className="pl-8">&#125;)</div>
                  </div>
                </div>
              </div>

              {/* Action Runner Bar */}
              <div className="px-4 py-2 bg-[#120A1A] border-t border-[#B84DFF]/25 flex items-center justify-between">
                <button
                  onClick={handleTestResponse}
                  disabled={testingResponse}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F12D91]/20 hover:bg-[#F12D91]/35 border border-[#F12D91]/40 text-[#FF85C0] text-xs font-mono transition-all disabled:opacity-50"
                >
                  <Play size={11} className={testingResponse ? 'animate-spin' : ''} />
                  <span>{testingResponse ? t.hero.running : t.hero.runTest}</span>
                </button>
                <span className="text-[11px] font-mono text-green-400">● 200 OK</span>
              </div>

              {/* Response Drawer */}
              {showResponse && (
                <div dir="ltr" className="p-3 bg-[#09050E] border-t border-green-500/30 text-[11px] font-mono text-left animate-in fade-in">
                  <div className="text-green-400 font-semibold mb-1 flex items-center justify-between">
                    <span>{t.hero.responsePreview}</span>
                    <button onClick={() => setShowResponse(false)} className="text-gray-400 hover:text-white">✕</button>
                  </div>
                  <pre className="text-[#D58BFF] whitespace-pre-wrap">
{`{
  "message": "Dream Big 💜",
  "status": "Online",
  "framework": "Django REST Framework 3.15",
  "response_time": "8ms"
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Illustrated Developer with Glowing Headphones (Integrated Ambient Artwork) */}
          <div className="lg:col-span-3 z-10 flex flex-col items-center justify-center relative">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#F12D91]/35 via-[#B84DFF]/25 to-transparent blur-3xl transform pointer-events-none" />

            {/* Floating Neon Butterfly hovering near character */}
            <div className="absolute -top-3 right-4 sm:right-6 z-20 pointer-events-none animate-float select-none">
              <img
                src="/public/assets/portfolio/card_butterfly_trans.png"
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_0_15px_#F12D91] opacity-90"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>

            {/* Seamless Character Illustration matching master reference */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex items-center justify-center select-none group">
              <img
                src="/public/assets/portfolio/hero_girl_clean.png"
                alt="Zeinab Soufi - Backend Developer Illustration"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_30px_rgba(241,45,145,0.45)] transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 92% 90% at 52% 48%, black 68%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 92% 90% at 52% 48%, black 68%, transparent 100%)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
