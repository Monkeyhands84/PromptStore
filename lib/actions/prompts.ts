"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PromptInput } from "@/lib/db/prompts";

export type ActionResult<T = void> =
  | { error: string }
  | (T extends void ? { ok: true } : { ok: true; data: T });

const POSTGRES_UNIQUE_VIOLATION = "23505";
const SLUG_RETRIES = 4;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function randomSuffix(len = 4): string {
  return Math.random().toString(36).slice(2, 2 + len);
}

function buildSlugCandidate(title: string, attempt: number): string {
  const base = slugify(title) || "prompt";
  return attempt === 0 ? base : `${base}-${randomSuffix()}`;
}

export async function createPrompt(
  input: PromptInput,
): Promise<ActionResult<{ id: string }>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No tienes sesión iniciada." };

  const title = input.title.trim();
  if (!title) return { error: "El título es obligatorio." };

  // Try to insert with a clean slug first; on collision, retry with a random suffix.
  for (let attempt = 0; attempt < SLUG_RETRIES; attempt++) {
    const { data, error } = await supabase
      .from("prompts")
      .insert({
        user_id: user.id,
        title,
        description: input.description.trim(),
        content: input.content,
        category: input.category,
        favorite: input.favorite,
        public: input.public,
        slug: buildSlugCandidate(title, attempt),
      })
      .select("id")
      .single();

    if (!error) {
      revalidatePath("/dashboard");
      return { ok: true, data: { id: data.id as string } };
    }
    if (error.code !== POSTGRES_UNIQUE_VIOLATION) {
      return { error: error.message };
    }
  }

  return { error: "No se pudo generar un slug único. Inténtalo de nuevo." };
}

export async function updatePrompt(
  id: string,
  input: PromptInput,
): Promise<ActionResult> {
  const supabase = await createClient();

  const title = input.title.trim();
  if (!title) return { error: "El título es obligatorio." };

  const { error } = await supabase
    .from("prompts")
    .update({
      title,
      description: input.description.trim(),
      content: input.content,
      category: input.category,
      favorite: input.favorite,
      public: input.public,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/${id}`);
  return { ok: true };
}

export async function deletePrompt(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function toggleFavorite(
  id: string,
  favorite: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("prompts")
    .update({ favorite })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { ok: true };
}
