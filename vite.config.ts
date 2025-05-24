import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/tesseract/",
  plugins: [react(), tailwindcss(), svgr()],
  assetsInclude: ["**/*.glb"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    alias: {
      "@": "/src",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
