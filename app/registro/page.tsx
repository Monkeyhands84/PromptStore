import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata = {
  title: "Crear cuenta · PromptStore",
};

export default function RegistroPage() {
  return (
    <Suspense>
      <AuthForm mode="register" />
    </Suspense>
  );
}
