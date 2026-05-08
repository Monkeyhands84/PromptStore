"use client";

import { useId, type ChangeEvent, type CSSProperties } from "react";

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
  id?: string;
  ariaLabel?: string;
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
  id,
  ariaLabel,
}: InputProps) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

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
          htmlFor={fieldId}
          style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={fieldId}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={!label ? ariaLabel : undefined}
          aria-describedby={hintId}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={!label ? ariaLabel : undefined}
          aria-describedby={hintId}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      )}
      {hint && (
        <span id={hintId} style={{ fontSize: 12, color: "var(--text-3)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}
