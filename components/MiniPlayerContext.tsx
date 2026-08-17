'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track } from '@/lib/types';
import { audioEngine } from '@/lib/audio';

interface MiniPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isVisible: boolean;
  activeBeatId: string | null;
  ambientColor: string;
  setAmbientColor: (color: string) => void;
  playTrack: (track: Track) => void;
  playBeat: (id: string, bpm: number, mood?: string, trackDetails?: Track) => void;
  togglePlay: () => void;
  stopPlayback: () => void;
  closePlayer: () => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  isVisible: false,
  activeBeatId: null,
  ambientColor: '#ACE1AF',
  setAmbientColor: () => {},
  playTrack: () => {},
  playBeat: () => {},
  togglePlay: () => {},
  stopPlayback: () => {},
  closePlayer: () => {},
});

export const MiniPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeBeatId, setActiveBeatId] = useState<string | null>(null);
  const [ambientColor, setAmbientColor] = useState<string>('#ACE1AF');

  const stopPlayback = () => {
    if (audioEngine) {
      audioEngine.stop();
    }
    setIsPlaying(false);
    setActiveBeatId(null);
  };

  const playTrack = (track: Track) => {
    stopPlayback();
    setCurrentTrack(track);
    setIsVisible(true);
    setIsPlaying(true);
    if (track.accentColor) {
      setAmbientColor(track.accentColor);
    }
    if (audioEngine) {
      const bpm = track.bpm || 120;
      audioEngine.playSynthesizedBeat(track.id, bpm, 'chill');
    }
  };

  const playBeat = (id: string, bpm: number, mood: string = 'chill', trackDetails?: Track) => {
    if (activeBeatId === id && isPlaying) {
      stopPlayback();
      return;
    }

    stopPlayback();
    setActiveBeatId(id);
    setIsPlaying(true);
    setIsVisible(true);

    const track: Track = trackDetails || {
      id,
      title: `Beat ${id}`,
      artist: 'FPwonderful',
      bpm,
      accentColor: '#ACE1AF',
    };

    setCurrentTrack(track);
    if (track.accentColor) {
      setAmbientColor(track.accentColor);
    }

    if (audioEngine) {
      audioEngine.playSynthesizedBeat(id, bpm, mood);
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);
      if (audioEngine) {
        audioEngine.playSynthesizedBeat(currentTrack.id, currentTrack.bpm || 120, 'chill');
      }
    }
  };

  const closePlayer = () => {
    stopPlayback();
    setIsVisible(false);
    setCurrentTrack(null);
  };

  useEffect(() => {
    return () => {
      if (audioEngine) {
        audioEngine.stop();
      }
    };
  }, []);

  return (
    <MiniPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isVisible,
        activeBeatId,
        ambientColor,
        setAmbientColor,
        playTrack,
        playBeat,
        togglePlay,
        stopPlayback,
        closePlayer,
      }}
    >
      {children}
    </MiniPlayerContext.Provider>
  );
};

export const useMiniPlayer = () => useContext(MiniPlayerContext);
