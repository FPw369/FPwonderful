'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mixing & Mastering',
    message: '',
    links: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to transmit message. Please email directly.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network transmission error. Please reach out to fpwonderful.music@gmail.com directly.');
    }
  };

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Opening Statement */}
      <section className="space-y-4 border-b border-[#ACE1AF]/20 pb-8">
        <div className="flex items-center gap-2 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
          <Mail className="w-4 h-4" />
          <span>Direct Channel // Chicago</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl text-[#F9F4F4] tracking-tight leading-tight">
          If something here resonates, <span className="italic text-[#ACE1AF]">send a message.</span>
        </h1>
        <p className="font-mono-clean text-sm text-[#F9F4F4]/70">
          We’ll take it from there.
        </p>
      </section>

      {/* Inquiry Form */}
      <div className="glass-panel p-8 sm:p-10 rounded-sm border border-[#ACE1AF]/20 space-y-8">
        {status === 'success' ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#ACE1AF] mx-auto" />
            <h3 className="font-editorial text-3xl text-[#F9F4F4]">
              Transmission Received.
            </h3>
            <p className="font-mono-clean text-xs text-[#F9F4F4]/70 max-w-md mx-auto leading-relaxed">
              Your message has been delivered to fpwonderful.music@gmail.com. I review every submission personally and will reply shortly.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({ name: '', email: '', projectType: 'Mixing & Mastering', message: '', links: '' });
              }}
              className="ghost-btn px-6 py-2.5 text-xs inline-block mt-4"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-mono-clean text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-[#ACE1AF] uppercase tracking-wider text-[11px]">
                  Your Name / Artist Alias *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#121217] border border-[#ACE1AF]/25 rounded-sm px-4 py-3 text-[#F9F4F4] focus:outline-none focus:border-[#ACE1AF] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[#ACE1AF] uppercase tracking-wider text-[11px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full bg-[#121217] border border-[#ACE1AF]/25 rounded-sm px-4 py-3 text-[#F9F4F4] focus:outline-none focus:border-[#ACE1AF] transition-colors"
                />
              </div>
            </div>

            {/* Project Scope */}
            <div className="space-y-2">
              <label className="block text-[#ACE1AF] uppercase tracking-wider text-[11px]">
                Inquiry Focus
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#121217] border border-[#ACE1AF]/25 rounded-sm px-4 py-3 text-[#F9F4F4] focus:outline-none focus:border-[#ACE1AF] transition-colors"
              >
                <option value="Mixing & Mastering">Mixing & Mastering</option>
                <option value="Custom Production & Beats">Custom Production & Beats</option>
                <option value="DOOMgang☥ Collaboration">DOOMgang☥ Collaboration</option>
                <option value="Creative Direction & Consultation">Creative Direction & Consultation</option>
                <option value="General Note">General Note / Listening</option>
              </select>
            </div>

            {/* Reference Links */}
            <div className="space-y-2">
              <label className="block text-[#ACE1AF] uppercase tracking-wider text-[11px]">
                Audio Reference / Rough Mix Link (Optional)
              </label>
              <input
                type="url"
                value={formData.links}
                onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                placeholder="Dropbox, Google Drive, SoundCloud, or Spotify link"
                className="w-full bg-[#121217] border border-[#ACE1AF]/25 rounded-sm px-4 py-3 text-[#F9F4F4] focus:outline-none focus:border-[#ACE1AF] transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-[#ACE1AF] uppercase tracking-wider text-[11px]">
                Your Message & Intent *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about the record, your vision, timeline, and what you need..."
                className="w-full bg-[#121217] border border-[#ACE1AF]/25 rounded-sm p-4 text-[#F9F4F4] focus:outline-none focus:border-[#ACE1AF] transition-colors resize-y"
              />
            </div>

            {status === 'error' && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-sm text-red-200 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="ghost-btn w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Send Transmission</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Direct Transmission Fallback */}
      <div className="text-center font-mono-clean text-xs text-[#F9F4F4]/50 space-y-1">
        <p>Direct email inquiries:</p>
        <a
          href="mailto:fpwonderful.music@gmail.com"
          className="text-[#ACE1AF] hover:underline"
        >
          fpwonderful.music@gmail.com
        </a>
      </div>
    </div>
  );
}
