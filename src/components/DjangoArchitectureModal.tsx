import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, Language } from '../data/translations';
import { X, Folder, FileCode, CheckCircle2, Copy, Check } from 'lucide-react';

interface DjangoArchitectureModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const DjangoArchitectureModal: React.FC<DjangoArchitectureModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'core' | 'contact'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sampleModelsPy = `# apps/projects/models.py
from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    title = models.CharField(max_length=200)
    title_fa = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    description_fa = models.TextField()
    technologies = models.ManyToManyField('Technology', related_name='projects')
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleModelsPy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="django-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#221332] border border-[#B84DFF]/40 text-[#D58BFF]">
            <Folder size={24} />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#FF85C0] uppercase tracking-wider block">
              Django MTV &amp; DRF Structure
            </span>
            <h2 id="django-modal-title" className="text-2xl font-bold font-['Outfit'] text-white">
              {lang === 'fa' ? 'معماری و ساختار اپلیکیشن‌های جنگو' : 'Django Modular Architecture'}
            </h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#F12D91]/20 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'overview'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'projects'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            apps/projects
          </button>
          <button
            onClick={() => setActiveTab('core')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'core'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            apps/core
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'contact'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            apps/contact
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#BDA9C9] leading-relaxed">
            <p>
              {lang === 'fa'
                ? 'این پورتفولیو با ساختار ماژولار و مطابق با استاندارد رسمی جنگو معماری شده است تا مهاجرت به قالب‌های جنگو (Django Templates) و اتصال به دیتابیس بدون هیچ‌گونه به هم ریختگی بصری انجام پذیرد.'
                : 'This portfolio is architected following the official modular Django best practices, ensuring a seamless migration path to Django templates and models without modifying visual fidelity.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
                <span className="font-bold text-white block">apps/projects</span>
                <span className="text-[#8E79A5]">
                  {lang === 'fa' ? 'مدیریت پروژه‌ها، تگ‌ها و اندپوینت‌ها' : 'Project models, case studies & API endpoints'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#B84DFF]/25 space-y-1">
                <span className="font-bold text-white block">apps/core</span>
                <span className="text-[#8E79A5]">
                  {lang === 'fa' ? 'پروفایل سایت، بیوگرافی و کنترلر developer.py' : 'SiteProfile singleton, bio & developer.py'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
                <span className="font-bold text-white block">apps/contact</span>
                <span className="text-[#8E79A5]">
                  {lang === 'fa' ? 'فرم تماس، اعتبارسنجی CSRF و تسک سلری' : 'ContactInquiry, validation & Celery mailer'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#B84DFF]/25 space-y-1">
                <span className="font-bold text-white block">apps/skills</span>
                <span className="text-[#8E79A5]">
                  {lang === 'fa' ? 'دسته‌بندی مهارت‌ها و استک‌های فنی' : 'Skill categories & technical proficiencies'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#FF85C0] font-bold">
                apps/projects/models.py
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-[#160D20] text-xs font-mono text-[#D58BFF] hover:text-white flex items-center gap-1"
              >
                {copiedCode ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre dir="ltr" className="p-4 rounded-xl bg-[#09050E] border border-[#F12D91]/30 text-xs font-mono text-[#D58BFF] overflow-x-auto text-left">
              {sampleModelsPy}
            </pre>
          </div>
        )}

        {activeTab === 'core' && (
          <div dir="ltr" className="space-y-3 text-left">
            <span className="text-xs font-mono text-[#FF85C0] font-bold">
              apps/core/views.py (HomeView)
            </span>
            <pre className="p-4 rounded-xl bg-[#09050E] border border-[#B84DFF]/30 text-xs font-mono text-[#D58BFF] overflow-x-auto">
{`from django.views.generic import TemplateView
from apps.projects.models import Project
from apps.skills.models import SkillCategory

class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["featured_projects"] = Project.objects.filter(is_featured=True)
        ctx["skill_categories"] = SkillCategory.objects.prefetch_related("skills")
        return ctx`}
            </pre>
          </div>
        )}

        {activeTab === 'contact' && (
          <div dir="ltr" className="space-y-3 text-left">
            <span className="text-xs font-mono text-[#FF85C0] font-bold">
              apps/contact/forms.py &amp; tasks.py
            </span>
            <pre className="p-4 rounded-xl bg-[#09050E] border border-[#F12D91]/30 text-xs font-mono text-[#D58BFF] overflow-x-auto">
{`# Async email dispatch with Celery
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_contact_notification(sender_name, sender_email, message):
    send_mail(
        subject=f"New Portfolio Message from {sender_name}",
        message=f"From: {sender_email}\\n\\n{message}",
        from_email="no-reply@zeinabsoufi.dev",
        recipient_list=["z.soofi.n@gmail.com"],
        fail_silently=False,
    )`}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#F12D91]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#221332] text-xs font-medium text-white hover:bg-[#2F1A44]"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};
