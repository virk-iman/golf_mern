import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY. Database connections will fail.');
}

// Service role client bypasses RLS and should ONLY be used in the backend
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
