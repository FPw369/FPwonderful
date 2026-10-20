'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useMiniPlayer } from '@/components/MiniPlayerContext';
import { DOOMGANG_DISCOGRAPHY } from '@/lib/discography';

export default function HomePage() {
  const { playTrack } = useMiniPlayer();

  return (
    <div className="relative z-10">
      {/* 01. HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16 sm:py-24 relative">
        <div className="space-y-8">
          {/* Subtle Location & Practice Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#E2E2DA] bg-[#FFFFFF] shadow-xs text-[11px] font-mono-clean text-[#3B6141] tracking-wider">
            <div className="relative w-4 h-4 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="FP Logo"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Chicago, IL // 312 • Sound & Soul</span>
          </div>

          {/* Hero Statement */}
          <h1 className="font-editorial text-6xl sm:text-7xl lg:text-8xl text-[#18181F] tracking-tight leading-[1.04] max-w-4xl">
            Sound, with <span className="italic text-[#3B6141]">intention.</span>
          </h1>

          {/* Concise Subtext */}
          <div className="space-y-3 font-mono-clean text-sm sm:text-base text-[#5A5A66] max-w-xl leading-relaxed">
            <p>
              FPwonderful — a recording artist, producer, and engineer based in Chicago.
            </p>
            <p>
              My work lives at the intersection of sound, clarity, and creative balance.
            </p>
            <p className="text-[#3B6141] font-medium pt-0.5">
              Everything here comes from listening.
            </p>
          </div>

          {/* Soft CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-5 font-mono-clean text-xs sm:text-sm">
            <Link
              href="/music"
              className="ghost-btn px-6 py-3 flex items-center gap-2.5 rounded-sm shadow-xs group"
            >
              <span>Explore the music</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="px-5 py-3 text-[#5A5A66] hover:text-[#18181F] transition-colors border border-transparent hover:border-[#E2E2DA] rounded-sm bg-transparent hover:bg-white/60"
            >
              Read the notes
            </Link>

            <Link
              href="/mixing-mastering"
              className="ghost-btn-gold px-5 py-3 flex items-center gap-2 rounded-sm shadow-xs"
            >
              <span>Mixing & mastering</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02. PHILOSOPHY BLOCK */}
      <section className="border-y border-[#E8E8E2] bg-[#F2F2EC]/80 py-20 sm:py-28 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="font-mono-clean text-[11px] uppercase tracking-[0.25em] text-[#5B6E38] block font-semibold">
            Philosophy
          </span>

          <blockquote className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#18181F] leading-tight">
            &ldquo;Sound is mental before it’s technical.&rdquo;
          </blockquote>

          <div className="font-mono-clean text-sm sm:text-base text-[#5A5A66] space-y-2 max-w-md mx-auto pt-2 leading-relaxed">
            <p className="text-[#3B6141] font-bold">The goal isn’t loudness.</p>
            <p>It’s clarity.</p>
            <p className="pt-2 text-xs sm:text-sm text-[#7E7E8B] italic">
              In music — and in life — less but better.
            </p>
          </div>
        </div>
      </section>

      {/* 03. CURATED RECORDS PREVIEW */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E8E2] pb-5">
          <div>
            <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#3B6141] font-semibold">
              DOOMgang☥ Focus
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18181F] mt-1">
              Featured Records & Sonic Space
            </h2>
          </div>
          <Link
            href="/music"
            className="font-mono-clean text-xs text-[#3B6141] hover:underline flex items-center gap-1.5 self-start sm:self-auto font-medium"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2 Featured Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DOOMGANG_DISCOGRAPHY.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel p-6 sm:p-8 rounded-sm space-y-5 hover:border-[#3B6141]/30 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center font-mono-clean text-xs text-[#5B6E38]">
                  <span className="font-semibold">{`[ ARCHIVE // 0${idx + 1} ]`}</span>
                  <span>{item.year}</span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#18181F] group-hover:text-[#3B6141] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono-clean text-xs text-[#5A5A66] mt-1">
                    {item.artist}
                  </p>
                </div>

                <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66]">
                  {item.notes}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => playTrack(item)}
                  className="ghost-btn px-4 py-2.5 text-xs flex items-center gap-2 rounded-xs"
                >
                  <div className="relative w-3.5 h-3.5 flex-shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt="Insignia"
                      width={14}
                      height={14}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>Stream Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
