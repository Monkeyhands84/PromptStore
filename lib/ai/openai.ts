import "server-only";

import OpenAI from "openai";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no está configurada.");
  }

  return new OpenAI({ apiKey });
}
