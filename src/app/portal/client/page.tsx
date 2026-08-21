'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export default function ClientPortal() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'requisitions' | 'pipeline' | 'post-job'>('requisitions');
  const [reqTitle, setReqTitle] = useState('');
  const [reqDept, setReqDept] = useState('Engineering');
  const [reqDesc, setReqDesc] = useState('');
  const [submittedReqs, setSubmittedReqs] = useState<any[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user && user.user_metadata?.role !== 'client') {
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

  const activeJobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote (US)', openings: 2, status: 'Active' },
    { id: 2, title: 'Fullstack Engineer', department: 'Product', location: 'New York (Hybrid)', openings: 1, status: 'Active' },
    { id: 3, title: 'Compliance Specialist', department: 'Legal', location: 'Remote (Europe)', openings: 1, status: 'Completed' },
  ];

  const candidatePipeline = [
    { id: 'c1', name: 'Danielle Brooks', role: 'Senior React Developer', stage: 'Interviewing', rating: '⭐️ 4.8', match: '96% Match' },
    { id: 'c2', name: 'Marcus Sterling', role: 'Fullstack Engineer', stage: 'Technical Round', rating: '⭐️ 4.5', match: '91% Match' },
    { id: 'c3', name: 'Elena Rostova', role: 'Senior React Developer', stage: 'Offer Stage', rating: '⭐️ 4.9', match: '98% Match' },
  ];

  const handleSubmitJobReq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle || !reqDesc) return;
    
    const newReq = {
      id: Date.now(),
      title: reqTitle,
      department: reqDept,
      location: 'Remote',
      openings: 1,
      status: 'Awaiting Screening'
    };

    setSubmittedReqs([newReq, ...submittedReqs]);
    setReqTitle('');
    setReqDesc('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab('requisitions');
    }, 2000);
  };

  const combinedJobs = [...submittedReqs, ...activeJobs];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1628] text-white">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber">Employer Dashboard</span>
            <h1 className="text-3xl font-black mt-1">Welcome, {user.user_metadata?.full_name || 'Partner Client'}!</h1>
            <p className="text-white/50 text-sm mt-1">Manage active recruitment pipelines, review talent matched by HireNinja, and post new requirements.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold bg-amber/10 border border-amber/20 text-amber rounded-full">
              ⚡ Exclusive Staffing Partner
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
          
          {/* Left Sidebar Links */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('requisitions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'requisitions'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="BriefcaseIcon" size={18} />
              <span>Job Requisitions</span>
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'pipeline'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="UserGroupIcon" size={18} />
              <span>Talent Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('post-job')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'post-job'
                  ? 'bg-amber text-navy'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name="PlusCircleIcon" size={18} />
              <span>Request Talent</span>
            </button>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Tab: Job Requisitions */}
            {activeTab === 'requisitions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black tracking-wide text-white">Active Positions</h2>
                  <button 
                    onClick={() => setActiveTab('post-job')}
                    className="px-4 py-2 border border-amber/30 text-amber font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber/10 transition-colors"
                  >
                    Post New
                  </button>
                </div>
                
                {combinedJobs.map((job) => (
                  <div key={job.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber/40 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="font-extrabold text-lg text-white">{job.title}</h3>
                        <p className="text-white/60 text-sm mt-1">{job.department} • {job.location} • Openings: {job.openings}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg text-center inline-block ${
                          job.status === 'Active'
                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                            : job.status === 'Awaiting Screening'
                            ? 'bg-amber/20 border border-amber/30 text-amber'
                            : 'bg-white/10 border border-white/20 text-white/50'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Talent Pipeline */}
            {activeTab === 'pipeline' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black tracking-wide text-white">HireNinja Matched Talent</h2>
                
                <div className="space-y-4">
                  {candidatePipeline.map((candidate) => (
                    <div key={candidate.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber/40 transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber/15 flex items-center justify-center font-black text-amber text-lg">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base text-white">{candidate.name}</h3>
                            <p className="text-white/60 text-xs mt-0.5">Matched for: <span className="text-white font-semibold">{candidate.role}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                          <div className="space-y-1 sm:text-right">
                            <p className="text-xs text-white/40">Evaluation</p>
                            <p className="text-sm font-bold text-white">{candidate.rating} • {candidate.match}</p>
                          </div>
                          <div className="space-y-1 sm:text-right">
                            <p className="text-xs text-white/40">Status</p>
                            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-amber/20 text-amber border border-amber/30 rounded-md">
                              {candidate.stage}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-amber text-navy font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-all duration-200">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Request Talent (Form) */}
            {activeTab === 'post-job' && (
              <div className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div>
                  <h2 className="text-xl font-black tracking-wide text-white">Submit Hiring Requirement</h2>
                  <p className="text-xs text-white/50 mt-1">Brief us on the skills and positions you need. We'll start matching immediately.</p>
                </div>

                {submitSuccess && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
                    <Icon name="CheckCircleIcon" size={18} className="flex-shrink-0" />
                    <span>Hiring requirement submitted successfully! Going back to list...</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmitJobReq}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Role Title</label>
                      <input 
                        type="text" 
                        required
                        value={reqTitle}
                        onChange={(e) => setReqTitle(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Department</label>
                      <select 
                        value={reqDept}
                        onChange={(e) => setReqDept(e.target.value)}
                        className="block w-full px-4 py-3 bg-[#0B1628] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Product">Product</option>
                        <option value="Legal & Finance">Legal & Finance</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Describe Your Requirements (Skills, Experience, Budget)</label>
                    <textarea 
                      required
                      value={reqDesc}
                      onChange={(e) => setReqDesc(e.target.value)}
                      placeholder="Specify required stack, timeline, budget range, and team size."
                      rows={5}
                      className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber text-sm transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.01] shadow-amber flex items-center justify-center gap-2"
                  >
                    Submit Requisition
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
