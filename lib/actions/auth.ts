"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignInResult = { error: string } | undefined;
export type SignUpResult = { error: string } | { success: true };

function translateError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials"))
    return "Email o contraseña incorrectos.";
  if (lower.includes("email not confirmed"))
    return "Confirma tu email antes de entrar. Revisa tu bandeja.";
  if (lower.includes("already registered") || lower.includes("user already"))
    return "Ya existe una cuenta con ese email.";
  if (lower.includes("password") && lower.includes("at least"))
    return "La contraseña debe tener al menos 6 caracteres.";
  if (lower.includes("rate limit"))
    return "Demasiados intentos. Espera un momento.";
  return message;
}

export async function signIn(
  email: string,
  password: string,
): Promise<SignInResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: translateError(error.message) };
  redirect("/dashboard");
}

export async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<SignUpResult> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) return { error: translateError(error.message) };
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
