'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// Placement timeline component
function PlacementTimeline({ animated }: {animated: boolean;}) {
  const events = [
  { date: 'Day 1', label: 'Client brief received & role scoped', color: 'bg-amber' },
  { date: 'Day 3', label: 'Longlist of 12 candidates sourced', color: 'bg-amber' },
  { date: 'Day 5', label: 'Screening interviews completed', color: 'bg-amber' },
  { date: 'Day 8', label: 'Shortlist of 3 presented to client', color: 'bg-green-500' },
  { date: 'Day 11', label: 'Offer accepted — role filled', color: 'bg-green-600' }];

  return (
    <div className="mt-4 space-y-2">
      {events.map((event, i) =>
      <div key={i} className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div
            className={`timeline-dot w-3 h-3 rounded-full ${event.color}`}
            style={
            animated ?
            { animation: `timeline-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 120}ms forwards` } :
            {}
            } />
            {i < events.length - 1 &&
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-6 bg-navy/10" />
          }
          </div>
          <div className="flex items-center gap-2 pb-4">
            <span className="text-[10px] font-bold text-highway/50 uppercase tracking-wide w-14 flex-shrink-0">
              {event.date}
            </span>
            <span className="text-xs font-semibold text-navy">{event.label}</span>
          </div>
        </div>
      )}
    </div>);
}

