"use client";

import { useRouter } from "next/navigation";
import { Btn } from "@/components/ui/btn";

type Props = {
  search: string;
  onSearchChange: (next: string) => void;
};

export function DashboardSearchBar({ search, onSearchChange }: Props) {
  const router = useRouter();

  return (
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
          aria-label="Buscar prompts"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}
