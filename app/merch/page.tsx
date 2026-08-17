'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Sparkles, Key, Check, ArrowRight, X, Layers, ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';
import { PrintifyProduct, FALLBACK_MERCH_PRODUCTS } from '@/lib/printify';

export default function MerchPage() {
  const [products, setProducts] = useState<PrintifyProduct[]>(FALLBACK_MERCH_PRODUCTS);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<PrintifyProduct | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    async function loadMerch() {
      try {
        const res = await fetch('/api/merch');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
            setIsLive(data.isLive);
          }
        }
      } catch {
        // Fallback already set
      } finally {
        setLoading(false);
      }
    }
    loadMerch();
  }, []);

  const openProductModal = (product: PrintifyProduct) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    const enabledVariant = product.variants?.find((v) => v.is_enabled) || product.variants?.[0];
    setSelectedVariantId(enabledVariant ? enabledVariant.id : null);
  };

  const selectedVariant = selectedProduct?.variants?.find((v) => v.id === selectedVariantId);
  const displayedPrice = selectedVariant
    ? `$${(selectedVariant.price / 100).toFixed(2)}`
    : selectedProduct?.priceFormatted || '$0.00';

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4 border-b border-[#ACE1AF]/20 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-[#ACE1AF] font-mono-clean text-xs uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4" />
            <span>Physical Goods // Studio Artifacts</span>
          </div>

          {/* Live Sync Status Indicator */}
          <div className="flex items-center gap-2 font-mono-clean text-[11px] px-3 py-1 bg-[#1F1F29] border border-[#F9F4F4]/10 rounded-full">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-[#ACE1AF] animate-pulse' : 'bg-[#C9A84C]'
              }`}
            />
            <span className="text-[#F9F4F4]/70">
              {loading
                ? 'Connecting to Printify...'
                : isLive
                ? 'Printify Live Sync Active'
                : 'Catalog Preview Mode'}
            </span>
          </div>
        </div>

        <h1 className="font-editorial text-5xl sm:text-7xl text-[#F9F4F4] tracking-tight">
          Merch Shop
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#F9F4F4]/70 max-w-2xl leading-relaxed">
          Tactile goods, studio apparel, and physical audio relics. Produced on demand with premium fabrics, custom embroidery, and lossless fidelity.
        </p>
      </section>

      {/* Product Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => openProductModal(item)}
            className="glass-panel p-6 sm:p-8 rounded-sm space-y-6 hover:border-[#ACE1AF]/50 transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-4">
              {/* Product Visual Mockup Container */}
              <div className="aspect-video w-full bg-[#0E0E12] border border-[#ACE1AF]/15 rounded-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#ACE1AF]/40 transition-colors p-4">
                {item.primaryImage && item.primaryImage !== '/images/logo.png' ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.primaryImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative w-20 h-20 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/logo.png"
                      alt="FPwonderful Logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(172,225,175,0.25)]"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-mono-clean">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[#ACE1AF] uppercase tracking-wider bg-[#121217] px-2 py-0.5 rounded-sm border border-[#ACE1AF]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#F9F4F4]">
                    {item.priceFormatted}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-[#F9F4F4] group-hover:text-[#ACE1AF] transition-colors">
                  {item.title}
                </h3>
              </div>

              {item.description && (
                <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/70 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#F9F4F4]/5 flex items-center justify-between">
              <span className="font-mono-clean text-[10px] text-[#ACE1AF]/80 uppercase tracking-widest">
                {isLive ? 'Printify Fulfilled' : 'Studio Preview'}
              </span>
              <button className="ghost-btn px-4 py-2 text-xs flex items-center gap-1.5">
                <span>Inspect Item</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#121217] border border-[#ACE1AF]/30 rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#F9F4F4]/10 pb-4">
              <div>
                <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#ACE1AF]">
                  Item Details // On-Demand Fulfillment
                </span>
                <h3 className="font-editorial text-3xl text-[#F9F4F4] mt-1">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-[#F9F4F4]/60 hover:text-[#F9F4F4]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Images Showcase */}
            <div className="space-y-3">
              <div className="aspect-video w-full bg-[#0E0E12] border border-[#ACE1AF]/20 rounded-sm flex items-center justify-center relative overflow-hidden p-6">
                {selectedProduct.images && selectedProduct.images[activeImageIndex]?.src ? (
                  <Image
                    src={selectedProduct.images[activeImageIndex].src}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="relative w-24 h-24">
                    <Image
                      src="/images/logo.png"
                      alt="FP Logo"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(172,225,175,0.3)]"
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 bg-[#0E0E12] border rounded-sm flex-shrink-0 overflow-hidden ${
                        activeImageIndex === idx
                          ? 'border-[#ACE1AF]'
                          : 'border-[#F9F4F4]/10 opacity-60'
                      }`}
                    >
                      <Image src={img.src} alt="thumb" fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {selectedProduct.description && (
              <p className="font-mono-clean text-xs leading-relaxed text-[#F9F4F4]/80">
                {selectedProduct.description}
              </p>
            )}

            {/* Variant Selector */}
            {selectedProduct.variants && selectedProduct.variants.length > 1 && (
              <div className="space-y-2 font-mono-clean text-xs">
                <span className="text-[11px] text-[#ACE1AF] uppercase tracking-wider block">
                  Select Size / Style:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProduct.variants
                    .filter((v) => v.is_enabled)
                    .map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-2 rounded-sm border text-left transition-all ${
                          selectedVariantId === v.id
                            ? 'border-[#ACE1AF] bg-[#ACE1AF]/10 text-[#F9F4F4]'
                            : 'border-[#F9F4F4]/10 text-[#F9F4F4]/60 hover:text-[#F9F4F4]'
                        }`}
                      >
                        <div className="truncate font-medium">{v.title}</div>
                        <div className="text-[10px] text-[#ACE1AF]">
                          ${(v.price / 100).toFixed(2)}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Price and Purchase Action */}
            <div className="pt-4 border-t border-[#F9F4F4]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-clean">
              <div>
                <span className="text-[10px] text-[#F9F4F4]/50 uppercase tracking-widest block">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#ACE1AF]">
                  {displayedPrice}
                </span>
              </div>

              <a
                href="/contact?service=merch"
                className="ghost-btn-papaya px-8 py-3.5 text-xs flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Order Inquiries & Direct Fulfillment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Printify API Setup Instructions Guide */}
      <section className="glass-panel p-8 sm:p-10 rounded-sm space-y-6 border border-[#C9A84C]/30 bg-[#C9A84C]/5">
        <div className="flex items-center gap-2 text-[#C9A84C] font-mono-clean text-xs uppercase tracking-widest font-bold">
          <Key className="w-4 h-4" />
          <span>Printify API Configuration</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl text-[#F9F4F4]">
          Live Storefront Synchronization
        </h3>

        <div className="font-mono-clean text-xs text-[#F9F4F4]/80 space-y-3 leading-relaxed max-w-3xl">
          <p>
            Your website backend is already configured to communicate directly with Printify&apos;s REST API. To pull in your live products and automatic mockups:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2 text-[#F9F4F4]/90">
            <li>
              Log in to your <strong>Printify</strong> dashboard → Click your Profile (top right) → <strong>Connections</strong> → <strong>API</strong>.
            </li>
            <li>
              Generate a <strong>Personal Access Token</strong> with Read permissions for Products and Orders.
            </li>
            <li>
              Add the token as an environment variable (in your local <code>.env.local</code> file or in your <strong>Vercel Project Settings → Environment Variables</strong>):
              <div className="mt-2 p-3 bg-[#0E0E12] border border-[#C9A84C]/30 rounded-sm text-[#ACE1AF] font-mono text-[11px]">
                PRINTIFY_API_TOKEN=your_printify_api_token_here
              </div>
            </li>
          </ol>
          <p className="text-[11px] text-[#C9A84C] pt-1">
            * Once added, your live inventory, sizing, images, and prices will sync and update automatically every 60 seconds.
          </p>
        </div>
      </section>
    </div>
  );
}
