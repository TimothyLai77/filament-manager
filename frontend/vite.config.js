import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
      }
    }
  },
  plugins: [react()],
  build: {

  },
})
