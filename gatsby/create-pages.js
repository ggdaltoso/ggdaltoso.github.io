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
      allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
        nodes {
          id
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
    const slug = frontmatter.slug;
    const id = node.id;

    if (!slug) {
      return;
    }

    if (template === 'page') {
      const pageTemplate = path.resolve('./src/templates/page-template.js');

      createPage({
        path: slug,
        component: pageTemplate,
        context: { slug, id },
      });
    } else if (template === 'post') {
      const postTemplate = path.resolve('./src/templates/post-template.js');

      createPage({
        path: slug,
        component: postTemplate,
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
