import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows binding to 0.0.0.0
    port: 3001, // Ensure a valid port is set
    allowedHosts: ["mytodo-alvh.onrender.com", "www.vikasgodara.in", "typist.vikasgodara.in", "ec2-13-201-227-189.ap-south-1.compute.amazonaws.com"]
  }
})
