"use strict";

const path = require("path");
const _ = require('lodash');
const createPostsPages = require("./pagination/create-posts-pages.js");
const { defaultLocale } = require('./i18n');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js'),
    context: { locale: defaultLocale },
  });

  // Pages and posts from MDX
  const mdxResult = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
            locale
          }
          frontmatter {
            template
            draft
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const mdxNodes = mdxResult.data.allMdx.nodes;
  const postTemplateMdx = path.resolve('./src/templates/post-template-mdx.js');
  const pageTemplateMdx = path.resolve('./src/templates/page-template-mdx.js');

  _.each(mdxNodes, (node) => {
    const frontmatter = node.frontmatter || {};
    const template = frontmatter.template || 'page';
    const slug = node.fields?.slug || frontmatter.slug;
    const id = node.id;

    if (!slug || frontmatter.draft) {
      return;
    }

    const component = template === 'post' ? postTemplateMdx : pageTemplateMdx;
    createPage({
      path: slug,
      component: `${component}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { slug, id, locale: node.fields?.locale || defaultLocale },
    });
  });

  // Feeds
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
