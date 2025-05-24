import { useState, useEffect, ReactNode } from "react";
import { ThemeContext } from "@/context";
import { ThemeContextType, Theme } from "@/types";
import { storageService } from "@/services";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const root = window.document.documentElement;

  useEffect(() => {
    const storedTheme = storageService.getItem<Theme>("theme", false);

    if (storedTheme) {
      setTheme(storedTheme);
      storedTheme === "dark" && enableDarkMode();
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      prefersDark && enableDarkMode();
    }
  }, []);

  const enableDarkMode = () => {
    setTheme("dark");
    root.classList.add("dark");
    storageService.setItem("theme", "dark", false);
  };

  const disableDarkMode = () => {
    setTheme("light");
    root.classList.remove("dark");
    storageService.setItem("theme", "light", false);
  };

  const value: ThemeContextType = {
    theme,
    enableDarkMode,
    disableDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
