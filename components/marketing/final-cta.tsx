import Link from "next/link";
import { Btn } from "@/components/ui/btn";

export function FinalCta() {
  return (
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
  );
}
