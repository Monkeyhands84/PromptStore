"use client";

import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";

type Props = {
  isNew: boolean;
  pending: boolean;
  savedFlash: boolean;
  canSave: boolean;
  confirmDeleteOpen: boolean;
  onSave: () => void;
  onRequestDelete: () => void;
};

export function EditorTopBar({
  isNew,
  pending,
  savedFlash,
  canSave,
  confirmDeleteOpen,
  onSave,
  onRequestDelete,
}: Props) {
  const router = useRouter();

  return (
    <>
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
        className="editor-header"
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
              onClick={onRequestDelete}
              disabled={pending}
              style={{ color: "oklch(55% 0.20 25)" }}
            >
              Eliminar
            </Btn>
          )}
          <Btn variant="ghost" onClick={() => router.push("/dashboard")}>
            Cancelar
          </Btn>
          <Btn onClick={onSave} disabled={!canSave || pending}>
            {pending && !confirmDeleteOpen
              ? "Guardando…"
              : isNew
                ? "Crear prompt"
                : "Guardar cambios"}
          </Btn>
        </div>
      </div>
    </>
  );
}
