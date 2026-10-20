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
        <div className="flex h-20 items-center justify-between border-b border-[#E8E8E2] bg-[#FFFFFF]/90 backdrop-blur-md px-6 my-3 rounded-md shadow-[0_2px_12px_rgba(24,24,31,0.03)]">
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
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div>
              <span className="font-editorial text-2xl font-normal tracking-wide text-[#18181F] group-hover:text-[#3B6141] transition-colors">
                FPwonderful
              </span>
              <span className="block font-mono-clean text-[10px] uppercase tracking-[0.25em] text-[#5B6E38]">
                Chicago // Sound & Soul
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isSpecialAccent = link.href === '/beat-shop' || link.href === '/mixing-mastering';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-mono-clean text-xs tracking-wider transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-[#3B6141] font-bold'
                      : isSpecialAccent
                      ? 'text-[#8C6D27] hover:text-[#D95328] font-medium'
                      : 'text-[#5A5A66] hover:text-[#18181F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#3B6141]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18181F] hover:text-[#3B6141] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-30 rounded-md border border-[#E8E8E2] bg-[#FFFFFF]/98 p-6 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isSpecialAccent = link.href === '/beat-shop' || link.href === '/mixing-mastering';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono-clean text-sm tracking-widest py-2 border-b border-[#E8E8E2]/60 transition-colors ${
                    isActive
                      ? 'text-[#3B6141] font-bold pl-2 border-l-2 border-l-[#3B6141]'
                      : isSpecialAccent
                      ? 'text-[#8C6D27] hover:text-[#D95328]'
                      : 'text-[#5A5A66] hover:text-[#18181F]'
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
