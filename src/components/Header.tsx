'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'For Candidates', href: '/candidates' },
  { label: 'For Clients', href: '/clients' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = !pathname?.startsWith('/home') && pathname !== '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isLight
          ? 'bg-navy/95 backdrop-blur-md shadow-navy py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <AppLogo
            size={32}
            text="Dispatch"
            iconName="TruckIcon"
            onClick={() => router?.push('/home')}
            className="cursor-pointer"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((item) => (
            <Link
              key={item?.label}
              href={item?.href}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                pathname === item?.href
                  ? 'text-amber' :'text-white/70 hover:text-amber'
              }`}
            >
              {item?.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-amber text-navy font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 amber-glow"
          >
Contact Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/98 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks?.map((item) => (
            <Link
              key={item?.label}
              href={item?.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest text-white/70 hover:text-amber transition-colors py-2"
            >
              {item?.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-6 py-3 bg-amber text-navy font-bold text-xs uppercase tracking-widest rounded-full"
            >
Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}