'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DOOMGANG_DISCOGRAPHY, PRODUCTIONS_ARCHIVE } from '@/lib/discography';
import { MagneticAlbum } from '@/components/MagneticAlbum';
import { ExternalLink, Layers } from 'lucide-react';

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<'doomgang' | 'productions'>('doomgang');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDiscography = DOOMGANG_DISCOGRAPHY.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Intro Header */}
      <section className="space-y-4 border-b border-[#ACE1AF]/20 pb-8">
        <div className="flex items-center gap-2.5 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
          <div className="relative w-4 h-4 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="DOOMgang Insignia"
              width={16}
              height={16}
              className="w-full h-full object-contain"
            />
          </div>
          <span>DOOMgang☥ Digital Archive // Catalog</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-6xl text-[#F9F4F4] tracking-tight">
          This is where the work lives.
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#F9F4F4]/70 max-w-2xl leading-relaxed">
          Records, productions, collaborations, and experiments — each one a moment in time.
        </p>
      </section>

      {/* Main Mode Toggle: DOOMgang Discography vs. Productions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3 font-mono-clean text-xs">
          <button
            onClick={() => setActiveTab('doomgang')}
            className={`px-5 py-2.5 rounded-sm transition-all ${
              activeTab === 'doomgang'
                ? 'bg-[#ACE1AF] text-[#121217] font-bold shadow-[0_0_20px_rgba(172,225,175,0.3)]'
                : 'border border-[#ACE1AF]/25 text-[#F9F4F4]/70 hover:text-[#F9F4F4]'
            }`}
          >
            DOOMgang☥ Archive ({DOOMGANG_DISCOGRAPHY.length})
          </button>

          <button
            onClick={() => setActiveTab('productions')}
            className={`px-5 py-2.5 rounded-sm transition-all ${
              activeTab === 'productions'
                ? 'bg-[#C9A84C] text-[#121217] font-bold shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                : 'border border-[#C9A84C]/25 text-[#F9F4F4]/70 hover:text-[#F9F4F4]'
            }`}
          >
            Producer Works ({PRODUCTIONS_ARCHIVE.length})
          </button>
        </div>

        {/* Category Filter for Discography */}
        {activeTab === 'doomgang' && (
          <div className="flex items-center gap-2 font-mono-clean text-[11px] overflow-x-auto pb-1">
            {['all', 'album', 'ep', 'single', 'collab'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 uppercase tracking-wider rounded-sm transition-colors ${
                  selectedCategory === cat
                    ? 'text-[#ACE1AF] border-b border-[#ACE1AF]'
                    : 'text-[#F9F4F4]/50 hover:text-[#F9F4F4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Discography / Production Vertical Scroll List */}
      <section className="space-y-8">
        {activeTab === 'doomgang' ? (
          <div className="space-y-6">
            {filteredDiscography.map((track, idx) => (
              <MagneticAlbum key={track.id} track={track} index={idx} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-[#1F1F29]/40 border border-[#C9A84C]/20 rounded-sm font-mono-clean text-xs text-[#F9F4F4]/70 flex items-center justify-between">
              <span>Producer Discography & Collaborative Sound Design</span>
              <span className="text-[#C9A84C] uppercase tracking-widest text-[10px]">
                Chicago // Hybrid Engineering
              </span>
            </div>
            {PRODUCTIONS_ARCHIVE.map((track, idx) => (
              <MagneticAlbum key={track.id} track={track} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Bandcamp External Link Section */}
      <section className="glass-panel p-8 rounded-sm text-center space-y-4 border border-[#ACE1AF]/20">
        <h3 className="font-editorial text-2xl text-[#F9F4F4]">
          Direct Support & Full Digital Archives
        </h3>
        <p className="font-mono-clean text-xs text-[#F9F4F4]/70 max-w-lg mx-auto">
          Explore complete discography, digital downloads, and supporter exclusives directly on Bandcamp.
        </p>
        <div className="pt-2">
          <a
            href="https://fpwonderful.bandcamp.com"
            target="_blank"
            rel="noreferrer"
            className="ghost-btn-gold inline-flex items-center gap-2 px-6 py-2.5 text-xs"
          >
            <span>Visit fpwonderful.bandcamp.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
