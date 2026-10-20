'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Key, ArrowRight, X } from 'lucide-react';
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
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-14">
      {/* Header */}
      <section className="space-y-4 border-b border-[#E8E8E2] pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-[#3B6141] font-mono-clean text-xs uppercase tracking-widest font-semibold">
            <ShoppingBag className="w-4 h-4" />
            <span>Physical Goods // Studio Artifacts</span>
          </div>

          {/* Live Sync Status Indicator */}
          <div className="flex items-center gap-2 font-mono-clean text-[11px] px-3 py-1 bg-white border border-[#E2E2DA] rounded-full shadow-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-[#3B6141] animate-pulse' : 'bg-[#9C7A2E]'
              }`}
            />
            <span className="text-[#5A5A66]">
              {loading
                ? 'Connecting to Printify...'
                : isLive
                ? 'Printify Live Sync Active'
                : 'Catalog Preview Mode'}
            </span>
          </div>
        </div>

        <h1 className="font-editorial text-5xl sm:text-7xl text-[#18181F] tracking-tight">
          Merch Shop
        </h1>
        <p className="font-mono-clean text-sm sm:text-base text-[#5A5A66] max-w-xl leading-relaxed">
          Tactile goods, studio apparel, and physical audio relics. Produced on demand with premium fabrics, custom embroidery, and lossless fidelity.
        </p>
      </section>

      {/* Product Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => openProductModal(item)}
            className="glass-panel p-6 sm:p-7 rounded-sm space-y-5 hover:border-[#3B6141]/30 transition-all group flex flex-col justify-between cursor-pointer bg-white shadow-xs"
          >
            <div className="space-y-4">
              {/* Product Visual Mockup Container */}
              <div className="aspect-video w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#3B6141]/30 transition-colors p-4">
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
                  <div className="relative w-16 h-16 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/logo.png"
                      alt="FPwonderful Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
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
                        className="text-[10px] text-[#3B6141] font-semibold uppercase tracking-wider bg-[#EBF2EC] px-2 py-0.5 rounded-xs border border-[#D0E2D3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#18181F]">
                    {item.priceFormatted}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-[#18181F] group-hover:text-[#3B6141] transition-colors">
                  {item.title}
                </h3>
              </div>

              {item.description && (
                <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66] line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#E8E8E2] flex items-center justify-between">
              <span className="font-mono-clean text-[10px] text-[#5B6E38] uppercase tracking-widest font-semibold">
                {isLive ? 'Printify Fulfilled' : 'Studio Preview'}
              </span>
              <button className="ghost-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-xs cursor-pointer">
                <span>Inspect Item</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-[#E2E2DA] rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E8E2] pb-4">
              <div>
                <span className="font-mono-clean text-[10px] uppercase tracking-widest text-[#3B6141] font-semibold">
                  Item Details // On-Demand Fulfillment
                </span>
                <h3 className="font-editorial text-3xl text-[#18181F] mt-0.5">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-[#7E7E8B] hover:text-[#18181F] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Images Showcase */}
            <div className="space-y-3">
              <div className="aspect-video w-full bg-[#F8F8F5] border border-[#E2E2DA] rounded-sm flex items-center justify-center relative overflow-hidden p-6">
                {selectedProduct.images && selectedProduct.images[activeImageIndex]?.src ? (
                  <Image
                    src={selectedProduct.images[activeImageIndex].src}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="relative w-20 h-20">
                    <Image
                      src="/images/logo.png"
                      alt="FP Logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
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
                      className={`relative w-14 h-14 bg-[#F8F8F5] border rounded-xs flex-shrink-0 overflow-hidden cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#3B6141]'
                          : 'border-[#E2E2DA] opacity-60'
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
              <p className="font-mono-clean text-xs leading-relaxed text-[#5A5A66]">
                {selectedProduct.description}
              </p>
            )}

            {/* Variant Selector */}
            {selectedProduct.variants && selectedProduct.variants.length > 1 && (
              <div className="space-y-2 font-mono-clean text-xs">
                <span className="text-[11px] text-[#3B6141] font-semibold uppercase tracking-wider block">
                  Select Size / Style:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProduct.variants
                    .filter((v) => v.is_enabled)
                    .map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                          selectedVariantId === v.id
                            ? 'border-[#3B6141] bg-[#F5FAF6] text-[#18181F]'
                            : 'border-[#E8E8E2] text-[#5A5A66] hover:text-[#18181F] bg-white'
                        }`}
                      >
                        <div className="truncate font-medium">{v.title}</div>
                        <div className="text-[10px] text-[#3B6141] font-semibold">
                          ${(v.price / 100).toFixed(2)}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Price and Purchase Action */}
            <div className="pt-4 border-t border-[#E8E8E2] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-clean">
              <div>
                <span className="text-[10px] text-[#7E7E8B] uppercase tracking-widest block">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#18181F]">
                  {displayedPrice}
                </span>
              </div>

              <a
                href="/contact?service=merch"
                className="ghost-btn-papaya px-8 py-3.5 text-xs flex items-center justify-center gap-2 w-full sm:w-auto rounded-xs"
              >
                <span>Order Inquiries & Direct Fulfillment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Printify API Setup Instructions Guide */}
      <section className="glass-panel p-6 sm:p-8 rounded-sm space-y-4 border border-[#E8DEC2] bg-[#FAF7EE]">
        <div className="flex items-center gap-2 text-[#9C7A2E] font-mono-clean text-xs uppercase tracking-widest font-bold">
          <Key className="w-4 h-4" />
          <span>Printify Storefront Synchronization</span>
        </div>

        <h3 className="font-editorial text-2xl text-[#18181F]">
          Automated On-Demand Inventory
        </h3>

        <div className="font-mono-clean text-xs text-[#5A5A66] space-y-2.5 leading-relaxed max-w-2xl">
          <p>
            Your website backend is connected to Printify&apos;s REST API. Live products, sizing, images, and prices sync automatically from your Printify dashboard.
          </p>
        </div>
      </section>
    </div>
  );
}
