// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';
// https://astro.build/config
export default defineConfig({
  base: '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
