'use strict';

const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');
const {
  defaultLocale,
  locales,
  getLocalePrefix,
  getLocalePaths,
} = require('./i18n');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx') {
    const parentNode = getNode(node.parent);
    const directorySegments = (parentNode?.relativeDirectory || '')
      .split('/')
      .filter(Boolean);
    const localeFromDirectory = directorySegments.find((segment) =>
      locales.includes(segment),
    );
    const rawLocale = node.frontmatter.locale;
    const locale =
      localeFromDirectory ||
      (locales.includes(rawLocale) ? rawLocale : defaultLocale);
    const localePrefix = getLocalePrefix(locale);
    const localePaths = getLocalePaths(locale);

    createNodeField({
      node,
      name: 'locale',
      value: locale,
    });

    const rawSlug =
      typeof node.frontmatter.slug !== 'undefined'
        ? node.frontmatter.slug
        : createFilePath({ node, getNode });
    const baseSlug = rawSlug.startsWith('/') ? rawSlug : `/${rawSlug}`;
    const localizedSlug =
      localePrefix && !baseSlug.startsWith(`${localePrefix}/`)
        ? `${localePrefix}${baseSlug}`
        : baseSlug;

    if (typeof node.frontmatter.slug !== 'undefined') {
      createNodeField({
        node,
        name: 'slug',
        value: localizedSlug,
      });
    } else {
      createNodeField({
        node,
        name: 'slug',
        value: localizedSlug,
      });
    }

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) =>
        `${localePrefix}/${localePaths.tags}/${_.kebabCase(tag)}/`.replace(
          '//',
          '/',
        ),
      );
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (node.frontmatter.category) {
      const categorySlug =
        `${localePrefix}/${localePaths.category}/${_.kebabCase(
          node.frontmatter.category,
        )}/`.replace('//', '/');
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};

module.exports = onCreateNode;
