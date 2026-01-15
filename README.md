# Blog Next.js 14 com GitHub Issues como CMS

Blog moderno usando Next.js 14 (App Router) que consome GitHub Issues como sistema de gerenciamento de conteúdo.

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (use `.env.local.example` como base):

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione seu token do GitHub:
- Crie um token em: https://github.com/settings/tokens
- Permissões necessárias: `repo` (para acessar issues)

### 3. Gerar Posts

```bash
npm run generate:posts
```

Este comando irá:
- Buscar todas as issues do repositório configurado
- Extrair frontmatter e conteúdo
- Salvar como arquivos `.md` em `src/content/posts/`

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📋 Status da Implementação

- ✅ **Etapa 1**: Setup inicial do Next.js com TypeScript e Tailwind
- ✅ **Etapa 2**: Script de busca de issues
- ✅ **Etapa 3**: Sistema de leitura de posts
- ✅ **Etapa 4**: Página de lista de posts
- ✅ **Etapa 5**: Componentes MDX customizados
- ✅ **Etapa 6**: Página individual de post
- ⏭️  **Etapa 7**: Integração React95 (pulada - UI será feita depois)
- ✅ **Etapa 8**: Projeto completo e pronto para deploy

## 🎉 Projeto Completo!

O blog está funcional com todas as features principais:
- ✅ Sistema de geração de posts do GitHub Issues
- ✅ Leitura e renderização de posts com MDX
- ✅ Componentes customizados (imagens e código)
- ✅ Páginas de lista e individual de posts
- ✅ SEO otimizado com metadata
- ✅ Static Site Generation (SSG)

## 📚 Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX
- React95
- Giscus (comentários)
