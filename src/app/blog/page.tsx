'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

const POSTS: BlogPost[] = [
  {
    slug: 'why-time-to-hire-is-killing-your-growth',
    category: 'Hiring Strategy',
    title: 'Why Time-to-Hire Is Quietly Killing Your Growth',
    excerpt: 'Every week a senior engineering role sits open, your product roadmap slips. We analysed 400+ placements and found the hidden cost most companies never measure.',
    author: 'Priya Mehta',
    role: 'Head of Client Partnerships',
    date: 'Aug 8, 2026',
    readTime: '6 min read',
    featured: true,
    tags: ['Hiring Strategy', 'Engineering', 'Metrics'],
  },
  {
    slug: 'team-pod-hiring-vs-individual-roles',
    category: 'Team Building',
    title: 'Team Pod Hiring vs. Individual Roles: When to Use Each',
    excerpt: 'Scaling a product team isn\'t always about filling one seat at a time. Here\'s how to decide when a pre-assembled pod outperforms sequential individual hires.',
    author: 'James Okafor',
    role: 'Senior Talent Strategist',
    date: 'Jul 29, 2026',
    readTime: '8 min read',
    featured: true,
    tags: ['Team Building', 'Pods', 'Scaling'],
  },
  {
    slug: 'niche-skills-hiring-playbook',
    category: 'Niche Hiring',
    title: 'The Niche Skills Hiring Playbook: Finding Experts Nobody Else Can',
    excerpt: 'Blockchain auditors, ML inference engineers, regulatory affairs specialists — the talent exists. The problem is most recruiters don\'t know where to look.',
    author: 'Sana Rashid',
    role: 'Niche Talent Lead',
    date: 'Jul 14, 2026',
    readTime: '7 min read',
    featured: true,
    tags: ['Niche Skills', 'Sourcing', 'Tech'],
  },
  {
    slug: 'structured-screening-reduces-mis-hires',
    category: 'Candidate Screening',
    title: 'How Structured Screening Cuts Mis-Hire Rate by 40%',
    excerpt: 'Unstructured interviews feel natural but produce inconsistent results. We break down the four-stage screening framework we use for every Dispatch placement.',
    author: 'Priya Mehta',
    role: 'Head of Client Partnerships',
    date: 'Jul 2, 2026',
    readTime: '5 min read',
    tags: ['Screening', 'Process', 'Quality'],
  },
  {
    slug: 'writing-job-descriptions-that-attract-top-talent',
    category: 'Hiring Strategy',
    title: 'Writing Job Descriptions That Actually Attract Top Talent',
    excerpt: 'Most JDs read like legal disclaimers. The best candidates — the ones already employed — need a reason to click. Here\'s what works.',
    author: 'James Okafor',
    role: 'Senior Talent Strategist',
    date: 'Jun 18, 2026',
    readTime: '4 min read',
    tags: ['Job Descriptions', 'Employer Brand', 'Sourcing'],
  },
  {
    slug: 'candidate-experience-retention-link',
    category: 'Retention',
    title: 'The Candidate Experience–Retention Link Nobody Talks About',
    excerpt: 'How you treat candidates during the hiring process predicts how long they stay. Data from 1,200 placements shows a clear pattern.',
    author: 'Sana Rashid',
    role: 'Niche Talent Lead',
    date: 'Jun 5, 2026',
    readTime: '6 min read',
    tags: ['Retention', 'Candidate Experience', 'Data'],
  },
];

const CATEGORIES = ['All', 'Hiring Strategy', 'Team Building', 'Niche Hiring', 'Candidate Screening', 'Retention'];

const CATEGORY_COLORS: Record<string, string> = {
  'Hiring Strategy': 'bg-amber/15 text-amber-dark',
  'Team Building': 'bg-navy/10 text-navy',
  'Niche Hiring': 'bg-highway/10 text-highway-dark',
  'Candidate Screening': 'bg-amber/10 text-amber-dark',
  'Retention': 'bg-navy/10 text-navy',
};

