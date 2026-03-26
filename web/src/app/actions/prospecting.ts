'use server'

import { createClient } from '@/utils/supabase/server'

interface Lead {
  score: number;
  temperature: string;
  title: string;
  address: string;
  phone: string;
  url: string;
  mapsUrl: string;
  rating: number;
  reviews: number;
  category: string;
  classificationMotivity: string;
}

export async function saveHotLeadsToVault(leads: Lead[], niche: string, city: string) {
    const supabase = await createClient()

    // Só salvamos leads com score relevante (acima de 40 ou temperatura não-fria)
    const topLeads = leads.filter(l => l.score >= 40 || l.temperature === 'Quente');
    
    if (topLeads.length === 0) return { success: true, saved: 0 };

    const formatted = topLeads.map(l => ({
        title: l.title,
        address: l.address,
        phone: l.phone,
        website: l.url,
        maps_url: l.mapsUrl,
        rating: l.rating,
        review_count: l.reviews,
        category: l.category,
        niche: niche.toUpperCase(),
        city: city.toUpperCase(),
        score: l.score,
        temperature: l.temperature,
        classification_motivity: l.classificationMotivity
    }));

    const { error } = await supabase
        .from('prospecting_leads')
        .upsert(formatted, { 
            onConflict: 'title,city,address',
            ignoreDuplicates: false 
        });

    if (error) {
        console.error('[PROSPECTING_VAULT_ERROR]', error);
        return { error: error.message };
    }

    return { success: true, saved: formatted.length };
}

export async function getLeadsFromVault(niche: string, city: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('prospecting_leads')
        .select('*')
        .eq('niche', niche.toUpperCase())
        .eq('city', city.toUpperCase())
        .order('score', { ascending: false });

    if (error) {
        console.error('[PROSPECTING_FETCH_ERROR]', error);
        return [];
    }

    // Mapear de volta para o formato esperado pelo frontend
    return (data || []).map(l => ({
        title: l.title,
        address: l.address,
        phone: l.phone,
        url: l.website,
        mapsUrl: l.maps_url,
        rating: l.rating,
        reviews: l.review_count,
        category: l.category,
        score: l.score,
        temperature: l.temperature,
        classificationMotivity: l.classification_motivity,
        city: l.city,
        analysisStatus: "RESTORED_FROM_VAULT"
    }));
}

export async function getAllLeadsFromVault() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('prospecting_leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[PROSPECTING_FETCH_ALL_ERROR]', error);
        return [];
    }

    return (data || []).map(l => ({
        title: l.title,
        address: l.address,
        phone: l.phone,
        url: l.website,
        mapsUrl: l.maps_url,
        rating: l.rating,
        reviews: l.review_count,
        category: l.category,
        score: l.score,
        temperature: l.temperature,
        classificationMotivity: l.classification_motivity,
        city: l.city,
        niche: l.niche,
        createdAt: l.created_at,
        analysisStatus: "FROM_VAULT"
    }));
}

export async function createIntelDossier(payload: {
    lead_id?: string;
    title: string;
    type: 'audit' | 'tactical' | 'renewal';
    data: Record<string, unknown>;
}) {
    const supabase = await createClient();
    
    // Normalizar slug: nome-da-empresa-tipo-random
    const baseSlug = payload.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    
    const id = crypto.randomUUID().split("-")[0];
    const slug = `${baseSlug}-${payload.type}-${id}`;

    // Tentar encontrar o ID do lead na tabela se não foi passado
    let leadId = payload.lead_id;
    if (!leadId) {
        const { data: leadData } = await supabase
            .from('prospecting_leads')
            .select('id')
            .eq('title', payload.title)
            .limit(1)
            .single();
        
        if (leadData) leadId = leadData.id;
    }

    if (!leadId) {
        // Se ainda não tem ID, precisamos criar o lead no vault primeiro ou falhar elegantemente
        // Por enquanto, vamos assumir que o lead já foi salvo no cofre antes de gerar o dossiê
        return { error: "Lead não encontrado no cofre. Salve o lead primeiro." };
    }

    const { data, error } = await supabase
        .from('intel_dossiers')
        .insert([{
            slug,
            lead_id: leadId,
            type: payload.type,
            data: payload.data,
            expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
        }])
        .select()
        .single();

    if (error) {
        console.error('[CREATE_INTEL_ERROR]', error);
        return { error: error.message };
    }

    return { success: true, slug: data.slug };
}

export async function getIntelBySlug(slug: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('intel_dossiers')
        .select('*, prospecting_leads(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

    if (error) {
        return { error: "Dossiê não encontrado ou expirado." };
    }

    return { success: true, dossier: data };
}
