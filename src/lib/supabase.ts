import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || url.includes('xyzproject') || !key || key.includes('placeholder')) {
    throw new Error('Supabase non configuré. Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  
  supabaseInstance = createClient(url, key)
  return supabaseInstance
}
