'use client';

import { createClient } from '@/lib/supabase/client';

export interface CandidateSubmission {
  fullName: string;
  email: string;
  phone?: string;
  roleInterest?: string;
  experienceYears?: number;
  skills?: string;
  message?: string;
  resumeFile?: File;
}

export interface ClientOnboarding {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  companySize?: string;
  industry?: string;
  hiringNeeds: string;
  servicesInterested?: string[];
  timeline?: string;
  budgetRange?: string;
  additionalNotes?: string;
}

function isSchemaError(error: { code?: string; message?: string }): boolean {
  if (!error) return false;
  if (error.code && typeof error.code === 'string') {
    const errorClass = error.code.substring(0, 2);
    if (errorClass === '42') return true;
    if (errorClass === '23') return false;
    if (errorClass === '08') return true;
  }
  if (error.message) {
    const schemaErrorPatterns = [
      /relation.*does not exist/i,
      /column.*does not exist/i,
      /function.*does not exist/i,
      /syntax error/i,
      /type.*does not exist/i,
    ];
    return schemaErrorPatterns.some((p) => p.test(error.message!));
  }
  return false;
}

export const recruitmentService = {
  async submitCandidate(data: CandidateSubmission): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();
    let resumeUrl: string | null = null;
    let resumeFilename: string | null = null;

    // Upload resume if provided
    if (data.resumeFile) {
      const fileExt = data.resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${data.fullName.replace(/\s+/g, '_')}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dispatch-resumes')
        .upload(filePath, data.resumeFile, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        if (isSchemaError(uploadError)) throw uploadError;
        return { success: false, error: 'Failed to upload resume. Please try again.' };
      }

      const { data: urlData } = supabase.storage
        .from('dispatch-resumes')
        .getPublicUrl(filePath);

      resumeUrl = urlData?.publicUrl ?? null;
      resumeFilename = data.resumeFile.name;
    }

    try {
      const { error } = await supabase.from('candidates').insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        role_interest: data.roleInterest || null,
        experience_years: data.experienceYears || null,
        skills: data.skills || null,
        message: data.message || null,
        resume_url: resumeUrl,
        resume_filename: resumeFilename,
      });

      if (error) {
        if (isSchemaError(error)) throw error;
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { success: false, error: e?.message || 'Submission failed. Please try again.' };
    }
  },

  async submitClientOnboarding(data: ClientOnboarding): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('client_onboarding').insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone || null,
        company_size: data.companySize || null,
        industry: data.industry || null,
        hiring_needs: data.hiringNeeds,
        services_interested: data.servicesInterested || [],
        timeline: data.timeline || null,
        budget_range: data.budgetRange || null,
        additional_notes: data.additionalNotes || null,
      });

      if (error) {
        if (isSchemaError(error)) throw error;
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { success: false, error: e?.message || 'Submission failed. Please try again.' };
    }
  },
};
