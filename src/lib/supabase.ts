import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client — pregătit pentru etapa de înscriere online.
 *
 * Momentan landing-ul este static. Când adăugăm formularul de înregistrare,
 * setează variabilele din `.env.local` (vezi `.env.example`) și folosește
 * `getSupabase()` în componente client sau în route handlers.
 */

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase nu este configurat. Adaugă NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în .env.local"
    );
  }

  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
