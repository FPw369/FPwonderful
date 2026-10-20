'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMiniPlayer } from './MiniPlayerContext';
import { Play, Pause, X } from 'lucide-react';
import { audioEngine } from '@/lib/audio';

export const MiniPlayer: React.FC = () => {
  const { currentTrack, isPlaying, isVisible, togglePlay, closePlayer } = useMiniPlayer();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Audio Visualizer in MiniPlayer
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dataArray = new Uint8Array(32);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying && audioEngine) {
        try {
          const analyser = audioEngine.getAnalyser();
          analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
        } catch {
          // ignore
        }
      }

      const barCount = 18;
      const barWidth = 3;
      const gap = 2;
      const totalWidth = barCount * (barWidth + gap);
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let val = isPlaying ? (dataArray[i % dataArray.length] / 255) * canvas.height : 3;
        if (!isPlaying) val = 2;
        val = Math.max(2, val);

        const x = startX + i * (barWidth + gap);
        const y = canvas.height - val;

        ctx.fillStyle = isPlaying ? '#4D7853' : 'rgba(77, 120, 83, 0.2)';
        ctx.fillRect(x, y, barWidth, val);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isPlaying]);

  if (!isVisible || !currentTrack) return null;

  return (
    <aside aria-label="Audio Mini Player" className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-8 sm:w-[460px] z-50 transition-all duration-300">
      <div className="bg-[#FFFFFF]/95 backdrop-blur-xl rounded-md p-3.5 border border-[#E2E2DA] shadow-xl flex items-center justify-between gap-4">
        {/* Track Info & Visualizer */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-11 h-11 bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 shadow-xs">
            <Image
              src="/images/logo.png"
              alt="Track Art"
              width={36}
              height={36}
              className={`w-full h-full object-contain ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            />
          </div>
          <div className="overflow-hidden pr-2">
            <div className="font-mono-clean text-xs font-bold text-[#18181F] truncate">
              {currentTrack.title}
            </div>
            <div className="font-mono-clean text-[10px] text-[#5A5A66] truncate">
              {currentTrack.artist} {currentTrack.bpm ? `• ${currentTrack.bpm} BPM` : ''}
            </div>
          </div>
        </div>

        {/* Dynamic EQ Visualizer Canvas */}
        <div className="hidden sm:block w-24 h-7 flex-shrink-0">
          <canvas ref={canvasRef} width={96} height={28} className="w-full h-full block" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#3B6141] text-[#FFFFFF] flex items-center justify-center hover:bg-[#2F4F35] hover:scale-105 transition-all shadow-xs"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={closePlayer}
            className="p-1.5 text-[#7E7E8B] hover:text-[#D95328] transition-colors"
            aria-label="Close player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
