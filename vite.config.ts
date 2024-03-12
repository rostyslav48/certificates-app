import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'styles',
        replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
      {
        find: 'core',
        replacement: fileURLToPath(new URL('./src/core', import.meta.url)),
      },
      {
        find: 'icons',
        replacement: fileURLToPath(
          new URL('./src/assets/icons', import.meta.url),
        ),
      },
    ],
  },
  plugins: [react(), svgr()],
});
