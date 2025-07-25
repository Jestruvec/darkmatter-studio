import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { copyFileSync } from "fs";

// Copiar CNAME después del build
const copyCNAME = () => {
  return {
    name: "copy-cname",
    closeBundle: () => {
      copyFileSync("CNAME", "dist/CNAME");
    },
  };
};

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), svgr(), copyCNAME()],
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
