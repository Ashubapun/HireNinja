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

// Industries we've hired for
const INDUSTRIES = [
  '🏦 Banking & Finance',
  '🏥 Healthcare & MedTech',
  '💻 SaaS & Cloud',
  '🛒 E-Commerce & Retail',
  '🏗️ Construction & Engineering',
  '📱 Mobile & App Development',
  '🔒 Cybersecurity',
  '🎓 EdTech',
  '⚡ Energy & CleanTech',
  '🚚 Logistics & Supply Chain',
  '🎮 Gaming & Entertainment',
  '🤖 AI & Machine Learning',
  '📊 Data & Analytics',
  '🏠 PropTech & Real Estate',
  '✈️ Travel & Hospitality',
];

// Tech stacks we've hired for
const TECH_STACKS = [
  'React',
  'Node.js',
  'Python',
  'AWS',
  'TypeScript',
  'Kubernetes',
  'Go',
  'PostgreSQL',
  'Rust',
  'Next.js',
  'Docker',
  'GraphQL',
  'Java',
  'Terraform',
  'MongoDB',
  'Vue.js',
  'Scala',
  'Redis',
  'Swift',
  'Kotlin',
  'Azure',
  'GCP',
  'Spark',
  'Kafka',
];

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


        {/* Ticker strips */}
        <div className="border-t border-white/10 pt-16 space-y-8">

          {/* Industries strip — scrolls right to left */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber/60 text-center mb-5">
              Industries We've Hired For
            </p>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #0B1628, transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #0B1628, transparent)' }} />

              <div
                className="flex gap-6 w-max"
                style={{ animation: 'ticker-ltr 40s linear infinite' }}
              >
                {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 font-semibold text-sm whitespace-nowrap hover:border-amber/40 hover:text-amber transition-colors duration-200"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech stacks strip — scrolls left to right (reverse) */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber/60 text-center mb-5">
              Tech Stacks We've Hired For
            </p>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #0B1628, transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #0B1628, transparent)' }} />

              <div
                className="flex gap-4 w-max"
                style={{ animation: 'ticker-rtl 35s linear infinite' }}
              >
                {[...TECH_STACKS, ...TECH_STACKS].map((tech, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 px-4 py-2 rounded-lg border border-amber/20 bg-amber/5 text-amber font-black text-xs uppercase tracking-widest whitespace-nowrap hover:bg-amber/15 hover:border-amber/40 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>);
}
