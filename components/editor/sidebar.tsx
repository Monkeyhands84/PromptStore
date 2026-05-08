"use client";

import { Toggle } from "@/components/ui/toggle";
import { CATEGORIES } from "@/lib/categories";

type Props = {
  isFav: boolean;
  setIsFav: (next: boolean) => void;
  isPublic: boolean;
  setIsPublic: (next: boolean) => void;
  category: string;
  setCategory: (next: string) => void;
  slugPreview: string;
};

const TIPS = [
  'Define el rol: "Actúa como…"',
  "Especifica el formato de salida",
  "Usa [VARIABLES] para datos dinámicos",
  "Añade restricciones de longitud",
];

const SECTION_LABEL: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--text-3)",
  marginBottom: 14,
};

const CARD: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-lg)",
  padding: 18,
};

export function EditorSidebar({
  isFav,
  setIsFav,
  isPublic,
  setIsPublic,
  category,
  setCategory,
  slugPreview,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Visibility */}
      <div style={CARD}>
        <div style={SECTION_LABEL}>Visibilidad</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Toggle
            id="toggle-favorite"
            checked={isFav}
            onChange={setIsFav}
            label="⭐ Favorito"
            activeColor="oklch(70% 0.18 75)"
          />
          <Toggle
            id="toggle-public"
            checked={isPublic}
            onChange={setIsPublic}
            label="🌍 Público"
          />
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

      {/* Category */}
      <div style={CARD}>
        <div style={SECTION_LABEL}>Categoría</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CATEGORIES.slice(1).map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(active ? "" : cat)}
                aria-pressed={active}
                style={{
                  padding: "4px 12px",
                  borderRadius: 99,
                  fontSize: 12,
                  cursor: "pointer",
                  border: "1.5px solid",
                  borderColor: active ? "var(--accent)" : "var(--border)",
                  background: active ? "var(--accent-light)" : "var(--bg)",
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

      {/* Tips */}
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
        {TIPS.map((tip, i) => (
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
  );
}
