'use strict';

const getRawI18nConfig = (source = {}) => {
  if (source && (source.defaultLocale || source.locales || source.pages)) {
    return source;
  }

  return source.i18n || {};
};

const getI18nConfig = (source = {}) => {
  const i18n = getRawI18nConfig(source);
  const defaultLocale = i18n.defaultLocale || 'pt';
  const locales =
    Array.isArray(i18n.locales) && i18n.locales.length
      ? i18n.locales
      : [defaultLocale];

  return {
    defaultLocale,
    locales,
    pages: i18n.pages || {},
  };
};

const getLocalePrefix = (source, locale) => {
  const { defaultLocale } = getI18nConfig(source);

  return locale && locale !== defaultLocale ? `/${locale}` : '';
};

const normalizePath = (pathName = '/') => {
  if (!pathName.startsWith('/')) {
    return `/${pathName}`;
  }

  if (pathName !== '/' && pathName.endsWith('/')) {
    return pathName.replace(/\/+$/, '');
  }

  return pathName;
};

const withLocalePath = (pathName, locale, defaultLocale) => {
  const normalizedPath = normalizePath(pathName);
  const localePrefix = locale !== defaultLocale ? `/${locale}` : '';

  if (normalizedPath === '/') {
    return localePrefix ? `${localePrefix}/` : '/';
  }

  return `${localePrefix}${normalizedPath}`;
};

module.exports = {
  getI18nConfig,
  getLocalePrefix,
  normalizePath,
  withLocalePath,
};