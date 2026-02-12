import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/Post/PostCard';

export const metadata = {
  title: 'Blog - Todos os Posts',
  description: 'Lista de todos os posts do blog',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-gray-600">
          {posts.length}{' '}
          {posts.length === 1 ? 'post publicado' : 'posts publicados'}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Categorias */}
          {categories.length > 0 && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Categorias</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      href={`#${category}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <a
                    key={tag}
                    href={`#${tag}`}
                    className="px-2 py-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded text-xs transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Posts List */}
        <main className="lg:col-span-3">
          {posts.length === 0 ? (
            <div className="p-12 border border-gray-200 rounded-lg text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2">
                Nenhum post encontrado
              </h2>
              <p className="text-gray-600 mb-4">
                Execute o comando abaixo para gerar posts das issues do GitHub:
              </p>
              <code className="bg-gray-100 px-4 py-2 rounded text-sm">
                npm run generate:posts
              </code>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
