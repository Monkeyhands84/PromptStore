"use client";

import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";

type Props = {
  hasAnyPrompts: boolean;
  onClearFilters: () => void;
};

export function DashboardEmptyState({ hasAnyPrompts, onClearFilters }: Props) {
  const router = useRouter();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "64px 0",
        color: "var(--text-3)",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>◇</div>
      <p style={{ fontSize: 15 }}>
        {!hasAnyPrompts
          ? "Aún no tienes prompts. Crea el primero."
          : "No hay prompts que coincidan."}
      </p>
      {!hasAnyPrompts ? (
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
          onClick={onClearFilters}
          style={{ marginTop: 12 }}
        >
          Limpiar filtros
        </Btn>
      )}
    </div>
  );
}
