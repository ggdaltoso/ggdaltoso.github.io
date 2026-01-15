# Prompt: Blog Next.js 14 com GitHub Issues como CMS

## 🎯 Objetivo

Criar um blog moderno usando **Next.js 14 (App Router)** que consome **GitHub Issues como CMS**. Cada issue representa um post do blog, escrito em Markdown com frontmatter e suporte a componentes React customizados.

---

## 📋 Especificações do Projeto

### Stack Tecnológica
- **Framework:** Next.js 14 com App Router
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS + @tailwindcss/typography
- **Markdown:** MDX (suporte a componentes React no markdown)
- **UI Library:** @react95/core (tema Windows 95)
- **Deploy:** Vercel
- **Syntax Highlighting:** react-syntax-highlighter

### Estrutura de um Post (GitHub Issue)

Cada issue do GitHub contém:

```markdown
---
title: "Monolito, Multirepo ou Monorepo?"
date: "2020-07-10T00:00:00.0000"
template: "post"
draft: false
slug: "/monolito-multirepo-ou-monorepo"
category: "Arquitetura"
tags:
  - "Arquitetura"
  - "Monorepo"
  - "Monolito"
  - "Multirepo"
description: "Monolito é fácil para começar um projeto. Multirepo pode ser bom quando o problema é espaço..."
---

# Conteúdo do Post

Este é o conteúdo do post em **Markdown**.

![Imagem exemplo](https://example.com/image.png)

```javascript
const hello = 'world';
console.log(hello);
```

Também posso usar componentes React aqui!
```

---

## 🔧 Funcionalidades Principais

### 1. Script de Geração de Posts

**Script:** `scripts/fetch-issues.js`

Deve buscar todas as issues do repositório GitHub e salvar como arquivos `.md` em `/src/content/posts/`:

```bash
npm run generate:posts
```

**Requisitos:**
- Buscar issues via GitHub API
- Filtrar issues com label específica (ex: "blog-post")
- Extrair frontmatter e conteúdo
- Salvar como `{slug}.md` em `/src/content/posts/`
- Manter estrutura original do frontmatter

### 2. Sistema de Leitura de Posts

**Arquivo:** `/src/lib/posts.ts`

Funções necessárias:

```typescript
interface PostFrontmatter {
  title: string
  date: string
  template: string
  draft: boolean
  slug: string
  category: string
  tags: string[]
  description: string
}

interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string // Markdown raw
}

// Buscar todos os posts (excluindo drafts)
async function getAllPosts(): Promise<Post[]>

// Buscar post por slug
async function getPostBySlug(slug: string): Promise<Post | null>

// Buscar posts por tag
async function getPostsByTag(tag: string): Promise<Post[]>

// Buscar posts por categoria
async function getPostsByCategory(category: string): Promise<Post[]>

// Gerar static params para build
async function getAllSlugs(): Promise<string[]>
```

### 3. Componentes Customizados no Markdown

**Arquivo:** `/src/components/MDX/MDXComponents.tsx`

Preciso **customizar a renderização** dos seguintes elementos markdown:

#### Imagens (`<img>`)
```typescript
// Quando markdown tiver:
![Alt text](url)

// Deve renderizar:
<GGImage 
  src="url" 
  alt="Alt text"
  // Props adicionais:
  // - Next/Image otimizado
  // - Lazy loading
  // - Layout responsivo
  // - Placeholder blur
/>
```

**Componente `GGImage`:**
- Usar `next/image` para otimização
- Layout responsivo (max-width container)
- Suporte a lightbox (opcional)
- Loading state
- Fallback para erro

#### Código (`<pre><code>`)
```typescript
// Quando markdown tiver:
```javascript
const code = 'example';
```

// Deve renderizar:
<GGHighlight 
  code="const code = 'example';" 
  language="javascript"
  // Props adicionais:
  // - Syntax highlighting moderno
  // - Line numbers
  // - Copy button
  // - Tema compatível com React95
/>
```

**Componente `GGHighlight`:**
- Usar `react-syntax-highlighter`
- Suporte a múltiplas linguagens
- Tema dark/light
- Botão de copiar código
- Números de linha (opcional)

#### Outros elementos
```typescript
// Headings com anchor links
h1: (props) => <h1 id={slugify(props.children)} {...props} />
h2: (props) => <h2 id={slugify(props.children)} {...props} />
h3: (props) => <h3 id={slugify(props.children)} {...props} />

// Links externos com ícone
a: (props) => <a target="_blank" rel="noopener noreferrer" {...props} />

// Citações com estilo
blockquote: (props) => <blockquote className="border-l-4 pl-4" {...props} />

// Tabelas responsivas
table: (props) => <div className="overflow-x-auto"><table {...props} /></div>
```

### 4. Páginas do Blog

