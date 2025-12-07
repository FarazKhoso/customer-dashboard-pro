import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient;

if (typeof window !== 'undefined') {
  // Client-side code
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Create a dummy client for development when env vars are missing
    // This will allow the app to load but auth features won't work
    console.warn('Missing Supabase environment variables. Please add them to your .env file.');

    // Create a mock client that doesn't crash the app
    supabase = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } }
        }),
        signInWithPassword: () => Promise.reject(new Error('Missing Supabase config')),
        signUp: () => Promise.reject(new Error('Missing Supabase config')),
        signInWithOAuth: () => Promise.reject(new Error('Missing Supabase config')),
        resetPasswordForEmail: () => Promise.reject(new Error('Missing Supabase config')),
        signOut: () => Promise.reject(new Error('Missing Supabase config')),
      }
    } as any as SupabaseClient;
  } else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} else {
  // Server-side code (if any)
  throw new Error('Supabase client should only be initialized on the client');
}

export default supabase;