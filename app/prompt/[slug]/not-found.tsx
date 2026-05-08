import Link from "next/link";
import { Btn } from "@/components/ui/btn";

export default function PublicPromptNotFound() {
  return (
    <main
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
          maxWidth: 420,
          textAlign: "center",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          padding: "40px 32px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>◇</div>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
          Prompt no encontrado
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-2)",
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Este prompt no existe o ha dejado de ser público. Vuelve a la página
          principal y descubre otros.
        </p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Btn>Ir al inicio</Btn>
        </Link>
      </div>
    </main>
  );
}
