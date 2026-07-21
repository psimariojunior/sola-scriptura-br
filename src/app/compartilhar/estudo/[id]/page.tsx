import { Suspense } from 'react';
import SharedStudyClient from './SharedStudyClient';

export default async function SharedStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>}>
      <SharedStudyClient id={id} />
    </Suspense>
  );
}
