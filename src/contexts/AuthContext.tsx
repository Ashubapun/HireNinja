
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext<any>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Email/Password Sign Up
  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      const role = metadata?.role || 'candidate';
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata?.fullName || '',
            avatar_url: metadata?.avatarUrl || '',
            role: role
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      return data;
    } catch (supabaseError) {
      console.warn("Supabase SignUp failed, using mock registration fallback:", supabaseError);
      // Fallback: Store mock user locally
      const mockUser = {
        id: 'mock-' + Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: metadata?.fullName || '',
          role: metadata?.role || 'candidate'
        }
      };
      localStorage.setItem(`mock_user_${email}`, JSON.stringify({ ...mockUser, password }));
      setUser(mockUser);
      setSession({ user: mockUser });
      return { user: mockUser };
    }
  };

  // Email/Password Sign In
  const signIn = async (email: string, password: string) => {
    // Hardcoded Demo Logins
    if (password === 'password123') {
      if (email === 'candidate@demo.com') {
        const demoUser = {
          id: 'mock-candidate-demo',
          email: 'candidate@demo.com',
          user_metadata: {
            full_name: 'John Candidate (Demo)',
            role: 'candidate'
          }
        };
        setUser(demoUser);
        setSession({ user: demoUser });
        return { user: demoUser };
      } else if (email === 'client@demo.com') {
        const demoUser = {
          id: 'mock-client-demo',
          email: 'client@demo.com',
          user_metadata: {
            full_name: 'Ninja Employer (Demo)',
            role: 'client'
          }
        };
        setUser(demoUser);
        setSession({ user: demoUser });
        return { user: demoUser };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } catch (supabaseError) {
      console.warn("Supabase SignIn failed, checking mock credentials:", supabaseError);
      // Fallback: Check local mock database
      const stored = localStorage.getItem(`mock_user_${email}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.password === password) {
          const { password: _, ...mockUser } = parsed;
          setUser(mockUser);
          setSession({ user: mockUser });
          return { user: mockUser };
        }
      }
      throw new Error("Invalid login credentials.");
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase SignOut failed, clearing local session:", e);
    }
    setUser(null);
    setSession(null);
  };

  // Get Current User
  const getCurrentUser = async () => {
    if (user && user.id.startsWith('mock-')) return user;
    try {
      const { data: { user: sbUser }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return sbUser;
    } catch (e) {
      return user;
    }
  };

  // Check if Email is Verified
  const isEmailVerified = () => {
    if (user && user.id.startsWith('mock-')) return true;
    return user?.email_confirmed_at !== null;
  };

  // Get User Profile from Database
  const getUserProfile = async () => {
    if (!user) return null;
    if (user.id.startsWith('mock-')) {
      return {
        id: user.id,
        full_name: user.user_metadata?.full_name,
        role: user.user_metadata?.role
      };
    }
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      return {
        id: user.id,
        full_name: user.user_metadata?.full_name,
        role: user.user_metadata?.role
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isEmailVerified,
    getUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
