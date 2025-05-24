import { useThemeContext } from "@/context";
import { PiMoonThin, PiSunThin } from "react-icons/pi";

export const ThemeSwitch = () => {
  const { enableDarkMode, disableDarkMode, theme } = useThemeContext();

  const toggleTheme = () => {
    theme === "light" ? enableDarkMode() : disableDarkMode();
  };

  return (
    <div className="flex gap-4 items-center">
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only peer dark:bg-gray-800"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-600 dark:peer-focus:ring-gray-200 rounded-full peer peer-checked:bg-gray-600 transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-800 w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
      </label>

      {theme === "light" ? (
        <PiSunThin size={28} className="text-gray-800 dark:text-gray-200" />
      ) : (
        <PiMoonThin size={28} className="text-gray-800 dark:text-gray-200" />
      )}
    </div>
  );
};
