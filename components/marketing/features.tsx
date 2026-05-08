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

export function Features() {
  return (
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
              aria-hidden="true"
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
  );
}
