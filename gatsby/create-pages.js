"use strict";

const path = require("path");
const _ = require("lodash");
const createCategoriesPages = require("./pagination/create-categories-pages.js");
const createTagsPages = require("./pagination/create-tags-pages.js");
const createPostsPages = require("./pagination/create-posts-pages.js");

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: "/404",
    component: path.resolve("./src/templates/not-found-template.js"),
  });

  // Tags list
  createPage({
    path: "/tags",
    component: path.resolve("./src/templates/tags-list-template.js"),
  });

  // Categories list
  createPage({
    path: "/categories",
    component: path.resolve("./src/templates/categories-list-template.js"),
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
        nodes {
          id
          frontmatter {
            template
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const { nodes } = result.data.allMdx;

  _.each(nodes, (node) => {
    const frontmatter = node.frontmatter || {};
    const template = frontmatter.template || 'page';
    const slug = frontmatter.slug;
    const id = node.id;

    if (!slug) {
      return;
    }

    if (template === 'page') {
      createPage({
        path: slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug, id },
      });
    } else if (template === 'post') {
      const postTemplate = path.resolve('./src/templates/post-template.js');
      const contentFilePath = node.internal.contentFilePath;
      const component = `${postTemplate}?__contentFilePath=${contentFilePath}`;

      createPage({
        path: slug,
        component,
        context: { slug, id },
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
