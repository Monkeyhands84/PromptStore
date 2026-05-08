import Link from "next/link";
import { Btn } from "@/components/ui/btn";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

const FEATURES = [
  {
    icon: "▦",
    title: "Organiza tus prompts",
    desc: "Categorías, favoritos y búsqueda instantánea. Encuentra cualquier prompt en segundos.",
  },
  {
    icon: "◈",
    title: "Mejora con IA",
    desc: "Un clic para reescribir, afinar o generar variantes de cualquier prompt usando IA.",
  },
  {
    icon: "◎",
    title: "Comparte públicamente",
    desc: "Genera una URL única para cada prompt. Comparte tu trabajo con el mundo.",
  },
];

// Visual decoration only — the actual dashboard renders real DB data.
const MOCK_HERO_PROMPTS = [
  { title: "Redactor de artículos SEO", category: "Escritura", updated: "hace 2 horas", favorite: true, public: true },
  { title: "Code reviewer", category: "Desarrollo", updated: "hace 1 día", favorite: true, public: false },
  { title: "Generador de copy para anuncios", category: "Marketing", updated: "hace 3 días", favorite: false, public: true },
];

async function findFeaturedPublicSlug(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("prompts")
    .select("slug")
    .eq("public", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.slug ?? null;
}

export default async function HomePage() {
  const featuredSlug = await findFeaturedPublicSlug();

  return (
    <div className="screen-enter">
      {/* Hero */}
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "88px 24px 72px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "4px 12px",
            borderRadius: 99,
            background: "var(--accent-light)",
            color: "var(--accent)",
            fontSize: 12,
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          <span style={{ fontFamily: "var(--mono)" }}>v1.0</span>
          <span>·</span>
          MVP lanzado
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--text-1)",
            marginBottom: 22,
            textWrap: "pretty",
          }}
        >
          Tu biblioteca personal
          <br />
          <span style={{ color: "var(--accent)" }}>de prompts IA</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.65,
            maxWidth: 520,
            margin: "0 auto 40px",
            textWrap: "pretty",
          }}
        >
          Guarda, organiza y mejora los prompts que usas con ChatGPT, Claude o
          Midjourney. Todo en un solo lugar.
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/registro" style={{ textDecoration: "none" }}>
            <Btn size="lg">
              Empezar gratis
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Btn>
          </Link>
          {featuredSlug && (
            <Link
              href={`/prompt/${featuredSlug}`}
              style={{ textDecoration: "none" }}
            >
              <Btn variant="outline" size="lg">
                Ver ejemplo público
              </Btn>
            </Link>
          )}
        </div>
      </section>

      {/* Mock UI */}
      <section
        style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}
      >
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--r-xl)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--bg)",
            }}
          >
            {[
              "oklch(65% 0.20 25)",
              "oklch(70% 0.20 75)",
              "oklch(65% 0.20 150)",
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
            <div
              style={{
                marginLeft: 8,
                flex: 1,
                background: "var(--bg-3)",
                borderRadius: 6,
                height: 22,
                maxWidth: 280,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text-3)",
                  fontFamily: "var(--mono)",
                }}
              >
                promptstore.app/dashboard
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              minHeight: 360,
            }}
          >
            <div
              style={{
                borderRight: "1px solid var(--border)",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {[
                "Todos",
                "Escritura",
                "Desarrollo",
                "Marketing",
                "★ Favoritos",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    cursor: "default",
                    background:
                      i === 0 ? "var(--accent-light)" : "transparent",
                    color: i === 0 ? "var(--accent)" : "var(--text-2)",
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {MOCK_HERO_PROMPTS.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    background: "var(--bg)",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-1)",
                        marginBottom: 2,
                      }}
                    >
                      {p.title}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                      {p.category} · {p.updated}
                    </div>
                  </div>
                  {p.favorite && (
                    <span style={{ color: "oklch(70% 0.18 75)", fontSize: 13 }}>
                      ★
                    </span>
                  )}
                  {p.public && <Badge color="green">público</Badge>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{ maxWidth: 960, margin: "0 auto 96px", padding: "0 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: 28,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--accent-light)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  fontSize: 18,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text-1)",
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-2)",
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section
        style={{
          maxWidth: 600,
          margin: "0 auto 96px",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Empieza gratis hoy
        </h2>
        <p style={{ color: "var(--text-2)", marginBottom: 28, fontSize: 16 }}>
          Sin tarjeta de crédito. Sin complicaciones.
        </p>
        <Link href="/registro" style={{ textDecoration: "none" }}>
          <Btn size="lg">Crear cuenta gratuita</Btn>
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px",
          textAlign: "center",
          color: "var(--text-3)",
          fontSize: 13,
        }}
      >
        © 2026 PromptStore · Hecho para guardar lo que funciona
      </footer>
    </div>
  );
}
