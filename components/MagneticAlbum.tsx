'use client';

import React, { useRef, useState } from 'react';
import { Track } from '@/lib/types';
import { useMiniPlayer } from './MiniPlayerContext';
import { Play, ExternalLink, Disc, Sparkles } from 'lucide-react';

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

    // Magnetic pull (max 12px shift + subtle 3D tilt)
    const moveX = (x / rect.width) * 16;
    const moveY = (y / rect.height) * 16;
    const rotateX = -(y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;

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
      <div className="glass-panel rounded-sm p-6 sm:p-8 border border-[#ACE1AF]/15 hover:border-[#ACE1AF]/50 transition-all duration-300 relative overflow-hidden">
        {/* Subtle top-left indicator */}
        <div className="flex items-center justify-between font-mono-clean text-[11px] text-[#ACE1AF]/80 mb-6 border-b border-[#F9F4F4]/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#FF7F50]">{`[0${index + 1}]`}</span>
            <span className="uppercase tracking-widest">{track.category || 'archive'}</span>
          </div>
          <div className="flex items-center gap-3">
            {track.year && <span>{track.year}</span>}
            {track.duration && <span className="text-[#F9F4F4]/40">{track.duration}</span>}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Album Cover Art / Graphic Node */}
          <div className="md:col-span-4 relative aspect-square bg-[#0E0E12] border border-[#ACE1AF]/20 rounded-sm overflow-hidden flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(172,225,175,0.15)] transition-shadow">
            {/* Generative Album Art Canvas / Aesthetic Badge */}
            <div
              className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-35"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${track.accentColor || '#ACE1AF'} 0%, #121217 70%)`,
              }}
            />
            <div className="relative z-10 text-center p-4">
              <Disc
                className="w-12 h-12 mx-auto text-[#ACE1AF] opacity-80 group-hover:rotate-45 transition-transform duration-700 mb-2"
              />
              <span className="font-mono-clean text-[10px] tracking-widest text-[#F9F4F4]/60 uppercase block">
                DOOMgang☥
              </span>
              <span className="font-editorial text-sm text-[#ACE1AF] block">
                {track.title}
              </span>
            </div>
          </div>

          {/* Album Details & Ethos */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F9F4F4] tracking-wide group-hover:text-[#ACE1AF] transition-colors">
                {track.title}
              </h3>
              <p className="font-mono-clean text-xs text-[#ACE1AF]/90 mt-1">
                {track.artist}
              </p>
            </div>

            {track.notes && (
              <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/70 max-w-xl">
                {track.notes}
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => playTrack(track)}
                className="ghost-btn px-4 py-2 text-xs flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Quick Stream
              </button>

              {track.bandcampUrl && (
                <a
                  href={track.bandcampUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn-gold px-4 py-2 text-xs flex items-center gap-1.5"
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
