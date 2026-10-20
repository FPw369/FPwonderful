'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

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
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-14">
      {/* Opening Statement */}
      <section className="space-y-4 border-b border-[#E8E8E2] pb-8">
        <div className="flex items-center gap-2 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
          <Mail className="w-4 h-4" />
          <span>Direct Channel // Chicago</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl text-[#18181F] tracking-tight leading-tight">
          If something here resonates, <span className="italic text-[#3B6141]">send a message.</span>
        </h1>
        <p className="font-mono-clean text-sm text-[#5A5A66]">
          We’ll take it from there.
        </p>
      </section>

      {/* Inquiry Form */}
      <div className="glass-panel p-8 sm:p-10 rounded-sm border border-[#E2E2DA] space-y-6 bg-white shadow-xs">
        {status === 'success' ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#3B6141] mx-auto" />
            <h3 className="font-editorial text-3xl text-[#18181F]">
              Transmission Received.
            </h3>
            <p className="font-mono-clean text-xs text-[#5A5A66] max-w-md mx-auto leading-relaxed">
              Your message has been delivered to fpwonderful.music@gmail.com. I review every submission personally and will reply shortly.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({ name: '', email: '', projectType: 'Mixing & Mastering', message: '', links: '' });
              }}
              className="ghost-btn px-6 py-2.5 text-xs inline-block mt-4 rounded-xs cursor-pointer"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 font-mono-clean text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-[#3B6141] font-semibold uppercase tracking-wider text-[11px]">
                  Your Name / Artist Alias *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-xs px-4 py-3 text-[#18181F] placeholder:text-[#A5A5B0] focus:outline-none focus:border-[#3B6141] focus:bg-white transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[#3B6141] font-semibold uppercase tracking-wider text-[11px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-xs px-4 py-3 text-[#18181F] placeholder:text-[#A5A5B0] focus:outline-none focus:border-[#3B6141] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Project Scope */}
            <div className="space-y-2">
              <label className="block text-[#3B6141] font-semibold uppercase tracking-wider text-[11px]">
                Inquiry Focus
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-xs px-4 py-3 text-[#18181F] focus:outline-none focus:border-[#3B6141] focus:bg-white transition-colors"
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
              <label className="block text-[#3B6141] font-semibold uppercase tracking-wider text-[11px]">
                Audio Reference / Rough Mix Link (Optional)
              </label>
              <input
                type="url"
                value={formData.links}
                onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                placeholder="Dropbox, Google Drive, SoundCloud, or Bandcamp link"
                className="w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-xs px-4 py-3 text-[#18181F] placeholder:text-[#A5A5B0] focus:outline-none focus:border-[#3B6141] focus:bg-white transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-[#3B6141] font-semibold uppercase tracking-wider text-[11px]">
                Message / Creative Context *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about the record, where you are at with it, and what you are looking to achieve."
                className="w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-xs px-4 py-3 text-[#18181F] placeholder:text-[#A5A5B0] focus:outline-none focus:border-[#3B6141] focus:bg-white transition-colors leading-relaxed"
              />
            </div>

            {status === 'error' && (
              <div className="p-3 bg-[#FDF0EB] border border-[#D95328] rounded-xs text-[#D95328] text-xs">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="ghost-btn w-full py-3.5 text-xs tracking-widest uppercase transition-all rounded-xs cursor-pointer"
            >
              {status === 'submitting' ? 'Transmitting Note...' : 'Transmit Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
