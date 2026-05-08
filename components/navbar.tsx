"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Btn } from "@/components/ui/btn";
import { signOut } from "@/lib/actions/auth";

export function Navbar({ userName }: { userName: string | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/registro";
  const isAuthed = userName !== null;
  const initial = (userName ?? "?").charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav
        className="app-navbar"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Link
          href={isAuthed ? "/dashboard" : "/"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <Logo size={22} />
          <span
            style={{ fontWeight: 600, fontSize: 16, color: "var(--text-1)" }}
          >
            PromptStore
          </span>
          <span
            className="navbar-tagline"
            style={{
              fontSize: 13,
              color: "var(--text-3)",
              fontWeight: 400,
              paddingLeft: 8,
              borderLeft: "1px solid var(--border)",
              marginLeft: 2,
            }}
          >
            Almacén de instrucciones para IA
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        {!isAuthed && !isAuthPage && (
          <div className="nav-cta" style={{ display: "flex", gap: 8 }}>
            <Btn
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
            >
              Entrar
            </Btn>
            <Btn size="sm" onClick={() => router.push("/registro")}>
              Registrarse gratis
            </Btn>
          </div>
        )}

        {isAuthed && (
          <div
            ref={menuRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              position: "relative",
            }}
          >
            <Btn
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Btn>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menú de usuario"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
                border: "none",
              }}
            >
              {initial}
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 8,
                  minWidth: 200,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  boxShadow: "var(--shadow-lg)",
                  padding: 6,
                  zIndex: 110,
                }}
              >
                <div
                  style={{
                    padding: "8px 10px 10px",
                    borderBottom: "1px solid var(--border)",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-3)",
                      marginBottom: 2,
                    }}
                  >
                    Conectado como
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--text-1)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {userName}
                  </div>
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="navbar-signout"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 10px",
                      borderRadius: "var(--r-sm)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "var(--text-2)",
                    }}
                  >
                    Cerrar sesión
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
