import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sola Scriptura - Plataforma de Estudo Bíblico",
  description:
    "Plataforma de estudo bíblico com IA, exegese, teologia sistemática, mapas interativos e análise linguística.",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <Sidebar />
            <main className="ml-64 min-h-screen p-6">
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
