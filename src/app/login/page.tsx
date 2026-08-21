'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/AppIcon';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, user, loading } = useAuth();

  // State controls
  const [role, setRole] = useState<'candidate' | 'client'>('candidate');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to correct portal
  useEffect(() => {
    if (!loading && user) {
      const userRole = user.user_metadata?.role || 'candidate';
      router.push(`/portal/${userRole}`);
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (!email || !password || (isSignUp && !fullName)) {
      setErrorMsg('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password, { fullName, role });
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.push(`/portal/${role}`);
        }, 1500);
      } else {
        const data = await signIn(email, password);
        const loggedInRole = data?.user?.user_metadata?.role || role;
        setSuccessMsg('Signed in successfully! Redirecting...');
        setTimeout(() => {
          router.push(`/portal/${loggedInRole}`);
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B1628] overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F4F6F8 1px, transparent 1px), linear-gradient(to bottom, #F4F6F8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        
        {/* Back Link & Logo */}
        <div className="flex flex-col items-center">
          <Link href="/home" className="inline-flex items-center gap-2 group mb-6">
            <Image
              src="/assets/images/Hire_Ninja_Image.jpeg"
              alt="Hire Ninja Logo"
              width={64}
              height={64}
              className="rounded-xl object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Hire</span>
              <span className="text-amber"> Ninja</span>
            </span>
          </Link>

          <h2 className="text-center text-2xl font-black text-white tracking-wide">
            {isSignUp ? 'Create your account' : 'Sign in to your portal'}
          </h2>
          <p className="mt-2 text-center text-sm text-white/50">
            {isSignUp ? 'Join HireNinja to start your journey' : 'Access your professional dashboard'}
          </p>
        </div>

        {/* Roles Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          <button
            onClick={() => setRole('candidate')}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
              role === 'candidate'
                ? 'bg-amber text-navy shadow-amber'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRole('client')}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
              role === 'client'
                ? 'bg-amber text-navy shadow-amber'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Client / Employer
          </button>
        </div>

        {/* Quick Demo Login */}
        {!isSignUp && (
          <div className="bg-amber/5 border border-amber/20 rounded-2xl p-4 text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber">
              ⚡ Quick Demo Portals
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole('candidate');
                  setEmail('candidate@demo.com');
                  setPassword('password123');
                }}
                className="py-2.5 px-3 bg-white/5 border border-white/10 hover:border-amber/40 rounded-xl text-xs font-semibold text-white/90 flex flex-col items-center gap-1 transition-all duration-200"
              >
                <span>Candidate Demo</span>
                <span className="text-[9px] text-white/40">candidate@demo.com</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('client');
                  setEmail('client@demo.com');
                  setPassword('password123');
                }}
                className="py-2.5 px-3 bg-white/5 border border-white/10 hover:border-amber/40 rounded-xl text-xs font-semibold text-white/90 flex flex-col items-center gap-1 transition-all duration-200"
              >
                <span>Client Demo</span>
                <span className="text-[9px] text-white/40">client@demo.com</span>
              </button>
            </div>
            <p className="text-[9px] text-white/30">(Password is: <span className="font-bold text-amber">password123</span>)</p>
          </div>
        )}

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <Icon name="ExclamationTriangleIcon" size={18} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
            <Icon name="CheckCircleIcon" size={18} className="flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/30 pointer-events-none">
                  <Icon name="UserIcon" size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber text-sm transition-all duration-200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/30 pointer-events-none">
                <Icon name="EnvelopeIcon" size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber text-sm transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/30 pointer-events-none">
                <Icon name="LockClosedIcon" size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.02] shadow-amber flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-xs font-bold text-amber hover:text-amber-light transition-colors duration-200 uppercase tracking-widest"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}
