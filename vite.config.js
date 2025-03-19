import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Enables @ as an alias for src/
    },
  },
  server: {
    host: true, // Allow external access
    strictPort: true,
    allowedHosts: [
      "b1c5-2401-4900-7b3d-bbd4-6c19-6644-4d26-e82.ngrok-free.app",
    ], // Allow all hosts (use with caution)
    cors: true,
    hmr: {
      clientPort: 443, // Required for ngrok
    },
  },
});
