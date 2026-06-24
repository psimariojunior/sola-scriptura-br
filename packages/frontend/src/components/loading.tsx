"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function Loading({ text = "Carregando...", size = "md", fullScreen = false }: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className={`${sizes[size]} animate-spin mx-auto text-primary`} />
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className={`${sizes[size]} animate-spin`} />
      <span className="text-sm">{text}</span>
    </div>
  );
}

export function LoadingSkeleton({ lines = 5 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="w-6 h-4 bg-muted rounded" />
          <div className="flex-1 h-4 bg-muted rounded" style={{ width: `${50 + Math.random() * 40}%` }} />
        </div>
      ))}
    </div>
  );
}
