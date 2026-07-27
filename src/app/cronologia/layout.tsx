export const revalidate = 86400; // Revalidate a cada 24 horas (ISR)

export default function CronologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
