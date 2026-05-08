"use client";

import { useMemo, useState, useTransition } from "react";
import { Btn } from "@/components/ui/btn";
import { Dialog } from "@/components/ui/dialog";
import type { Prompt } from "@/lib/db/prompts";
import { deletePrompt, toggleFavorite } from "@/lib/actions/prompts";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardSearchBar } from "@/components/dashboard/search-bar";
import { DashboardErrorBanner } from "@/components/dashboard/error-banner";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { PromptCard } from "@/components/dashboard/prompt-card";

export function DashboardList({
  initialPrompts,
}: {
  initialPrompts: Prompt[];
}) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [onlyFav, setOnlyFav] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return prompts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchCat = category === "Todos" || p.category === category;
      const matchFav = !onlyFav || p.favorite;
      return matchSearch && matchCat && matchFav;
    });
  }, [prompts, search, category, onlyFav]);

  const handleToggleFav = (id: string, currentValue: boolean) => {
    // Optimistic UI; on failure we restore the previous state and surface the error.
    const snapshot = prompts;
    setPrompts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, favorite: !currentValue } : p)),
    );
    setActionError(null);
    startTransition(async () => {
      const result = await toggleFavorite(id, !currentValue);
      if ("error" in result) {
        setPrompts(snapshot);
        setActionError(result.error);
      }
    });
  };

  const handleDelete = (id: string) => {
    const snapshot = prompts;
    setPrompts((ps) => ps.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    setActionError(null);
    startTransition(async () => {
      const result = await deletePrompt(id);
      if ("error" in result) {
        setPrompts(snapshot);
        setActionError(result.error);
      }
    });
  };

  const onSelectCategory = (cat: string) => {
    setCategory(cat);
    if (cat !== "Todos") setOnlyFav(false);
  };

  const onToggleOnlyFav = () => {
    setOnlyFav((f) => !f);
    setCategory("Todos");
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("Todos");
    setOnlyFav(false);
  };

  return (
    <div
      className="screen-enter dashboard-shell"
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <DashboardSidebar
        totalCount={prompts.length}
        activeCategory={category}
        onSelectCategory={onSelectCategory}
        onlyFav={onlyFav}
        onToggleOnlyFav={onToggleOnlyFav}
      />

      <main
        className="dashboard-main"
        style={{ padding: "28px 32px", overflowY: "auto" }}
      >
        {actionError && (
          <DashboardErrorBanner
            message={actionError}
            onDismiss={() => setActionError(null)}
          />
        )}

        <DashboardSearchBar search={search} onSearchChange={setSearch} />

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

        {filtered.length === 0 ? (
          <DashboardEmptyState
            hasAnyPrompts={prompts.length > 0}
            onClearFilters={clearFilters}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleFavorite={handleToggleFav}
                onRequestDelete={setDeleteConfirm}
              />
            ))}
          </div>
        )}
      </main>

      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar prompt"
        description="Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este prompt?"
        footer={
          <>
            <Btn variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Btn>
            <Btn
              variant="danger"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Eliminar
            </Btn>
          </>
        }
      />
    </div>
  );
}
