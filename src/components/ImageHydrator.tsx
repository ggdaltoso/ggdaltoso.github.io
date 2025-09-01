import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import GGImage from './GGImage.tsx';

const ImageHydrator: React.FC = () => {
  useEffect(() => {
    // Procura por elementos gg-image e os substitui por componentes React
    const ggImages = document.querySelectorAll('gg-image');

    ggImages.forEach((element) => {
      const src = element.getAttribute('src') || '';
      const alt = element.getAttribute('alt') || '';
      const title = element.getAttribute('title') || alt;
      const width = parseInt(element.getAttribute('width') || '0') || undefined;

      // Cria um novo div para o componente React
      const container = document.createElement('div');
      element.parentNode?.insertBefore(container, element);
      element.remove();

      // Renderiza o componente GGImage
      const root = createRoot(container);
      root.render(<GGImage src={src} alt={alt} title={title} width={width} />);
    });
  }, []);

  return null; // Este componente não renderiza nada
};

export default ImageHydrator;
