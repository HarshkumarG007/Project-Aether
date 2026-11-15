import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three-bundle';
          }
          if (id.includes('postprocessing')) {
            return 'postprocessing-bundle';
          }
          if (id.includes('lucide-react') || id.includes('gsap') || id.includes('zustand')) {
            return 'vendor-bundle';
          }
        }
      }
    }
  }
})