import "server-only";
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

export async function listMyPrompts(): Promise<Prompt[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(PROMPT_COLUMNS)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Prompt[];
}

export async function getMyPromptById(id: string): Promise<Prompt | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(PROMPT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as Prompt | null) ?? null;
}

export async function getPublicPromptBySlug(
  slug: string,
): Promise<Prompt | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .select(PROMPT_COLUMNS)
    .eq("slug", slug)
    .eq("public", true)
    .maybeSingle();

  if (error) throw error;
  return (data as Prompt | null) ?? null;
}
