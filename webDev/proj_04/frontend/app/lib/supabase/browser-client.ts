'use client';
import {createBrowserClient} from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { create } from "domain";

type SupabaseSchema = Record<string, never>;

let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  client = createBrowserClient<SupabaseSchema>(supabaseUrl, supabaseKey);
  return client;
}
