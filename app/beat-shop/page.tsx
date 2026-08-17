'use client';

import React from 'react';
import { BEATS_CATALOG } from '@/lib/discography';
import { BeatGrid } from '@/components/BeatGrid';
import { Sparkles, Terminal, Shield, Sliders } from 'lucide-react';

export default function BeatShopPage() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4 border-b border-[#ACE1AF]/20 pb-8">
        <div className="flex items-center gap-2 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          <span>Control Panel // Direct Producer Catalog</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-[#F9F4F4] tracking-tight">
          + Wonderful Beat Shop +
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#F9F4F4]/70 max-w-2xl leading-relaxed">
          Select a beat. High-fidelity production, surgically mixed for vocal headroom. Direct licensing with no middleman markups.
        </p>
      </section>

      {/* Cyber Grid Beat Table & Player */}
      <BeatGrid beats={BEATS_CATALOG} />

      {/* Licensing Transparency Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono-clean text-xs pt-8 border-t border-[#F9F4F4]/10">
        <div className="glass-panel p-6 rounded-sm space-y-3 border-l-2 border-l-[#ACE1AF]">
          <div className="flex items-center gap-2 text-[#ACE1AF] font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Direct Artist Protection</span>
          </div>
          <p className="text-[#F9F4F4]/80 leading-relaxed">
            Every instrumental is produced, arranged, and pre-mixed by FPwonderful in Chicago. You receive clean untagged audio, license agreement, and stems upon acquisition.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-sm space-y-3 border-l-2 border-l-[#C9A84C]">
          <div className="flex items-center gap-2 text-[#C9A84C] font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Custom Arrangement & Stem Mixing</span>
          </div>
          <p className="text-[#F9F4F4]/80 leading-relaxed">
            Need custom track extensions, key shifts, or additional instrumentation? Exclusive licenses include direct collaboration to tailor the record to your voice.
          </p>
        </div>
      </section>
    </div>
  );
}
