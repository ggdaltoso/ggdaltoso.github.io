import { visit } from 'unist-util-visit';

export function rehypeCustomImage() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        // Extrai atributos da imagem
        const src = node.properties.src;
        const alt = node.properties.alt || '';
        let title = node.properties.title || alt;
        let width = node.properties.width;
        const height = node.properties.height;

        // Verifica se há parâmetros customizados no title
        // Formato: "Título da imagem | width=400 height=300"
        if (title && title.includes(' | ')) {
          const [actualTitle, params] = title.split(' | ');
          title = actualTitle;

          // Processa parâmetros como width=400, height=300
          const paramMatch = params.match(/width=(\d+)/);
          if (paramMatch) {
            width = parseInt(paramMatch[1], 10);
          }
        }

        // Se width for uma string com "px", remove o "px"
        if (typeof width === 'string' && width.endsWith('px')) {
          width = width.replace('px', '');
        }

        // Converte width para número se for uma string numérica
        if (typeof width === 'string' && !isNaN(width)) {
          width = parseInt(width, 10);
        }

        // Substitui o elemento img por nosso componente customizado
        const customImageNode = {
          type: 'element',
          tagName: 'gg-image',
          properties: {
            src,
            alt,
            title,
            width: width || undefined,
            height: height || undefined,
            'data-component': 'GGImage',
          },
          children: [],
        };

        parent.children[index] = customImageNode;
      }
    });
  };
}
