'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTemplate(formData: FormData) {
  const supabase = await createClient()

  // 1. Verify Admin (Auth RBAC check uses metadata fallback + database profile)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role || user.app_metadata?.role || user.user_metadata?.role;

  if (role !== 'ADMIN') {
    console.warn(`[TemplateAction] Access denied for ${user.email}. Role found: ${role}`);
    return { error: 'Apenas administradores podem gerenciar templates.' }
  }

  const name = formData.get('name') as string
  const segment = formData.get('segment') as string
  const themeId = formData.get('themeId') as string
  const previewUrl = formData.get('previewUrl') as string

  if (!name || !segment || !themeId) return { error: 'Preencha todos os campos obrigatórios.' }

  const { error } = await supabase
    .from('site_templates')
    .insert({
      name,
      segment,
      theme_id: themeId,
      preview_url: previewUrl
    })

  if (error) {
    console.error('Error adding template:', error)
    return { error: 'Erro ao cadastrar template. Verifique se o ID_TEMA é único.' }
  }

  revalidatePath('/admin/templates')
  return { success: true }
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('site_templates')
    .delete()
    .eq('id', id)

  if (error) return { error: 'Erro ao excluir.' }
  
  revalidatePath('/admin/templates')
  return { success: true }
}

export async function getTemplatesBySegment(segment: string) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_templates')
      .select('*')
      .eq('segment', segment)
      .eq('is_active', true)
    return data || []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateStitchPreview(segment: string, name?: string) {
  // Simulação de chamada ao Stitch via IA
  // No futuro, isso usaria mcp_StitchMCP_generate_screen_from_text para gerar a imagem real
  const themes: Record<string, string> = {
    mecanica: 'https://images.unsplash.com/photo-1486006396193-471a6f58af6c?q=80&w=1200',
    saude: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200',
    vendas: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200',
    geral: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'
  }

  const baseImage = themes[segment] || themes.geral;
  return { 
    url: `${baseImage}&sig=${Math.random().toString(36).substring(7)}`,
    success: true 
  };
}
