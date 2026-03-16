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
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
            totalCount
          }
        }
      }
    `);

    const localePaths = getLocalePaths(locale);

    _.each(result.data.allMarkdownRemark.group, (tag) => {
      const numPages = Math.ceil(tag.totalCount / postsPerPage);
      const tagBasePath = withLocalePath(
        locale,
        `/${localePaths.tags}/${_.kebabCase(tag.fieldValue)}`,
      );

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path:
            i === 0 ? tagBasePath : `${tagBasePath}/${localePaths.page}/${i}`,
          component: path.resolve('./src/templates/tag-template.js'),
          context: {
            locale,
            tag: tag.fieldValue,
            currentPage: i,
            postsLimit: postsPerPage,
            postsOffset: i * postsPerPage,
            prevPagePath:
              i <= 1
                ? tagBasePath
                : `${tagBasePath}/${localePaths.page}/${i - 1}`,
            nextPagePath: `${tagBasePath}/${localePaths.page}/${i + 1}`,
            hasPrevPage: i !== 0,
            hasNextPage: i !== numPages - 1,
          },
        });
      }
    });
  }
};
