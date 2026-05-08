"use server";

import { revalidatePath } from "next/cache";
import { requireUser, AuthError } from "@/lib/auth";
import type { PromptInput } from "@/lib/db/prompts";
import { buildSlugCandidate } from "@/lib/slug";

export type ActionResult<T = void> =
  | { error: string }
  | (T extends void ? { ok: true } : { ok: true; data: T });

const POSTGRES_UNIQUE_VIOLATION = "23505";
const SLUG_RETRIES = 4;
const GENERIC_ERROR = "Algo salió mal. Inténtalo de nuevo.";

function logServerError(scope: string, error: unknown) {
  console.error(`[action:${scope}]`, error);
}

export async function createPrompt(
  input: PromptInput,
): Promise<ActionResult<{ id: string }>> {
  let user, supabase;
  try {
    ({ user, supabase } = await requireUser());
  } catch (e) {
    if (e instanceof AuthError) return { error: e.message };
    logServerError("createPrompt:auth", e);
    return { error: GENERIC_ERROR };
  }

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
      logServerError("createPrompt", error);
      return { error: "No se pudo crear el prompt. Inténtalo de nuevo." };
    }
  }

  return { error: "No se pudo generar un slug único. Inténtalo de nuevo." };
}

export async function updatePrompt(
  id: string,
  input: PromptInput,
): Promise<ActionResult> {
  let user, supabase;
  try {
    ({ user, supabase } = await requireUser());
  } catch (e) {
    if (e instanceof AuthError) return { error: e.message };
    logServerError("updatePrompt:auth", e);
    return { error: GENERIC_ERROR };
  }

  const title = input.title.trim();
  if (!title) return { error: "El título es obligatorio." };

  // Defense-in-depth: verify ownership at the action level too, not just RLS.
  const { error, count } = await supabase
    .from("prompts")
    .update(
      {
        title,
        description: input.description.trim(),
        content: input.content,
        category: input.category,
        favorite: input.favorite,
        public: input.public,
      },
      { count: "exact" },
    )
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    logServerError("updatePrompt", error);
    return { error: "No se pudo guardar el prompt. Inténtalo de nuevo." };
  }
  if (count === 0) return { error: "No se encontró el prompt." };

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/${id}`);
  return { ok: true };
}

export async function deletePrompt(id: string): Promise<ActionResult> {
  let user, supabase;
  try {
    ({ user, supabase } = await requireUser());
  } catch (e) {
    if (e instanceof AuthError) return { error: e.message };
    logServerError("deletePrompt:auth", e);
    return { error: GENERIC_ERROR };
  }

  const { error, count } = await supabase
    .from("prompts")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    logServerError("deletePrompt", error);
    return { error: "No se pudo eliminar el prompt." };
  }
  if (count === 0) return { error: "No se encontró el prompt." };

  revalidatePath("/dashboard");
  return { ok: true };
}

export async function toggleFavorite(
  id: string,
  favorite: boolean,
): Promise<ActionResult> {
  let user, supabase;
  try {
    ({ user, supabase } = await requireUser());
  } catch (e) {
    if (e instanceof AuthError) return { error: e.message };
    logServerError("toggleFavorite:auth", e);
    return { error: GENERIC_ERROR };
  }

  const { error } = await supabase
    .from("prompts")
    .update({ favorite })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    logServerError("toggleFavorite", error);
    return { error: "No se pudo actualizar el favorito." };
  }
  revalidatePath("/dashboard");
  return { ok: true };
}
