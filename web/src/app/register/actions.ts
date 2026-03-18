'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as string
  const inviteCode = formData.get('inviteCode') as string

  // 1. Se for PARCEIRO, validar o convite antes de criar a conta
  if (role === 'PARTNER') {
    if (!inviteCode) {
      return { error: 'Código de convite obrigatório para parceiros.' }
    }

    const { data: isValid, error: inviteError } = await supabase.rpc('consume_invite', { 
      invite_code: inviteCode.trim().toUpperCase() 
    })

    if (inviteError || !isValid) {
      console.error('Invite Validation Error:', inviteError)
      return { error: 'Código de convite inválido ou expirado.' }
    }
  }

  // 2. Criar a conta no Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/auth/callback`,
      data: {
        full_name: fullName,
        role: role,
        email: email // Backup para o trigger do banco
      }
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
}