// Retention graph component
function RetentionGraph({ animated }: {animated: boolean;}) {
  const before = [42, 55, 48, 60, 52, 45, 58];
  const after = [72, 78, 75, 82, 80, 85, 88];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="mt-4 p-4 bg-canvas rounded-2xl">
      <div className="flex items-end justify-between gap-1 h-24">
        {months.map((month, i) =>
        <div key={month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center gap-0.5">
              <div
              className="graph-bar w-2 rounded-t-sm bg-highway/30 transition-all duration-700"
              style={
              {
                '--bar-height': `${before[i] * 0.8}px`,
                height: animated ? `${before[i] * 0.8}px` : 0,
                transitionDelay: `${i * 80}ms`
              } as React.CSSProperties
              } />
              <div
              className="graph-bar w-2 rounded-t-sm bg-amber transition-all duration-700"
              style={
              {
                '--bar-height': `${after[i] * 0.8}px`,
                height: animated ? `${after[i] * 0.8}px` : 0,
                transitionDelay: `${i * 80 + 40}ms`
              } as React.CSSProperties
              } />
            </div>
            <span className="text-[9px] text-highway/50 font-medium">{month}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-navy/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-highway/30" />
          <span className="text-[10px] text-highway font-medium">Agency-sourced hires (industry avg)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-amber" />
          <span className="text-[10px] text-highway font-medium">Dispatch Talent placements</span>
        </div>
      </div>
    </div>);
}

interface CaseStudyCardProps {
  type: 'metric' | 'emotional' | 'safety' | 'milestone';
  delay?: number;
}

function CaseStudyCard({ type, delay = 0 }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [graphAnimated, setGraphAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible(true);
              setTimeout(() => setGraphAnimated(true), 400);
            }, delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  if (type === 'metric') {
    return (
      <div
        ref={cardRef}
        className={`card-reveal card-lift bg-white rounded-3xl shadow-card overflow-hidden ${visible ? 'visible' : ''}`}>

        {/* Header */}
        <div className="bg-navy p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber/70">
              Case Study · Series B SaaS Company
            </span>
            <span className="text-[10px] font-bold text-white/30">7 months</span>
          </div>
          <h3 className="text-section-title text-white leading-tight">
            Engineering team scaled{' '}
            <span className="text-amber">3×</span>
            <br />
            without a single mis-hire.
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <blockquote className="border-l-2 border-amber pl-4 space-y-2">
            <p className="text-sm text-highway leading-relaxed italic">
              "We went from 8 engineers to 26 in seven months. Every single hire came through Dispatch Talent. The screening was so thorough that we skipped our usual three-round process and went straight to final interviews. Zero regrettable hires."
            </p>
            <footer className="text-[11px] font-bold text-navy/50 uppercase tracking-wide">
              — Alicia Brennan, VP Engineering · Crestview Technologies
            </footer>
          </blockquote>

          {/* Graph */}
          <RetentionGraph animated={graphAnimated} />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
            { label: 'Engineers placed', value: '18' },
            { label: 'Avg. days to hire', value: '11 days' },
            { label: 'Still with company', value: '17/18' }].
            map((stat) =>
            <div key={stat.label} className="text-center p-3 bg-canvas rounded-xl">
                <p className="text-lg font-black text-navy">{stat.value}</p>
                <p className="text-[9px] text-highway/60 font-medium mt-0.5">{stat.label}</p>
              </div>
            )}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:text-amber-dark transition-colors mt-2">
            Read the full story
            <Icon name="ArrowRightIcon" size={14} className="text-amber" />
          </a>
        </div>
      </div>);
  }

  if (type === 'safety') {
    return (
      <div
        ref={cardRef}
        className={`card-reveal card-lift bg-white rounded-3xl shadow-card overflow-hidden ${visible ? 'visible' : ''}`}>

        {/* Header */}
        <div className="bg-navy p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber/70">
              Case Study · Fintech Scale-up
            </span>
            <span className="text-[10px] font-bold text-white/30">11 days</span>
          </div>
          <h3 className="text-section-title text-white leading-tight">
            A niche compliance role filled{' '}
            <span className="text-amber">in 11 days</span>
            <br />
            after 4 months of searching.
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-highway leading-relaxed">
            Ironbridge Capital needed a compliance specialist with both open-banking and GDPR expertise — a combination that's genuinely rare. After four months of failed searches through job boards and two other agencies, they briefed Dispatch Talent on a Monday. By Friday they had three qualified candidates in their inbox.
          </p>

          <PlacementTimeline animated={graphAnimated} />

          <div className="p-4 bg-amber/10 rounded-2xl border border-amber/20 flex items-start gap-3">
            <Icon name="ShieldCheckIcon" size={20} className="text-amber flex-shrink-0 mt-0.5" />
            <p className="text-xs text-navy font-medium leading-relaxed">
              "They didn't just find someone with the right keywords on their CV. They found someone who actually understood the regulatory landscape we operate in." — Priya Nair, VP Operations
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:text-amber-dark transition-colors">
            Read the full story
            <Icon name="ArrowRightIcon" size={14} className="text-amber" />
          </a>
        </div>
      </div>);
  }

  if (type === 'emotional') {
    return (
      <div
        ref={cardRef}
        className={`card-reveal card-lift bg-white rounded-3xl shadow-card overflow-hidden ${visible ? 'visible' : ''}`}>

        {/* Photo */}
        <div className="relative h-52 overflow-hidden">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_10808c477-1772070464726.png"
            alt="Professional in a bright modern office, smiling at their desk"
            fill
            className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          {/* Badge overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-amber rounded-full shadow-amber">
            <Icon name="StarIcon" size={14} variant="solid" className="text-navy" />
            <span className="text-[10px] font-black text-navy uppercase tracking-wide">Offer Accepted</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber/70">
              Candidate Story · Senior Product Manager
            </span>
            <h3 className="text-xl font-black text-navy leading-tight">
              "They actually read my CV before calling."
            </h3>
          </div>

          <p className="text-sm text-highway leading-relaxed">
            Danielle had been passively looking for six months. Every recruiter who called clearly hadn't read past her job title. When Dispatch reached out, they referenced a specific project from her portfolio and asked a question that showed they understood her background. She took the call. Three weeks later she had an offer 22% above her target salary.
          </p>

          <div className="p-4 bg-canvas rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber/30">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_150452423-1772070467566.png"
                  alt="Danielle Chen, Senior Product Manager"
                  width={40}
                  height={40}
                  className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy">Danielle Chen</p>
                <p className="text-[10px] text-highway/60">Senior PM · Placed at Northfield Analytics</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-black text-navy">+22%</p>
                <p className="text-[9px] text-highway/50">salary uplift</p>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:text-amber-dark transition-colors">
            Read the full story
            <Icon name="ArrowRightIcon" size={14} className="text-amber" />
          </a>
        </div>
      </div>);
  }

  if (type === 'milestone') {
    return (
      <div
        ref={cardRef}
        className={`card-reveal card-lift bg-navy rounded-3xl shadow-card overflow-hidden ${visible ? 'visible' : ''}`}>

        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber/70">
              Team Pod Hire · E-commerce Platform
            </span>
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center">
              <Icon name="TrophyIcon" size={16} className="text-amber" />
            </div>
          </div>

          {/* Big number */}
          <div className="py-6 text-center border-y border-white/10">
            <p
              className="font-display font-black text-amber stat-number"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>
              6
            </p>
            <p className="text-white/60 text-sm font-medium mt-1">person pod, assembled in 3 weeks</p>
          </div>

          <blockquote className="space-y-3">
            <p className="text-white/80 text-sm leading-relaxed italic">
              "We needed a full growth team — paid media, SEO, analytics, CRO — all at once, all senior level. Dispatch built us the pod. They handled the briefing, the screening, the offer negotiation. We just showed up to final interviews. Six months in, revenue is up 38%."
            </p>
            <footer className="text-[11px] font-bold text-white/30 uppercase tracking-wide">
              — Marcus Osei, CEO · Harlow & Partners
            </footer>
          </blockquote>

          {/* Team avatars */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex -space-x-2">
              {[
              { src: "https://img.rocket.new/generatedImages/rocket_gen_img_10ec2b20e-1772070467028.png", alt: 'Growth team member 1' },
              { src: "https://img.rocket.new/generatedImages/rocket_gen_img_10af71bcd-1772070466136.png", alt: 'Growth team member 2' },
              { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b71e8a62-1772070466575.png", alt: 'Growth team member 3' },
              { src: "https://img.rocket.new/generatedImages/rocket_gen_img_180265dda-1772070465313.png", alt: 'Growth team member 4' }].
              map((av, i) =>
              <div
                key={i}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-navy">
                  <AppImage src={av.src} alt={av.alt} width={32} height={32} className="object-cover" />
                </div>
              )}
              <div className="w-8 h-8 rounded-full bg-amber/20 border-2 border-navy flex items-center justify-center">
                <span className="text-[9px] font-black text-amber">+2</span>
              </div>
            </div>
            <span className="text-xs text-white/40 font-medium">Harlow growth pod</span>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:text-amber-light transition-colors">
            Read the full story
            <Icon name="ArrowRightIcon" size={14} className="text-amber" />
          </a>
        </div>
      </div>);
  }

  return null;
}

// Feature highlight card
function FeatureCard({
  icon,
  title,
  description,
  delay
}: {icon: string;title: string;description: string;delay: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`card-reveal card-lift p-6 bg-white rounded-2xl shadow-card border border-navy/5 ${visible ? 'visible' : ''}`}>
      <div className="w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center mb-4">
        <Icon name={icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-amber" />
      </div>
      <h4 className="font-black text-navy text-base mb-2">{title}</h4>
      <p className="text-sm text-highway leading-relaxed">{description}</p>
    </div>);
}

export default function CaseStudyGrid() {
  return (
    <section className="py-24 bg-canvas" id="case-studies">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber mb-3">
            Proof of Work
          </p>
          <h2 className="text-section-title text-navy mb-4">
            Not promises.<br />Real placements, real outcomes.
          </h2>
          <p className="text-highway text-base leading-relaxed">
            Every story below is a real client or candidate. Numbers are verified. Quotes are attributed. We don't do stock photos of handshakes.
          </p>
        </div>

        {/* Row 1: Metric + Safety */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <CaseStudyCard type="metric" delay={0} />
          <CaseStudyCard type="safety" delay={150} />
        </div>

        {/* Row 2: Emotional + Milestone */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <CaseStudyCard type="emotional" delay={0} />
          <CaseStudyCard type="milestone" delay={150} />
        </div>

        {/* How we work strip */}
        <div className="pt-16 border-t border-navy/10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber mb-3 text-center">
            How We Work
          </p>
          <h3 className="text-2xl font-black text-navy text-center mb-10">
            Recruitment that respects your time.
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon="MagnifyingGlassIcon"
              title="Deep Role Scoping"
              description="We spend time understanding the role, the team, and the culture before we source a single candidate. Bad briefs produce bad hires."
              delay={0} />

            <FeatureCard
              icon="UserGroupIcon"
              title="Team Pod Assembly"
              description="Need a full squad — not just one person? We build cohesive pods of 2–8 people who are matched to work well together, not just individually qualified."
              delay={100} />

            <FeatureCard
              icon="AcademicCapIcon"
              title="Niche Skills Sourcing"
              description="Rare stack? Unusual domain expertise? We maintain a live network of specialists across 40+ technical and functional disciplines."
              delay={200} />

            <FeatureCard
              icon="ClipboardDocumentCheckIcon"
              title="Structured Screening"
              description="Every shortlisted candidate has passed a structured competency interview, reference check, and skills assessment before you see their name."
              delay={300} />
          </div>
        </div>
      </div>
    </section>);
}