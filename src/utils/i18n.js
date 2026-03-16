const getI18nConfig = (siteMetadata = {}) => {
  const i18n = siteMetadata.i18n || {};
  const defaultLocale = i18n.defaultLocale || 'pt';
  const locales =
    Array.isArray(i18n.locales) && i18n.locales.length
      ? i18n.locales
      : [defaultLocale];

  return {
    defaultLocale,
    locales,
    paths: i18n.paths || {},
  };
};

const getLocalizedMenu = (menuByLocale = {}, locale, defaultLocale) =>
  menuByLocale[locale] || menuByLocale[defaultLocale] || [];

const getLocalizedValue = (value, locale, defaultLocale) => {
  if (value === null || typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value[locale]) {
    return value[locale];
  }

  if (value[defaultLocale]) {
    return value[defaultLocale];
  }

  const fallbackKey = Object.keys(value)[0];
  return fallbackKey ? value[fallbackKey] : '';
};

const getLocalePaths = (siteMetadata, locale) => {
  const { paths, defaultLocale } = getI18nConfig(siteMetadata);
  return (
    paths[locale] ||
    paths[defaultLocale] || {
      tags: 'tags',
      category: 'category',
      categories: 'categories',
      page: 'page',
    }
  );
};

const normalizePathname = (pathname = '/') => {
  if (!pathname.startsWith('/')) {
    return `/${pathname}`;
  }

  return pathname;
};

const withLocalePath = (pathName, locale, defaultLocale) => {
  const normalizedPath =
    pathName === '/' ? '/' : normalizePathname(pathName).replace(/\/+$/, '');
  const localePrefix = locale !== defaultLocale ? `/${locale}` : '';

  if (normalizedPath === '/') {
    return localePrefix ? `${localePrefix}/` : '/';
  }

  return `${localePrefix}${normalizedPath}`;
};

export {
  getLocalizedMenu,
  getLocalizedValue,
  getLocalePaths,
  withLocalePath,
};
