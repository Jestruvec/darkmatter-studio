import { createContext, useContext } from "react";
import { ThemeContextType } from "@/types";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }

  return context;
};
