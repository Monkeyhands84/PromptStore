"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Btn } from "@/components/ui/btn";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/actions/auth";

type Mode = "login" | "register";

const URL_ERRORS: Record<string, string> = {
  invalid_link: "El enlace de confirmación no es válido.",
  expired_link: "El enlace ha caducado. Vuelve a registrarte.",
};

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const searchParams = useSearchParams();
  const initialError = URL_ERRORS[searchParams.get("error") ?? ""] ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [registered, setRegistered] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor rellena todos los campos.");
      return;
    }
    if (!isLogin && !name) {
      setError("Escribe tu nombre.");
      return;
    }

    setLoading(true);

    if (isLogin) {
      const result = await signIn(email, password);
      // On success the action redirects, so we only land here on failure.
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } else {
      const result = await signUp(email, password, name);
      setLoading(false);
      if ("error" in result) {
        setError(result.error);
      } else {
        setRegistered(true);
      }
    }
  };

  return (
    <div
      className="screen-enter"
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
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          padding: "40px 36px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <Logo size={24} />
          <span style={{ fontWeight: 600, fontSize: 16 }}>PromptStore</span>
        </div>

        {registered ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              Revisa tu email
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-2)",
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              Te hemos enviado un enlace de confirmación a{" "}
              <strong style={{ color: "var(--text-1)" }}>{email}</strong>.
              Haz clic para activar tu cuenta y entrar a tu biblioteca.
            </p>
            <div
              style={{
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              ¿No te llega?{" "}
              <button
                onClick={() => setRegistered(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--accent)",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                Vuelve a intentarlo
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
            </h1>
            <p
              style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}
            >
              {isLogin
                ? "Accede a tu biblioteca de prompts."
                : "Empieza gratis. Sin tarjeta de crédito."}
            </p>

            <form
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {!isLogin && (
                <Input
                  label="Nombre"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r-sm)",
                    background: "oklch(95% 0.04 25)",
                    color: "oklch(40% 0.18 25)",
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}

              <Btn
                type="submit"
                size="lg"
                disabled={loading}
                style={{ justifyContent: "center", marginTop: 4 }}
              >
                {loading
                  ? "Un momento…"
                  : isLogin
                    ? "Entrar"
                    : "Crear cuenta"}
              </Btn>
            </form>

            <div
              style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <Link
                href={isLogin ? "/registro" : "/login"}
                style={{
                  color: "var(--accent)",
                  fontWeight: 500,
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
