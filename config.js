'use strict';

module.exports = {
  url: 'https://ggdaltoso.dev',
  title: 'Blog do GG',
  subtitle: 'O que fiz, o que faço e o que vou fazer',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-64834505-1',
  menu: [
    {
      label: 'Articles',
      path: '/',
    },
    // {
    //   label: 'About me',
    //   path: '/pages/about',
    // },
  ],
  author: {
    name: 'Gabriel Daltoso',
    photo: '/photo.jpg',
    bio: '[object Object]',
    contacts: {
      email: 'ggdaltoso@gmail.com',
      bluesky: 'ggdaltoso.bsky.social',
      github: 'ggdaltoso',
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
