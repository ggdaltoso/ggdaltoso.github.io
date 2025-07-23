import { getCollection } from 'astro:content';
import type { BlogPost } from '../types/index';

/**
 * Fetches and processes blog posts from the content collection
 * @returns Promise<BlogPost[]> - Array of processed blog posts sorted by date (newest first)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const blog = await getCollection('posts');

  return blog
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      date: post.data.date,
      category: post.data.category,
      slug: post.data.slug,
    }));
}

/**
 * Sorts blog posts by date in descending order (newest first)
 * @param posts - Array of blog posts to sort
 * @returns BlogPost[] - Sorted array of blog posts
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
