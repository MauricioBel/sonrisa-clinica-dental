import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,

    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && /react|react-dom|react-router|scheduler/.test(id)) {
            return 'vendor-react';
          }
          if (id.includes('node_modules') && id.includes('lucide-react')) {
            return 'vendor-icons';
          }
          if (
            id.includes('node_modules') &&
            /react-hook-form|@hookform|zod/.test(id)
          ) {
            return 'vendor-forms';
          }
        },
      },
    },
  },
});
