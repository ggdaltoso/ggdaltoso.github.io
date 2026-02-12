export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bem-vindo ao Blog!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Blog moderno criado com Next.js 14 e GitHub Issues como CMS
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Posts
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-3">⚡ Next.js 14</h3>
          <p className="text-gray-600">
            App Router com Server Components para performance máxima
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-3">📝 GitHub Issues</h3>
          <p className="text-gray-600">
            Posts escritos em Markdown com frontmatter direto do GitHub
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-3">🎨 Tailwind CSS</h3>
          <p className="text-gray-600">
            Estilização moderna e responsiva com Tailwind
          </p>
        </div>
      </div>
    </div>
  );
}
