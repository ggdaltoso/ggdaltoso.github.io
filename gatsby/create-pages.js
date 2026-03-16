"use strict";

const path = require("path");
const _ = require("lodash");
const createCategoriesPages = require("./pagination/create-categories-pages.js");
const createTagsPages = require("./pagination/create-tags-pages.js");
const createPostsPages = require("./pagination/create-posts-pages.js");
const {
  locales,
  defaultLocale,
  withLocalePath,
  getLocalePaths,
} = require('./i18n');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js'),
    context: { locale: defaultLocale },
  });

  locales.forEach((locale) => {
    const localePaths = getLocalePaths(locale);

    createPage({
      path: withLocalePath(locale, `/${localePaths.tags}`),
      component: path.resolve('./src/templates/tags-list-template.js'),
      context: { locale },
    });

    createPage({
      path: withLocalePath(locale, `/${localePaths.categories}`),
      component: path.resolve('./src/templates/categories-list-template.js'),
      context: { locale },
    });
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
        nodes {
          id
          fields {
            slug
            locale
          }
          frontmatter {
            template
            slug
          }
        }
      }
    }
  `);

  const { nodes } = result.data.allMarkdownRemark;

  _.each(nodes, (node) => {
    const frontmatter = node.frontmatter || {};
    const template = frontmatter.template || 'page';
    const slug = node.fields?.slug || frontmatter.slug;
    const id = node.id;

    if (!slug) {
      return;
    }

    if (template === 'page') {
      const pageTemplate = path.resolve('./src/templates/page-template.js');

      createPage({
        path: slug,
        component: pageTemplate,
        context: { slug, id, locale: node.fields?.locale || defaultLocale },
      });
    } else if (template === 'post') {
      const postTemplate = path.resolve('./src/templates/post-template.js');

      createPage({
        path: slug,
        component: postTemplate,
        context: { slug, id, locale: node.fields?.locale || defaultLocale },
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
