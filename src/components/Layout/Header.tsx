'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Meu Blog
            </Link>
          </h1>

          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/"
                  className={`transition-colors ${
                    isActive('/') && !pathname?.startsWith('/blog')
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`transition-colors ${
                    isActive('/blog')
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
