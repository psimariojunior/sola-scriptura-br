import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { I18nProvider } from "@/components/i18n-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bible Scholar AI - Plataforma Avançada de Estudo Bíblico",
  description:
    "Plataforma acadêmica de estudo bíblico com IA, exegese, teologia sistemática, mapas interativos e análise linguística.",
  keywords: [
    "Bíblia", "Estudo Bíblico", "Teologia", "Exegese", "IA",
    "Grego", "Hebraico", "Seminário", "Bible Scholar",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Sidebar />
        <main className="ml-64 min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
