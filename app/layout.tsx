import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PromptStore",
  description:
    "Tu biblioteca personal de prompts IA. Guarda, organiza y mejora los prompts que usas con ChatGPT, Claude o Midjourney.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName =
    (user?.user_metadata?.name as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <html lang="es" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Navbar userName={userName} />
        {children}
      </body>
    </html>
  );
}
