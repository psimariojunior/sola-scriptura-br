'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 my-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-center" role="alert">
          <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">
            Algo deu errado
          </h2>
          <p className="text-sm text-[var(--muted-fg)] mb-6 max-w-md">
            Ocorreu um erro inesperado. Por favor, tente novamente ou recarregue a página.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
