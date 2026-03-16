'use strict';

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
          totalCount
        }
      }
    `);

    const totalCount = result.data.allMarkdownRemark.totalCount;
    const numPages = Math.max(1, Math.ceil(totalCount / postsPerPage));
    const localePaths = getLocalePaths(locale);

    for (let i = 0; i < numPages; i += 1) {
      const pagePath =
        i === 0
          ? withLocalePath(locale, '/')
          : withLocalePath(locale, `/${localePaths.page}/${i}`);
      const prevPagePath =
        i <= 1
          ? withLocalePath(locale, '/')
          : withLocalePath(locale, `/${localePaths.page}/${i - 1}`);
      const nextPagePath = withLocalePath(
        locale,
        `/${localePaths.page}/${i + 1}`,
      );

      createPage({
        path: pagePath,
        component: path.resolve('./src/templates/index-template.js'),
        context: {
          locale,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath,
          nextPagePath,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
        },
      });
    }
  }
};
