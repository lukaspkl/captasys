'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { generateSiteContent } from './ai-content'

export async function createSite(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Usuário não autenticado.' }

  const subdomain = (formData.get('subdomain') as string)?.toLowerCase().trim()
  const segment = (formData.get('segment') as string) || 'geral'
  const themeId = (formData.get('themeId') as string) || 'default'
  const siteName = (formData.get('siteName') as string) || ''
  const whatsapp = (formData.get('whatsapp') as string) || ''
  const description = (formData.get('description') as string) || ''
  const hours = (formData.get('hours') as string) || 'Seg à Sáb: 08h - 18h'
  const address = (formData.get('address') as string) || ''
  const heroImage = (formData.get('heroImage') as string) || ''
  const heroPrompt = (formData.get('heroPrompt') as string) || ''

  // 1. Basic Validation
  if (!subdomain || subdomain.length < 3) return { error: 'O nome do site precisa de pelo menos 3 caracteres.' }
  if (!/^[a-z0-9-]+$/.test(subdomain)) return { error: 'Use apenas letras minúsculas, números e hífens.' }
  
  // 2. Check availability
  const { data: existing } = await supabase
    .from('site_projects')
    .select('id')
    .eq('subdomain', subdomain)
    .single()

  if (existing) return { error: 'Este nome já está em uso. Tente outro.' }

  // 3. GENERATE AI CONTENT
  // We try to get AI content, but we don't let it crash the whole process if it fails
  const aiResults = await generateSiteContent(segment, siteName, description, hours, address);

  // 4. Create Site with AI + Full Form Content
  // If AI fails, we use these fallback defaults
  const content = {
    site_name: siteName,
    whatsapp: whatsapp,
    hero_title: aiResults?.hero_title || `Bem-vindo à ${siteName}`,
    hero_subtitle: aiResults?.hero_subtitle || `Especialistas em ${segment} com excelência e qualidade.`,
    about_title: aiResults?.section_about_title || 'Sobre Nós',
    about_content: aiResults?.section_about_content || `Na ${siteName}, temos o compromisso de oferecer o melhor em ${segment}.`,
    theme_color: aiResults?.theme_color || (segment === 'mecanica' ? '#ef4444' : '#06b6d4'),
    services: [
        { 
            title: aiResults?.feature_1_title || 'Serviços Especializados', 
            desc: aiResults?.feature_1_desc || 'Atendimento personalizado com foco na sua necessidade.' 
        },
        { 
            title: aiResults?.feature_2_title || 'Qualidade Garantida', 
            desc: aiResults?.feature_2_desc || 'Processos modernos e equipe altamente qualificada.' 
        }
    ],
    address: address,
    hours: hours,
    cta_text: aiResults?.cta_text || 'Entrar em Contato',
    logo_url: '',
    hero_image_src: heroImage,
    hero_image_prompt: heroPrompt
  };

  const { error } = await supabase
    .from('site_projects')
    .insert({
      owner_id: user.id,
      subdomain: subdomain,
      segment: segment,
      theme_id: themeId,
      content: content
    })

  if (error) {
    console.error('Error creating site:', error)
    return { error: 'Erro ao registrar no banco de dados. Tente novamente.' }
  }

  revalidatePath('/dashboard/my-site')
  return { success: true, subdomain }
}

export async function checkSubdomain(subdomain: string) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_projects')
      .select('id')
      .eq('subdomain', subdomain.toLowerCase().trim())
      .single()
    return !!data
}
