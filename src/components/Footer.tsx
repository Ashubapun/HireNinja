import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const links = [
    { label: 'Services', href: '/services' },
    { label: 'For Candidates', href: '/candidates' },
    { label: 'For Clients', href: '/clients' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="border-t border-navy/10 bg-canvas py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Single row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200">
            <Image
              src="/assets/images/Hire_Ninja_Image.jpeg"
              alt="Hire Ninja Logo"
              width={140}
              height={140}
              className="rounded-lg object-contain mix-blend-multiply"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
            {links?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-500 text-highway hover:text-navy transition-colors duration-200 focus:outline-none focus:underline"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex items-center gap-5">
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-highway hover:text-navy transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-highway hover:text-navy transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <span className="text-sm text-highway/60 font-medium">© 2026 Hire Ninja</span>
          </div>
        </div>
      </div>
    </footer>
  );
}