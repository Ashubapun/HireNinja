'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppIcon from '@/components/ui/AppIcon';
import { recruitmentService } from '@/lib/services/recruitmentService';

const roleOptions = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist / ML Engineer',
  'DevOps / Platform Engineer',
  'UX / Product Designer',
  'QA / Test Engineer',
  'Engineering Manager',
  'Technical Lead',
  'Business Analyst',
  'Other',
];

const experienceOptions = [
  { label: '0–1 years', value: 0 },
  { label: '2–3 years', value: 2 },
  { label: '4–6 years', value: 4 },
  { label: '7–10 years', value: 7 },
  { label: '10+ years', value: 10 },
];

export default function CandidatesPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleInterest: '',
    experienceYears: '',
    skills: '',
    message: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5 MB.');
      return;
    }
    setError(null);
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Full name and email are required.');
      return;
    }

    setLoading(true);
    const result = await recruitmentService.submitCandidate({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone || undefined,
      roleInterest: form.roleInterest || undefined,
      experienceYears: form.experienceYears ? parseInt(form.experienceYears) : undefined,
      skills: form.skills || undefined,
      message: form.message || undefined,
      resumeFile: resumeFile ?? undefined,
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
            <AppIcon name="DocumentArrowUpIcon" size={14} className="text-amber" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber">
              For Candidates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl">
            Your next role starts
            <br />
            <span className="text-amber">with one upload.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Submit your resume and we will match you to open roles across our client network. No
            job board noise. Direct placement.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-navy mb-3">How it works</h2>
              <ol className="space-y-4">
                {[
                  { step: '01', text: 'Fill in your details and upload your resume (PDF or Word).' },
                  { step: '02', text: 'Our team reviews your profile within 2 business days.' },
                  { step: '03', text: 'We reach out if there is a match — no spam, no cold calls.' },
                  { step: '04', text: 'We handle introductions, scheduling, and offer support.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-amber/15 text-amber font-black text-xs flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </span>
                    <p className="text-sm text-highway leading-relaxed pt-1">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-navy/8 shadow-card space-y-3">
              <AppIcon name="ShieldCheckIcon" size={20} className="text-amber" />
              <h3 className="font-black text-navy text-sm">Your data is safe</h3>
              <p className="text-xs text-highway leading-relaxed">
                Your resume is stored securely and shared only with clients relevant to your
                profile. We never sell candidate data.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy border border-navy/20 space-y-3">
              <h3 className="font-black text-white text-sm">Already placed?</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                If you were placed through Dispatch and want to update your profile or explore new
                opportunities, reach out directly.
              </p>
              <a href="mailto:talent@dispatch.com" className="text-xs text-amber font-bold hover:underline">
                talent@dispatch.com
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-white rounded-3xl shadow-card border border-navy/8 p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center mx-auto">
                  <AppIcon name="CheckCircleIcon" size={32} className="text-amber" />
                </div>
                <h2 className="text-2xl font-black text-navy">Application received!</h2>
                <p className="text-highway max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your profile. Our team will review your details and be
                  in touch within 2 business days if there is a match.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({ fullName: '', email: '', phone: '', roleInterest: '', experienceYears: '', skills: '', message: '' });
                      setResumeFile(null);
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
                <h2 className="text-xl font-black text-navy">Submit your profile</h2>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                    <AppIcon name="ExclamationCircleIcon" size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">
                      Full Name <span className="text-amber">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
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
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    />
                  </div>
                </div>

                {/* Phone + Role */}
                <div className="grid sm:grid-cols-2 gap-4">
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
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy uppercase tracking-wider">Role Interest</label>
                    <select
                      name="roleInterest"
                      value={form.roleInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                    >
                      <option value="">Select a role type</option>
                      {roleOptions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Years of Experience</label>
                  <div className="flex flex-wrap gap-2">
                    {experienceOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, experienceYears: String(opt.value) }))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          form.experienceYears === String(opt.value)
                            ? 'bg-amber text-navy border-amber' :'bg-canvas text-highway border-navy/15 hover:border-amber/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Key Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, TypeScript, Node.js, AWS"
                    className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-canvas text-navy text-sm placeholder:text-highway/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition"
                  />
                </div>

                {/* Resume upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Resume</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                      dragOver
                        ? 'border-amber bg-amber/5'
                        : resumeFile
                        ? 'border-amber/50 bg-amber/5' :'border-navy/20 bg-canvas hover:border-amber/40 hover:bg-amber/3'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                    />
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <AppIcon name="DocumentTextIcon" size={24} className="text-amber" />
                        <div className="text-left">
                          <p className="text-sm font-bold text-navy">{resumeFile.name}</p>
                          <p className="text-xs text-highway">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                          className="ml-2 text-highway hover:text-navy"
                        >
                          <AppIcon name="XMarkIcon" size={16} className="text-highway" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <AppIcon name="CloudArrowUpIcon" size={32} className="text-highway/50 mx-auto mb-3" />
                        <p className="text-sm font-bold text-navy">Drop your resume here or click to browse</p>
                        <p className="text-xs text-highway mt-1">PDF, DOC, DOCX · Max 5 MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy uppercase tracking-wider">Anything else we should know?</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Preferred work arrangement, location constraints, target salary range..."
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
                      Submit Application
                      <AppIcon name="ArrowRightIcon" size={16} className="text-navy" />
                    </>
                  )}
                </button>

                <p className="text-xs text-highway/60 text-center">
                  By submitting, you agree to our privacy policy. We will never share your data without consent.
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
