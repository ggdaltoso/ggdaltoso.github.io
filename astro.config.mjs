// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ggdaltoso.dev',
  vite: {
    ssr: {
      noExternal: ['@react95/core', '@react95/icons'],
    },
  },
  integrations: [mdx(), sitemap(), react()],
});
