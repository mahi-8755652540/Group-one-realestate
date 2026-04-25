import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Standard SPA config for Vercel
export default defineConfig({
  base: "/Group-one-realestate/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
