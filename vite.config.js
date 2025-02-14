import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows binding to 0.0.0.0
    port: 3000, // Ensure a valid port is set
    allowedHosts: ["mytodo-alvh.onrender.com"]
  }
})
