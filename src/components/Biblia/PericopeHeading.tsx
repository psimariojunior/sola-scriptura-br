'use client';

interface PericopeHeadingProps {
  titulo: string;
  tema?: string;
}

export function PericopeHeading({ titulo, tema }: PericopeHeadingProps) {
  return (
    <header className="bible-pericope-heading">
      <h2>{titulo}</h2>
      {tema && <p>{tema}</p>}
    </header>
  );
}
