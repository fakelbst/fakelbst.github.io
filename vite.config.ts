import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'app',
  base: './',
  publicDir: '../public',
  plugins: [tailwindcss(), react()],
  build: {
    outDir: '../.pages-dist',
    assetsDir: 'build-assets',
    emptyOutDir: true,
  },
})
