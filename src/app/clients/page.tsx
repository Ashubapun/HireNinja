'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppIcon from '@/components/ui/AppIcon';
import { recruitmentService } from '@/lib/services/recruitmentService';

const companySizeOptions = ['1–10', '11–50', '51–200', '201–500', '500+'];
const timelineOptions = ['Immediately', 'Within 1 month', '1–3 months', '3–6 months', 'Exploring options'];
const budgetOptions = ['Under $10K', '$10K–$25K', '$25K–$50K', '$50K–$100K', '$100K+', 'Prefer not to say'];
const serviceOptions = [
  'Individual Role Hiring',
  'Team Pod Hiring',
  'Niche Skills Hiring',
  'Candidate Screening',
];

export default function ClientsPage() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    industry: '',
    hiringNeeds: '',
    timeline: '',
    budgetRange: '',
    additionalNotes: '',
  });
  const [servicesInterested, setServicesInterested] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (svc: string) => {
    setServicesInterested((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.companyName.trim() || !form.contactName.trim() || !form.email.trim() || !form.hiringNeeds.trim()) {
      setError('Company name, contact name, email, and hiring needs are required.');
      return;
    }

    setLoading(true);
    const result = await recruitmentService.submitClientOnboarding({
      companyName: form.companyName,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone || undefined,
      companySize: form.companySize || undefined,
      industry: form.industry || undefined,
      hiringNeeds: form.hiringNeeds,
      servicesInterested,
      timeline: form.timeline || undefined,
      budgetRange: form.budgetRange || undefined,
      additionalNotes: form.additionalNotes || undefined,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Header />

      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/15 border border-amber/25 mb-6">
            <AppIcon name="BuildingOfficeIcon" size={14} className="text-amber" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
              For Clients
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl">
            Tell us who you need.
            <br />
            <span className="text-amber">We will find them.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Register your company and describe your hiring needs. A Dispatch engagement lead will
            reach out within one business day.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: trust signals */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-navy mb-4">Why clients choose Dispatch</h2>
              <ul className="space-y-4">
                {[
                  { icon: 'ClockIcon', title: '11-day average time-to-shortlist', desc: 'From brief to qualified candidates in under two weeks.' },
                  { icon: 'ShieldCheckIcon', title: '90-day placement guarantee', desc: 'If a placement does not work out, we replace at no additional cost.' },
                  { icon: 'UserGroupIcon', title: 'Dedicated engagement lead', desc: 'One point of contact who knows your team and your standards.' },
                  { icon: 'ChartBarIcon', title: '94% retention at 12 months', desc: 'We measure success by how long placements stay, not just how fast they start.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber/15 flex items-center justify-center flex-shrink-0">
                      <AppIcon name={item.icon as Parameters<typeof AppIcon>[0]['name']} size={16} className="text-amber" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-navy">{item.title}</p>
                      <p className="text-xs text-highway mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-navy border border-navy/20 space-y-3">
              <h3 className="font-black text-white text-sm">Looking to hire a candidate?</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                If you are an individual looking for work, head to our candidate page to submit
                your resume directly.
              </p>
              <Link href="/candidates" className="text-xs text-amber font-bold hover:underline flex items-center gap-1">
                Submit your resume
                <AppIcon name="ArrowRightIcon" size={12} className="text-amber" />
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-white rounded-3xl shadow-card border border-navy/8 p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center mx-auto">
                  <AppIcon name="CheckCircleIcon" size={32} className="text-amber" />
                </div>
                <h2 className="text-2xl font-black text-navy">You are on our radar.</h2>
                <p className="text-highway max-w-md mx-auto leading-relaxed">
                  Your onboarding request has been received. An engagement lead will reach out
                  within one business day to discuss your hiring needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({ companyName: '', contactName: '', email: '', phone: '', companySize: '', industry: '', hiringNeeds: '', timeline: '', budgetRange: '', additionalNotes: '' });
                      setServicesInterested([]);
                    }}
                    className="px-6 py-3 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all"
                  >
                    Submit Another
                  </button>
                  <Link
                    href="/services"
                    className="px-6 py-3 bg-navy/8 text-navy font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-navy/15 transition-all"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-card border border-navy/8 p-8 md:p-10 space-y-6"
              >
                <h2 className="text-xl font-black text-navy">Company registration</h2>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                    <AppIcon name="ExclamationCircleIcon" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Company + Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Company Name <span className="text-amber">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Your Name <span className="text-amber">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={form.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Work Email <span className="text-amber">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@acmecorp.com"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Company size + Industry */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Company Size</label>
                    <div className="flex flex-wrap gap-2">
                      {companySizeOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, companySize: opt }))}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                            form.companySize === opt
                              ? 'bg-amber text-navy border-amber' :'bg-canvas text-highway border-navy/15 hover:border-amber/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      placeholder="e.g. Fintech, Healthcare, SaaS"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Services interested */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Services Interested In</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {serviceOptions.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleService(svc)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border text-left transition-all ${
                          servicesInterested.includes(svc)
                            ? 'bg-amber/10 text-navy border-amber/40' :'bg-canvas text-highway border-navy/15 hover:border-amber/30'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          servicesInterested.includes(svc) ? 'bg-amber border-amber' : 'border-navy/30'
                        }`}>
                          {servicesInterested.includes(svc) && (
                            <AppIcon name="CheckIcon" size={10} className="text-navy" />
                          )}
                        </div>
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hiring needs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">
                    Describe Your Hiring Needs <span className="text-amber">*</span>
                  </label>
                  <textarea
                    name="hiringNeeds"
                    value={form.hiringNeeds}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about the roles you need to fill, the team context, and any specific requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition resize-none"
                  />
                </div>

                {/* Timeline + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Hiring Timeline</label>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Budget Range</label>
                    <select
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    >
                      <option value="">Select budget</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={form.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Anything else we should know about your company culture, tech stack, or hiring process..."
                    className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-amber text-navy font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Register as a Client
                      <AppIcon name="ArrowRightIcon" size={16} className="text-navy" />
                    </>
                  )}
                </button>

                <p className="text-xs text-highway/60 text-center">
                  No commitment required. We will reach out to discuss fit before any engagement begins.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
