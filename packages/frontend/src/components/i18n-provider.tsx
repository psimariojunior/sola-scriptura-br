"use client";

import { useEffect } from "react";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("../i18n");
  }, []);
  return <>{children}</>;
}
