"use server";

import { createClient } from "@/lib/supabase/server";
import { improvePromptWithAI } from "@/lib/ai/improve-prompt";
import type { ActionResult } from "@/lib/actions/prompts";

const MAX_PROMPT_LENGTH = 12_000;

export async function improvePrompt(input: {
  title?: string;
  category?: string;
  content: string;
}): Promise<ActionResult<{ content: string }>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No tienes sesión iniciada." };

  const content = input.content.trim();
  if (!content) return { error: "El contenido del prompt es obligatorio." };

  if (content.length > MAX_PROMPT_LENGTH) {
    return {
      error:
        "El prompt es demasiado largo para mejorarlo de una vez. Prueba con una versión más corta.",
    };
  }

  try {
    const improvedPrompt = await improvePromptWithAI({
      title: input.title,
      category: input.category,
      content,
    });

    return { ok: true, data: { content: improvedPrompt } };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo mejorar el prompt ahora mismo.";
    return { error: message };
  }
}
