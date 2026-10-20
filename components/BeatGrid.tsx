'use client';

import React, { useState } from 'react';
import { Beat, CartItem } from '@/lib/types';
import { useMiniPlayer } from './MiniPlayerContext';
import { Play, Pause, ShoppingBag, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

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
        accentColor: beat.accentColor || '#3B6141',
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
    <div className="relative space-y-6">
      {/* Top Header / Cart Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E2] pb-4">
        <div>
          <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#3B6141] font-semibold">
            Instrumental Archive // Direct License
          </span>
          <h3 className="font-editorial text-2xl text-[#18181F]">
            Curated Production Catalog
          </h3>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="relative ghost-btn-papaya px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto rounded-xs cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cart.length})</span>
          {cart.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#D95328] animate-ping absolute -top-1 -right-1" />
          )}
        </button>
      </div>

      {/* Cyber Grid Data Table */}
      <div className="overflow-x-auto bg-white rounded-sm border border-[#E2E2DA] shadow-xs">
        <table className="w-full text-left font-mono-clean text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E8E8E2] text-[#5B6E38] uppercase tracking-widest text-[10px] bg-[#F8F8F5]">
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
            {beats.map((beat) => {
              const isCurrentPlaying = activeBeatId === beat.id && isPlaying;
              return (
                <tr
                  key={beat.id}
                  className={`border-b border-[#E8E8E2]/60 transition-colors group ${
                    isCurrentPlaying
                      ? 'bg-[#EBF3EC]'
                      : 'hover:bg-[#F8F8F5]'
                  }`}
                >
                  {/* Play Button */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handlePlayToggle(beat)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isCurrentPlaying
                          ? 'bg-[#3B6141] text-white shadow-xs'
                          : 'border border-[#3B6141]/30 text-[#3B6141] hover:bg-[#3B6141]/10'
                      }`}
                      aria-label={`Play ${beat.title}`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      )}
                    </button>
                  </td>

                  {/* Title + Mini Visualizer if Playing */}
                  <td className="py-3.5 px-4 font-bold text-[#18181F]">
                    <div className="flex items-center gap-2.5">
                      <span>{beat.title}</span>
                      {isCurrentPlaying && (
                        <span className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-2.5 bg-[#3B6141] animate-pulse" />
                          <span className="w-0.5 h-3.5 bg-[#3B6141] animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-[#3B6141] animate-pulse" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* BPM */}
                  <td className="py-3.5 px-4 text-[#3B6141] font-medium">{beat.bpm}</td>

                  {/* Key */}
                  <td className="py-3.5 px-4 text-[#5A5A66]">{beat.key}</td>

                  {/* Tags */}
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {beat.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] bg-[#F1F1EB] border border-[#E2E2DA] rounded-xs text-[#5A5A66]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-mono-clean text-xs">
                    <span className="text-[#3B6141] font-semibold">${beat.leasePrice}</span>
                    <span className="text-[#A5A5B0] mx-1.5">/</span>
                    <span className="text-[#9C7A2E] font-semibold">${beat.exclusivePrice}</span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openLicensingPanel(beat)}
                      className="ghost-btn px-3 py-1.5 text-[11px] rounded-xs cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-white border-l border-[#E2E2DA] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              {/* Close Button & Header */}
              <div className="flex items-center justify-between border-b border-[#E8E8E2] pb-4">
                <div>
                  <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#3B6141] font-semibold">
                    License Selector
                  </span>
                  <h4 className="font-editorial text-2xl text-[#18181F]">
                    {selectedBeat.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedBeat(null)}
                  className="p-1.5 text-[#7E7E8B] hover:text-[#18181F] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Beat Info */}
              <div className="p-3 bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm font-mono-clean text-xs flex justify-between text-[#5A5A66]">
                <span>Tempo: {selectedBeat.bpm} BPM</span>
                <span>Key: {selectedBeat.key}</span>
              </div>

              {/* License Option Selector Toggle */}
              <div className="space-y-3 font-mono-clean">
                <span className="text-xs uppercase tracking-widest text-[#5A5A66] block font-semibold">
                  Select License Agreement:
                </span>

                {/* Lease Card */}
                <div
                  onClick={() => setLicenseType('lease')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    licenseType === 'lease'
                      ? 'border-[#3B6141] bg-[#F5FAF6] shadow-xs'
                      : 'border-[#E8E8E2] bg-white hover:border-[#CFCFC5]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#18181F]">
                      Standard Lease (MP3)
                    </span>
                    <span className="text-[#3B6141] font-bold text-sm">
                      ${selectedBeat.leasePrice}
                    </span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#5A5A66]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3B6141]" /> High-Quality 320kbps MP3
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3B6141]" /> Up to 50,000 Audio Streams
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3B6141]" /> 1 Music Video & Radio Rights
                    </li>
                  </ul>
                </div>

                {/* Exclusive Card */}
                <div
                  onClick={() => setLicenseType('exclusive')}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    licenseType === 'exclusive'
                      ? 'border-[#D95328] bg-[#FDF5F2] shadow-xs'
                      : 'border-[#E8E8E2] bg-white hover:border-[#CFCFC5]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#18181F]">
                      Exclusive Ownership (WAV + Stems)
                    </span>
                    <span className="text-[#D95328] font-bold text-sm">
                      ${selectedBeat.exclusivePrice}
                    </span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#5A5A66]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D95328]" /> 24-bit Lossless WAV + Stems
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D95328]" /> Unlimited Streaming & Broadcast
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D95328]" /> Beat Removed From Public Store
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8E8E2] space-y-3">
              <button
                onClick={() => addToCart(selectedBeat, licenseType)}
                className="w-full ghost-btn-papaya py-3 text-xs flex items-center justify-center gap-2 rounded-xs cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-white border-l border-[#E2E2DA] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E8E2] pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#3B6141]" />
                  <h4 className="font-editorial text-2xl text-[#18181F]">Your Cart</h4>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 text-[#7E7E8B] hover:text-[#18181F] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="font-mono-clean text-xs text-[#7E7E8B] py-8 text-center">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-3 font-mono-clean text-xs">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-[#18181F]">{item.title}</div>
                        <div className="text-[10px] text-[#3B6141] uppercase font-semibold">
                          {item.licenseType === 'lease' ? 'Lease' : 'Exclusive'} • ${item.price}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-[#7E7E8B] hover:text-[#D95328] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-[#E8E8E2] space-y-4 font-mono-clean">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A5A66]">Total:</span>
                  <span className="text-[#3B6141] font-bold text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                {checkoutSuccess ? (
                  <div className="p-4 bg-[#F5FAF6] border border-[#3B6141] rounded-sm text-xs text-[#3B6141] space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Order Prepared
                    </div>
                    <p className="text-[11px] text-[#5A5A66]">
                      Files and license agreement will be dispatched immediately.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setCheckoutSuccess(true)}
                    className="w-full ghost-btn-papaya py-3 text-xs flex items-center justify-center gap-2 rounded-xs cursor-pointer"
                  >
                    <span>Proceed to Direct Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <p className="text-[10px] text-[#7E7E8B] text-center">
                  Direct licensing. No third-party platform markups.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
