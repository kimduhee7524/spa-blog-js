import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "createVirtualElement",
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: "transform",
      jsxFactory: "createVirtualElement",
    },
  },
  plugins: [tailwindcss()],
});
