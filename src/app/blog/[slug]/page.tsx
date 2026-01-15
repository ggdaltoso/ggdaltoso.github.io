import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { mdxComponents } from '@/components/MDX/MDXComponents';
import PostHeader from '@/components/Post/PostHeader';
import Comments from '@/components/Post/Comments';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Gera metadata para SEO
export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

// Gera rotas estáticas em build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header do Post */}
      <PostHeader post={post} />

      {/* Conteúdo MDX */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {/* Comentários */}
      {post.frontmatter.issueNumber && (
        <Comments issueNumber={post.frontmatter.issueNumber} />
      )}

      {/* Navegação */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para o blog
        </Link>
      </div>
    </article>
  );
}
