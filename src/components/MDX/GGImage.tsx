'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GGImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function GGImage({ src, alt, width, height }: GGImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="relative w-full my-8 p-8 border border-red-200 rounded-lg bg-red-50 text-center">
        <p className="text-red-600">Erro ao carregar imagem</p>
        <p className="text-sm text-red-500 mt-2">{alt}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full my-8">
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 shadow-md">
        <Image
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 630}
          className={`w-full h-auto transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          quality={90}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {alt && (
        <p className="mt-3 text-center text-sm text-gray-600 italic">{alt}</p>
      )}
    </div>
  );
}
