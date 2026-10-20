'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

const STARTER_NOTES = [
  {
    id: 'note-1',
    num: '01',
    text: 'Clarity often comes from removing, not adding.',
    context: 'In mixing, the first instinct when something is masked is to boost. The lasting solution is usually carving away the unnecessary frequencies that suffocated it.',
  },
  {
    id: 'note-2',
    num: '02',
    text: 'Burnout is not a requirement for great work.',
    context: 'The industry glorifies exhaustion and frantic output. Longevity and true depth require quiet seasons and sustainable rhythms.',
  },
  {
    id: 'note-3',
    num: '03',
    text: 'A rested mind hears more than tired ears.',
    context: 'Ear fatigue distorts judgment. High standards require knowing when to walk away from the monitors so you can hear the truth tomorrow.',
  },
  {
    id: 'note-4',
    num: '04',
    text: 'Finish the record. Protect the process.',
    context: 'Perfectionism is fear in disguise. Excellence is finishing with intention, trusting your instincts, and letting the work exist in the world.',
  },
  {
    id: 'note-5',
    num: '05',
    text: 'Trust is a creative tool.',
    context: 'Without trust between the artist and engineer, decisions become defensive. With trust, vulnerability translates into timeless sound.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* 01. ABOUT: PERSON BEFORE PRACTICE */}
      <section className="space-y-8 border-b border-[#E8E8E2] pb-14">
        <div className="flex items-center gap-2.5 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
          <div className="relative w-4 h-4 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="FP Logo"
              width={16}
              height={16}
              className="w-full h-full object-contain"
            />
          </div>
          <span>Chicago, IL // Profile</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl text-[#18181F] leading-[1.14]">
          FPwonderful is a <span className="italic text-[#3B6141]">person</span> before it’s a practice.
        </h1>

        <div className="font-mono-clean text-sm sm:text-base text-[#5A5A66] space-y-5 leading-relaxed">
          <p>
            I’m a recording artist, producer, and mixing & mastering engineer based in Chicago.
          </p>
          <p>
            I came to engineering through making records — not the other way around.
            That perspective still guides how I work today.
          </p>
          <p>
            I believe sound is emotional language. Technical skill matters, but listening matters more.
          </p>
          <p>
            Creativity doesn’t exist in isolation. Mental clarity, physical health, and emotional balance all shape the work — and how long an artist can sustain it.
          </p>
          <p>
            My approach is rooted in restraint, intention, and trust. I don’t chase excess. I protect the feeling.
          </p>
          <p>
            Everything here is part of an ongoing practice — to create honestly, work with care, and stay present.
          </p>
        </div>

        <div className="p-6 bg-[#F5FAF6] border-l-3 border-l-[#3B6141] rounded-xs font-editorial text-2xl text-[#18181F] italic shadow-xs">
          &ldquo;This work is about alignment — between sound, mind, and body.&rdquo;
        </div>
      </section>

      {/* 02. NOTES FROM THE PRACTICE */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#9C7A2E] font-mono-clean text-xs uppercase tracking-widest font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Field Notes // Ongoing Study</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18181F]">
            Notes from the practice.
          </h2>
          <p className="font-mono-clean text-xs sm:text-sm text-[#5A5A66]">
            Observations on sound, creativity, health, and balance.
          </p>
        </div>

        {/* Notes Grid / Feed */}
        <div className="space-y-5">
          {STARTER_NOTES.map((note) => (
            <div
              key={note.id}
              className="glass-panel p-6 sm:p-7 rounded-sm space-y-3 border border-[#E2E2DA] hover:border-[#3B6141]/30 transition-all bg-white shadow-xs"
            >
              <div className="flex items-center justify-between font-mono-clean text-xs text-[#3B6141] font-semibold">
                <span>{`[ ENTRY // ${note.num} ]`}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#7E7E8B]">
                  Ethos
                </span>
              </div>

              <blockquote className="font-editorial text-2xl sm:text-3xl text-[#18181F] leading-snug">
                &ldquo;{note.text}&rdquo;
              </blockquote>

              <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66] pt-0.5">
                {note.context}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
