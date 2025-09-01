// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeCustomImage } from './src/plugins/rehype-custom-image.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://ggdaltoso.dev',
  vite: {
    ssr: {
      noExternal: ['@react95/core', '@react95/icons'],
    },
  },
  markdown: {
    rehypePlugins: [rehypeCustomImage],
  },
  integrations: [mdx(), sitemap(), react()],
});
