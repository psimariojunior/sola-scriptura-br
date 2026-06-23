"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
}>({ theme: "system", setTheme: () => {}, resolvedTheme: "light" });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("bible-scholar-theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("bible-scholar-theme", theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const isDark = theme === "dark" || (theme === "system" && mq.matches);
      setResolved(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
