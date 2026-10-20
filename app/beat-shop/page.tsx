'use client';

import React from 'react';
import { BEATS_CATALOG } from '@/lib/discography';
import { BeatGrid } from '@/components/BeatGrid';
import { Terminal, Shield, Sliders } from 'lucide-react';

export default function BeatShopPage() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-14">
      {/* Header */}
      <section className="space-y-4 border-b border-[#E8E8E2] pb-8">
        <div className="flex items-center gap-2 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
          <Terminal className="w-4 h-4" />
          <span>Control Panel // Direct Producer Catalog</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-[#18181F] tracking-tight">
          + Wonderful Beat Shop +
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#5A5A66] max-w-xl leading-relaxed">
          Select a beat. High-fidelity production, surgically mixed for vocal headroom. Direct licensing with no middleman markups.
        </p>
      </section>

      {/* Grid Beat Table & Player */}
      <BeatGrid beats={BEATS_CATALOG} />

      {/* Licensing Transparency Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono-clean text-xs pt-8 border-t border-[#E8E8E2]">
        <div className="glass-panel p-6 rounded-sm space-y-3 border-l-3 border-l-[#3B6141] bg-white shadow-xs">
          <div className="flex items-center gap-2 text-[#3B6141] font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Direct Artist Protection</span>
          </div>
          <p className="text-[#5A5A66] leading-relaxed">
            Every instrumental is produced, arranged, and pre-mixed by FPwonderful in Chicago. You receive clean untagged audio, license agreement, and stems upon acquisition.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-sm space-y-3 border-l-3 border-l-[#9C7A2E] bg-white shadow-xs">
          <div className="flex items-center gap-2 text-[#9C7A2E] font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Custom Arrangement & Stem Mixing</span>
          </div>
          <p className="text-[#5A5A66] leading-relaxed">
            Need custom track extensions, key shifts, or additional instrumentation? Exclusive licenses include direct collaboration to tailor the record to your voice.
          </p>
        </div>
      </section>
    </div>
  );
}
