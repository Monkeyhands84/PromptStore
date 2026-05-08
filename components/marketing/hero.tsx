import Link from "next/link";
import { Btn } from "@/components/ui/btn";

export function Hero({ featuredSlug }: { featuredSlug: string | null }) {
  return (
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
  );
}
