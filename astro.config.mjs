// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://reynahouse.ai',

  vite: {
    plugins: [tailwindcss()]
  },

  // /forms/registry/ exists only so Netlify's build-time form detection can
  // see the real form definition. It is noindexed and must stay out of the
  // sitemap — submitting it to Google would defeat the point of hiding it.
  integrations: [sitemap({
    filter: (page) => !page.includes('/forms/registry'),
  })]
});