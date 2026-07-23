'use client';

import { Component, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface Props {
  children: ReactNode;
}

export default function PageErrorBoundary({ children }: Props) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
