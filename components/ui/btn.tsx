"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

type BtnVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type BtnSize = "sm" | "md" | "lg";

type BtnProps = {
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

const sizes: Record<BtnSize, CSSProperties> = {
  sm: { padding: "6px 14px", fontSize: 13, borderRadius: "var(--r-sm)" },
  md: { padding: "9px 18px", fontSize: 14, borderRadius: "var(--r-md)" },
  lg: { padding: "12px 24px", fontSize: 15, borderRadius: "var(--r-md)" },
};

const variants: Record<BtnVariant, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
  },
  secondary: {
    background: "var(--bg-3)",
    color: "var(--text-1)",
    boxShadow: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-2)",
    boxShadow: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--text-1)",
    border: "1.5px solid var(--border-2)",
    boxShadow: "none",
  },
  danger: {
    background: "oklch(55% 0.20 25)",
    color: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
};

export function Btn({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  style,
  type = "button",
  ariaLabel,
}: BtnProps) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--sans)",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "filter 0.15s ease",
    whiteSpace: "nowrap",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="app-btn"
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