function AuthorInitials({ name }: { name: string }) {
  const parts = name.split(' ');
  return `${parts[0][0]}${parts[1]?.[0] ?? ''}`;
}

const AUTHOR_COLORS: Record<string, string> = {
  'Priya Mehta': 'bg-amber text-navy',
  'James Okafor': 'bg-navy text-white',
  'Sana Rashid': 'bg-highway text-white',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = POSTS.filter((p) => p.featured);
  const filtered =
    activeCategory === 'All'
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);
  const nonFeatured = filtered.filter((p) => !p.featured);

  return (
    <div className="grain-overlay min-h-screen bg-canvas">
      <Header />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-navy-light/40 blur-[80px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber/30 bg-amber/10 mb-6">
            <span className="w-1.5 h-1.5 bg-amber rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber/80">Dispatch Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mb-5">
            Hiring intelligence for<br />
            <span className="text-amber">teams that move fast.</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Practical guides, data-backed frameworks, and real stories from the recruitment trenches — written by the Dispatch team.
          </p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 30C1200 60 960 10 720 30C480 50 240 10 0 30L0 60Z" fill="#F4F6F8" />
          </svg>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* Featured posts — asymmetric bento */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-highway mb-6">Featured Articles</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Large card */}
            <div className="lg:col-span-3 group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
              <div className="bg-navy p-8 flex-1 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber/10 blur-[60px] rounded-full pointer-events-none" />
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-amber/20 text-amber`}>
                    {featured[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-amber transition-colors duration-200">
                    {featured[0].title}
                  </h2>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mt-4">{featured[0].excerpt}</p>
              </div>
              <div className="p-6 flex items-center justify-between border-t border-canvas-dark">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${AUTHOR_COLORS[featured[0].author]}`}>
                    {AuthorInitials({ name: featured[0].author })}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">{featured[0].author}</p>
                    <p className="text-xs text-highway">{featured[0].date} · {featured[0].readTime}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Read <span>→</span>
                </span>
              </div>
            </div>

            {/* Two stacked cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {featured.slice(1, 3).map((post) => (
                <div key={post.slug} className="group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col flex-1">
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${CATEGORY_COLORS[post.category] ?? 'bg-navy/10 text-navy'}`}>
                        {post.category}
                      </span>
                      <h3 className="text-lg font-black text-navy leading-snug group-hover:text-amber-dark transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-highway text-sm leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-canvas-dark">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${AUTHOR_COLORS[post.author]}`}>
                          {AuthorInitials({ name: post.author })}
                        </div>
                        <p className="text-xs text-highway">{post.date} · {post.readTime}</p>
                      </div>
                      <span className="text-xs font-bold text-amber group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-navy text-white shadow-navy'
                  : 'bg-white text-highway hover:bg-navy/5 border border-canvas-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {(activeCategory === 'All' ? POSTS : filtered).map((post) => (
            <article key={post.slug} className="group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-navy/10 text-navy'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-highway">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-black text-navy leading-snug mb-3 group-hover:text-amber-dark transition-colors duration-200 flex-1">
                  {post.title}
                </h3>
                <p className="text-highway text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-canvas text-highway font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-canvas-dark mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${AUTHOR_COLORS[post.author]}`}>
                      {AuthorInitials({ name: post.author })}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy leading-none">{post.author}</p>
                      <p className="text-xs text-highway mt-0.5">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Read <span>→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-navy rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-light/50 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber/70 mb-3">Stay Sharp</p>
              <h2 className="text-3xl font-black text-white leading-tight mb-3">
                Hiring insights, straight to your inbox.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                One email every two weeks. No fluff — just frameworks, data, and real hiring stories from the Dispatch team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/clients"
                className="px-8 py-3.5 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all duration-200 hover:scale-105 text-center whitespace-nowrap"
              >
                Work With Us
              </Link>
              <Link
                href="/candidates"
                className="px-8 py-3.5 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200 text-center whitespace-nowrap"
              >
                Submit Resume
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
