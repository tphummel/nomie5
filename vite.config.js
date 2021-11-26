import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";
import { VitePWA } from 'vite-plugin-pwa'
import loadVersion from 'vite-plugin-package-version';
import manifest from './manifest';
import path from 'path';
import analyze from 'rollup-plugin-analyzer'
import svelteSVG from "vite-plugin-svelte-svg";

export default defineConfig({
  optimizeDeps: { exclude: ["svelte-routing"] },
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      plugins: [analyze()]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('/src'),
    },
  },
  plugins: [
    loadVersion(),
    svelteSVG({
      svgoConfig: {}, // See https://github.com/svg/svgo#configuration
    }),
    svelte({
      preprocess: sveltePreprocess({
        postcss: true
      })
    }),
    VitePWA({
      manifest: manifest,
    })
  ]
})