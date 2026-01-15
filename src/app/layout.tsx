import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blog - Next.js 14',
  description: 'Blog criado com Next.js 14 e GitHub Issues como CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold">
                <a href="/" className="hover:text-blue-600">
                  Meu Blog
                </a>
              </h1>
              <nav className="mt-4">
                <ul className="flex gap-6">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-blue-600">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

          <footer className="border-t border-gray-200 bg-white mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} - Blog Next.js 14</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
