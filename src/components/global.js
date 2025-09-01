// Componentes globais para uso em markdown
import GGImage from './GGImage.tsx';

// Disponibiliza os componentes globalmente
if (typeof window !== 'undefined') {
  window.GGImage = GGImage;
}

export { GGImage };
