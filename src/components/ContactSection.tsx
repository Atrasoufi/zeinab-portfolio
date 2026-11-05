import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TRANSLATIONS, Language } from '../data/translations';
import { Mail, Github, Linkedin, Send, MessageSquare, Code, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPayload, setShowPayload] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [error, setError] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || !email.includes('@')) {
      setError(true);
      return;
    }
    setError(false);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const payloadString = JSON.stringify(
    {
      sender_name: name || 'Alex Doe',
      sender_email: email || 'alex@example.com',
      message: message || 'Interested in backend engineering collaboration.',
      client_timestamp: new Date().toISOString(),
      endpoint: '/api/v1/contact/',
    },
    null,
    2
  );

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(payloadString);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <section id="contact" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-9 relative overflow-hidden">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-[#F12D91]/20">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              {t.contact.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#BDA9C9] mt-1 max-w-2xl">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <MessageSquare size={18} className="text-[#FF85C0]" />
                <span>{t.contact.directChannels}</span>
              </h3>

              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] hover:bg-[#221332] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#2D143D] text-[#FF85C0]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E79A5] font-mono">{t.contact.email}</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FF85C0] transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#8E79A5] group-hover:text-[#FF85C0] transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] hover:bg-[#221332] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#2D143D] text-[#FF85C0]">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E79A5] font-mono">{t.contact.github}</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FF85C0] transition-colors">
                      github.com/Atrasoufi
                    </div>
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#8E79A5] group-hover:text-[#FF85C0] transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#160D20] border border-[#F12D91]/30 hover:border-[#FF85C0] hover:bg-[#221332] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#2D143D] text-[#D58BFF]">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E79A5] font-mono">{t.contact.linkedin}</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FF85C0] transition-colors">
                      linkedin.com/in/zeinab-soufi
                    </div>
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#8E79A5] group-hover:text-[#FF85C0] transition-colors" />
              </a>

              {/* Location Badge */}
              <div className="p-4 rounded-xl bg-[#100817] border border-[#B84DFF]/25 text-xs text-[#BDA9C9] flex items-center justify-between font-mono">
                <span>📍 {lang === 'fa' ? PERSONAL_INFO.locationFa : PERSONAL_INFO.location}</span>
                <span className="text-[#FF85C0]">GMT +3:30</span>
              </div>
            </div>

            {/* RIGHT: Contact Form & API Inspector (7 cols) */}
            <div className="lg:col-span-7 bg-[#160D20]/90 border border-[#F12D91]/35 rounded-2xl p-6 sm:p-7 shadow-[0_0_25px_rgba(241,45,145,0.12)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {t.contact.formTitle}
                </h3>
                <span className="text-[11px] font-mono text-[#D58BFF] px-2.5 py-1 rounded bg-[#100817] border border-[#B84DFF]/30">
                  Django REST Ready
                </span>
              </div>

              {/* Transparent prototype notice */}
              <div className="mb-5 p-3 rounded-xl bg-[#221332]/70 border border-[#F12D91]/25 text-xs text-[#BDA9C9] leading-relaxed">
                💡 {t.contact.formNotice}
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                {error && (
                  <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-xs text-red-200">
                    {t.contact.validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#FF85C0] mb-1.5">
                      {t.contact.nameLabel} <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={error && !name.trim() ? 'true' : 'false'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100817] border border-[#F12D91]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF85C0] focus:ring-1 focus:ring-[#FF85C0]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#FF85C0] mb-1.5">
                      {t.contact.emailLabel} <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={error && (!email.trim() || !email.includes('@')) ? 'true' : 'false'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#100817] border border-[#F12D91]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF85C0] focus:ring-1 focus:ring-[#FF85C0]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#FF85C0] mb-1.5">
                    {t.contact.messageLabel} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={error && !message.trim() ? 'true' : 'false'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#100817] border border-[#F12D91]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF85C0] focus:ring-1 focus:ring-[#FF85C0] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{t.contact.sendButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPayload(!showPayload)}
                    className="px-4 py-2.5 rounded-xl bg-[#160D20] border border-[#B84DFF]/40 text-[#D58BFF] hover:border-[#FF85C0] hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code size={14} />
                    <span>{t.contact.inspectPayload}</span>
                  </button>
                </div>
              </form>

              {/* API Payload Inspector */}
              {showPayload && (
                <div dir="ltr" className="mt-5 p-4 rounded-xl bg-[#0B0612] border border-[#B84DFF]/40 animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-green-400 font-bold">
                      {t.contact.payloadTitle}
                    </span>
                    <button
                      onClick={handleCopyPayload}
                      className="px-2 py-1 rounded bg-[#160D20] text-xs font-mono text-[#FF85C0] hover:text-white flex items-center gap-1"
                    >
                      {copiedPayload ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      <span>{copiedPayload ? 'Copied' : t.contact.copyPayload}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-[#D58BFF] overflow-x-auto whitespace-pre-wrap">
                    {payloadString}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
