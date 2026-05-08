import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export class AuthError extends Error {
  constructor() {
    super("No tienes sesión iniciada.");
    this.name = "AuthError";
  }
}

export async function getOptionalUser(): Promise<{
  user: User | null;
  supabase: SupabaseClient;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, supabase };
}

export async function requireUser(): Promise<{
  user: User;
  supabase: SupabaseClient;
}> {
  const { user, supabase } = await getOptionalUser();
  if (!user) throw new AuthError();
  return { user, supabase };
}
