import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '@/types/post';

// Diretório dos posts
const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

/**
 * Verifica se o diretório de posts existe
 */
function ensurePostsDirectory(): void {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

/**
 * Busca todos os arquivos .md do diretório de posts
 */
function getPostFiles(): string[] {
  ensurePostsDirectory();

  const files = fs.readdirSync(POSTS_DIR);
  return files.filter((file) => file.endsWith('.md') && file !== '.gitkeep');
}

/**
 * Lê e processa um arquivo de post
 */
function readPostFile(filename: string): Post | null {
  try {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Valida se tem os campos obrigatórios
    if (!data.title || !data.slug) {
      console.warn(`Post ${filename} está faltando campos obrigatórios`);
      return null;
    }

    return {
      slug: data.slug as string,
      frontmatter: {
        title: data.title as string,
        date: (data.date as string) || new Date().toISOString(),
        template: (data.template as string) || 'post',
        draft: data.draft === true || data.draft === 'true',
        slug: data.slug as string,
        category: (data.category as string) || 'Uncategorized',
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: (data.description as string) || (data.title as string),
      },
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Erro ao ler post ${filename}:`, error);
    return null;
  }
}

/**
 * Busca todos os posts (excluindo drafts)
 */
export async function getAllPosts(): Promise<Post[]> {
  const files = getPostFiles();
  const posts: Post[] = [];

  for (const filename of files) {
    const post = readPostFile(filename);

    // Filtra posts inválidos e drafts
    if (post && !post.frontmatter.draft) {
      posts.push(post);
    }
  }

  // Ordena por data (mais recente primeiro)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Busca post por slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = getPostFiles();

  for (const filename of files) {
    const post = readPostFile(filename);

    if (post) {
      // Normaliza slugs removendo barra inicial se houver
      const postSlug = post.frontmatter.slug.replace(/^\//, '');
      const searchSlug = slug.replace(/^\//, '');

      if (postSlug === searchSlug) {
        return post;
      }
    }
  }

  return null;
}

/**
 * Busca posts por tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts.filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

/**
 * Busca posts por categoria
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts.filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === category.toLowerCase(),
  );
}

/**
 * Gera lista de slugs para static params
 */
export async function getAllSlugs(): Promise<string[]> {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => post.frontmatter.slug.replace(/^\//, ''));
}

/**
 * Busca todas as tags únicas
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Busca todas as categorias únicas
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categoriesSet = new Set<string>();

  allPosts.forEach((post) => {
    categoriesSet.add(post.frontmatter.category);
  });

  return Array.from(categoriesSet).sort();
}
