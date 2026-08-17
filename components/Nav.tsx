'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music / DOOMgang☥' },
  { href: '/mixing-mastering', label: 'Mixing & Mastering' },
  { href: '/merch', label: 'Merch Shop' },
  { href: '/beat-shop', label: '+ Wonderful Beat Shop +' },
  { href: '/about', label: 'About/Notes' },
  { href: '/contact', label: 'Contact' },
];

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between border-b border-[#ACE1AF]/15 bg-[#121217]/80 backdrop-blur-md px-6 my-3 rounded-sm">
          {/* Logo / Persona Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="FPwonderful Insignia"
                width={36}
                height={36}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(172,225,175,0.35)]"
                priority
              />
            </div>
            <div>
              <span className="font-editorial text-2xl font-normal tracking-wide text-[#F9F4F4] group-hover:text-[#ACE1AF] transition-colors">
                FPwonderful
              </span>
              <span className="block font-mono-clean text-[10px] uppercase tracking-[0.25em] text-[#ACE1AF]/70">
                Chicago // Sound & Craft
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isBeatShop = link.href === '/beat-shop';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-mono-clean text-xs tracking-wider transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-[#ACE1AF] font-medium'
                      : isBeatShop
                      ? 'text-[#C9A84C] hover:text-[#FF7F50]'
                      : 'text-[#F9F4F4]/70 hover:text-[#F9F4F4]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#ACE1AF] shadow-[0_0_8px_#ACE1AF]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F9F4F4]/80 hover:text-[#ACE1AF] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-30 rounded-sm border border-[#ACE1AF]/20 bg-[#121217]/95 p-6 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono-clean text-sm tracking-widest py-2 border-b border-[#F9F4F4]/5 transition-colors ${
                    isActive
                      ? 'text-[#ACE1AF] font-bold pl-2 border-l-2 border-l-[#ACE1AF]'
                      : 'text-[#F9F4F4]/80 hover:text-[#ACE1AF]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
