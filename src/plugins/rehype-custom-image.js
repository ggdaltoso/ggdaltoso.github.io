import { visit } from 'unist-util-visit';

export function rehypeCustomImage() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        // Extrai atributos da imagem
        const src = node.properties.src;
        const alt = node.properties.alt || '';
        const title = node.properties.title || alt;
        const width = node.properties.width;

        // Substitui o elemento img por nosso componente customizado
        const customImageNode = {
          type: 'element',
          tagName: 'gg-image',
          properties: {
            src,
            alt,
            title,
            width,
            'data-component': 'GGImage',
          },
          children: [],
        };

        parent.children[index] = customImageNode;
      }
    });
  };
}
