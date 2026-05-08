import { notFound } from "next/navigation";
import { getPublicPromptBySlug } from "@/lib/db/prompts";
import { PublicPromptView } from "@/components/public-prompt-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = await getPublicPromptBySlug(slug);
  if (!prompt) return { title: "Prompt no encontrado · PromptStore" };
  return {
    title: `${prompt.title} · PromptStore`,
    description: prompt.description,
  };
}

export default async function PublicPromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = await getPublicPromptBySlug(slug);
  if (!prompt) notFound();

  return <PublicPromptView prompt={prompt} />;
}
