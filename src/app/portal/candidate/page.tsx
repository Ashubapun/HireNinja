'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export default function CandidatePortal() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs' | 'profile'>('applications');
  const [resumeName, setResumeName] = useState('John_Doe_Resume.pdf');
  const [isUploading, setIsUploading] = useState(false);

  // Profile states
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [location, setLocation] = useState('San Francisco, CA');
  const [portfolio, setPortfolio] = useState('https://github.com/johndoe');
  const [currentTitle, setCurrentTitle] = useState('Senior Software Engineer');
  const [currentCompany, setCurrentCompany] = useState('Nova Tech');
  const [experienceLevel, setExperienceLevel] = useState('Senior');
  const [summary, setSummary] = useState('Passionate frontend-heavy fullstack developer with 6+ years of experience building responsive, highly functional React/TypeScript applications.');
  
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL']);
  const [skillInput, setSkillInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user && user.user_metadata?.role !== 'candidate') {
      router.push(`/portal/${user.user_metadata.role}`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0B1628] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleUploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const fileName = e.target.files[0].name;
      setTimeout(() => {
        setResumeName(fileName);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false); // Back to viewer mode
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const applications = [
    { id: 1, role: 'Senior React Developer', company: 'TechVibe Solutions', date: 'Aug 18, 2026', status: 'Interviewing', stage: 'Technical Round' },
    { id: 2, role: 'Fullstack Engineer', company: 'Nova Growth', date: 'Aug 14, 2026', status: 'Offer Received', stage: 'Decision Stage' },
    { id: 3, role: 'Product Architect', company: 'Apex Global', date: 'Jul 30, 2026', status: 'Applied', stage: 'Resume Review' },
  ];

  const recommendedJobs = [
    { id: 'j1', role: 'Staff Front-End Developer', company: 'CloudCore Inc', location: 'Remote (US/Canada)', salary: '$140k - $170k', match: '98% Match' },
    { id: 'j2', role: 'Senior TypeScript Engineer', company: 'BlockStream Ltd', location: 'Hybrid (New York)', salary: '$130k - $160k', match: '95% Match' },
    { id: 'j3', role: 'Lead DevOps Engineer', company: 'SecureLink Tech', location: 'Remote (Global)', salary: '$150k - $180k', match: '91% Match' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1628] text-white">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber">Candidate Dashboard</span>
            <h1 className="text-3xl font-black mt-1">Welcome back, {user.user_metadata?.full_name || 'Ninja Candidate'}!</h1>
            <p className="text-white/50 text-sm mt-1">Manage your active recruitment pipelines and job applications.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
              🟢 Live Match Status
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
          
          {/* Left Sidebar Links */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'applications'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="BriefcaseIcon" size={18} />
              <span>Applications</span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'jobs'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="MagnifyingGlassIcon" size={18} />
              <span>Job Matches</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="UserIcon" size={18} />
              <span>My Profile</span>
            </button>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Tab: Applications */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black tracking-wide text-white">Active Applications</h2>
                
                {applications.map((app) => (
                  <div key={app.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber/40 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="font-extrabold text-lg text-white">{app.role}</h3>
                        <p className="text-white/60 text-sm mt-1">{app.company} • Submitted: {app.date}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg text-center ${
                          app.status === 'Offer Received'
                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                            : app.status === 'Interviewing'
                            ? 'bg-amber/20 border border-amber/30 text-amber'
                            : 'bg-white/10 border border-white/20 text-white/70'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-white/40">{app.stage}</span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="mt-6 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            app.status === 'Offer Received' ? 'w-full bg-emerald-500' : app.status === 'Interviewing' ? 'w-2/3 bg-amber' : 'w-1/3 bg-white/45'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-white/50">
                        {app.status === 'Offer Received' ? 'Stage 4/4' : app.status === 'Interviewing' ? 'Stage 3/4' : 'Stage 1/4'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Job Matches */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black tracking-wide text-white">Recommended for You</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-amber/40 transition-colors duration-200">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-extrabold text-base text-white">{job.role}</h3>
                          <span className="text-[10px] font-black uppercase px-2 py-1 bg-amber/15 border border-amber/30 text-amber rounded-md">
                            {job.match}
                          </span>
                        </div>
                        <p className="text-white/60 text-xs mt-1 mb-4">{job.company}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Icon name="MapPinIcon" size={14} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Icon name="CurrencyDollarIcon" size={14} />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <button className="mt-6 w-full py-2.5 bg-amber text-navy font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-colors duration-200">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Profile & Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                {/* Save Confirmation Toast */}
                {saveSuccess && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm animate-pulse">
                    <Icon name="CheckCircleIcon" size={18} className="flex-shrink-0" />
                    <span>Profile saved successfully! Your matched recommendations are updated.</span>
                  </div>
                )}

                {!isEditing ? (
                  /* 1. High-Fidelity Professional Portfolio Card Mode */
                  <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
                    
                    {/* Glowing background accent behind layout */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber/5 blur-[80px] rounded-full pointer-events-none" />

                    {/* Header Block: Avatar, Name, Badges & Edit action */}
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-5">
                        {/* Avatar ring */}
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber to-amber/30 p-[1.5px] shadow-[0_0_20px_rgba(245,166,35,0.15)] flex-shrink-0">
                          <div className="w-full h-full rounded-[14px] bg-[#0C1525] flex items-center justify-center font-black text-amber text-3xl">
                            {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'N'}
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 border-2 border-[#0C1525] rounded-full" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl font-black text-white tracking-tight">{user.user_metadata?.full_name || 'Ninja Candidate'}</h2>
                            <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-md">
                              Active Matching
                            </span>
                          </div>
                          <p className="text-white/70 text-sm font-medium mt-1">
                            {currentTitle} at <span className="text-amber font-semibold">{currentCompany}</span>
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">{location}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 bg-amber hover:bg-amber-light text-navy font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-amber flex items-center gap-2 self-stretch md:self-auto justify-center"
                      >
                        <Icon name="PencilSquareIcon" size={15} />
                        Edit Profile
                      </button>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Experience Tier</p>
                        <p className="text-sm font-black text-white">{experienceLevel}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Status</p>
                        <p className="text-sm font-black text-emerald-400">Open to Offers</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Core Speciality</p>
                        <p className="text-sm font-black text-white">Fullstack Dev</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Notice Period</p>
                        <p className="text-sm font-black text-amber">Immediate</p>
                      </div>
                    </div>

                    {/* Grid Details Layout */}
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left: Summary + Skills */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Summary block */}
                        <div className="space-y-3">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber">Professional Summary</h3>
                          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                            {summary}
                          </p>
                        </div>

                        {/* Skills block */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber">Verified Skills & Tools</h3>
                          <div className="flex flex-wrap gap-2.5">
                            {skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-[#0C1525] border border-white/10 hover:border-amber/40 hover:text-amber text-white/90 text-xs font-bold rounded-xl uppercase tracking-wider transition-all duration-200 cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Contact Card & Verification */}
                      <div className="space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber">Contact Details</h3>
                        
                        <div className="space-y-4.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber flex-shrink-0">
                              <Icon name="EnvelopeIcon" size={16} />
                            </div>
                            <div className="text-xs overflow-hidden">
                              <p className="text-white/40 font-bold uppercase tracking-wider">Email</p>
                              <p className="text-white/80 font-semibold mt-0.5 truncate">{user.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber flex-shrink-0">
                              <Icon name="PhoneIcon" size={16} />
                            </div>
                            <div className="text-xs">
                              <p className="text-white/40 font-bold uppercase tracking-wider">Phone</p>
                              <p className="text-white/80 font-semibold mt-0.5">{phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber flex-shrink-0">
                              <Icon name="MapPinIcon" size={16} />
                            </div>
                            <div className="text-xs">
                              <p className="text-white/40 font-bold uppercase tracking-wider">Location</p>
                              <p className="text-white/80 font-semibold mt-0.5">{location}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber flex-shrink-0">
                              <Icon name="LinkIcon" size={16} />
                            </div>
                            <div className="text-xs overflow-hidden">
                              <p className="text-white/40 font-bold uppercase tracking-wider">GitHub / Link</p>
                              <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline font-semibold block mt-0.5 truncate">
                                {portfolio.replace('https://', '')}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Resume File */}
                        <div className="border-t border-white/10 pt-6">
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber mb-3">Resume Document</p>
                          <div className="p-4 bg-[#0C1525] border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <Icon name="DocumentIcon" size={24} className="text-amber flex-shrink-0" />
                              <div className="text-xs overflow-hidden">
                                <p className="font-extrabold text-white truncate">{resumeName}</p>
                                <p className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                                  <span>✓ Verified by HireNinja</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* 2. Interactive Resume Editor Form Mode */
                  <form onSubmit={handleSaveProfile} className="space-y-8 bg-white/5 border border-white/10 p-6 rounded-2xl">
                    
                    {/* Header Controls */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <h3 className="text-lg font-extrabold text-white">Edit Candidate Profile</h3>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Profile Form */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/45">Personal Information</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            required
                            defaultValue={user.user_metadata?.full_name} 
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            defaultValue={user.email} 
                            disabled
                            className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Location</label>
                          <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Details */}
                    <div className="border-t border-white/10 pt-8 space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/45">Professional Experience</h4>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Current Job Title</label>
                          <input 
                            type="text" 
                            value={currentTitle}
                            onChange={(e) => setCurrentTitle(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Current Employer</label>
                          <input 
                            type="text" 
                            value={currentCompany}
                            onChange={(e) => setCurrentCompany(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Experience Tier</label>
                          <select 
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                          >
                            <option value="Junior">Junior (0-2 years)</option>
                            <option value="Mid-Level">Mid-Level (2-5 years)</option>
                            <option value="Senior">Senior (5-8 years)</option>
                            <option value="Staff/Principal">Staff/Principal (8+ years)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Professional Summary</label>
                        <textarea 
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          rows={4}
                          className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Portfolio / Git Link</label>
                        <input 
                          type="url" 
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Skills Tag Section */}
                    <div className="border-t border-white/10 pt-8 space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/45">Skills & Technologies</h4>
                      
                      {/* Skill Inputs */}
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          placeholder="Add a skill (e.g. Docker, Rust)"
                          className="flex-1 px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                        />
                        <button 
                          type="button"
                          onClick={handleAddSkill}
                          className="px-6 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-200"
                        >
                          Add Tag
                        </button>
                      </div>

                      {/* Render Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber/15 border border-amber/35 text-amber text-xs font-bold rounded-lg uppercase tracking-wider"
                          >
                            <span>{skill}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-white transition-colors"
                            >
                              <Icon name="XMarkIcon" size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resume Section */}
                    <div className="border-t border-white/10 pt-8 space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/45">Your Resume</h4>
                      <div className="p-6 bg-white/5 border border-dashed border-white/20 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center text-amber">
                            <Icon name="DocumentIcon" size={24} />
                          </div>
                          <div>
                            <p className="font-extrabold text-sm text-white">{resumeName}</p>
                            <p className="text-xs text-white/40">Uploaded recently</p>
                          </div>
                        </div>
                        <div>
                          <label className="px-6 py-2.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors duration-200 cursor-pointer text-center block">
                            {isUploading ? 'Uploading...' : 'Replace Resume'}
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleUploadResume} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3.5 border border-white/10 text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-8 py-3.5 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.02] shadow-amber flex items-center gap-2"
                      >
                        {isSaving ? (
                          <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
