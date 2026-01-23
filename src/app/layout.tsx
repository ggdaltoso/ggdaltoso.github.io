import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AuthProvider from '@/components/AuthProvider';
import QueryProvider from '@/components/QueryProvider';

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
        <QueryProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />

              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>

              <Footer />
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
