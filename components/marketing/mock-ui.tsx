import { Badge } from "@/components/ui/badge";

const MOCK_HERO_PROMPTS = [
  {
    title: "Redactor de artículos SEO",
    category: "Escritura",
    updated: "hace 2 horas",
    favorite: true,
    public: true,
  },
  {
    title: "Code reviewer",
    category: "Desarrollo",
    updated: "hace 1 día",
    favorite: true,
    public: false,
  },
  {
    title: "Generador de copy para anuncios",
    category: "Marketing",
    updated: "hace 3 días",
    favorite: false,
    public: true,
  },
];

const SIDEBAR_ITEMS = [
  "Todos",
  "Escritura",
  "Desarrollo",
  "Marketing",
  "★ Favoritos",
];

const TRAFFIC_LIGHTS = [
  "oklch(65% 0.20 25)",
  "oklch(70% 0.20 75)",
  "oklch(65% 0.20 150)",
];

export function MockUI() {
  return (
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
        aria-hidden="true"
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
          {TRAFFIC_LIGHTS.map((c, i) => (
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
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "7px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "default",
                  background: i === 0 ? "var(--accent-light)" : "transparent",
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
  );
}
