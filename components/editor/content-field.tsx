"use client";

import { useId } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onImprove: () => void;
  improving: boolean;
};

export function ContentField({ value, onChange, onImprove, improving }: Props) {
  const id = useId();
  const charCount = value.length;
  const canImprove = !!value.trim() && !improving;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label
          htmlFor={id}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-2)",
          }}
        >
          Contenido del prompt
        </label>
        <button
          onClick={onImprove}
          disabled={!canImprove}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: "var(--r-sm)",
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "none",
            cursor: canImprove ? "pointer" : "not-allowed",
            opacity: canImprove ? 1 : 0.5,
            fontSize: 12,
            fontWeight: 500,
            transition: "all 0.15s",
          }}
        >
          {improving ? "…" : "✦"} {improving ? "Mejorando" : "Mejorar con IA"}
        </button>
      </div>
      <textarea
        id={id}
        placeholder="Escribe tu prompt aquí. Sé específico sobre el rol, contexto, formato de salida y restricciones."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
