"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/format";
import type { Prompt } from "@/lib/db/prompts";

type Props = {
  prompt: Prompt;
  onToggleFavorite: (id: string, currentValue: boolean) => void;
  onRequestDelete: (id: string) => void;
};

export function PromptCard({ prompt, onToggleFavorite, onRequestDelete }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1.5px solid",
        borderColor: hovered ? "var(--border-2)" : "var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/dashboard/${prompt.id}`)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-1)",
              }}
            >
              {prompt.title}
            </span>
            {prompt.favorite && (
              <span
                style={{
                  color: "oklch(70% 0.18 75)",
                  fontSize: 13,
                  lineHeight: 1,
                }}
              >
                ★
              </span>
            )}
            {prompt.category && (
              <Badge color="default">{prompt.category}</Badge>
            )}
            {prompt.public && <Badge color="green">público</Badge>}
          </div>
          {prompt.description && (
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                lineHeight: 1.5,
                textWrap: "pretty",
              }}
            >
              {prompt.description}
            </p>
          )}
          {prompt.content && (
            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  background: "var(--bg-2)",
                  padding: "3px 8px",
                  borderRadius: 6,
                }}
              >
                {prompt.content.slice(0, 72)}…
              </span>
            </div>
          )}
        </div>

        <div
          style={{ display: "flex", gap: 4, flexShrink: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onToggleFavorite(prompt.id, prompt.favorite)}
            title={
              prompt.favorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
            aria-label={
              prompt.favorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
            aria-pressed={prompt.favorite}
            style={{
              width: 30,
              height: 30,
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: prompt.favorite ? "oklch(70% 0.18 75)" : "var(--text-3)",
              fontSize: 14,
              transition: "all 0.12s ease",
            }}
          >
            ★
          </button>
          <button
            onClick={() => onRequestDelete(prompt.id)}
            title="Eliminar"
            aria-label={`Eliminar prompt: ${prompt.title}`}
            className="dashboard-delete-btn"
            style={{
              width: 30,
              height: 30,
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-3)",
              fontSize: 12,
              transition: "all 0.12s ease",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>
          Actualizado {formatRelativeTime(prompt.updated_at)}
        </span>
        <div style={{ flex: 1 }} />
        {prompt.public && prompt.slug && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/prompt/${prompt.slug}`);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            Ver URL pública →
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/${prompt.id}`);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "var(--text-2)",
            fontWeight: 500,
          }}
        >
          Editar →
        </button>
      </div>
    </div>
  );
}
