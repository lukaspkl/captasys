'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export type UserRole = 'ADMIN' | 'PARTNER' | 'CLIENT'

export function useRole() {
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getRole() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setRole(null)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(profile?.role || 'CLIENT')
      setLoading(false)
    }

    getRole()
  }, [supabase])

  return { role, loading }
}
