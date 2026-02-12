import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export default async function BlogTestPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Teste do Sistema de Posts</h1>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-gray-600">Posts</div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{tags.length}</div>
          <div className="text-gray-600">Tags</div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">
            {categories.length}
          </div>
          <div className="text-gray-600">Categorias</div>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tags Disponíveis</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categorias */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categorias Disponíveis</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Posts Encontrados</h2>

        {posts.length === 0 ? (
          <div className="p-8 border border-gray-200 rounded-lg text-center text-gray-500">
            <p className="mb-2">Nenhum post encontrado.</p>
            <p className="text-sm">
              Execute{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                npm run generate:posts
              </code>{' '}
              para gerar posts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.frontmatter.title}
                  </a>
                </h3>

                <div className="text-sm text-gray-600 mb-3">
                  {formatDate(post.frontmatter.date)} •{' '}
                  {post.frontmatter.category}
                </div>

                <p className="text-gray-700 mb-3">
                  {post.frontmatter.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-500">
                  Slug:{' '}
                  <code className="bg-gray-100 px-1 rounded">{post.slug}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
