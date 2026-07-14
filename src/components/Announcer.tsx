'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

interface AnnouncerContextValue {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | null>(null);

export function useAnnouncer() {
  const ctx = useContext(AnnouncerContext);
  if (!ctx) {
    throw new Error('useAnnouncer must be used within an AnnouncerProvider');
  }
  return ctx;
}

export function AnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback(
    (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (politeness === 'assertive') {
        setAssertiveMessage('');
        timeoutRef.current = setTimeout(() => {
          setAssertiveMessage(message);
        }, 50);
      } else {
        setPoliteMessage('');
        timeoutRef.current = setTimeout(() => {
          setPoliteMessage(message);
        }, 50);
      }
    },
    []
  );

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {politeMessage}
      </div>
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {assertiveMessage}
      </div>
    </AnnouncerContext.Provider>
  );
}

export function Announcer({
  message,
  politeness = 'polite',
}: {
  message: string;
  politeness?: 'polite' | 'assertive';
}) {
  return (
    <div
      className="sr-only"
      aria-live={politeness}
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
