import React, { useEffect, useRef, useState } from 'react';
import { Film, Sparkles } from 'lucide-react';
import { Language } from '../data/translations';

interface AmbientCinematicBackgroundProps {
  lang: Language;
  videoUrl?: string | null;
  onOpenVideoStudio?: (initialMode?: 'text' | 'image') => void;
}

export const AmbientCinematicBackground: React.FC<AmbientCinematicBackgroundProps> = ({
  lang,
  videoUrl,
  onOpenVideoStudio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || videoUrl || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle definition: soft pink & violet dust motes
    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15, // float gently upwards
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(255, 133, 192,' : 'rgba(184, 77, 255,',
      pulse: Math.random() * Math.PI * 2,
    }));

    // Data streams: subtle vertical digital flow lines
    const streamCount = Math.min(12, Math.floor(width / 110));
    const streams = Array.from({ length: streamCount }, (_, i) => ({
      x: (width / (streamCount + 1)) * (i + 1) + (Math.random() - 0.5) * 40,
      y: Math.random() * height,
      length: Math.random() * 90 + 40,
      speed: Math.random() * 0.8 + 0.4,
      width: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.25 + 0.1,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Data Streams
      for (const s of streams) {
        s.y += s.speed;
        if (s.y - s.length > height) {
          s.y = -s.length;
          s.x = Math.random() * width;
        }

        const grad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y);
        grad.addColorStop(0, 'rgba(241, 45, 145, 0)');
        grad.addColorStop(0.7, `rgba(184, 77, 255, ${s.opacity})`);
        grad.addColorStop(1, `rgba(255, 133, 192, ${s.opacity * 1.5})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.length);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Tip glowing head
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 1.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Soft Ambient Floating Particles
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.shadowColor = '#FF85C0';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoUrl, prefersReducedMotion]);

  const isRtl = lang === 'fa';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0" aria-hidden="true">
      {videoUrl ? (
        /* Video Background */
        <div className="relative w-full h-full">
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08040D]/80 via-[#0B0816]/70 to-[#08040D]/90" />
        </div>
      ) : (
        /* Procedural Canvas Background */
        <>
          {/* Deep Navy/Purple Base Gradient with Ambient Radial Nebulas */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#07040D] via-[#0D071A] to-[#0A0512]" />
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#B84DFF]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F12D91]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Active Canvas Animation */}
          {!prefersReducedMotion && (
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          )}
        </>
      )}

      {/* Subtle Control Pill (if video studio trigger available) */}
      {onOpenVideoStudio && (
        <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 pointer-events-auto">
          <button
            type="button"
            onClick={() => onOpenVideoStudio('text')}
            className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#160D20]/90 text-[#FF85C0] border border-[#F12D91]/30 hover:border-[#FF85C0] hover:bg-[#221332] transition-all shadow-[0_0_15px_rgba(241,45,145,0.2)] flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
            aria-label={isRtl ? 'تولید پس‌زمینه سینماتیک با هوش مصنوعی' : 'Generate cinematic background with Gemini video'}
          >
            <Film size={12} aria-hidden="true" />
            <span>{isRtl ? 'تولید ویدیو پس‌زمینه' : 'AI Background Video'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
