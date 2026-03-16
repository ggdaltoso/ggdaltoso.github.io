'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');
const { locales, withLocalePath, getLocalePaths } = require('../i18n');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const { postsPerPage } = siteConfig;

  for (const locale of locales) {
    const result = await graphql(`
      {
        allMarkdownRemark(
          filter: {
            frontmatter: { template: { eq: "post" }, draft: { ne: true } }
            fields: { locale: { eq: "${locale}" } }
          }
        ) {
          group(field: { frontmatter: { category: SELECT } }) {
            fieldValue
            totalCount
          }
        }
      }
    `);

    const localePaths = getLocalePaths(locale);

    _.each(result.data.allMarkdownRemark.group, (category) => {
      const numPages = Math.ceil(category.totalCount / postsPerPage);
      const categoryBasePath = withLocalePath(
        locale,
        `/${localePaths.category}/${_.kebabCase(category.fieldValue)}`,
      );

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path:
            i === 0
              ? categoryBasePath
              : `${categoryBasePath}/${localePaths.page}/${i}`,
          component: path.resolve('./src/templates/category-template.js'),
          context: {
            locale,
            category: category.fieldValue,
            currentPage: i,
            postsLimit: postsPerPage,
            postsOffset: i * postsPerPage,
            prevPagePath:
              i <= 1
                ? categoryBasePath
                : `${categoryBasePath}/${localePaths.page}/${i - 1}`,
            nextPagePath: `${categoryBasePath}/${localePaths.page}/${i + 1}`,
            hasPrevPage: i !== 0,
            hasNextPage: i !== numPages - 1,
          },
        });
      }
    });
  }
};
