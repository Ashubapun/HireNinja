-- Dispatch Recruitment: candidates + client_onboarding tables + resumes storage bucket

-- 1. Candidates table (resume submissions)
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role_interest TEXT,
    experience_years INTEGER,
    skills TEXT,
    resume_url TEXT,
    resume_filename TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Client onboarding table
CREATE TABLE IF NOT EXISTS public.client_onboarding (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_size TEXT,
    industry TEXT,
    hiring_needs TEXT NOT NULL,
    services_interested TEXT[],
    timeline TEXT,
    budget_range TEXT,
    additional_notes TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_candidates_email ON public.candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON public.candidates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_client_onboarding_email ON public.client_onboarding(email);
CREATE INDEX IF NOT EXISTS idx_client_onboarding_created_at ON public.client_onboarding(created_at DESC);

-- 4. Enable RLS
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_onboarding ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies — public can insert (no auth required for submissions), no public read
DROP POLICY IF EXISTS "anyone_can_submit_candidate" ON public.candidates;
CREATE POLICY "anyone_can_submit_candidate"
ON public.candidates
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "anyone_can_submit_client_onboarding" ON public.client_onboarding;
CREATE POLICY "anyone_can_submit_client_onboarding"
ON public.client_onboarding
FOR INSERT
TO public
WITH CHECK (true);

-- 6. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 7. Triggers
DROP TRIGGER IF EXISTS candidates_updated_at ON public.candidates;
CREATE TRIGGER candidates_updated_at
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS client_onboarding_updated_at ON public.client_onboarding;
CREATE TRIGGER client_onboarding_updated_at
    BEFORE UPDATE ON public.client_onboarding
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
