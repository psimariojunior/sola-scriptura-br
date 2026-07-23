'use client';

import { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[300px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="font-display text-xl font-medium mb-2">Algo deu errado</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            {this.state.error && (
              <details className="text-xs text-left bg-muted/50 rounded-lg p-3 mb-4 text-muted-foreground">
                <summary className="cursor-pointer font-medium mb-1">Detalhes do erro</summary>
                <code className="block whitespace-pre-wrap break-all">{this.state.error.message}</code>
              </details>
            )}
            <div className="flex gap-3 justify-center">
              <button onClick={() => this.setState({ hasError: false, error: null })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                <RotateCcw className="w-4 h-4" /> Tentar novamente
              </button>
              <Link href="/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50">
                <Home className="w-4 h-4" /> Início
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
