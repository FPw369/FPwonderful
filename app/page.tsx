'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Disc, Volume2, Sparkles } from 'lucide-react';
import { useMiniPlayer } from '@/components/MiniPlayerContext';
import { DOOMGANG_DISCOGRAPHY } from '@/lib/discography';

export default function HomePage() {
  const { playTrack } = useMiniPlayer();

  return (
    <div className="relative z-10">
      {/* 01. HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-12 sm:py-20">
        <div className="space-y-8">
          {/* Subtle Persona Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#ACE1AF]/25 bg-[#1F1F29]/60 backdrop-blur-md text-[11px] font-mono-clean text-[#ACE1AF] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ACE1AF] animate-pulse" />
            <span>Chicago, IL // 312 • Recording Artist & Engineer</span>
          </div>

          {/* Hero Statement */}
          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl text-[#F9F4F4] tracking-tight leading-[1.05] max-w-4xl">
            Sound, with <span className="italic text-[#ACE1AF]">intention.</span>
          </h1>

          {/* Subtext */}
          <div className="space-y-3 font-mono-clean text-sm sm:text-base text-[#F9F4F4]/75 max-w-2xl leading-relaxed">
            <p>
              FPwonderful — a recording artist, producer, and engineer based in Chicago.
            </p>
            <p>
              My work lives at the intersection of sound, clarity, and creative balance.
            </p>
            <p className="text-[#ACE1AF]/90 pt-1">
              Everything here comes from listening.
            </p>
          </div>

          {/* Soft CTAs */}
          <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6 font-mono-clean text-xs sm:text-sm">
            <Link
              href="/music"
              className="ghost-btn px-6 py-3 flex items-center gap-2.5 group"
            >
              <span>Explore the work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="px-5 py-3 text-[#F9F4F4]/80 hover:text-[#ACE1AF] transition-colors border border-transparent hover:border-[#ACE1AF]/20 rounded-sm"
            >
              Read the notes
            </Link>

            <Link
              href="/mixing-mastering"
              className="ghost-btn-gold px-5 py-3 flex items-center gap-2"
            >
              <span>Mixing & mastering</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02. PHILOSOPHY BLOCK */}
      <section className="border-y border-[#ACE1AF]/15 bg-[#16161E]/70 py-24 sm:py-32 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-32 top-0 bottom-0 w-96 bg-[#808000]/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="font-mono-clean text-xs uppercase tracking-[0.3em] text-[#ACE1AF]/80 block">
            Core Philosophy
          </span>

          <blockquote className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#F9F4F4] leading-snug">
            &ldquo;Sound is mental before it’s technical.&rdquo;
          </blockquote>

          <div className="font-mono-clean text-sm sm:text-base text-[#F9F4F4]/70 space-y-3 max-w-lg mx-auto pt-4 leading-relaxed">
            <p className="text-[#ACE1AF] font-bold">The goal isn’t loudness.</p>
            <p>It’s clarity.</p>
            <p className="pt-2 text-xs sm:text-sm text-[#F9F4F4]/50 italic">
              In music — and in life — less but better.
            </p>
          </div>
        </div>
      </section>

      {/* 03. CURATED TRANSMISSION PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F9F4F4]/10 pb-6">
          <div>
            <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
              DOOMgang☥ Focus
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F9F4F4] mt-1">
              Featured Records & Sonic Space
            </h2>
          </div>
          <Link
            href="/music"
            className="font-mono-clean text-xs text-[#ACE1AF] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2 Featured Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOOMGANG_DISCOGRAPHY.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel p-6 sm:p-8 rounded-sm space-y-6 hover:border-[#ACE1AF]/40 transition-all group"
            >
              <div className="flex justify-between items-center font-mono-clean text-xs text-[#ACE1AF]">
                <span>{`[ ARCHIVE // 0${idx + 1} ]`}</span>
                <span>{item.year}</span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F9F4F4] group-hover:text-[#ACE1AF] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono-clean text-xs text-[#F9F4F4]/60 mt-1">
                  {item.artist}
                </p>
              </div>

              <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/70">
                {item.notes}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => playTrack(item)}
                  className="ghost-btn px-4 py-2 text-xs flex items-center gap-2"
                >
                  <Disc className="w-3.5 h-3.5" />
                  Stream Record
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
