import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/2gether-talent-search/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
