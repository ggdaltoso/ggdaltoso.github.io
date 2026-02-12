'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import schoolBook from 'react-syntax-highlighter/dist/cjs/styles/hljs/school-book';
import { useState } from 'react';

interface GGHighlightProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export default function GGHighlight({
  code,
  language,
  showLineNumbers = true,
}: GGHighlightProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className="relative my-6 group">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 bg-gray-700 hover:bg-gray-600 text-white"
        aria-label="Copiar código"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copiado!
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copiar
          </span>
        )}
      </button>

      {/* Code Block */}
      <SyntaxHighlighter
        language={language}
        style={schoolBook}
        showLineNumbers={showLineNumbers}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
