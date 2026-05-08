"use client";

import { Btn } from "@/components/ui/btn";

type Props = {
  loading: boolean;
  result: string;
  onApply: () => void;
  onDismiss: () => void;
};

export function AiResultPanel({ loading, result, onApply, onDismiss }: Props) {
  return (
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
          onClick={onDismiss}
          aria-label="Cerrar panel de IA"
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
        {loading ? (
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
              {result}
            </pre>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn size="sm" onClick={onApply}>
                Usar esta versión
              </Btn>
              <Btn variant="ghost" size="sm" onClick={onDismiss}>
                Descartar
              </Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
