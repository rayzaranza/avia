import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    svgr(),
  ],
resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
  },
});
