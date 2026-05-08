import { notFound } from "next/navigation";
import { PromptEditor } from "@/components/prompt-editor";
import { getMyPromptById } from "@/lib/db/prompts";

export const metadata = {
  title: "Editar prompt · PromptStore",
};

export default async function EditarPromptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = await getMyPromptById(id);
  // RLS guarantees we'd only get our own row. notFound() covers both
  // "doesn't exist" and "not yours" cases (the latter returns null too).
  if (!prompt) notFound();

  return <PromptEditor initialPrompt={prompt} />;
}
