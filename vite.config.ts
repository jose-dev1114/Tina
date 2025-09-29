import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Ensure proper MIME types for module scripts
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    }
  },
  build: {
    // Ensure proper module format
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
});
