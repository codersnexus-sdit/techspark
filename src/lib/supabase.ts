// Client-only barrel to avoid pulling server-only code into client bundles
export { createClient } from './supabase-client'