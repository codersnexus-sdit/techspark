import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
  // Check if environment variables are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables are not set. Please create a .env.local file with your Supabase credentials.')
    // Return a mock client for development
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
      auth: {
        signOut: () => Promise.resolve({ error: null }),
      },
      channel: () => ({
        on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
      }),
      removeChannel: () => {},
    } as unknown as SupabaseClient
  }
  
  return createClientComponentClient()
}


