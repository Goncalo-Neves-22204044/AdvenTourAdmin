import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,      // Allow access from outside the container
    port: 5173,      // Optional (default is 5173)
    strictPort: true // Avoid port fallbacks like 5174, etc.
  }
})
