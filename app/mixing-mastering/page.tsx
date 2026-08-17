'use client';

import React from 'react';
import Link from 'next/link';
import { BeforeAfterPlayer } from '@/components/BeforeAfterPlayer';
import { COMPARISON_GALLERY, PREVIOUS_WORK_PLAYLIST } from '@/lib/discography';
import { useMiniPlayer } from '@/components/MiniPlayerContext';
import { Sliders, CheckCircle2, ArrowRight, Play, Disc } from 'lucide-react';

export default function MixingMasteringPage() {
  const { playTrack } = useMiniPlayer();

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 01. HEADER & OPENING */}
      <section className="space-y-6 border-b border-[#ACE1AF]/20 pb-12">
        <div className="flex items-center gap-2 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
          <Sliders className="w-4 h-4" />
          <span>Precision Engineering // Acoustic Sanctuary</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-[#F9F4F4] tracking-tight leading-[1.1]">
          Mixing and mastering is an extension of how I listen.
        </h1>
      </section>

      {/* 02. PHILOSOPHY & HOW I WORK */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start font-mono-clean text-sm text-[#F9F4F4]/80 leading-relaxed">
        {/* Philosophy Card */}
        <div className="glass-panel p-8 rounded-sm space-y-4 border-l-2 border-l-[#ACE1AF]">
          <span className="text-xs uppercase tracking-widest text-[#ACE1AF] block font-bold">
            Philosophy
          </span>
          <p className="text-base text-[#F9F4F4] font-medium">
            I work with artists, not files.
          </p>
          <p>
            The goal isn’t to over-process or impress. It’s to bring clarity to what’s already there.
          </p>
          <p className="text-xs text-[#F9F4F4]/70 pt-2">
            The process is rooted in balance, restraint, and intention — protecting the emotion of the record while helping it translate.
          </p>
        </div>

        {/* How I Work Card */}
        <div className="glass-panel p-8 rounded-sm space-y-4 border-l-2 border-l-[#C9A84C]">
          <span className="text-xs uppercase tracking-widest text-[#C9A84C] block font-bold">
            How I Work
          </span>
          <p className="text-base text-[#F9F4F4] font-medium">
            Communication matters. Trust matters.
          </p>
          <p>
            There’s no formula. Every record asks for something different.
          </p>
          <p className="text-xs text-[#F9F4F4]/70 pt-2">
            Familiarity with FL Studio, Pro Tools and modern DAWs allows technical decisions without losing the feeling.
          </p>
        </div>
      </section>

      {/* 03. THE SONIC REVEAL (SYNCHRONIZED A/B PLAYERS) */}
      <section className="space-y-8">
        <div className="border-b border-[#F9F4F4]/10 pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#ACE1AF] block">
            Interactive Analysis
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F9F4F4] mt-1">
            The Sonic Reveal
          </h2>
          <p className="font-mono-clean text-xs text-[#F9F4F4]/60 mt-1 max-w-xl">
            Hear raw mixes crossfaded against finished masters in real-time, sample-accurate synchronization.
          </p>
        </div>

        <div className="space-y-8">
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
      <section className="space-y-8">
        <div className="border-b border-[#F9F4F4]/10 pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#C9A84C] block">
            Client & Collaborative Works
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F9F4F4] mt-1">
            Published Records Playlist
          </h2>
        </div>

        <div className="glass-panel rounded-sm overflow-hidden divide-y divide-[#F9F4F4]/5">
          {PREVIOUS_WORK_PLAYLIST.map((work, idx) => (
            <div
              key={work.id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1F1F29]/50 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="font-mono-clean text-xs text-[#ACE1AF]">
                  {`0${idx + 1}`}
                </span>
                <div>
                  <h4 className="font-editorial text-xl text-[#F9F4F4]">
                    {work.title}
                  </h4>
                  <p className="font-mono-clean text-xs text-[#F9F4F4]/60">
                    {work.artist} ({work.year})
                  </p>
                  {work.notes && (
                    <p className="font-mono-clean text-[11px] text-[#ACE1AF]/80 mt-1">
                      {work.notes}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => playTrack(work)}
                className="ghost-btn px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto flex-shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 05. WHO THIS IS FOR */}
      <section className="glass-panel p-8 sm:p-12 rounded-sm space-y-6 border border-[#ACE1AF]/20">
        <h3 className="font-editorial text-3xl text-[#F9F4F4]">
          Who It’s For
        </h3>
        <p className="font-mono-clean text-xs text-[#F9F4F4]/70">
          This work is for artists who:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-clean text-xs text-[#F9F4F4]/90 pt-2">
          <div className="flex items-center gap-3 p-3 bg-[#121217] rounded-sm border border-[#F9F4F4]/5">
            <CheckCircle2 className="w-4 h-4 text-[#ACE1AF] flex-shrink-0" />
            <span>Care about clarity and emotion</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#121217] rounded-sm border border-[#F9F4F4]/5">
            <CheckCircle2 className="w-4 h-4 text-[#ACE1AF] flex-shrink-0" />
            <span>Value deep collaboration</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#121217] rounded-sm border border-[#F9F4F4]/5">
            <CheckCircle2 className="w-4 h-4 text-[#ACE1AF] flex-shrink-0" />
            <span>Respect the process and time</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#121217] rounded-sm border border-[#F9F4F4]/5">
            <CheckCircle2 className="w-4 h-4 text-[#ACE1AF] flex-shrink-0" />
            <span>Want longevity, not shortcuts</span>
          </div>
        </div>
      </section>

      {/* 06. SERVICE TIERS & CTA */}
      <section className="space-y-8">
        <div className="border-b border-[#F9F4F4]/10 pb-4">
          <span className="font-mono-clean text-xs uppercase tracking-widest text-[#ACE1AF] block">
            Engagement Tiers
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F9F4F4] mt-1">
            Studio Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#ACE1AF]/20 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#ACE1AF]">
                Tier 01
              </span>
              <h4 className="font-editorial text-2xl text-[#F9F4F4]">
                Stereo Mastering
              </h4>
              <p className="font-mono-clean text-xs text-[#F9F4F4]/70">
                Analog warmth, dynamic depth, translation across all consumer and club playback systems.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#F9F4F4]/60 space-y-1 pt-2">
                <li>• 24-bit Lossless Master</li>
                <li>• Streaming Optimized LUFS</li>
                <li>• 2 Revision Rounds included</li>
              </ul>
            </div>
            <Link
              href="/contact?service=mastering"
              className="ghost-btn w-full py-2.5 text-xs text-center block mt-4"
            >
              Inquire
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#ACE1AF]/40 bg-[#ACE1AF]/5 flex flex-col justify-between shadow-[0_0_30px_rgba(172,225,175,0.08)]">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#ACE1AF]">
                Tier 02 // Core
              </span>
              <h4 className="font-editorial text-2xl text-[#F9F4F4]">
                Full Mix Engineering
              </h4>
              <p className="font-mono-clean text-xs text-[#F9F4F4]/70">
                Complete multi-track mixdown, surgical phase alignment, vocal chain sculpting, and spatial dimension.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#F9F4F4]/60 space-y-1 pt-2">
                <li>• Full Stems Processing</li>
                <li>• Analog Summing & Vocal Glue</li>
                <li>• Instrumental & Acapella Passes</li>
              </ul>
            </div>
            <Link
              href="/contact?service=mixing"
              className="ghost-btn w-full py-2.5 text-xs text-center block mt-4 bg-[#ACE1AF]/10"
            >
              Inquire
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-6 rounded-sm space-y-4 border border-[#C9A84C]/30 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono-clean text-xs uppercase tracking-widest text-[#C9A84C]">
                Tier 03 // Comprehensive
              </span>
              <h4 className="font-editorial text-2xl text-[#F9F4F4]">
                Mix + Master Package
              </h4>
              <p className="font-mono-clean text-xs text-[#F9F4F4]/70">
                End-to-end sonic treatment from raw stems to final commercial release master.
              </p>
              <ul className="font-mono-clean text-[11px] text-[#F9F4F4]/60 space-y-1 pt-2">
                <li>• Complete Mix + Master Pipeline</li>
                <li>• Direct Artist Phone/Video Consult</li>
                <li>• Priority Studio Turnaround</li>
              </ul>
            </div>
            <Link
              href="/contact?service=package"
              className="ghost-btn-gold w-full py-2.5 text-xs text-center block mt-4"
            >
              Inquire
            </Link>
          </div>
        </div>
      </section>

      {/* 07. CLOSING CTA */}
      <section className="text-center py-12 space-y-6 border-t border-[#F9F4F4]/10">
        <blockquote className="font-editorial text-3xl sm:text-4xl text-[#F9F4F4] italic max-w-xl mx-auto">
          &ldquo;If the work resonates, reach out. We’ll start with a conversation.&rdquo;
        </blockquote>
        <div className="pt-2">
          <Link
            href="/contact"
            className="ghost-btn px-8 py-3.5 text-sm inline-flex items-center gap-2"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
