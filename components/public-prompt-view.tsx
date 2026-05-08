"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";
import { Badge } from "@/components/ui/badge";
import type { PublicPrompt } from "@/lib/db/prompts";
import { formatRelativeTime } from "@/lib/format";

export function PublicPromptView({ prompt }: { prompt: PublicPrompt }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(prompt.content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="screen-enter">
      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <Badge color="accent">{prompt.category}</Badge>
          <span style={{ color: "var(--text-3)", fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>
            Actualizado {formatRelativeTime(prompt.updated_at)}
          </span>
        </div>

        <h1
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
            marginBottom: 14,
            lineHeight: 1.15,
            textWrap: "pretty",
          }}
        >
          {prompt.title}
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "var(--text-2)",
            lineHeight: 1.65,
            marginBottom: 36,
            textWrap: "pretty",
          }}
        >
          {prompt.description}
        </p>

        <div
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-2)",
                  fontFamily: "var(--mono)",
                }}
              >
                prompt
              </span>
            </div>
            <button
              onClick={copy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)",
                background: copied ? "oklch(93% 0.04 155)" : "var(--surface)",
                color: copied ? "oklch(38% 0.15 155)" : "var(--text-2)",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              {copied ? "✓ Copiado" : "Copiar"}
            </button>
          </div>

          <pre
            style={{
              margin: 0,
              padding: "22px 20px",
              fontFamily: "var(--mono)",
              fontSize: 14,
              color: "var(--text-1)",
              lineHeight: 1.75,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {prompt.content}
          </pre>
        </div>

        <div
          style={{
            marginTop: 36,
            padding: "24px",
            background: "var(--accent-light)",
            borderRadius: "var(--r-lg)",
            border: "1px solid oklch(85% 0.08 270)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-1)",
                marginBottom: 3,
              }}
            >
              ¿Quieres guardar tus propios prompts?
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>
              Crea una cuenta gratuita en PromptStore.
            </div>
          </div>
          <Btn onClick={() => router.push("/registro")}>
            Crear cuenta gratis
          </Btn>
        </div>
      </main>
    </div>
  );
}
