import "server-only";

import { getOpenAIClient } from "@/lib/ai/openai";

const DEFAULT_MODEL = "gpt-5.2";

type ImprovePromptInput = {
  title?: string;
  category?: string;
  content: string;
};

export async function improvePromptWithAI({
  title,
  category,
  content,
}: ImprovePromptInput): Promise<string> {
  const client = getOpenAIClient();

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    instructions:
      "Eres un experto en prompt engineering. Mejora prompts de usuario para que sean más claros, específicos y accionables. Mantén el idioma original del prompt. Devuelve únicamente la versión mejorada, sin explicaciones, sin markdown envolvente y sin comentarios previos.",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: [
              title?.trim() ? `Título: ${title.trim()}` : null,
              category?.trim() ? `Categoría: ${category.trim()}` : null,
              "Prompt original:",
              content.trim(),
              "",
              "Mejóralo añadiendo, cuando sea útil: rol, contexto, objetivo, restricciones, formato de salida, tono y criterios de calidad. Conserva variables como [VARIABLES] si existen.",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      },
    ],
    max_output_tokens: 1200,
  });

  const improvedPrompt = response.output_text.trim();

  if (!improvedPrompt) {
    throw new Error("OpenAI no devolvió una mejora válida.");
  }

  return improvedPrompt;
}
