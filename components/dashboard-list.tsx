"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/categories";
import { formatRelativeTime } from "@/lib/format";
import type { Prompt } from "@/lib/db/prompts";
import { deletePrompt, toggleFavorite } from "@/lib/actions/prompts";

export function DashboardList({
  initialPrompts,
}: {
  initialPrompts: Prompt[];
}) {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [onlyFav, setOnlyFav] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = prompts.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchCat = category === "Todos" || p.category === category;
    const matchFav = !onlyFav || p.favorite;
    return matchSearch && matchCat && matchFav;
  });

  const handleToggleFav = (id: string, currentValue: boolean) => {
    // Optimistic UI; server action revalidates in the background.
    setPrompts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, favorite: !currentValue } : p)),
    );
    startTransition(async () => {
      await toggleFavorite(id, !currentValue);
    });
  };

  const handleDelete = (id: string) => {
    setPrompts((ps) => ps.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    startTransition(async () => {
      await deletePrompt(id);
    });
  };

  return (
    <div
      className="screen-enter"
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      {/* Sidebar */}
      <aside
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
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-3)",
            }}
          >
            Categorías
          </span>
        </div>

        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                if (cat !== "Todos") setOnlyFav(false);
              }}
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
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "var(--bg-3)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              {cat}
            </button>
          );
        })}

        <div style={{ padding: "0 8px", marginTop: 16, marginBottom: 4 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-3)",
            }}
          >
            Filtros
          </span>
        </div>

        <button
          onClick={() => {
            setOnlyFav((f) => !f);
            setCategory("Todos");
          }}
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
            {prompts.length} prompt{prompts.length !== 1 ? "s" : ""} guardados
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

      {/* Main */}
      <main style={{ padding: "28px 32px", overflowY: "auto" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-3)",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Buscar prompts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: 34,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                fontSize: 14,
                fontFamily: "var(--sans)",
                background: "var(--surface)",
                color: "var(--text-1)",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
          <div style={{ flex: 1 }} />
          <Btn onClick={() => router.push("/dashboard/nuevo")}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
            Nuevo prompt
          </Btn>
        </div>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>
            {onlyFav ? "★ Favoritos" : category}
            {search && (
              <span
                style={{
                  color: "var(--text-3)",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                {" "}
                · &quot;{search}&quot;
              </span>
            )}
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 0",
              color: "var(--text-3)",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>◇</div>
            <p style={{ fontSize: 15 }}>
              {prompts.length === 0
                ? "Aún no tienes prompts. Crea el primero."
                : "No hay prompts que coincidan."}
            </p>
            {prompts.length === 0 ? (
              <Btn
                size="sm"
                onClick={() => router.push("/dashboard/nuevo")}
                style={{ marginTop: 12 }}
              >
                + Nuevo prompt
              </Btn>
            ) : (
              <Btn
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setCategory("Todos");
                  setOnlyFav(false);
                }}
                style={{ marginTop: 12 }}
              >
                Limpiar filtros
              </Btn>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((prompt) => (
              <div
                key={prompt.id}
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid",
                  borderColor:
                    hovered === prompt.id
                      ? "var(--border-2)"
                      : "var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "18px 20px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow:
                    hovered === prompt.id
                      ? "var(--shadow-md)"
                      : "var(--shadow-sm)",
                  transform:
                    hovered === prompt.id ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={() => setHovered(prompt.id)}
                onMouseLeave={() => setHovered(null)}
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
                      onClick={() => handleToggleFav(prompt.id, prompt.favorite)}
                      title={
                        prompt.favorite
                          ? "Quitar de favoritos"
                          : "Añadir a favoritos"
                      }
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
                        color: prompt.favorite
                          ? "oklch(70% 0.18 75)"
                          : "var(--text-3)",
                        fontSize: 14,
                        transition: "all 0.12s ease",
                      }}
                    >
                      ★
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(prompt.id)}
                      title="Eliminar"
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "oklch(55% 0.20 25)";
                        e.currentTarget.style.color = "oklch(55% 0.20 25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-3)";
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
            ))}
          </div>
        )}
      </main>

      {/* Delete modal */}
      {deleteConfirm !== null && (
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
          onClick={() => setDeleteConfirm(null)}
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
              <Btn variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </Btn>
              <Btn variant="danger" onClick={() => handleDelete(deleteConfirm)}>
                Eliminar
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
