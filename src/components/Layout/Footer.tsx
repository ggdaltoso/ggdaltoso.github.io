export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} - Blog Next.js 14
          </p>

          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/blog"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Todos os Posts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
