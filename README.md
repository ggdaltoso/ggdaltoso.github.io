# Blog Next.js 14 com GitHub Issues como CMS

Blog moderno usando Next.js 14 (App Router) que consome GitHub Issues como sistema de gerenciamento de conteúdo.

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# GitHub API (para fetch-issues.js)
GITHUB_TOKEN=seu_token_aqui
GITHUB_REPO=ggdaltoso/ggdaltoso.github.io
```

### 3. Gerar Posts (quando implementado)

```bash
npm run generate:posts
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📋 Status da Implementação

- ✅ **Etapa 1**: Setup inicial do Next.js com TypeScript e Tailwind
- ⏳ **Etapa 2**: Script de busca de issues (próxima)
- ⏳ **Etapa 3**: Sistema de leitura de posts
- ⏳ **Etapa 4**: Página de lista de posts
- ⏳ **Etapa 5**: Componentes MDX customizados
- ⏳ **Etapa 6**: Página individual de post
- ⏳ **Etapa 7**: Integração React95
- ⏳ **Etapa 8**: Sistema de comentários Giscus
- ⏳ **Etapa 9**: OAuth GitHub
- ⏳ **Etapa 10**: Deploy na Vercel

## 📚 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX
- React95
- Giscus (comentários)
