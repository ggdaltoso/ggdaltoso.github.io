<h1 align="center">
    Blog do GG
</h1>

<p align="center">
    <em>O que fiz, o que faço e o que vou fazer</em><br/>
    <a href="https://ggdaltoso.dev">ggdaltoso.dev</a>
</p>

Blog pessoal construído com [Gatsby](https://www.gatsbyjs.com/), estilizado com o tema Windows 95 via [React95](https://react95.io/), com suporte a dois idiomas (PT/EN).

## Desenvolvimento

```bash
npm install
npm run develop   # http://localhost:8000
```

## Conteúdo

### Artigos

Os posts ficam em `content/posts/` organizados por idioma:

```
content/posts/pt/YYYY-MM-DD--titulo/index.md
content/posts/en/YYYY-MM-DD--title/index.md
```

Frontmatter obrigatório:

```yaml
---
title: 'Título do post'
date: '2026-04-21T00:00:00.000Z'
template: 'post'
draft: false
slug: '/slug-do-post'
description: 'Descrição curta'
---
```

### Páginas estáticas

Ficam em `content/pages/` com `template: 'page'` no frontmatter.

### Stories

Stories são exibidos no Avatar da sidebar. Ao clicar no avatar (quando há stories disponíveis), uma janela estilo Windows 95 abre com o navegador.

Para adicionar uma story, basta colocar uma imagem em `static/stories/` seguindo a convenção de nome:

```
static/stories/YYYY-MM-DD-descricao.jpg
```

A data no nome do arquivo é usada para exibir o tempo relativo ("há 3 dias"). Stories sem data no nome são exibidos sem essa informação.

**Resolução recomendada:** `360 × 540 px` (proporção 2:3)

**Formatos suportados:** `jpg`, `jpeg`, `png`, `gif`, `webp`

**Comportamento do visualizador:**
- Cada story é exibido por 5 segundos e avança automaticamente
- Clique no lado direito → próxima story
- Clique no lado esquerdo → story anterior
- Segure → pausa enquanto pressionado

## Deploy

```bash
npm run deploy
```

Faz o build e publica o branch atual via `gh-pages`.
