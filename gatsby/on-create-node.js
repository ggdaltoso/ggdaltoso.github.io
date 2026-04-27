'use strict';

const { createFilePath } = require('gatsby-source-filesystem');
const { defaultLocale, locales, getLocalePrefix } = require('./i18n');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
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

  }
};

module.exports = onCreateNode;
