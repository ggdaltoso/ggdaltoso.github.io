import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  // Load only MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    slug: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
  }),
});

export const collections = { posts };
