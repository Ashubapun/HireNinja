'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function PersistentBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~3 card rows (~1800px)
      if (window.scrollY > 1800 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= 1800) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`bottom-cta-bar ${visible ? 'visible' : ''}`}
      role="complementary"
      aria-label="Demo CTA"
    >
      <div className="bg-navy/98 backdrop-blur-md border-t border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: context */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-1.5">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
              ]?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-navy object-cover"
                />
              ))}
            </div>
            <p className="text-white/70 text-sm font-medium">
              <span className="text-amber font-bold">127,438+</span> workers connected right now
            </p>
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-3">
            <button className="px-7 py-2.5 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-all duration-200 hover:scale-105 amber-glow flex items-center gap-2">
              See Your Fleet Connected
              <Icon name="ArrowRightIcon" size={14} className="text-navy" />
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all"
            >
              <Icon name="XMarkIcon" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}