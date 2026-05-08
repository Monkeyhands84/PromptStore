"use client";

import type { ChangeEvent, CSSProperties } from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  style?: CSSProperties;
  mono?: boolean;
};

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  multiline,
  rows = 4,
  hint,
  style,
  mono,
}: InputProps) {
  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "9px 13px",
    background: "var(--bg)",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--r-md)",
    fontSize: 14,
    fontFamily: mono ? "var(--mono)" : "var(--sans)",
    color: "var(--text-1)",
    outline: "none",
    transition: "border-color 0.15s ease",
    resize: multiline ? "vertical" : "none",
    lineHeight: 1.6,
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label
          style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      )}
      {hint && (
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>{hint}</span>
      )}
    </div>
  );
}
