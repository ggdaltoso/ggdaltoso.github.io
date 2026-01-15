import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="text-9xl font-bold text-gray-200 mb-4">404</div>

      <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>

      <p className="text-xl text-gray-600 mb-8">
        Desculpe, não conseguimos encontrar o post que você está procurando.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/blog"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todos os posts
        </Link>

        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Voltar para home
        </Link>
      </div>
    </div>
  );
}
