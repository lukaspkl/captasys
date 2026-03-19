-- Tabela para capturar leads dos sites provisionados
CREATE TABLE IF NOT EXISTS public.site_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID REFERENCES public.site_projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NULL,
    phone TEXT NOT NULL,
    message TEXT NULL,
    status TEXT DEFAULT 'new', -- new, contacted, lost, won
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Políticas de RLS
ALTER TABLE public.site_leads ENABLE ROW LEVEL SECURITY;

-- Proprietários do site podem ver LEADS
CREATE POLICY "Owners can view leads of their sites"
ON public.site_leads
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.site_projects
    WHERE public.site_projects.id = public.site_leads.site_id
    AND public.site_projects.owner_id = auth.uid()
  )
);

-- Qualquer um pode INSERIR lead (vindo do site público)
CREATE POLICY "Anyone can insert leads"
ON public.site_leads
FOR INSERT
WITH CHECK (true);
