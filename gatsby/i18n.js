'use strict';

const siteConfig = require('../config.js');

const { i18n = {} } = siteConfig;

const defaultLocale = i18n.defaultLocale || 'pt';
const locales =
  Array.isArray(i18n.locales) && i18n.locales.length
    ? i18n.locales
    : [defaultLocale];
const pathsByLocale = i18n.paths || {};

const getLocalePaths = (locale) =>
  pathsByLocale[locale] ||
  pathsByLocale[defaultLocale] || {
    tags: 'tags',
    category: 'category',
    categories: 'categories',
    page: 'page',
  };

const getLocalePrefix = (locale) =>
  locale && locale !== defaultLocale ? `/${locale}` : '';

const withLocalePath = (locale, pathName = '/') => {
  const prefix = getLocalePrefix(locale);

  if (pathName === '/' || pathName === '') {
    return prefix ? `${prefix}/` : '/';
  }

  const normalized = pathName.startsWith('/') ? pathName : `/${pathName}`;
  return `${prefix}${normalized}`;
};

module.exports = {
  defaultLocale,
  locales,
  getLocalePaths,
  getLocalePrefix,
  withLocalePath,
};
