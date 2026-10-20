'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[#E5E5DE] bg-[#F1F1EB] py-16 text-[#5A5A66]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="FPwonderful Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-editorial text-2xl text-[#18181F] tracking-wide block">
                FPwonderful
              </span>
            </div>
            <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66] max-w-xs">
              Recording artist, producer, and mixing & mastering engineer based in Chicago, IL.
            </p>
            <p className="font-mono-clean text-[11px] text-[#4D7853]">
              41.8781° N, 87.6298° W // 312
            </p>
          </div>

          {/* Col 2: Navigation & Archive */}
          <div className="space-y-2 font-mono-clean text-xs">
            <span className="block text-[11px] uppercase tracking-widest text-[#4D7853] font-semibold mb-3">
              Index
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/music" className="hover:text-[#18181F] transition-colors">
                DOOMgang☥ Archive
              </Link>
              <Link href="/mixing-mastering" className="hover:text-[#18181F] transition-colors">
                Mixing & Mastering
              </Link>
              <Link href="/beat-shop" className="hover:text-[#18181F] transition-colors">
                + Wonderful Beat Shop +
              </Link>
              <Link href="/about" className="hover:text-[#18181F] transition-colors">
                About & Notes
              </Link>
            </div>
          </div>

          {/* Col 3: Direct Link & Ethos */}
          <div className="space-y-3 font-mono-clean text-xs">
            <span className="block text-[11px] uppercase tracking-widest text-[#4D7853] font-semibold mb-3">
              Transmission
            </span>
            <p className="text-xs text-[#5A5A66]">
              Direct inquiries:{' '}
              <a
                href="mailto:fpwonderful.music@gmail.com"
                className="text-[#3B6141] font-semibold hover:underline"
              >
                fpwonderful.music@gmail.com
              </a>
            </p>
            <p className="text-xs text-[#5A5A66]">
              Discography on Bandcamp:{' '}
              <a
                href="https://fpwonderful.bandcamp.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#8C6D27] font-semibold hover:underline"
              >
                fpwonderful.bandcamp.com
              </a>
            </p>
            <p className="text-[12px] text-[#18181F]/70 italic font-editorial text-sm pt-2">
              &ldquo;In music — and in life — less but better.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#E5E5DE] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono-clean text-[11px] text-[#7E7E8B]">
          <div>© {new Date().getFullYear()} FPwonderful. All rights reserved.</div>
          <div>Crafted with intention. Sound with soul.</div>
        </div>
      </div>
    </footer>
  );
};
