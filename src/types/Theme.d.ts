export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme | null;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
}
