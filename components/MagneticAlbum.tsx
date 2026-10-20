'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Track } from '@/lib/types';
import { useMiniPlayer } from './MiniPlayerContext';
import { Play, ExternalLink } from 'lucide-react';

interface MagneticAlbumProps {
  track: Track;
  index: number;
}

export const MagneticAlbum: React.FC<MagneticAlbumProps> = ({ track, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { playTrack, setAmbientColor } = useMiniPlayer();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull (max 10px shift + subtle 3D tilt)
    const moveX = (x / rect.width) * 12;
    const moveY = (y / rect.height) * 12;
    const rotateX = -(y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;

    setTransformStyle(
      `perspective(800px) translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (track.accentColor) {
      setAmbientColor(track.accentColor);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(800px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group transition-all duration-300 ease-out"
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      <div className="glass-panel rounded-sm p-6 sm:p-8 border border-[#E2E2DA] hover:border-[#3B6141]/40 transition-all duration-300 relative overflow-hidden bg-white/90 shadow-xs">
        {/* Subtle top-left indicator */}
        <div className="flex items-center justify-between font-mono-clean text-[11px] text-[#5B6E38] mb-5 border-b border-[#E8E8E2] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#D95328] font-bold">{`[0${index + 1}]`}</span>
            <span className="uppercase tracking-widest">{track.category || 'archive'}</span>
          </div>
          <div className="flex items-center gap-3">
            {track.year && <span>{track.year}</span>}
            {track.duration && <span className="text-[#7E7E8B]">{track.duration}</span>}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Album Cover Art / Graphic Node */}
          <div className="md:col-span-4 relative aspect-square bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm overflow-hidden flex items-center justify-center group-hover:shadow-md transition-shadow">
            <div className="relative z-10 text-center p-4 flex flex-col items-center">
              <div className="relative w-16 h-16 mb-2.5">
                <Image
                  src="/images/logo.png"
                  alt="DOOMgang Insignia"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-mono-clean text-[10px] tracking-widest text-[#5B6E38] uppercase block font-semibold">
                DOOMgang☥
              </span>
              <span className="font-editorial text-sm text-[#18181F] block mt-0.5">
                {track.title}
              </span>
            </div>
          </div>

          {/* Album Details & Ethos */}
          <div className="md:col-span-8 space-y-3.5">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#18181F] tracking-wide group-hover:text-[#3B6141] transition-colors">
                {track.title}
              </h3>
              <p className="font-mono-clean text-xs text-[#5B6E38] mt-1 font-medium">
                {track.artist}
              </p>
            </div>

            {track.notes && (
              <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66] max-w-xl">
                {track.notes}
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => playTrack(track)}
                className="ghost-btn px-4 py-2 text-xs flex items-center gap-2 rounded-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Quick Stream
              </button>

              {track.bandcampUrl && (
                <a
                  href={track.bandcampUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn-gold px-4 py-2 text-xs flex items-center gap-1.5 rounded-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Bandcamp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
