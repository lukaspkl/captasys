'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error, data: { user } } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Get user role for redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  // Fallback hierarchy: Database Profile -> Auth User Metadata -> Default 'CLIENT'
  const role =
    profile?.role ||
    (user?.app_metadata?.role as string) ||
    (user?.user_metadata?.role as string) ||
    'CLIENT'

  revalidatePath('/', 'layout')
  
  if (role === 'ADMIN') redirect('/admin/core')
  if (role === 'PARTNER') redirect('/partner/hub')
  redirect('/dashboard/my-site')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
