import GGImage from '@/components/MDX/GGImage';
import GGHighlight from '@/components/MDX/GGHighlight';

export default function MDXTestPage() {
  const sampleCode = `function hello() {
  console.log('Hello, World!');
  return 'MDX funcionando!';
}

hello();`;

  return (
    <div className="max-w-4xl mx-auto prose prose-lg">
      <h1>Teste de Componentes MDX</h1>

      <p>
        Esta página demonstra todos os componentes customizados do MDX que serão
        usados nos posts do blog.
      </p>

      <h2>1. Componente de Imagem (GGImage)</h2>
      <p>Imagens otimizadas com Next/Image, lazy loading e loading state:</p>

      <GGImage
        src="https://placehold.co/600x400"
        alt="Imagem de exemplo demonstrando o componente GGImage"
      />

      <h2>2. Componente de Código (GGHighlight)</h2>
      <p>Syntax highlighting com botão de copiar e números de linha:</p>

      <GGHighlight code={sampleCode} language="javascript" />

      <h2>3. Elementos de Texto</h2>

      <h3>Parágrafo Normal</h3>
      <p>
        Este é um parágrafo normal com <strong>texto em negrito</strong> e{' '}
        <em>texto em itálico</em>. Também temos <code>código inline</code> que
        tem um estilo diferenciado.
      </p>

      <h3>Links</h3>
      <p>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Link externo para Next.js
        </a>{' '}
        abre em nova aba automaticamente.
      </p>

      <h3>Citações</h3>
      <blockquote>
        Esta é uma citação de exemplo. Blocos de citação têm um estilo especial
        com borda lateral e fundo colorido.
      </blockquote>

      <h2>4. Listas</h2>

      <h3>Lista Não Ordenada</h3>
      <ul>
        <li>Primeiro item da lista</li>
        <li>Segundo item da lista</li>
        <li>Terceiro item com mais texto para demonstrar o espaçamento</li>
      </ul>

      <h3>Lista Ordenada</h3>
      <ol>
        <li>Primeiro passo</li>
        <li>Segundo passo</li>
        <li>Terceiro passo</li>
      </ol>

      <h2>5. Tabela</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Status</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Imagens</td>
            <td>✅ Pronto</td>
            <td>Otimização com Next/Image</td>
          </tr>
          <tr>
            <td>Código</td>
            <td>✅ Pronto</td>
            <td>Syntax highlighting</td>
          </tr>
          <tr>
            <td>Tabelas</td>
            <td>✅ Pronto</td>
            <td>Responsivo com overflow</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Separador</h2>
      <p>Linha horizontal para separar seções:</p>
      <hr />

      <h2>7. Níveis de Heading</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <hr />

      <p className="text-green-600 font-semibold">
        ✅ Todos os componentes MDX estão funcionando corretamente!
      </p>
    </div>
  );
}
