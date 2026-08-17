'use client';

import React from 'react';
import { useMiniPlayer } from './MiniPlayerContext';

export const LiminalBackdrop: React.FC = () => {
  const { ambientColor } = useMiniPlayer();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#1F1F29]">
      {/* Smooth, subtle ambient tone in background without any moving static or particles */}
      <div
        className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 transition-all duration-1000"
        style={{ backgroundColor: ambientColor || '#ACE1AF' }}
      />
      <div
        className="absolute bottom-10 -right-48 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 transition-all duration-1000"
        style={{ backgroundColor: '#556B2F' }}
      />
    </div>
  );
};
