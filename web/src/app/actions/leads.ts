'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function captureLead(formData: FormData) {
  const supabase = await createClient()

  const siteId = formData.get('siteId') as string
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!siteId || !name || !phone) {
    return { error: 'Por favor, preencha nome e telefone.' }
  }

  const { error } = await supabase
    .from('site_leads')
    .insert({
      site_id: siteId,
      name,
      phone,
      email: email || null,
      message: message || null
    })

  if (error) {
    console.error('Lead Capture Error:', error)
    return { error: 'Ocorreu um erro ao enviar. Tente novamente mais tarde.' }
  }

  // Notificar cliente via Dashboard (revalidate)
  revalidatePath('/dashboard/my-site')
  return { success: true }
}

export async function getLeadsBySite(siteId: string) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_leads')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: false })
    return data || []
}
