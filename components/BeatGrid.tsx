'use client';

import React, { useState } from 'react';
import { Beat, CartItem } from '@/lib/types';
import { useMiniPlayer } from './MiniPlayerContext';
import { Play, Pause, ShoppingBag, X, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface BeatGridProps {
  beats: Beat[];
}

export const BeatGrid: React.FC<BeatGridProps> = ({ beats }) => {
  const { activeBeatId, isPlaying, playBeat, stopPlayback } = useMiniPlayer();
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [licenseType, setLicenseType] = useState<'lease' | 'exclusive'>('lease');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  const handlePlayToggle = (beat: Beat) => {
    if (activeBeatId === beat.id && isPlaying) {
      stopPlayback();
    } else {
      playBeat(beat.id, beat.bpm, beat.tags.includes('Dark') ? 'dark' : 'chill', {
        id: beat.id,
        title: beat.title,
        artist: 'FPwonderful',
        bpm: beat.bpm,
        accentColor: beat.accentColor || '#ACE1AF',
      });
    }
  };

  const openLicensingPanel = (beat: Beat) => {
    setSelectedBeat(beat);
    setLicenseType('lease');
  };

  const addToCart = (beat: Beat, type: 'lease' | 'exclusive') => {
    const price = type === 'lease' ? beat.leasePrice : beat.exclusivePrice;
    const newItem: CartItem = {
      id: `${beat.id}-${type}-${Date.now()}`,
      beatId: beat.id,
      title: beat.title,
      bpm: beat.bpm,
      key: beat.key,
      licenseType: type,
      price,
    };
    setCart((prev) => [...prev, newItem]);
    setSelectedBeat(null);
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative space-y-8">
      {/* Top Header / Cart Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ACE1AF]/20 pb-4">
        <div>
          <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
            Instrumental Archive // Direct License
          </span>
          <h3 className="font-editorial text-2xl text-[#F9F4F4]">
            Curated Production Catalog
          </h3>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="relative ghost-btn-papaya px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cart.length})</span>
          {cart.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-ping absolute -top-1 -right-1" />
          )}
        </button>
      </div>

      {/* Cyber Grid Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono-clean text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#ACE1AF]/30 text-[#ACE1AF]/80 uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4 w-12">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">BPM</th>
              <th className="py-3 px-4">Key</th>
              <th className="py-3 px-4 hidden md:table-cell">Tags</th>
              <th className="py-3 px-4">Lease / Excl.</th>
              <th className="py-3 px-4 text-right">License</th>
            </tr>
          </thead>
          <tbody>
            {beats.map((beat, idx) => {
              const isCurrentPlaying = activeBeatId === beat.id && isPlaying;
              return (
                <tr
                  key={beat.id}
                  className={`border-b border-[#F9F4F4]/5 transition-colors group ${
                    isCurrentPlaying
                      ? 'bg-[#ACE1AF]/10 shadow-[0_0_20px_rgba(172,225,175,0.1)]'
                      : 'hover:bg-[#1F1F29]/60'
                  }`}
                >
                  {/* Play Button */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handlePlayToggle(beat)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrentPlaying
                          ? 'bg-[#ACE1AF] text-[#121217]'
                          : 'border border-[#ACE1AF]/30 text-[#ACE1AF] group-hover:border-[#ACE1AF]'
                      }`}
                      aria-label={`Play ${beat.title}`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </td>

                  {/* Title + Mini Visualizer if Playing */}
                  <td className="py-4 px-4 font-bold text-[#F9F4F4]">
                    <div className="flex items-center gap-3">
                      <span>{beat.title}</span>
                      {isCurrentPlaying && (
                        <span className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-2.5 bg-[#ACE1AF] animate-pulse" />
                          <span className="w-0.5 h-3.5 bg-[#ACE1AF] animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-[#ACE1AF] animate-pulse" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* BPM */}
                  <td className="py-4 px-4 text-[#ACE1AF]/90">{beat.bpm}</td>

                  {/* Key */}
                  <td className="py-4 px-4 text-[#F9F4F4]/70">{beat.key}</td>

                  {/* Tags */}
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {beat.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] bg-[#121217] border border-[#F9F4F4]/10 rounded-sm text-[#F9F4F4]/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-mono-clean text-xs">
                    <span className="text-[#ACE1AF]">${beat.leasePrice}</span>
                    <span className="text-[#F9F4F4]/30 mx-1.5">/</span>
                    <span className="text-[#C9A84C]">${beat.exclusivePrice}</span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openLicensingPanel(beat)}
                      className="ghost-btn px-3.5 py-1.5 text-[11px]"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Slide-out Licensing Side Panel */}
      {selectedBeat && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#121217] border-l border-[#ACE1AF]/30 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              {/* Close Button & Header */}
              <div className="flex items-center justify-between border-b border-[#F9F4F4]/10 pb-4">
                <div>
                  <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
                    License Selector
                  </span>
                  <h4 className="font-editorial text-2xl text-[#F9F4F4]">
                    {selectedBeat.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedBeat(null)}
                  className="p-2 text-[#F9F4F4]/60 hover:text-[#F9F4F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Beat Info */}
              <div className="p-3 bg-[#1F1F29]/60 border border-[#ACE1AF]/15 rounded-sm font-mono-clean text-xs flex justify-between">
                <span>Tempo: {selectedBeat.bpm} BPM</span>
                <span>Key: {selectedBeat.key}</span>
              </div>

              {/* License Option Selector Toggle */}
              <div className="space-y-3 font-mono-clean">
                <span className="text-xs uppercase tracking-widest text-[#F9F4F4]/60 block">
                  Select License Agreement:
                </span>

                {/* Lease Card */}
                <div
                  onClick={() => setLicenseType('lease')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    licenseType === 'lease'
                      ? 'border-[#ACE1AF] bg-[#ACE1AF]/10 shadow-[0_0_15px_rgba(172,225,175,0.15)]'
                      : 'border-[#F9F4F4]/10 bg-[#121217]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#F9F4F4]">
                      Standard Lease (MP3)
                    </span>
                    <span className="text-[#ACE1AF] font-bold text-sm">
                      ${selectedBeat.leasePrice}
                    </span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#F9F4F4]/70">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#ACE1AF]" /> High-Quality 320kbps MP3
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#ACE1AF]" /> Up to 50,000 Audio Streams
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#ACE1AF]" /> 1 Music Video & Radio Rights
                    </li>
                  </ul>
                </div>

                {/* Exclusive Card */}
                <div
                  onClick={() => setLicenseType('exclusive')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    licenseType === 'exclusive'
                      ? 'border-[#FF7F50] bg-[#FF7F50]/10 shadow-[0_0_15px_rgba(255,127,80,0.15)]'
                      : 'border-[#F9F4F4]/10 bg-[#121217]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#F9F4F4]">
                      Exclusive Ownership (WAV + Stems)
                    </span>
                    <span className="text-[#FF7F50] font-bold text-sm">
                      ${selectedBeat.exclusivePrice}
                    </span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#F9F4F4]/70">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#FF7F50]" /> 24-bit Lossless WAV + Tracked-Out Stems
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#FF7F50]" /> Unlimited Streaming & Broadcast Rights
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#FF7F50]" /> Beat Removed From Public Store
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#F9F4F4]/10 space-y-3">
              <button
                onClick={() => addToCart(selectedBeat, licenseType)}
                className="w-full ghost-btn-papaya py-3 text-xs flex items-center justify-center gap-2"
              >
                <span>Add to Cart — ${licenseType === 'lease' ? selectedBeat.leasePrice : selectedBeat.exclusivePrice}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#121217] border-l border-[#ACE1AF]/30 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F9F4F4]/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#ACE1AF]" />
                  <h4 className="font-editorial text-2xl text-[#F9F4F4]">Your Cart</h4>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-[#F9F4F4]/60 hover:text-[#F9F4F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="font-mono-clean text-xs text-[#F9F4F4]/50 py-8 text-center">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-3 font-mono-clean text-xs">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#1F1F29]/70 border border-[#F9F4F4]/10 rounded-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-[#F9F4F4]">{item.title}</div>
                        <div className="text-[10px] text-[#ACE1AF] uppercase">
                          {item.licenseType === 'lease' ? 'Lease' : 'Exclusive'} • ${item.price}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-[#F9F4F4]/40 hover:text-[#FF7F50]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-[#F9F4F4]/10 space-y-4 font-mono-clean">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#F9F4F4]/70">Total:</span>
                  <span className="text-[#ACE1AF] font-bold text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                {checkoutSuccess ? (
                  <div className="p-4 bg-[#ACE1AF]/10 border border-[#ACE1AF] rounded-sm text-xs text-[#ACE1AF] space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Order Prepared
                    </div>
                    <p className="text-[11px] text-[#F9F4F4]/80">
                      Files and license contract will be dispatched immediately upon completion.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setCheckoutSuccess(true)}
                    className="w-full ghost-btn-papaya py-3 text-xs flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Direct Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <p className="text-[10px] text-[#F9F4F4]/40 text-center">
                  Direct licensing powered by Square POS / Stripe. No third-party platform fees.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
