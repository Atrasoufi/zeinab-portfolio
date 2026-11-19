import React, { useState } from 'react';
import { TRANSLATIONS, Language } from '../data/translations';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { X, Folder, Copy, Check } from 'lucide-react';

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
  const containerRef = useFocusTrap(isOpen, onClose);

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
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 bg-[#12081B] border border-[#F12D91]/40 shadow-[0_0_50px_rgba(241,45,145,0.3)] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-[#221332] border border-[#F12D91]/30 text-white hover:text-[#FF85C0] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
          aria-label={t.modals.close}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#221332] border border-[#B84DFF]/40 text-[#D58BFF]">
            <Folder size={24} aria-hidden="true" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#FF85C0] uppercase tracking-wider block">
              Proposed Django MTV &amp; DRF Blueprint (Illustrative Demo)
            </span>
            <h2 id="django-modal-title" className="text-2xl font-bold font-['Outfit'] text-white">
              {lang === 'fa' ? 'طرح معماری پیشنهادی اپلیکیشن‌های جنگو' : 'Proposed Django Architecture'}
            </h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div role="tablist" aria-label="Django Architecture Components" className="flex items-center gap-2 mb-6 border-b border-[#F12D91]/20 pb-3">
          <button
            type="button"
            role="tab"
            id="django-tab-overview"
            aria-controls="django-tabpanel-overview"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
              activeTab === 'overview'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            role="tab"
            id="django-tab-projects"
            aria-controls="django-tabpanel-projects"
            aria-selected={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
              activeTab === 'projects'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            apps/projects
          </button>
          <button
            type="button"
            role="tab"
            id="django-tab-core"
            aria-controls="django-tabpanel-core"
            aria-selected={activeTab === 'core'}
            onClick={() => setActiveTab('core')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
              activeTab === 'core'
                ? 'bg-[#F12D91]/25 text-[#FF85C0] border border-[#F12D91]/50'
                : 'text-[#BDA9C9] hover:text-white'
            }`}
          >
            apps/core
          </button>
          <button
            type="button"
            role="tab"
            id="django-tab-contact"
            aria-controls="django-tabpanel-contact"
            aria-selected={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0] ${
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
          <div
            role="tabpanel"
            id="django-tabpanel-overview"
            aria-labelledby="django-tab-overview"
            className="space-y-4 text-xs sm:text-sm text-[#BDA9C9] leading-relaxed focus:outline-none"
          >
            <p>
              {lang === 'fa'
                ? 'این نسخه فعلی با React، TypeScript و Vite اجرا می‌شود و نمودار زیر به‌عنوان یک طرح معماری پیشنهادی و آموزشی نشان می‌دهد چگونه می‌توان داده‌های همین پورتفولیو را به اپ‌های ماژولار جنگو متصل کرد.'
                : 'This live site runs as a React + TypeScript + Vite frontend. The blueprint below serves as an illustrative architecture demonstration showing how this portfolio structure maps cleanly onto modular Django apps.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
                <span className="font-bold text-white block">apps/projects</span>
                <span className="text-[#BDA9C9]">
                  {lang === 'fa' ? 'مدیریت پروژه‌ها، تگ‌ها و اندپوینت‌ها' : 'Project models, case studies & API endpoints'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#B84DFF]/25 space-y-1">
                <span className="font-bold text-white block">apps/core</span>
                <span className="text-[#BDA9C9]">
                  {lang === 'fa' ? 'پروفایل سایت، بیوگرافی و کنترلر developer.py' : 'SiteProfile singleton, bio & developer.py'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#F12D91]/25 space-y-1">
                <span className="font-bold text-white block">apps/contact</span>
                <span className="text-[#BDA9C9]">
                  {lang === 'fa' ? 'فرم تماس، اعتبارسنجی CSRF و تسک سلری' : 'ContactInquiry, validation & Celery mailer'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#160D20] border border-[#B84DFF]/25 space-y-1">
                <span className="font-bold text-white block">apps/skills</span>
                <span className="text-[#BDA9C9]">
                  {lang === 'fa' ? 'دسته‌بندی مهارت‌ها و استک‌های فنی' : 'Skill categories & technical proficiencies'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div
            role="tabpanel"
            id="django-tabpanel-projects"
            aria-labelledby="django-tab-projects"
            className="space-y-3 focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#FF85C0] font-bold">
                apps/projects/models.py
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copiedCode ? (lang === 'fa' ? 'کد مدل کپی شد' : 'Code copied to clipboard') : (lang === 'fa' ? 'کپی کد مدل جنگو' : 'Copy Django model code')}
                className="px-2.5 py-1 rounded-lg bg-[#160D20] border border-[#F12D91]/30 text-xs font-mono text-[#D58BFF] hover:text-white hover:border-[#FF85C0] flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF85C0]"
              >
                {copiedCode ? <Check size={12} aria-hidden="true" className="text-green-400" /> : <Copy size={12} aria-hidden="true" />}
                <span>{copiedCode ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی کد' : 'Copy Code')}</span>
              </button>
            </div>
            <pre dir="ltr" className="p-4 rounded-xl bg-[#09050E] border border-[#F12D91]/30 text-xs font-mono text-[#D58BFF] overflow-x-auto text-left">
              {sampleModelsPy}
            </pre>
          </div>
        )}

        {activeTab === 'core' && (
          <div
            role="tabpanel"
            id="django-tabpanel-core"
            aria-labelledby="django-tab-core"
            dir="ltr"
            className="space-y-3 text-left focus:outline-none"
          >
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
          <div
            role="tabpanel"
            id="django-tabpanel-contact"
            aria-labelledby="django-tab-contact"
            dir="ltr"
            className="space-y-3 text-left focus:outline-none"
          >
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
