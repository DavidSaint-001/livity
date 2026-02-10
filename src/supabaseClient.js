import { createClient } from '@supabase/supabase-js'

// Your project address
const supabaseUrl = 'https://ytoknbseexbbreaaedvq.supabase.co'

// Your "guest pass" key
const supabaseAnonKey = 'sb_publishable_sxk2a6-NTUDuKBVLbF_PNw_aVY-Z0kC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)