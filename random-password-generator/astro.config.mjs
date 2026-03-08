import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://randompassword.devrimsoft.com',
  output: 'static',

  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],

  build: {
    assets: '_assets',
  },

  vite: {
    build: {
      cssMinify: true,
    },
  },

  adapter: cloudflare(),
});