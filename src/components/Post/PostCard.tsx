import Link from 'next/link';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { title, date, category, tags, description } = post.frontmatter;

  return (
    <article className="p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {title}
            </Link>
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
      >
        Ler mais
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </article>
  );
}
