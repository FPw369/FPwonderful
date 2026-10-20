'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DOOMGANG_DISCOGRAPHY, PRODUCTIONS_ARCHIVE } from '@/lib/discography';
import { MagneticAlbum } from '@/components/MagneticAlbum';
import { ExternalLink } from 'lucide-react';

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<'doomgang' | 'productions'>('doomgang');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDiscography = DOOMGANG_DISCOGRAPHY.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-14">
      {/* Intro Header */}
      <section className="space-y-4 border-b border-[#E8E8E2] pb-8">
        <div className="flex items-center gap-2.5 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
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
        <h1 className="font-editorial text-5xl sm:text-6xl text-[#18181F] tracking-tight">
          This is where the work lives.
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#5A5A66] max-w-xl leading-relaxed">
          Records, productions, collaborations, and experiments — each one a moment in time.
        </p>
      </section>

      {/* Main Mode Toggle: DOOMgang Discography vs. Productions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-3 font-mono-clean text-xs">
          <button
            onClick={() => setActiveTab('doomgang')}
            className={`px-5 py-2.5 rounded-sm transition-all cursor-pointer ${
              activeTab === 'doomgang'
                ? 'bg-[#3B6141] text-white font-bold shadow-xs'
                : 'border border-[#E2E2DA] bg-white text-[#5A5A66] hover:text-[#18181F]'
            }`}
          >
            DOOMgang☥ Archive ({DOOMGANG_DISCOGRAPHY.length})
          </button>

          <button
            onClick={() => setActiveTab('productions')}
            className={`px-5 py-2.5 rounded-sm transition-all cursor-pointer ${
              activeTab === 'productions'
                ? 'bg-[#9C7A2E] text-white font-bold shadow-xs'
                : 'border border-[#E2E2DA] bg-white text-[#5A5A66] hover:text-[#18181F]'
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
                className={`px-3 py-1 uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-[#3B6141] font-bold border-b-2 border-[#3B6141]'
                    : 'text-[#7E7E8B] hover:text-[#18181F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Discography / Production Vertical Scroll List */}
      <section className="space-y-6">
        {activeTab === 'doomgang' ? (
          <div className="space-y-6">
            {filteredDiscography.map((track, idx) => (
              <MagneticAlbum key={track.id} track={track} index={idx} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-[#E2E2DA] rounded-sm font-mono-clean text-xs text-[#5A5A66] flex items-center justify-between shadow-xs">
              <span>Producer Discography & Collaborative Sound Design</span>
              <span className="text-[#9C7A2E] uppercase tracking-widest text-[10px] font-semibold">
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
      <section className="glass-panel p-8 rounded-sm text-center space-y-4 border border-[#E2E2DA]">
        <h3 className="font-editorial text-2xl text-[#18181F]">
          Direct Support & Full Digital Archives
        </h3>
        <p className="font-mono-clean text-xs text-[#5A5A66] max-w-md mx-auto">
          Explore complete discography, digital downloads, and supporter exclusives directly on Bandcamp.
        </p>
        <div className="pt-2">
          <a
            href="https://fpwonderful.bandcamp.com"
            target="_blank"
            rel="noreferrer"
            className="ghost-btn-gold inline-flex items-center gap-2 px-6 py-2.5 text-xs rounded-xs"
          >
            <span>Visit fpwonderful.bandcamp.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
