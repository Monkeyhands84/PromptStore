"use client";

import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";
import { CATEGORIES } from "@/lib/categories";

type Props = {
  totalCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onlyFav: boolean;
  onToggleOnlyFav: () => void;
};

const SECTION_LABEL: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-3)",
};

export function DashboardSidebar({
  totalCount,
  activeCategory,
  onSelectCategory,
  onlyFav,
  onToggleOnlyFav,
}: Props) {
  const router = useRouter();

  return (
    <aside
      className="dashboard-sidebar"
      style={{
        borderRight: "1px solid var(--border)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "0 8px", marginBottom: 8 }}>
        <span style={SECTION_LABEL}>Categorías</span>
      </div>

      {CATEGORIES.map((cat) => {
        const active = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            aria-pressed={active}
            className="dashboard-cat-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 12px",
              borderRadius: "var(--r-sm)",
              fontSize: 13,
              background: active ? "var(--accent-light)" : "transparent",
              color: active ? "var(--accent)" : "var(--text-2)",
              fontWeight: active ? 500 : 400,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "background 0.12s ease",
            }}
          >
            {cat}
          </button>
        );
      })}

      <div style={{ padding: "0 8px", marginTop: 16, marginBottom: 4 }}>
        <span style={SECTION_LABEL}>Filtros</span>
      </div>

      <button
        onClick={onToggleOnlyFav}
        aria-pressed={onlyFav}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          borderRadius: "var(--r-sm)",
          fontSize: 13,
          background: onlyFav ? "oklch(95% 0.05 80)" : "transparent",
          color: onlyFav ? "oklch(45% 0.16 75)" : "var(--text-2)",
          fontWeight: onlyFav ? 500 : 400,
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          width: "100%",
        }}
      >
        ★ Favoritos
      </button>

      <div style={{ flex: 1 }} />
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-3)",
            padding: "0 8px",
            marginBottom: 8,
          }}
        >
          {totalCount} prompt{totalCount !== 1 ? "s" : ""} guardados
        </div>
        <Btn
          onClick={() => router.push("/dashboard/nuevo")}
          style={{ width: "100%", justifyContent: "center" }}
          size="sm"
        >
          + Nuevo prompt
        </Btn>
      </div>
    </aside>
  );
}
