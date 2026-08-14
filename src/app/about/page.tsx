'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppIcon from '@/components/ui/AppIcon';

const team = [
  {
    name: 'Ashish',
    role: 'Co-Founder & CEO',
    bio: '"The best hire you ever make won\'t come from luck — it comes from knowing exactly what greatness looks like before you meet it."',
    initials: 'AS',
  },
  {
    name: 'Ashutosh',
    role: 'Co-Founder & CTO',
    bio: '"Build systems that scale, and the right people will always find their way to the right place — fast."',
    initials: 'AT',
  },
];

const values = [
  {
    label: 'Honest over comfortable',
    body: 'We tell clients when a role is mis-scoped and candidates when they\'re not the right fit. Short-term awkward beats long-term wrong.',
  },
  {
    label: 'Speed without shortcuts',
    body: 'Our 12-day average time-to-hire isn\'t luck — it\'s a process built to move fast without skipping the checks that matter.',
  },
  {
    label: 'Outcomes, not activity',
    body: 'We don\'t charge for CVs sent. We charge when the right person starts. That alignment keeps us honest.',
  },
  {
    label: 'Niche is a feature', body: 'We deliberately stay out of commodity hiring. The harder the role, the more value we add.',
  },
];

const milestones = [
  { year: 'Chapter 1', event: 'HireNinja founded with a clear mission: to eliminate manual resume screening and eliminate hiring bias using custom AI models.' },
  { year: 'Chapter 2', event: 'Successfully launched our proprietary AI candidate matching engine, drastically reducing time-to-hire for early tech partners.' },
  { year: 'Chapter 3', event: 'Scaled our operations and introduced specialized Executive Search and dedicated Team Pod deployment services.' },
  { year: 'Chapter 4', event: 'Crossed the 1,000+ placements milestone, becoming the trusted AI recruitment partner for fast-growing startups and enterprises.' },
  { year: 'Today', event: 'Powered by advanced LangChain workflows, we maintain a 92% candidate retention rate across 250+ active client companies.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/15 border border-amber/25 mb-6">
            <AppIcon name="BuildingOffice2Icon" size={14} className="text-amber" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
              About HireNinja
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6">
                Hiring is broken.
                <br />
                <span className="text-amber">We fixed our part.</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                HireNinja is a specialist recruitment firm. We don't try to fill every role for every company. We focus on the hires that are genuinely hard — and we've built a process that gets them right.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '3,847+', label: 'Professionals placed' },
                { value: '12 days', label: 'Avg. time to hire' },
                { value: '91%', label: 'Retention at 12 months' },
                { value: '240+', label: 'Client companies' },
              ]?.map((stat) => (
                <div
                  key={stat?.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
                >
                  <p className="text-3xl font-black text-amber mb-1">{stat?.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {stat?.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Mission */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
              Why we exist
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-navy leading-tight">
              The right hire changes everything.
            </h2>
          </div>
          <div className="lg:col-span-3 space-y-5 text-highway leading-relaxed">
            <p className="text-base">
              Most recruitment agencies optimise for volume. They send ten CVs and hope one sticks. That works fine when you're hiring for a generic role with fifty qualified applicants. It fails completely when you need someone specific — a compliance lead with fintech experience, a founding engineer who can also manage, a pod of five who'll actually work well together.
            </p>
            <p className="text-base">
              HireNinja was built for the second kind of hire. We take fewer briefs, go deeper on each one, and only present candidates we'd genuinely stake our reputation on. Our fee is success-based because we believe we should only get paid when we get it right.
            </p>
            <p className="text-base font-bold text-navy">
              We've placed 3,847 professionals across engineering, product, compliance, operations, and executive leadership — with a 91% retention rate at 12 months.
            </p>
          </div>
        </div>
      </section>
      {/* Values — bento grid */}
      <section className="py-16 bg-navy/3">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber mb-3">
              How we work
            </p>
            <h2 className="text-3xl font-black text-navy">Four things we don't compromise on.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values?.map((v, i) => (
              <div
                key={v?.label}
                className={`rounded-3xl p-7 space-y-3 ${i === 0
                  ? 'bg-navy text-white'
                  : i === 1
                    ? 'bg-amber text-navy' : 'bg-white border border-navy/8 shadow-card'
                  }`}
              >
                <span
                  className={`text-4xl font-black ${i === 0 ? 'text-white/20' : i === 1 ? 'text-navy/20' : 'text-navy/10'
                    }`}
                >
                  0{i + 1}
                </span>
                <h3
                  className={`text-base font-black leading-snug ${i === 0 ? 'text-white' : i === 1 ? 'text-navy' : 'text-navy'
                    }`}
                >
                  {v?.label}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${i === 0 ? 'text-white/60' : i === 1 ? 'text-navy/70' : 'text-highway'
                    }`}
                >
                  {v?.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber mb-3">
            The team
          </p>
          <h2 className="text-3xl font-black text-navy">People who've been on both sides.</h2>
          <p className="text-highway mt-3 max-w-xl">
            Every HireNinja team member has either hired at scale or been placed themselves. We know what the process feels like from both ends.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team?.map((member) => (
            <div
              key={member?.name}
              className="bg-white rounded-3xl border border-navy/8 shadow-card p-7 space-y-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center">
                <span className="text-amber font-black text-lg">{member?.initials}</span>
              </div>
              <div>
                <p className="font-black text-navy text-base">{member?.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber mt-0.5">
                  {member?.role}
                </p>
              </div>
              <p className="text-sm text-highway leading-relaxed">{member?.bio}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Timeline */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber mb-3">
              Our story
            </p>
            <h2 className="text-3xl font-black text-white">Our story. One focus.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {milestones?.map((m, i) => (
              <div
                key={m?.year}
                className={`rounded-2xl p-6 space-y-3 ${i === milestones?.length - 1
                  ? 'bg-amber' : 'bg-white/5 border border-white/10'
                  }`}
              >
                <p
                  className={`text-2xl font-black ${i === milestones?.length - 1 ? 'text-navy' : 'text-amber'
                    }`}
                >
                  {m?.year}
                </p>
                <p
                  className={`text-sm leading-relaxed ${i === milestones?.length - 1 ? 'text-navy/80' : 'text-white/60'
                    }`}
                >
                  {m?.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-navy rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Ready to work with a team that gets it right?
              </h2>
              <p className="text-white/60 leading-relaxed">
                Whether you're hiring or looking, we'd like to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link
                href="/clients"
                className="px-8 py-4 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 text-center"
              >
                Hire with HireNinja
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all duration-200 text-center border border-white/20"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
