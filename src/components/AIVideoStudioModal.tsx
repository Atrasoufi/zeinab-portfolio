import React, { useState, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { TRANSLATIONS, Language } from '../data/translations';
import {
  X,
  Film,
  Upload,
  Play,
  Download,
  Sparkles,
  Check,
  AlertCircle,
  Loader2,
  Video,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface AIVideoStudioModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  initialMode?: 'image' | 'text';
  onApplyToHero?: (videoUrl: string) => void;
  onApplyToBackground?: (videoUrl: string) => void;
}

export const AIVideoStudioModal: React.FC<AIVideoStudioModalProps> = ({
  isOpen,
  lang,
  onClose,
  initialMode = 'image',
  onApplyToHero,
  onApplyToBackground,
}) => {
  const [mode, setMode] = useState<'image' | 'text'>(initialMode);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState(
    'Cinematic subtle ambient loop of this illustrated anime-styled developer girl with glowing headphones, gentle hair movement, soft ambient neon pink lighting, softly drifting ethereal butterflies in the dark background, seamless loop'
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    '/public/assets/portfolio/hero_girl_clean.png'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useFocusTrap(isOpen, onClose);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  if (!isOpen) return null;

  const handleModeChange = (newMode: 'image' | 'text') => {
    setMode(newMode);
    setError(null);
    if (newMode === 'text') {
      setPrompt(
        'Cinematic dark navy and deep purple atmosphere with soft pink and violet floating particles, subtle flowing digital data streams, elegant lighting, looping'
      );
    } else {
      setPrompt(
        'Cinematic subtle ambient loop of this illustrated anime-styled developer girl with glowing headphones, gentle hair movement, soft ambient neon pink lighting, softly drifting ethereal butterflies in the dark background, seamless loop'
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError(isRtl ? 'حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.' : 'Image size must be less than 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationProgress(
      isRtl
        ? 'در حال ارسال درخواست به Gemini Omni Flash Interactions API...'
        : 'Connecting to Gemini Omni Flash Interactions API...'
    );

    try {
      let imageBase64Payload: string | undefined = undefined;

      if (mode === 'image' && selectedImage) {
        if (selectedImage.startsWith('data:')) {
          imageBase64Payload = selectedImage;
        } else {
          // Fetch local asset to get base64
          const res = await fetch(selectedImage);
          const blob = await res.blob();
          const reader = new FileReader();
          await new Promise((resolve) => {
            reader.onloadend = () => {
              imageBase64Payload = reader.result as string;
              resolve(null);
            };
            reader.readAsDataURL(blob);
          });
        }
      }

      setGenerationProgress(
        isRtl
          ? 'مدل در حال تولید فریم‌های سینماتیک ویدیو (۱۰ ثانیه)...'
          : 'Generating cinematic video frames with Omni model...'
      );

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          prompt,
          imageBase64: imageBase64Payload,
          aspectRatio,
          duration: '10s',
          model: 'gemini-omni-1.1-flash',
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate video.');
      }

      if (data.videoData) {
        setGeneratedVideo(data.videoData);
      } else {
        throw new Error('No video data returned from generation endpoint.');
      }
    } catch (err: any) {
      console.error('Video generation error:', err);
      setError(
        err.message ||
          (isRtl
            ? 'خطا در تولید ویدیو. لطفاً اتصال اینترنت یا کلید API را بررسی نمایید.'
            : 'Error generating video. Please check your API key configuration or try again.')
      );
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  const handleApplyHero = () => {
    if (generatedVideo && onApplyToHero) {
      onApplyToHero(generatedVideo);
      setAppliedNotice(isRtl ? 'ویدیو روی کاراکتر Hero اعمال شد!' : 'Applied video to Hero character!');
      setTimeout(() => setAppliedNotice(null), 3000);
    }
  };

  const handleApplyBackground = () => {
    if (generatedVideo && onApplyToBackground) {
      onApplyToBackground(generatedVideo);
      setAppliedNotice(isRtl ? 'ویدیو روی پس‌زمینه سایت اعمال شد!' : 'Applied video to background!');
      setTimeout(() => setAppliedNotice(null), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-studio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_60px_rgba(241,45,145,0.35)] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#221332] border border-[#F12D91]/40 text-[#FF85C0]">
            <Film size={26} aria-hidden="true" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#D58BFF] uppercase tracking-wider block">
              Gemini Omni Flash · Interactions API
            </span>
            <h2 id="video-studio-title" className="text-2xl font-bold font-['Outfit'] text-white">
              {isRtl ? 'استودیوی تولید ویدیو و انیمیشن هوش مصنوعی' : 'AI Cinematic Video Studio'}
            </h2>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div role="tablist" aria-label="Video Generation Modes" className="flex items-center gap-2 mb-6 border-b border-[#F12D91]/20 pb-3">
          <button
            type="button"
            role="tab"
            id="tab-image-video"
            aria-selected={mode === 'image'}
            aria-controls="panel-image-video"
            onClick={() => handleModeChange('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
              mode === 'image'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50 shadow-[0_0_15px_rgba(241,45,145,0.25)] font-bold'
                : 'text-[#BDA9C9] hover:text-white bg-[#160D20] border border-transparent'
            }`}
          >
            <ImageIcon size={14} aria-hidden="true" />
            <span>{isRtl ? 'انیمیشن تصویر به ویدیو (Image-to-Video)' : 'Animate Image (Image-to-Video)'}</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-text-video"
            aria-selected={mode === 'text'}
            aria-controls="panel-text-video"
            onClick={() => handleModeChange('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
              mode === 'text'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50 shadow-[0_0_15px_rgba(241,45,145,0.25)] font-bold'
                : 'text-[#BDA9C9] hover:text-white bg-[#160D20] border border-transparent'
            }`}
          >
            <Video size={14} aria-hidden="true" />
            <span>{isRtl ? 'تولید متن به ویدیو (Text-to-Video)' : 'Generate Video (Text-to-Video)'}</span>
          </button>
        </div>

        {/* Content Configuration */}
        <div className="space-y-5">
          {mode === 'image' && (
            <div className="space-y-3">
              <label className="text-xs font-mono text-[#D58BFF] block font-semibold">
                {isRtl ? 'انتخاب تصویر مرجع:' : 'Select Reference Image:'}
              </label>

              <div className="flex flex-wrap items-center gap-4">
                {/* Hero Character Option */}
                <button
                  type="button"
                  onClick={() => setSelectedImage('/public/assets/portfolio/hero_girl_clean.png')}
                  className={`p-2 rounded-2xl border transition-all flex items-center gap-3 ${
                    selectedImage === '/public/assets/portfolio/hero_girl_clean.png'
                      ? 'border-[#FF85C0] bg-[#221332] shadow-[0_0_15px_rgba(241,45,145,0.3)]'
                      : 'border-[#F12D91]/25 bg-[#160D20] hover:border-[#FF85C0]/50'
                  }`}
                >
                  <img
                    src="/public/assets/portfolio/hero_girl_clean.png"
                    alt="Hero Character"
                    className="w-12 h-12 object-contain rounded-xl"
                  />
                  <div className="text-left rtl:text-right">
                    <span className="text-xs font-bold text-white block">
                      {isRtl ? 'کاراکتر اصلی Hero' : 'Hero Character'}
                    </span>
                    <span className="text-[10px] text-[#BDA9C9]">
                      {isRtl ? 'طرح اختصاصی هدفون نئونی' : 'Approved Headphones Girl'}
                    </span>
                  </div>
                </button>

                {/* Custom Image Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3.5 rounded-2xl border border-dashed border-[#F12D91]/40 hover:border-[#FF85C0] bg-[#160D20] hover:bg-[#221332] transition-all flex items-center gap-2.5 text-xs font-mono text-[#BDA9C9] hover:text-white"
                >
                  <Upload size={16} aria-hidden="true" className="text-[#FF85C0]" />
                  <span>{isRtl ? 'آپلود تصویر دلخواه...' : 'Upload custom photo...'}</span>
                </button>
              </div>

              {selectedImage && selectedImage !== '/public/assets/portfolio/hero_girl_clean.png' && (
                <div className="flex items-center gap-3 p-2 rounded-xl bg-[#160D20] border border-[#FF85C0]/30 w-fit">
                  <img src={selectedImage} alt="Uploaded" className="w-10 h-10 object-cover rounded-lg" />
                  <span className="text-xs text-green-400 font-mono">
                    {isRtl ? 'تصویر سفارشی بارگذاری شد' : 'Custom photo loaded'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Aspect Ratio Selector (16:9 or 9:16) */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#D58BFF] block font-semibold">
              {isRtl ? 'نسبت تصویر ویدیو (Aspect Ratio):' : 'Video Aspect Ratio:'}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                  aspectRatio === '16:9'
                    ? 'bg-[#F12D91]/25 text-[#FF85C0] border-[#F12D91]/60 shadow-[0_0_12px_rgba(241,45,145,0.3)] font-bold'
                    : 'bg-[#160D20] text-[#BDA9C9] border-[#F12D91]/25 hover:text-white'
                }`}
              >
                16:9 ({isRtl ? 'افقی / Landscape' : 'Landscape'})
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                  aspectRatio === '9:16'
                    ? 'bg-[#F12D91]/25 text-[#FF85C0] border-[#F12D91]/60 shadow-[0_0_12px_rgba(241,45,145,0.3)] font-bold'
                    : 'bg-[#160D20] text-[#BDA9C9] border-[#F12D91]/25 hover:text-white'
                }`}
              >
                9:16 ({isRtl ? 'عمودی / Portrait' : 'Portrait'})
              </button>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <label htmlFor="video-prompt-input" className="text-xs font-mono text-[#D58BFF] block font-semibold">
              {isRtl ? 'دستور و توصیف حرکات سینماتیک (Prompt):' : 'Cinematic Motion Prompt:'}
            </label>
            <textarea
              id="video-prompt-input"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-2xl bg-[#09050E] border border-[#F12D91]/30 p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF85C0] focus:ring-1 focus:ring-[#FF85C0] font-sans leading-relaxed"
              placeholder={isRtl ? 'توصیف حرکات، نورپردازی و فضای ویدیو...' : 'Describe motion, camera movement, and lighting...'}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Success / Applied Notice */}
          {appliedNotice && (
            <div className="p-3.5 rounded-xl bg-green-950/40 border border-green-500/40 text-green-300 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-green-400" />
              <span>{appliedNotice}</span>
            </div>
          )}

          {/* Generation Action Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              disabled={isGenerating || !prompt.trim()}
              onClick={handleGenerate}
              className="neon-glow-btn px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isRtl ? 'در حال پردازش ویدیو با مدل Omni...' : 'Generating with Gemini Omni...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{isRtl ? 'شروع تولید ویدیو با هوش مصنوعی' : 'Generate Cinematic Video'}</span>
                </>
              )}
            </button>

            {isGenerating && (
              <span className="text-xs font-mono text-[#D58BFF] animate-pulse">
                {generationProgress}
              </span>
            )}
          </div>

          {/* Video Preview Section */}
          {generatedVideo && (
            <div className="pt-6 border-t border-[#F12D91]/25 space-y-4">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                <span>{isRtl ? 'پیش‌نمایش ویدیوی تولیدشده' : 'Generated Video Preview'}</span>
              </h3>

              <div className="relative rounded-2xl overflow-hidden border border-[#F12D91]/40 bg-black aspect-video max-h-80 flex items-center justify-center">
                <video
                  src={generatedVideo}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Action Buttons on Video */}
              <div className="flex flex-wrap items-center gap-3">
                {onApplyToHero && (
                  <button
                    type="button"
                    onClick={handleApplyHero}
                    className="px-4 py-2 rounded-xl bg-[#221332] border border-[#F12D91]/40 hover:border-[#FF85C0] text-xs font-mono text-white hover:text-[#FF85C0] transition-colors"
                  >
                    {isRtl ? 'اعمال روی کاراکتر Hero' : 'Apply to Hero Section'}
                  </button>
                )}

                {onApplyToBackground && (
                  <button
                    type="button"
                    onClick={handleApplyBackground}
                    className="px-4 py-2 rounded-xl bg-[#221332] border border-[#B84DFF]/40 hover:border-[#D58BFF] text-xs font-mono text-white hover:text-[#D58BFF] transition-colors"
                  >
                    {isRtl ? 'اعمال به عنوان پس‌زمینه سایت' : 'Apply as Site Background'}
                  </button>
                )}

                <a
                  href={generatedVideo}
                  download="gemini-cinematic-video.mp4"
                  className="px-4 py-2 rounded-xl bg-[#160D20] border border-[#F12D91]/25 text-xs font-mono text-[#BDA9C9] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Download size={14} />
                  <span>{isRtl ? 'دانلود فایل ویدیو' : 'Download Video (.mp4)'}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#F12D91]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};
