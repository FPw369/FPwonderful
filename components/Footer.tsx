'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[#ACE1AF]/10 bg-[#0E0E12] py-16 text-[#F9F4F4]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="FPwonderful Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(172,225,175,0.25)]"
                />
              </div>
              <span className="font-editorial text-2xl text-[#F9F4F4] tracking-wide block">
                FPwonderful
              </span>
            </div>
            <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/60 max-w-xs">
              Recording artist, producer, and mixing & mastering engineer based in Chicago, IL.
            </p>
            <p className="font-mono-clean text-[11px] text-[#ACE1AF]/70">
              41.8781° N, 87.6298° W // 312
            </p>
          </div>

          {/* Col 2: Navigation & Archive */}
          <div className="space-y-2 font-mono-clean text-xs">
            <span className="block text-[11px] uppercase tracking-widest text-[#ACE1AF] mb-3">
              Index
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/music" className="hover:text-[#F9F4F4] transition-colors">
                DOOMgang☥ Archive
              </Link>
              <Link href="/mixing-mastering" className="hover:text-[#F9F4F4] transition-colors">
                Mixing & Mastering Sanctuary
              </Link>
              <Link href="/beat-shop" className="hover:text-[#F9F4F4] transition-colors">
                + Wonderful Beat Shop +
              </Link>
              <Link href="/about" className="hover:text-[#F9F4F4] transition-colors">
                About & Practice Notes
              </Link>
            </div>
          </div>

          {/* Col 3: Direct Link & Ethos */}
          <div className="space-y-3 font-mono-clean text-xs">
            <span className="block text-[11px] uppercase tracking-widest text-[#ACE1AF] mb-3">
              Transmission
            </span>
            <p className="text-xs text-[#F9F4F4]/70">
              Direct inquiries:{' '}
              <a
                href="mailto:fpwonderful.music@gmail.com"
                className="text-[#ACE1AF] hover:underline"
              >
                fpwonderful.music@gmail.com
              </a>
            </p>
            <p className="text-xs text-[#F9F4F4]/50">
              Discography on Bandcamp:{' '}
              <a
                href="https://fpwonderful.bandcamp.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#C9A84C] hover:underline"
              >
                fpwonderful.bandcamp.com
              </a>
            </p>
            <p className="text-[11px] text-[#F9F4F4]/40 italic font-editorial text-sm pt-2">
              &ldquo;In music — and in life — less but better.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#F9F4F4]/5 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono-clean text-[11px] text-[#F9F4F4]/30">
          <div>© {new Date().getFullYear()} FPwonderful. All rights reserved.</div>
          <div>Crafted with intention. Sound with soul.</div>
        </div>
      </div>
    </footer>
  );
};
