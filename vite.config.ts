import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Separate chunks load in parallel and stay cached when only articles change.
          manualChunks(id: string) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
            if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion';
            if (id.includes('node_modules/lucide-react/')) return 'icons';
            if (id.includes('/src/data/')) return 'content';
          },
        },
      },
    },
    server: {
      // HMR can be disabled when file watching is unavailable.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
