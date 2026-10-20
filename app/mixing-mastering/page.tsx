'use client';

import React from 'react';
import Link from 'next/link';
import { BeforeAfterPlayer } from '@/components/BeforeAfterPlayer';
import { COMPARISON_GALLERY, PREVIOUS_WORK_PLAYLIST } from '@/lib/discography';
import { useMiniPlayer } from '@/components/MiniPlayerContext';
import { Sliders, CheckCircle2, ArrowRight, Play } from 'lucide-react';

export default function MixingMasteringPage() {
  const { playTrack } = useMiniPlayer();

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* 01. HEADER & OPENING */}
      <section className="space-y-5 border-b border-[#E8E8E2] pb-10">
        <div className="flex items-center gap-2 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
          <Sliders className="w-4 h-4" />
          <span>Precision Engineering // Acoustic Clarity</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-[#18181F] tracking-tight leading-[1.08] max-w-3xl">
          Mixing and mastering is an extension of how I listen.
        </h1>
      </section>

      {/* 02. PHILOSOPHY & HOW I WORK */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start font-mono-clean text-sm leading-relaxed">
        {/* Philosophy Card */}
        <div className="glass-panel p-8 rounded-sm space-y-3.5 border-l-3 border-l-[#3B6141] bg-white shadow-xs">
          <span className="text-xs uppercase tracking-widest text-[#3B6141] block font-bold">
            Philosophy
          </span>
          <p className="text-base text-[#18181F] font-medium">
            I work with artists, not files.
          </p>
          <p className="text-[#5A5A66]">
            The goal isn’t to over-process or impress. It’s to bring clarity to what’s already there.
          </p>
          <p className="text-xs text-[#7E7E8B] pt-1">
            Rooted in balance, restraint, and intention — protecting the emotion of the record while helping it translate anywhere.
          </p>
        </div>

        {/* How I Work Card */}
        <div className="glass-panel p-8 rounded-sm space-y-3.5 border-l-3 border-l-[#9C7A2E] bg-white shadow-xs">
          <span className="text-xs uppercase tracking-widest text-[#9C7A2E] block font-bold">
            How I Work
          </span>
          <p className="text-base text-[#18181F] font-medium">
            Communication matters. Trust matters.
          </p>
          <p className="text-[#5A5A66]">
            There’s no formula. Every record asks for something different.
          </p>
          <p className="text-xs text-[#7E7E8B] pt-1">
            Familiarity with FL Studio, Pro Tools and modern DAWs allows technical decisions without losing the feeling.
          </p>
        </div>
      </section>

      {/* 03. THE SONIC REVEAL (SYNCHRONIZED A/B PLAYERS) */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E8E2] pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#3B6141] font-semibold block">
            Interactive Analysis
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18181F] mt-1">
            The Sonic Reveal
          </h2>
          <p className="font-mono-clean text-xs text-[#5A5A66] mt-1 max-w-xl">
            Hear raw mixes crossfaded against finished masters in real-time, sample-accurate synchronization.
          </p>
        </div>

        <div className="space-y-6">
          {COMPARISON_GALLERY.map((pair) => (
            <BeforeAfterPlayer
              key={pair.id}
              id={pair.id}
              title={pair.title}
              genre={pair.genre}
              description={pair.description}
            />
          ))}
        </div>
      </section>

      {/* 04. PREVIOUSLY MIXED & MASTERED PLAYLIST */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E8E2] pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#9C7A2E] font-semibold block">
            Selected Work
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18181F] mt-1">
            Published Records Playlist
          </h2>
        </div>

        <div className="glass-panel rounded-sm overflow-hidden divide-y divide-[#E8E8E2] bg-white shadow-xs">
          {PREVIOUS_WORK_PLAYLIST.map((work, idx) => (
            <div
              key={work.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F5] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="font-mono-clean text-xs text-[#3B6141] font-bold">
                  {`0${idx + 1}`}
                </span>
                <div>
                  <h4 className="font-editorial text-xl text-[#18181F]">
                    {work.title}
                  </h4>
                  <p className="font-mono-clean text-xs text-[#5A5A66]">
                    {work.artist} ({work.year})
                  </p>
                  {work.notes && (
                    <p className="font-mono-clean text-[11px] text-[#3B6141] mt-0.5">
                      {work.notes}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => playTrack(work)}
                className="ghost-btn px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto flex-shrink-0 rounded-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 05. WHO THIS IS FOR */}
      <section className="glass-panel p-8 sm:p-10 rounded-sm space-y-5 border border-[#E2E2DA] bg-white shadow-xs">
        <h3 className="font-editorial text-3xl text-[#18181F]">
          Who It’s For
        </h3>
        <p className="font-mono-clean text-xs text-[#5A5A66]">
          This work is for artists who:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono-clean text-xs text-[#18181F] pt-1">
          <div className="flex items-center gap-3 p-3.5 bg-[#F8F8F5] rounded-sm border border-[#E8E8E2]">
            <CheckCircle2 className="w-4 h-4 text-[#3B6141] flex-shrink-0" />
            <span>Care about clarity and emotion</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-[#F8F8F5] rounded-sm border border-[#E8E8E2]">
            <CheckCircle2 className="w-4 h-4 text-[#3B6141] flex-shrink-0" />
            <span>Value deep collaboration</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-[#F8F8F5] rounded-sm border border-[#E8E8E2]">
            <CheckCircle2 className="w-4 h-4 text-[#3B6141] flex-shrink-0" />
            <span>Respect the process and time</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-[#F8F8F5] rounded-sm border border-[#E8E8E2]">
            <CheckCircle2 className="w-4 h-4 text-[#3B6141] flex-shrink-0" />
            <span>Want longevity, not shortcuts</span>
          </div>
        </div>
      </section>

      {/* 06. SERVICE TIERS */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E8E2] pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#3B6141] font-semibold block">
            Engagement Tiers
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18181F] mt-1">
            Studio Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#E2E2DA] flex flex-col justify-between bg-white shadow-xs">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#3B6141] font-semibold">
                Tier 01
              </span>
              <h4 className="font-editorial text-2xl text-[#18181F]">
                Stereo Mastering
              </h4>
              <p className="font-mono-clean text-xs text-[#5A5A66]">
                Warmth, dynamic headroom, translation across all consumer and club playback systems.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#7E7E8B] space-y-1 pt-2">
                <li>• 24-bit Lossless Master</li>
                <li>• Streaming Optimized LUFS</li>
                <li>• 2 Revision Rounds</li>
              </ul>
            </div>
            <Link
              href="/contact?service=mastering"
              className="ghost-btn w-full py-2.5 text-xs text-center block mt-4 rounded-xs"
            >
              Inquire
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#3B6141]/30 bg-[#F5FAF6] flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#3B6141] font-bold">
                Tier 02 // Core
              </span>
              <h4 className="font-editorial text-2xl text-[#18181F]">
                Full Mix Engineering
              </h4>
              <p className="font-mono-clean text-xs text-[#5A5A66]">
                Complete multi-track mixdown, phase alignment, vocal chain sculpting, and spatial dimension.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#7E7E8B] space-y-1 pt-2">
                <li>• Full Stems Processing</li>
                <li>• Analog Summing & Vocal Glue</li>
                <li>• Instrumental & Acapella Passes</li>
              </ul>
            </div>
            <Link
              href="/contact?service=mixing"
              className="ghost-btn w-full py-2.5 text-xs text-center block mt-4 bg-white rounded-xs"
            >
              Inquire
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#9C7A2E]/30 bg-white flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#9C7A2E] font-semibold">
                Tier 03 // Comprehensive
              </span>
              <h4 className="font-editorial text-2xl text-[#18181F]">
                Mix + Master Package
              </h4>
              <p className="font-mono-clean text-xs text-[#5A5A66]">
                End-to-end sonic treatment from raw stems to final commercial release master.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#7E7E8B] space-y-1 pt-2">
                <li>• Complete Mix + Master Pipeline</li>
                <li>• Direct Artist Phone/Video Consult</li>
                <li>• Priority Studio Turnaround</li>
              </ul>
            </div>
            <Link
              href="/contact?service=package"
              className="ghost-btn-gold w-full py-2.5 text-xs text-center block mt-4 rounded-xs"
            >
              Inquire
            </Link>
          </div>
        </div>
      </section>

      {/* 07. CLOSING CTA */}
      <section className="text-center py-10 space-y-5 border-t border-[#E8E8E2]">
        <blockquote className="font-editorial text-3xl sm:text-4xl text-[#18181F] italic max-w-lg mx-auto">
          &ldquo;If the work resonates, reach out. We’ll start with a conversation.&rdquo;
        </blockquote>
        <div className="pt-2">
          <Link
            href="/contact"
            className="ghost-btn px-8 py-3.5 text-sm inline-flex items-center gap-2 rounded-xs"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