#### Lista de Posts: `/blog`
```typescript
// src/app/blog/page.tsx
export default async function BlogPage() {
  const posts = await getAllPosts()
  
  return (
    <div>
      {posts.map(post => (
        <PostCard 
          key={post.slug}
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          category={post.frontmatter.category}
          tags={post.frontmatter.tags}
          slug={post.slug}
        />
      ))}
    </div>
  )
}
```

**Componente `PostCard`:**
- Título clicável
- Descrição resumida
- Data formatada
- Tags/categoria
- Link para post completo
- Estilo React95

#### Post Individual: `/blog/[slug]`
```typescript
// src/app/blog/[slug]/page.tsx
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) notFound()
  
  return (
    <article>
      <header>
        <h1>{post.frontmatter.title}</h1>
        <time>{post.frontmatter.date}</time>
        <div>{post.frontmatter.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
      </header>
      
      <MDXRemote 
        source={post.content}
        components={MDXComponents}
      />
      
      <Giscus /> {/* Sistema de comentários */}
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}
```

### 5. Sistema de Comentários (Giscus)

**Componente:** `/src/components/Comments/Giscus.tsx`

```typescript
'use client'

export default function Giscus() {
  // Integração com GitHub Discussions
  // Configuração via env vars:
  // - NEXT_PUBLIC_GISCUS_REPO
  // - NEXT_PUBLIC_GISCUS_REPO_ID
  // - NEXT_PUBLIC_GISCUS_CATEGORY
  // - NEXT_PUBLIC_GISCUS_CATEGORY_ID
}
```

### 6. OAuth GitHub (API Route)

**Endpoint:** `/api/github-token`

```typescript
// src/app/api/github-token/route.ts
export async function POST(request: Request) {
  const { code } = await request.json()
  
  // Trocar código OAuth por access token
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  
  const data = await response.json()
  return Response.json({ token: data.access_token })
}
```

**Uso:** Autenticação para comentários via Giscus

---

## 📁 Estrutura de Pastas

```
/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── github-token/
│   │   │       └── route.ts          # OAuth GitHub
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Post individual
│   │   │   └── page.tsx              # Lista de posts
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   └── globals.css               # Tailwind + estilos globais
│   ├── components/
│   │   ├── MDX/
│   │   │   ├── MDXComponents.tsx     # Mapeamento de componentes
│   │   │   ├── GGImage.tsx           # Componente de imagem
│   │   │   └── GGHighlight.tsx       # Componente de código
│   │   ├── Post/
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostHeader.tsx
│   │   │   └── PostContent.tsx
│   │   ├── Comments/
│   │   │   └── Giscus.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── content/
│   │   └── posts/
│   │       └── *.md                  # Posts gerados do GitHub
│   ├── lib/
│   │   ├── posts.ts                  # Funções de leitura de posts
│   │   └── utils.ts                  # Utilitários (slugify, formatDate, etc)
│   └── types/
│       └── post.ts                   # TypeScript interfaces
├── scripts/
│   └── fetch-issues.js               # Script para buscar issues do GitHub
├── public/
│   └── images/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Configurações

### 1. `package.json`

```json
{
  "name": "blog-nextjs",
  "version": "1.0.0",
  "scripts": {
    "dev": "npm run generate:posts && next dev",
    "build": "npm run generate:posts && next build",
    "start": "next start",
    "generate:posts": "npm run clean:posts && node scripts/fetch-issues.js",
    "clean:posts": "rimraf \"src/content/posts/**/*.md\"",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@next/mdx": "^14.2.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "remark-gfm": "^4.0.0",
    "rehype-prism-plus": "^2.0.0",
    "react-syntax-highlighter": "^15.5.0",
    "@react95/core": "^9.6.2",
    "@react95/icons": "^2.2.0",
    "date-fns": "^3.0.0",
    "classnames": "^2.5.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/react-syntax-highlighter": "^15.5.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.10",
    "rimraf": "^5.0.0"
  }
}
```

### 2. `next.config.js`

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-prism-plus')],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = withMDX(nextConfig)
```

