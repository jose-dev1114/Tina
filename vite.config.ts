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
    // Ensure proper module format and compatibility
    rollupOptions: {
      output: {
        format: 'es',
        // Ensure consistent file extensions
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Target modern browsers for better ES module support
    target: 'es2015',
    // Ensure source maps for debugging
    sourcemap: false
  },
  // Base URL for deployment
  base: './'
});
