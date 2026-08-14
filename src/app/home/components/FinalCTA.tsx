'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main CTA card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy">
          {/* Background image */}
          <div className="absolute inset-0">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1c146d27b-1772070466943.png"
              alt="Modern office environment with professionals collaborating around a table"
              fill
              className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          </div>

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
              'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />

          {/* Glow */}
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 px-10 py-20 lg:py-28 max-w-3xl">
            <div
              className={`space-y-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/15 border border-amber/25">
                <Icon name="BriefcaseIcon" size={14} className="text-amber" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
                  Individual · Team Pod · Niche Skills
                </span>
              </div>

              <h2 className="text-display text-white">
                Ready to hire
                <br />
                <span className="text-amber">without the headache?</span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                Tell us what you need. We'll come back within 48 hours with a shortlist of pre-screened candidates — or a plan to build your team pod from the ground up.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href="/clients" className="px-10 py-4 bg-amber text-navy font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all duration-200 hover:scale-105 shadow-amber amber-glow flex items-center gap-2">
                  Start Hiring
                  <Icon name="ArrowRightIcon" size={18} className="text-navy" />
                </a>
                <a href="/candidates" className="px-10 py-4 bg-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Submit Your Resume
                </a>
              </div>

              <div className="flex items-center gap-6 pt-2">
                {[
                'No upfront retainer',
                'Shortlist in 48 hrs',
                'Success-based fee'].
                map((item) =>
                <div key={item} className="flex items-center gap-1.5">
                    <Icon name="CheckIcon" size={14} className="text-amber" />
                    <span className="text-xs text-white/50 font-medium">{item}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary: three entry points */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
          {
            icon: 'UserIcon',
            title: 'Individual Role Hiring',
            desc: 'One specialist, one team gap. We source, screen, and shortlist — you make the final call. Most roles filled within 2 weeks.',
            cta: 'Tell us about the role'
          },
          {
            icon: 'UserGroupIcon',
            title: 'Team Pod Hiring',
            desc: 'Need a full squad assembled at once? We build cohesive pods of 2–8 people matched to your culture, stack, and pace.',
            cta: 'Build your pod'
          },
          {
            icon: 'AcademicCapIcon',
            title: 'Niche Skills & Screening',
            desc: 'Hard-to-find domain expertise or a rigorous screening process for candidates you\'ve already found? We handle both.',
            cta: 'Talk to a specialist'
          }].
          map((item, i) =>
          <div
            key={i}
            className={`p-6 bg-white rounded-2xl shadow-card border border-navy/5 card-lift space-y-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${i * 150 + 300}ms` }}>

              <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-amber" />
              </div>
              <h4 className="font-black text-navy text-base">{item.title}</h4>
              <p className="text-sm text-highway leading-relaxed">{item.desc}</p>
              <a
              href="/clients"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:text-amber-dark transition-colors">
                {item.cta}
                <Icon name="ArrowRightIcon" size={13} className="text-amber" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>);
}