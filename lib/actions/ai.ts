"use server";

import { requireUser, AuthError } from "@/lib/auth";
import { improvePromptWithAI } from "@/lib/ai/improve-prompt";
import { checkAiRateLimit, logAiUsage } from "@/lib/ai/rate-limit";
import type { ActionResult } from "@/lib/actions/prompts";

const MAX_PROMPT_LENGTH = 12_000;
const GENERIC_ERROR = "No se pudo mejorar el prompt ahora mismo.";

export async function improvePrompt(input: {
  title?: string;
  category?: string;
  content: string;
}): Promise<ActionResult<{ content: string }>> {
  let user, supabase;
  try {
    ({ user, supabase } = await requireUser());
  } catch (e) {
    if (e instanceof AuthError) return { error: e.message };
    console.error("[improvePrompt:auth]", e);
    return { error: GENERIC_ERROR };
  }

  const content = input.content.trim();
  if (!content) return { error: "El contenido del prompt es obligatorio." };

  if (content.length > MAX_PROMPT_LENGTH) {
    return {
      error:
        "El prompt es demasiado largo para mejorarlo de una vez. Prueba con una versión más corta.",
    };
  }

  const limit = await checkAiRateLimit(supabase, user.id);
  if (!limit.ok) {
    const minutes = Math.max(1, Math.round(limit.retryAfterSeconds / 60));
    return {
      error:
        limit.reason === "hour"
          ? `Has alcanzado el límite de mejoras por hora. Vuelve a intentarlo en unos ${minutes} min.`
          : "Has alcanzado el límite diario de mejoras con IA. Vuelve mañana.",
    };
  }

  try {
    const improvedPrompt = await improvePromptWithAI({
      title: input.title,
      category: input.category,
      content,
    });

    // Log the call only after a successful generation; failed calls don't
    // count against the user's quota.
    await logAiUsage(supabase, user.id);

    return { ok: true, data: { content: improvedPrompt } };
  } catch (error) {
    console.error("[improvePrompt]", error);
    return { error: GENERIC_ERROR };
  }
}
