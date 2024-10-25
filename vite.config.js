import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Add any external dependencies here if needed
      ],
    },
  },
  optimizeDeps: {
    exclude: ["three-stdlib"], // Exclude three-stdlib from optimization
  },
});
