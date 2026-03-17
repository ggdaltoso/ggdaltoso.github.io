'use strict';

const siteConfig = require('../config.js');
const sharedI18n = require('../i18n-shared');

const i18nConfig = sharedI18n.getI18nConfig(siteConfig.i18n);
const { defaultLocale, locales } = i18nConfig;

const getLocalePaths = (locale) => sharedI18n.getLocalePaths(i18nConfig, locale);

const getLocalePrefix = (locale) =>
  sharedI18n.getLocalePrefix(i18nConfig, locale);

const withLocalePath = (locale, pathName = '/') =>
  sharedI18n.withLocalePath(pathName, locale, defaultLocale);

module.exports = {
  defaultLocale,
  locales,
  getLocalePaths,
  getLocalePrefix,
  withLocalePath,
};
