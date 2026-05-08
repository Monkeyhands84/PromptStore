"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/categories";
import type { Prompt, PromptInput } from "@/lib/db/prompts";
import {
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "@/lib/actions/prompts";
import { improvePrompt as improvePromptAction } from "@/lib/actions/ai";

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

  const charCount = content.length;

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
    initialPrompt?.slug ||
    (title
      ? title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 60) || "mi-prompt"
      : "mi-prompt");

  return (
    <div
      className="screen-enter"
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "32px 24px 64px",
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 28,
          fontSize: 13,
        }}
      >
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-3)",
            fontSize: 13,
          }}
        >
          Dashboard
        </button>
        <span style={{ color: "var(--text-3)" }}>›</span>
        <span style={{ color: "var(--text-2)" }}>
          {isNew ? "Nuevo prompt" : "Editar prompt"}
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, flex: 1 }}>
          {isNew ? "Nuevo prompt" : "Editar prompt"}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {savedFlash && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--r-sm)",
                background: "oklch(93% 0.04 155)",
                color: "oklch(38% 0.15 155)",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              ✓ Guardado
            </div>
          )}
          {!isNew && (
            <Btn
              variant="ghost"
              onClick={() => setConfirmDelete(true)}
              disabled={pending}
              style={{ color: "oklch(55% 0.20 25)" }}
            >
              Eliminar
            </Btn>
          )}
          <Btn variant="ghost" onClick={() => router.push("/dashboard")}>
            Cancelar
          </Btn>
          <Btn onClick={save} disabled={!title.trim() || pending}>
            {pending && !confirmDelete
              ? "Guardando…"
              : isNew
                ? "Crear prompt"
                : "Guardar cambios"}
          </Btn>
        </div>
      </div>

      {error && (
        <div
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

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-2)",
                }}
              >
                Contenido del prompt
              </label>
              <button
                onClick={improvePrompt}
                disabled={!content.trim() || aiLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: "var(--r-sm)",
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  border: "none",
                  cursor:
                    content.trim() && !aiLoading ? "pointer" : "not-allowed",
                  opacity: !content.trim() || aiLoading ? 0.5 : 1,
                  fontSize: 12,
                  fontWeight: 500,
                  transition: "all 0.15s",
                }}
              >
                {aiLoading ? "…" : "✦"}{" "}
                {aiLoading ? "Mejorando" : "Mejorar con IA"}
              </button>
            </div>
            <textarea
              placeholder="Escribe tu prompt aquí. Sé específico sobre el rol, contexto, formato de salida y restricciones."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              style={{
                width: "100%",
                padding: "13px",
                resize: "vertical",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                fontSize: 14,
                fontFamily: "var(--mono)",
                color: "var(--text-1)",
                background: "var(--bg-2)",
                lineHeight: 1.7,
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "var(--text-3)",
              }}
            >
              <span>Usa [VARIABLES] para marcar partes dinámicas</span>
              <span>{charCount} caracteres</span>
            </div>
          </div>

          {/* AI Panel */}
          {aiPanel && (
            <div
              style={{
                border: "1.5px solid var(--accent)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background: "var(--accent-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--accent)",
                  }}
                >
                  ✦ Versión mejorada por IA
                </span>
                <button
                  onClick={() => setAiPanel(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent)",
                    fontSize: 16,
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: 16 }}>
                {aiLoading ? (
                  <div
                    style={{
                      color: "var(--text-3)",
                      fontSize: 13,
                      textAlign: "center",
                      padding: "20px 0",
                    }}
                  >
                    Analizando y mejorando tu prompt…
                  </div>
                ) : (
                  <>
                    <pre
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 13,
                        color: "var(--text-1)",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.7,
                        marginBottom: 14,
                        maxHeight: 220,
                        overflowY: "auto",
                      }}
                    >
                      {aiResult}
                    </pre>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn size="sm" onClick={applyAiResult}>
                        Usar esta versión
                      </Btn>
                      <Btn
                        variant="ghost"
                        size="sm"
                        onClick={() => setAiPanel(false)}
                      >
                        Descartar
                      </Btn>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: 18,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "var(--text-3)",
                marginBottom: 14,
              }}
            >
              Visibilidad
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-1)" }}>
                  ⭐ Favorito
                </span>
                <div
                  onClick={() => setIsFav((f) => !f)}
                  style={{
                    width: 36,
                    height: 20,
                    borderRadius: 99,
                    background: isFav ? "oklch(70% 0.18 75)" : "var(--border)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: isFav ? 18 : 2,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-1)" }}>
                  🌍 Público
                </span>
                <div
                  onClick={() => setIsPublic((p) => !p)}
                  style={{
                    width: 36,
                    height: 20,
                    borderRadius: 99,
                    background: isPublic ? "var(--accent)" : "var(--border)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: isPublic ? 18 : 2,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </label>

              {isPublic && (
                <div
                  style={{
                    padding: "8px 10px",
                    background: "var(--bg-2)",
                    borderRadius: "var(--r-sm)",
                    marginTop: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-3)",
                      marginBottom: 3,
                    }}
                  >
                    URL pública
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--text-2)",
                      wordBreak: "break-all",
                    }}
                  >
                    /prompt/{slugPreview}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: 18,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "var(--text-3)",
                marginBottom: 14,
              }}
            >
              Categoría
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CATEGORIES.slice(1).map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(active ? "" : cat)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 99,
                      fontSize: 12,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: active ? "var(--accent)" : "var(--border)",
                      background: active
                        ? "var(--accent-light)"
                        : "var(--bg)",
                      color: active ? "var(--accent)" : "var(--text-2)",
                      transition: "all 0.12s",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              background: "var(--accent-light)",
              border: "1px solid oklch(85% 0.08 270)",
              borderRadius: "var(--r-lg)",
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 10,
              }}
            >
              ✦ Tips de escritura
            </div>
            {[
              'Define el rol: "Actúa como…"',
              "Especifica el formato de salida",
              "Usa [VARIABLES] para datos dinámicos",
              "Añade restricciones de longitud",
            ].map((tip, i) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  color: "oklch(42% 0.12 270)",
                  marginBottom: 5,
                  paddingLeft: 10,
                  borderLeft: "2px solid var(--accent-mid)",
                }}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setConfirmDelete(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-lg)",
              padding: 28,
              maxWidth: 360,
              width: "90%",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Eliminar prompt
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-2)",
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres
              eliminar este prompt?
            </p>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Btn variant="outline" onClick={() => setConfirmDelete(false)}>
                Cancelar
              </Btn>
              <Btn
                variant="danger"
                onClick={handleDelete}
                disabled={pending}
              >
                {pending ? "Eliminando…" : "Eliminar"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
