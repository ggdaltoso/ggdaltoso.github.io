import GGImage from './GGImage';
import GGHighlight from './GGHighlight';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  // Imagens customizadas
  img: ({ src, alt }: any) => <GGImage src={src || ''} alt={alt || ''} />,

  // Blocos de código
  pre: ({ children }: any) => {
    const code = children?.props?.children || '';
    const className = children?.props?.className || '';
    const language = className.replace('language-', '') || 'text';

    return <GGHighlight code={String(code).trim()} language={language} />;
  },

  // Código inline
  code: ({ children, className }: any) => {
    // Se tem className, é um bloco de código (será tratado pelo pre)
    if (className) {
      return <code className={className}>{children}</code>;
    }
    // Código inline normal
    return (
      <code className="px-1.5 py-0.5 rounded bg-gray-100 text-red-600 text-sm font-mono">
        {children}
      </code>
    );
  },

  // Headings com estilos
  h1: (props: any) => (
    <h1
      className="text-4xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h4: (props: any) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
  h5: (props: any) => <h5 className="text-lg font-bold mt-4 mb-2" {...props} />,
  h6: (props: any) => (
    <h6 className="text-base font-bold mt-4 mb-2" {...props} />
  ),

  // Parágrafos
  p: (props: any) => {
    // Se o parágrafo contém apenas uma imagem, renderiza diretamente sem <p>
    const children = props.children;
    if (
      children &&
      typeof children === 'object' &&
      children.type &&
      children.type.name === 'GGImage'
    ) {
      return <>{children}</>;
    }
    return <p className="mb-4 leading-7 text-gray-800" {...props} />;
  },

  // Links
  a: (props: any) => (
    <a
      className="text-blue-600 underline hover:text-blue-800 transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),

  // Citações
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r"
      {...props}
    />
  ),

  // Listas
  ul: (props: any) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-800" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-800" {...props} />
  ),
  li: (props: any) => <li className="leading-7" {...props} />,

  // Tabelas
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-300 border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-100" {...props} />,
  tbody: (props: any) => (
    <tbody className="divide-y divide-gray-200 bg-white" {...props} />
  ),
  tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
  th: (props: any) => (
    <th
      className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-sm text-gray-700" {...props} />
  ),

  // Linha horizontal
  hr: (props: any) => (
    <hr className="my-8 border-t border-gray-300" {...props} />
  ),

  //強調
  strong: (props: any) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,
};
