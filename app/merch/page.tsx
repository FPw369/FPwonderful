'use client';

import React from 'react';
import { ShoppingBag, Sparkles, Key, Check, ArrowRight } from 'lucide-react';

const MERCH_ITEMS = [
  {
    id: 'merch-01',
    title: 'DOOMgang☥ Heavyweight Studio Hoodie',
    category: 'Apparel // 450 GSM',
    price: '$78.00',
    tag: 'Limited Edition',
    description: 'Ultra-heavy French terry cotton with embroidered celadon DOOMgang☥ insignia. Custom relaxed fit.',
    color: '#ACE1AF',
  },
  {
    id: 'merch-02',
    title: 'Sound With Intention // Mineral Wash Tee',
    category: 'Apparel // Vintage Wash',
    price: '$38.00',
    tag: 'Core Piece',
    description: '100% heavyweight combed cotton. Vintage charcoal wash with subtle gold back-print manifesto.',
    color: '#C9A84C',
  },
  {
    id: 'merch-03',
    title: 'THE VOID CHRONICLES — Limited Cassette',
    category: 'Physical Audio // Tape',
    price: '$18.00',
    tag: 'Physical Relic',
    description: 'Smoky celadon tinted shell with high-bias cobalt tape. Includes printed lyrics and download code.',
    color: '#ACE1AF',
  },
  {
    id: 'merch-04',
    title: 'Less But Better // Studio Work Cap',
    category: 'Headwear // Low Profile',
    price: '$32.00',
    tag: 'Daily Essential',
    description: 'Unstructured 6-panel washed twill cap. Tonal embroidery with matte brass closure.',
    color: '#808000',
  },
];

export default function MerchPage() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4 border-b border-[#ACE1AF]/20 pb-8">
        <div className="flex items-center gap-2 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
          <ShoppingBag className="w-4 h-4" />
          <span>Physical Goods // Studio Artifacts</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-[#F9F4F4] tracking-tight">
          Merch Shop
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#F9F4F4]/70 max-w-2xl leading-relaxed">
          Tactile goods, studio apparel, and physical audio relics. Built with premium materials and understated aesthetics.
        </p>
      </section>

      {/* Product Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MERCH_ITEMS.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 sm:p-8 rounded-sm space-y-6 hover:border-[#ACE1AF]/40 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Product Visual Mockup Container */}
              <div className="aspect-video w-full bg-[#0E0E12] border border-[#ACE1AF]/15 rounded-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#ACE1AF]/35 transition-colors">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
                  }}
                />
                <div className="text-center p-4 relative z-10 space-y-1">
                  <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
                    {item.tag}
                  </span>
                  <p className="font-editorial text-lg text-[#F9F4F4]">
                    {item.title}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-mono-clean">
                  <span className="text-[11px] text-[#ACE1AF] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-[#F9F4F4]">
                    {item.price}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-[#F9F4F4] group-hover:text-[#ACE1AF] transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/70">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F9F4F4]/5 flex items-center justify-between">
              <span className="font-mono-clean text-[10px] text-[#ACE1AF]/80 uppercase tracking-widest">
                Printify Ready
              </span>
              <button
                disabled
                className="ghost-btn px-4 py-2 text-xs opacity-75 cursor-not-allowed"
              >
                Catalog Preview
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Printify API Integration Banner */}
      <section className="glass-panel p-8 rounded-sm space-y-4 border border-[#C9A84C]/30 bg-[#C9A84C]/5">
        <div className="flex items-center gap-2 text-[#C9A84C] font-mono-clean text-xs uppercase tracking-widest font-bold">
          <Key className="w-4 h-4" />
          <span>Printify Store Integration</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-[#F9F4F4]">
          Automated On-Demand Fulfillment
        </h3>
        <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/80 max-w-2xl">
          The storefront is fully wired for direct integration with your Printify shop. Whenever you are ready, provide your Printify API Token and Shop ID, and live inventory, variants, and automatic fulfillment will sync directly here.
        </p>
      </section>
    </div>
  );
}
