"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { slugify } from "@/lib/slug";
import type { Prompt, PromptInput } from "@/lib/db/prompts";
import {
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "@/lib/actions/prompts";
import { improvePrompt as improvePromptAction } from "@/lib/actions/ai";
import { EditorTopBar } from "@/components/editor/top-bar";
import { ContentField } from "@/components/editor/content-field";
import { AiResultPanel } from "@/components/editor/ai-panel";
import { EditorSidebar } from "@/components/editor/sidebar";

export function PromptEditor({
  initialPrompt,
}: {
  initialPrompt?: Prompt | null;
}) {
  const router = useRouter();
  const isNew = !initialPrompt;

  const [title, setTitle] = useState(initialPrompt?.title ?? "");
  const [description, setDescription] = useState(
    initialPrompt?.description ?? "",
  );
  const [content, setContent] = useState(initialPrompt?.content ?? "");
  const [category, setCategory] = useState(initialPrompt?.category ?? "");
  const [isFav, setIsFav] = useState(initialPrompt?.favorite ?? false);
  const [isPublic, setIsPublic] = useState(initialPrompt?.public ?? false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPanel, setAiPanel] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const buildInput = (): PromptInput => ({
    title: title.trim(),
    description: description.trim(),
    content,
    category,
    favorite: isFav,
    public: isPublic,
  });

  const save = () => {
    if (!title.trim()) return;
    setError("");
    startTransition(async () => {
      const result = isNew
        ? await createPrompt(buildInput())
        : await updatePrompt(initialPrompt!.id, buildInput());

      if ("error" in result) {
        setError(result.error);
        return;
      }
      setSavedFlash(true);
      setTimeout(() => router.push("/dashboard"), 900);
    });
  };

  const handleDelete = () => {
    if (!initialPrompt) return;
    startTransition(async () => {
      const result = await deletePrompt(initialPrompt.id);
      if ("error" in result) {
        setError(result.error);
        setConfirmDelete(false);
        return;
      }
      router.push("/dashboard");
    });
  };

  const improvePrompt = async () => {
    if (!content.trim()) return;
    setError("");
    setAiLoading(true);
    setAiPanel(true);
    setAiResult("");

    const result = await improvePromptAction({
      title,
      category,
      content,
    });

    if ("error" in result) {
      setError(result.error);
      setAiPanel(false);
      setAiLoading(false);
      return;
    }

    setAiResult(result.data.content);
    setAiLoading(false);
  };

  const applyAiResult = () => {
    setContent(aiResult);
    setAiPanel(false);
    setAiResult("");
  };

  const slugPreview =
    initialPrompt?.slug || (title ? slugify(title) || "mi-prompt" : "mi-prompt");

  return (
    <div
      className="screen-enter"
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "32px 24px 64px",
      }}
    >
      <EditorTopBar
        isNew={isNew}
        pending={pending}
        savedFlash={savedFlash}
        canSave={!!title.trim()}
        confirmDeleteOpen={confirmDelete}
        onSave={save}
        onRequestDelete={() => setConfirmDelete(true)}
      />

      {error && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            borderRadius: "var(--r-sm)",
            background: "oklch(95% 0.04 25)",
            color: "oklch(40% 0.18 25)",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <div
        className="editor-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 260px",
          gap: 24,
        }}
      >
        {/* Left: main fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Input
            label="Título"
            placeholder="Dale un nombre claro a este prompt"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Descripción"
            placeholder="¿Para qué sirve este prompt? (1-2 frases)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
          />

          <ContentField
            value={content}
            onChange={setContent}
            onImprove={improvePrompt}
            improving={aiLoading}
          />

          {aiPanel && (
            <AiResultPanel
              loading={aiLoading}
              result={aiResult}
              onApply={applyAiResult}
              onDismiss={() => setAiPanel(false)}
            />
          )}
        </div>

        <EditorSidebar
          isFav={isFav}
          setIsFav={setIsFav}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          category={category}
          setCategory={setCategory}
          slugPreview={slugPreview}
        />
      </div>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Eliminar prompt"
        description="Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este prompt?"
        footer={
          <>
            <Btn variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancelar
            </Btn>
            <Btn variant="danger" onClick={handleDelete} disabled={pending}>
              {pending ? "Eliminando…" : "Eliminar"}
            </Btn>
          </>
        }
      />
    </div>
  );
}
