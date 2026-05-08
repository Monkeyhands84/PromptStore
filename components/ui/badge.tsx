import type { ReactNode } from "react";

type BadgeColor = "default" | "accent" | "green" | "amber";

const colors: Record<BadgeColor, { bg: string; text: string }> = {
  default: { bg: "var(--bg-3)", text: "var(--text-2)" },
  accent: { bg: "var(--accent-light)", text: "var(--accent)" },
  green: { bg: "oklch(93% 0.04 155)", text: "oklch(42% 0.15 155)" },
  amber: { bg: "oklch(95% 0.05 80)", text: "oklch(45% 0.16 75)" },
};

export function Badge({
  children,
  color = "default",
}: {
  children: ReactNode;
  color?: BadgeColor;
}) {
  const c = colors[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 9px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 500,
        background: c.bg,
        color: c.text,
      }}
    >
      {children}
    </span>
  );
}
