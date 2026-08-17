'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SlidersHorizontal, Sparkles } from 'lucide-react';
import { audioEngine } from '@/lib/audio';

interface BeforeAfterPlayerProps {
  id: string;
  title: string;
  genre: string;
  description: string;
}

export const BeforeAfterPlayer: React.FC<BeforeAfterPlayerProps> = ({
  id,
  title,
  genre,
  description,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(0.5); // 0 = unmixed, 1 = mastered
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioSourceRef = useRef<ReturnType<typeof audioEngine.createDualSynchronizedSource> | null>(null);

  // Stop playback when component unmounts
  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      setIsPlaying(false);
    } else {
      if (audioEngine) {
        audioEngine.stop(); // Stop other audio instances
        const source = audioEngine.createDualSynchronizedSource(id);
        source.setCrossfade(sliderPos);
        source.start();
        audioSourceRef.current = source;
        setIsPlaying(true);
      }
    }
  };

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setSliderPos(ratio);
    if (audioSourceRef.current) {
      audioSourceRef.current.setCrossfade(ratio);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updateSlider(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateSlider]);

  // Real-time Waveform / Frequency pixel-line canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;
    const freqData = new Uint8Array(32);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying && audioSourceRef.current) {
        try {
          audioSourceRef.current.getAnalyserData(freqData);
        } catch {
          // fallback
        }
      }

      phase += 0.05;
      const midY = canvas.height / 2;
      const sliderX = sliderPos * canvas.width;

      // Draw single continuous dynamic pixel line
      const points = 120;
      const step = canvas.width / points;

      ctx.lineWidth = 2;

      for (let i = 0; i < points - 1; i++) {
        const x1 = i * step;
        const x2 = (i + 1) * step;

        const freqVal = isPlaying ? (freqData[i % freqData.length] / 255) * 14 : 0;
        const wave = Math.sin(i * 0.15 + phase) * (isPlaying ? 8 + freqVal : 3);
        const y1 = midY + wave;
        const y2 = midY + Math.sin((i + 1) * 0.15 + phase) * (isPlaying ? 8 + freqVal : 3);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        // Dynamic color split based on slider position
        if (x1 < sliderX) {
          ctx.strokeStyle = '#555566'; // Dim Gray for Unmixed
        } else {
          ctx.strokeStyle = '#ACE1AF'; // Celadon Glow for Mastered
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, sliderPos]);

  return (
    <div className="glass-panel rounded-sm p-6 sm:p-8 border border-[#ACE1AF]/20 hover:border-[#ACE1AF]/40 transition-all space-y-6">
      {/* Title & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F9F4F4]/5 pb-4">
        <div>
          <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
            {genre}
          </span>
          <h4 className="font-editorial text-xl sm:text-2xl text-[#F9F4F4] mt-0.5">
            {title}
          </h4>
        </div>
        <button
          onClick={togglePlayback}
          className={`flex items-center gap-2 px-5 py-2 rounded-sm font-mono-clean text-xs uppercase tracking-wider transition-all self-start sm:self-auto ${
            isPlaying
              ? 'bg-[#ACE1AF] text-[#121217] shadow-[0_0_20px_rgba(172,225,175,0.4)]'
              : 'border border-[#ACE1AF]/40 text-[#ACE1AF] hover:bg-[#ACE1AF]/10'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Playing Synced Stream</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Hear Sonic Reveal</span>
            </>
          )}
        </button>
      </div>

      {description && (
        <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/70">
          {description}
        </p>
      )}

      {/* Synchronized Draggable A/B Reveal Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        className="relative h-36 bg-[#0E0E12]/90 rounded-sm border border-[#ACE1AF]/15 cursor-ew-resize select-none overflow-hidden"
      >
        {/* Background Visualizer Canvas */}
        <canvas
          ref={canvasRef}
          width={600}
          height={144}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Shading Overlays */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-[#121217]/50 pointer-events-none transition-all"
          style={{ width: `${sliderPos * 100}%` }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 bg-[#ACE1AF]/5 pointer-events-none transition-all"
          style={{ width: `${(1 - sliderPos) * 100}%` }}
        />

        {/* Draggable Vertical Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#ACE1AF] shadow-[0_0_15px_#ACE1AF] pointer-events-none"
          style={{ left: `${sliderPos * 100}%` }}
        >
          {/* Neon Handle with icon */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#121217] border-2 border-[#ACE1AF] flex items-center justify-center shadow-[0_0_12px_#ACE1AF]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ACE1AF]" />
          </div>
        </div>

        {/* Bottom Corner Labels */}
        <div className="absolute bottom-2.5 left-4 pointer-events-none">
          <span
            className={`font-mono-clean text-[10px] uppercase tracking-[0.25em] transition-colors ${
              sliderPos < 0.5 ? 'text-[#F9F4F4] font-bold' : 'text-[#F9F4F4]/40'
            }`}
          >
            UNMIXED // RAW
          </span>
        </div>
        <div className="absolute bottom-2.5 right-4 pointer-events-none">
          <span
            className={`font-mono-clean text-[10px] uppercase tracking-[0.25em] transition-colors ${
              sliderPos >= 0.5 ? 'text-[#ACE1AF] font-bold shadow-sm' : 'text-[#F9F4F4]/40'
            }`}
          >
            MASTERED // POLISHED
          </span>
        </div>

        {/* Helper Hint */}
        <div className="absolute top-2.5 inset-x-0 text-center pointer-events-none">
          <span className="font-mono-clean text-[9px] uppercase tracking-widest text-[#F9F4F4]/30">
            ← Drag slider horizontally to crossfade in real time →
          </span>
        </div>
      </div>
    </div>
  );
};
