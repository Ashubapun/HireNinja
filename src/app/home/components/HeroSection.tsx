'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

// Avatar data — professionals placed by the agency
const AVATARS = [
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1df82e3-1772070466905.png", alt: 'Software engineer placed in a tech role', delay: 0 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1235f0b50-1771933622691.png", alt: 'Product manager hired through staffing agency', delay: 120 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_18e79ecfe-1772070467583.png", alt: 'Data scientist in a new role', delay: 240 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6ea2394-1772070469870.png", alt: 'UX designer placed at a startup', delay: 360 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c61d5f95-1772070466454.png", alt: 'Operations manager hired via recruitment', delay: 480 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd51f87a-1772070466530.png", alt: 'DevOps engineer in a new position', delay: 600 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_11646bda2-1772070467415.png", alt: 'Marketing specialist placed by agency', delay: 720 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_19d589dc7-1772070466929.png", alt: 'Finance analyst hired through staffing', delay: 840 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf0633c1-1763295638320.png", alt: 'HR director placed at a growing company', delay: 960 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3495f87-1772070467409.png", alt: 'Sales executive in a new role', delay: 1080 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1eacf2c97-1772070466449.png", alt: 'Cybersecurity specialist placed by agency', delay: 200 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_14b7af156-1772070468506.png", alt: 'Cloud architect hired through recruitment', delay: 400 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d677ada0-1772070466094.png", alt: 'Project manager in a new position', delay: 550 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab0f5262-1772070467735.png", alt: 'Business analyst placed at enterprise firm', delay: 700 },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8f19b05-1772070465896.png", alt: 'Team lead hired via staffing agency', delay: 850 }];


// Avatar mosaic positions (relative to center)
const POSITIONS = [
{ x: 0, y: 0, size: 56, ring: true },
{ x: -80, y: -40, size: 48, ring: false },
{ x: 80, y: -40, size: 48, ring: false },
{ x: -130, y: 20, size: 44, ring: false },
{ x: 130, y: 20, size: 44, ring: false },
{ x: -60, y: 70, size: 44, ring: false },
{ x: 60, y: 70, size: 44, ring: false },
{ x: -170, y: -60, size: 40, ring: false },
{ x: 170, y: -60, size: 40, ring: false },
{ x: 0, y: -90, size: 40, ring: false },
{ x: -200, y: 30, size: 38, ring: false },
{ x: 200, y: 30, size: 38, ring: false },
{ x: -100, y: 110, size: 38, ring: false },
{ x: 100, y: 110, size: 38, ring: false },
{ x: 0, y: 130, size: 36, ring: false }];


// Odometer digit component
function OdometerDigit({ value, prevValue }: {value: string;prevValue: string;}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (value !== prevValue) {
      setKey((k) => k + 1);
    }
  }, [value, prevValue]);

  return (
    <span className="digit-slot" style={{ width: '0.65em' }}>
      <span key={key} className="digit-inner">
        {value}
      </span>
    </span>);
}

// Format number with commas
function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export default function HeroSection() {
  const [visibleAvatars, setVisibleAvatars] = useState<number[]>([]);

  // Avatar population
  useEffect(() => {
    AVATARS.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleAvatars((prev) => [...prev, idx]);
      }, AVATARS[idx].delay + 300);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy pt-24 pb-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
          'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      {/* Atmospheric glow layers */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-navy-light/30 blur-[80px] rounded-full pointer-events-none" />


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center">
        {/* Ticker */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber/30 bg-amber/10">
            <span className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_rgba(245,166,35,0.8)] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber/80">Placements This Year</span>
          </div>

          {/* Odometer */}
          <div className="flex items-baseline gap-0">
            <span
              className="font-display font-black text-amber stat-number animate-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em' }}>
              3,847
            </span>
          </div>
          <p className="text-white/50 text-sm font-medium tracking-wide text-center">
            professionals placed in the right roles so far this year
          </p>
        </div>

        {/* Avatar mosaic */}
        <div className="relative w-full max-w-lg h-56 mb-12 flex items-center justify-center">
          {POSITIONS.map((pos, idx) => {
            const avatar = AVATARS[idx];
            const isVisible = visibleAvatars.includes(idx);
            return (
              <div
                key={idx}
                className={`absolute ${isVisible ? 'avatar-bubble' : ''}`}
                style={{
                  left: `calc(50% + ${pos.x}px - ${pos.size / 2}px)`,
                  top: `calc(50% + ${pos.y}px - ${pos.size / 2}px)`,
                  width: pos.size,
                  height: pos.size,
                  opacity: isVisible ? undefined : 0
                }}>
                {/* Pulse ring for center avatar */}
                {pos.ring && isVisible &&
                <>
                    <span
                    className="avatar-ring absolute inset-0 rounded-full border-2 border-amber/40"
                    style={{ animationDelay: '0s' }} />
                    <span
                    className="avatar-ring absolute inset-0 rounded-full border-2 border-amber/20"
                    style={{ animationDelay: '1s' }} />
                  </>
                }
                <div
                  className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-lg"
                  style={{ borderColor: pos.ring ? 'rgba(245,166,35,0.6)' : undefined }}>
                  <AppImage
                    src={avatar.src}
                    alt={avatar.alt}
                    width={pos.size}
                    height={pos.size}
                    className="w-full h-full object-cover" />
                </div>
              </div>);
          })}
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="headline-animate text-display text-white">
            The right hire changes everything.
            <br />
            <span className="text-amber">We find them for you.</span>
          </h1>
          <p className="subheadline-animate text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Dispatch Talent connects growing companies with pre-screened professionals — from individual specialist hires to full engineering pods and niche domain experts.
          </p>

          {/* Primary CTA */}
          <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="/clients" className="px-10 py-4 bg-amber text-navy font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all duration-200 hover:scale-105 shadow-amber amber-glow">
              Hire With Us
            </a>
            <a href="/candidates" className="px-10 py-4 bg-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200">
              Submit Your Resume
            </a>
          </div>

          <p className="cta-animate text-white/30 text-xs font-medium pt-2">
            No retainer upfront. We only charge when you make a successful hire.
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 40C1200 80 960 20 720 40C480 60 240 20 0 40L0 80Z" fill="#F4F6F8" />
        </svg>
      </div>
    </section>);
}
