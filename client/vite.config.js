import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/checkAuth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        credentials: "include",
      },
      "/logout": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        credentials: "include",
      },
      "/signin": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        credentials: "include",
      },
    },
  },
});
