import {copyFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages serves static files only — it has no SPA rewrite, so a deep
 * link like /workdayCanvasKitDemo/tokens would 404 on a hard refresh. Pages
 * serves 404.html for any unmatched path while preserving the URL, so shipping
 * a copy of index.html as 404.html lets the router resolve the route client
 * side.
 */
const spaFallback = (): Plugin => ({
  name: 'spa-404-fallback',
  closeBundle() {
    const out = resolve(__dirname, 'dist');
    copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
  },
});

export default defineConfig({
  // Project pages are served from https://<user>.github.io/<repo>/, so every
  // asset URL needs that prefix. BASE_URL also feeds the router's basename.
  base: process.env.VITE_BASE ?? '/workdayCanvasKitDemo/',
  plugins: [react(), spaFallback()],
  server: {port: 5173},
});
