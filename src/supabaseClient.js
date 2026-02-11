import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // CHANGED TO TRUE: This saves the session to LocalStorage
    autoRefreshToken: true,    // Keeps the session alive in the background
    detectSessionInUrl: true   // Helps with email confirmation links
  }
})