### 3. `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1a1a',
            a: {
              color: '#0000ee',
              textDecoration: 'underline',
              '&:hover': {
                color: '#551a8b',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### 4. `.env.local` (exemplo)

```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# GitHub API (para fetch-issues.js)
GITHUB_TOKEN=your_personal_access_token
GITHUB_REPO=ggdaltoso/ggdaltoso.github.io

# Giscus
NEXT_PUBLIC_GISCUS_REPO=ggdaltoso/ggdaltoso.github.io
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### 5. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🎨 Implementação dos Componentes Principais

### `GGImage.tsx`

```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface GGImageProps {
  src: string
  alt: string
}

export default function GGImage({ src, alt }: GGImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      {alt && (
        <p className="mt-2 text-center text-sm text-gray-600">{alt}</p>
      )}
    </div>
  )
}
```

### `GGHighlight.tsx`

```typescript
'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'

interface GGHighlightProps {
  code: string
  language: string
}

export default function GGHighlight({ code, language }: GGHighlightProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.5rem',
          fontSize: '0.875rem',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
```

### `MDXComponents.tsx`

```typescript
import GGImage from './GGImage'
import GGHighlight from './GGHighlight'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  img: ({ src, alt }: any) => <GGImage src={src || ''} alt={alt || ''} />,
  
  pre: ({ children }: any) => {
    const code = children?.props?.children || ''
    const language = children?.props?.className?.replace('language-', '') || 'javascript'
    return <GGHighlight code={code} language={language} />
  },

  h1: (props: any) => (
    <h1 className="mb-4 mt-8 text-4xl font-bold" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mb-3 mt-6 text-3xl font-bold" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mb-2 mt-4 text-2xl font-bold" {...props} />
  ),
  
  p: (props: any) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  
  a: (props: any) => (
    <a
      className="text-blue-600 underline hover:text-purple-800"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-700"
      {...props}
    />
  ),
  
  ul: (props: any) => (
    <ul className="mb-4 ml-6 list-disc" {...props} />
  ),
  
  ol: (props: any) => (
    <ol className="mb-4 ml-6 list-decimal" {...props} />
  ),
  
  li: (props: any) => (
    <li className="mb-1" {...props} />
  ),
}
```

---

## 🚀 Checklist de Implementação

### Fase 1: Setup Inicial (30 min)
- [ ] Criar repositório ou branch `nextjs-migration`
- [ ] Inicializar Next.js: `npx create-next-app@latest --typescript --tailwind --app --src-dir`
- [ ] Instalar todas as dependências
- [ ] Configurar `next.config.js` com MDX
- [ ] Configurar `tailwind.config.ts` com typography
- [ ] Setup TypeScript paths (`@/*`)

### Fase 2: Script de Geração (1h)
- [ ] Criar `scripts/fetch-issues.js`
- [ ] Implementar busca de issues via GitHub API
- [ ] Extrair frontmatter e conteúdo
- [ ] Salvar arquivos `.md` em `/src/content/posts/`
- [ ] Testar com `npm run generate:posts`

### Fase 3: Lib de Posts (1h)
- [ ] Criar `/src/types/post.ts` com interfaces
- [ ] Implementar `getAllPosts()`
- [ ] Implementar `getPostBySlug()`
- [ ] Implementar `getPostsByTag()`
- [ ] Implementar `getPostsByCategory()`
- [ ] Testar leitura de posts

### Fase 4: Componentes MDX (2h)
- [ ] Criar `GGImage.tsx` com Next/Image
- [ ] Criar `GGHighlight.tsx` com syntax highlighting
- [ ] Criar `MDXComponents.tsx` com mapeamento
- [ ] Testar renderização de imagens
- [ ] Testar renderização de código
- [ ] Ajustar estilos Tailwind

### Fase 5: Páginas do Blog (2h)
- [ ] Criar layout global (`/src/app/layout.tsx`)
- [ ] Integrar React95 no layout
- [ ] Criar lista de posts (`/src/app/blog/page.tsx`)
- [ ] Criar `PostCard` component
- [ ] Criar página de post (`/src/app/blog/[slug]/page.tsx`)
- [ ] Implementar `generateStaticParams()`
- [ ] Testar navegação

### Fase 6: Comentários e OAuth (1h)
- [ ] Criar componente `Giscus.tsx`
- [ ] Integrar no post individual
- [ ] Criar API route `/api/github-token`
- [ ] Testar fluxo de autenticação
- [ ] Configurar variáveis de ambiente

### Fase 7: Deploy (30 min)
- [ ] Criar conta na Vercel
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Fazer primeiro deploy
- [ ] Testar em produção
- [ ] Configurar domínio (se necessário)

---

## 📊 Resultado Esperado

Ao final da implementação, teremos:

✅ Blog Next.js 14 com App Router e TypeScript  
✅ Posts consumidos de GitHub Issues via script  
✅ MDX com componentes React customizados  
✅ Imagens otimizadas com Next/Image  
✅ Syntax highlighting moderno  
✅ Sistema de comentários Giscus  
✅ OAuth GitHub funcionando  
✅ Tema React95 integrado  
✅ Deploy automático na Vercel  
✅ Performance otimizada (SSG + ISR)  

---

## 🎯 Próximos Passos

**Comece agora com:**

```bash
# 1. Criar novo projeto
npx create-next-app@latest blog-nextjs --typescript --tailwind --app --src-dir

# 2. Entrar no diretório
cd blog-nextjs

# 3. Instalar dependências
npm install @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote gray-matter remark-gfm rehype-prism-plus react-syntax-highlighter @react95/core @react95/icons date-fns classnames

npm install -D @types/react-syntax-highlighter @tailwindcss/typography rimraf

# 4. Iniciar desenvolvimento
npm run dev
```

**Está pronto para começar?**
