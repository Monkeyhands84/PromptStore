import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Prompt = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  favorite: boolean;
  public: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
};

// Public-safe projection — used for the /prompt/[slug] page so the user_id
// of the author never reaches the client.
export type PublicPrompt = Omit<Prompt, "user_id">;

export type PromptInput = {
  title: string;
  description: string;
  content: string;
  category: string;
  favorite: boolean;
  public: boolean;
};

const PROMPT_COLUMNS =
  "id, user_id, title, description, content, category, favorite, public, slug, created_at, updated_at";

const PUBLIC_PROMPT_COLUMNS =
  "id, title, description, content, category, favorite, public, slug, created_at, updated_at";

export const listMyPrompts = cache(async (): Promise<Prompt[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(PROMPT_COLUMNS)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Prompt[];
});

export const getMyPromptById = cache(
  async (id: string): Promise<Prompt | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("prompts")
      .select(PROMPT_COLUMNS)
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return (data as Prompt | null) ?? null;
  },
);

export const getPublicPromptBySlug = cache(
  async (slug: string): Promise<PublicPrompt | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("prompts")
      .select(PUBLIC_PROMPT_COLUMNS)
      .eq("slug", slug)
      .eq("public", true)
      .maybeSingle();

    if (error) throw error;
    return (data as PublicPrompt | null) ?? null;
  },
);
