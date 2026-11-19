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
      // Lets the prerender script preload each article's own text file (removed after the build).
      manifest: true,
      rollupOptions: {
        output: {
          // Separate chunks load in parallel and stay cached when only articles change.
          // Article bodies (src/data/articles) stay out of them: each loads only on its own page.
          manualChunks(id: string) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
            if (id.includes('node_modules/lucide-react/')) return 'icons';
            if (id.includes('/src/data/') && !id.includes('/src/data/articles/')) return 'content';
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
