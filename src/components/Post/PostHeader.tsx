import Link from 'next/link';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, date, category, tags, description } = post.frontmatter;

  return (
    <header className="mb-12 pb-8 border-b border-gray-200">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{title}</span>
      </nav>

      {/* Categoria */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>

      {/* Título */}
      <h1 className="text-5xl font-bold mb-4 leading-tight">{title}</h1>

      {/* Descrição */}
      <p className="text-xl text-gray-600 mb-6">{description}</p>

      {/* Metadados */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
        <time dateTime={date} className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(date)}
        </time>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
