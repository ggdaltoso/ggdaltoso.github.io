'use strict';

module.exports = {
  url: 'https://ggdaltoso.dev',
  title: 'Blog do GG',
  subtitle: {
    pt: 'O que fiz, o que faço e o que vou fazer',
    en: 'What I did, what I do and what I will do',
  },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    pages: {
      about: {
        pt: '/sobre',
        en: '/about',
      },
    },
    paths: {
      pt: {
        tags: 'tags',
        category: 'category',
        categories: 'categories',
        page: 'page',
      },
      en: {
        tags: 'tags',
        category: 'category',
        categories: 'categories',
        page: 'page',
      },
    },
  },
  postsPerPage: 4,
  googleAnalyticsId: 'UA-64834505-1',
  menu: {
    pt: [
      {
        label: 'Artigos',
        path: '/',
      },
      {
        label: 'Sobre mim',
        path: '/sobre',
      },
    ],
    en: [
      {
        label: 'Articles',
        path: '/',
      },
      {
        label: 'About me',
        path: '/about',
      },
    ],
  },
  author: {
    name: 'Gabriel Daltoso',
    photo: '/photo.jpg',
    bio: {
      pt: 'Artista frontend | Relógios | Miçangas',
      en: 'Frontend craftsperson | Watches | Beads',
    },
    contacts: {
      email: 'ggdaltoso@gmail.com',
      bluesky: 'ggdaltoso.bsky.social',
      github: 'ggdaltoso',
      rss: '/rss.xml',
    },
  },
  giscus: {
    repo: 'ggdaltoso/ggdaltoso.github.io',
    repoId: 'MDEwOlJlcG9zaXRvcnkzODc3ODMxOQ==',
    category: 'Ideas',
    categoryId: 'DIC_kwDOAk-1z84C3rCH',
    mapping: 'title',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    theme: 'https://ggdaltoso.dev/giscus/windows-95.css',
    lang: 'pt',
  },
};
