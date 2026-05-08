"use client";

import type { ReactNode } from "react";

type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  /** Visible label id, for aria-labelledby if needed externally */
  id?: string;
  /** Color of the track when active. Defaults to var(--accent). */
  activeColor?: string;
};

/**
 * Accessible switch toggle. Visually identical to the previous div-based
 * implementation, but built on a real <button role="switch">.
 */
export function Toggle({
  checked,
  onChange,
  label,
  id,
  activeColor = "var(--accent)",
}: ToggleProps) {
  const labelId = id ? `${id}-label` : undefined;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <span
        id={labelId}
        style={{ fontSize: 13, color: "var(--text-1)", cursor: "pointer" }}
        onClick={() => onChange(!checked)}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 99,
          background: checked ? activeColor : "var(--border)",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          border: "none",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            display: "block",
          }}
        />
      </button>
    </div>
  );
}
