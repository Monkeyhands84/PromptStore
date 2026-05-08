"use client";

type Props = {
  message: string;
  onDismiss: () => void;
};

export function DashboardErrorBanner({ message, onDismiss }: Props) {
  return (
    <div
      role="alert"
      style={{
        padding: "10px 14px",
        borderRadius: "var(--r-sm)",
        background: "oklch(95% 0.04 25)",
        color: "oklch(40% 0.18 25)",
        fontSize: 13,
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Cerrar aviso"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "inherit",
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
