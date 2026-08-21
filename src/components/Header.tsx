'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = !pathname?.startsWith('/home') && pathname !== '/';

  const userRole = user?.user_metadata?.role || 'candidate';

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
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => router?.push('/home')}
        >
          <Image
            src="/assets/images/Hire_Ninja_Image.jpeg"
            alt="Hire Ninja Logo"
            width={72}
            height={72}
            className="rounded-xl object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-2xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Hire</span>
            <span className="text-amber">&nbsp;Ninja</span>
          </span>
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
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={`/portal/${userRole}`}
                className="px-5 py-2.5 border border-amber/35 text-amber font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber/15 transition-all duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  router.push('/home');
                }}
                className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Login
            </Link>
          )}

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