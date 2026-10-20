'use client';

import React from 'react';
import { useMiniPlayer } from './MiniPlayerContext';

export const LiminalBackdrop: React.FC = () => {
  const { ambientColor } = useMiniPlayer();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#F8F8F5]">
      {/* Soft daylight ambient orbs */}
      <div
        className="absolute top-1/6 -left-48 w-[680px] h-[680px] rounded-full blur-[140px] opacity-40 transition-all duration-1000"
        style={{ backgroundColor: ambientColor ? `${ambientColor}33` : '#E2EFE4' }}
      />
      <div
        className="absolute bottom-12 -right-48 w-[580px] h-[580px] rounded-full blur-[160px] opacity-35 transition-all duration-1000"
        style={{ backgroundColor: '#F4EFE3' }}
      />
      {/* Subtle fine architectural grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#18181F 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
