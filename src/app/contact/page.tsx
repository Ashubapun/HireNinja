'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppIcon from '@/components/ui/AppIcon';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.');
      return;
    }

    setLoading(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  };

  const contactDetails = [
    {
      icon: 'EnvelopeIcon',
      label: 'Email us',
      value: 'hello@dispatchrecruitment.com',
      sub: 'We reply within one business day.',
    },
    {
      icon: 'PhoneIcon',
      label: 'Call us',
      value: '+1 (800) 555-0192',
      sub: 'Mon–Fri, 9 am – 6 pm EST.',
    },
    {
      icon: 'MapPinIcon',
      label: 'Our office',
      value: '340 Pine Street, Suite 800',
      sub: 'San Francisco, CA 94104',
    },
  ];

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
            <AppIcon name="ChatBubbleLeftRightIcon" size={14} className="text-amber" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
              Get in touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl">
            Let's start a
            <br />
            <span className="text-amber">conversation.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Whether you're looking to hire, exploring our services, or just have a question — we're here and happy to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: contact details */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber/15 flex items-center justify-center flex-shrink-0">
                    <AppIcon
                      name={item.icon as Parameters<typeof AppIcon>[0]['name']}
                      size={18}
                      className="text-amber"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-highway mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-navy">{item.value}</p>
                    <p className="text-xs text-highway mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-navy/10" />

            {/* Quick links */}
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-highway">
                Looking for something specific?
              </p>
              <div className="space-y-2">
                <Link
                  href="/clients"
                  className="flex items-center justify-between p-3 rounded-xl bg-navy/5 hover:bg-amber/10 transition-colors group"
                >
                  <span className="text-sm font-bold text-navy">Hire through Dispatch</span>
                  <AppIcon
                    name="ArrowRightIcon"
                    size={14}
                    className="text-highway group-hover:text-amber transition-colors"
                  />
                </Link>
                <Link
                  href="/candidates"
                  className="flex items-center justify-between p-3 rounded-xl bg-navy/5 hover:bg-amber/10 transition-colors group"
                >
                  <span className="text-sm font-bold text-navy">Submit your resume</span>
                  <AppIcon
                    name="ArrowRightIcon"
                    size={14}
                    className="text-highway group-hover:text-amber transition-colors"
                  />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-between p-3 rounded-xl bg-navy/5 hover:bg-amber/10 transition-colors group"
                >
                  <span className="text-sm font-bold text-navy">Explore our services</span>
                  <AppIcon
                    name="ArrowRightIcon"
                    size={14}
                    className="text-highway group-hover:text-amber transition-colors"
                  />
                </Link>
              </div>
            </div>

            {/* Response time badge */}
            <div className="p-5 rounded-2xl bg-navy border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-white/70">
                  Typically responds in
                </span>
              </div>
              <p className="text-2xl font-black text-amber">&lt; 4 hours</p>
              <p className="text-xs text-white/50 leading-relaxed">
                During business hours. After hours, we'll get back to you first thing the next
                morning.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-white rounded-3xl shadow-card border border-navy/8 p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center mx-auto">
                  <AppIcon name="CheckCircleIcon" size={32} className="text-amber" />
                </div>
                <h2 className="text-2xl font-black text-navy">Message received.</h2>
                <p className="text-highway max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out. Someone from the Dispatch team will be in touch
                  within one business day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all"
                  >
                    Send Another
                  </button>
                  <Link
                    href="/home"
                    className="px-6 py-3 bg-navy/8 text-navy font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-navy/15 transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-card border border-navy/8 p-8 md:p-10 space-y-6"
              >
                <h2 className="text-xl font-black text-navy">Send us a message</h2>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                    <AppIcon
                      name="ExclamationCircleIcon"
                      size={18}
                      className="text-red-500 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Your Name <span className="text-amber">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Email <span className="text-amber">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                  >
                    <option value="">Select a topic…</option>
                    <option value="hiring">I want to hire through Dispatch</option>
                    <option value="candidate">I'm a candidate looking for work</option>
                    <option value="services">Question about your services</option>
                    <option value="partnership">Partnership or referral inquiry</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">
                    Message <span className="text-amber">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 amber-glow"
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>

                <p className="text-xs text-highway/60 text-center">
                  By submitting this form you agree to our{' '}
                  <span className="text-navy font-bold">privacy policy</span>. We never share
                  your information with third parties.
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
