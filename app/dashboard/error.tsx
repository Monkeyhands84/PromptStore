"use client";

import { useEffect } from "react";
import { Btn } from "@/components/ui/btn";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard:error]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          textAlign: "center",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          padding: "36px 32px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>◇</div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
          Algo salió mal
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-2)",
            lineHeight: 1.6,
            marginBottom: 22,
          }}
        >
          No pudimos cargar tu biblioteca de prompts. Inténtalo de nuevo en un
          momento.
        </p>
        <Btn onClick={reset}>Reintentar</Btn>
      </div>
    </div>
  );
}
