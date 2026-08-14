'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// Count-up hook
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return value;
}

interface StatBlockProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  start: boolean;
  delay: number;
}

function StatBlock({ value, suffix, prefix = '', label, sublabel, start, delay }: StatBlockProps) {
  const count = useCountUp(value, 1800, start);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (start) {
      setTimeout(() => setShow(true), delay);
    }
  }, [start, delay]);

  return (
    <div
      className={`text-center transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <p
        className="font-display font-black text-amber stat-number"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-white font-bold text-base mt-2">{label}</p>
      <p className="text-white/40 text-xs font-medium mt-1">{sublabel}</p>
    </div>);
}

// Client logo strip — real-sounding companies
const CLIENT_LOGOS = [
'Meridian Software',
'Apex Consulting Group',
'Northfield Analytics',
'Crestview Technologies',
'Harlow & Partners',
'Summit Digital',
'Ironbridge Capital',
'Clearpath Solutions'];

// Testimonial data — recruitment context
const TESTIMONIALS = [
{
  quote: "We\'d been trying to fill a senior data engineer role for four months. Dispatch Talent sent us three shortlisted candidates within a week. We hired one on the spot. The screening was thorough — they actually understood what we needed.",
  name: 'Rachel Okonkwo',
  title: 'Head of Engineering',
  company: 'Meridian Software',
  stat: 'Hired in 9 days',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36a585c-1771889835470.png",
  alt: 'Rachel Okonkwo, Head of Engineering, smiling in office attire'
},
{
  quote: "We needed a full product pod — designer, two engineers, a PM — for a new vertical. Dispatch built us a team of four in under three weeks. All four are still with us eighteen months later.",
  name: 'James Whitfield',
  title: 'CTO',
  company: 'Summit Digital',
  stat: '4-person pod, 3 weeks',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf0c7d42-1763291659174.png",
  alt: 'James Whitfield, CTO, professional headshot in suit'
},
{
  quote: "Finding a compliance specialist with both fintech and GDPR experience felt impossible. Dispatch came back with two candidates who fit exactly. I don't know how they found them, but I'm glad they did.",
  name: 'Priya Nair',
  title: 'VP of Operations',
  company: 'Ironbridge Capital',
  stat: 'Niche role filled in 11 days',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16b568f53-1763297586456.png",
  alt: 'Priya Nair, VP of Operations, confident professional headshot'
}];

export default function AggregateEvidence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-navy py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Stats grid */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber/70 mb-3">
            Our Track Record
          </p>
          <h2 className="text-section-title text-white">
            Numbers that reflect real work.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/10">
          <StatBlock
            value={3847}
            suffix="+"
            label="Professionals Placed"
            sublabel="Since founding in 2019"
            start={statsStarted}
            delay={0} />

          <StatBlock
            value={12}
            suffix=" days"
            label="Avg. Time to Hire"
            sublabel="From brief to accepted offer"
            start={statsStarted}
            delay={200} />

          <StatBlock
            value={91}
            suffix="%"
            label="Retention at 12 Months"
            sublabel="Across all placements"
            start={statsStarted}
            delay={400} />

          <StatBlock
            value={240}
            suffix="+"
            label="Client Companies"
            sublabel="From seed-stage to enterprise"
            start={statsStarted}
            delay={600} />
        </div>

        {/* Testimonials */}
        <div className="py-20">
          <div className="grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) =>
            <div
              key={i}
              className={`p-6 rounded-3xl border border-white/10 bg-white/5 space-y-5 card-lift transition-all duration-700 ${statsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150 + 400}ms` }}>

                {/* Quote */}
                <div className="text-4xl text-amber/30 font-black leading-none">"</div>
                <p className="text-white/70 text-sm leading-relaxed">{t.quote}</p>

                {/* Stat badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber/15 rounded-full border border-amber/20">
                  <Icon name="ArrowTrendingUpIcon" size={14} className="text-amber" />
                  <span className="text-xs font-black text-amber">{t.stat}</span>
                </div>

                {/* Person */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber/20">
                    <img src={t.avatar} alt={t.alt} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-[10px] text-white/40">{t.title} · {t.company}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Client logo strip */}
        <div className="border-t border-white/10 pt-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center mb-10">
            Trusted by startups, scale-ups, and established enterprises
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {CLIENT_LOGOS.map((name) =>
            <span
              key={name}
              className="text-white/20 font-black text-sm uppercase tracking-wider hover:text-white/50 transition-colors cursor-default">
                {name}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);
}
